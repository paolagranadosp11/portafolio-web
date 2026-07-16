// main.js - Código principal del portafolio
// Aquí controlo el menú de arriba, el scroll suave, las animaciones al bajar y el formulario.
(function() {
  'use strict';

  // === ELEMENTOS DEL DOM ===
  const headerEl = document.getElementById('header');
  const menuBtn = document.getElementById('menu-btn');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.header__nav-link');
  const sections = document.querySelectorAll('section[id]');
  const revealElements = document.querySelectorAll('.reveal');

  // Elementos del formulario de contacto
  const formEl = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  // Filtros de validación para los textos del formulario
  const patterns = {
    name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,100}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    subject: /^.{2,200}$/,
    message: /^[\s\S]{10,2000}$/
  };

  // Mensajes de error en español para mostrar al usuario
  const messages = {
    name: {
      required: 'Por favor, ingresa tu nombre.',
      pattern: 'El nombre debe contener entre 2 y 100 caracteres (letras y espacios).'
    },
    email: {
      required: 'Por favor, ingresa tu correo electrónico.',
      pattern: 'Por favor, ingresa una dirección de correo válida.'
    },
    subject: {
      required: 'Por favor, ingresa el asunto del mensaje.',
      pattern: 'El asunto debe contener entre 2 y 200 caracteres.'
    },
    message: {
      required: 'Por favor, escribe tu mensaje.',
      pattern: 'El mensaje debe contener entre 10 y 2000 caracteres.'
    }
  };

  // === VARIABLES DE CONTROL ===
  let isMenuOpen = false;
  let isFormSubmitting = false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // === NAVEGACIÓN Y CABECERA ===

  // Calcula hasta dónde hay que hacer scroll restando la altura de la cabecera
  const getScrollPosition = (targetElement) => {
    const headerHeight = headerEl.offsetHeight;
    return targetElement.offsetTop - headerHeight;
  };

  // Cierra el menú cuando está abierto en pantallas pequeñas
  const closeMenuHandler = () => {
    if (isMenuOpen) {
      isMenuOpen = false;
      menuBtn.classList.remove('is-active');
      mainNav.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
      mainNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Abre o cierra el menú del móvil al hacer clic
  const toggleMenuHandler = () => {
    isMenuOpen = !isMenuOpen;
    menuBtn.classList.toggle('is-active', isMenuOpen);
    mainNav.classList.toggle('is-open', isMenuOpen);

    menuBtn.setAttribute('aria-expanded', isMenuOpen.toString());
    menuBtn.setAttribute('aria-label', isMenuOpen ? 'Cerrar menú' : 'Abrir menú');
    mainNav.setAttribute('aria-hidden', (!isMenuOpen).toString());
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  };

  // Hace que al hacer clic en un enlace de navegación, vaya de forma suave
  const smoothScrollHandler = (event) => {
    const href = event.currentTarget.getAttribute('href');

    if (href && href.includes('#')) {
      // Si estamos en las subpáginas del detalle de proyectos, dejamos que vaya directo
      if (!window.location.pathname.endsWith('index.html') && window.location.pathname.includes('/proyectos/')) {
        return;
      }

      const hashParts = href.split('#');
      const targetId = hashParts[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        const targetPosition = getScrollPosition(targetElement);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        closeMenuHandler();
        history.pushState(null, '', '#' + targetId);
      }
    }
  };

  // Añade una clase al menú cuando el usuario hace scroll hacia abajo para ponerle fondo
  const scrollHandler = () => {
    if (window.scrollY > 50) {
      headerEl.classList.add('is-scrolled');
    } else {
      headerEl.classList.remove('is-scrolled');
    }
  };

  // Marca el enlace del menú que corresponde a la sección que estamos viendo
  const setActiveNavLink = (sectionId) => {
    navLinks.forEach((link) => {
      link.classList.remove('is-active');
      const href = link.getAttribute('href');
      if (href && href.endsWith(`#${sectionId}`)) {
        link.classList.add('is-active');
      }
    });
  };

  // Detecta qué sección está visible para cambiar el link activo
  const initSectionObserver = () => {
    const headerHeight = headerEl.offsetHeight;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNavLink(entry.target.getAttribute('id'));
        }
      });
    }, {
      rootMargin: `-${headerHeight + 1}px 0px -60% 0px`
    });

    sections.forEach((section) => observer.observe(section));
  };

  // === EFECTOS VISUALES ===

  // Hace aparecer los elementos poco a poco cuando entran a la pantalla
  const initReveal = () => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach((el) => observer.observe(el));
  };

  // Efecto Parallax en el fondo del hero (el video va más despacio al hacer scroll)
  const initHeroParallax = () => {
    const heroVideo = document.querySelector('.hero__video');
    const heroContent = document.querySelector('.hero__content');
    const hero = document.querySelector('.hero');

    if (!hero || prefersReducedMotion) return;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrollY >= heroHeight) return;

        const videoOffset = scrollY * 0.25;
        const contentOffset = scrollY * 0.4;
        const contentOpacity = 1 - (scrollY / (heroHeight * 0.6));

        if (heroVideo) heroVideo.style.transform = `translateY(${videoOffset}px)`;
        if (heroContent) {
          heroContent.style.transform = `translateY(${contentOffset}px)`;
          heroContent.style.opacity = Math.max(0, contentOpacity);
        }
      });
    }, { passive: true });
  };

  // === VALIDACIÓN DEL FORMULARIO ===

  // Pinta el campo de rojo y escribe el mensaje de error
  const showFieldError = (field, message) => {
    field.classList.add('form__input--error');
    let errorElement = document.getElementById(`${field.name}-error`);

    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.id = `${field.name}-error`;
      errorElement.className = 'form__error';
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id);
  };

  // Borra el error de un campo de texto
  const clearFieldError = (field) => {
    field.classList.remove('form__input--error');
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) errorElement.remove();

    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  };

  // Comprueba que los campos cumplan con las reglas de texto
  const validateField = (field) => {
    const fieldName = field.name;
    const value = field.value.trim();
    const pattern = patterns[fieldName];

    if (field.required && !value) {
      showFieldError(field, messages[fieldName].required);
      return false;
    }

    if (pattern && value && !pattern.test(value)) {
      showFieldError(field, messages[fieldName].pattern);
      return false;
    }

    clearFieldError(field);
    return true;
  };

  // Valida todos los inputs juntos antes de enviar
  const validateForm = () => {
    let isValid = true;
    [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
      if (field && !validateField(field)) isValid = false;
    });
    return isValid;
  };

  // Crea un elemento de icono SVG rápidamente
  const createSvgIcon = (href, width, height) => {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    const use = document.createElementNS(svgNS, 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
    svg.appendChild(use);
    return svg;
  };

  // Cambia el botón a estado "Enviando..." y le pone un spinner
  const setLoadingState = (isLoading) => {
    isFormSubmitting = isLoading;
    const submitBtn = formEl.querySelector('button[type="submit"]');

    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.textContent = '';
      const spinner = document.createElement('span');
      spinner.className = 'loading-spinner';
      submitBtn.appendChild(spinner);
      submitBtn.appendChild(document.createTextNode(' Enviando...'));
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = '';
      const iconPath = formEl.classList.contains('form--inner-path') ? '../assets/icons/icons.svg#icon-send' : 'assets/icons/icons.svg#icon-send';
      submitBtn.appendChild(createSvgIcon(iconPath, '20', '20'));
      submitBtn.appendChild(document.createTextNode(' Enviar Mensaje'));
    }
  };

  // Muestra una franja verde temporal que dice que se envió todo bien
  const showSuccessMessage = () => {
    const successDiv = document.createElement('div');
    successDiv.className = 'form__success';
    successDiv.setAttribute('role', 'alert');
    const iconPath = formEl.classList.contains('form--inner-path') ? '../assets/icons/icons.svg#icon-check' : 'assets/icons/icons.svg#icon-check';
    successDiv.appendChild(createSvgIcon(iconPath, '24', '24'));
    successDiv.appendChild(document.createTextNode(' ¡Mensaje enviado con éxito! Te responderé muy pronto.'));

    formEl.parentNode.insertBefore(successDiv, formEl.nextSibling);
    formEl.reset();

    setTimeout(() => successDiv.remove(), 4000);
  };

  // Maneja el evento de enviar del formulario
  const submitHandler = (event) => {
    event.preventDefault();

    if (isFormSubmitting) return;

    if (!validateForm()) {
      const firstError = formEl.querySelector('.form__input--error');
      if (firstError) firstError.focus();
      return;
    }

    setLoadingState(true);

    // Simulación de envío con 1.5 segundos de retraso
    setTimeout(() => {
      setLoadingState(false);
      showSuccessMessage();
    }, 1500);
  };

  // Pasa el foco al siguiente input al presionar Enter
  const keydownHandler = (field, event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const fields = [nameInput, emailInput, subjectInput, messageInput];
      const currentIndex = fields.indexOf(field);
      if (currentIndex < fields.length - 1 && fields[currentIndex + 1]) {
        fields[currentIndex + 1].focus();
      }
    }
  };

  // === ASIGNACIÓN DE EVENTOS ===

  if (menuBtn) menuBtn.addEventListener('click', toggleMenuHandler);

  navLinks.forEach((link) => link.addEventListener('click', smoothScrollHandler));

  window.addEventListener('scroll', () => {
    requestAnimationFrame(scrollHandler);
  }, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen) closeMenuHandler();
  });

  document.addEventListener('click', (event) => {
    if (isMenuOpen && !mainNav.contains(event.target) && !menuBtn.contains(event.target)) {
      closeMenuHandler();
    }
  });

  if (formEl) {
    formEl.addEventListener('submit', submitHandler);

    [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
      if (field) {
        field.addEventListener('blur', () => { if (field.value.trim()) validateField(field); });
        field.addEventListener('input', () => { if (field.classList.contains('form__input--error')) validateField(field); });
      }
    });

    [nameInput, emailInput, subjectInput].forEach((field) => {
      if (field) field.addEventListener('keydown', (event) => keydownHandler(field, event));
    });
  }

  // === INICIALIZACIÓN ===
  scrollHandler();

  if (sections.length) initSectionObserver();

  if (revealElements.length) {
    if ('IntersectionObserver' in window) {
      initReveal();
    } else {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    }
  }

  initHeroParallax();

  if (mainNav) mainNav.setAttribute('aria-hidden', 'true');

})();
