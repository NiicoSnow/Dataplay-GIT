"use strict";
        let crashData = [];
        let modelsByAircraft = {};
        let operatorsByModel = {};
        let dateByOperators={}
        let allModels = new Set();
        let allOperators = new Set();
        let allDates=new Set();

        window.onload = function () {
            fetch('crash_save2.json')
                .then(response => response.json())
                .then(data => {
                    crashData = data.crash;
                    displayData_cat(crashData);
                    loadFilters(crashData);
                });
        };

       
   
        function displayData_cat(data) {
            const p_pax_board = document.getElementById('pax_board');
            const p_pax = document.getElementById('pax');
            const p_cause = document.getElementById('cause');
            const p_pays = document.getElementById('pays');
          
            data.forEach(crash => {
            p_pax_board.innerHTML = `${crash["Pax on board"]}`;
            p_pax.innerHTML = `${crash["PAX fatalities"]}`;
            p_cause.innerHTML = `${crash["Crash cause"]}`;
            p_pays.innerHTML = `${crash.Country}`;  
            });
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
            dateByOperators={};
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
             const filteredData = crashData.filter(crash => {
                 const aircraftMatch = selectedAircraft === "" || crash.Aircraft === selectedAircraft;
                 const modelMatch = selectedModel === "" || crash.Model === selectedModel;
                 const operatorMatch = selectedOperator === "" || crash.Operator === selectedOperator;
                 const dateMatch = selectedDate === "" || crash.Date === selectedDate;
                 return aircraftMatch && modelMatch && operatorMatch && dateMatch;
             });

             displayData_cat(filteredData);
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
            const selectedOperator = document.getElementById('choix_operator').value;
            const optDate = document.getElementById('choix_date');
            optDate.innerHTML = '<option value="">Toutes les dates</option>';
           
            if (selectedOperator && dateByOperators[selectedOperator]) {
                dateByOperators[selectedOperator].forEach(dadates => {
                    const option = document.createElement('option');
                    option.value = dadates;
                    option.textContent = dadates;
                    optDate.appendChild(option);
                });
            }
        }
  
   