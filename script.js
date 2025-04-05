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

function displayData(values) {
  const tableBody = document.getElementById("data-table-body");
  tableBody.innerHTML = "";

  if (!values || values.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='2'>ไม่พบข้อมูล</td></tr>";
    return;
  }

  const headers = values[0]; // แถวแรกคือชื่อคอลัมน์
  const projectIndex = headers.indexOf("Project");
  const linkIndex = headers.indexOf("Link");

  if (projectIndex === -1 || linkIndex === -1) {
    tableBody.innerHTML = "<tr><td colspan='2'>ไม่พบคอลัมน์ที่ต้องการ</td></tr>";
    return;
  }

  const rows = values.slice(1); // ข้อมูลจริง เริ่มจากแถวที่ 2

  rows.forEach(row => {
    const tr = document.createElement("tr");

    // Project column
    const projectCell = document.createElement("td");
    projectCell.textContent = row[projectIndex] || "";
    tr.appendChild(projectCell);

    // Link column
    const linkCell = document.createElement("td");
    if (row[linkIndex]) {
      const link = document.createElement("a");
      link.href = row[linkIndex];
      link.textContent = "ดูโปรเจกต์";
      link.target = "_blank";
      linkCell.appendChild(link);
    } else {
      linkCell.textContent = "";
    }
    tr.appendChild(linkCell);

    tableBody.appendChild(tr);
  });
}



fetchData();
