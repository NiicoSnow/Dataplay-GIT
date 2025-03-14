/** On a utilisé pas mal l'IA pour le JS, pour GSAP, le changement de page en un html et pour le traitement de donnée avec le Json */

"use strict"

import { gsap } from "gsap";

gsap.to(".bottom__hidden", {duration: 1.5, y: "100%", ease: "power2.out", delay: 0.5});
gsap.to(".top__hidden", {duration: 1.5, y: "-100%", ease: "power2.out", delay: 0.5});

catalogue.onclick = function (){
    gsap.fromTo(".btn-comparaison2",{duration: 0.5, y: 250, ease: "power2.out"},{y:0, delay: 0.3});
  gsap.fromTo(".catalogue select",{duration: 0.5, y: 250, ease: "power2.out"},{y:0, delay: 0.38});
  gsap.to(".btn__anim__acceuil",{duration: 0.5, y: 250, ease: "power2.out"});
  gsap.to(".anim__hidden--version1",{duration: 0.5, x: "100%", ease: "power2.out",delay: 0.3, stagger: 0.1});
  gsap.to(".anim__hidden--version2",{duration: 0.5, x: "100%", ease: "power2.out",delay: 0.4});
}

catalogue2.onclick = function (){
    gsap.to(".btn-comparaison2",{duration: 0.5, y: 0, ease: "power2.out", delay: 0.5});
    gsap.to(".catalogue select",{duration: 0.5, y: 0, ease: "power2.out", delay: 0.58});
    gsap.to(".btn-catalogue2",{duration: 0.5, y: 250, ease: "power2.out"});
    gsap.to(".anim__hidden",{duration: 0.5, y:0, ease: "power2.out", stagger: 0.07});
    gsap.fromTo(".anim__hidden--version1",{x:0},{duration: 0.5, x: "100%", ease: "power2.out",delay: 0.5, stagger: 0.1});
    gsap.fromTo(".anim__hidden--version2",{x:0},{duration: 0.5, x: "-100%", ease: "power2.out",delay: 0.4});
}

comparaison.onclick = function (){
    gsap.to(".btn__anim__acceuil",{duration: 0.5, y: 250, ease: "power2.out"});
    gsap.fromTo(".btn-catalogue2",{duration: 0.5, y: 250, ease: "power2.out"},{y:0, delay: 0.3});
    gsap.fromTo(".anim__hidden",{ y: 0},{duration: 0.5, y:"100%",ease: "power2.out", delay: 0.4, stagger: 0.1});
}

comparaison2.onclick = function (){
    gsap.fromTo(".btn-catalogue2",{duration: 0.5, y: 250, ease: "power2.out"},{y:0, delay: 0.3});
    gsap.to(".btn-comparaison2",{duration: 0.5, y: 250, ease: "power2.out", delay:0.1});
    gsap.to(".catalogue select",{duration: 0.5, y: 250, ease: "power2.out"});
    gsap.fromTo(".anim__hidden",{ y: 0},{duration: 0.5, y:"100%", ease: "power2.out", delay: 0.6, stagger: 0.07});
    gsap.to(".anim__hidden--version1",{duration: 0.5, x: 0, ease: "power2.out", stagger: 0.1});
    gsap.to(".anim__hidden--version2",{duration: 0.5, x: 0, ease: "power2.out"});
}


accueil.onclick = function (){
  gsap.to(".btn-comparaison2",{duration: 0.5, y: 250, ease: "power2.out", delay:0.1});
  gsap.to(".catalogue select",{duration: 0.5, y: 250, ease: "power2.out"});
  gsap.to(".btn__anim__acceuil",{duration: 0.5, y: 0, ease: "power2.out", delay:0.5});
  gsap.to(".anim__hidden--version1",{duration: 0.5, x: 0, ease: "power2.out", stagger: 0.1});
  gsap.to(".anim__hidden--version2",{duration: 0.5, x: 0, ease: "power2.out"});
}

accueil2.onclick = function (){
    gsap.to(".btn__anim__acceuil",{duration: 0.5, y: 0, ease: "power2.out", delay:0.5});
    gsap.to(".btn-catalogue2",{duration: 0.5, y: 250, ease: "power2.out"});
    gsap.to(".anim__hidden", {duration: 0.5, y:0, ease: "power2.out", stagger: 0.07});
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
  const btnAccueilListe2 = document.querySelectorAll(".btn-accueil2");   // Retour à l'accueil

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
      setTimeout(() => {
        accueilSection.classList.remove("active");
        catalogueSection.classList.remove("active");
        comparaisonSection.classList.add("active");
      }, 300); // Délai de 2 secondes (2000 ms)
    });
  }

  btnAccueilListe.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        catalogueSection.classList.remove("active");
        comparaisonSection.classList.remove("active");
        accueilSection.classList.add("active");
      }, 500); // Délai de 2 secondes (2000 ms)
    });
  });

  btnAccueilListe2.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        catalogueSection.classList.remove("active");
        comparaisonSection.classList.remove("active");
        accueilSection.classList.add("active");
      }, 500); // Délai de 2 secondes (2000 ms)
    });
  });

  // --- Écouteurs pour naviguer directement de Catalogue à Comparaison, et inversement ---
  if (btnComparaison2) {
    btnComparaison2.addEventListener("click", () => {

      setTimeout(() => {
        catalogueSection.classList.remove("active");
        comparaisonSection.classList.add("active");
      }, 500); // Délai de 2 secondes (2000 ms)
    });
  }

  if (btnCatalogue2) {
    btnCatalogue2.addEventListener("click", () => {
      setTimeout(() => {
        comparaisonSection.classList.remove("active");
        catalogueSection.classList.add("active");
      }, 500); // Délai de 2 secondes (2000 ms)
    });
  }
});



let crashData = [];
let modelsByAircraft = {};
let operatorsByModel = {};
let dateByOperators = {};
let allModels = new Set();
let allOperators = new Set();
let allDates = new Set();

// Associer les modèles d'avion aux URL des images correspondantes
const aircraftImages = {
    "A320": "./assets/images/a320.webp",
    "90 King Air": "./assets/images/90KA.webp",
    "737-200": "./assets/images/737.webp",
    "737-400": "./assets/images/737.webp",
    "737-700": "./assets/images/737.webp",
    "737-300": "./assets/images/737.webp",
    "737-800": "./assets/images/737.webp",
    "737 MAX 8": "./assets/images/737.webp",
    "737-500": "./assets/images/737.webp",
    " 560 Citation V": "./assets/images/560.webp",
    "560 Citation V Ultra": "./assets/images/560.webp",
    " 560 Citation Encore": "./assets/images/560.webp",
    "560XLS Citation Excel": "./assets/images/560.webp",
    "L-410": "./assets/images/410.webp",
    "MD-83": "./assets/images/MD83.webp"
};

const aircraftImagesUpper = {
    "A320": "./assets/images/a320D.webp",
    "90 King Air": "./assets/images/90KAD.webp",
    "737-200": "./assets/images/737D.webp",
    "737-400": "./assets/images/737D.webp",
    "737-700": "./assets/images/737D.webp",
    "737-300": "./assets/images/737D.webp",
    "737-800": "./assets/images/737D.webp",
    "737 MAX 8": "./assets/images/737D.webp",
    "737-500": "./assets/images/737D.webp",
    " 560 Citation V": "./assets/images/560D.webp",
    "560 Citation V Ultra": "./assets/images/560D.webp",
    " 560 Citation Encore": "./assets/images/560D.webp",
    "560XLS Citation Excel": "./assets/images/560D.webp",
    "L-410": "./assets/images/410D.webp",
    "MD-83": "./assets/images/MD83D.webp"
};

window.onload = function () {
    fetch('../assets/crash_save2.json')
        .then(response => response.json())
        .then(data => {
            crashData = data.crash;
            loadFilters(crashData);
            populateAircraftSelect();
            populateModelSelect();
            populateAircraftSelect2();
            populateModelSelect2();
            /*calculateAverageAges();*/
        });
};

function displayData_cat(data) {
    const p_immatriculation = document.getElementById('immatriculation');
    const p_YOM = document.getElementById('YOM');
    const p_nbAnnee = document.getElementById('nbAnnee');
    const p_pax_board = document.getElementById('pax_board');
    const p_pax = document.getElementById('pax');
    const p_cause = document.getElementById('cause');
    const p_pays = document.getElementById('pays');
    const p_crew_board = document.getElementById('crew_board');
    const p_crew = document.getElementById('crew');
    const p_type = document.getElementById('flightType');

    // Fonction pour calculer la différence d'années
    function calculerNbAnnee(anneeYOM, dateCrash) {
        const anneeConstruction = anneeYOM;
        const anneeCrash = dateCrash.getFullYear();
        const ageAvion = anneeCrash - anneeConstruction;
        return ageAvion;
    }

    if (data.length > 0) {
        const crash = data[0];
        const dateCrash = new Date(crash.Date);
        p_immatriculation.innerHTML = `${crash["Registration"]}`;
        p_YOM.innerHTML = `${crash["YOM"]}`;
        p_nbAnnee.innerHTML = `${calculerNbAnnee(crash["YOM"], dateCrash)}`;
        p_crew_board.innerHTML = `${crash["Crew on board"]}`;
        p_crew.innerHTML = `${crash["Crew fatalities"]}`;
        p_pax_board.innerHTML = `${crash["Pax on board"]}`;
        p_pax.innerHTML = `${crash["PAX fatalities"]}`;
        p_cause.innerHTML = `${crash["Crash cause"]}`;
        p_pays.innerHTML = `${crash.Country}`;
        p_type.innerHTML = `${crash["Flight type"]}`;
    } else {
        p_immatriculation.innerHTML = '/';
        p_YOM.innerHTML = '/ ';
        p_nbAnnee.innerHTML = '/';
        p_crew_board.innerHTML = '/';
        p_crew.innerHTML = '/';
        p_pax_board.innerHTML = '/';
        p_pax.innerHTML = '/';
        p_cause.innerHTML = '/';
        p_pays.innerHTML = '/';
        p_type.innerHTML = '/';
    }
}


function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loadFilters(data) {
    const optAircraft = document.getElementById('choix_aircraft');
    const optModel = document.getElementById('choix_modele');
    const optOperator = document.getElementById('choix_operator');
    const optDate = document.getElementById('choix_date');

    modelsByAircraft = {};
    operatorsByModel = {};
    dateByOperators = {};
    allModels.clear();
    allOperators.clear();
    allDates.clear();

    data.forEach(crash => {
        const aircraftKey = crash.Aircraft;
        const modelKey = crash.Model;
        const operatorKey = crash.Operator;
        const dateKey = crash.Date;

        if (!modelsByAircraft[aircraftKey]) {
            modelsByAircraft[aircraftKey] = new Set();
        }
        modelsByAircraft[aircraftKey].add(modelKey);
        allModels.add(modelKey);

        if (!operatorsByModel[modelKey]) {
            operatorsByModel[modelKey] = new Set();
        }
        operatorsByModel[modelKey].add(operatorKey);
        allOperators.add(operatorKey);

        if (!dateByOperators[operatorKey]) {
            dateByOperators[operatorKey] = new Set();
        }
        dateByOperators[operatorKey].add(dateKey);
        allDates.add(dateKey);
    });

    Object.keys(modelsByAircraft).sort().forEach(aircraft => {
        const option = document.createElement('option');
        option.value = aircraft;
        option.textContent = capitalizeFirstLetter(aircraft);
        optAircraft.appendChild(option);
    });
}

function filterData() {
    const selectedAircraft = document.getElementById('choix_aircraft').value;
    const selectedModel = document.getElementById('choix_modele').value;
    const selectedOperator = document.getElementById('choix_operator').value;
    const selectedDate = document.getElementById('choix_date').value;

    if (selectedAircraft !== "" && selectedModel !== "" && selectedOperator !== "" && selectedDate !== "") {
        const filteredData = crashData.filter(crash => {
            const aircraftMatch = crash.Aircraft === selectedAircraft;
            const modelMatch = crash.Model === selectedModel;
            const operatorMatch = crash.Operator === selectedOperator;
            const dateMatch = crash.Date === selectedDate;
            return aircraftMatch && modelMatch && operatorMatch && dateMatch;
        });

        displayData_cat(filteredData);
    } else {
        displayData_cat([]);
    }
}

function updateModels() {
    const selectedAircraft = document.getElementById('choix_aircraft').value;
    const optModel = document.getElementById('choix_modele');
    optModel.innerHTML = '<option value="">Tous les modèles</option>';

    if (selectedAircraft && modelsByAircraft[selectedAircraft]) {
        modelsByAircraft[selectedAircraft].forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            optModel.appendChild(option);
        });
    }
}

function updateOperators() {
    const selectedModel = document.getElementById('choix_modele').value;
    const optOperator = document.getElementById('choix_operator');
    optOperator.innerHTML = '<option value="">Toutes les compagnies</option>';

    if (selectedModel && operatorsByModel[selectedModel]) {
        operatorsByModel[selectedModel].forEach(operator => {
            const option = document.createElement('option');
            option.value = operator;
            option.textContent = operator;
            optOperator.appendChild(option);
        });
    }
}

function updateDates() {
  console.log('test');
    const selectedOperator = document.getElementById('choix_operator').value;
    const optDate = document.getElementById('choix_date');
    optDate.innerHTML = '<option value="">Toutes les dates</option>';

    if (selectedOperator && dateByOperators[selectedOperator]) {
        dateByOperators[selectedOperator].forEach(dadates => {
            const option = document.createElement('option');
            option.value = dadates;
            option.textContent = dadates;
            optDate.appendChild(option);
            updateImage();
        });
    }
}

function updateImage() {
  console.log('update');
    const selectedModel = document.getElementById('choix_modele').value;
    const aircraftImage = document.getElementById('aircraft_image');
    const aircraftImageUpper = document.getElementById('aircraft_image_dessus');

    if (selectedModel && aircraftImages[selectedModel]) {
      console.log('updated');
        aircraftImage.src = aircraftImages[selectedModel];
        aircraftImage.style.display = 'block';
    } else {
      console.log('not');
        aircraftImage.src = '';
        aircraftImage.style.display = 'none';
    }

    if (selectedModel && aircraftImagesUpper[selectedModel]) {
        aircraftImageUpper.src = aircraftImagesUpper[selectedModel];
        aircraftImageUpper.style.display = 'block';
    } else {
        aircraftImageUpper.src = '';
        aircraftImageUpper.style.display = 'none';
    }
}

document.querySelector('#choix_aircraft').addEventListener('change', () => {
    updateModels();
    updateOperators();
    updateDates();
    filterData();
});
document.querySelector('#choix_modele').addEventListener('change', () => {
    updateOperators();
    updateDates();
    filterData();
});
document.querySelector('#choix_operator').addEventListener('change', () => {
    updateDates();
    filterData();

    gsap.fromTo("#aircraft_image",{x:"-600%", opacity: 1},{ duration: 12, opacity:0, x:"200%", ease: "power2.out"})
});
document.querySelector('#choix_date').addEventListener('change', () => {
    filterData();
});


/*Page Comparaison*/

let aircraftModels = {};

/*Tableau 1*/ 
function updateImageComp1() { 
    console.log('update'); 
    const selectedModel = document.getElementById('modelSelect').value;
    const aircraftImage = document.getElementById('aircraft_image_comp1');
    if (selectedModel && aircraftImages[selectedModel]) {
        console.log('updated'); 
        aircraftImage.src = aircraftImages[selectedModel];
        aircraftImage.style.display = 'block';
    }
    else {
        console.log('not');
        aircraftImage.src = '';
        aircraftImage.style.display = 'none';
    }
}
function populateAircraftSelect() {
    const aircraftSet = new Set(); aircraftModels = {};
    // Récupérer tous les Aircrafts et leurs modèles
    crashData.forEach(crash => {
        const aircraft = crash.Aircraft;
        const model = crash.Model;
        aircraftSet.add(aircraft);
        if (!aircraftModels[aircraft]) {
            aircraftModels[aircraft] = new Set();
            updateImageComp1();
        }
        aircraftModels[aircraft].add(model);
    });
    // Ajouter les options au select Aircraft
    const aircraftSelect = document.getElementById('aircraftSelect');
    aircraftSet.forEach(aircraft => {
        let option = document.createElement('option');
        option.value = aircraft;
        option.textContent = aircraft;
        aircraftSelect.appendChild(option);
    });
    aircraftSelect.addEventListener('change', populateModelSelect);
} 
function populateModelSelect() { 
    const selectedAircraft = document.getElementById('aircraftSelect').value;
    const modelSelect = document.getElementById('modelSelect');
    // Réinitialiser le select Model
    modelSelect.innerHTML = '<option value="">Sélectionner un modèle</option>';
    if (selectedAircraft && aircraftModels[selectedAircraft]) {
        aircraftModels[selectedAircraft].forEach(model => {
            let option = document.createElement('option');
            option.value = model; option.textContent = model;
            modelSelect.appendChild(option);
        });
    } 
    modelSelect.addEventListener('change', filterResults);
}
function filterResults() {
    const selectedAircraft = document.getElementById('aircraftSelect').value;
    const selectedModel = document.getElementById('modelSelect').value;
    let crashCount = 0;
    let totalFatalities = 0;
    crashData.forEach(crash => {
        if (crash.Aircraft === selectedAircraft && crash.Model === selectedModel) {
            crashCount++; totalFatalities += parseInt(crash["Total fatalities"]);
        }
    });
    const crashCountElement = document.getElementById("nbcrashs");
    const totalFatalitiesElement = document.getElementById("totfat");
    if (crashCountElement && totalFatalitiesElement) {
        crashCountElement.textContent = crashCount;
        totalFatalitiesElement.textContent = totalFatalities;
    }
    else {
        console.error("Elements with ID 'nbcrashs' or 'totfat' not found.");
    }
} 

/*Tableau 2*/
function updateImageComp2() {
    console.log('update');
    const selectedModel = document.getElementById('modelSelect2').value;
    const aircraftImage = document.getElementById('aircraft_image_comp2');
    if (selectedModel && aircraftImages[selectedModel]) {
        console.log('updated');
        aircraftImage.src = aircraftImages[selectedModel];
        aircraftImage.style.display = 'block';
    }
    else {
        console.log('not');
        aircraftImage.src = '';
        aircraftImage.style.display = 'none';
    }
}
function populateAircraftSelect2() {
    const aircraftSet = new Set();
    aircraftModels = {};
    crashData.forEach(crash => {
        const aircraft = crash.Aircraft;
        const model = crash.Model;
        aircraftSet.add(aircraft);
        if (!aircraftModels[aircraft]) {
            aircraftModels[aircraft] = new Set();
        }
        aircraftModels[aircraft].add(model);
        updateImageComp2();
    });
    const aircraftSelect = document.getElementById('aircraftSelect2');
    aircraftSet.forEach(aircraft => {
        let option = document.createElement('option');
        option.value = aircraft;
        option.textContent = aircraft;
        aircraftSelect.appendChild(option);
    });
    aircraftSelect.addEventListener('change', populateModelSelect2);
}
function populateModelSelect2() {
    const selectedAircraft = document.getElementById('aircraftSelect2').value;
    const modelSelect = document.getElementById('modelSelect2');
    modelSelect.innerHTML = '<option value="">Sélectionner un modèle</option>';
    if (selectedAircraft && aircraftModels[selectedAircraft]) {
        aircraftModels[selectedAircraft].forEach(model => {
            let option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
    modelSelect.addEventListener('change', () => {
        filterResults2(); updateImageComp2();
    });
}
function filterResults2() {
    const selectedAircraft = document.getElementById('aircraftSelect2').value;
    const selectedModel = document.getElementById('modelSelect2').value;
    let crashCount = 0;
    let totalFatalities = 0;
    crashData.forEach(crash => {
        if (crash.Aircraft === selectedAircraft && crash.Model === selectedModel) {
            crashCount++;
            totalFatalities += parseInt(crash["Total fatalities"]);
        }
    });
    const crashCountElement = document.getElementById("nbcrashs2");
    const totalFatalitiesElement = document.getElementById("totfat2");
    if (crashCountElement && totalFatalitiesElement) {
        crashCountElement.textContent = crashCount;
        totalFatalitiesElement.textContent = totalFatalities;
    }
    else {
        console.error("Elements with ID 'nbcrashs2' or 'totfat2' not found.");
    }
}
// Ajout d'événements pour initialiser les sélections
document.addEventListener("DOMContentLoaded", () => {
    populateAircraftSelect2();
    document.querySelector('#aircraftSelect2').addEventListener('change', () => {
        populateModelSelect2();
        filterResults2();
    });
    document.querySelector('#modelSelect2').addEventListener('change', () => {
        filterResults2();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    populateAircraftSelect();
    populateAircraftSelect2();
    document.querySelector('#aircraftSelect').addEventListener('change', () => {
        populateModelSelect();
        filterResults();
        updateImageComp1();
    });
    document.querySelector('#modelSelect').addEventListener('change', () => {
        filterResults();
        updateImageComp1();
    });
    document.querySelector('#aircraftSelect2').addEventListener('change', () => {
        populateModelSelect2();
        filterResults2();
    });
    document.querySelector('#modelSelect2').addEventListener('change', () => {
        filterResults2();
    });
});
document.addEventListener("DOMContentLoaded", () => {
    populateAircraftSelect2();
    document.querySelector('#aircraftSelect2').addEventListener('change', () => {
        populateModelSelect2();
        filterResults2();
        updateImageComp2();
    });
    document.querySelector('#modelSelect2').addEventListener('change', () => {
        filterResults2();
        updateImageComp2();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const aircraftSelect = document.getElementById('aircraftSelect');
    const modelSelect = document.getElementById('modelSelect');
    const selection = document.querySelector('.selection');
    const resultats = document.querySelector('.resultats');
    const hiddenClass = 'resultats--hidden';

    function checkCompletion() {
        if (aircraftSelect.value && modelSelect.value) {
            selection.classList.add(hiddenClass);
            resultats.classList.remove(hiddenClass);
        } else {
            selection.classList.remove(hiddenClass);
            resultats.classList.add(hiddenClass);
        }
    }

    aircraftSelect.addEventListener('change', checkCompletion);
    modelSelect.addEventListener('change', checkCompletion);
});


document.addEventListener('DOMContentLoaded', function() {
    const aircraftSelect = document.getElementById('aircraftSelect2');
    const modelSelect = document.getElementById('modelSelect2');
    const selection = document.querySelector('.selection2');
    const resultats = document.querySelector('.resultats2');
    const hiddenClass = 'resultats2--hidden';

    function checkCompletion() {
        if (aircraftSelect.value && modelSelect.value) {
            selection.classList.add(hiddenClass);
            resultats.classList.remove(hiddenClass);
        } else {
            selection.classList.remove(hiddenClass);
            resultats.classList.add(hiddenClass);
        }
    }

    aircraftSelect.addEventListener('change', checkCompletion);
    modelSelect.addEventListener('change', checkCompletion);
});

document.addEventListener('DOMContentLoaded', function() {
    const aircraftSelect = document.getElementById('aircraftSelect');
    const modelSelect = document.getElementById('modelSelect');
    const selection = document.querySelector('.selection');
    const resultats = document.querySelector('.resultats');
    const resetButton = document.querySelector('.btn-reset');
    const hiddenClass = 'resultats--hidden';

    const aircraftImageComp1 = document.getElementById('aircraft_image_comp1');

    // Store initial states
    const initialImageSrc = aircraftImageComp1.src;
    const initialDisplayStyle = aircraftImageComp1.style.display;

    function checkCompletion() {
        if (aircraftSelect.value && modelSelect.value) {
            selection.classList.add(hiddenClass);
            resultats.classList.remove(hiddenClass);
        } else {
            selection.classList.remove(hiddenClass);
            resultats.classList.add(hiddenClass);
        }
    }

    function resetSelections() {
        aircraftSelect.value = '';
        modelSelect.value = '';
        selection.classList.remove(hiddenClass);
        resultats.classList.add(hiddenClass);

        // Reset image
        aircraftImageComp1.src = initialImageSrc;
        aircraftImageComp1.style.display = initialDisplayStyle;
    }

    aircraftSelect.addEventListener('change', checkCompletion);
    modelSelect.addEventListener('change', checkCompletion);
    resetButton.addEventListener('click', resetSelections);
});

document.addEventListener('DOMContentLoaded', function() {
    const aircraftSelect = document.getElementById('aircraftSelect2');
    const modelSelect = document.getElementById('modelSelect2');
    const selection = document.querySelector('.selection2');
    const resultats = document.querySelector('.resultats2');
    const resetButton = document.querySelector('.btn-reset');
    const hiddenClass = 'resultats2--hidden';

    const aircraftImageComp1 = document.getElementById('aircraft_image_comp2');

    // Store initial states
    const initialImageSrc = aircraftImageComp1.src;
    const initialDisplayStyle = aircraftImageComp1.style.display;

    function checkCompletion() {
        if (aircraftSelect.value && modelSelect.value) {
            selection.classList.add(hiddenClass);
            resultats.classList.remove(hiddenClass);
        } else {
            selection.classList.remove(hiddenClass);
            resultats.classList.add(hiddenClass);
        }
    }

    function resetSelections() {
        aircraftSelect.value = '';
        modelSelect.value = '';
        selection.classList.remove(hiddenClass);
        resultats.classList.add(hiddenClass);

        // Reset image
        aircraftImageComp1.src = initialImageSrc;
        aircraftImageComp1.style.display = initialDisplayStyle;
    }

    aircraftSelect.addEventListener('change', checkCompletion);
    modelSelect.addEventListener('change', checkCompletion);
    resetButton.addEventListener('click', resetSelections);
});


document.addEventListener("DOMContentLoaded", function() {
    var button = document.querySelector(".btn-choisir");
    var gridBoutons = document.querySelector(".grid-boutons");
    var selects = gridBoutons.querySelectorAll("select");

    button.addEventListener("click", function() {
        gridBoutons.classList.toggle("grid-boutons__hidden");
    });

    selects.forEach(function(select) {
        select.addEventListener("change", function() {
            if (allSelectsFilled()) {
                gridBoutons.classList.add("grid-boutons__hidden");
            }
        });
    });

    function allSelectsFilled() {
        for (var i = 0; i < selects.length; i++) {
            if (selects[i].value === "") {
                return false;
            }
        }
        return true;
    }
});
