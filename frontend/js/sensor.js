import {
  sensorData,
  timeLabels,
  history_dataSensor,
  chartColors,
} from "../data/sensorData.js";

let sensor_card = document.querySelectorAll(".sensor-card");
let detail_panel_card = document.querySelector(".details-layout");
let chart_card = document.querySelectorAll(".chart-card");

function updateSensorCard() {
  sensor_card.forEach((element) => {
    Object.entries(sensorData).forEach(([keys, values]) => {
      if (element.dataset.sensor == keys) {
        const condition = element.querySelector(".status-badge");
        condition.textContent = values.condition;
        const value = element.querySelector(".sensor-value");
        value.innerHTML = `
             <strong id="value-temperature">${values.value}</strong>
            <span>${values.unit}</span>
            `;
      } else return;
    });
  });
}

function updateBadge(data) {
  let name = detail_panel_card.querySelector("#detail-name");
  let status = detail_panel_card.querySelector("#detail-status");
  let value = detail_panel_card.querySelector(".detail-value");
  let description = detail_panel_card.querySelector("#detail-description");
  let min = detail_panel_card.querySelector("#detail-min");
  let max = detail_panel_card.querySelector("#detail-max");
  let target = detail_panel_card.querySelector("#detail-target");
  let connect = detail_panel_card.querySelector("#detail-connection");
  let sensor_id = detail_panel_card.querySelector("#detail-id");

  name.textContent = data.sensor;
  status.textContent = data.condition;
  value.innerHTML = `
        <strong id="detail-value">${data.value}</strong>
        <span id="detail-unit">${data.unit}</span>
    `;
  description.textContent = data.description;
  min.textContent = data.min;
  max.textContent = data.max;
  target.textContent = `${data.target.min} - ${data.target.max}`;
  if (data.connection) {
    connect.textContent = "Online";
  } else connect.textContent = "Offline";
  sensor_id.textContent = data.sensor_ID;
}

function updateGrow_condition(data) {
  let range_maker = detail_panel_card.querySelector("#range-marker");
  let range_bar = detail_panel_card.querySelector(".range-bar");
  let current = Math.max(
    0,
    Math.min(
      100,
      parseInt(((data.value - data.min) / (data.max - data.min)) * 100),
    ),
  );
  range_maker.style.left = `${current}%`;
  const total = data.max - data.min;
  const low = ((data.target.min - data.min) / total) * 100;
  const high = ((data.max - data.target.max) / total) * 100;
  const target = 100 - low - high;
  range_bar.style.background = `linear-gradient(
    90deg,
    #f1c46d 0 ${low}%,
    #69c98a ${low}% ${low + target}%,
    #e98c83 ${target + low}%
  )`;
  let evaluation = detail_panel_card.querySelector("#condition-result");
  if (data.value <= data.target.max && data.value >= data.target.min) {
    evaluation.innerHTML = `
                <i class="fa-solid fa-check"></i>

                <div>
                  <strong>Đánh giá</strong>
                  <p id="evaluation-condition">Dữ liệu hiện tại nằm trong mục tiêu</p>
                </div>
    `;
  } else if (
    (data.value < data.target.min && data.value > data.min) ||
    (data.value > data.target.max && data.value < data.max)
  ) {
    evaluation.innerHTML = `
                <i class="fa-solid fa-exclamation" style = "color:#d49b40"></i>

                <div>
                  <strong>Đánh giá</strong>
                  <p id="evaluation-condition" style= "color: #d49b40;">Dữ liệu hiện tại đang nằm ngoài mục tiêu</p>
                </div>
    `;
  } else {
    evaluation.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation" style = "color:red"></i>

                <div>
                  <strong>Đánh giá</strong>
                  <p id="evaluation-condition" style= "color:red">Dữ liệu đáng báo động</p>
                </div>
    `;
  }
}

function selectCard() {
  sensor_card.forEach((sensor) => {
    sensor.addEventListener("click", () => {
      let data = {};
      sensor_card.forEach((sensor) => {
        sensor.classList.remove("selected");
      });
      Object.entries(sensorData).forEach(([keys, values]) => {
        if (sensor.dataset.sensor == keys) {
          data = values;
        }
      });
      if (!data) return;
      updateBadge(data);
      updateGrow_condition(data);
      sensor.classList.add("selected");
    });
  });
}

function createChart(name, data, timeLabels, color, unit) {
  const element = document.querySelector(`#chart-${name}`);
  new Chart(element, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: name,
          data: data,
          borderColor: color,
          backgroundColor: color + "20",
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
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
            label: function (context) {
              return context.parsed.y + unit;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Thời gian",
          },
        },

        y: {
          title: {
            display: true,
            text: unit,
          },

          beginAtZero: false,
        },
      },
    },
  });
}

function updateChart() {
  Object.entries(history_dataSensor).forEach(([keys, values]) => {
    createChart(keys, values.value, timeLabels, chartColors[keys], values.unit);
  });
}
updateSensorCard();
selectCard();
updateChart();
