/* Kadi One Construction — interactions */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".main-nav");
  var toggle = document.querySelector(".nav-toggle");
  var backToTop = document.querySelector(".back-to-top");

  /* Sticky header shadow + back-to-top visibility */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Scroll-to-top links (back-to-top button + logo) — reliable even with a
     sticky #top header where a plain #anchor jump misbehaves */
  var prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href="#top"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReduce ? "auto" : "smooth" });
    });
  });

  /* Mobile menu */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Current year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Scrollspy — highlight the active nav link */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".main-nav a"));
  if ("IntersectionObserver" in window && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = "#" + entry.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && href.charAt(0) === "#" && href.length > 1) {
        var sec = document.querySelector(href);
        if (sec) spy.observe(sec);
      }
    });
  }

  /* Contact form — friendly confirmation (no backend) */
  var form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.checkValidity && !form.checkValidity()) {
        if (form.reportValidity) form.reportValidity();
        return;
      }
      var status = form.querySelector(".form-status");
      form.reset();
      if (status) {
        status.hidden = false;
        status.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }

  /* Animated counters */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var duration = 1600;
    var start = null;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(tick);
  }

  /* Reveal on scroll + trigger counters */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(
    ".section-head, .about-text, .about-visual, .card, .vm-card, .value-pill, .project, .step, .band-stat, .contact-info, .contact-form, .hero-stats li"
  );
  revealEls.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 4) * 70 + "ms";
  });

  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        entry.target.querySelectorAll && entry.target.querySelectorAll(".stat-num[data-count]").forEach(animateCount);
        if (entry.target.matches && entry.target.matches(".stat-num[data-count]")) animateCount(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { io.observe(el); });

    /* Observe standalone counters (hero/band) */
    document.querySelectorAll(".stat-num[data-count]").forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".stat-num[data-count]").forEach(function (el) {
      el.textContent = (parseFloat(el.getAttribute("data-count")) || 0).toLocaleString();
    });
  }
})();
