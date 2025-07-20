/**
* Template Name: Tour
* Template URL: https://bootstrapmade.com/tour-bootstrap-travel-website-template/
* Updated: Jul 01 2025 with Bootstrap v5.3.7
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

})();




// ZONE เขียนเพิ่ม



window.addEventListener('scroll', () => {
  const header = document.querySelector('#header');
  

  if (window.scrollY > 50) {
    header.classList.add('scrolledd');
  } else {
    header.classList.remove('scrolledd');
  }
});

const items = document.querySelectorAll('.sidebar-item');
const props = document.querySelectorAll('.map-container .prop');

items.forEach(item => {
  item.addEventListener('click', () => {
    
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    
    props.forEach(p => p.classList.remove('active'));

    
    const targetId = item.getAttribute('data-target');
    const targetProp = document.getElementById(targetId);
    if (targetProp) {
      targetProp.classList.add('active');
    }
  });
});




const overlayImage = document.getElementById('overlay-image');
const links = document.querySelectorAll('.image-container ul li a');
const sections = document.querySelectorAll('.content-section .items-center');

// ฟังก์ชันตั้ง active
function setActiveLink(link) {
  links.forEach(l => l.classList.remove('active'));
  if (link) link.classList.add('active');
}

// ฟังก์ชันเปลี่ยน overlay image
function changeOverlayImage(newImage) {
  overlayImage.classList.remove('show');
  setTimeout(() => {
    overlayImage.src = newImage;
    overlayImage.classList.add('show');
  }, 100);
}

// Event click สำหรับ link
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveLink(link);
    changeOverlayImage(link.getAttribute('data-img'));

    const targetId = link.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ตรวจสอบว่า section ไหนอยู่ใน viewport ตอน scroll
function updateActiveSection() {
  let currentSection = null;
  const midViewport = window.innerHeight / 2;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= midViewport && rect.bottom >= midViewport) {
      currentSection = section;
    }
  });

  if (currentSection) {
    // ถ้าเจอ section ที่อยู่ตรงกลางหน้าจอ
    const id = currentSection.id;
    const activeLink = document.querySelector(`.image-container a[data-target="${id}"]`);
    if (activeLink) {
      setActiveLink(activeLink);
      changeOverlayImage(activeLink.getAttribute('data-img'));
    }
  } else {
    // เช็คว่าเลย content ลงล่างหรือยัง
    const lastSection = sections[sections.length - 1];
    const firstSection = sections[0];

    if (lastSection.getBoundingClientRect().bottom < window.innerHeight) {
      // เลย section สุดท้าย → active ตัวสุดท้าย
      const lastLink = document.querySelector(`.image-container a[data-target="${lastSection.id}"]`);
      if (lastLink) {
        setActiveLink(lastLink);
        changeOverlayImage(lastLink.getAttribute('data-img'));
      }
    } else if (firstSection.getBoundingClientRect().top > 0) {
      // อยู่เหนือ section แรก → active ตัวแรก
      const firstLink = document.querySelector(`.image-container a[data-target="${firstSection.id}"]`);
      if (firstLink) {
        setActiveLink(firstLink);
        changeOverlayImage(firstLink.getAttribute('data-img'));
      }
    }
  }
}

// เรียกตอน scroll
window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);
