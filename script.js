// script.js
const chemicalData = {
    "Caffeine": {
        description: "Found in coffee, tea, and many energy drinks.",
        riskLevels: {
            qsar: 0.05,
            experimental: 0.04,
            custom: 0.0143
        }
    },
    "Aspartame": {
        description: "Used as an artificial sweetener in many diet products.",
        riskLevels: {
            qsar: 0.01,
            experimental: 0.005,
            custom: 0.0179
        }
    },
    // Add more chemical data
};

function updateChemicalDetails() {
    const select = document.getElementById("chemicalSelect");
    const detailsDiv = document.getElementById("chemicalDetails");
    const chemical = select.value;

    if (chemical && chemicalData[chemical]) {
        detailsDiv.querySelector("#chemicalDescription").textContent = `Description: ${chemicalData[chemical].description}`;
        detailsDiv.querySelector("#chemicalRiskLevels").textContent = `QSAR Model Risk Level: ${chemicalData[chemical].riskLevels.qsar}, Experimental Risk Level: ${chemicalData[chemical].riskLevels.experimental}, Custom Formula Risk Level: ${chemicalData[chemical].riskLevels.custom}`;
        renderChart(chemical);
    } else {
        detailsDiv.querySelector("#chemicalDescription").textContent = "";
        detailsDiv.querySelector("#chemicalRiskLevels").textContent = "";
    }
}

function renderChart(chemical) {
    const ctx = document.getElementById('riskChart').getContext('2d');
    const data = chemicalData[chemical].riskLevels;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['QSAR Model', 'Experimental', 'Custom Formula'],
            datasets: [{
                label: 'Risk Level',
                data: [data.qsar, data.experimental, data.custom],
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
