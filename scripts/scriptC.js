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

  document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('.gallery-container');

    const images = [
        'https://www.spu.ac.th/fac/informatics/wp-content/uploads/sites/10/2023/04/20170316103957WNPDr5v.jpg',
        'https://www.spu.ac.th/fac/informatics/wp-content/uploads/sites/10/2023/03/20191203170305D1gTs3A-1024x682.jpg',
        'https://www.spu.ac.th/fac/informatics/wp-content/smush-webp/sites/10/2025/02/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%A2%E0%B8%B8%E0%B8%81%E0%B8%95%E0%B9%8C%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99.jpg.webp',
    ];

    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'รูปภาพสาขาเทคโนโลยีสารสนเทศและการสื่อสาร';
        galleryContainer.appendChild(img);
    });
});
