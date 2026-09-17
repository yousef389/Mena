"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  createHearts();
  createParticles();

  setupOpening();
  setupNavigation();
  setupGallery();
  setupCake();
  setupEnvelope();
  setupGift();
  setupMusic();
  setupTilt();

  preloadImages();
}

/* =========================================
   Global helpers
========================================= */

const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

/* =========================================
   Background Hearts
========================================= */

function createHearts() {
  const container = $("#hearts");

  if (!container) return;

  const heartSymbols = ["♥", "♡", "❤"];

  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 8}s`;

    heart.style.setProperty(
      "--drift",
      `${-80 + Math.random() * 160}px`
    );

    container.appendChild(heart);
  }
}

/* =========================================
   Particles
========================================= */

function createParticles() {
  const container = $("#particles");

  if (!container) return;

  for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${4 + Math.random() * 6}s`;
    particle.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(particle);
  }
}

/* =========================================
   Opening
========================================= */

function setupOpening() {
  const openButton = $("#openButton");

  if (!openButton) return;

  openButton.addEventListener("click", () => {
    createConfetti(45);

    showScene("message");

    startTypingAnimation();

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 50);
  });
}

/* =========================================
   Navigation
========================================= */

function setupNavigation() {
  $$("[data-next]").forEach(button => {
    button.addEventListener("click", () => {
      const nextScene = button.dataset.next;

      if (!nextScene) return;

      showScene(nextScene);
    });
  });
}

function showScene(id) {
  const scenes = $$(".scene");

  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (!target) return;

  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================
   Birthday Typing
========================================= */

let typingStarted = false;

function startTypingAnimation() {
  if (typingStarted) return;

  typingStarted = true;

  const element = $("#birthdayText");

  if (!element) return;

  const text =
    "العمر كله ليكي إن شاء الله، وأشوفك أحلى واحدة في الدنيا كلها. ربنا يخليكي وتحققي كل اللي نفسك فيه، وكل سنة وانتي طيبة يا منوشة ❤️";

  let index = 0;

  function type() {
    if (index >= text.length) return;

    element.textContent += text[index];
    index++;

    const delay =
      text[index - 1] === "،" ||
      text[index - 1] === "." ?
      180 :
      35;

    window.setTimeout(type, delay);
  }

  type();
}

/* =========================================
   Gallery / Lightbox
========================================= */

function setupGallery() {
  const lightbox = $("#lightbox");
  const image = $("#lightboxImage");
  const caption = $("#lightboxCaption");
  const closeButton = $("#closeLightbox");

  if (!lightbox || !image || !caption || !closeButton) return;

  $$(".photo-button").forEach(button => {
    button.addEventListener("click", () => {
      const imagePath = button.dataset.image;
      const imageCaption = button.dataset.caption || "";

      if (!imagePath) return;

      image.src = imagePath;
      image.alt = imageCaption;
      caption.textContent = imageCaption;

      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");

      document.body.classList.add("lightbox-open");
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");

    window.setTimeout(() => {
      image.src = "";
    }, 300);
  }

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
}

/* =========================================
   3D Tilt
========================================= */

function setupTilt() {
  const cards = $$(".photo-button");

  if (!cards.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const touchDevice =
    window.matchMedia("(hover: none)").matches;

  if (reducedMotion || touchDevice) return;

  cards.forEach(card => {

    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) / rect.width;

      const y =
        (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 14;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

/* =========================================
   Cake
========================================= */

let cakeFinished = false;

function setupCake() {
  const button = $("#blowButton");
  const cakeArea = $(".cake-area");
  const message = $("#wishMessage");
  const nextButton = $("#cakeNext");

  if (!button || !cakeArea || !message || !nextButton) return;

  button.addEventListener("click", () => {
    if (cakeFinished) return;

    cakeFinished = true;

    cakeArea.classList.add("blown");

    button.textContent = "✨ تمت الأمنية ✨";
    button.disabled = true;

    message.classList.add("show");

    createConfetti(65);
    createHeartBurst(25);

    window.setTimeout(() => {
      nextButton.classList.remove("hidden");
    }, 900);
  });
}

/* =========================================
   Envelope
========================================= */

function setupEnvelope() {
  const envelope = $("#envelope");
  const hint = $("#envelopeHint");
  const nextButton = $("#letterNext");

  if (!envelope || !hint || !nextButton) return;

  envelope.addEventListener("click", () => {
    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");
    hint.textContent = "رسالة مخصوص ليكي ❤️";

    createHeartBurst(18);

    window.setTimeout(() => {
      nextButton.classList.remove("hidden");
    }, 1000);
  });
}

/* =========================================
   Gift
========================================= */

function setupGift() {
  const gift = $("#giftButton");
  const hint = $("#giftHint");
  const finalMessage = $("#finalMessage");

  if (!gift || !hint || !finalMessage) return;

  gift.addEventListener("click", () => {
    if (gift.classList.contains("open")) return;

    gift.classList.add("open");
    hint.style.opacity = "0";

    window.setTimeout(() => {
      finalMessage.classList.add("show");

      createConfetti(100);
      createHeartBurst(45);
    }, 600);
  });
}

/* =========================================
   Confetti
========================================= */

function createConfetti(count = 40) {
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.zIndex = "150";
  container.style.pointerEvents = "none";
  container.style.overflow = "hidden";

  document.body.appendChild(container);

  const symbols = ["✦", "♥", "◆", "✧", "•"];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");

    piece.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.position = "absolute";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = "-30px";
    piece.style.fontSize = `${10 + Math.random() * 18}px`;
    piece.style.color =
      `hsl(${Math.random() * 360}, 85%, 75%)`;

    const duration = 1.8 + Math.random() * 2;

    piece.animate(
      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1
        },
        {
          transform:
            `translate(${(-120 + Math.random() * 240)}px, ${window.innerHeight + 80}px) rotate(${360 + Math.random() * 720}deg)`,
          opacity: 0
        }
      ],
      {
        duration: duration * 1000,
        easing: "cubic-bezier(.2,.7,.3,1)",
        fill: "forwards"
      }
    );

    container.appendChild(piece);
  }

  window.setTimeout(() => {
    container.remove();
  }, 4500);
}

/* =========================================
   Heart Burst
========================================= */

function createHeartBurst(count = 20) {
  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.inset = "0";
  container.style.zIndex = "140";
  container.style.pointerEvents = "none";

  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");

    heart.textContent =
      Math.random() > .5 ? "❤" : "♡";

    heart.style.position = "absolute";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.color = "#ff72ad";
    heart.style.fontSize = `${12 + Math.random() * 22}px`;
    heart.style.textShadow = "0 0 15px #ff4f9a";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 300;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    heart.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(.2)",
          opacity: 0
        },
        {
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 1,
          offset: .2
        },
        {
          transform:
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(.4)`,
          opacity: 0
        }
      ],
      {
        duration: 1300 + Math.random() * 900,
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "forwards"
      }
    );

    container.appendChild(heart);
  }

  window.setTimeout(() => {
    container.remove();
  }, 2500);
}

/* =========================================
   Music
========================================= */

function setupMusic() {
  const button = $("#musicButton");
  const audio = $("#birthdayMusic");

  if (!button || !audio) return;

  let musicAvailable = true;

  audio.addEventListener("error", () => {
    musicAvailable = false;

    button.style.display = "none";
  });

  button.addEventListener("click", async () => {
    if (!musicAvailable) return;

    try {
      if (audio.paused) {
        await audio.play();

        button.textContent = "🎵";
        button.classList.add("playing");
        button.setAttribute("aria-label", "إيقاف الموسيقى");
      } else {
        audio.pause();

        button.textContent = "🔊";
        button.classList.remove("playing");
        button.setAttribute("aria-label", "تشغيل الموسيقى");
      }
    } catch {
      button.style.display = "none";
    }
  });
}

/* =========================================
   Image Preload
========================================= */

function preloadImages() {
  const paths = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg"
  ];

  paths.forEach(path => {
    const image = new Image();
    image.src = path;
  });
}