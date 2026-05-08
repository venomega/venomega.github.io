const els = {};
document.querySelectorAll('[id]').forEach(el => els[el.id] = el);

function getOrientation() {
  const orient = screen.orientation || screen.mozOrientation || screen.msOrientation;
  if (orient && orient.type) {
    return orient.type.split('-')[0];
  }
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
}

const prev = {};
function setValue(id, raw, unit = '') {
  const el = els[id];
  if (!el) return;
  const text = raw != null ? String(raw) : '—';
  if (el.textContent === text) return;
  el.textContent = text;

  if (prev[id] !== undefined && prev[id] !== text) {
    el.classList.remove('changed');
    void el.offsetWidth;
    el.classList.add('changed');
  }
  prev[id] = text;
}

function update() {
  setValue('innerWidth', window.innerWidth);
  setValue('innerHeight', window.innerHeight);
  setValue('dpr', window.devicePixelRatio.toFixed(2));
  setValue('screenWidth', screen.width);
  setValue('screenHeight', screen.height);
  setValue('colorDepth', screen.colorDepth);
  setValue('orientation', getOrientation());
  setValue('availScreen', `${screen.availWidth} × ${screen.availHeight}`);
  setValue('outerWidth', window.outerWidth);
  setValue('outerHeight', window.outerHeight);
  setValue('webgl', hasWebGL());
  setValue('webgpu', hasWebGPU());
  setValue('userAgent', navigator.userAgent);
  setValue('vw', window.innerWidth);
  setValue('vh', window.innerHeight);
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
}

function hasWebGPU() {
  return !!(navigator.gpu);
}

let raf = null;
function scheduleUpdate() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = null;
    update();
  });
}

window.addEventListener('resize', scheduleUpdate);
window.addEventListener('orientationchange', () => setTimeout(update, 300));

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  if (els['cursor-coords']) {
    els['cursor-coords'].textContent = `${x}px, ${y}px`;
  }
});

update();
