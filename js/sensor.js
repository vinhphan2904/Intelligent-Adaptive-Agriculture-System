import { sensorData, timeLabels } from "./sensorData.js";

// ======================================
// 1. SELECT ELEMENTS
// ======================================

const sensorCards = document.querySelectorAll(".sensor-card");

const detailName = document.getElementById("detail-name");
const detailValue = document.getElementById("detail-value");
const detailUnit = document.getElementById("detail-unit");
const detailStatus = document.getElementById("detail-status");

const detailMin = document.getElementById("detail-min");
const detailMax = document.getElementById("detail-max");
const detailTarget = document.getElementById("detail-target");

const detailDescription = document.getElementById("detail-description");

const detailConnection = document.getElementById("detail-connection");
const detailTime = document.getElementById("detail-time");
const detailId = document.getElementById("detail-id");

const rangeMarker = document.getElementById("range-marker");
const conditionResult = document.getElementById("condition-result");

// ======================================
// 2. SENSOR STATUS
// ======================================

function getSensorStatus(sensor) {
  // Check connection first
  if (!sensor.online) {
    return "Offline";
  }

  const value = sensor.value;

  const min = sensor.target.min;
  const max = sensor.target.max;

  if (value < min * 0.9 || value > max * 1.1) {
    return "Khẩn cấp";
  }

  if (value < min || value > max) {
    return "Cảnh báo";
  }

  return "Bình thường";
}

// ======================================
// 3. UPDATE STATUS BADGE
// ======================================

function updateBadge(element, status) {
  element.textContent = status;

  element.className = "status-badge";

  if (status === "Warning") {
    element.classList.add("warning");
  } else if (status === "Critical" || status === "Offline") {
    element.classList.add(status.toLowerCase());
  }
}

// ======================================
// 4. UPDATE SENSOR CARDS
// ======================================

function updateSensorCards() {
  Object.entries(sensorData).forEach(([key, sensor]) => {
    const valueElement = document.getElementById(`value-${key}`);

    const statusElement = document.getElementById(`status-${key}`);

    valueElement.textContent = sensor.value;

    const status = getSensorStatus(sensor);

    updateBadge(statusElement, status);
  });
}

// ======================================
// 5. UPDATE SENSOR DETAILS
// ======================================

function updateSensorDetails(sensorKey) {
  const sensor = sensorData[sensorKey];

  if (!sensor) return;

  detailName.textContent = sensor.name;

  detailValue.textContent = sensor.value;

  detailUnit.textContent = sensor.unit;

  detailMin.textContent = `${sensor.min} ${sensor.unit}`;

  detailMax.textContent = `${sensor.max} ${sensor.unit}`;

  detailTarget.textContent = `${sensor.target.min} - ${sensor.target.max} ${sensor.unit}`;

  detailDescription.textContent = sensor.description;

  detailConnection.textContent = sensor.online ? "Online" : "Offline";

  detailId.textContent = sensor.id;

  const status = getSensorStatus(sensor);

  updateBadge(detailStatus, status);

  updateCondition(sensor, status);
}

// ======================================
// 6. UPDATE GROWING CONDITIONS
// ======================================

function updateCondition(sensor, status) {
  const { min, max } = sensor.target;

  const value = sensor.value;

  // Calculate marker position
  const scaleMin = min * 0.5;
  const scaleMax = max * 1.5;

  const position = ((value - scaleMin) / (scaleMax - scaleMin)) * 100;

  const safePosition = Math.max(0, Math.min(100, position));

  rangeMarker.style.left = `${safePosition}%`;

  // Update message
  if (status === "Offline") {
    conditionResult.innerHTML = `
            <i class="fa-solid fa-circle-xmark"></i>

            <div>
                <strong>Sensor Offline</strong>
                <p>Server đang không hoạt động.</p>
            </div>
        `;

    conditionResult.style.background = "#ffeded";
  } else if (status === "Normal") {
    conditionResult.innerHTML = `
            <i class="fa-solid fa-check"></i>

            <div>
                <strong>Trong phạm vi mục tiêu</strong>
                <p>Dữ liệu hiện tại đang ở trong phạm vi tiêu chuẩn.</p>
            </div>
        `;

    conditionResult.style.background = "#eff8f1";
  } else if (status === "Warning") {
    conditionResult.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation"></i>

            <div>
                <strong>Vượt khỏi phạm vi</strong>
                <p>Thông số hiện tại vượt quá phạm vi cho phép.</p>
            </div>
        `;

    conditionResult.style.background = "#fff5e5";
  } else {
    conditionResult.innerHTML = `
            <i class="fa-solid fa-circle-exclamation"></i>

            <div>
                <strong>Khẩn cấp</strong>
                <p>Cần kiểm tra khẩn cấp hệ thống và cây trồng.</p>
            </div>
        `;

    conditionResult.style.background = "#ffeded";
  }
}

// ======================================
// 7. SENSOR CARD CLICK EVENTS
// ======================================

function setupSensorEvents() {
  sensorCards.forEach((card) => {
    card.addEventListener("click", () => {
      const sensorKey = card.dataset.sensor;

      // Remove selected class
      sensorCards.forEach((item) => {
        item.classList.remove("selected");
      });

      // Add selected class
      card.classList.add("selected");

      // Update detail panel
      updateSensorDetails(sensorKey);
    });
  });
}

// ======================================
// 8. CREATE CHARTS
// ======================================

const chartColors = {
  temperature: "#ed985f",
  air_humidity: "#62a4df",
  soil_moisture: "#78b66a",
  light_intensity: "#e2b43f",
};

function createCharts() {
  Object.entries(sensorData).forEach(([key, sensor]) => {
    const canvas = document.getElementById(`chart-${key}`);

    new Chart(canvas, {
      type: "line",

      data: {
        labels: timeLabels,

        datasets: [
          {
            label: sensor.name,

            data: sensor.history,

            borderColor: chartColors[key],

            backgroundColor: chartColors[key] + "20",

            borderWidth: 2,

            pointRadius: 2,

            pointHoverRadius: 5,

            fill: true,

            tension: 0.35,
          },
        ],
      },

      options: {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: false,
          },

          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.parsed.y} ${sensor.unit}`;
              },
            },
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },
          },

          y: {
            beginAtZero: false,
          },
        },
      },
    });
  });
}

// ======================================
// 9. INITIALIZE
// ======================================

function initializeSensors() {
  updateSensorCards();

  updateSensorDetails("temperature");

  setupSensorEvents();

  createCharts();
}

initializeSensors();
