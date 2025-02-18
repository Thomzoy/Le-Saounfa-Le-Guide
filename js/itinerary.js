import 'https://unpkg.com/leaflet';

import { MarkerManager } from './markers.js'

export function setItinerary(itinerary_id){
    switch (true) {
        case itinerary_id == 4:
            return itineraryDCDCT();
            break;
        case itinerary_id == 0:
            return itineraryAnniversary();
            break;
        case itinerary_id == 1:
            return itineraryRoyale();
            break;
        case itinerary_id == 2:
            return itineraryRoyal2();
            break;
            case itinerary_id == 3:
            return itineraryVBV();
            break;
        case itinerary_id == -1:
            localStorage.clear();
            alert("Hstorique nettoyé !")
        default:
            console.log("Invalid itinerary");
            break;
    }
}

function itineraryVBV(){
    var markerManager = new MarkerManager({add_markers_at_init:false, show_next_marker:true});

    markerManager.addMarker({
        latlng : [48.83582899014416, 2.4066115520200992],
        title : "Chez Mathis",
        mp3: "./assets/audio/VBV/VBV_1_ElevenLabs_Chapter_1.mp3"
    })

    markerManager.addMarker({
        latlng : [48.835431, 2.406879],
        title : "Porte Dorée",
        mp3: "./assets/audio/VBV/VBV_2_Porte_dorée.mp3"
    })
    
    markerManager.addMarker({
        latlng : [48.832959, 2.409957],
        title : "Vendeur de barques",
        mp3: "./assets/audio/VBV/VBV_3_ElevenLabs_Lac_Dausmenil.mp3"
    })

    markerManager.addMarker({
        latlng : [48.83002765035753, 2.4150530682741422],
        title : "Ile de Reuilly",
        mp3: "./assets/audio/VBV/VBV_4_ElevenLabs_Ile_de_reuilly.mp3"
    })

     markerManager.addMarker({
        latlng : [48.828835, 2.416364],
        title : "Grande Pagode",
        mp3: "./assets/audio/VBV/VBV_5_ElevenLabs_GrandePagode.mp3"
    })
    
    markerManager.addMarker({
        latlng : [48.828027, 2.418747],
        title : "Entrée dans le Bois",
        mp3: "./assets/audio/VBV/VBV_6_ElevenLabs_Fin_du_Lac_Dausmelin (1).mp3"
    })

    markerManager.addMarker({
        latlng : [48.822269, 2.442096],
        title : "Fontaine",
        mp3: "./assets/audio/VBV/VBV_7_ElevenLabs_Fontaine.mp3"
    })

    markerManager.addMarker({
        latlng : [48.819614, 2.447448],
        title : "Lac de gravelle",
        mp3: "./assets/audio/VBV/VBV_8_ElevenLabs_Lac_De_Gravelle.mp3"
    })

    markerManager.addMarker({
        latlng : [48.820710, 2.453632],
        title : "Arboretum",
        mp3: "./assets/audio/VBV/VBV_9_ElevenLabs_Arboretum.mp3"
    })

    markerManager.addMarker({
        latlng : [48.822437, 2.458991],
        title : "Ecole du Breuil",
        mp3: "./assets/audio/VBV/VBV_10_ElevenLabs_Eole_du_Breuil.mp3"
    })

     markerManager.addMarker({
        latlng : [48.827429, 2.464078],
        title : "Eau - rivière Joinville",
        mp3: "./assets/audio/VBV/VBV_11_ElevenLabs_Rivière_Joinville.mp3"
    })

    markerManager.addMarker({
        latlng : [48.833839, 2.464898],
        title : "jardin d'agronomie tropicale",
        mp3: "./assets/audio/VBV/VBV_12_ElevenLabs_Jardin_tropical.mp3"
    })

    markerManager.addMarker({
        latlng : [48.834713, 2.467194],
        title : "Pavillon de la Cochinchine",
        mp3: "./assets/audio/VBV/VBV_13_ElevenLabs_Pavillon_Cochinchine.mp3"
    })

    markerManager.addMarker({
        latlng : [48.835601, 2.467991],
        title : "Sortie du JAT",
        mp3: "./assets/audio/VBV/VBV_14_ElevenLabs_Sortie_Jardin.mp3"
    })

    markerManager.addMarker({
        latlng : [48.834137, 2.461462],
        title : "Lac des Minimes",
        mp3: "./assets/audio/VBV/VBV_15_ElevenLabs_Lac_des_minimes.mp3"
    })

    markerManager.addMarker({
        latlng : [48.83567809230023, 2.45538909553405],
        title : "Route du Champs de Manoeuvres - Cartoucherie",
        mp3: "./assets/audio/VBV/VBV_16_ElevenLabs_route_des_maneouvres.mp3"
    })

    markerManager.addMarker({
        latlng : [48.83426062878614, 2.4458425930432997],
        title : "Obélisque",
        mp3: "./assets/audio/VBV/VBV_17_ElevenLabs_Obélisque.mp3"
    })

    markerManager.addMarker({
        latlng : [48.835280, 2.437811],
        title : "Vers le Chateau",
        mp3: "./assets/audio/VBV/VBV_18_ElevenLabs_Vers_le_chateau.mp3"
    })

    markerManager.addMarker({
        latlng : [48.839556, 2.436016],
        title : "Fin de la ballade",
        mp3: "./assets/audio/VBV/VBV_19_ElevenLabs_Fin_du_tour..mp3"
    })

    


    

    
    return markerManager
}

function itineraryRoyal2(){
    var markerManager = new MarkerManager({add_markers_at_init:false, show_next_marker:false});

    markerManager.addMarker({
        latlng : [48.861149, 2.335088],
        title : "Départ",
        mp3: "./assets/audio/PVR2/0PVR2.mp3"
    })

     markerManager.addMarker({
        latlng : [48.861620, 2.332978],
        title : "Arc de triomphe du Caroussel",
        mp3: "./assets/audio/PVR2/1PVR2.mp3"
    })
    
    markerManager.addMarker({
        latlng : [48.865304, 2.337936],
        title : "Jardins du Palais Royal",
        mp3: "./assets/audio/PVR2/2PVR2.mp3"
    })

    markerManager.addMarker({
        latlng : [48.865800, 2.341032],
        title : "Place des Victoires",
        mp3: "./assets/audio/PVR2/3PVR2.mp3"
    })

     markerManager.addMarker({
        latlng : [48.864212, 2.348017],
        title : "Tour Jean Sans Peur",
        mp3: "./assets/audio/PVR2/4PVR2.mp3"
    })

    markerManager.addMarker({
        latlng : [48.863225, 2.344324],
        title : "Eglise Saint Eustache",
        mp3: "./assets/audio/PVR2/5PVR2.mp3"
    })
}



function itineraryRoyale(){
    var markerManager = new MarkerManager({add_markers_at_init:false, show_next_marker:false});

    markerManager.addMarker({
        latlng : [48.845579754925886, 2.3397407568996385],
        title : "RER B, le GOAT",
        mp3: "./assets/audio/royale/0.mp3"
    })
    markerManager.addMarker({
        latlng : [48.849280, 2.337344],
        title : "Palais du Luxembourg",
        mp3: "./assets/audio/royale/1.mp3"
    })
    markerManager.addMarker({
        latlng : [48.847218, 2.337254],
        title : "Grand Bassin du Luxembourg",
        mp3: "./assets/audio/royale/2.mp3"
    })
    markerManager.addMarker({
        latlng : [48.847044, 2.336122],
        title : "Statue de Marguerite de Provence",
        mp3: "./assets/audio/royale/3.mp3"
    })
     markerManager.addMarker({
        latlng : [48.848007, 2.339210],
        title : "Fontaine Médicis",
        mp3: "./assets/audio/royale/4.mp3"
    })
    markerManager.addMarker({
        latlng : [48.853736, 2.347578],
        title : "Notre-Dame",
        mp3: "./assets/audio/royale/5.mp3"
    })
    markerManager.addMarker({
        latlng : [48.855413, 2.345922],
        title : "Palais de la Cité",
        mp3: "./assets/audio/royale/6.mp3"
    })
    markerManager.addMarker({
        latlng : [48.856501, 2.342622],
        title : "Place Dauphine",
        mp3: "./assets/audio/royale/7.mp3"
    })
    markerManager.addMarker({
        latlng : [48.860014, 2.340168],
        title : "Colonnade du Louvre",
        mp3: "./assets/audio/royale/8.mp3"
    })
    markerManager.addMarker({
        latlng : [48.861410, 2.339930],
        title : "Rue Oratoire",
        mp3: "./assets/audio/royale/9.mp3"
    })
     markerManager.addMarker({
        latlng : [48.860940, 2.334912],
        title : "Statue de Louis XIV",
        mp3: "./assets/audio/royale/10.mp3"
    })
    return markerManager
}

function itineraryAnniversary(){
    var markerManager = new MarkerManager({add_markers_at_init:false, show_next_marker:false});

    markerManager.addMarker({
        latlng : [48.837140750828, 2.4044191991569206],
        title : "La Vega",
        mp3: "./assets/audio/anniversary/vega.mp3"
    })

    markerManager.addMarker({
        latlng : [48.8365430514207, 2.3943123262137607], //[48.8671938,2.3959993],
        title : "Boulangerie",
        mp3: "./assets/audio/anniversary/boulangerie.mp3"
    })

    markerManager.addMarker({
        latlng : [48.85493897028012, 2.354999734547234], //[48.8671938,2.3959993],
        title : "Chez Julien",
        mp3: "./assets/audio/anniversary/resto.mp3"
    })

    markerManager.addMarker({
        latlng : [48.8702190271689, 2.3113786857293666], //[48.8671938,2.3959993],
        title : "Hotel",
        mp3: "./assets/audio/anniversary/hotel.mp3"
    })
    return markerManager
}

function itineraryDCDCT(){
    var markerManager = new MarkerManager({add_markers_at_init:false, show_next_marker:true});

    markerManager.addMarker({
        latlng : [48.870652, 2.401461],
        title : "Départ",
        mp3: "./assets/audio/DCDCT/0_Du_coté_de_chez_le_Tis_Bien_le_bonjour.mp3"
    })
    
    markerManager.addMarker({
        latlng : [48.862603, 2.387819],
        title : "Père Lachaise",
        mp3: "./assets/audio/DCDCT/1_Du_coté_de_chez_le_Tis_Père_lachaise.mp3",
    })

    markerManager.addMarker({
        latlng : [48.865306, 2.394201],
        title : "Square du Docteur Jacques-Joseph-Grandier",
        mp3: "./assets/audio/DCDCT/2__coté_de_chez_le_Tis_Square_du_Docteur_JAcques-Joseph-Grandier.mp3",
    })

    markerManager.addMarker({
        latlng : [48.870557, 2.396573],
        title : "Square des Saint-Simoniens",
        mp3: "./assets/audio/DCDCT/3_Du_coté_de_chez_le_Tis_Square_des_Saint-Simoniens.mp3",
    })

    markerManager.addMarker({
        latlng : [48.871578, 2.395333],
        title : "Square Emmi-Pickler",
        mp3: "./assets/audio/DCDCT/4_Du_coté_de_chez_le_Tis_Square_Emmi-Pickler.mp3",
    })

    markerManager.addMarker({
        latlng : [48.871478, 2.391495],
        title : "Regard Saint Martin",
        mp3: "./assets/audio/DCDCT/5_Du_coté_de_chez_le_Tis_Regard_Saint_Martin.mp3",
    })

    markerManager.addMarker({
        latlng : [48.870284, 2.391608],
        title : "Villa de l'Ermitage ",
        mp3: "./assets/audio/DCDCT/6_Du_coté_de_chez_le_Tis_Villa_de_l'Ermitage.mp3",
    })

    markerManager.addMarker({
        latlng : [48.870764, 2.393196],
        title : "Cité Leroy",
        mp3: "./assets/audio/DCDCT/7_Du_coté_de_chez_le_Tis_Cité_Leroy.mp3",
    })


    markerManager.addMarker({
        latlng : [48.870014, 2.394282],
        title : "Pavillon Carré de Baudouin. ",
        mp3: "./assets/audio/DCDCT/8_Du_coté_de_chez_le_Tis_pavillon_Carré_de_Baudouin..mp3",
    })



    markerManager.addMarker({
        latlng : [48.868521, 2.388077],
        title : "église Notre Dame de la Croix",
        mp3: "./assets/audio/DCDCT/9_Du_coté_de_chez_le_Tis_église_Notre_Dame_de_la_Croix..mp3",
    })
    return markerManager
}
