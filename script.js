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
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    if (values.length === 0) return;

    const headers = values[0];
    
    // ระบุชื่อคอลัมน์ที่ต้องการแสดง
    const selectedCols = ["Year", "Project", "Link"];
    const colIndexes = selectedCols.map(col => headers.indexOf(col));

    // Header
    selectedCols.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        tableHeader.appendChild(th);
    });

    // Rows
    values.slice(1).forEach(row => {
        const tr = document.createElement("tr");
        colIndexes.forEach(i => {
            const td = document.createElement("td");
            td.textContent = row[i] || ""; // กัน index ไม่ตรง
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

fetchData();
