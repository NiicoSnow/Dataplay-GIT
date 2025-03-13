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


/*
// Calcul de l'âge moyen par modèle d'avion
function calculateAverageAges(data) {
    console.log("age");
    const ageSums = {};
    const ageCounts = {};
  
    function calculerNbAnnee(anneeYOM, dateCrash) {
      const anneeConstruction = anneeYOM;
      const anneeCrash = new Date(dateCrash).getFullYear(); // Assurez-vous que dateCrash est bien un format date
      const ageAvion = anneeCrash - anneeConstruction;
      return ageAvion;
    }
  
    crashData.forEach(crash => {
      const model = crash.Model;
      const yom = crash.YOM;
      const dateCrash = crash.Date; // Assurez-vous que les données du crash incluent la date
      if (yom && dateCrash) {
        const age = calculerNbAnnee(yom, dateCrash);
        if (!ageSums[model]) {
          ageSums[model] = 0;
          ageCounts[model] = 0;
        }
        ageSums[model] += age;
        ageCounts[model] += 1;
        document.getElementById('p_nbAnnee').innerHTML = `${age}`;
      }
    });
  
    const averageAges = {};
    for (const model in ageSums) {
      averageAges[model] = (ageSums[model] / ageCounts[model]).toFixed(2);
    }
  
    return averageAges;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM chargé");
    const data = crashData; // Assurez-vous que crashData est correctement défini
    console.log("crashData :", data);
    if (!data) {
      console.error("crashData n'est pas défini.");
      return;
    }
    populateAircraftSelect2(); // Assurez-vous que cette fonction est définie
    document.querySelector('#moyAge').addEventListener('change', () => {
      const averageAges = calculateAverageAges(data);
      console.log(averageAges);
    });
  });
*/

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

    button.addEventListener("click", function() {
        gridBoutons.classList.toggle("grid-boutons__hidden");
    });
});

//ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION ANIM AVION 

let allowMovement = false; // Variable pour contrôler le mouvement horizontal
let elementsHidden = false; // Variable pour contrôler l'état des éléments cachés

document.addEventListener('keydown', function(event) {
    const avionProfil = document.getElementById('aircraft_image'); // Image de l'avion vue de profil
    const avionDessus = document.getElementById('aircraft_image_dessus'); // Image de l'avion vue de dessus
    const elementsAutour = document.querySelectorAll('.grid-info');
    const style = window.getComputedStyle(avionDessus);
    let left = parseInt(style.left) || 0; // Assure-toi que left est un nombre
    let top = parseInt(style.top) || 0; // Assure-toi que top est un nombre

    switch (event.key) {
        case 'ArrowUp':
            elementsHidden = !elementsHidden; // Inverser l'état des éléments cachés

            if (elementsHidden) {
                elementsAutour.forEach(element => {
                    element.style.opacity = '0';
                });
                avionProfil.style.display = 'none'; // Masque l'image de l'avion vue de profil
                allowMovement = true; // Permet le mouvement horizontal
                avionDessus.style.width = '600px'; // Augmente la taille de l'avion vue de dessus
            } else {
                elementsAutour.forEach(element => {
                    element.style.opacity = '1';
                });
                avionProfil.style.display = 'block'; // Affiche l'image de l'avion vue de profil
                avionDessus.style.left = '50%'; // Réinitialise la position de l'avion vue de dessus
                avionDessus.style.top = '50%';
                avionDessus.style.width = '300px'; // Restaure la taille originale de l'avion vue de dessus
                allowMovement = false; // Désactive le mouvement horizontal
            }
            break;
        case 'ArrowLeft':
            if (allowMovement) {
                avionDessus.style.left = (left - 15) + 'px'; // Déplace l'image de l'avion vue de dessus vers la gauche
            }
            break;
        case 'ArrowRight':
            if (allowMovement) {
                avionDessus.style.left = (left + 15) + 'px'; // Déplace l'image de l'avion vue de dessus vers la droite
            }
            break;
    }
});






