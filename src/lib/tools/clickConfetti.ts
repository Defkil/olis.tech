/**
 * Basiert auf https://codepen.io/smpnjn/pen/wvgpxpG
 * todo: aufräumen und auf class binden anstatt auf document
 */

/* Random Id generator for giving confetti elements unique IDs */
const randomId = function (length: number) {
  const result = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
};

/* Short function to create confetti at x, y with confettiItems number of items */
export const createConfetti = function (x: number, y: number, confettiItems: number) {
  const createElement = document.createElement("div");
  createElement.classList.add("confetti");
  const makeId = randomId(10);
  createElement.setAttribute("data-id", makeId);
  let confettiHTML = "";
  const colors = ["#2162ff", "#9e21ff", "#21a9ff", "#a9ff21", "#ff2184"];

  for (let i = 0; i < confettiItems; ++i) {
    const color = Math.floor(Math.random() * colors.length);
    confettiHTML += `<div class="confetti-item" style="background-color: ${
      colors[color]
    };" data-angle="${Math.random()}" data-speed="${Math.random()}"></div>`;
    confettiHTML += `<div class="confetti-item reverse" style="background-color: ${
      colors[color]
    };" data-angle="${Math.random()}" data-speed="${Math.random()}"></div>`;
  }

  createElement.style.position = "fixed";
  createElement.style.top = `${y}px`;
  createElement.style.left = `${x}px`;
  createElement.innerHTML = confettiHTML;
  document.body.appendChild(createElement);

  const gravity = 50; // Fjolt is a high gravity planet
  const maxSpeed = 105000; // Pixels * 1000
  const minSpeed = 65000; // Pixels * 1000
  let t = 0; // Time starts at 0
  const maxAngle = 1500; // Radians * 1000
  const minAngle = 400; // Radians * 1000
  let opacity = 1;
  let rotateAngle = 0;

  const interval = setInterval(function () {
    document.querySelectorAll(`[data-id="${makeId}"] .confetti-item`).forEach(function (item) {
      if (!(item instanceof HTMLElement)) return;
      let modifierX = 1;
      const modifierY = 1;
      if (item.classList.contains("reverse")) {
        modifierX = -1;
      }
      item.style.opacity = opacity.toString();
      const dataAngel = item.getAttribute("data-angle");
      if (dataAngel === null) {
        throw new Error("Could not find data-angle");
      }
      const dataSpeed = item.getAttribute("data-speed");
      if (dataSpeed === null) {
        throw new Error("Could not find data-speed");
      }
      const randomNumber = parseFloat(dataAngel);
      const otherRandom = parseFloat(dataSpeed);
      const newRotateAngle = randomNumber * rotateAngle;
      const angle = (randomNumber * (maxAngle - minAngle) + minAngle) / 1000;
      const speed = (randomNumber * (maxSpeed - minSpeed) + minSpeed) / 1000;
      const x = speed * t * Math.cos(angle) + 50 * otherRandom * t;
      const y = speed * t * Math.sin(angle) - 0.5 * gravity * Math.pow(t, 2) + 50 * otherRandom * t;
      item.style.transform = `translateX(${x * modifierX}px) translateY(${
        y * -1 * modifierY
      }px) rotateY(${newRotateAngle}deg) scale(${1})`;
    });
    t += 0.1;
    rotateAngle += 3;
    opacity -= 0.02;
    if (t >= 6) {
      t = 0.1;
      if (document.querySelector(`[data-id="${makeId}"]`) !== null) {
        document.querySelector(`[data-id="${makeId}"]`)?.remove();
      }
      clearInterval(interval);
    }
  }, 33.33);
};

document.addEventListener("DOMContentLoaded", function () {
  const highlightPosition = document.getElementById("highlight-position");
  if (highlightPosition === null) {
    throw new Error("Could not find highlight position element");
  }
  document.addEventListener("pointerdown", function (e) {
    createConfetti(e.pageX, e.pageY, 20);
  });
  document.addEventListener("pointermove", function (e) {
    highlightPosition.style.opacity = String(1);
    highlightPosition.style.top = `${e.pageY - 25}px`;
    highlightPosition.style.left = `${e.pageX - 25}px`;
  });
});

/*
folgender html wird benötigt

<div id="highlight-position">

</div>

und CSS Code

.confetti {
  position: absolute;
  z-index: 9999;
}

.confetti-item {
  pointer-events: none;

  position: absolute;
  top: 0;
  left: 0;

  width: 10px;
  height: 10px;
}

#highlight-position {
  pointer-events: none;
  will-change: left, top;

  position: absolute;
  top: 0;
  left: 0;

  width: 50px;
  height: 50px;

  opacity: 0;
}
 */
