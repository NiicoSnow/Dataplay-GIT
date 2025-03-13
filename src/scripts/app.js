"use strict"
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

gsap.to(".title__hidden", {duration: 1.5, y: -150, ease: "power2.out"});
/*gsap.to(".bottom__hidden", {duration: 1.5, y: 350, ease: "power2.out"});*/
/*gsap.from("button", {duration: 1.5, y: 150, ease: "power2.out"});*/

catalogue.onclick = function (){
  gsap.from(".catalogue .buttons button",{duration: 0.5, y: 250, ease: "power2.out", delay: 0.3});
  gsap.from(".marquelogo",{duration: 0.8, x: -250, ease: "power2.out", delay: 0.3});
  gsap.to(".btn-catalogue, .btn-comparaison", {duration: 0.5, y: 150, ease: "power2.out"});
  gsap.to("h1", {duration: 0.5, y: -250, ease: "power2.out"})
}

accueil.onclick = function (){
  gsap.to(".btn-catalogue, .btn-comparaison", {duration: 0.5, y: 0, ease: "power2.out"});
  gsap.to("h1", {duration: 0.5, y: 0, ease: "power2.out"})
}


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
      setTimeout(() => {
        accueilSection.classList.remove("active");
        comparaisonSection.classList.remove("active");
        catalogueSection.classList.add("active");
      }, 300); // Délai de 2 secondes (2000 ms)
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
