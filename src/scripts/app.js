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



let crashData = [];
let modelsByAircraft = {};
let operatorsByModel = {};
let dateByOperators = {};
let allModels = new Set();
let allOperators = new Set();
let allDates = new Set();

// Associer les modèles d'avion aux URL des images correspondantes
const aircraftImages = {
    "A320": "./assets/images/a320.png",
    "90 King Air": "./assets/images/90KA.png",
    "737-200": "./assets/images/737.png",
    "737-400": "./assets/images/737.png",
    "737-700": "./assets/images/737.png",
    "737-300": "./assets/images/737.png",
    "737-800": "./assets/images/737.png",
    "737 MAX 8": "./assets/images/737.png",
    "737-500": "./assets/images/737.png",
    " 560 Citation V": "./assets/images/560.png",
    "560 Citation V Ultra": "./assets/images/560.png",
    " 560 Citation Encore": "./assets/images/560.png",
    "560XLS Citation Excel": "./assets/images/560.png",
    "L-410": "./assets/images/410.png",
    "MD-83": "./assets/images/MD83.png"
};

const aircraftImagesUpper = {
    "A320": "./assets/images/a320D.png",
    "90 King Air": "./assets/images/90KAD.png",
    "737-200": "./assets/images/737D.png",
    "737-400": "./assets/images/737D.png",
    "737-700": "./assets/images/737D.png",
    "737-300": "./assets/images/737D.png",
    "737-800": "./assets/images/737D.png",
    "737 MAX 8": "./assets/images/737D.png",
    "737-500": "./assets/images/737D.png",
    " 560 Citation V": "./assets/images/560D.png",
    "560 Citation V Ultra": "./assets/images/560D.png",
    " 560 Citation Encore": "./assets/images/560D.png",
    "560XLS Citation Excel": "./assets/images/560D.png",
    "L-410": "./assets/images/410D.png",
    "MD-83": "./assets/images/MD83D.png"
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
      } else {
        console.log('not');
          aircraftImage.src = '';
          aircraftImage.style.display = 'none';
      }
}
function populateAircraftSelect() {
    const aircraftSet = new Set();
    aircraftModels = {};

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
    modelSelect.innerHTML = '<option value="">Sélectionner un Modèle</option>';

    if (selectedAircraft && aircraftModels[selectedAircraft]) {
        aircraftModels[selectedAircraft].forEach(model => {
            let option = document.createElement('option');
            option.value = model;
            option.textContent = model;
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
            crashCount++;
            totalFatalities += parseInt(crash["Total fatalities"]);
        }
    });

    const crashCountElement = document.getElementById("nbcrashs");
    const totalFatalitiesElement = document.getElementById("totfat");

    if (crashCountElement && totalFatalitiesElement) {
        crashCountElement.textContent = crashCount;
        totalFatalitiesElement.textContent = totalFatalities;
    } else {
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
      } else {
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

    modelSelect.innerHTML = '<option value="">Sélectionner un Modèle</option>';

    if (selectedAircraft && aircraftModels[selectedAircraft]) {
        aircraftModels[selectedAircraft].forEach(model => {
            let option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }

    modelSelect.addEventListener('change', () => {
        filterResults2();
        updateImageComp2();
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
    } else {
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

