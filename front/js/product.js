// Récuperer l'id dans l'url

const qStr = window.location.search;

const urlParams = new URLSearchParams(qStr);

const id = urlParams.get('id');

const apiUrl = 'http://localhost:3000/api/products/' + id;

// Si il y a un id, appeler le l'api pour chercher les informations du produit d'id

fetch(apiUrl)
    .then((response) => response.json()
    .then((data) => {
            
        // Afficher les images
        let img = document.querySelector('.item__img');
        img.innerHTML = `<img src='${data.imageUrl}' alt='${data.altTxt}'>`;
            
        // Afficher les noms
        let name = document.querySelector('#title');
        name.innerHTML = `${data.name}`;
            
        // Afficher les prix
        let price = document.querySelector('#price');
        price.innerHTML = `${data.price}`;

        // Afficher les descriptions
        let desc = document.querySelector('#description');
        desc.innerHTML = `${data.description}`;

        // Afficher les couleurs
        let color = document.querySelector(`#colors`);
        for (i = 0; i < data.colors.length; i++) {
            color.innerHTML += `<option value='${data.colors[i]}'>${data.colors[i]}</option>`;
        }
    }))
    
    .catch((err) => 
        document.querySelector('.item').innerText = `Oups ! Il y a eu une erreur lors de l'affichage du produit ! :(`);

// Récuperer les valeurs du HTML sélectionnées par l'utilisateur

// Récuperer la couleur choisie
function colorValue() {
    let color = document.querySelector(`#colors`);
    return color.value;
};

// Récuperer la quantité choisie
function qtyValue() {
    let qty = document.querySelector(`#quantity`);
    return qty.value;
};

// Bouton d'ajout au panier
const addToCart = document.querySelector(`#addToCart`);

// Lors du 'click' on écoute la couleur et la quantité du produit sélectionné
addToCart.addEventListener(`click`, () => {
    let color = colorValue();
    let qty = parseInt(qtyValue());

// Créer un objet de la sélection utlisateur avec l'id du produit
    const selectionUser = {
        colorChosen: color,
        qtyChosen: qty,
        productChosen: id,
    };

// Récupérer le panier dans le localStorage
    let itemsLocalStorage = JSON.parse(localStorage.getItem(`selectedProduct`));

    // Fonction ajouter un produit dans le localStorage
    const add2Cart = () => {
        itemsLocalStorage.push(selectionUser);
        localStorage.setItem(`selectedProduct`, JSON.stringify(itemsLocalStorage));
    };

    // Si le panier existe dans le localStorage
    if (itemsLocalStorage) {
        console.log(`panier existe`);
        add2Cart();
    }

    // Sinon
    else {
        console.log(`panier n'existe pas`);
        itemsLocalStorage = [];
        add2Cart();
    }
});

//************ TEST ************/

// Si la color et qty ont une valeur --> Voir si le panier existe (+ popup de confirmation ?)

    // Si le panier existe --> Voir si l'article sélectionner existe dans le panier
        
        // S'il existe --> push en incrémentant la "qtyChosen" à la qty actuelle du panier + sauvegarder
        // Sinon --> push le produit dans le tableau + sauvegarder

    // Sinon --> créer le tableau + push le produit dans la tableau + sauvegarder

// Sinon --> Alerte `Veuillez choisir une couleur et une quantité SVP`
