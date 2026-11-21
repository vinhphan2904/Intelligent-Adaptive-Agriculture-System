import { devices_status } from "../data/sensorData.js";

let total_device = Object.keys(devices_status).length;
let active_device = Object.values(devices_status).reduce(
  (accumulator, device) => {
    return accumulator + device.status;
  },
  0,
);

let total_device_card = document.querySelector("#total-devices");
let active_devices_card = document.querySelector("#active-devices");
let device_card = document.querySelector("#device-grid");

function updateDeviceActive() {
  total_device_card.textContent = total_device;
  active_devices_card.textContent = active_device;
}

function updateDevice() {
  updateDeviceActive();
  Object.entries(devices_status).forEach(([keys, values]) => {
    let element = device_card.querySelector(`.device-card.device-${keys}`);
    if (!element) return;
    const status = element.querySelector(".device-status");
    const device_info = element.querySelectorAll(".device-info");
    const toggle = element.querySelector(".fake-toggle");
    device_info[0].lastElementChild.textContent = values.id;
    device_info[1].lastElementChild.textContent = values.location;
    if (values.status) {
      status.textContent = "Bật";
      status.classList.remove("off");
      status.classList.add("on");
      toggle.classList.remove("off");
      toggle.classList.add("on");
    } else {
      status.textContent = "Tắt";
      status.classList.remove("on");
      status.classList.add("off");
      toggle.classList.remove("on");
      toggle.classList.add("off");
    }
  });
}

updateDevice();
