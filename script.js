// ใส่ Google Sheets ID และ API Key ของคุณ
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const SHEET_NAME = "Sheet1"; // ชื่อชีต

const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayData(data.values);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayData(values) {
    const tableHeader = document.getElementById("table-header");
    const tableBody = document.getElementById("table-body");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    if (values.length > 0) {
        values[0].forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            tableHeader.appendChild(th);
        });

        values.slice(1).forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(cell => {
                const td = document.createElement("td");
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }
}

fetchData();
