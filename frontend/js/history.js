import { history_crop_comparision } from "../data/sensorData.js";

const filter_grid_card = document.querySelector(".filter-grid");
const week_show = document.getElementById("week-panel");
const empty_show = document.getElementById("empty-state");

let selected_week = {};

function createSeasonCard() {
  const element = document.createElement("select");
  element.className = "season-select";
  const select_season = Object.keys(history_crop_comparision)
    .map((season, index) => {
      return `<option value= ${index + 1}> ${String(index + 1).padStart(2, "0")} </option>`;
    })
    .join("");
  element.innerHTML = '<option value = "" >Chọn vụ</option>' + select_season;
  return element;
}

function createWeekCard(season) {
  const select_week = document.createElement("select");
  select_week.className = "week-select";
  select_week.add(new Option("Chọn tuần", ""));

  Object.keys(history_crop_comparision[season]).forEach((week) => {
    select_week.add(
      new Option(
        `Tuần ${String(parseInt(week)).padStart(2, "0")}`,
        parseInt(week),
      ),
    );
  });
  return select_week;
}

function countChange(first, second) {
  let cnt = 0;
  const week_one = Object.values(first);
  let week_two = Object.values(second);
  week_two = Object.values(week_two);
  Object.values(week_one).forEach((value, index) => {
    if (value.current != week_two[index].current) cnt++;
  });
  return cnt;
}

function updateWeekTitle() {
  const heading_title_card = week_show.querySelectorAll(".week-title");
  heading_title_card.forEach((element, index) => {
    element.querySelector(".season-label").textContent =
      `Vụ ${String(selected_week[index].season).padStart(2, "0")}`;
    element.querySelector(".week-label").textContent =
      `Tuần ${String(selected_week[index].week).padStart(2, "0")}`;
    element.querySelector(".week-date").textContent =
      history_crop_comparision[selected_week[index].season][
        selected_week[index].week
      ].date;
  });
}

function createHtmlCard(
  parameter,
  status,
  statusClass,
  first_condition,
  second_condition,
  unit,
  message,
) {
  return `
        <article class="parameter-card">

          <div class="parameter-top">

            <h4>${parameter}</h4>

            <span class="status-badge ${statusClass}">
              ${status}
            </span>

          </div>

          <div class="value-comparison">

            <div class="value-block">

              <span class="value-label">
                Previous target
              </span>

              <strong class="parameter-value previous-value">
                ${first_condition}${unit}
              </strong>

            </div>

            <i class="fa-solid fa-arrow-right comparison-arrow"></i>

            <div class="value-block current-block">

              <span class="value-label">
                Current target
              </span>

              <strong class="parameter-value">
                ${second_condition}${unit}
              </strong>

            </div>

          </div>

          <p class="parameter-detail">
            ${message}
          </p>

        </article>
      `;
}

function renderCard(first, second) {
  let element = [];
  const second_week = Object.entries(second);
  const first_week = Object.entries(first).forEach(([keys, values], index) => {
    const statusClass =
      values.current != second_week[index][1].current ? "changed" : "unchanged";
    const status = statusClass == "changed" ? "Changed" : "No changed";
    const message =
      statusClass == "unchanged"
        ? "No changed between two weeks"
        : "Have changed between two weeks";
    element.push(
      createHtmlCard(
        keys,
        status,
        statusClass,
        values.current,
        second_week[index][1].current,
        values.unit,
        message,
      ),
    );
  });
  return element.join("");
}

function createComparationReport() {
  const first_week =
    history_crop_comparision[selected_week[0].season][selected_week[0].week];
  const second_week =
    history_crop_comparision[selected_week[1].season][selected_week[1].week];
  const cnt = countChange(first_week.parameters, second_week.parameters);
  const week_heading_show = week_show.querySelector(".section-heading");
  const change_count = week_heading_show.querySelector(".record-count");
  if (cnt != 0) change_count.textContent = `${cnt} parameters changed`;
  else change_count.textContent = "No changed";
  updateWeekTitle();
  const renderShowCard = week_show.querySelector("#parameter-grid");
  renderShowCard.innerHTML = renderCard(
    first_week.parameters,
    second_week.parameters,
  );
}

function unshowed(){
    week_show.hidden = true;
    empty_show.hidden = false;
}

function chooseWeek(week_card, season, index) {
  week_card.addEventListener("change", (event) => {
    const week = event.target.value;
    if (!week){
        selected_week[index] = null;
        unshowed();
        return;
    }
    selected_week[index] = {
      season: season,
      week: week,
    };
    if (
      Object.keys(selected_week).filter((week) => {
        return week != null;
      }).length > 1
    ) {
      week_show.hidden = false;
      empty_show.hidden = true;
      createComparationReport();
    }
  });
}

filter_grid_card.querySelectorAll(".season-select").forEach((card) => {
  card.replaceWith(createSeasonCard());
});

filter_grid_card.querySelectorAll(".form-choose").forEach((card, index) => {
  card.addEventListener("change", (event) => {
    const season = event.target.value;
    if (!event.target.matches(".season-select")) return;
    if (!season) {
      const week = card.querySelector(".week-select");
      week.disabled = true;
      week.innerHTML = '<option value="">Chọn vụ trước</option>';
      unshowed();
      selected_week[index] = null;
      return;
    }
    const week = card.querySelector(".week-select");

    const new_week = createWeekCard(season);
    week.replaceWith(new_week);
    chooseWeek(new_week, season, index);
  });
});
