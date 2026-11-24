import {
  weeklyReports,
  environmentRecommendations,
  averageConditionGrowSeason,
} from "../data/sensorData.js";

const analysis_card = document.querySelector(".analysis-grid");
const recommendation_card = document.querySelector(".target-list");
const form_card = document.querySelector("#report-form");
const report_history_card = document.querySelector("#report-history-card");
const comparison_card = document.querySelector(".chart-card.comparison");
const chart_drawing_card = comparison_card
  .querySelector(".chart-container")
  .querySelector("#season-chart");
let currentSeason = 1;
let currentWeek = 3;
let dataComparison = [null, null, null];

const chart = new Chart(chart_drawing_card, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "blue",
        backgroundColor: "#0000ff20",
        fill: true,
        tension: 0.4,
      },
      {
        label: "",
        data: [],
        borderColor: "green",
        backgroundColor: "#00ff0020",
        fill: true,
        tension: 0.4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: false,

        title: {
          display: true,
          text: "Giá trị",
        },
      },
    },
  },
});
comparison_card.querySelector(".chart-heading").hidden = true;
comparison_card.querySelector(".chart-container").hidden = true;
comparison_card.querySelector(".empty-state").hidden = false;

form_card.addEventListener("submit", (event) => {
  event.preventDefault();
  const reports = {
    height: Number(form_card.querySelector("#report-height").value),
    leaves: Number(form_card.querySelector("#report-leaves").value),
    condition: form_card.querySelector("#report-condition").value,
    notes: form_card.querySelector("#report-notes").value,
  };
  weeklyReports[currentSeason] ??= {};
  weeklyReports[currentSeason][currentWeek] = reports;
  currentWeek++;
  form_card.reset();
});

function updateGrowEvaluation(status, statusClass, message, height, leaves) {
  const status_card = analysis_card.querySelector("#growth-status");
  const description_card = analysis_card.querySelector("#growth-description");
  const info_card = analysis_card.querySelector(".evaluation-info");
  status_card.textContent = status;
  status_card.classList.remove(["good", "normal", "bad"]);
  status_card.classList.add(statusClass);
  description_card.textContent = message;
  info_card.querySelector("#latest-height").textContent = `${height} cm`;
  info_card.querySelector("#latest-leaves").textContent = leaves;
}

function updateGrowRecommendation(weekData) {
  Object.entries(weekData).forEach(([keys, values], index) => {
    if (!recommendation_card.querySelector(`.target-item.${keys}-target`))
      return;
    const element = recommendation_card.querySelector(
      `.target-item.${keys}-target`,
    );
    element.querySelector("strong").textContent =
      `${values.value}${values.unit}`;
  });
}

function updateGrowWeeklys() {
  const recomment = environmentRecommendations[currentSeason][currentWeek];
  const evaluation = weeklyReports[currentSeason][currentWeek];
  updateGrowRecommendation(recomment);
  updateGrowEvaluation(
    evaluation.condition,
    evaluation.status,
    evaluation.notes,
    evaluation.height,
    evaluation.leaves,
  );
}

function countReports() {
  return Object.values(weeklyReports).reduce((accumulator, currentValue) => {
    return accumulator + Object.values(currentValue).length;
  }, 0);
}

function renderHtmlReport(
  season,
  week,
  height,
  leaves,
  status,
  statusClass,
  message,
) {
  return `
  <div class ="report-item">
    <div>
      <h4>Vụ ${String(season).padStart(2, "0")} Tuần ${String(week.padStart(2, "0"))}</h4>\
      <p>${height} cm - ${leaves} lá - ${message}</p>
    </div>
    <div class="report-status ${statusClass}">${status}</div>
  </div>
  `;
}

function createHistoryReport() {
  let reports = [];
  Object.entries(weeklyReports)
    .reverse()
    .forEach(([keys, values]) => {
      reports.push(
        Object.entries(values)
          .reverse()
          .map(([week, element]) => {
            return renderHtmlReport(
              keys,
              week,
              element.height,
              element.leaves,
              element.condition,
              element.status,
              element.notes,
            );
          })
          .join(""),
      );
    });
  return reports.join("");
}

function updateHistoryReport() {
  const countReport_card = report_history_card.querySelector("#report-count");
  const historyReport_card = report_history_card.querySelector("#report-list");
  const cnt = countReports();
  countReport_card.textContent = `${cnt} Báo cáo`;
  historyReport_card.innerHTML = createHistoryReport();
}

function createLabelWeekly(Season) {
  const labels = Object.keys(weeklyReports[Season]).map((week) => {
    return `Tuần ${week}`;
  });

  return labels;
}

function createLabelSeason(Season) {
  const labels = Object.keys(averageConditionGrowSeason[Season]).map((week) => {
    return `Tuần ${week}`;
  });

  return labels;
}
function getDataWeekly(Season) {
  const height = [];
  const leaves = [];
  Object.values(weeklyReports[Season]).forEach((week) => {
    height.push(week.height);
    leaves.push(week.leaves);
  });
  return [height, leaves];
}

function getDataSeason(Season) {
  const height = [];
  const leaves = [];
  Object.values(averageConditionGrowSeason[Season]).forEach((week) => {
    height.push(week.height);
    leaves.push(week.leaves);
  });
  return [height, leaves];
}

function createWeeklyChart() {
  const element = document.getElementById("growth-chart");
  const [height, leaves] = getDataWeekly(currentSeason);
  const elementChart = new Chart(element, {
    type: "line",
    data: {
      labels: createLabelWeekly(currentSeason),
      datasets: [
        {
          label: "Chiều cao (cm)",
          data: height,
          borderColor: "blue",
          tension: 0.4,
          backgroundColor: "#0000FF20",
          fill: true,
        },
        {
          label: "Số lá (chiếc)",
          data: leaves,
          borderColor: "green",
          tension: 0.4,
          backgroundColor: "#00ff0020",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {},
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Giá trị",
          },
        },
      },
    },
  });
}

function createLabelDataSeason() {
  const firstSeason = createLabelSeason(dataComparison[0]);
  const secondSeason = createLabelSeason(dataComparison[1]);
  return firstSeason.length > secondSeason.length ? firstSeason : secondSeason;
}
function createComparisonChart() {
  const chart_heading_card = comparison_card.querySelector(".chart-heading");
  const labels = createLabelDataSeason();
  const attributes = dataComparison[2] == "height" ? 0 : 1;
  const data = [
    getDataSeason(dataComparison[0]),
    getDataSeason(dataComparison[1]),
  ];
  chart.data.datasets[0].label = `Vụ ${String(dataComparison[0]).padStart(2, "0")}`;
  chart.data.datasets[1].label = `Vụ ${String(dataComparison[1]).padStart(2, "0")}`;
  chart.data.datasets[0].data = data[0][attributes];
  chart.data.datasets[1].data = data[1][attributes];
  chart.data.labels = labels;
  comparison_card.querySelector(".chart-heading").hidden = false;
  comparison_card.querySelector(".chart-container").hidden = false;
  comparison_card.querySelector(".empty-state").hidden = true;

  chart.update();
  const property = dataComparison[2] == "height" ? "chiều cao" : "số lượng lá";
  const unit = dataComparison[2] == "height" ? "cm" : "";
  chart_heading_card.querySelector(".comparison-title").textContent =
    `So sánh ${property} của cây`;
  chart_heading_card.querySelector(".chart-unit").textContent = unit;
}

function getSeasonComparison() {
  const card = comparison_card.querySelectorAll(".form-group");
  card.forEach((element, index) => {
    element.addEventListener("change", (event) => {
      console.log(event.target.value);
      if (!event.target.value) {
        dataComparison[index] = null;
      } else dataComparison[index] = String(event.target.value);
      const cnt = dataComparison.filter((data) => {
        return data != null;
      }).length;
      if (cnt == 3) {
        createComparisonChart();
      } else {
        comparison_card.querySelector(".chart-heading").hidden = true;
        comparison_card.querySelector(".chart-container").hidden = true;
        comparison_card.querySelector(".empty-state").hidden = false;
      }
    });
  });
}

updateGrowWeeklys();
updateHistoryReport();
createWeeklyChart();

getSeasonComparison();
