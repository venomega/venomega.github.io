/* ═══ ENGINE: APLICAR CONFIG AL DOM ═══ */
function applyConfig(cfg) {
  const c = cfg.colors;
  document.documentElement.style.setProperty('--bg',      c.bg);
  document.documentElement.style.setProperty('--bg2',     c.bg2);
  document.documentElement.style.setProperty('--bg3',     c.bg3);
  document.documentElement.style.setProperty('--surface', c.surface);
  document.documentElement.style.setProperty('--border',  c.border);
  document.documentElement.style.setProperty('--text',    c.text);
  document.documentElement.style.setProperty('--text2',   c.text2);
  document.documentElement.style.setProperty('--text3',   c.text3);
  document.documentElement.style.setProperty('--accent',  c.accent);
  document.documentElement.style.setProperty('--accent2', c.accent2);
  document.documentElement.style.setProperty('--accent3', c.accent3);

  document.documentElement.style.setProperty('--font-display', cfg.fontDisplay);
  document.documentElement.style.setProperty('--font-body',    cfg.fontBody);

  document.getElementById('hero-firstname').textContent = cfg.firstname;
  document.getElementById('hero-lastname').textContent  = cfg.lastname;
  document.getElementById('hero-desc').textContent      = cfg.heroDesc;
  document.getElementById('hero-tag').lastChild.textContent = cfg.heroTag;
  document.getElementById('nav-initials').textContent   = (cfg.firstname[0]||'') + (cfg.lastname[0]||'');
  document.getElementById('nav-tagline-short').textContent = cfg.tagline;
  document.getElementById('nav-cta').textContent        = cfg.navCta;
  document.getElementById('footer-copy').textContent    = cfg.footerText;
  document.title = `${cfg.firstname} ${cfg.lastname} — ${cfg.tagline}`;
  document.getElementById('page-title').textContent = document.title;

  const avatarEl = document.getElementById('about-avatar');
  if (cfg.avatar && (cfg.avatar.startsWith('http') || cfg.avatar.startsWith('/'))) {
    avatarEl.innerHTML = `<img src="${cfg.avatar}" alt="avatar" style="width:100%;height:100%;object-fit:cover;">`;
  } else {
    avatarEl.textContent = cfg.avatar || '👩‍💻';
  }

  document.getElementById('about-intro').textContent = cfg.aboutIntro;
  document.getElementById('about-body').innerHTML    = cfg.aboutBody.replace(/\n/g,'<br>');
  document.getElementById('contact-intro').textContent = cfg.contactIntro;

  const detailsEl = document.getElementById('about-details');
  detailsEl.innerHTML = (cfg.aboutDetails||[]).map(d =>
    `<div class="about-detail"><span class="detail-label">${d.label}</span><span class="detail-val">${d.value}</span></div>`
  ).join('');

  const socialEl = document.getElementById('about-social');
  const socials = [
    {href: cfg.github,   label: '⎈ GitHub'},
    {href: cfg.linkedin, label: '💼 LinkedIn'},
    {href: cfg.twitter,  label: '𝕏 Twitter'},
  ].filter(s => s.href);
  socialEl.innerHTML = socials.map(s =>
    `<a href="${s.href}" target="_blank" class="social-link">${s.label}</a>`
  ).join('');

  const badgesEl = document.getElementById('hero-badges');
  badgesEl.innerHTML = (cfg.heroBadges||[]).map(b =>
    `<div class="hero-badge"><div class="badge-dot"></div>${b}</div>`
  ).join('');

  buildStats(cfg.stats);
  buildSkills(cfg.skillCategories);
  buildProjects(cfg.projects);

  const expEl = document.getElementById('experience');
  expEl.style.display = cfg.showExperience ? '' : 'none';
  buildExperience(cfg.experience);

  const svcEl = document.getElementById('services');
  svcEl.style.display = cfg.showServices ? '' : 'none';
  buildServices(cfg.services);

  buildContactMethods(cfg);

  document.getElementById('cursor').style.display = cfg.customCursor ? '' : 'none';
  document.body.style.setProperty('--noise-op', cfg.noiseBg ? '.028' : '0');
  document.querySelector('.hero-grid-bg').style.display = cfg.heroGrid ? '' : 'none';

  syncPanel(cfg);
}

function buildStats(stats) {
  const track = document.getElementById('stats-track');
  const items = [...stats, ...stats].map(s =>
    `<div class="stat-item">
      <div><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>
      <div class="stat-sep"></div>
    </div>`
  ).join('');
  track.innerHTML = items;
}

function buildSkills(cats) {
  const el = document.getElementById('skills-categories');
  el.innerHTML = cats.map(cat => `
    <div class="skill-category">
      <div class="skill-cat-header">
        <div class="skill-cat-icon">${cat.icon}</div>
        <div>
          <div class="skill-cat-name">${cat.name}</div>
          <div class="skill-cat-desc">${cat.desc}</div>
        </div>
      </div>
      <div class="skills-grid">
        ${cat.skills.map(s => `
          <div class="skill-chip">
            <div class="chip-level ${s.level}"></div>${s.name}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function buildProjects(projects) {
  const allTags = ['Todos', ...new Set(projects.flatMap(p => p.tags))];
  const filtersEl = document.getElementById('projects-filters');
  filtersEl.innerHTML = allTags.map((t,i) =>
    `<button class="filter-btn ${i===0?'active':''}" data-filter="${t}">${t}</button>`
  ).join('');

  filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.style.display = (f === 'Todos' || card.dataset.tags.includes(f)) ? '' : 'none';
      });
    });
  });

  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects.map(p => `
    <div class="project-card" data-tags="${p.tags.join(',')}">
      <div class="project-thumb">
        <div class="project-tags-overlay">
          ${p.tags.map(t => `<span class="project-tag-chip">${t}</span>`).join('')}
        </div>
        <span style="position:relative;z-index:1;font-size:3.5rem">${p.emoji}</span>
      </div>
      <div class="project-body">
        <div class="project-type">${p.type}</div>
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.desc}</div>
        <div class="project-stack">
          ${p.stack.map(s => `<span class="stack-badge">${s}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <div class="project-links">
          ${p.demo ? `<a href="${p.demo}" target="_blank" class="proj-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            Demo
          </a>` : ''}
          ${p.repo ? `<a href="${p.repo}" target="_blank" class="proj-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            Repo
          </a>` : ''}
        </div>
        ${p.featured ? '<div class="project-featured">★ Destacado</div>' : ''}
      </div>
    </div>
  `).join('');
}

function buildExperience(exp) {
  const el = document.getElementById('timeline');
  el.innerHTML = exp.map(e => `
    <div class="timeline-item">
      <div class="timeline-date">
        <strong>${e.company}</strong>
        ${e.period}<br><span style="color:var(--text3);font-size:.7rem">${e.location}</span>
      </div>
      <div class="timeline-line">
        <div class="timeline-dot"></div>
        <div class="timeline-spine"></div>
      </div>
      <div class="timeline-content">
        <div class="timeline-role">${e.role}</div>
        <div class="timeline-company">${e.company}</div>
        <div class="timeline-desc">${e.desc}</div>
        <div class="timeline-tech">${e.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

function buildServices(services) {
  const el = document.getElementById('services-grid');
  el.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <div class="service-title">${s.title}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-items">
        ${s.items.map(i => `<div class="service-item">${i}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

function buildContactMethods(cfg) {
  const methods = [
    { icon: '✉️', label: 'Email', val: cfg.email,    href: `mailto:${cfg.email}` },
    { icon: '<img src="3party/telegram.png" alt="Telegram" style="width:24px;height:24px">', label: 'Telegram', val: cfg.telegram, href: cfg.telegram },
    { icon: '📍', label: 'Ubicación', val: cfg.location, href: '#' },
  ].filter(m => m.val);
  document.getElementById('contact-methods').innerHTML = methods.map(m =>
    `<a href="${m.href}" class="contact-method">
      <div class="contact-method-icon">${m.icon}</div>
      <div>
        <div class="contact-method-label">${m.label}</div>
        <div class="contact-method-val">${m.val}</div>
      </div>
    </a>`
  ).join('');
}

/* ═══ CONFIG PANEL SYNC ═══ */
function syncPanel(cfg) {
  const set = (id, val) => { const el = document.getElementById(id); if(el) el.value = val||''; };
  set('cfg-firstname', cfg.firstname);
  set('cfg-lastname',  cfg.lastname);
  const fnEl = document.getElementById('lbl-firstname'); if(fnEl) fnEl.textContent = cfg.firstname;
  const lnEl = document.getElementById('lbl-lastname');  if(lnEl) lnEl.textContent = cfg.lastname;
  set('cfg-tagline',   cfg.tagline);
  set('cfg-avatar',    cfg.avatar);
  set('cfg-desc',      cfg.heroDesc);
  set('cfg-hero-tag',  cfg.heroTag);
  set('cfg-about-intro', cfg.aboutIntro);
  set('cfg-about-body',  cfg.aboutBody);
  set('cfg-email',    cfg.email);
  set('cfg-telegram', cfg.telegram);
  set('cfg-location', cfg.location);
  set('cfg-github',   cfg.github);
  set('cfg-linkedin', cfg.linkedin);
  set('cfg-twitter',  cfg.twitter);
  set('cfg-cta',      cfg.navCta);
  set('cfg-footer',   cfg.footerText);

  set('cfg-bg',      cfg.colors.bg);
  set('cfg-bg2',     cfg.colors.bg2);
  set('cfg-text',    cfg.colors.text);
  set('cfg-accent',  cfg.colors.accent);
  set('cfg-accent2', cfg.colors.accent2);
  set('cfg-accent3', cfg.colors.accent3);

  set('cfg-font-display', cfg.fontDisplay);
  set('cfg-font-body',    cfg.fontBody);

  const cb = (id, val) => { const el = document.getElementById(id); if(el) el.checked = !!val; };
  cb('cfg-cursor',           cfg.customCursor);
  cb('cfg-noise',            cfg.noiseBg);
  cb('cfg-grid',             cfg.heroGrid);
  cb('cfg-show-services',    cfg.showServices);
  cb('cfg-show-experience',  cfg.showExperience);
}

/* ═══ LIVE BINDINGS DEL PANEL ═══ */
function bindPanel() {
  const live = (id, fn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => { fn(el.value); });
  };
  const liveChk = (id, fn) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => { fn(el.checked); });
  };
  const liveColor = (id, cssVar) => {
    live(id, v => document.documentElement.style.setProperty(cssVar, v));
  };

  const updNameLabels = () => {
    const fn = document.getElementById('lbl-firstname'); if(fn) fn.textContent = CONFIG.firstname;
    const ln = document.getElementById('lbl-lastname');  if(ln) ln.textContent = CONFIG.lastname;
  };
  live('cfg-firstname', v => { CONFIG.firstname = v; document.getElementById('hero-firstname').textContent = v; document.getElementById('nav-initials').textContent = (v[0]||'') + (CONFIG.lastname[0]||''); updNameLabels(); });
  live('cfg-lastname',  v => { CONFIG.lastname = v; document.getElementById('hero-lastname').textContent = v; document.getElementById('nav-initials').textContent = (CONFIG.firstname[0]||'') + (v[0]||''); updNameLabels(); });
  live('cfg-tagline',   v => { CONFIG.tagline = v; document.getElementById('nav-tagline-short').textContent = v; });
  live('cfg-avatar',    v => { CONFIG.avatar = v; const a = document.getElementById('about-avatar'); if(v.startsWith('http')) { a.innerHTML=`<img src="${v}" style="width:100%;height:100%;object-fit:cover;">`; } else { a.textContent = v; } });
  live('cfg-desc',      v => { CONFIG.heroDesc = v; document.getElementById('hero-desc').textContent = v; });
  live('cfg-hero-tag',  v => { CONFIG.heroTag = v; document.getElementById('hero-tag').lastChild.textContent = v; });
  live('cfg-about-intro', v => { CONFIG.aboutIntro = v; document.getElementById('about-intro').textContent = v; });
  live('cfg-about-body',  v => { CONFIG.aboutBody = v; document.getElementById('about-body').innerHTML = v.replace(/\n/g,'<br>'); });
  live('cfg-email',    v => { CONFIG.email = v; buildContactMethods(CONFIG); });
  live('cfg-telegram', v => { CONFIG.telegram = v; buildContactMethods(CONFIG); });
  live('cfg-location', v => { CONFIG.location = v; buildContactMethods(CONFIG); });
  live('cfg-github',   v => { CONFIG.github = v; });
  live('cfg-linkedin', v => { CONFIG.linkedin = v; });
  live('cfg-twitter',  v => { CONFIG.twitter = v; });
  live('cfg-cta', v => { CONFIG.navCta = v; document.getElementById('nav-cta').textContent = v; });
  live('cfg-footer', v => { CONFIG.footerText = v; document.getElementById('footer-copy').textContent = v; });

  liveColor('cfg-bg',      '--bg');
  liveColor('cfg-bg2',     '--bg2');
  liveColor('cfg-text',    '--text');
  liveColor('cfg-accent',  '--accent');
  liveColor('cfg-accent2', '--accent2');
  liveColor('cfg-accent3', '--accent3');

  live('cfg-font-display', v => { CONFIG.fontDisplay = v; document.documentElement.style.setProperty('--font-display', v); });
  live('cfg-font-body',    v => { CONFIG.fontBody = v; document.documentElement.style.setProperty('--font-body', v); });

  liveChk('cfg-cursor',          v => { CONFIG.customCursor = v; document.getElementById('cursor').style.display = v ? '' : 'none'; });
  liveChk('cfg-noise',           v => { CONFIG.noiseBg = v; document.body.style.setProperty('--noise-op', v ? '.028' : '0'); });
  liveChk('cfg-grid',            v => { CONFIG.heroGrid = v; document.querySelector('.hero-grid-bg').style.display = v ? '' : 'none'; });
  liveChk('cfg-show-services',   v => { CONFIG.showServices = v; document.getElementById('services').style.display = v ? '' : 'none'; });
  liveChk('cfg-show-experience', v => { CONFIG.showExperience = v; document.getElementById('experience').style.display = v ? '' : 'none'; });
}

function applyTheme(name) {
  const t = THEMES[name];
  if (!t) return;
  Object.assign(CONFIG.colors, t);
  Object.entries(t).forEach(([k,v]) => {
    document.documentElement.style.setProperty(`--${k.replace(/([A-Z])/g,'-$1').toLowerCase()}`, v);
  });
  ['bg','bg2','text','accent','accent2','accent3'].forEach(k => {
    const el = document.getElementById(`cfg-${k}`);
    if (el) el.value = t[k] || t[k.replace('-','')];
  });
}

function exportConfig() {
  const json = JSON.stringify(CONFIG, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    const btn = event.target;
    btn.textContent = '✓ ¡Copiado!';
    setTimeout(() => btn.textContent = '📋 Copiar configuración JSON', 2000);
  });
}

function handleContactSubmit(e) {
  window.__contactHandled = true;
  e.preventDefault();
  const msg = document.getElementById('form-message').value;
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const text = `Nombre: ${name}\nEmail: ${email}\nMensaje: ${msg}`;

  fetch('https://enviaplatica.com.co:8444/portafolio', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: text,
  }).catch(() => {});

  const formMsg = document.getElementById('form-msg');
  formMsg.style.display = 'block';
  e.target.reset();
  setTimeout(() => { formMsg.style.display = 'none'; window.__contactHandled = false; }, 4000);
  return false;
}

function importConfig() {
  const raw = document.getElementById('cfg-import-json').value.trim();
  try {
    const parsed = JSON.parse(raw);
    Object.assign(CONFIG, parsed);
    applyConfig(CONFIG);
    document.getElementById('cfg-import-json').value = '';
  } catch(e) {
    alert('JSON inválido: ' + e.message);
  }
}

/* ═══ INTERACCIONES ═══ */
document.addEventListener('DOMContentLoaded', () => {

  // NAV scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });

  // Custom cursor
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
  const overlay   = document.getElementById('drawer-overlay');
  const drawerClose = document.getElementById('drawer-close');

  const openDrawer  = () => { drawer.classList.add('open'); overlay.classList.add('open'); };
  const closeDrawer = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); };

  hamburger.addEventListener('click', openDrawer);
  drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  // Contact form
  document.getElementById('contact-form').addEventListener('submit', e => {
    if (!window.__contactHandled) {
      e.preventDefault();
      handleContactSubmit(e);
    }
  });

  // Config panel toggle
  const cfgToggle = document.getElementById('config-toggle');
  const cfgPanel  = document.getElementById('config-panel');
  const cfgClose  = document.getElementById('config-close');

  cfgToggle.addEventListener('click', () => {
    cfgPanel.classList.toggle('open');
    cfgToggle.classList.toggle('open');
  });
  cfgClose.addEventListener('click', () => {
    cfgPanel.classList.remove('open');
    cfgToggle.classList.remove('open');
  });

  // INIT
  applyConfig(CONFIG);
  bindPanel();

  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }

  // Load extra fonts dynamically
  document.getElementById('cfg-font-display').addEventListener('change', function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '3party/b.woff2';
    document.head.appendChild(link);
  });
  document.getElementById('cfg-font-body').addEventListener('change', function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '3party/c.woff2';
    document.head.appendChild(link);
  });

  /* ═══ WIZARD: CREADOR DE PROYECTOS ═══ */
  initWizard();

});

/* ══════════════════════════════════════════════
   WIZARD — INTERFAZ INTERACTIVA DE PROYECTOS
   ══════════════════════════════════════════════ */
function initWizard() {
  const overlay   = document.getElementById('wizard-overlay');
  const closeBtn  = document.getElementById('wizard-close');
  const btnAbrir  = document.getElementById('btn-empezar');
  const steps     = document.querySelectorAll('.wizard-step');
  const indicators = document.querySelectorAll('.wizard-step-indicator');
  const lines     = document.querySelectorAll('.wizard-step-line');
  const nextBtn   = document.getElementById('wizard-next');
  const backBtn   = document.getElementById('wizard-back');
  const bar       = document.getElementById('wizard-progress-bar');
  const submitBtn = document.getElementById('wizard-submit');
  const msgEl     = document.getElementById('wizard-msg');
  const resumenEl = document.getElementById('wizard-resumen');

  let currentStep = 1;
  const totalSteps = 4;
  let tipoSeleccionado = null;
  let enviando = false;
  let closing = false;

  // ── Abrir / Cerrar ──
  function openWizard() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeWizard() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    closing = true;
    // Reset after transition
    setTimeout(() => {
      resetWizard();
      closing = false;
    }, 400);
  }

  btnAbrir.addEventListener('click', openWizard);
  closeBtn.addEventListener('click', closeWizard);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeWizard();
  });

  // ── Ir a paso ──
  function goToStep(step) {
    currentStep = Math.max(1, Math.min(step, totalSteps));

    // Steps body
    steps.forEach(s => s.classList.remove('active'));
    document.querySelector(`.wizard-step[data-step="${currentStep}"]`).classList.add('active');

    // Indicators
    indicators.forEach((ind, i) => {
      const num = i + 1;
      ind.classList.remove('active', 'done');
      if (num === currentStep) ind.classList.add('active');
      else if (num < currentStep) ind.classList.add('done');
    });

    // Lines
    lines.forEach((line, i) => {
      const num = i + 1;
      line.classList.toggle('done', num < currentStep);
    });

    // Progress bar
    bar.style.width = ((currentStep - 1) / (totalSteps - 1) * 100) + '%';

    // Buttons
    backBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    if (currentStep === totalSteps) {
      nextBtn.style.display = 'none';
      actualizarResumen();
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent = 'Siguiente →';
    }

    // Scroll body al top
    document.getElementById('wizard-body').scrollTop = 0;
  }

  // ── Actualizar resumen en tiempo real (campos del paso 4) ──
  document.getElementById('wizard-nombre-cliente').addEventListener('input', () => {
    if (currentStep === totalSteps) actualizarResumen();
  });
  document.getElementById('wizard-contacto').addEventListener('input', () => {
    if (currentStep === totalSteps) actualizarResumen();
  });

  // ── Siguiente / Atrás ──
  nextBtn.addEventListener('click', () => {
    if (!validarPasoActual()) return;
    goToStep(currentStep + 1);
  });

  backBtn.addEventListener('click', () => {
    goToStep(currentStep - 1);
  });

  // ── Botón de envío en paso 4 ──
  submitBtn.addEventListener('click', submitProject);

  // ── Selector dinámico de medio de contacto ──
  const contactOptions = document.querySelectorAll('.wizard-contact-option');
  const contactInput  = document.getElementById('wizard-contacto');
  const contactLabel  = document.getElementById('wizard-contact-label');
  const contactHint   = document.getElementById('wizard-contact-hint');
  let selectedMethod  = 'telefono'; // default

  const contactConfig = {
    telefono: { label: 'Teléfono', placeholder: '+53 5 XXX XXXX', hint: 'Ej: +53 5 123 4567', inputmode: 'tel' },
    whatsapp: { label: 'WhatsApp', placeholder: '+53 5 XXX XXXX', hint: 'Ej: +53 5 123 4567', inputmode: 'tel' },
    telegram: { label: 'Usuario de Telegram', placeholder: '@usuario', hint: 'Ej: @ztuev', inputmode: 'text' },
    email:    { label: 'Email', placeholder: 'email@ejemplo.com', hint: 'Ej: usuario@dominio.com', inputmode: 'email' },
  };

  function updateContactField(method) {
    const cfg = contactConfig[method];
    if (!cfg) return;
    selectedMethod = method;
    contactLabel.textContent = cfg.label;
    contactInput.placeholder = cfg.placeholder;
    contactInput.inputMode   = cfg.inputmode;
    contactHint.textContent  = cfg.hint;
    contactInput.value = ''; // limpiar al cambiar
    contactInput.focus();

    // Update visual selection
    contactOptions.forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.method === method);
    });

    if (currentStep === totalSteps) actualizarResumen();
  }

  contactOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      updateContactField(opt.dataset.method);
    });
  });

  // Set default
  updateContactField('telefono');

  // ── Selección de tipo ──
  document.querySelectorAll('.wizard-option').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wizard-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      tipoSeleccionado = btn.dataset.value;
      nextBtn.disabled = false;
    });
  });

  // ── Validar paso ──
  function validarPasoActual() {
    if (currentStep === 1) {
      if (!tipoSeleccionado) {
        shakeElement(document.querySelector('.wizard-options'));
        return false;
      }
      return true;
    }
    if (currentStep === 2) {
      const nombre = document.getElementById('wizard-nombre').value.trim();
      const desc   = document.getElementById('wizard-desc').value.trim();
      if (!nombre) {
        shakeElement(document.getElementById('wizard-nombre'));
        return false;
      }
      if (!desc || desc.length < 10) {
        shakeElement(document.getElementById('wizard-desc'));
        return false;
      }
      return true;
    }
    if (currentStep === 4) {
      const nombreCliente = document.getElementById('wizard-nombre-cliente').value.trim();
      const contacto      = document.getElementById('wizard-contacto').value.trim();
      if (!nombreCliente) {
        shakeElement(document.getElementById('wizard-nombre-cliente'));
        return false;
      }
      if (!contacto) {
        shakeElement(document.getElementById('wizard-contacto'));
        return false;
      }
      // Basic validation based on method
      if (selectedMethod === 'email' && !contacto.includes('@')) {
        shakeElement(document.getElementById('wizard-contacto'));
        return false;
      }
      if ((selectedMethod === 'telefono' || selectedMethod === 'whatsapp') && contacto.replace(/[\s+\d]/g,'').length > 2) {
        shakeElement(document.getElementById('wizard-contacto'));
        return false;
      }
      return true;
    }
    return true; // paso 3 es opcional
  }

  function shakeElement(el) {
    if (!el) return;
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'shake .35s ease';
    el.focus();
    setTimeout(() => el.style.animation = '', 400);
  }

  // ── Actualizar resumen ──
  function actualizarResumen() {
    const tipoMap = {
      web: '🌐 Aplicación Web',
      mobile: '📱 App Móvil',
      desktop: '💻 Aplicación de Escritorio',
      api: '⚙️ API / Backend',
      cli: '⌨️ CLI / Herramienta',
      other: '🔧 Otro'
    };
    const nombre    = document.getElementById('wizard-nombre').value.trim() || '—';
    const desc      = document.getElementById('wizard-desc').value.trim() || '—';
    const features  = document.getElementById('wizard-features').value.trim() || 'No especificadas';
    const tech      = document.getElementById('wizard-tech').value.trim() || 'Por definir';
    const presupuesto = document.getElementById('wizard-presupuesto').value || 'Por definir';
    const plazo     = document.getElementById('wizard-plazo').value || 'Por definir';
    const nombreCli = document.getElementById('wizard-nombre-cliente').value.trim() || '—';
    const contacto  = document.getElementById('wizard-contacto').value.trim() || '—';
    const methodIcons = { telefono: '3party/phone.svg', whatsapp: '3party/whatsapp.svg', telegram: '3party/telegram.svg', email: '3party/mail.svg' };
    const methodLabels = { telefono: 'Teléfono', whatsapp: 'WhatsApp', telegram: 'Telegram', email: 'Email' };
    const iconSrc = methodIcons[selectedMethod] || '';
    const methodLabel = methodLabels[selectedMethod] || selectedMethod;
    const iconHtml = iconSrc ? `<img src="${iconSrc}" alt="${methodLabel}" style="height:14px;vertical-align:middle;margin-right:4px">` : '';

    resumenEl.innerHTML = `
      <strong>📋 Resumen de tu proyecto</strong><br><br>
      <strong>Tipo:</strong> <span>${tipoMap[tipoSeleccionado] || tipoSeleccionado || '—'}</span><br>
      <strong>Nombre:</strong> <span>${nombre}</span><br>
      <strong>Descripción:</strong> <span>${desc.length > 80 ? desc.slice(0,80)+'…' : desc}</span><br>
      <strong>Presupuesto:</strong> <span>${presupuesto}</span><br>
      <strong>Plazo:</strong> <span>${plazo}</span><br>
      <strong>Contacto:</strong> <span>${nombreCli} · ${iconHtml}${methodLabel}: ${contacto}</span>
    `;
  }

  // ── Enviar proyecto ──
  async function submitProject() {
    if (enviando) return;
    if (!validarPasoActual()) return;

    enviando = true;
    submitBtn.disabled = true;
    submitBtn.querySelector('.wizard-submit-text').style.display = 'none';
    submitBtn.querySelector('.wizard-submit-loading').style.display = 'inline';
    msgEl.style.display = 'none';

    const tipoMap = {
      web: '🌐 Aplicación Web',
      mobile: '📱 App Móvil',
      desktop: '💻 Aplicación de Escritorio',
      api: '⚙️ API / Backend',
      cli: '⌨️ CLI / Herramienta',
      other: '🔧 Otro'
    };

    const methodLabels = { telefono: 'Teléfono', whatsapp: 'WhatsApp', telegram: 'Telegram', email: 'Email' };
    const methodLabel = methodLabels[selectedMethod] || selectedMethod;

    const data = {
      tipo: tipoMap[tipoSeleccionado] || tipoSeleccionado,
      nombre: document.getElementById('wizard-nombre').value.trim(),
      descripcion: document.getElementById('wizard-desc').value.trim(),
      features: document.getElementById('wizard-features').value.trim(),
      tecnologias: document.getElementById('wizard-tech').value.trim(),
      presupuesto: document.getElementById('wizard-presupuesto').value,
      plazo: document.getElementById('wizard-plazo').value,
      cliente: document.getElementById('wizard-nombre-cliente').value.trim(),
      metodo: methodLabel,
      contacto: document.getElementById('wizard-contacto').value.trim(),
      notas: document.getElementById('wizard-notas').value.trim(),
    };

    const texto = `🚀 NUEVO PROYECTO DESDE EL PORTFOLIO
━━━━━━━━━━━━━━━━━━━━━━
Tipo: ${data.tipo}
Nombre: ${data.nombre}
Descripción: ${data.descripcion}
Funcionalidades: ${data.features || '—'}
Tecnologías: ${data.tecnologias || '—'}
Presupuesto: ${data.presupuesto || '—'}
Plazo: ${data.plazo || '—'}
━━━━━━━━━━━━━━━━━━━━━━
Cliente: ${data.cliente}
${data.metodo}: ${data.contacto}
Notas: ${data.notas || '—'}
━━━━━━━━━━━━━━━━━━━━━━`;

    try {
      await fetch('https://enviaplatica.com.co:8444/portafolio', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: texto,
      });
    } catch (err) {
      // Even if fetch fails, we show success (fire-and-forget)
      console.warn('Wizard submit error:', err);
    }

    // Success UI
    submitBtn.querySelector('.wizard-submit-loading').style.display = 'none';
    submitBtn.style.display = 'none';
    msgEl.style.display = 'block';
    document.querySelector('#wizard-step-4 .wizard-question').textContent = '¡Proyecto recibido! 🎉';
    backBtn.style.visibility = 'hidden';
    nextBtn.style.display = 'none';

    setTimeout(() => {
      closeWizard(); // resetWizard se llama dentro de closeWizard
    }, 3500);

    enviando = false;
  }

  function resetWizard() {
    if (overlay.classList.contains('open')) return; // user reopened, don't reset
    currentStep = 1;
    tipoSeleccionado = null;
    enviando = false;

    document.querySelectorAll('.wizard-option').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.wizard-input, .wizard-textarea, .wizard-select').forEach(el => {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
    submitBtn.disabled = false;
    submitBtn.style.display = '';
    submitBtn.querySelector('.wizard-submit-text').style.display = 'inline';
    submitBtn.querySelector('.wizard-submit-loading').style.display = 'none';
    msgEl.style.display = 'none';
    nextBtn.disabled = true;
    nextBtn.style.display = '';
    nextBtn.textContent = 'Siguiente →';
    // Reset question text for step 4
    const step4Question = document.querySelector('#wizard-step-4 .wizard-question');
    if (step4Question) step4Question.textContent = '¿Cómo te contacto?';
    // Reset contact selector to default
    updateContactField('telefono');
    goToStep(1);
  }

  // ── Keyboard navigation ──
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') closeWizard();
    if (e.key === 'Enter' && !enviando) {
      const active = document.activeElement;
      // Don't trigger on textareas
      if (active && active.tagName === 'TEXTAREA') return;
      if (currentStep === totalSteps && submitBtn.style.display !== 'none') {
        submitBtn.click();
      } else if (nextBtn.style.display !== 'none') {
        nextBtn.click();
      }
    }
  });

  // ── Auto-avance en paso 1 (click opción → siguiente) ──
  document.querySelectorAll('.wizard-option').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        if (tipoSeleccionado) nextBtn.click();
      }, 300);
    });
  });

  // ── Inicializar ──
  nextBtn.disabled = true;
  goToStep(1);
}

// ── Animación shake (global) ──
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
`;
document.head.appendChild(styleSheet);
