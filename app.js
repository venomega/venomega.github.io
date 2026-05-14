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

  live('cfg-firstname', v => { CONFIG.firstname = v; document.getElementById('hero-firstname').textContent = v; document.getElementById('nav-initials').textContent = (v[0]||'') + (CONFIG.lastname[0]||''); });
  live('cfg-lastname',  v => { CONFIG.lastname = v; document.getElementById('hero-lastname').textContent = v; document.getElementById('nav-initials').textContent = (CONFIG.firstname[0]||'') + (v[0]||''); });
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

});
