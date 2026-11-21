// ======================================
// SAMPLE DATA
// ======================================

let weeklyReports = [
  {
    week: 1,
    height: 4.2,
    leaves: 2,
    condition: "Good",
    notes: "The plant is developing normally.",
  },
  {
    week: 2,
    height: 6.5,
    leaves: 4,
    condition: "Good",
    notes: "New leaves have appeared.",
  },
  {
    week: 3,
    height: 7,
    leaves: 5,
    condition: "Normal",
    notes: "Growth is slightly slower.",
  },
];

const seasonData = {
  season1: {
    name: "Season 01",
    height: [4.2, 6.5, 7, 10.5, 14],
    leaves: [2, 4, 5, 7, 9],
  },

  season2: {
    name: "Season 02",
    height: [5, 7, 9, 12, 16],
    leaves: [3, 5, 7, 9, 12],
  },

  season3: {
    name: "Season 03",
    height: [3.8, 5.5, 8, 11, 13],
    leaves: [2, 4, 6, 8, 10],
  },
};

// ======================================
// DOM ELEMENTS
// ======================================

const reportForm = document.getElementById("report-form");
const reportList = document.getElementById("report-list");
const reportCount = document.getElementById("report-count");

const latestHeight = document.getElementById("latest-height");
const latestLeaves = document.getElementById("latest-leaves");

const growthStatus = document.getElementById("growth-status");
const growthDescription = document.getElementById("growth-description");

const seasonOne = document.getElementById("season-one");
const seasonTwo = document.getElementById("season-two");
const metricSelect = document.getElementById("comparison-metric");

const insightText = document.getElementById("season-insight-text");

// ======================================
// WEEKLY REPORTS
// ======================================

function renderReports() {
  reportList.innerHTML = "";

  weeklyReports.forEach((report) => {
    const reportItem = document.createElement("div");

    reportItem.className = "report-item";

    const information = document.createElement("div");

    const title = document.createElement("h4");
    title.textContent = `Week ${String(report.week).padStart(2, "0")}`;

    const description = document.createElement("p");
    description.textContent = `${report.height} cm · ${report.leaves} leaves · ${report.notes || "No additional notes"}`;

    const status = document.createElement("span");
    status.className = "report-status";
    status.textContent = report.condition;

    information.append(title, description);
    reportItem.append(information, status);

    reportList.appendChild(reportItem);
  });

  reportCount.textContent = `${weeklyReports.length} reports`;
}

// ======================================
// ADD NEW REPORT
// ======================================

reportForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const height = Number(document.getElementById("report-height").value);

  const leaves = Number(document.getElementById("report-leaves").value);

  const condition = document.getElementById("report-condition").value;

  const notes = document.getElementById("report-notes").value;

  const latestWeek = weeklyReports.length
    ? Math.max(...weeklyReports.map((report) => report.week))
    : 0;

  const newReport = {
    week: latestWeek + 1,
    height,
    leaves,
    condition,
    notes,
  };

  weeklyReports.push(newReport);

  renderReports();
  updateGrowthChart();
  updateWeeklyAnalysis();

  reportForm.reset();
});

// ======================================
// WEEKLY AI ANALYSIS - DEMO LOGIC
// ======================================

function updateWeeklyAnalysis() {
  if (weeklyReports.length === 0) {
    growthStatus.textContent = "No Report";
    growthDescription.textContent = "Submit a weekly report to begin analysis.";
    latestHeight.textContent = "--";
    latestLeaves.textContent = "--";
    return;
  }

  const latest = weeklyReports[weeklyReports.length - 1];
  const previous = weeklyReports[weeklyReports.length - 2];

  latestHeight.textContent = `${latest.height} cm`;
  latestLeaves.textContent = latest.leaves;

  if (!previous) {
    growthStatus.textContent = "First Report";
    growthDescription.textContent =
      "A previous report is needed to compare plant growth.";
    return;
  }

  const heightChange = latest.height - previous.height;
  const leafChange = latest.leaves - previous.leaves;

  if (latest.condition === "Poor" || heightChange < 0 || leafChange < 0) {
    growthStatus.textContent = "Needs Attention";

    growthDescription.textContent =
      "Plant development may need attention. Review recent sensor data and growing conditions.";
  } else if (heightChange > 0 && leafChange > 0) {
    growthStatus.textContent = "Good Growth";

    growthDescription.textContent = `Plant height increased by ${heightChange.toFixed(1)} cm and ${leafChange} new leaves were recorded compared with the previous report.`;
  } else {
    growthStatus.textContent = "Stable Growth";

    growthDescription.textContent =
      "Plant development is relatively stable compared with the previous report.";
  }
}

// ======================================
// GROWTH PROGRESS CHART
// ======================================

const growthCanvas = document.getElementById("growth-chart");

const growthChart = new Chart(growthCanvas, {
  type: "line",

  data: {
    labels: [],
    datasets: [
      {
        label: "Plant Height",
        data: [],
        borderColor: "#35b96b",
        backgroundColor: "rgba(53, 185, 107, 0.12)",
        fill: true,
        tension: 0.35,
        pointRadius: 4,
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
    },

    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Height (cm)",
        },
      },
    },
  },
});

function updateGrowthChart() {
  growthChart.data.labels = weeklyReports.map(
    (report) => `Week ${report.week}`,
  );

  growthChart.data.datasets[0].data = weeklyReports.map(
    (report) => report.height,
  );

  growthChart.update();
}

// ======================================
// SEASON COMPARISON CHART
// ======================================

const seasonCanvas = document.getElementById("season-chart");

const seasonChart = new Chart(seasonCanvas, {
  type: "line",

  data: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [],
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
      x: {
        title: {
          display: true,
          text: "Plant Age",
        },
      },

      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Plant Height (cm)",
        },
      },
    },
  },
});

// ======================================
// UPDATE SEASON COMPARISON
// ======================================

function updateSeasonChart() {
  const firstKey = seasonOne.value;
  const secondKey = seasonTwo.value;
  const metric = metricSelect.value;

  const firstSeason = seasonData[firstKey];
  const secondSeason = seasonData[secondKey];

  const isHeight = metric === "height";

  const metricName = isHeight ? "Plant Height" : "Number of Leaves";

  const unit = isHeight ? "cm" : "leaves";

  document.getElementById("comparison-title").textContent =
    `${metricName} Comparison`;

  document.getElementById("comparison-unit").textContent = unit;

  if (firstKey === secondKey) {
    seasonChart.data.datasets = [];
    seasonChart.update();

    insightText.textContent = "Please select two different seasons to compare.";

    return;
  }

  seasonChart.data.datasets = [
    {
      label: firstSeason.name,
      data: firstSeason[metric],
      borderColor: "#35b96b",
      backgroundColor: "#35b96b",
      tension: 0.35,
      pointRadius: 4,
    },

    {
      label: secondSeason.name,
      data: secondSeason[metric],
      borderColor: "#5799d5",
      backgroundColor: "#5799d5",
      tension: 0.35,
      pointRadius: 4,
    },
  ];

  seasonChart.options.scales.y.title.text = `${metricName} (${unit})`;

  seasonChart.update();

  updateSeasonInsight(firstSeason, secondSeason, metric);
}

// ======================================
// SEASON INSIGHTS - DEMO LOGIC
// ======================================

function updateSeasonInsight(firstSeason, secondSeason, metric) {
  const firstValues = firstSeason[metric];
  const secondValues = secondSeason[metric];

  const firstAverage = getAverage(firstValues);
  const secondAverage = getAverage(secondValues);

  const metricName =
    metric === "height" ? "average plant height" : "average number of leaves";

  if (secondAverage > firstAverage) {
    insightText.textContent = `${secondSeason.name} has a higher ${metricName} than ${firstSeason.name} in this sample data.`;
  } else if (firstAverage > secondAverage) {
    insightText.textContent = `${firstSeason.name} has a higher ${metricName} than ${secondSeason.name} in this sample data.`;
  } else {
    insightText.textContent = `Both seasons have the same ${metricName} in this sample data.`;
  }
}

// ======================================
// HELPER
// ======================================

function getAverage(values) {
  const total = values.reduce((sum, value) => sum + value, 0);

  return total / values.length;
}

// ======================================
// EVENT LISTENERS
// ======================================

seasonOne.addEventListener("change", updateSeasonChart);
seasonTwo.addEventListener("change", updateSeasonChart);
metricSelect.addEventListener("change", updateSeasonChart);

// ======================================
// INITIALIZE
// ======================================

renderReports();
updateWeeklyAnalysis();
updateGrowthChart();
updateSeasonChart();
