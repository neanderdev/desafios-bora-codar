const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function getDiasMes(month, year) {
  let date = new Date(year, month, 1);

  let days = [];

  while (date.getMonth() === month) {
    days.push(
      `${("0" + date.getDate()).slice(-2)}/${("0" + (month + 1)).slice(-2)}`
    );

    date.setDate(date.getDate() + 1);
  }

  return days;
}

function handleSelectedDay(day) {
  if (
    document
      .getElementsByClassName(day)[0]
      .getAttribute("class")
      ?.split(" ")
      .includes("current")
  ) {
    return;
  }

  const selecteds = document.getElementsByClassName("selected");

  if (selecteds.length === 0) {
    document.getElementsByClassName(day)[0].classList.add("selected");

    return;
  }

  if (selecteds.length === 1) {
    const startDay = parseFloat(
      selecteds[0].getAttribute("class")?.split("/")[0]
    );
    const endDay = parseFloat(day.split("/")[0]);
    const month = selecteds[0]
      .getAttribute("class")
      ?.split(" ")[0]
      ?.split("/")[1];

    const between = endDay - startDay;

    if (startDay > endDay) {
      selecteds[0].classList.remove("selected");

      document.getElementsByClassName(day)[0].classList.add("selected");
    } else {
      for (let x = 0; x < between; x++) {
        document
          .getElementsByClassName(
            `${("0" + (startDay + (x + 1))).slice(-2)}/${month}`
          )[0]
          .classList.add("selected");
      }
    }

    return;
  }

  if (selecteds.length > 1) {
    const main = document.querySelector("main");

    for (let child of main.children) {
      if (child.getAttribute("class")?.split(" ").includes("selected")) {
        child.classList.remove("selected");
      }
    }

    return;
  }

  //   const elem = document.querySelector("main");

  //   for (let child of elem.children) {
  //     if (
  //       child.getAttribute("class")?.split(" ").includes(day) &&
  //       !child.getAttribute("class")?.split(" ").includes("current")
  //     ) {
  //       if (child.getAttribute("class")?.split(" ").includes("selected")) {
  //         child.classList.remove("selected");
  //       } else {
  //         child.classList.add("selected");
  //       }
  //     }
  //   }

  //   elem.addEventListener(
  //     "mouseover",
  //     (event) => {
  //       if (
  //         event.target.getAttribute("class")?.split(" ").includes("day") &&
  //         !event.target.getAttribute("class")?.split(" ").includes("current")
  //       ) {
  //         if (
  //           event.target.getAttribute("class").split(" ").includes("selected")
  //         ) {
  //           event.target.classList.remove("selected");
  //         } else {
  //           event.target.classList.add("selected");
  //         }
  //       }
  //     },
  //     false
  //   );
}

function handleDayOfMonth(index) {
  app.querySelector("header span").innerHTML = `${months[index]} ${parseFloat(
    app.querySelector("header span").innerText.split(" ").length > 1
      ? app.querySelector("header span").innerText.split(" ")[1]
      : app.querySelector("header span").innerText.split(" ")[0]
  )}`;

  const daysOfMonthCurrent = getDiasMes(
    index,
    parseFloat(app.querySelector("header span").innerText.split(" ")[1])
  );

  const weeks = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  let output = "";

  for (let week of weeks) {
    output += `<div id="week">${week}</div>`;
  }

  app.querySelector("main").innerHTML = output;
  app.querySelector("main").classList.remove("month");
  app.querySelector("main").classList.add("week");

  output = "";

  const dayOfMonthPrevious =
    new Date(
      parseFloat(app.querySelector("header span").innerText.split(" ")[1]),
      index,
      1
    ).getDay() - 0;

  let arrMonthsPrevious = [];

  for (let x = 0; x < dayOfMonthPrevious; x++) {
    const monthsPrevious = getDiasMes(
      index === 0 ? 11 : index - 1,
      parseFloat(app.querySelector("header span").innerText.split(" ")[1])
    );

    arrMonthsPrevious.push(monthsPrevious[monthsPrevious.length - (x + 1)]);
  }

  arrMonthsPrevious = arrMonthsPrevious.sort();

  const dayOfMonthNext =
    (new Date(
      parseFloat(app.querySelector("header span").innerText.split(" ")[1]),
      index,
      daysOfMonthCurrent[daysOfMonthCurrent.length - 1].split("/")[0]
    ).getDay() -
      6) *
    -1;

  let arrMonthsNext = [];

  for (let x = 0; x < dayOfMonthNext; x++) {
    const monthsNext = getDiasMes(
      index === 11 ? 1 : index + 1,
      parseFloat(app.querySelector("header span").innerText.split(" ")[1])
    );

    arrMonthsNext.push(monthsNext[x]);
  }

  arrMonthsNext = arrMonthsNext.sort();

  let days = [];

  days.push(...arrMonthsPrevious, ...daysOfMonthCurrent, ...arrMonthsNext);

  for (let day of days) {
    const currentMonth =
      ("0" + (index + 1)).slice(-2) !== ("0" + day.split("/")[1]).slice(-2)
        ? "day current"
        : "day";

    output += `<div class="${day} ${currentMonth}" onclick="handleSelectedDay('${day}')">${(
      "0" + day.split("/")[0]
    ).slice(-2)}</div>`;
  }

  app.querySelector("main").innerHTML += output;
}

function handlePreviousYear() {
  if (app.querySelector("main").getAttribute("class") === "month") {
    const year = parseFloat(app.querySelector("header span").innerText) - 1;

    if (year >= 1980) {
      app.querySelector("header span").innerHTML = year;
    }
  } else if (app.querySelector("main").getAttribute("class") === "week") {
    const index = months.findIndex(
      (mes) => mes === app.querySelector("header span").innerText.split(" ")[0]
    );

    if (index === 0) {
      let year = parseFloat(
        app.querySelector("header span").innerText.split(" ")[1]
      );
      year -= 1;

      app.querySelector("header span").innerHTML = `${
        app.querySelector("header span").innerText.split(" ")[0]
      } ${year}`;

      handleDayOfMonth(11);
    } else {
      handleDayOfMonth(index - 1);
    }
  }
}

function handleNextYear() {
  if (app.querySelector("main").getAttribute("class") === "month") {
    const year = parseFloat(app.querySelector("header span").innerText) + 1;

    if (year <= 2060) {
      app.querySelector("header span").innerHTML = year;
    }
  } else if (app.querySelector("main").getAttribute("class") === "week") {
    const index = months.findIndex(
      (mes) => mes === app.querySelector("header span").innerText.split(" ")[0]
    );

    if (index === 11) {
      let year = parseFloat(
        app.querySelector("header span").innerText.split(" ")[1]
      );
      year += 1;

      app.querySelector("header span").innerHTML = `${
        app.querySelector("header span").innerText.split(" ")[0]
      } ${year}`;

      handleDayOfMonth(0);
    } else {
      handleDayOfMonth(index + 1);
    }
  }
}

function render() {
  let output = "";

  const thisMonth = months[new Date().getMonth()];

  for (let month of months) {
    const active = thisMonth === month ? "active" : "";

    output += `<div class="${active}" onclick="handleDayOfMonth(${months.findIndex(
      (mes) => mes === month
    )})">${month}</div>`;
  }

  app.querySelector("main").classList.add("month");

  return output;
}

app.querySelector("header span").innerHTML = new Date().getFullYear();
app.querySelector("main").innerHTML = render();
