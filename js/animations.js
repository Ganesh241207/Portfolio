/**
 * ====================================================================
 * ANIMATION & CANVAS CONTROLLER - GANESH S PORTFOLIO
 * ====================================================================
 * Interactive 3D wireframe particle sphere, pointer-reactive physics,
 * intersection-observer scroll reveals, scroll progress fallback,
 * and performance-focused viewport culling.
 */

export class AnimationController {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.particleCount = 55;
    this.sphereRadius = 240;
    this.rotation = { x: 0, y: 0 };
    this.targetRotation = { x: 0, y: 0 };
    this.isHeroVisible = true;
    this.heroCanvasRaf = null;

    this.mouse = { x: 0, y: 0 };
    this.isReducedMotion = false;

    this.scrollProgressBar = null;
    this.backToTopBtn = null;
    this.scrollCue = null;
  }

  /**
   * Initializes all visual choreographies.
   */
  init() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.scrollProgressBar = document.querySelector('.scroll-progress-bar');
    this.backToTopBtn = document.querySelector('.back-to-top');
    this.scrollCue = document.querySelector('.hero-scroll-cue');

    this.initHeroCanvas();
    this.initScrollReveals();
    this.initSkillsFloatObserver();
    this.initScrollProgress();
    this.bindWindowEvents();
  }

  /**
   * Initializes interactive 3D particle sphere in Hero background.
   */
  initHeroCanvas() {
    this.canvas = document.getElementById('hero-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) return;

    // Detect device power / screen width to adjust particle density
    const isMobile = window.innerWidth < 768;
    const isLowPower = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    this.particleCount = isMobile ? 32 : (isLowPower ? 40 : 64);
    this.sphereRadius = isMobile ? 160 : 250;

    this.resizeCanvas();

    // Generate points on 3D sphere surface using Fibonacci spiral
    this.particles = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < this.particleCount; i++) {
      const y = 1 - (i / (this.particleCount - 1)) * 2; // -1 to 1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      this.particles.push({
        x: x * this.sphereRadius,
        y: y * this.sphereRadius,
        z: z * this.sphereRadius,
        baseX: x * this.sphereRadius,
        baseY: y * this.sphereRadius,
        baseZ: z * this.sphereRadius,
        size: Math.random() * 1.5 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    // Viewport Culling: Pause canvas rendering when hero is scrolled off-screen
    const heroSection = document.getElementById('home');
    if (heroSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isHeroVisible = entry.isIntersecting;
          if (this.isHeroVisible && !this.heroCanvasRaf) {
            this.loopCanvas();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    if (!this.isReducedMotion) {
      this.loopCanvas();
    } else {
      // Draw single static frame for reduced motion users
      this.renderCanvasFrame(0);
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
  }

  /**
   * Main render loop for Hero Canvas.
   */
  loopCanvas() {
    if (!this.isHeroVisible) {
      this.heroCanvasRaf = null;
      return;
    }

    const now = performance.now() * 0.001;
    this.renderCanvasFrame(now);
    this.heroCanvasRaf = requestAnimationFrame(this.loopCanvas.bind(this));
  }

  renderCanvasFrame(time) {
    if (!this.ctx || !this.canvasWidth) return;

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    const centerX = this.canvasWidth * 0.5;
    const centerY = this.canvasHeight * 0.48;

    // Smooth rotational inertia reacting to mouse coordinates
    this.rotation.x += (this.targetRotation.x - this.rotation.x) * 0.04;
    this.rotation.y += (this.targetRotation.y - this.rotation.y) * 0.04;

    const baseRotationY = this.rotation.y + time * 0.2;
    const baseRotationX = this.rotation.x + Math.sin(time * 0.15) * 0.08;

    const cosY = Math.cos(baseRotationY);
    const sinY = Math.sin(baseRotationY);
    const cosX = Math.cos(baseRotationX);
    const sinX = Math.sin(baseRotationX);

    // Projected 2D coordinates array
    const projected = [];

    // Calculate 3D rotations & perspective projection
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Y rotation
      const x1 = p.baseX * cosY - p.baseZ * sinY;
      const z1 = p.baseZ * cosY + p.baseX * sinY;

      // X rotation
      const y2 = p.baseY * cosX - z1 * sinX;
      const z2 = z1 * cosX + p.baseY * sinX;

      // Perspective projection
      const fov = 500;
      const scale = fov / (fov + z2 + this.sphereRadius * 0.4);
      const projX = centerX + x1 * scale;
      const projY = centerY + y2 * scale;
      const alpha = Math.max(0.08, Math.min(0.9, (z2 + this.sphereRadius) / (this.sphereRadius * 2)));

      projected.push({
        x: projX,
        y: projY,
        scale: scale,
        alpha: alpha,
        z: z2
      });
    }

    // Draw connecting constellation lines
    const maxDist = this.sphereRadius * 0.52;
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * 0.22 * Math.min(projected[i].alpha, projected[j].alpha);
          this.ctx.beginPath();
          this.ctx.moveTo(projected[i].x, projected[i].y);
          this.ctx.lineTo(projected[j].x, projected[j].y);
          this.ctx.strokeStyle = `rgba(61, 255, 154, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    // Draw nodal points
    for (let i = 0; i < projected.length; i++) {
      const p = projected[i];
      const radius = Math.max(1, p.scale * 2.2);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(61, 255, 154, ${p.alpha * 0.9})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(61, 255, 154, 0.6)';
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // reset
    }
  }

  /**
   * Observer for smooth blur-to-sharp section & card reveals.
   */
  initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Subtle exit/re-enter choreography if scrolled well past
          const rect = entry.boundingClientRect;
          if (rect.top > window.innerHeight) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * Scroll progress bar and scroll cue logic.
   */
  initScrollProgress() {
    const onScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Update progress bar scaleX
      if (this.scrollProgressBar && maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
        this.scrollProgressBar.style.transform = `scaleX(${progress})`;
      }

      // Hide hero scroll cue after 60px scroll
      if (this.scrollCue) {
        if (scrollY > 60) {
          this.scrollCue.classList.add('is-scrolled');
        } else {
          this.scrollCue.classList.remove('is-scrolled');
        }
      }

      // Back to top button visibility (> 420px)
      if (this.backToTopBtn) {
        if (scrollY > 420) {
          this.backToTopBtn.classList.add('is-visible');
        } else {
          this.backToTopBtn.classList.remove('is-visible');
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial state
  }

  /**
   * Viewport Intersection Observer for continuous floating logo performance.
   * Enables hardware-accelerated logo float animation only when the skills section is visible.
   */
  initSkillsFloatObserver() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    if (!('IntersectionObserver' in window)) {
      skillsSection.classList.add('is-animating');
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillsSection.classList.add('is-animating');
        } else {
          skillsSection.classList.remove('is-animating');
        }
      });
    }, {
      rootMargin: '100px 0px 100px 0px',
      threshold: 0.05
    });

    observer.observe(skillsSection);
  }

  /**
   * Binds mouse move and window resize events.
   */
  bindWindowEvents() {
    window.addEventListener('mousemove', (e) => {
      // Map pointer to -1 to 1 normalized range for subtle sphere tilting
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      this.targetRotation.y = normX * 0.45;
      this.targetRotation.x = -normY * 0.45;
    }, { passive: true });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.resizeCanvas();
      }, 150);
    }, { passive: true });
  }
}
