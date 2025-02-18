# Nouvel itinéraire

## 1. Importer les MP3

Il faut les mettre dans `assets/audio`. Faier un dossier dédié pour que ce soit moins le bordel

## 2. Définir l'itinéraire

Dans `js/itinerary.js`.  
Ecrire une fonction qui définit l'itinéraire à partir de ce template:

```js
function ItineraryNomAModifier(){
    var markerManager = new MarkerManager({add_markers_at_init:false, show_next_marker:false});

    markerManager.addMarker({
        latlng : [48.866044, 2.394667],
        title : "Chez Mathis",
        mp3: "./assets/audio/royale/1.mp3"
    })
}
```

On peut mettre:
* `add_markers_at_init:true` pour que tous les points s'affichent dès le début 
* `show_next_marker:true` pour que le point n+1 s'affiche lorsque le n est atteint  

Dans `markerManager.addMarker`:
* latlng : Mettre les coordonnées sous forme de liste [lat, lng],
* title : Pas important mais c'est pour nous, savoir de quel point il s'agit
* mp3: Le chemin vers les MP3. **Doit commencer par "./assets/audio/", et ensuite pointer vers le bon fichier

## 3. Rajouter une condition dans la fonction `setItinerary`

```
case itinerary_id == n:
    ItineraryNomAModifier();
    break;
```

Prendre le `n` qui suit par rapport aux itinéraires précédents

## 4. Rajouter l'option de cet itinéraire dans la liste déroulante

Dans `index.html`, dans le <select> qui commence à la ligne 25:

`<option value=n>Mon nouvel itinéraire ?</option>`

# Pour tester

Dans le terminal, faire `python -m http.server` et ouvrir dans le navigateur. Temporairement: mettre `add_markers_at_init:true` pour voir les points.

# Pour pusher

Dans le terminal: `git add .` puis `git commit -m "nouvel itineraire"`, puis `git push`