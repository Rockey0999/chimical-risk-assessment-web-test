// Chemical data
const chemicalData = {
    "Caffeine": {
        "ld50": 192,
        "qsarRisk": 0.05,
        "details": {
            "Description": "Caffeine is a stimulant found in coffee, tea, and various other products.",
            "Diseases": "May cause insomnia, nervousness, restlessness, stomach irritation.",
            "Solution": "Limit intake of caffeinated beverages."
        }
    },
    "Aspartame": {
        "ld50": 5000,
        "qsarRisk": 0.01,
        "details": {
            "Description": "Aspartame is an artificial sweetener used in many low-calorie products.",
            "Diseases": "May cause headaches or allergic reactions in some individuals.",
            "Solution": "Monitor intake if sensitive to aspartame."
        }
    },
    // Add more chemicals as needed...
};

// Populate the chemical dropdown
const chemicalSelect = document.getElementById('chemical');
for (const chemical in chemicalData) {
    const option = document.createElement('option');
    option.value = chemical;
    option.textContent = chemical;
    chemicalSelect.appendChild(option);
}

// Calculate risk level
document.getElementById('calculate').addEventListener('click', () => {
    const chemical = document.getElementById('chemical').value;
    const age = parseFloat(document.getElementById('age').value);
    const bodyWeight = parseFloat(document.getElementById('body-weight').value);
    const concentration = parseFloat(document.getElementById('concentration').value);
    const exposure = parseFloat(document.getElementById('exposure').value);
    const ld50 = parseFloat(document.getElementById('ld50').value);

    if (!chemical || isNaN(age) || isNaN(bodyWeight) || isNaN(concentration) || isNaN(exposure) || isNaN(ld50)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const data = chemicalData[chemical];
    const qsarRisk = data.qsarRisk;

    // Calculate risk level
    const calculatedRisk = (concentration * exposure) / (bodyWeight * ld50);

    // Update results
    document.getElementById('qsar-risk').textContent = qsarRisk.toFixed(4);
    document.getElementById('calculated-risk').textContent = calculatedRisk.toExponential(4);
    document.getElementById('risk-classification').textContent = getRiskClassification(calculatedRisk);

    // Update chemical details
    document.getElementById('description').textContent = data.details.Description;
    document.getElementById('diseases').textContent = data.details.Diseases;
    document.getElementById('solution').textContent = data.details.Solution;

    // Generate graph
    generateGraph();
});

// Get risk classification
function getRiskClassification(riskLevel) {
    if (riskLevel > 0.1) return 'High';
    if (riskLevel > 0.01) return 'Moderate';
    return 'Low';
}

// Generate graph
function generateGraph() {
    const ctx = document.getElementById('risk-graph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['QSAR Predicted', 'Calculated'],
            datasets: [{
                label: 'Risk Levels',
                data: [
                    parseFloat(document.getElementById('qsar-risk').textContent),
                    parseFloat(document.getElementById('calculated-risk').textContent)
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
