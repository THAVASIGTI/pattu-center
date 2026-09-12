/* Sri Kamatchi Pattu Center — progressive enhancement layer.
   Nothing here is required for the page to work; it only adds polish. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------
     Mobile drawer navigation
     --------------------------------------------------------------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  var scrim = document.querySelector('.scrim');
  var closeBtn = document.querySelector('.nav__close');

  function setNav(open) {
    if (!nav) return;
    nav.classList.toggle('is-open', open);
    if (scrim) scrim.classList.toggle('is-open', open);
    if (burger) {
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    }
    document.body.classList.toggle('is-locked', open);
  }

  if (burger) burger.addEventListener('click', function () { setNav(!nav.classList.contains('is-open')); });
  if (scrim) scrim.addEventListener('click', function () { setNav(false); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setNav(false); });

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setNav(false);
  });

  /* Close the drawer if the viewport grows past the desktop breakpoint */
  window.matchMedia('(min-width: 1120px)').addEventListener('change', function (e) {
    if (e.matches) setNav(false);
  });

  /* ---------------------------------------------------------------
     Sticky header shadow
     --------------------------------------------------------------- */
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var revealIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
      reveals.forEach(function (el) { revealIO.observe(el); });
    }
  }

  /* ---------------------------------------------------------------
     Count-up statistics
     data-count = target number, optional data-suffix
     --------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  function runCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = null;

    if (reduceMotion) {
      el.textContent = target.toLocaleString('en-IN') + suffix;
      return;
    }

    function frame(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          runCount(entry.target);
          countIO.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countIO.observe(el); });
    }
  }

  /* ---------------------------------------------------------------
     Highlight the section currently in view (desktop nav)
     --------------------------------------------------------------- */
  var sectionLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav a[href^="#"]')
  );

  if (sectionLinks.length && 'IntersectionObserver' in window) {
    var sections = sectionLinks
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var spyIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spyIO.observe(s); });
  }

  /* ---------------------------------------------------------------
     Only one FAQ answer open at a time
     --------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------------------------------------------------------------
     Footer year
     --------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
