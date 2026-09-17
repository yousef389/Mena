"use strict";

document.addEventListener(
  "DOMContentLoaded",
  init
);


/* =========================
   HELPERS
========================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  [...document.querySelectorAll(selector)];


/* =========================
   INIT
========================= */

function init() {

  createHearts();

  setupNavigation();

  setupOpening();

  setupTyping();

  setupGallery();

  setupCake();

  setupEnvelope();

  setupGift();

  setupMusic();

  setupTilt();

}


/* =========================
   HEARTS
========================= */

function createHearts() {

  const container =
    $("#floatingHearts");

  if (!container) return;


  const hearts = [
    "♥",
    "♡",
    "❤"
  ];


  for (let i = 0; i < 14; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "float-heart";

    heart.textContent =
      hearts[
        Math.floor(
          Math.random() *
          hearts.length
        )
      ];

    heart.style.left =
      `${Math.random() * 100}%`;

    heart.style.fontSize =
      `${11 + Math.random() * 18}px`;

    heart.style.animationDuration =
      `${9 + Math.random() * 9}s`;

    heart.style.animationDelay =
      `${Math.random() * 8}s`;

    heart.style.setProperty(
      "--x",
      `${-100 + Math.random() * 200}px`
    );

    container.appendChild(
      heart
    );
  }
}


/* =========================
   NAVIGATION
========================= */

function setupNavigation() {

  $$("[data-next]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            button.dataset.next;

          showPage(id);

        }
      );

    }
  );

}


function showPage(id) {

  const target =
    document.getElementById(id);

  if (!target) return;


  $$(".page").forEach(
    page => {
      page.classList.remove(
        "active"
      );
    }
  );


  target.classList.add(
    "active"
  );


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================
   OPENING
========================= */

function setupOpening() {

  const button =
    $("#startBtn");

  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      burstHearts(20);

      createConfetti(55);

      showPage("message");

      startTyping();

    }
  );

}


/* =========================
   TYPING
========================= */

let typingStarted = false;


function setupTyping() {
  // يبدأ بعد فتح المفاجأة
}


function startTyping() {

  if (typingStarted) return;

  typingStarted = true;


  const element =
    $("#typingText");

  if (!element) return;


  const text =
    "العمر كله ليكي إن شاء الله، وأشوفك أحلى واحدة في الدنيا كلها. ربنا يخليكي وتحققي كل اللي نفسك فيه، وكل سنة وانتي طيبة يا منوشة ❤️";


  let index = 0;


  function write() {

    if (index >= text.length) {
      return;
    }


    element.textContent +=
      text[index];


    const char =
      text[index];

    index++;


    let speed = 30;


    if (
      char === "،" ||
      char === "."
    ) {
      speed = 160;
    }


    setTimeout(
      write,
      speed
    );

  }


  write();
}


/* =========================
   GALLERY
========================= */

function setupGallery() {

  const lightbox =
    $("#lightbox");

  const image =
    $("#lightboxImg");

  const caption =
    $("#lightboxCaption");

  const close =
    $("#closeLightbox");


  $$(".photo").forEach(
    photo => {

      photo.addEventListener(
        "click",
        () => {

          const src =
            photo.dataset.image;

          const text =
            photo.dataset.caption;


          image.src = src;

          image.alt = text;

          caption.textContent =
            text;


          lightbox.classList.add(
            "open"
          );

          document.body.style.overflow =
            "hidden";

        }
      );

    }
  );


  close.addEventListener(
    "click",
    closeLightbox
  );


  lightbox.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        lightbox
      ) {
        closeLightbox();
      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {
        closeLightbox();
      }

    }
  );


  function closeLightbox() {

    lightbox.classList.remove(
      "open"
    );

    document.body.style.overflow =
      "";

    setTimeout(
      () => {
        image.src = "";
      },
      350
    );

  }

}


/* =========================
   TILT
========================= */

function setupTilt() {

  const cards =
    $$(".photo");


  const mobile =
    window.matchMedia(
      "(hover: none)"
    ).matches;


  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    mobile ||
    reduced
  ) {
    return;
  }


  cards.forEach(
    card => {

      card.addEventListener(
        "pointermove",
        event => {

          const rect =
            card.getBoundingClientRect();


          const x =
            (
              event.clientX -
              rect.left
            ) /
            rect.width;


          const y =
            (
              event.clientY -
              rect.top
            ) /
            rect.height;


          const rotateX =
            (0.5 - y) * 9;


          const rotateY =
            (x - 0.5) * 9;


          card.style.transform =
            `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            `;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );

}


/* =========================
   CAKE
========================= */

function setupCake() {

  const button =
    $("#blowBtn");

  const cake =
    $(".cake-scene");

  const wish =
    $("#wish");

  const next =
    $("#cakeNext");


  let finished = false;


  button.addEventListener(
    "click",
    () => {

      if (finished) return;

      finished = true;


      cake.classList.add(
        "blown"
      );


      button.textContent =
        "✨ الأمنية تمت ✨";


      button.disabled = true;


      wish.classList.add(
        "show"
      );


      createConfetti(75);

      burstHearts(30);


      setTimeout(
        () => {
          next.classList.remove(
            "hidden"
          );
        },
        800
      );

    }
  );

}


/* =========================
   ENVELOPE
========================= */

function setupEnvelope() {

  const envelope =
    $("#envelope");

  const hint =
    $("#envelopeHint");

  const next =
    $("#letterNext");


  envelope.addEventListener(
    "click",
    () => {

      if (
        envelope.classList.contains(
          "open"
        )
      ) {
        return;
      }


      envelope.classList.add(
        "open"
      );


      hint.textContent =
        "رسالة مخصوص ليكي ❤️";


      burstHearts(22);


      setTimeout(
        () => {

          next.classList.remove(
            "hidden"
          );

        },
        900
      );

    }
  );

}


/* =========================
   GIFT
========================= */

function setupGift() {

  const button =
    $("#giftBtn");

  const hint =
    $("#giftHint");

  const final =
    $("#final");


  button.addEventListener(
    "click",
    () => {

      if (
        button.classList.contains(
          "open"
        )
      ) {
        return;
      }


      button.classList.add(
        "open"
      );


      hint.style.opacity =
        "0";


      setTimeout(
        () => {

          final.classList.add(
            "show"
          );


          createConfetti(120);

          burstHearts(50);

        },
        650
      );

    }
  );

}


/* =========================
   CONFETTI
========================= */

function createConfetti(
  amount = 50
) {

  const layer =
    document.createElement("div");


  layer.style.position =
    "fixed";

  layer.style.inset =
    "0";

  layer.style.zIndex =
    "90";

  layer.style.pointerEvents =
    "none";

  layer.style.overflow =
    "hidden";


  document.body.appendChild(
    layer
  );


  const symbols = [
    "✦",
    "♥",
    "◆",
    "✧",
    "•"
  ];


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const item =
      document.createElement("span");


    item.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];


    item.style.position =
      "absolute";

    item.style.left =
      `${Math.random() * 100}%`;

    item.style.top =
      "-30px";

    item.style.fontSize =
      `${10 + Math.random() * 18}px`;

    item.style.color =
      `hsl(
        ${Math.random() * 360},
        85%,
        75%
      )`;


    const x =
      -180 +
      Math.random() * 360;


    item.animate(
      [
        {
          transform:
            "translateY(0) rotate(0)",
          opacity: 1
        },

        {
          transform:
            `
            translate(
              ${x}px,
              ${window.innerHeight + 100}px
            )
            rotate(${360 + Math.random() * 720}deg)
            `,
          opacity: 0
        }
      ],
      {
        duration:
          1800 +
          Math.random() * 2200,

        easing:
          "cubic-bezier(.2,.7,.3,1)",

        fill:
          "forwards"
      }
    );


    layer.appendChild(item);

  }


  setTimeout(
    () => layer.remove(),
    4500
  );

}


/* =========================
   HEART BURST
========================= */

function burstHearts(
  amount = 20
) {

  const layer =
    document.createElement("div");


  layer.style.position =
    "fixed";

  layer.style.inset =
    "0";

  layer.style.zIndex =
    "95";

  layer.style.pointerEvents =
    "none";


  document.body.appendChild(
    layer
  );


  for (
    let i = 0;
    i < amount;
    i++
  ) {

    const heart =
      document.createElement("span");


    heart.textContent =
      Math.random() > .5
        ? "♥"
        : "♡";


    heart.style.position =
      "absolute";

    heart.style.left =
      "50%";

    heart.style.top =
      "50%";

    heart.style.color =
      "#ff73ad";

    heart.style.fontSize =
      `${12 + Math.random() * 22}px`;

    heart.style.textShadow =
      "0 0 15px #ff4f9a";


    const angle =
      Math.random() *
      Math.PI *
      2;


    const distance =
      100 +
      Math.random() * 320;


    const x =
      Math.cos(angle) *
      distance;


    const y =
      Math.sin(angle) *
      distance;


    heart.animate(
      [
        {
          transform:
            "translate(-50%,-50%) scale(.2)",
          opacity: 0
        },

        {
          transform:
            "translate(-50%,-50%) scale(1)",
          opacity: 1
        },

        {
          transform:
            `
            translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            )
            scale(.3)
            `,
          opacity: 0
        }
      ],
      {
        duration:
          1200 +
          Math.random() * 900,

        easing:
          "cubic-bezier(.2,.8,.2,1)",

        fill:
          "forwards"
      }
    );


    layer.appendChild(
      heart
    );

  }


  setTimeout(
    () => layer.remove(),
    2400
  );

}


/* =========================
   MUSIC
========================= */

function setupMusic() {

  const button =
    $("#musicBtn");

  const music =
    $("#music");


  let available = true;


  music.addEventListener(
    "error",
    () => {

      available = false;

      button.style.display =
        "none";

    }
  );


  button.addEventListener(
    "click",
    async () => {

      if (!available) return;


      try {

        if (music.paused) {

          await music.play();

          button.textContent =
            "❚❚";

          button.classList.add(
            "playing"
          );

        } else {

          music.pause();

          button.textContent =
            "♫";

          button.classList.remove(
            "playing"
          );

        }

      } catch {

        button.style.display =
          "none";

      }

    }
  );

}