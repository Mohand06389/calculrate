// === Splash Screen Timer ===
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
    }, 2000); // 2 secondes
});

// === Navigation et Formulaire Dynamique ===
function nextPage() {
    const numModules = document.getElementById("num-modules").value;
    if (numModules && numModules > 0) {
        generateModuleForm(numModules);
    } else {
        alert("Veuillez entrer un nombre de modules valide.");
    }
}

function generateModuleForm(numModules) {
    const formContainer = document.getElementById("module-form-container");
    formContainer.innerHTML = ''; // Clear previous form

    for (let i = 1; i <= numModules; i++) {
        const moduleForm = document.createElement("div");
        moduleForm.classList.add("module-form");

        const label = document.createElement("h3");
        label.textContent = `Module ${i}`;

        const inputExamen = createInputField("EX", i);
        const inputTD = createInputField("TD", i);
        const inputTP = createInputField("TP", i);
        const inputCfs = createInputField("CFS", i, "number");

        moduleForm.append(label, inputExamen, inputTD, inputTP, inputCfs);
        formContainer.appendChild(moduleForm);
    }

    const button = document.createElement("button");
    button.textContent = "Calculer la moyenne";
    button.onclick = calculateMoyenne;
    formContainer.appendChild(button);

    const resultSection = document.createElement("div");
    resultSection.id = "result-section";
    resultSection.innerHTML = `
        <h3>Résultats :</h3>
        <p><strong>Somme des points :</strong> <span id="total-points">0</span></p>
        <p><strong>Somme des coefficients :</strong> <span id="total-coefficients">0</span></p>
        <p><strong>Moyenne semestrielle :</strong> <span id="moyenne-semestrielle">0</span></p>
    `;
    formContainer.appendChild(resultSection);
}

function createInputField(type, index, inputType = "text") {
    const input = document.createElement("input");
    input.type = inputType;
    input.placeholder = type;
    input.id = `${type.toLowerCase()}-${index}`;
    return input;
}

function calculateMoyenne() {
    let totalPoints = 0, totalCoefficients = 0;
    const numModules = document.getElementById("num-modules").value;

    for (let i = 1; i <= numModules; i++) {
        const examen = parseFloat(document.getElementById(`ex-${i}`).value) || 0;
        const cfs = parseFloat(document.getElementById(`cfs-${i}`).value) || 0;
        totalPoints += examen * cfs;
        totalCoefficients += cfs;
    }

    document.getElementById("moyenne-semestrielle").textContent = (totalPoints / totalCoefficients).toFixed(2);
}
