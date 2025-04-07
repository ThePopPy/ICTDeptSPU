// โหลดส่วนต่างๆ ของเว็บไซต์ (Navbar, Header, Footer)
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error("Error loading component: ", error));
  }
  
  // โหลดส่วน Navbar, Header, Footer
  window.onload = function() {
    loadComponent('navbar', 'navbar.html');
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
  };

  // ฟังก์ชั่นเพื่อโหลดข้อมูลจาก JSON
  fetch('data/data_activity.json')
  .then(response => response.json())
  .then(galleryData => {
    const gallery = document.getElementById("gallery");
    galleryData.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" target="_blank" rel="noopener noreferrer">ดูรายละเอียด</a>
        </div>
      `;

      gallery.appendChild(card);
    });
  })
  .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error));

  
  // เพิ่ม card ลงในหน้า
  const galleryContainer = document.getElementById("gallery");
  
  galleryData.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
  
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="card-content">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">ดูรายละเอียด</a>
      </div>
    `;
  
    galleryContainer.appendChild(card);
  });
