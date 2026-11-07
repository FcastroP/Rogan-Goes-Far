const MERCADOLIBRE_URL = "https://articulo.mercadolibre.com.co/MCO-4328342496-termo-con-iman-y-soporte-para-celular-rogan-goes-far-32oz-_JM";

// Todos los CTA llevan a la publicación de MercadoLibre.
document.querySelectorAll("[data-buy]").forEach(link => {
  link.href = MERCADOLIBRE_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

// Menú móvil accesible.
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuToggle && nav) if (menuToggle && nav) menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
if (nav) if (nav) nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Aparición progresiva de secciones al entrar en pantalla.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Selector de colección con las cuatro fotografías reales enviadas.
const productVariants = [
  {name:"Negro Mate", image:"assets/termo-negro-mate.jpg", alt:"Termo ROGAN Negro Mate", index:"01 / 04"},
  {name:"Rosa Pastel", image:"assets/termo-rosa-pastel.jpg", alt:"Termo ROGAN Rosa Pastel", index:"02 / 04"},
  {name:"Verde Bosque", image:"assets/termo-verde-bosque.jpg", alt:"Termo ROGAN Verde Bosque", index:"03 / 04"},
  {name:"Beige Arena", image:"assets/termo-beige-arena.jpg", alt:"Termo ROGAN Beige Arena", index:"04 / 04"}
];
const largeProduct = document.getElementById("product-large");
if (largeProduct) {
  document.querySelectorAll(".product-choice, .color-select, .variant-dots button").forEach(button => {
    button.addEventListener("click", () => {
      const variant = productVariants[Number(button.dataset.product)];
      document.querySelectorAll(".product-choice, .variant-dots button").forEach(b => {
        const active = b === button;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      largeProduct.animate([{opacity:.2, transform:"translateY(8px) scale(.985)"},{opacity:1,transform:"translateY(0) scale(1)"}],{duration:420,easing:"cubic-bezier(.2,.7,.2,1)"});
      largeProduct.src = variant.image;
      largeProduct.alt = variant.alt;
      document.getElementById("product-title").textContent = variant.name;
      document.getElementById("product-index").textContent = variant.index;
      document.querySelectorAll(".variant-dots button").forEach((dot, i) => dot.classList.toggle("active", i === Number(button.dataset.product)));
      document.querySelectorAll(".variant-dots button").forEach((dot, i) => dot.classList.toggle("active", i === Number(button.dataset.product)));
    });
  });
}

// Selector de color: cambia el contenido y el acento visual.
// Se mantiene la foto auténtica suministrada; no se simulan fotos de variantes no recibidas.
const colors = [
  {name:"Beige Arena",tag:"THE CLASSIC",desc:"Elegancia natural. Minimalismo y sofisticación para acompañar cada momento.",hex:"#d8c7aa",bg:"#e7e0d5",filter:"none"},
  {name:"Negro Mate",tag:"THE ICON",desc:"Carácter, fuerza y elegancia atemporal. Un tono que nunca necesita llamar la atención.",hex:"#202020",bg:"#d9d7d1",filter:"grayscale(.35)"},
  {name:"Rosa Pastel",tag:"THE SOFT",desc:"Personalidad, delicadeza y estilo para darle un toque diferente a tu día.",hex:"#e8c6ce",bg:"#eee0df",filter:"saturate(.85)"},
  {name:"Verde Bosque",tag:"THE ACTIVE",desc:"Espíritu aventurero y esencia deportiva para acompañarte en movimiento.",hex:"#294b3b",bg:"#dce1d8",filter:"saturate(.8)"}
];
const colorName = document.getElementById("color-name");
const colorDescription = document.getElementById("color-description");
const colorTag = document.getElementById("color-tag");
const colorDot = document.getElementById("color-dot");
const colorStage = document.querySelector(".color-stage");
const colorImage = document.getElementById("color-product");
document.querySelectorAll(".swatch").forEach(button => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.color);
    const c = colors[index];
    document.querySelectorAll(".swatch").forEach(b => {
      const active = b === button;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    colorName.textContent = c.name;
    colorDescription.textContent = c.desc;
    colorTag.textContent = c.tag;
    colorDot.style.background = c.hex;
    colorStage.style.background = c.bg;
    colorImage.style.filter = c.filter;
    colorImage.animate([{opacity:.45,transform:"scale(.98)"},{opacity:1,transform:"scale(1)"}],{duration:380,easing:"ease-out"});
  });
});

// Tabs de características.
const featureCopy = {
  support:"Ajusta tu teléfono en el soporte integrado en la tapa para grabar o consumir contenido con mayor comodidad.",
  thermal:"El aislamiento al vacío ayuda a conservar bebidas frías hasta 24 horas y bebidas calientes hasta 12 horas.",
  build:"Cuerpo interior y exterior de acero inoxidable, con acabado en polvo resistente a arañazos."
};
document.querySelectorAll(".feature-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".feature-tab").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected","false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected","true");
    document.getElementById("feature-panel").textContent = featureCopy[button.dataset.feature];
  });
});

// Contadores animados al entrar en pantalla.
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 950;
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1-progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll(".count").forEach(el => countObserver.observe(el));

// Botón de compra flotante aparece después del hero.
const floatingBuy = document.querySelector(".floating-buy");
const hero = document.querySelector(".hero");
const buyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => floatingBuy.classList.toggle("visible", !entry.isIntersecting));
},{threshold:.08});
buyObserver.observe(hero);

// Header con sombra sutil al desplazarse.
window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 12);
},{passive:true});

// Acordeones: mantener una sola respuesta abierta en cada grupo.
document.querySelectorAll(".faq-list").forEach(group => {
  group.querySelectorAll("details").forEach(detail => detail.addEventListener("toggle", () => {
    if (detail.open) group.querySelectorAll("details").forEach(other => { if(other !== detail) other.open = false; });
  }));
});


// Indicador superior de progreso para dar contexto al recorrido.
const progressBar = document.createElement("div");
progressBar.className = "reading-progress";
progressBar.setAttribute("aria-hidden", "true");
document.body.appendChild(progressBar);
let progressTick = false;
window.addEventListener("scroll", () => {
  if (progressTick) return;
  progressTick = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.transform = `scaleX(${percent / 100})`;
    progressTick = false;
  });
}, {passive:true});

// Entrada escalonada de elementos relacionados para evitar bloques estáticos.
document.querySelectorAll(".thermal-card, .trust-item, .lifestyle-strip figure").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 85}ms`;
});

// Interacciones adicionales: navegación activa, microrespuesta táctil y foco visual.
const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const trackedSections = sectionLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && trackedSections.length) {
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => link.classList.toggle('current', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, {rootMargin:'-28% 0px -62% 0px'});
  trackedSections.forEach(section => activeObserver.observe(section));
}

// Efecto de inclinación muy sutil en escritorio; se desactiva en táctiles.
if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.thermal-card, .trust-item').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(700px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}

// Los videos respetan ahorro de datos y movimiento reducido.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion || navigator.connection?.saveData) {
  document.querySelectorAll('video[autoplay]').forEach(video => { video.pause(); video.removeAttribute('autoplay'); });
}
