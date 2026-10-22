/**
 * ====================================================================
 * SIGNATURE CURSOR: "0 1" IN GREEN - GANESH S PORTFOLIO
 * ====================================================================
 * Frame-rate independent lerp physics, gentle binary bit flicker,
 * velocity-gated recycled trail node pool, and magnetic pull logic.
 */

export class SignatureCursor {
  constructor() {
    this.isEnabled = false;
    this.isReducedMotion = false;

    // Mouse coordinates (target)
    this.mouse = { x: -100, y: -100 };
    this.prevMouse = { x: -100, y: -100 };
    this.velocity = 0;

    // Interpolated positions
    this.glyphPos = { x: -100, y: -100 };

    // Lerp factors
    this.glyphLerp = 0.5;

    // Magnetic target
    this.magneticElement = null;
    this.magneticBounds = null;

    // Trail pool
    this.trailPoolSize = 14;
    this.trailPool = [];
    this.trailIndex = 0;
    this.lastTrailSpawn = 0;

    // DOM Elements
    this.host = null;
    this.glyphEl = null;
    this.bit0El = null;
    this.bit1El = null;
    this.labelEl = null;

    // Animation frame & timer IDs
    this.rafId = null;
    this.bit0Timer = null;
    this.bit1Timer = null;
    this.lastTime = performance.now();

    // Bound listeners for clean teardown
    this.onMouseMove = this.handleMouseMove.bind(this);
    this.onMouseDown = this.handleMouseDown.bind(this);
    this.onMouseUp = this.handleMouseUp.bind(this);
    this.onMouseEnter = this.handleMouseEnter.bind(this);
    this.onMouseLeave = this.handleMouseLeave.bind(this);
  }

  /**
   * Initializes cursor if fine pointer & hover are supported.
   */
  init() {
    // Only enable on desktop with fine mouse pointer & hover support
    const isFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!isFinePointer) {
      return;
    }

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.buildDOM();
    this.initTrailPool();
    this.bindEvents();

    if (!this.isReducedMotion) {
      this.startBinaryFlicker();
    }

    // Safely hide native cursor only AFTER custom cursor elements exist
    document.body.classList.add('has-custom-cursor');
    this.isEnabled = true;

    // Start render loop
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  /**
   * Creates cursor DOM structure safely and appends to body.
   */
  buildDOM() {
    this.host = document.createElement('div');
    this.host.className = 'cursor-host';
    this.host.setAttribute('aria-hidden', 'true');

    // Glyph container
    this.glyphEl = document.createElement('div');
    this.glyphEl.className = 'cursor-glyph';

    this.bit0El = document.createElement('span');
    this.bit0El.className = 'cursor-bit';
    this.bit0El.textContent = '0';

    this.bit1El = document.createElement('span');
    this.bit1El.className = 'cursor-bit';
    this.bit1El.textContent = '1';

    this.labelEl = document.createElement('span');
    this.labelEl.className = 'cursor-label';
    this.labelEl.textContent = '';

    this.glyphEl.appendChild(this.bit0El);
    this.glyphEl.appendChild(this.bit1El);
    this.glyphEl.appendChild(this.labelEl);

    this.host.appendChild(this.glyphEl);

    document.body.appendChild(this.host);
  }

  /**
   * Creates pre-allocated DOM pool for trailing binary bits to avoid garbage collection.
   */
  initTrailPool() {
    for (let i = 0; i < this.trailPoolSize; i++) {
      const item = document.createElement('span');
      item.className = 'cursor-trail-item';
      item.style.display = 'none';
      item.textContent = Math.random() > 0.5 ? '1' : '0';
      this.host.appendChild(item);
      this.trailPool.push({
        el: item,
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        opacity: 0.7,
        scale: 1,
        life: 0,
        maxLife: 600 // ms
      });
    }
  }

  /**
   * Gentle, randomized binary bit toggling (120-400ms).
   */
  startBinaryFlicker() {
    const flipBit0 = () => {
      if (this.bit0El) {
        this.bit0El.textContent = this.bit0El.textContent === '0' ? '1' : '0';
      }
      const nextDelay = Math.floor(Math.random() * (400 - 140 + 1)) + 140;
      this.bit0Timer = setTimeout(flipBit0, nextDelay);
    };

    const flipBit1 = () => {
      if (this.bit1El) {
        this.bit1El.textContent = this.bit1El.textContent === '1' ? '0' : '1';
      }
      const nextDelay = Math.floor(Math.random() * (420 - 150 + 1)) + 150;
      this.bit1Timer = setTimeout(flipBit1, nextDelay);
    };

    this.bit0Timer = setTimeout(flipBit0, 200);
    this.bit1Timer = setTimeout(flipBit1, 280);
  }

  /**
   * Spawns a trailing bit from the pool when velocity exceeds threshold.
   */
  spawnTrailNode(now) {
    if (this.isReducedMotion || this.velocity < 5.0 || (now - this.lastTrailSpawn) < 45) {
      return;
    }

    this.lastTrailSpawn = now;
    const node = this.trailPool[this.trailIndex];
    this.trailIndex = (this.trailIndex + 1) % this.trailPoolSize;

    node.active = true;
    node.x = this.glyphPos.x;
    node.y = this.glyphPos.y;
    node.opacity = 0.75;
    node.scale = 1.0;
    node.life = 0;
    node.maxLife = 550; // fade over ~550ms

    // Slight drift opposite to motion vector
    const angle = Math.atan2(this.mouse.y - this.prevMouse.y, this.mouse.x - this.prevMouse.x) + Math.PI;
    const speed = Math.random() * 0.8 + 0.2;
    node.vx = Math.cos(angle) * speed;
    node.vy = Math.sin(angle) * speed;

    node.el.textContent = Math.random() > 0.5 ? '1' : '0';
    node.el.style.display = 'block';
    node.el.style.opacity = node.opacity.toFixed(2);
    node.el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) scale(${node.scale})`;
  }

  /**
   * Updates and renders trailing bits.
   */
  updateTrail(deltaTime) {
    for (let i = 0; i < this.trailPoolSize; i++) {
      const node = this.trailPool[i];
      if (!node.active) continue;

      node.life += deltaTime;
      if (node.life >= node.maxLife) {
        node.active = false;
        node.el.style.display = 'none';
        continue;
      }

      const progress = node.life / node.maxLife;
      node.x += node.vx * (deltaTime / 16.67);
      node.y += node.vy * (deltaTime / 16.67);
      node.opacity = (1 - progress) * 0.75;
      node.scale = 1 - (progress * 0.5);

      node.el.style.opacity = Math.max(0, node.opacity).toFixed(2);
      node.el.style.transform = `translate3d(${node.x}px, ${node.y}px, 0) scale(${node.scale.toFixed(2)})`;
    }
  }

  /**
   * Binds pointer events with delegation for interactive targets.
   */
  bindEvents() {
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('mousedown', this.onMouseDown, { passive: true });
    window.addEventListener('mouseup', this.onMouseUp, { passive: true });
    document.addEventListener('mouseenter', this.onMouseEnter, { passive: true });
    document.addEventListener('mouseleave', this.onMouseLeave, { passive: true });

    // Interactive contextual hover delegation
    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target) return;

      // Profile portrait hover (frame remains stationary, cursor changes to GANESH)
      const profileCard = target.closest('.profile-frame, .profile-frame-wrap');
      if (profileCard) {
        this.resetMagneticPull();
        this.setContextualState('GANESH', 'profile');
        return;
      }

      // Project cards
      const projectCard = target.closest('.project-card');
      if (projectCard) {
        this.setContextualState('VIEW PROJECT', 'project');
        return;
      }

      // Buttons and actionable links
      const actionEl = target.closest('a, button, [role="button"], .interactive-target');
      if (actionEl) {
        const customLabel = actionEl.getAttribute('data-cursor-label') || 'EXPLORE';
        this.setContextualState(customLabel, 'button');

        // Check if element has magnetic pull enabled
        if (actionEl.hasAttribute('data-magnetic')) {
          this.magneticElement = actionEl;
          this.magneticBounds = actionEl.getBoundingClientRect();
        }
        return;
      }

      // Text elements
      const textEl = target.closest('p, h1, h2, h3, blockquote, .section-subtitle');
      if (textEl && !target.closest('a, button')) {
        this.setTextState(true);
        return;
      }

      // Default state reset
      this.resetContextualState();
    });

    document.addEventListener('mouseout', (e) => {
      const related = e.relatedTarget;
      if (!related || !related.closest('.project-card, a, button, [role="button"], .profile-frame, .profile-frame-wrap')) {
        this.resetContextualState();
      }
      if (!related || !related.closest('p, h1, h2, h3, blockquote')) {
        this.setTextState(false);
      }
      if (this.magneticElement && (!related || !related.closest('[data-magnetic]'))) {
        this.resetMagneticPull();
      }
    });
  }

  handleMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    // Apply magnetic pull if active
    if (this.magneticElement && this.magneticBounds) {
      const centerX = this.magneticBounds.left + this.magneticBounds.width / 2;
      const centerY = this.magneticBounds.top + this.magneticBounds.height / 2;
      const deltaX = (e.clientX - centerX) * 0.28;
      const deltaY = (e.clientY - centerY) * 0.28;

      // Clamp translation to ~8px
      const clampedX = Math.max(-8, Math.min(8, deltaX));
      const clampedY = Math.max(-8, Math.min(8, deltaY));
      this.magneticElement.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
    }
  }

  handleMouseDown(e) {
  }

  handleMouseUp() {
  }

  handleMouseEnter() {
    if (this.host) this.host.style.opacity = '1';
  }

  handleMouseLeave() {
    if (this.host) this.host.style.opacity = '0';
    this.resetMagneticPull();
  }

  setContextualState(label, type) {
    document.body.classList.add('cursor-hover-active');
    document.body.classList.remove('cursor-text-active');
    if (type === 'profile') {
      document.body.classList.add('cursor-profile-active');
    } else {
      document.body.classList.remove('cursor-profile-active');
    }
    if (this.labelEl) {
      this.labelEl.textContent = label;
    }
  }

  setTextState(active) {
    if (active) {
      document.body.classList.add('cursor-text-active');
    } else {
      document.body.classList.remove('cursor-text-active');
    }
  }

  resetContextualState() {
    document.body.classList.remove('cursor-hover-active', 'cursor-profile-active');
    if (this.labelEl) {
      this.labelEl.textContent = '';
    }
  }

  resetMagneticPull() {
    if (this.magneticElement) {
      this.magneticElement.style.transform = '';
      this.magneticElement = null;
      this.magneticBounds = null;
    }
  }

  /**
   * Main animation loop using delta-time based frame-rate independent lerp.
   */
  loop(currentTime) {
    const deltaTime = Math.min(currentTime - this.lastTime, 64);
    this.lastTime = currentTime;

    // Calculate instantaneous velocity
    const dx = this.mouse.x - this.prevMouse.x;
    const dy = this.mouse.y - this.prevMouse.y;
    this.velocity = Math.hypot(dx, dy);
    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;

    if (this.isReducedMotion) {
      // In reduced motion mode: strictly follow pointer with no lag or trail
      this.glyphPos.x = this.mouse.x;
      this.glyphPos.y = this.mouse.y;
    } else {
      // Delta-time adjusted lerp factor
      const dtFactor = deltaTime / 16.67;
      const adjGlyphLerp = Math.min(1, this.glyphLerp * dtFactor);

      this.glyphPos.x += (this.mouse.x - this.glyphPos.x) * adjGlyphLerp;
      this.glyphPos.y += (this.mouse.y - this.glyphPos.y) * adjGlyphLerp;

      this.spawnTrailNode(currentTime);
      this.updateTrail(deltaTime);
    }

    // Apply translation to floating green number
    if (this.glyphEl) {
      this.glyphEl.style.transform = `translate3d(${this.glyphPos.x}px, ${this.glyphPos.y}px, 0)`;
    }

    this.rafId = requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Complete cleanup for teardown.
   */
  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.bit0Timer) clearTimeout(this.bit0Timer);
    if (this.bit1Timer) clearTimeout(this.bit1Timer);

    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mouseenter', this.onMouseEnter);
    document.removeEventListener('mouseleave', this.onMouseLeave);

    document.body.classList.remove('has-custom-cursor', 'cursor-hover-active', 'cursor-text-active');
    if (this.host && this.host.parentNode) {
      this.host.parentNode.removeChild(this.host);
    }
  }
}
