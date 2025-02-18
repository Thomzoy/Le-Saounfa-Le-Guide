function setSrcWithStatusCheck(tile, url, fallback_url) {
    function setSrc(effective_url) {
        tile.src = effective_url;
    }

    // Make the request to fetch the image content
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                // Handle non-OK responses
                setSrc(fallback_url);
            } else {
                // Convert the image content to base64
                return response.blob();
            }
        })
        .then(function (blob) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        })
        .then(function (dataUrl) {
            // Set the source of the image using the base64 data URL
            setSrc(dataUrl);
        })
        .catch(function () {
            // Handle network errors
            setSrc(fallback_url);
        });
}

export class Fallback extends L.TileLayer {
    constructor(urlTemplate, options, fallbackUrl) {
        super(urlTemplate, options);
        this.fallbackLayer = L.tileLayer(fallbackUrl, options);
    }

    createTile(coords, done) {
        const tile = super.createTile(coords, done);
        this.fallbackLayer._tileZoom = this._tileZoom;
        tile._originalCoords = coords;

        setSrcWithStatusCheck(tile, tile.src, this.fallbackLayer.getTileUrl(coords));

        return tile;
    }
}