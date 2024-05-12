const compareImages = require("resemblejs/compareImages");
const fs = require('fs');
const { config } = require("./config.json")


const options = config;

const scenarios = [
  {
    name: "CreatePage",
    steps: [
        "Login",
        "CreatePage",
        "DeletePage",
        "Logout"
      ],
  },
  {
    name: "CreatePost",
    steps: [
        "Login",
        "CreatePost",
        "DeletePost",
        "Logout"
      ],
  },
  {
    name: "CreateTag",
    steps: [
        "Login",
        "CreateTag",
        "DeleteTag",
        "Logout"
      ],
  },
  {
    name: "DeletePage",
    steps: [
        "Login",
        "CreatePage",
        "DeletePage",
        "Logout"
      ],
  },
  {
    name: "DeletePost",
    steps: [
        "Login",
        "CreatePost",
        "Logout"
      ],
  },
  {
    name: "DeleteTag",
    steps: [
        "Login",
        "CreateTag",
        "DeleteTag",
        "Logout"
      ],
  },
  {
    name: "EditPage",
    steps: [
        "Login",
        "CreatePage",
        "EditPage",
        "Delete",
        "Logout"
      ],
  },
  {
    name: "EditPost",
    steps: [
        "Login",
        "CreatePost",
        "EditPost",
        "DeletePage",
        "Logout"
      ],
  },
  {
    name: "EditTag",
    steps: [
        "Login",
        "CreateTag",
        "EditTag",
        "DeleteTag",
        "Logout"
      ],
  } 
];

async function executeCompare() {
  const datetime = new Date().toISOString().replace(/:/g, "");
  const results = [];

  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }

  for (const scenario of scenarios) {
    const scenarioResults = {
      name: scenario.name,
      steps: []
    };

    for (const step of scenario.steps) {
      
      const imagePath1 = `D:/GitUniAndes/PruebasAutomatizadasGhost/Pruebas_Automatizadas_Software_Ghost/Regresion/Cypress/cypress/screenshots/8080/${scenario.name}/${step}.png`;
      const imagePath2 = `D:/GitUniAndes/PruebasAutomatizadasGhost/Pruebas_Automatizadas_Software_Ghost/Regresion/Cypress/cypress/screenshots/9000/${scenario.name}/${step}.png`;

      const data = await compareImages(
        fs.readFileSync(imagePath1),
        fs.readFileSync(imagePath2),
        options
      );

      const resultInfo = {
        step,
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      };

      fs.writeFileSync(`./results/${datetime}/${scenario.name}_${step}_compare.png`, data.getBuffer());
      fs.copyFileSync(imagePath1, `./results/${datetime}/${scenario.name}_${step}_before.png`);
      fs.copyFileSync(imagePath2, `./results/${datetime}/${scenario.name}_${step}_after.png`);
      scenarioResults.steps.push(resultInfo);
    }

    results.push(scenarioResults);
  }

  fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, results));
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  console.log('---------------------------');
  console.log("Comparación finalizada");
  console.log("Consulte el reporte en la carpeta results con el nombre de la fecha");
}

function createReport(datetime, results) {
  let html = `
    <html>
      <head>
        <title>VRT Report</title>
        <link href="index.css" type="text/css" rel="stylesheet">
      </head>
      <body>
        <h1>Pruebas de regresión Visual (VRT)</h1>
        <h2>Reporte: ${datetime} </h2>
        <h2>Versiones de Ghost comparadas: 5.82 vs. 3.42</h2>
        <ul class="accordion">`;

  html += `
        </ul>`;

  for (const scenario of results) {
    html += `
      <div class="scenario" id="${scenario.name}">
        <h2>${scenario.name}</h2>
        <ul>`;
  
    for (const step of scenario.steps) {
      html += `
        <li class="step" id="${scenario.name}_${step.step}">
          <h3>${step.step}</h3>
          <div class="data-section">
          <p class="data-label">Porcentaje de Desajuste: ${step.rawMisMatchPercentage}%</p>
          <p class="data-label">Tiempo de Análisis: ${step.analysisTime} ms</p>
        </div>
          <div class="imgline">
            <div class="imgcontainer">
              <span class="imgname">Ghost 3.42</span>
              <img class="img2" src="${scenario.name}_${step.step}_before.png" label="Before">
            </div>
            <div class="imgcontainer">
              <span class="imgname">Ghost 5.82</span>
              <img class="img2" src="${scenario.name}_${step.step}_after.png" label="After">
            </div>
            <div class="imgcontainer">
              <span class="imgname">Comparasión</span>
              <img class="img2" src="${scenario.name}_${step.step}_compare.png" label="Comparison">
            </div>
          </div>
        </li>`;
    }
  
    html += `
        </ul>
      </div>`;
  }

  html += `
      <script>
        const scenarioElements = document.querySelectorAll('.scenario');
        const stepElements = document.querySelectorAll('.step');

        function toggleList(element) {
          element.classList.toggle('open');
        }

        scenarioElements.forEach(element => {
          element.addEventListener('click', () => toggleList(element));
        });

        stepElements.forEach(element => {
          element.addEventListener('click', () => toggleList(element));
        });
      </script>
      </body>
    </html>`;

  return html;
}

(async () => console.log(await executeCompare()))();