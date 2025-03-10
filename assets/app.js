"use strict";

let crashData = [];
let aircraftModels = {};

// Charger les données JSON
fetch('crash_save2.json') // Assurez-vous que le fichier est bien accessible
    .then(response => response.json())
    .then(data => {
        crashData = data.crash;
        populateAircraftSelect();
    });

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
    const results = {};

    // Regrouper par Aircraft & Model et additionner les crashs et victimes
    crashData.forEach(crash => {
        if (crash.Aircraft === selectedAircraft && crash.Model === selectedModel) {
            const key = crash.Aircraft + '|' + crash.Model;
            if (!results[key]) {
                results[key] = {
                    Aircraft: crash.Aircraft,
                    Model: crash.Model,
                    CrashCount: 0,
                    TotalFatalities: 0
                };
            }
            results[key].CrashCount++;
            results[key].TotalFatalities += parseInt(crash["Total fatalities"]);
        }
    });

    // Afficher les résultats dans le tableau
    const tableBody = document.getElementById("results");
    tableBody.innerHTML = Object.values(results).map(entry => `
        <tr>
            <td>${entry.Aircraft}</td>
            <td>${entry.Model}</td>
            <td>${entry.CrashCount}</td>
            <td>${entry.TotalFatalities}</td>
        </tr>
    `).join('');
}