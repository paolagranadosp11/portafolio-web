// interactions.js - Carrusel, Lightbox, Pestañas, Acordeones, Habilidades y Servicios
// Aquí guardo todas las interacciones que hace el usuario al dar clics en la web.
(function() {
  'use strict';

  // === ELEMENTOS DEL DOM ===

  // Botones de las pestañas (tabs) y sus contenidos correspondientes
  const tabsBtn = document.querySelectorAll('.tabs__btn');
  const tabsContent = document.querySelectorAll('.tabs__content');
  const accordionItems = document.querySelectorAll('.accordion__item');

  // Elementos con números que van a contar hacia arriba
  const counterElements = document.querySelectorAll('[data-counter]');

  // Todos los elementos necesarios para el lightbox de los certificados
  const lightbox = document.getElementById('lightbox');
  const lightboxOverlay = document.querySelector('.lightbox__overlay');
  const lightboxClose = document.querySelector('.lightbox__close');
  const lightboxImg = document.querySelector('.lightbox__img');
  const lightboxSource = document.querySelector('.lightbox__source');
  const lightboxTitle = document.querySelector('.lightbox__title');
  const lightboxInstitution = document.querySelector('.lightbox__institution');
  const lightboxDescription = document.querySelector('.lightbox__description');
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');

  // Las tarjetas de categorías de habilidades y sus tags
  const skillCategories = document.querySelectorAll('.skills__category');

  // Las tarjetas de los servicios interactivos
  const serviceCards = document.querySelectorAll('.service-card');

  // Componentes del carrusel de testimonios
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonials__dot');
  const sliderEl = document.querySelector('.testimonials__slider');

  // === VARIABLES DE CONTROL ===
  let lastFocusedElement = null; // Guarda qué elemento tenía el foco antes del lightbox

  // Controladores de estado para el carrusel de testimonios
  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoPlayInterval = null;
  let isAutoPlaying = true;
  const autoPlayDelay = 5000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Los textos y descripciones de los certificados para el visor lightbox
  const certData = {
    'graduacion': {
      img: 'assets/cert-graduacion.jpg',
      webp: 'assets/cert-graduacion.webp',
      alt: 'Ceremonia de graduación IEP - Sandra Paola Granados',
      title: 'Graduación Instituto Europeo de Posgrado',
      institution: 'Instituto Europeo de Posgrado (IEP)',
      description: 'Ceremonia de graduación con mención honorífica por excelencia académica.'
    },
    'master-pm': {
      img: 'assets/cert-master-pm.jpg',
      webp: 'assets/cert-master-pm.webp',
      alt: 'Certificado Máster en Project Management - Sandra Paola Granados',
      title: 'Máster en Project Management',
      institution: 'Instituto Europeo de Posgrado (IEP)',
      description: 'Especialización en metodologías ágiles de gestión de proyectos y business analytics.'
    },
    'mba-bi': {
      img: 'assets/cert-mba-bi.jpg',
      webp: 'assets/cert-mba-bi.webp',
      alt: 'Certificado MBA Business Intelligence - Sandra Paola Granados',
      title: 'MBA Business Intelligence & Big Data',
      institution: 'Instituto Europeo de Posgrado (IEP)',
      description: 'Formación avanzada en gestión empresarial basada en análisis de datos a gran escala.'
    }
  };

  // === PESTAÑAS (TABS) Y ACORDEONES ===

  // Cambia la pestaña visible al hacer clic
  const tabClickHandler = (event) => {
    const clickedTab = event.currentTarget;
    const targetId = clickedTab.dataset.tab;

    tabsBtn.forEach((btn) => {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-selected', 'false');
    });
    tabsContent.forEach((content) => {
      content.classList.remove('is-active');
      content.setAttribute('aria-hidden', 'true');
    });

    clickedTab.classList.add('is-active');
    clickedTab.setAttribute('aria-selected', 'true');

    const targetContent = document.getElementById(targetId);
    if (targetContent) {
      targetContent.classList.add('is-active');
      targetContent.setAttribute('aria-hidden', 'false');
    }
  };

  // Abre y cierra las tarjetas de acordeones (usado en las subpáginas)
  const accordionClickHandler = (event) => {
    const clickedItem = event.currentTarget.closest('.accordion__item');
    const isActive = clickedItem.classList.contains('is-active');

    accordionItems.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-expanded', 'false');
      const content = item.querySelector('.accordion__content');
      if (content) content.style.maxHeight = null;
    });

    if (!isActive) {
      clickedItem.classList.add('is-active');
      clickedItem.setAttribute('aria-expanded', 'true');
      const content = clickedItem.querySelector('.accordion__content');
      if (content) content.style.maxHeight = content.scrollHeight + 'px';
    }
  };

  // === CONTADORES DE NÚMEROS ===

  // Hace que los números de la sección Sobre Mí vayan aumentando poco a poco
  const animateCounter = (el, target, suffix, duration) => {
    const start = performance.now();

    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2); // Efecto de frenado al final
      const current = Math.round(eased * target);

      el.textContent = current + suffix;

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Activa la animación del número cuando se llega a ver en la pantalla
  const initCounters = () => {
    if (!counterElements.length) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.counter, 10), el.dataset.suffix || '', 1200);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counterElements.forEach((el) => counterObserver.observe(el));
  };

  // === VISOR DE CERTIFICADOS (LIGHTBOX) ===

  // Abre el visor del certificado seleccionado y rellena sus datos
  const openLightbox = (key) => {
    const data = certData[key];
    if (!data) return;

    lastFocusedElement = document.activeElement;

    // Detectamos si estamos en subpáginas para ajustar la ruta de las imágenes
    const isSubpage = window.location.pathname.includes('/proyectos/');
    const pathPrefix = isSubpage ? '../' : '';

    lightboxImg.src = pathPrefix + data.img;
    lightboxImg.alt = data.alt;
    lightboxSource.srcset = pathPrefix + data.webp;
    lightboxTitle.textContent = data.title;
    lightboxTitle.id = 'lightbox-title';
    lightboxInstitution.textContent = data.institution;
    lightboxDescription.textContent = data.description;

    lightbox.setAttribute('aria-labelledby', 'lightbox-title');
    lightbox.classList.add('is-active');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  };

  // Cierra el visor de certificado
  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  };

  // Evita que el usuario use Tab para salirse del visor cuando está abierto
  const lightboxKeydownHandler = (event) => {
    if (!lightbox.classList.contains('is-active')) return;
    if (event.key !== 'Tab') return;

    const focusables = lightbox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // === HABILIDADES INTERACTIVAS ===

  // Activa o desactiva la categoría de habilidades que clicamos
  const toggleSkillCategory = (categoria) => {
    const isActive = categoria.classList.contains('is-active');

    skillCategories.forEach((cat) => {
      cat.classList.remove('is-active');
      cat.setAttribute('aria-expanded', 'false');
    });

    if (!isActive) {
      categoria.classList.add('is-active');
      categoria.setAttribute('aria-expanded', 'true');
    }
  };

  // Activa o desactiva el tag individual
  const toggleTag = (tag) => {
    tag.classList.toggle('is-selected');
  };

  // === SERVICIOS INTERACTIVOS ===

  // Abre la tarjeta de servicio para mostrar los detalles concretos
  const toggleServiceCard = (card) => {
    const isActive = card.classList.contains('is-active');

    // Cerramos los demás servicios primero
    serviceCards.forEach((c) => {
      c.classList.remove('is-active');
      c.setAttribute('aria-expanded', 'false');
    });

    // Si no estaba activo, abrimos el actual
    if (!isActive) {
      card.classList.add('is-active');
      card.setAttribute('aria-expanded', 'true');
    }
  };

  // === CARRUSEL DE TESTIMONIOS ===

  // Mueve el carrusel de testimonios al índice seleccionado
  const goToSlide = (index) => {
    if (index < 0) {
      currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    if (track) {
      const translateX = -(currentSlide * 100);
      track.style.transform = `translateX(${translateX}%)`;
    }

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentSlide);
      dot.setAttribute('aria-selected', (i === currentSlide).toString());
    });
  };

  const nextSlideHandler = () => goToSlide(currentSlide + 1);
  const prevSlideHandler = () => goToSlide(currentSlide - 1);

  // Inicia la reproducción automática si no está pausada
  const startAutoPlay = () => {
    if (isAutoPlaying && !prefersReducedMotion && track) {
      autoPlayInterval = setInterval(nextSlideHandler, autoPlayDelay);
    }
  };

  // Frena la reproducción automática
  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  };

  const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
  };

  const dotClickHandler = (event) => {
    const dotIndex = Array.from(dots).indexOf(event.currentTarget);
    goToSlide(dotIndex);
    resetAutoPlay();
  };

  // Permite controlar el carrusel con las flechas del teclado
  const keydownHandler = (event) => {
    if (!sliderEl || !sliderEl.contains(document.activeElement)) return;

    if (event.key === 'ArrowLeft') {
      prevSlideHandler();
      resetAutoPlay();
    } else if (event.key === 'ArrowRight') {
      nextSlideHandler();
      resetAutoPlay();
    }
  };

  // === ASIGNACIÓN DE EVENTOS ===

  // Configuración de clics para las pestañas
  tabsBtn.forEach((btn, index) => {
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', btn.classList.contains('is-active') ? 'true' : 'false');
    btn.setAttribute('id', `tab-${index}`);
    btn.addEventListener('click', tabClickHandler);
  });

  tabsContent.forEach((content, index) => {
    content.setAttribute('role', 'tabpanel');
    content.setAttribute('aria-labelledby', `tab-${index}`);
    content.setAttribute('aria-hidden', content.classList.contains('is-active') ? 'false' : 'true');
  });

  // Configuración de clics para los acordeones
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion__header');
    if (header) header.addEventListener('click', accordionClickHandler);
  });

  // Eventos para abrir y cerrar el lightbox
  lightboxTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger.dataset.lightbox));
  });

  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
    lightboxKeydownHandler(event);
  });

  // Eventos para las tarjetas de habilidades
  skillCategories.forEach((cat) => {
    cat.addEventListener('click', (event) => {
      const tagBtn = event.target.closest('.tag');
      if (tagBtn) {
        toggleTag(tagBtn);
      } else {
        toggleSkillCategory(cat);
      }
    });

    cat.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleSkillCategory(cat);
      }
    });
  });

  // Eventos para desplegar los detalles de los servicios
  serviceCards.forEach((card) => {
    card.addEventListener('click', () => toggleServiceCard(card));
  });

  // Eventos de botones y dots del carrusel
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlideHandler(); resetAutoPlay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlideHandler(); resetAutoPlay(); });

  dots.forEach((dot) => dot.addEventListener('click', dotClickHandler));

  if (sliderEl) {
    sliderEl.addEventListener('mouseenter', stopAutoPlay);
    sliderEl.addEventListener('mouseleave', startAutoPlay);
    document.addEventListener('keydown', keydownHandler);
  }

  // Si prefiere poco movimiento, desactivamos la auto reproducción
  if (prefersReducedMotion) isAutoPlaying = false;

  // Si el usuario cambia de pestaña de navegador, pausamos el carrusel para no consumir recursos
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoPlay();
    else startAutoPlay();
  });

  // === INICIALIZACIÓN ===
  initCounters();

  if (track && dots.length) {
    goToSlide(0);
    startAutoPlay();
  }

})();
