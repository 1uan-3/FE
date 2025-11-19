// Main JavaScript for VieLMS

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission handler
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đã gửi thành công! (Demo)');
    form.reset();
  });
});

// Auto-calculate average grades
function calculateAverage(scores) {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return (sum / scores.length).toFixed(1);
}

// Update grade table averages dynamically
const gradeInputs = document.querySelectorAll('input[type="number"]');
gradeInputs.forEach(input => {
  input.addEventListener('change', function() {
    const row = this.closest('tr');
    if (row) {
      const inputs = row.querySelectorAll('input[type="number"]');
      const scores = Array.from(inputs).map(inp => parseFloat(inp.value) || 0);
      const avgCell = row.querySelector('.badge.accent');
      if (avgCell && scores.length > 0) {
        avgCell.textContent = calculateAverage(scores);
      }
    }
  });
});

// Attendance status color coding
const attendanceSelects = document.querySelectorAll('select');
attendanceSelects.forEach(select => {
  select.addEventListener('change', function() {
    const value = this.value;
    if (value === 'Vắng không phép') {
      this.style.color = '#ef4444';
    } else if (value === 'Vắng có phép') {
      this.style.color = '#f59e0b';
    } else {
      this.style.color = '#10b981';
    }
  });
});

// Search functionality
const searchInputs = document.querySelectorAll('input[type="search"]');
searchInputs.forEach(input => {
  input.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const table = this.closest('section')?.querySelector('table');
    if (table) {
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    }
  });
});

// Logout functionality
function logout() {
  if (confirm('Bạn có chắc muốn đăng xuất?')) {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
}

// Check authentication
function checkAuth() {
  const currentUser = sessionStorage.getItem('currentUser');
  const publicPages = ['index.html', 'login.html', ''];
  const currentPage = window.location.pathname.split('/').pop();
  
  if (!currentUser && !publicPages.includes(currentPage)) {
    window.location.href = 'login.html';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  checkAuth();
  
  // Update user name if logged in
  const currentUser = sessionStorage.getItem('currentUser');
  if (currentUser) {
    const userNameElements = document.querySelectorAll('#userName, #studentName, #parentName');
    userNameElements.forEach(el => {
      if (el) {
        el.textContent = currentUser.split('@')[0];
      }
    });
  }
  
  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.sidebar nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});

// Export to PDF functionality (placeholder)
function exportToPDF() {
  alert('Chức năng xuất PDF đang được phát triển!');
}

// Export to CSV functionality (placeholder)
function exportToCSV() {
  alert('Chức năng xuất CSV đang được phát triển!');
}

// Print functionality
function printPage() {
  window.print();
}

console.log('VieLMS - Hệ thống quản lý học tập đã sẵn sàng!');


// Banner Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

function updateSlider() {
  const track = document.querySelector('.banner-track');
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Update indicators
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// Auto-play slider
let autoPlayInterval;

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.banner-slider')) {
    updateSlider();
    startAutoPlay();
    
    // Pause auto-play on hover
    const banner = document.querySelector('.activities-banner');
    if (banner) {
      banner.addEventListener('mouseenter', stopAutoPlay);
      banner.addEventListener('mouseleave', startAutoPlay);
    }
  }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.banner-slider');
  if (slider) {
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide();
  }
}


// Hero Slider Functionality
let currentSlideIndex = 0;
let slideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  if (!slides.length) return;
  
  // Wrap around
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } else {
    currentSlideIndex = index;
  }
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Add active class to current slide and dot
  slides[currentSlideIndex].classList.add('active');
  dots[currentSlideIndex].classList.add('active');
}

function moveSlide(direction) {
  showSlide(currentSlideIndex + direction);
  resetSlideInterval();
}

function currentSlide(index) {
  showSlide(index);
  resetSlideInterval();
}

function autoSlide() {
  moveSlide(1);
}

function resetSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(autoSlide, 5000);
}

// Initialize slider when page loads
document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    showSlide(0);
    slideInterval = setInterval(autoSlide, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(autoSlide, 5000);
    });
  }
});

// Keyboard navigation for slider
document.addEventListener('keydown', function(e) {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  
  if (e.key === 'ArrowLeft') {
    moveSlide(-1);
  } else if (e.key === 'ArrowRight') {
    moveSlide(1);
  }
});
