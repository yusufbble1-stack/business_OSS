// ===== Homepage (Public Landing Page) =====

export function renderHomepage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="hp-page">
      <!-- 3D Floating Background Elements -->
      <div class="hp-3d-bg" aria-hidden="true">
        <div class="hp-3d-orb hp-3d-orb-1"></div>
        <div class="hp-3d-orb hp-3d-orb-2"></div>
        <div class="hp-3d-orb hp-3d-orb-3"></div>
      </div>

      <!-- Navigation — Apple-style centered pill -->
      <nav class="hp-nav">
        <div class="hp-nav-inner">
          <div class="hp-nav-brand">
            <img src="/assets/logo.png" alt="AS Performance" class="hp-logo"/>
            <div>
              <span class="hp-brand-name">AS</span>
              <span class="hp-brand-bold">Performance</span>
              <span class="hp-brand-sub">chiptuning</span>
            </div>
          </div>
          <div class="hp-nav-pill">
            <a href="#/home" class="hp-nav-link active">Home</a>
            <a href="#/pricing" class="hp-nav-link">Pricing</a>
            <a href="#/credits" class="hp-nav-link">Credits</a>
            <a href="#/network" class="hp-nav-link">Network</a>
            <a href="#/gains" class="hp-nav-link">Calculator</a>
          </div>
          <div class="hp-nav-actions">
            <a href="mailto:asperformance.contact@gmail.com" class="hp-nav-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Us
            </a>
            <a href="#/login" class="hp-nav-login">Partner Login</a>
          </div>
          <button class="hp-mobile-toggle" id="hp-mobile-toggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      <!-- Hero — Cinematic Full-Bleed with BMW Headlights BG -->
      <section class="hp-hero" id="hp-hero-showcase">
        <div class="hp-hero-showcase">

          <!-- Full-bleed background video — BMW headlights loop -->
          <video class="hp-hero-bg-video" autoplay muted loop playsinline poster="/images/hero-bg.jpg">
            <source src="/videos/hero-bg.mp4" type="video/mp4">
          </video>
          <!-- Cinematic overlay — vignette + gradient -->
          <div class="hp-hero-overlay"></div>

          <!-- Centered Text Content — ABOVE the car (z-index 5) -->
          <div class="hp-hero-center">
            <h1 class="hp-hero-title">
              <span class="hp-title-light">Precision</span>
              <span class="hp-title-bold"><span class="hp-text-red">ECU</span> Mapping</span>
            </h1>
            <p class="hp-hero-subtitle">
              Professional engine tuning files delivered fast.
            </p>
            <div class="hp-showcase-model-info" id="hp-showcase-model-info">
              <span class="hp-showcase-model-name">Audi RS6 Avant</span>
              <span class="hp-showcase-model-tag">Stage 1 — +85 HP</span>
            </div>
            <div class="hp-hero-btns">
              <a href="#/gains" class="hp-btn-secondary hp-btn-outline">Check Gains</a>
              <a href="#/pricing" class="hp-btn-primary">
                View Pricing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>





        </div>

        <!-- Stats Bar — Below hero, above sections -->
        <div class="hp-hero-stats">
          <div class="hp-stat">
            <span class="hp-stat-num" data-count="500">0</span><span class="hp-stat-plus">+</span>
            <span class="hp-stat-label">Vehicles Tuned</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <span class="hp-stat-num" data-count="18">0</span>
            <span class="hp-stat-label">Partner Locations</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <span class="hp-stat-num" data-count="8">0</span>
            <span class="hp-stat-label">Countries</span>
          </div>
          <div class="hp-stat-divider"></div>
          <div class="hp-stat">
            <span class="hp-stat-num" data-count="99">0</span><span class="hp-stat-plus">%</span>
            <span class="hp-stat-label">Satisfaction</span>
          </div>
        </div>
      </section>

      <!-- Services Section — Cyberpunk -->
      <section class="hp-cyber-section" id="hp-services-cyber">
        <canvas class="hp-cyber-canvas" id="hp-services-canvas"></canvas>
        <div class="hp-cyber-grid-overlay"></div>
        <div class="hp-container" style="position:relative;z-index:2">
          <div class="hp-section-header">
            <span class="hp-section-tag">Our Services</span>
            <h2>Everything You Need for<br/><span class="hp-text-red">Maximum Performance</span></h2>
            <p>From Stage 1 ECO to full custom dyno setups, we cover every aspect of modern engine calibration.</p>
          </div>
          <div class="hp-services-grid">
            <div class="hp-service-card hp-service-featured hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <div class="hp-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
              </div>
              <h3>Performance Calibration</h3>
              <p>Stage 1 to Stage 4 tuning, big turbo setups, and custom dyno calibrations for maximum power gains.</p>
              <ul class="hp-service-list">
                <li>Stage 1 ECO / Daily</li>
                <li>Stage 2 & Stage 3</li>
                <li>Big Turbo / Hybrid</li>
                <li>Custom Dyno Setup</li>
              </ul>
              <span class="hp-service-from">from <strong>60€</strong></span>
            </div>
            <div class="hp-service-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <div class="hp-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 7h.01"/><path d="M17 7h.01"/><path d="M7 17h.01"/><path d="M17 17h.01"/></svg>
              </div>
              <h3>ECU Management</h3>
              <p>IMMO OFF, virgin files, clone ECU, DTC management and advanced ECU operations.</p>
              <span class="hp-service-from">from <strong>40€</strong></span>
            </div>
            <div class="hp-service-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <div class="hp-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/></svg>
              </div>
              <h3>Emission Solutions</h3>
              <p>AdBlue OFF, EGR/DPF removal, catalyst delete, and comprehensive reliability packs.</p>
              <span class="hp-service-from">from <strong>45€</strong></span>
            </div>
            <div class="hp-service-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <div class="hp-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </div>
              <h3>Gearbox / TCU</h3>
              <p>DSG tune, ZF8 tune, torque limiter adjustments, and launch RPM optimization.</p>
              <span class="hp-service-from">from <strong>50€</strong></span>
            </div>
            <div class="hp-service-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <div class="hp-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <h3>Diagnostic & Support</h3>
              <p>Remote diagnostics, log analysis, file verification, and hardware recommendations.</p>
              <span class="hp-service-from">from <strong>30€</strong></span>
            </div>
            <div class="hp-service-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <div class="hp-service-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>
              </div>
              <h3>FlexFuel / E85</h3>
              <p>E85 conversions, ethanol sensor setups, cold start optimization, and stage combos.</p>
              <span class="hp-service-from">from <strong>80€</strong></span>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Choose Us — Futuristic Cyberpunk Cards -->
      <section class="hp-cyber-section" id="hp-features-stack">
        <canvas class="hp-cyber-canvas" id="hp-cyber-canvas"></canvas>
        <div class="hp-cyber-grid-overlay"></div>
        <div class="hp-container" style="position:relative;z-index:2">
          <div class="hp-section-header">
            <span class="hp-section-tag">Why AS Performance</span>
            <h2>Precision. <span class="hp-text-red">Power.</span> Performance.</h2>
          </div>
          <div class="hp-cyber-bento">
            <!-- Card 01 — Large featured -->
            <div class="hp-cyber-card hp-cyber-card-hero">
              <div class="hp-cyber-card-inner">
                <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
                <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-br"></div>
                <div class="hp-cyber-scan-line"></div>
                <div class="hp-cyber-num">01</div>
                <div class="hp-cyber-circuit"></div>
                <div class="hp-cyber-content">
                  <div class="hp-cyber-status">
                    <span class="hp-cyber-dot"></span>
                    <span>ACTIVE</span>
                  </div>
                  <h4>Tested Solutions</h4>
                  <p>Every calibration file is dyno-tested and validated before deployment. Zero guesswork, pure engineering.</p>
                  <div class="hp-cyber-bar">
                    <div class="hp-cyber-bar-fill" style="--bar-w:95%"></div>
                    <span>Reliability: 95%</span>
                  </div>
                </div>
                <div class="hp-cyber-accent-line"></div>
              </div>
            </div>

            <!-- Card 02 -->
            <div class="hp-cyber-card hp-cyber-card-mid">
              <div class="hp-cyber-card-inner">
                <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
                <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-br"></div>
                <div class="hp-cyber-scan-line"></div>
                <div class="hp-cyber-num">02</div>
                <div class="hp-cyber-content">
                  <div class="hp-cyber-status">
                    <span class="hp-cyber-dot"></span>
                    <span>LIVE</span>
                  </div>
                  <h4>Fast Delivery</h4>
                  <p>Average turnaround of 30 minutes for standard files. Rush delivery available for urgent requests.</p>
                </div>
                <div class="hp-cyber-accent-line"></div>
              </div>
            </div>

            <!-- Card 03 -->
            <div class="hp-cyber-card hp-cyber-card-mid">
              <div class="hp-cyber-card-inner">
                <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
                <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-br"></div>
                <div class="hp-cyber-scan-line"></div>
                <div class="hp-cyber-num">03</div>
                <div class="hp-cyber-content">
                  <div class="hp-cyber-status">
                    <span class="hp-cyber-dot"></span>
                    <span>ONLINE</span>
                  </div>
                  <h4>Professional File Service</h4>
                  <p>State-of-the-art calibration tools and software. WinOLS, SwiftEC, and custom proprietary solutions.</p>
                </div>
                <div class="hp-cyber-accent-line"></div>
              </div>
            </div>

            <!-- Card 04 — Wide -->
            <div class="hp-cyber-card hp-cyber-card-wide">
              <div class="hp-cyber-card-inner">
                <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
                <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-br"></div>
                <div class="hp-cyber-scan-line"></div>
                <div class="hp-cyber-num">04</div>
                <div class="hp-cyber-content">
                  <div class="hp-cyber-status">
                    <span class="hp-cyber-dot"></span>
                    <span>NETWORK</span>
                  </div>
                  <h4>European Coverage</h4>
                  <p>18 certified partner locations across 8 countries. Growing network ensures service close to you.</p>
                </div>
                <div class="hp-cyber-accent-line"></div>
              </div>
            </div>

            <!-- Card 05 -->
            <div class="hp-cyber-card hp-cyber-card-sm">
              <div class="hp-cyber-card-inner">
                <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
                <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-br"></div>
                <div class="hp-cyber-scan-line"></div>
                <div class="hp-cyber-num">05</div>
                <div class="hp-cyber-content">
                  <div class="hp-cyber-status">
                    <span class="hp-cyber-dot"></span>
                    <span>24/7</span>
                  </div>
                  <h4>24/7 Support</h4>
                  <p>WhatsApp and email support always available. Never left waiting when you need assistance.</p>
                </div>
                <div class="hp-cyber-accent-line"></div>
              </div>
            </div>

            <!-- Card 06 -->
            <div class="hp-cyber-card hp-cyber-card-sm">
              <div class="hp-cyber-card-inner">
                <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
                <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
                <div class="hp-cyber-corner hp-cyber-corner-br"></div>
                <div class="hp-cyber-scan-line"></div>
                <div class="hp-cyber-num">06</div>
                <div class="hp-cyber-content">
                  <div class="hp-cyber-status">
                    <span class="hp-cyber-dot"></span>
                    <span>TRANSPARENT</span>
                  </div>
                  <h4>Transparent Pricing</h4>
                  <p>No hidden fees. Clear pricing for every service. What you see is what you pay.</p>
                </div>
                <div class="hp-cyber-accent-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Brands We Tune — Cyberpunk -->
      <section class="hp-cyber-section" id="hp-brands-cyber">
        <canvas class="hp-cyber-canvas" id="hp-brands-canvas"></canvas>
        <div class="hp-cyber-grid-overlay"></div>
        <div class="hp-container" style="position:relative;z-index:2">
          <div class="hp-section-header">
            <span class="hp-section-tag">Brands</span>
            <h2>We Tune <span class="hp-text-red">All Major Brands</span></h2>
          </div>
          <div class="hp-brands-grid">
            <div class="hp-brand-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <img src="/assets/cars/audi.png" alt="Audi" class="hp-brand-img"/>
              <div class="hp-brand-overlay">
                <span class="hp-brand-name-tag">Audi</span>
              </div>
            </div>
            <div class="hp-brand-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <img src="/assets/cars/bmw.png" alt="BMW" class="hp-brand-img"/>
              <div class="hp-brand-overlay">
                <span class="hp-brand-name-tag">BMW</span>
              </div>
            </div>
            <div class="hp-brand-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <img src="/assets/cars/mercedes.png" alt="Mercedes" class="hp-brand-img"/>
              <div class="hp-brand-overlay">
                <span class="hp-brand-name-tag">Mercedes</span>
              </div>
            </div>
            <div class="hp-brand-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <img src="/assets/cars/volkswagen.png" alt="Volkswagen" class="hp-brand-img"/>
              <div class="hp-brand-overlay">
                <span class="hp-brand-name-tag">Volkswagen</span>
              </div>
            </div>
            <div class="hp-brand-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <img src="/assets/cars/renault.png" alt="Renault" class="hp-brand-img"/>
              <div class="hp-brand-overlay">
                <span class="hp-brand-name-tag">Renault</span>
              </div>
            </div>
            <div class="hp-brand-card hp-cyber-card">
              <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
              <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
              <div class="hp-cyber-corner hp-cyber-corner-br"></div>
              <div class="hp-cyber-scan-line"></div>
              <div class="hp-cyber-accent-line"></div>
              <img src="/assets/cars/peugeot.png" alt="Peugeot" class="hp-brand-img"/>
              <div class="hp-brand-overlay">
                <span class="hp-brand-name-tag">Peugeot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA — Cyberpunk -->
      <section class="hp-cyber-section hp-cta-cyber" id="hp-cta-cyber">
        <canvas class="hp-cyber-canvas" id="hp-cta-canvas"></canvas>
        <div class="hp-cyber-grid-overlay"></div>
        <div class="hp-container" style="position:relative;z-index:2">
          <div class="hp-cta-inner hp-cyber-card">
            <div class="hp-cyber-corner hp-cyber-corner-tl"></div>
            <div class="hp-cyber-corner hp-cyber-corner-tr"></div>
            <div class="hp-cyber-corner hp-cyber-corner-bl"></div>
            <div class="hp-cyber-corner hp-cyber-corner-br"></div>
            <div class="hp-cyber-scan-line"></div>
            <div class="hp-cyber-accent-line"></div>
            <h2>Ready to Unlock Your Vehicle's <span class="hp-text-red">True Potential</span>?</h2>
            <p>Join our growing network of satisfied customers and certified partners across Europe.</p>
            <div class="hp-cta-btns">
              <a href="#/gains" class="hp-btn-primary hp-btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                Check Your Gains
              </a>
              <a href="https://wa.me/message" class="hp-btn-whatsapp hp-btn-lg" target="_blank">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer — Cyberpunk -->
      <footer class="hp-footer hp-cyber-footer">
        <div class="hp-cyber-grid-overlay" style="opacity:0.4"></div>
        <div class="hp-container" style="position:relative;z-index:2">
          <div class="hp-footer-grid">
            <div class="hp-footer-brand">
              <img src="/assets/logo.png" alt="AS Performance" class="hp-footer-logo"/>
              <p>Professional ECU mapping and file engineering. Precision calibrations for maximum performance across Europe.</p>
              <div class="hp-footer-socials">
                <a href="#" class="hp-social-link" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" class="hp-social-link" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" class="hp-social-link" aria-label="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
              </div>
            </div>
            <div class="hp-footer-col">
              <h4>Services</h4>
              <a href="#/pricing">Performance Calibration</a>
              <a href="#/pricing">ECU Management</a>
              <a href="#/pricing">Emission Solutions</a>
              <a href="#/pricing">FlexFuel / E85</a>
            </div>
            <div class="hp-footer-col">
              <h4>Company</h4>
              <a href="#/network">Partner Network</a>
              <a href="#/gains">Gains Calculator</a>
              <a href="#/pricing">Full Pricing</a>
              <a href="#/login">Partner Portal</a>
            </div>
            <div class="hp-footer-col">
              <h4>Contact</h4>
              <a href="mailto:asperformance.contact@gmail.com">asperformance.contact@gmail.com</a>
              <a href="#">WhatsApp Available</a>
              <a href="#/network">Find Nearest Partner</a>
            </div>
          </div>
          <div class="hp-footer-bottom">
            <span>© 2025 AS Performance Chiptuning. All rights reserved.</span>
            <span class="hp-footer-tagline">Precision. <span class="hp-text-red">Power.</span> Performance.</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Animate stats counter
  animateStats();
  // Mobile menu toggle
  initHomepageEvents();
  // Cyberpunk canvas + card effects
  initCyberCanvas();
  initCyberCards();
  
  // Initialize chatbot
  import('../components/chatbot.js').then(module => module.initChatbot());
}

function animateStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nums = entry.target.querySelectorAll('.hp-stat-num');
        nums.forEach(el => {
          const target = parseInt(el.dataset.count, 10);
          const duration = 2000;
          const start = performance.now();
          function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * ease);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hp-hero-stats');
  if (statsEl) observer.observe(statsEl);
}

function initHomepageEvents() {
  const toggle = document.getElementById('hp-mobile-toggle');
  const links = document.querySelector('.hp-nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('hp-mobile-open');
    });
  }
  // === Navbar scroll effect ===
  const nav = document.querySelector('.hp-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // === Showcase Auto-Cycle ===
  const thumbs = document.querySelectorAll('.hp-showcase-thumb');
  const cars = document.querySelectorAll('.hp-showcase-car');
  const brandText = document.getElementById('hp-showcase-brand-text');
  const modelInfo = document.getElementById('hp-showcase-model-info');
  const progressBar = document.getElementById('hp-showcase-progress');
  if (!thumbs.length) return;

  const CYCLE_TIME = 4000;
  const carData = [
    { brand: 'AUDI', model: 'Audi RS6 Avant', gain: 'Stage 1 — +85 HP' },
    { brand: 'BMW', model: 'BMW M4 Competition', gain: 'Stage 1 — +72 HP' },
    { brand: 'AMG', model: 'Mercedes-AMG GT 63 S', gain: 'Stage 1 — +98 HP' },
    { brand: 'GTI', model: 'VW Golf GTI MK8', gain: 'Stage 1 — +62 HP' },
  ];

  let currentIdx = 0;
  let cycleTimer = null;
  let progressAnim = null;

  function switchTo(idx) {
    currentIdx = idx;
    // Update thumbnails
    thumbs.forEach((t, i) => t.classList.toggle('active', i === idx));
    // Crossfade car images
    cars.forEach((c, i) => {
      c.classList.toggle('active', i === idx);
    });
    // Update brand text
    if (brandText) {
      brandText.style.opacity = '0';
      brandText.style.transform = 'translateY(20px)';
      setTimeout(() => {
        brandText.textContent = carData[idx].brand;
        brandText.style.opacity = '0.035';
        brandText.style.transform = 'translateY(0)';
      }, 200);
    }
    // Update model info
    if (modelInfo) {
      modelInfo.style.opacity = '0';
      modelInfo.style.transform = 'translateX(10px)';
      setTimeout(() => {
        modelInfo.innerHTML = `
          <span class="hp-showcase-model-name">${carData[idx].model}</span>
          <span class="hp-showcase-model-tag">${carData[idx].gain}</span>
        `;
        modelInfo.style.opacity = '1';
        modelInfo.style.transform = 'translateX(0)';
      }, 250);
    }
    // Reset progress bar
    startProgress();
  }

  function startProgress() {
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progressBar.style.transition = `width ${CYCLE_TIME}ms linear`;
          progressBar.style.width = '100%';
        });
      });
    }
  }

  function startCycle() {
    clearInterval(cycleTimer);
    cycleTimer = setInterval(() => {
      const next = (currentIdx + 1) % carData.length;
      switchTo(next);
    }, CYCLE_TIME);
    startProgress();
  }

  // Thumb click
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.index, 10);
      switchTo(idx);
      startCycle(); // restart timer
    });
  });

  startCycle();

  // Cleanup on navigation
  const heroSection = document.getElementById('hp-hero-showcase');
  if (heroSection) {
    const obs = new MutationObserver(() => {
      if (!document.getElementById('hp-hero-showcase')) {
        clearInterval(cycleTimer);
        obs.disconnect();
      }
    });
    obs.observe(document.getElementById('app'), { childList: true });
  }
}

function initCyberCanvas() {
  const canvasIds = ['hp-cyber-canvas', 'hp-services-canvas', 'hp-brands-canvas', 'hp-cta-canvas'];
  const blobConfigs = [
    // Features section
    [
      { x: 0.2, y: 0.3, r: 180, vx: 0.0003, vy: 0.0004, phase: 0 },
      { x: 0.7, y: 0.6, r: 220, vx: -0.0004, vy: 0.0003, phase: 2 },
      { x: 0.5, y: 0.8, r: 160, vx: 0.0002, vy: -0.0005, phase: 4 },
      { x: 0.85, y: 0.2, r: 140, vx: -0.0003, vy: 0.0002, phase: 1.5 },
    ],
    // Services section
    [
      { x: 0.15, y: 0.5, r: 200, vx: 0.0002, vy: -0.0003, phase: 1 },
      { x: 0.8, y: 0.3, r: 170, vx: -0.0003, vy: 0.0004, phase: 3 },
      { x: 0.45, y: 0.9, r: 190, vx: 0.0004, vy: -0.0002, phase: 0.5 },
    ],
    // Brands section
    [
      { x: 0.3, y: 0.4, r: 160, vx: -0.0002, vy: 0.0003, phase: 2 },
      { x: 0.75, y: 0.7, r: 200, vx: 0.0003, vy: -0.0004, phase: 0 },
      { x: 0.1, y: 0.8, r: 140, vx: 0.0004, vy: 0.0002, phase: 3.5 },
    ],
    // CTA section
    [
      { x: 0.5, y: 0.5, r: 240, vx: 0.0002, vy: 0.0002, phase: 0 },
      { x: 0.2, y: 0.3, r: 160, vx: -0.0003, vy: 0.0003, phase: 2.5 },
    ],
  ];

  const cleanupFns = [];

  canvasIds.forEach((id, idx) => {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    const blobs = blobConfigs[idx] || blobConfigs[0];
    let animId;

    function resize() {
      const section = canvas.parentElement;
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      blobs.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -0.1 || b.x > 1.1) b.vx *= -1;
        if (b.y < -0.1 || b.y > 1.1) b.vy *= -1;
        const pulse = 1 + 0.15 * Math.sin(t * 0.001 + b.phase);
        const cx = b.x * w;
        const cy = b.y * h;
        const cr = b.r * pulse;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        grad.addColorStop(0, 'rgba(196, 30, 30, 0.35)');
        grad.addColorStop(0.3, 'rgba(230, 57, 70, 0.15)');
        grad.addColorStop(0.6, 'rgba(139, 0, 0, 0.06)');
        grad.addColorStop(1, 'rgba(196, 30, 30, 0)');
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(draw);
    cleanupFns.push(() => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    });
  });

  // Cleanup on navigation
  const observer = new MutationObserver(() => {
    if (!document.getElementById(canvasIds[0])) {
      cleanupFns.forEach(fn => fn());
      observer.disconnect();
    }
  });
  observer.observe(document.getElementById('app'), { childList: true });
}

function initCyberCards() {
  const cards = document.querySelectorAll('.hp-cyber-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 6;
      const rotateY = (x - 0.5) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      
      // Move glow to cursor position — works on inner wrapper or directly
      const inner = card.querySelector('.hp-cyber-card-inner');
      const target = inner || card;
      target.style.setProperty('--glow-x', `${x * 100}%`);
      target.style.setProperty('--glow-y', `${y * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}
