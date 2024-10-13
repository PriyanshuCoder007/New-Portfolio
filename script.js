const menu = document.querySelector("nav h3");
const fullScr = document.querySelector("#full-src");
const navImg = document.querySelector("nav img");
const clickText = document.querySelectorAll("#full-src #full-div1 h3");
const logoChange = document.getElementById("logo");

function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.1,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  // Manually handle anchor links
  document.querySelectorAll(".scroll-to").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        locoScroll.scrollTo(targetElement);
      }
    });
  });
}

function startLoader() {
  var counterElement = document.querySelector("#loader .counter");
  var currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) {
      return;
    }

    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    var delay = Math.floor(Math.random() * 200) + 50;

    setTimeout(updateCounter, delay);
  }

  updateCounter();
}

function page1Animation() {
  const tl = gsap.timeline();

  tl.to("#loader .counter", 0.25, {
    delay: 3.5,
    duration: 7,
    opacity: 0,
  });

  tl.to(".bar", 1.5, {
    delay: 0.5,
    height: 0,
    stagger: {
      amount: 0.5,
    },
    ease: "power4.inOut",
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from("nav", {
    y: -50,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    stagger: 0.4,
  });

  tl.from("#center-right h1", {
    y: 35,
    opacity: 0,
    duration: 0.8,
    stagger: 0.4,
  });

  tl.from("#center-left p", {
    x: -35,
    opacity: 0,
    duration: 0.8,
    stagger: 0.4,
  });
}

function logoChangeAsDate() {
  const logos = ["./image/logo2.png", "./image/logo1.png"];
  const today = new Date().getDay();
  const logoImage = logos[today];
  logoChange.src = logoImage;
}

function circleSvgAnimation() {
  gsap.to("#left-side svg", {
    duration: 9,
    delay: 0.2,
    ease: "linear",
    repeat: -1,
    rotation: 360,
  });
}

function spitingElement() {
  const allH4 = document.querySelectorAll("#page2-lower #right-side h4");

  allH4.forEach((elem) => {
    let clutter = "";
    let h4Text = elem.textContent;
    let splittedText = h4Text.split("");
    splittedText.map((e) => {
      clutter += `<span>${e}</span>`;
    });
    elem.innerHTML = clutter;
  });
}

function page2TextAnimation() {
  gsap.to("#page2 #page2-lower #right-side h4 span", {
    color: "#434b34",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#page2 #page2-lower #right-side h4 span",
      scroller: "#main",
      start: "top 80%",
      end: "top -40%",
      scrub: 4,
    },
  });
}

function starSvgAnimation() {
  gsap.to("#gola", {
    duration: 2.5,
    delay: 0.2,
    ease: "linear",
    repeat: -1,
    rotation: 360,
    transformOrigin: "center",
  });
}

function page4Animation() {
  // const elemC = document.querySelectorAll("#elem1");
  const elemContain = document.querySelector("#elem-container");
  const fixesImg = document.querySelector("#fixed-image");
  const elemC = document.querySelectorAll(".elem");

  elemC.forEach(function (ele) {
    ele.addEventListener("mouseenter", function (e) {
      // Get the bounding rect of the element
      const rect = ele.getBoundingClientRect();

      // Calculate x and y based on the bounding rect
      const xPos = e.clientX - rect.left;
      const yPos = e.clientY - rect.top;

      // Use GSAP to animate the position
      gsap.to(fixesImg, {
        opacity: 0.9,
        x: xPos - 50,
        y: yPos - 95,
        duration: 2,
        delay: 0.3,
        ease: "power2.out",
      });

      // Show the image

      fixesImg.style.display = "block";

      elemContain.addEventListener("mouseleave", function () {
        gsap.from(fixesImg, {
          opacity: 0.2,
          duration: 0.2,
          delay: 0.1,
          onComplete: function () {
            fixesImg.style.display = "none"; // Hide after animation completes
          },
        });
      });
    });
  });

  elemC.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      const image = e.getAttribute("data-image");
      fixesImg.style.backgroundImage = `url(${image})`;
    });
  });
}

function animateTimelineItem(selector, xValue, triggerElement, scrubValue) {
  gsap.from(selector, {
    scrollTrigger: {
      trigger: triggerElement,
      scroller: "#main",
      start: "top 80%",
      end: "bottom 50%",
      toggleActions: "play none none none",
      scrub: scrubValue,
    },
    x: xValue,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
  });
}

function page5Animation() {
  // Left timeline animations
  animateTimelineItem(
    ".timeline-item.left .timeline-date",
    -100,
    ".timeline-item.left .timeline-date",
    1
  );
  animateTimelineItem(
    ".timeline-item.left .timeline-content",
    100,
    ".timeline-item.left",
    1.2
  );

  // Right timeline animations
  animateTimelineItem(
    ".timeline-item.right .timeline-date",
    -100,
    ".timeline-item.right ,.timeline-date",
    1
  );
  animateTimelineItem(
    ".timeline-item.right .timeline-content",
    100,
    ".timeline-item.right",
    1.2
  );
}

function menuAndTextAnimation() {
  let flag = 0;

  // Function to toggle visibility
  function toggleAnimation() {
    console.log("Toggling animation"); // To check if click event works

    if (flag === 0) {
      fullScr.style.top = "0";
      navImg.style.opacity = 0;

      flag = 1;
    } else {
      fullScr.style.top = "-100%";
      navImg.style.opacity = 1;
      flag = 0;
    }
  }

  // Event listener for menu
  menu.addEventListener("click", toggleAnimation);

  // Event listeners for each clickText element
  clickText.forEach((e) => {
    e.addEventListener("click", toggleAnimation);
  });
}

locomotiveScroll();
startLoader();
page1Animation();
circleSvgAnimation();
spitingElement();
page2TextAnimation();
starSvgAnimation();
page4Animation();
animateTimelineItem();
page5Animation();
menuAndTextAnimation();
logoChangeAsDate();
