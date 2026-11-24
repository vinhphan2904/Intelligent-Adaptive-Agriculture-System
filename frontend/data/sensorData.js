let sensorData = {
  temperature: {
    value: 25,
    sensor: "Nhiệt độ",
    unit: "°C",
    condition: "Bình thường",
    target: {
      min: 25,
      max: 30,
    },
    min: 20,
    max: 35,
    connection: true,
    icon: "fa-solid fa-temperature-half",
    sensor_ID: "DEV_01",
  },
  humidity: {
    value: 24,
    sensor: "Độ ẩm không khí",
    unit: "%",
    condition: "Bình thường",
    target: {
      min: 25,
      max: 30,
    },
    min: 20,
    max: 35,
    connection: true,
    icon: "fa-solid fa-droplet",
    sensor_ID: "DEV_02",
  },
  soil: {
    value: 29,
    sensor: "Độ ẩm đất",
    unit: "%",
    condition: "Bình thường",
    target: {
      min: 25,
      max: 30,
    },
    min: 20,
    max: 35,
    connection: true,
    icon: "fa-solid fa-seedling",
    sensor_ID: "DEV_03",
  },
  led: {
    value: 700,
    sensor: "Cường độ ánh sáng",
    unit: "Lux",
    condition: "Bình thường",
    target: {
      min: 400,
      max: 600,
    },
    min: 100,
    max: 800,
    connection: true,
    icon: "fa-solid fa-sun",
    sensor_ID: "DEV_04",
  },
};

let environmentData = {
  temperature: {
    value: 33,
    unit: "°C",
    sensor: "Nhiệt độ",
    icon: "fa-solid fa-temperature-half",
  },
  humidity: {
    value: 70,
    unit: "%",
    sensor: "Độ ẩm đất",
    icon: "fa-solid fa-droplet",
  },
};

let weather = {
  status: "Bình thường",

  icon: "fa-solid fa-cloud-sun",
};

let devices_status = {
  fan: {
    status: true,
    lock: true,
    id: "DEV-001",
    location: "Trong nhà",
  },
  pump: {
    status: true,
    lock: true,
    id: "DEV-002",
    location: "Hệ thống máy bơm",
  },
  led: {
    status: true,
    lock: true,
    id: "DEV-003",
    location: "Trong nhà",
  },
  misting: {
    status: false,
    lock: true,
    id: "DEV-004",
    location: "Trong nhà",
  },
  window: {
    status: true,
    lock: true,
    id: "DEV-005",
    location: "Trong nhà",
  },
};

let ai_analysis = {
  icon: "fa-solid fa-circle-check",
  message: "Cây phát triển tốt",
  accuracy: 90,
};

let timeLabels = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
];

let history_dataSensor = {
  temperature: { value: [25, 24, 25, 28, 32, 31, 29, 28.5], unit: "°C" },
  humidity: { value: [25, 24, 25, 28, 32, 31, 29, 28.5], unit: "%" },
  soil: { value: [25, 24, 25, 28, 32, 31, 29, 28.5], unit: "%" },
  led: { value: [25, 24, 25, 28, 32, 31, 29, 28.5], unit: "Lux" },
};

const chartColors = {
  temperature: "#ed985f",
  humidity: "#62a4df",
  soil: "#78b66a",
  led: "#e2b43f",
};

let history_crop_comparision = {
  1: {
    1: {
      date: "01/11/2026",
      parameters: {
        temperature: {
          current: 25,
          unit: "°C",
        },
        humidity: {
          current: 70,
          unit: "%",
        },
        soil: {
          current: 60,
          unit: "%",
        },
        led: {
          current: 15000,
          unit: "lux",
        },
      },
    },

    2: {
      date: "01/12/2026",
      parameters: {
        temperature: {
          current: 26,
          unit: "°C",
        },
        humidity: {
          current: 80,
          unit: "%",
        },
        soil: {
          current: 60,
          unit: "%",
        },
        led: {
          current: 10000,
          unit: "lux",
        },
      },
    },
  },
};

let weeklyReports = {
  1: {
    1: {
      height: 4.2,
      leaves: 2,
      condition: "Tốt",
      status: "good",
      notes: "Cây phát triển tốt.",
    },
    2: {
      height: 6.5,
      leaves: 4,
      condition: "Tốt",
      status: "good",
      notes: "Nhiều lá xuất hiện",
    },
    3: {
      height: 7,
      leaves: 5,
      condition: "Bình thường",
      status: "normal",
      notes: "Sự phát triển tương đối ổn định.",
    },
  },
  2: {
    1: {
      height: 4.2,
      leaves: 2,
      condition: "Tệ",
      status: "bad",
      notes: "Cây chậm phát triển.",
    },
    2: {
      height: 6.5,
      leaves: 4,
      condition: "Tốt",
      status: "good",
      notes: "Nhiều lá xuất hiện",
    },
    3: {
      height: 7,
      leaves: 5,
      condition: "Bình thường",
      status: "normal",
      notes: "Sự phát triển tương đối ổn định.",
    },
  },
  3: {
    1: {
      height: 4.2,
      leaves: 2,
      condition: "Tệ",
      status: "bad",
      notes: "Cây chậm phát triển.",
    },
    2: {
      height: 6.5,
      leaves: 4,
      condition: "Tốt",
      status: "good",
      notes: "Nhiều lá xuất hiện",
    },
    3: {
      height: 7,
      leaves: 5,
      condition: "Bình thường",
      status: "normal",
      notes: "Sự phát triển tương đối ổn định.",
    },
  },
};

let environmentRecommendations = {
  1: {
    1: {
      temperature: {
        value: 25,
        unit: "°C",
      },
      humidity: {
        value: 65,
        unit: "%",
      },
      soil: {
        value: 60,
        unit: "%",
      },
      led: {
        value: 8000,
        unit: "lux",
      },
    },

    2: {
      temperature: {
        value: 26,
        unit: "°C",
      },
      humidity: {
        value: 70,
        unit: "%",
      },
      soil: {
        value: 65,
        unit: "%",
      },
      led: {
        value: 9000,
        unit: "lux",
      },
    },

    3: {
      temperature: {
        value: 24,
        unit: "°C",
      },
      humidity: {
        value: 68,
        unit: "%",
      },
      soil: {
        value: 60,
        unit: "%",
      },
      led: {
        value: 10000,
        unit: "lux",
      },
    },
  },

  2: {
    1: {
      temperature: {
        value: 24,
        unit: "°C",
      },
      humidity: {
        value: 65,
        unit: "%",
      },
      soil: {
        value: 55,
        unit: "%",
      },
      led: {
        value: 8500,
        unit: "lux",
      },
    },

    2: {
      temperature: {
        value: 25,
        unit: "°C",
      },
      humidity: {
        value: 68,
        unit: "%",
      },
      soil: {
        value: 60,
        unit: "%",
      },
      led: {
        value: 9500,
        unit: "lux",
      },
    },
  },
};

let averageConditionGrowSeason = {
  1: {
    1: { height: 4.2, leaves: 2 },
    2: { height: 6.5, leaves: 4 },
    3: { height: 8.7, leaves: 5 },
    4: { height: 10.5, leaves: 7 },
  },

  2: {
    1: { height: 5.1, leaves: 3 },
    2: { height: 8.2, leaves: 5 },
    3: { height: 11.4, leaves: 7 },
    4: { height: 13.6, leaves: 9 },
    5: { height: 15.8, leaves: 11 },
  },

  3: {
    1: { height: 5.8, leaves: 4 },
    2: { height: 9.2, leaves: 7 },
    3: { height: 12.5, leaves: 9 },
    4: { height: 15.4, leaves: 12 },
    5: { height: 18.2, leaves: 14 },
  },
};

export {
  sensorData,
  environmentData,
  weather,
  devices_status,
  ai_analysis,
  timeLabels,
  history_dataSensor,
  chartColors,
  history_crop_comparision,
  weeklyReports,
  environmentRecommendations,
  averageConditionGrowSeason,
};
