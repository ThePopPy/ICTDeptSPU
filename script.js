const SHEET_ID = "1aTyzgqxB_00JRFPo0bHa51o5K_4SDjHgGzONofNmXmE";
const API_KEY = "AIzaSyDG14fqJaf81IbjlVv2Q_4ofYRlySJjaUk";
const SHEET_NAME = "ProjectStd";
const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

let allData = []; // เก็บข้อมูลทั้งหมด

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allData = data.values;
        populateFilter(allData);
        displayData(allData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function populateFilter(values) {
    const yearSelect = document.getElementById("year-select");
    yearSelect.innerHTML = ""; // ล้างตัวเลือกเก่า

    const optionAll = document.createElement("option");
    optionAll.value = "";
    optionAll.textContent = "-- แสดงทุกปี --";
    yearSelect.appendChild(optionAll);

    const yearIndex = values[0].indexOf("Year"); // หาตำแหน่ง column "Year"

    if (yearIndex === -1) return; // ถ้าไม่เจอ column "Year" ให้หยุด

    const years = new Set();

    values.slice(1).forEach(row => {
        if (row[yearIndex]) {
            years.add(row[yearIndex]);
        }
    });

    [...years].sort().forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

function displayData(data) {
  const tableBody = document.getElementById("data-table-body");
  tableBody.innerHTML = "";

  data.forEach((row) => {
    const tableRow = document.createElement("tr");

    // แสดงเฉพาะ "Project" และ "Link"
    const projectCell = document.createElement("td");
    projectCell.textContent = row.Project || "";
    tableRow.appendChild(projectCell);

    const linkCell = document.createElement("td");
    if (row.Link) {
      const link = document.createElement("a");
      link.href = row.Link;
      link.textContent = "Link";
      link.target = "_blank";
      linkCell.appendChild(link);
    } else {
      linkCell.textContent = "";
    }
    tableRow.appendChild(linkCell);

    tableBody.appendChild(tableRow);
  });
}


fetchData();
