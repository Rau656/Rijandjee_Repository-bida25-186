(function () {
  "use strict";

  function initIntro() {
    var intro = document.getElementById("intro-splash");
    if (!intro) return;

    var skip = intro.querySelector(".intro-skip");
    var done = false;

    function closeIntro() {
      if (done) return;
      done = true;
      intro.classList.add("is-hidden");
      document.body.classList.remove("intro-active");
      window.setTimeout(function () {
        intro.remove();
      }, 700);
    }

    if (skip) {
      skip.addEventListener("click", closeIntro);
    }

    intro.addEventListener("click", function (e) {
      if (e.target === intro) closeIntro();
    });

    window.setTimeout(closeIntro, 3200);
  }

  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initNavScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initIntro();
      initScrollReveal();
      initNavScroll();
    });
  } else {
    initIntro();
    initScrollReveal();
    initNavScroll();
  }
})();
