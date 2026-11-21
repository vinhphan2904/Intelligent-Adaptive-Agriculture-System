export const sensorData = {
  temperature: {
    id: "TEMP_01",
    name: "Nhiệt độ",
    value: 27.5,
    unit: "°C",

    min: 24.8,
    max: 29.2,

    target: {
      min: 20,
      max: 28,
    },

    description: "Nhiệt độ trong nhà kính",

    online: true,

    history: [
      24.8, 25.2, 25.7, 26.4, 27.1, 28.2, 29.2, 28.6, 28.1, 27.8, 27.5, 27.5,
    ],
  },

  air_humidity: {
    id: "HUM_01",
    name: "Độ ẩm không khí",
    value: 72,
    unit: "%",

    min: 65,
    max: 82,

    target: {
      min: 60,
      max: 80,
    },

    description: "Độ ẩm không khí tương đối",

    online: true,

    history: [78, 77, 75, 74, 72, 70, 68, 66, 65, 68, 70, 72],
  },

  soil_moisture: {
    id: "SOIL_01",
    name: "Độ ẩm đất",
    value: 64,
    unit: "%",

    min: 48,
    max: 71,

    target: {
      min: 55,
      max: 75,
    },

    description: "Độ ẩm đất trong chậu",

    online: true,

    history: [71, 70, 69, 67, 66, 64, 62, 60, 57, 55, 59, 64],
  },

  light_intensity: {
    id: "LIGHT_01",
    name: "Cường độ ánh sáng",
    value: 850,
    unit: "Lux",

    min: 120,
    max: 1250,

    target: {
      min: 600,
      max: 1200,
    },

    description: "Cường độ ánh sáng cây",

    online: true,

    history: [120, 250, 480, 720, 950, 1150, 1250, 1180, 1050, 980, 900, 850],
  },
};

export const timeLabels = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];
