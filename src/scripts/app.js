console.info('Hello world');
// Dès que le DOM est chargé, on met en place les événements
document.addEventListener("DOMContentLoaded", () => {
    // Sélection des sections
    const accueilSection     = document.querySelector(".accueil");
    const catalogueSection   = document.querySelector(".catalogue");
    const comparaisonSection = document.querySelector(".comparaison");
  
    // Boutons sur la page d'accueil
    const btnCatalogue    = document.querySelector(".btn-catalogue");
    const btnComparaison  = document.querySelector(".btn-comparaison");
  
    // Boutons "Retour à l'accueil" depuis Catalogue et Comparaison
    const btnAccueilListe = document.querySelectorAll(".btn-accueil");
  
    // Quand on clique sur le bouton Catalogue
    btnCatalogue.addEventListener("click", () => {
      // On enlève la classe active partout
      accueilSection.classList.remove("active");
      comparaisonSection.classList.remove("active");
      // On l'ajoute sur la page Catalogue
      catalogueSection.classList.add("active");
    });
  
    // Quand on clique sur le bouton Comparaison
    btnComparaison.addEventListener("click", () => {
      accueilSection.classList.remove("active");
      catalogueSection.classList.remove("active");
      comparaisonSection.classList.add("active");
    });
  
    // Pour tous les boutons "Retour à l'accueil"
    btnAccueilListe.forEach((btn) => {
      btn.addEventListener("click", () => {
        catalogueSection.classList.remove("active");
        comparaisonSection.classList.remove("active");
        accueilSection.classList.add("active");
      });
    });
  });