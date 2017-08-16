document.addEventListener("DOMContentLoaded", function() {
  const $ = (selector, context = document) => context.querySelector(selector),
    $$ = (selector, context = document) => context.querySelectorAll(selector),
    html = (nodeList, newHtml) => {
      Array.from(nodeList).forEach(element => {
        element.innerHTML = newHtml;
      });
    },
    listen = node => event => method => node.addEventListener(event, method),
    makeNode = node => document.createElement(node),
    stringIt = obj => JSON.stringify(obj),
    getLocation = () => {
      navigator.geolocation
        ? navigator.geolocation.getCurrentPosition(showButtonPosition)
        : (display.innerHTML = "Geolocation is not supported by this browser.");
    },
    tableCreate = items => {
      let format = Object.entries(items),
        tbl = makeNode("table");
      items = format.filter(x => x[1]);

      Object.assign(tbl.style, {
        width: "200px",
        border: "1px solid black",
        width: "400px",
        gridColumn: (gridCount += 1),
        gridRow: 1
      });
      let tr = tbl.insertRow(),
        trl = tr.insertCell(0),
        trrl = tr.insertCell(1),
        lable1 = trl.appendChild(document.createTextNode("category")),
        lable2 = trrl.appendChild(document.createTextNode("data"));
      for (let i of items) {
        let col1 = trl.appendChild(tbl.insertRow()),
          col2 = trrl.appendChild(tbl.insertRow());
        col1.appendChild(document.createTextNode(i[0]));
        col2.appendChild(
          document.createTextNode(typeof i[1] === "object" ? i[1].pretty : i[1])
        );
        col2.style.width = "100px";
        col1.style.border = "1px solid black";
        col2.style.border = "1px solid black";
      }
      tableContainer.insertAdjacentElement("beforeend", tbl);
    };
  let gridCount = 0,
    tableContainer = makeNode("div");
  Object.assign(tableContainer.style, {
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "repeat(3,1fr)",
    gridTemplateRows: "auto"
  });

  const getLength = number => number.toString().length;
  let frag = document.createDocumentFragment(),
    button = makeNode("button"),
    consent = makeNode("p"),
    display = makeNode("div"),
    dateInput = makeNode("input"),
    showButton = makeNode("button"),
    submit = makeNode("button");
  Object.assign(button.style, {
    padding: "5px",
    margin: "5px",
    borderRadius: "5px"
  });
  Object.assign(showButton.style, {
    padding: "5px",
    margin: "5px",
    borderRadius: "5px"
  });
  Object.assign(dateInput.style, { margin: "15px", display: "none" });
  submit.style.display = "none";
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id", "date");
  submit.innerText = "submit";
  showButton.innerText = "select your own date";
  button.innerText = "click to get last Week's forcast";
  consent.innerText =
    "Your consent is required to obtain forcast information. Please click and allow the location of your browser to be idenfityied.";
  frag.appendChild(consent);
  frag.appendChild(button);
  frag.appendChild(display);
  frag.appendChild(showButton);
  frag.appendChild(dateInput);
  frag.appendChild(submit);
  frag.appendChild(tableContainer);
  const grabDateInput = input => {},
    toggle = element => {
      dateInput.style.display === "none"
        ? (
            (button.style.display = "none"),
            (dateInput.style.display = "inline"),
            (submit.style.display = "inline")
          )
        : (
            (button.style.display = "inline"),
            (dateInput.style.display = "none"),
            (dateInput.value = null),
            (submit.style.display = "none")
          );
    };
  document.body.appendChild(frag);
  listen(button)("click")(getLocation);
  listen(showButton)("click")(toggle);
  listen(submit)("click")(getLocation);
  // will fail when day lands on a sunday.
  // fix at next opertunity.
  function getLastSunday() {
var d = new Date();

// set to Monday of this week
d.setDate(d.getDate() - (d.getDay() + 6) % 7);

// set to previous Monday
d.setDate(d.getDate() - 7);

// create new date of day before
return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
}
  let sunday = getLastSunday(),
    month = 0;
  day = 0;
  console.log(sunday)
  getLength(sunday.getMonth()) < 2
    ? (month = "" + 0 + (sunday.getMonth() + 1))
    : (month = sunday.getMonth() + 1);
  getLength(sunday.getDate()) < 2
    ? (day = "" + 0 + sunday.getDate())
    : (day = sunday.getDate());

  function showButtonPosition(position) {
    let formatedDate = void 0,
      week = true;
    dateInput.value
      ? ((formatedDate = dateInput.value.replace(/-/g, "")), (week = false))
      : (formatedDate = "" + sunday.getFullYear() + month + day);
    let payload = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        lastWeek: formatedDate,
        type: week
      },
      data = new FormData();
    data.append("json", JSON.stringify(payload));
    fetch("/weather", { method: "post", body: data })
      .then(res => res.json())
      .then(res => {
        week
          ? res.forEach(item => {
              tableCreate(item.history.dailysummary[0]);
            })
          : tableCreate(res.history.dailysummary[0]);
      });
  }
});
