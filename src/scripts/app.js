"use strict"
document.addEventListener("DOMContentLoaded", () => {
  // Récupération des sections
  const accueilSection     = document.querySelector(".accueil");
  const catalogueSection   = document.querySelector(".catalogue");
  const comparaisonSection = document.querySelector(".comparaison");

  // Boutons existants (exemple)
  const btnCatalogue    = document.querySelector(".btn-catalogue");    // Accueil => Catalogue
  const btnComparaison  = document.querySelector(".btn-comparaison");  // Accueil => Comparaison
  const btnAccueilListe = document.querySelectorAll(".btn-accueil");   // Retour à l'accueil

  // == NOUVEAUX BOUTONS pour naviguer Catalogue <=> Comparaison ==
  const btnComparaison2 = document.querySelector(".btn-comparaison2"); // Catalogue => Comparaison
  const btnCatalogue2   = document.querySelector(".btn-catalogue2");   // Comparaison => Catalogue

  // --- Écouteurs existants (à adapter selon votre projet) ---
  if (btnCatalogue) {
    btnCatalogue.addEventListener("click", () => {
      accueilSection.classList.remove("active");
      comparaisonSection.classList.remove("active");
      catalogueSection.classList.add("active");
    });
  }

  if (btnComparaison) {
    btnComparaison.addEventListener("click", () => {
      accueilSection.classList.remove("active");
      catalogueSection.classList.remove("active");
      comparaisonSection.classList.add("active");
    });
  }

  btnAccueilListe.forEach((btn) => {
    btn.addEventListener("click", () => {
      catalogueSection.classList.remove("active");
      comparaisonSection.classList.remove("active");
      accueilSection.classList.add("active");
    });
  });

  // --- Écouteurs pour naviguer directement de Catalogue à Comparaison, et inversement ---
  if (btnComparaison2) {
    btnComparaison2.addEventListener("click", () => {
      // On enlève .active à la section Catalogue
      catalogueSection.classList.remove("active");
      // On l'ajoute à la section Comparaison
      comparaisonSection.classList.add("active");
    });
  }

  if (btnCatalogue2) {
    btnCatalogue2.addEventListener("click", () => {
      // On enlève .active à la section Comparaison
      comparaisonSection.classList.remove("active");
      // On l'ajoute à la section Catalogue
      catalogueSection.classList.add("active");
    });
  }
});
