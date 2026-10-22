/**
 * ====================================================================
 * MAIN APPLICATION CONTROLLER - GANESH S PORTFOLIO
 * ====================================================================
 * Master orchestration: Config rendering, dynamic project cards,
 * card pointer lighting (--mx, --my), accessible navigation,
 * project detail modal, and client-side contact validation.
 */

import { CONFIG } from './config.js';
import { PROJECTS, getProjectById } from './projects.js';
import { SignatureCursor } from './cursor.js';
import { AnimationController } from './animations.js';

class PortfolioApp {
  constructor() {
    this.cursor = new SignatureCursor();
    this.animations = new AnimationController();

    // DOM references
    this.header = document.querySelector('.site-header');
    this.mobileToggle = document.querySelector('.mobile-menu-btn');
    this.mobileNav = document.querySelector('.mobile-nav-overlay');
    this.modalBackdrop = document.getElementById('project-modal');
    this.modalDialog = this.modalBackdrop ? this.modalBackdrop.querySelector('.modal-dialog') : null;
    this.modalCloseBtn = this.modalBackdrop ? this.modalBackdrop.querySelector('.modal-close-btn') : null;
    this.contactForm = document.getElementById('contact-form');
    this.backToTopBtn = document.querySelector('.back-to-top');

    this.lastFocusedElement = null;
  }

  /**
   * Initializes entire portfolio application.
   */
  init() {
    this.renderConfigData();
    this.renderProjects();
    this.initCardLighting();
    this.initNavigation();
    this.initProjectModal();
    this.initContactForm();
    this.initBackToTop();

    // Start cursor & animations
    this.cursor.init();
    this.animations.init();

    // Log studio-grade build message
    console.log(
      `%c[GANESH S PORTFOLIO]%c Studio-grade build initialized. Status: Online.`,
      'color: #3DFF9A; font-weight: bold; background: #050607; padding: 4px 8px; border-radius: 4px; border: 1px solid #3DFF9A;',
      'color: #F4F6F8; padding: 4px;'
    );
  }

  /**
   * Injects dynamic data from config.js into markup placeholders.
   */
  renderConfigData() {
    // Availability Badges
    const badgeElements = document.querySelectorAll('.dynamic-availability');
    badgeElements.forEach(el => {
      el.textContent = CONFIG.profile.availability.badgeText;
    });

    // Owner Name & Titles
    document.querySelectorAll('.dynamic-name').forEach(el => el.textContent = CONFIG.profile.name);
    document.querySelectorAll('.dynamic-role').forEach(el => el.textContent = CONFIG.profile.role);
    document.querySelectorAll('.dynamic-aspirations').forEach(el => el.textContent = CONFIG.profile.aspirations);

    // Social & Contact Links
    const emailEls = document.querySelectorAll('.dynamic-email-link');
    emailEls.forEach(el => {
      el.href = `mailto:${CONFIG.social.email}`;
      const textEl = el.querySelector('.dynamic-email-text');
      if (textEl) textEl.textContent = CONFIG.social.email;
    });

    const githubEls = document.querySelectorAll('.dynamic-github-link');
    githubEls.forEach(el => {
      el.href = CONFIG.social.github;
      const textEl = el.querySelector('.dynamic-github-text');
      if (textEl) textEl.textContent = CONFIG.social.github.replace('https://', '');
    });

    const linkedinEls = document.querySelectorAll('.dynamic-linkedin-link');
    linkedinEls.forEach(el => {
      el.href = CONFIG.social.linkedin;
      const textEl = el.querySelector('.dynamic-linkedin-text');
      if (textEl) textEl.textContent = CONFIG.social.linkedin.replace(/^https?:\/\/(www\.)?/, '');
    });

    // Timeline Rendering
    const timelineContainer = document.getElementById('journey-timeline');
    if (timelineContainer && CONFIG.journeyMilestones) {
      timelineContainer.innerHTML = CONFIG.journeyMilestones.map((m, idx) => `
        <div class="timeline-item reveal-on-scroll stagger-${(idx % 4) + 1}">
          <div class="timeline-marker"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <span class="timeline-period">${m.period}</span>
              <span class="timeline-badge">${m.badge}</span>
            </div>
            <h3 class="timeline-title">${m.title}</h3>
            <p class="timeline-desc">${m.description}</p>
          </div>
        </div>
      `).join('');
    }
  }

  /**
   * Generates custom SVG generative thumbnail illustration for each project.
   */
  getProjectVisualSVG(theme, title) {
    switch (theme) {
      case 'tracker':
        return `
          <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title} architecture preview">
            <defs>
              <linearGradient id="grad-tracker" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#14171c" />
                <stop offset="100%" stop-color="#0c0e11" />
              </linearGradient>
            </defs>
            <rect width="600" height="320" fill="url(#grad-tracker)"/>
            <!-- Grid lines -->
            <path d="M50 80 H550 M50 160 H550 M50 240 H550" stroke="#1c2027" stroke-width="1"/>
            <path d="M150 40 V280 M300 40 V280 M450 40 V280" stroke="#1c2027" stroke-width="1"/>
            <!-- Activity waveform -->
            <path d="M50 220 Q120 120 200 170 T350 90 T480 140 T550 80" fill="none" stroke="#3DFF9A" stroke-width="3" stroke-linecap="round"/>
            <!-- Glowing nodes -->
            <circle cx="200" cy="170" r="5" fill="#3DFF9A" filter="drop-shadow(0 0 8px #3DFF9A)"/>
            <circle cx="350" cy="90" r="5" fill="#3DFF9A" filter="drop-shadow(0 0 8px #3DFF9A)"/>
            <circle cx="480" cy="140" r="5" fill="#2D7BFF" filter="drop-shadow(0 0 8px #2D7BFF)"/>
            <!-- Bar indicators -->
            <rect x="70" y="190" width="18" height="50" rx="3" fill="#252b34"/>
            <rect x="110" y="150" width="18" height="90" rx="3" fill="#3DFF9A" fill-opacity="0.75"/>
            <rect x="150" y="170" width="18" height="70" rx="3" fill="#252b34"/>
            <rect x="230" y="130" width="18" height="110" rx="3" fill="#2D7BFF" fill-opacity="0.8"/>
            <text x="60" y="60" fill="#3DFF9A" font-family="monospace" font-size="12" letter-spacing="2">ACTIVITY_TELEMETRY // LOG_01</text>
          </svg>
        `;
      case 'feedback':
        return `
          <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title} architecture preview">
            <defs>
              <linearGradient id="grad-fb" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#14171c" />
                <stop offset="100%" stop-color="#0c0e11" />
              </linearGradient>
            </defs>
            <rect width="600" height="320" fill="url(#grad-fb)"/>
            <!-- Concentric radar circles -->
            <circle cx="300" cy="160" r="110" fill="none" stroke="#1c2027" stroke-width="1.5"/>
            <circle cx="300" cy="160" r="75" fill="none" stroke="#252b34" stroke-width="1.5" stroke-dasharray="4 4"/>
            <circle cx="300" cy="160" r="40" fill="none" stroke="#3DFF9A" stroke-width="1.5" stroke-opacity="0.4"/>
            <!-- Feedback Distribution Polygon -->
            <polygon points="300,70 380,130 360,220 240,210 220,120" fill="rgba(61, 255, 154, 0.12)" stroke="#3DFF9A" stroke-width="2"/>
            <!-- Evaluation Axes -->
            <line x1="300" y1="50" x2="300" y2="270" stroke="#252b34" stroke-width="1"/>
            <line x1="190" y1="160" x2="410" y2="160" stroke="#252b34" stroke-width="1"/>
            <text x="60" y="60" fill="#2D7BFF" font-family="monospace" font-size="12" letter-spacing="2">AGGREGATION_SCHEMA // 3NF_DB</text>
            <circle cx="300" cy="70" r="4" fill="#3DFF9A"/>
            <circle cx="380" cy="130" r="4" fill="#3DFF9A"/>
            <circle cx="360" cy="220" r="4" fill="#2D7BFF"/>
          </svg>
        `;
      case 'dsa':
        return `
          <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title} architecture preview">
            <defs>
              <linearGradient id="grad-dsa" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#14171c" />
                <stop offset="100%" stop-color="#0c0e11" />
              </linearGradient>
            </defs>
            <rect width="600" height="320" fill="url(#grad-dsa)"/>
            <!-- Linked List Nodes -->
            <!-- Node 1 -->
            <rect x="70" y="125" width="80" height="70" rx="8" fill="#1c2027" stroke="#3DFF9A" stroke-width="1.5"/>
            <line x1="120" y1="125" x2="120" y2="195" stroke="#252b34" stroke-width="1.5"/>
            <text x="82" y="165" fill="#F4F6F8" font-family="monospace" font-size="12">HEAD</text>
            <circle cx="135" cy="160" r="3.5" fill="#3DFF9A"/>
            <!-- Pointer 1 -->
            <path d="M135 160 H200" stroke="#3DFF9A" stroke-width="2" marker-end="url(#arrow)"/>
            <!-- Node 2 -->
            <rect x="210" y="125" width="80" height="70" rx="8" fill="#1c2027" stroke="#2D7BFF" stroke-width="1.5"/>
            <line x1="260" y1="125" x2="260" y2="195" stroke="#252b34" stroke-width="1.5"/>
            <text x="225" y="165" fill="#F4F6F8" font-family="monospace" font-size="12">NODE</text>
            <circle cx="275" cy="160" r="3.5" fill="#2D7BFF"/>
            <!-- Pointer 2 -->
            <path d="M275 160 H340" stroke="#2D7BFF" stroke-width="2"/>
            <!-- Node 3 -->
            <rect x="350" y="125" width="80" height="70" rx="8" fill="#1c2027" stroke="#3DFF9A" stroke-width="1.5"/>
            <line x1="400" y1="125" x2="400" y2="195" stroke="#252b34" stroke-width="1.5"/>
            <text x="365" y="165" fill="#F4F6F8" font-family="monospace" font-size="12">NODE</text>
            <circle cx="415" cy="160" r="3.5" fill="#3DFF9A"/>
            <!-- Pointer 3 -->
            <path d="M415 160 H480" stroke="#3DFF9A" stroke-width="2"/>
            <!-- Null Pointer -->
            <rect x="490" y="135" width="50" height="50" rx="6" fill="#252b34" stroke="#555" stroke-width="1"/>
            <text x="498" y="165" fill="#888" font-family="monospace" font-size="11">NULL</text>
            <text x="60" y="60" fill="#3DFF9A" font-family="monospace" font-size="12" letter-spacing="2">POINTER_LOGIC // DYNAMIC_HEAP_ALLOC</text>
          </svg>
        `;
      case 'rental':
        return `
          <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title} architecture preview">
            <defs>
              <linearGradient id="grad-rental" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#14171c" />
                <stop offset="100%" stop-color="#0c0e11" />
              </linearGradient>
            </defs>
            <rect width="600" height="320" fill="url(#grad-rental)"/>
            <!-- Class Hierarchy Schema Diagram -->
            <rect x="220" y="60" width="160" height="55" rx="6" fill="#1c2027" stroke="#3DFF9A" stroke-width="1.5"/>
            <text x="245" y="94" fill="#3DFF9A" font-family="monospace" font-size="13" font-weight="bold">Vehicle [Abstract]</text>
            <!-- Inheritance arrows -->
            <path d="M300 115 V150 M140 150 H460 M140 150 V185 M300 150 V185 M460 150 V185" stroke="#252b34" stroke-width="2"/>
            <!-- Child Class 1 -->
            <rect x="70" y="185" width="140" height="60" rx="6" fill="#1c2027" stroke="#2D7BFF" stroke-width="1.2"/>
            <text x="95" y="215" fill="#F4F6F8" font-family="monospace" font-size="12">CarVehicle</text>
            <text x="95" y="232" fill="#888" font-family="monospace" font-size="10">+calcTariff()</text>
            <!-- Child Class 2 -->
            <rect x="230" y="185" width="140" height="60" rx="6" fill="#1c2027" stroke="#2D7BFF" stroke-width="1.2"/>
            <text x="250" y="215" fill="#F4F6F8" font-family="monospace" font-size="12">BikeVehicle</text>
            <text x="250" y="232" fill="#888" font-family="monospace" font-size="10">+calcTariff()</text>
            <!-- Child Class 3 -->
            <rect x="390" y="185" width="140" height="60" rx="6" fill="#1c2027" stroke="#2D7BFF" stroke-width="1.2"/>
            <text x="405" y="215" fill="#F4F6F8" font-family="monospace" font-size="12">Commercial</text>
            <text x="405" y="232" fill="#888" font-family="monospace" font-size="10">+calcTariff()</text>
            <text x="60" y="40" fill="#2D7BFF" font-family="monospace" font-size="12" letter-spacing="2">OOP_POLYMORPHISM // STATE_MACHINE</text>
          </svg>
        `;
      case 'agri':
      default:
        return `
          <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title} architecture preview">
            <defs>
              <linearGradient id="grad-agri" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#14171c" />
                <stop offset="100%" stop-color="#0c0e11" />
              </linearGradient>
            </defs>
            <rect width="600" height="320" fill="url(#grad-agri)"/>
            <!-- Sensor mesh & topography curves -->
            <path d="M50 260 Q150 180 280 230 T550 160" fill="none" stroke="#252b34" stroke-width="2"/>
            <path d="M50 220 Q200 130 350 200 T550 110" fill="none" stroke="#3DFF9A" stroke-width="2" stroke-opacity="0.7"/>
            <path d="M50 180 Q250 80 400 160 T550 80" fill="none" stroke="#2D7BFF" stroke-width="1.5" stroke-dasharray="6 4"/>
            <!-- Computer Vision Bounding Box Preview -->
            <rect x="220" y="90" width="160" height="120" rx="4" fill="rgba(61, 255, 154, 0.06)" stroke="#3DFF9A" stroke-width="1.5" stroke-dasharray="5 3"/>
            <text x="230" y="112" fill="#3DFF9A" font-family="monospace" font-size="11">CV_DIAGNOSTIC: 96.4%</text>
            <text x="60" y="50" fill="#3DFF9A" font-family="monospace" font-size="12" letter-spacing="2">SMART_AGRI // AI_INFERENCE_PIPELINE</text>
          </svg>
        `;
    }
  }

  /**
   * Renders the 5 specified projects into the DOM.
   */
  renderProjects() {
    const projectsContainer = document.getElementById('projects-list');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = PROJECTS.map((proj, idx) => {
      let badgeClass = 'badge-progress';
      if (proj.statusType === 'concept') badgeClass = 'badge-concept';
      if (proj.statusType === 'complete') badgeClass = 'badge-complete';

      return `
        <div class="project-card-wrap reveal-on-scroll stagger-${(idx % 3) + 1}">
          <article class="project-card card-container" data-project-id="${proj.id}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open detailed specifications for ${proj.title}">
            <div class="project-visual">
              <span class="project-status-badge ${badgeClass}">${proj.status}</span>
              ${this.getProjectVisualSVG(proj.visualTheme, proj.title)}
            </div>

            <div class="project-body">
              <div class="project-category">${proj.category}</div>
              <h3 class="project-title">${proj.title}</h3>
              <p class="project-desc">${proj.shortDescription}</p>

              <div class="project-tech-tags">
                ${proj.technologies.slice(0, 4).map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
            </div>

            <div class="project-footer">
              <span class="project-action-link">
                View Project Specs
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
              <span class="timeline-badge">${proj.date}</span>
            </div>
          </article>
        </div>
      `;
    }).join('');
  }

  /**
   * Card pointer hover lighting: tracks mouse coordinates --mx and --my on cards.
   */
  initCardLighting() {
    const updateCardCoords = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    };

    document.querySelectorAll('.glass-card, .skill-card, .skill-card-modern, .project-card, .profile-frame').forEach(card => {
      card.addEventListener('mousemove', updateCardCoords, { passive: true });
    });

    // Profile photo motion: Keep frame stationary, move only the photo inside
    const profileFrame = document.querySelector('.profile-frame');
    if (profileFrame) {
      const photo = profileFrame.querySelector('.profile-photo');
      if (photo) {
        profileFrame.addEventListener('mousemove', (e) => {
          const rect = profileFrame.getBoundingClientRect();
          const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          photo.style.transform = `scale(1.08) translate3d(${(normX * 8).toFixed(1)}px, ${(normY * 8 - 4).toFixed(1)}px, 0)`;
        }, { passive: true });

        profileFrame.addEventListener('mousedown', (e) => {
          const rect = profileFrame.getBoundingClientRect();
          const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          photo.style.transform = `scale(1.15) translate3d(${(normX * 12).toFixed(1)}px, ${(normY * 12 - 8).toFixed(1)}px, 0)`;
        }, { passive: true });

        profileFrame.addEventListener('mouseup', () => {
          photo.style.transform = 'scale(1.08) translateY(-4px)';
        }, { passive: true });

        profileFrame.addEventListener('mouseleave', () => {
          photo.style.transform = '';
        }, { passive: true });
      }
    }
  }

  /**
   * Navigation scroll state, active link observer, and mobile drawer.
   */
  initNavigation() {
    // Header scrolled state
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (this.header) {
        if (scrollY > 30) {
          this.header.classList.add('is-scrolled');
        } else {
          this.header.classList.remove('is-scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Active Section Observer for Nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => {
              if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('is-active');
              } else {
                link.classList.remove('is-active');
              }
            });
          }
        });
      }, {
        threshold: 0.35
      });

      sections.forEach(s => sectionObserver.observe(s));
    }

    // Smooth Anchor Scrolling with focus management
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          this.closeMobileMenu();

          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Accessibility: set focus to target section
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });

    // Mobile Hamburger Menu
    if (this.mobileToggle && this.mobileNav) {
      this.mobileToggle.addEventListener('click', () => {
        const isOpen = this.mobileNav.classList.contains('is-open');
        if (isOpen) {
          this.closeMobileMenu();
        } else {
          this.openMobileMenu();
        }
      });

      // Escape key dismissal
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileNav.classList.contains('is-open')) {
          this.closeMobileMenu();
        }
      });
    }
  }

  openMobileMenu() {
    if (!this.mobileNav || !this.mobileToggle) return;
    this.mobileNav.classList.add('is-open');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Focus first link in mobile nav
    const firstLink = this.mobileNav.querySelector('.mobile-nav-link');
    if (firstLink) firstLink.focus();
  }

  closeMobileMenu() {
    if (!this.mobileNav || !this.mobileToggle) return;
    this.mobileNav.classList.remove('is-open');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /**
   * Project Deep Dive Modal with focus trapping & accessibility.
   */
  initProjectModal() {
    if (!this.modalBackdrop) return;

    // Delegate click and keyboard trigger on project cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) {
        const projectId = card.getAttribute('data-project-id');
        this.openModal(projectId);
      }
    });

    document.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('project-card')) {
        e.preventDefault();
        const projectId = e.target.getAttribute('data-project-id');
        this.openModal(projectId);
      }
    });

    // Close on button click
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    // Close on backdrop click (outside dialog)
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) {
        this.closeModal();
      }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.classList.contains('is-open')) {
        this.closeModal();
      }
    });
  }

  openModal(projectId) {
    const project = getProjectById(projectId);
    if (!project || !this.modalBackdrop) return;

    this.lastFocusedElement = document.activeElement;

    // Fill modal content
    const modalContent = document.getElementById('modal-dynamic-content');
    if (modalContent) {
      let badgeClass = 'badge-progress';
      if (project.statusType === 'concept') badgeClass = 'badge-concept';
      if (project.statusType === 'complete') badgeClass = 'badge-complete';

      modalContent.innerHTML = `
        <div class="modal-header" style="margin-block-end: var(--space-md); padding-inline-end: 40px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-block-end: 8px;">
            <span class="project-status-badge ${badgeClass}">${project.status}</span>
            <span class="project-category">${project.category}</span>
          </div>
          <h2 id="modal-title" style="font-size: var(--text-h2); font-weight: 800; color: var(--color-text-primary); margin-block-end: 4px;">
            ${project.title}
          </h2>
          <span style="font-family: var(--font-mono); font-size: var(--text-mono-xs); color: var(--color-accent-green);">
            // ARCHITECTURE BLUEPRINT & SYSTEM SPECIFICATION (${project.date})
          </span>
        </div>

        <div class="modal-section" style="margin-block-end: var(--space-md);">
          <h3 style="font-size: var(--text-h3); color: var(--color-text-primary); margin-block-end: 6px;">The Problem</h3>
          <p style="font-size: var(--text-small); color: var(--color-text-secondary); line-height: 1.6;">${project.problemStatement}</p>
        </div>

        <div class="modal-section" style="margin-block-end: var(--space-md);">
          <h3 style="font-size: var(--text-h3); color: var(--color-text-primary); margin-block-end: 6px;">Architectural Solution</h3>
          <p style="font-size: var(--text-small); color: var(--color-text-secondary); line-height: 1.6;">${project.solutionOverview}</p>
        </div>

        <div class="modal-section" style="margin-block-end: var(--space-md);">
          <h3 style="font-size: var(--text-h3); color: var(--color-text-primary); margin-block-end: 6px;">Key Features</h3>
          <ul style="display: flex; flex-direction: column; gap: 6px;">
            ${project.keyFeatures.map(f => `
              <li style="font-size: var(--text-small); color: var(--color-text-secondary); display: flex; gap: 8px;">
                <span style="color: var(--color-accent-green);">▹</span>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="modal-section" style="margin-block-end: var(--space-md);">
          <h3 style="font-size: var(--text-h3); color: var(--color-text-primary); margin-block-end: 6px;">Engineering Notes</h3>
          <p style="font-size: var(--text-small); color: var(--color-text-secondary); line-height: 1.6; background: var(--color-surface-2); padding: 12px 16px; border-radius: 6px; border-left: 3px solid var(--color-accent-green);">
            ${project.architectureNotes}
          </p>
        </div>

        <div class="modal-section" style="margin-block-end: var(--space-lg);">
          <h3 style="font-size: var(--text-h3); color: var(--color-text-primary); margin-block-end: 8px;">Technologies</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="modal-actions" style="display: flex; flex-wrap: wrap; gap: 12px; border-top: 1px solid var(--color-border-hairline); padding-top: 16px;">
          <a href="${project.sourceCodeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-cursor-label="CODE">
            <span>Inspect Repository</span>
            <svg class="btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <span style="font-family: var(--font-mono); font-size: var(--text-mono-xs); color: var(--color-text-muted); display: inline-flex; align-items: center;">
            ${project.liveDemoUrl ? 'Production Deployment Available' : 'Source Code / Architectural Model'}
          </span>
        </div>
      `;
    }

    this.modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Trap focus inside modal
    if (this.modalCloseBtn) {
      this.modalCloseBtn.focus();
    }
  }

  closeModal() {
    if (!this.modalBackdrop) return;
    this.modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';

    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }

  /**
   * Client-side contact form validation with accessible inline feedback.
   */
  initContactForm() {
    if (!this.contactForm) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const statusRegion = document.getElementById('form-status-region');

    const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

    const checkField = (input, isValid, errorMsg) => {
      const errorEl = document.getElementById(`${input.id}-error`);
      if (!isValid) {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) {
          errorEl.textContent = errorMsg;
          errorEl.classList.add('is-visible');
        }
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.setAttribute('aria-invalid', 'false');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('is-visible');
        }
        return true;
      }
    };

    // Live validation on blur
    if (nameInput) {
      nameInput.addEventListener('blur', () => {
        checkField(nameInput, nameInput.value.trim().length >= 2, 'Please enter at least 2 characters.');
      });
    }

    if (emailInput) {
      emailInput.addEventListener('blur', () => {
        checkField(emailInput, validateEmail(emailInput.value.trim()), 'Please provide a valid email address.');
      });
    }

    if (subjectInput) {
      subjectInput.addEventListener('blur', () => {
        checkField(subjectInput, subjectInput.value.trim().length >= 3, 'Please enter a subject (minimum 3 characters).');
      });
    }

    if (messageInput) {
      messageInput.addEventListener('blur', () => {
        checkField(messageInput, messageInput.value.trim().length >= 10, 'Please write a message of at least 10 characters.');
      });
    }

    // Submit handler
    this.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = checkField(nameInput, nameInput.value.trim().length >= 2, 'Please enter at least 2 characters.');
      const isEmailValid = checkField(emailInput, validateEmail(emailInput.value.trim()), 'Please provide a valid email address.');
      const isSubjectValid = checkField(subjectInput, subjectInput.value.trim().length >= 3, 'Please enter a subject (minimum 3 characters).');
      const isMessageValid = checkField(messageInput, messageInput.value.trim().length >= 10, 'Please write a message of at least 10 characters.');

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const userName = nameInput.value.trim();
        if (statusRegion) {
          statusRegion.className = 'form-status-region is-success';
          statusRegion.innerHTML = `
            <strong>✓ Demonstration Message Processed:</strong><br>
            Thank you, <em>${userName}</em>! As this is a client-side frontend portfolio demonstration, no backend server is configured. To contact Ganesh directly, please email <a href="mailto:${CONFIG.social.email}" style="color: var(--color-accent-green); text-decoration: underline;">${CONFIG.social.email}</a>.
          `;
        }
        this.contactForm.reset();
      } else {
        if (statusRegion) {
          statusRegion.className = 'form-status-region';
          statusRegion.textContent = '';
        }
      }
    });
  }

  /**
   * Back to top button action.
   */
  initBackToTop() {
    if (!this.backToTopBtn) return;
    this.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Bootstrap once DOM content is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
});
