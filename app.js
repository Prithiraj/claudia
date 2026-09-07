const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const saveData = navigator.connection?.saveData === true;

// Header + mobile navigation
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 20);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('is-open', open);
});

nav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    nav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.focus();
  }
});

// Reveal content progressively. Without JS, content remains visible by default.
const revealItems = [...document.querySelectorAll('.reveal')];
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Privacy/performance-friendly map: load third-party map only after a click.
const mapCard = document.querySelector('[data-map-card]');
document.querySelector('[data-load-map]')?.addEventListener('click', (event) => {
  event.currentTarget.disabled = true;
  event.currentTarget.textContent = 'Karte wird geladen …';
  const iframe = document.createElement('iframe');
  iframe.title = 'Karte: Hauptstraße 9, 13055 Berlin';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=13.4968%2C52.5448%2C13.5111%2C52.5518&layer=mapnik&marker=52.5482847%2C13.5039554';
  mapCard?.appendChild(iframe);
  mapCard?.querySelector('.map-overlay')?.remove();
});

// Accessible gallery lightbox.
const galleryFigures = [...document.querySelectorAll('[data-gallery] figure')];
const lightbox = document.querySelector('[data-lightbox]');
const lightboxImage = document.querySelector('[data-lightbox-image]');
const lightboxCaption = document.querySelector('[data-lightbox-caption]');
let lightboxIndex = 0;
let lightboxReturnFocus = null;

function renderLightbox(index) {
  const figure = galleryFigures[index];
  if (!figure || !lightboxImage || !lightboxCaption) return;
  const image = figure.querySelector('img');
  const caption = figure.querySelector('figcaption');
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption?.textContent || '';
  lightboxIndex = index;
}

function openLightbox(index, trigger) {
  if (!lightbox?.showModal) return;
  lightboxReturnFocus = trigger;
  renderLightbox(index);
  lightbox.showModal();
  document.querySelector('[data-lightbox-close]')?.focus();
}

galleryFigures.forEach((figure, index) => {
  figure.querySelector('[data-gallery-open]')?.addEventListener('click', (event) => openLightbox(index, event.currentTarget));
});

document.querySelector('[data-lightbox-close]')?.addEventListener('click', () => lightbox?.close());
document.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => renderLightbox((lightboxIndex - 1 + galleryFigures.length) % galleryFigures.length));
document.querySelector('[data-lightbox-next]')?.addEventListener('click', () => renderLightbox((lightboxIndex + 1) % galleryFigures.length));
lightbox?.addEventListener('close', () => lightboxReturnFocus?.focus());
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') renderLightbox((lightboxIndex - 1 + galleryFigures.length) % galleryFigures.length);
  if (event.key === 'ArrowRight') renderLightbox((lightboxIndex + 1) % galleryFigures.length);
});

// Restrained Three.js enhancement: a sparse, slow-moving pollen field behind the hero.
// It loads after idle time, never replaces the real hero photo, and is skipped for reduced-motion/save-data users.
async function initAmbientThree() {
  if (reducedMotion || saveData || window.innerWidth < 900 || !window.WebGLRenderingContext) return;
  const canvas = document.querySelector('#hero-canvas');
  if (!canvas) return;

  try {
    const THREE = await import('https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const count = 52;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      const p = i * 3;
      positions[p] = Math.random() * 2.2 - 1.1;
      positions[p + 1] = Math.random() * 2.2 - 1.1;
      positions[p + 2] = 0;
      scales[i] = 2 + Math.random() * 4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 }, uPointRatio: { value: renderer.getPixelRatio() } },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        uniform float uPointRatio;
        varying float vFade;
        void main() {
          vec3 p = position;
          p.y += sin((p.x * 4.0) + uTime * 0.17) * 0.018;
          p.x += cos((p.y * 3.0) + uTime * 0.11) * 0.012;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aScale * uPointRatio;
          vFade = 0.18 + (aScale / 6.0) * 0.18;
        }
      `,
      fragmentShader: `
        varying float vFade;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.05, d) * vFade;
          gl_FragColor = vec4(0.46, 0.51, 0.42, alpha);
        }
      `
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      const host = canvas.parentElement;
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      const aspect = width / height;
      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    }

    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();
    function tick() {
      if (running) return;
      running = true;
      const frame = () => {
        if (!running) return;
        material.uniforms.uTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        raf = requestAnimationFrame(frame);
      };
      frame();
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    tick();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else tick();
    });
  } catch (error) {
    console.info('Ambient WebGL enhancement unavailable; static design remains active.', error);
  }
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(initAmbientThree, { timeout: 2000 });
} else {
  window.setTimeout(initAmbientThree, 900);
}

const yearNode = document.querySelector('[data-year]');
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
