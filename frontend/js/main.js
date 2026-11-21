import {
  sensorData,
  environmentData,
  devices_status,
  weather,
  ai_analysis,
} from "../data/sensorData.js";

let sensor_card = document.querySelectorAll(".sensor-card");
let environment_card = document.querySelectorAll(".weather-item");
let ai_analysis_card = document.querySelector(".ai-result");
let devices_status_card = document.querySelectorAll(".device");
function updateWeather() {
  let [status, icon] = [weather.status, weather.icon];
  const element = document.querySelector(`.weather-item.weather-environment`);
  element.innerHTML = `
        <i class="${icon}"></i>
        <p>Thời tiết</p>
        <h2>${status}</h2>
        `;
}

function updateSensorCard() {
  Object.entries(sensorData).forEach(([key, value]) => {
    const element = document.querySelector(`.sensor-card.${key}-sensor`);
    if (!element) return;

    element.innerHTML = `
              <div class="sensor-icon ${key}">
                <i class="${value.icon}"></i>
              </div>

            <p>${value.sensor}</p>

            <h2>${value.value}${value.unit}</h2>

            <span>${value.condition}</span>
        `;
  });
}

function updateEnvironment() {
  Object.entries(environmentData).forEach(([keys, values]) => {
    let element = document.querySelector(`.weather-item.${keys}-environment`);
    if (!element) return;

    element.innerHTML = `
        <i class="${values.icon}"></i>
        <p>${values.sensor}</p>
        <h2>${values.value}${values.unit}</h2>
        `;
  });
  updateWeather();
}

function updateAI_Analysis() {
  ai_analysis_card.innerHTML = `
                    <div class="ai-status">
                  <i class="${ai_analysis.icon}"></i>
                  ${ai_analysis.message}
                </div>

                <p>AI dự đoán điều kiện phát triển của cây</p>

                <div class="confidence">
                  <span>Độ chính xác</span>
                  <strong>${ai_analysis.accuracy}%</strong>
                </div>

                <div class="progress-bar">
                  <div class="progress" style="width: ${ai_analysis.accuracy}%"></div>
                </div>`;
}

function updateDevice() {
  Object.entries(devices_status).forEach(([device, value]) => {
    let element = document.querySelector(`.device.${device}`)
    if (element) {
      if (value.status) {
        element.querySelector(`.running`).className = "running on";
      } else element.querySelector(`.running`).className = "running off";
    }
  });
}

updateSensorCard();
updateEnvironment();
updateAI_Analysis();
updateDevice();
