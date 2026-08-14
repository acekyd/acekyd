/* html-ppt public runtime
 * Fixed viewer for decks published on adewaleabati.com.
 * Includes keyboard navigation, fragment reveals, swipe, fullscreen,
 * overview, deep links, preview mode, and progress. No editor or presenter UI.
 */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function previewIndex() {
    const match = /[?&]preview=(\d+)/.exec(location.search || '');
    return match ? parseInt(match[1], 10) - 1 : -1;
  }

  ready(function () {
    const deck = document.querySelector('.deck');
    if (!deck) return;

    const slides = Array.from(deck.querySelectorAll(':scope > .slide'));
    if (!slides.length) return;

    function fitViewport() {
      const shouldFit = window.innerWidth <= 900;
      document.documentElement.classList.toggle('slides-fit', shouldFit);
      if (!shouldFit) {
        deck.style.removeProperty('--public-slide-scale');
        return;
      }
      const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      deck.style.setProperty('--public-slide-scale', String(scale));
    }

    fitViewport();
    window.addEventListener('resize', fitViewport, { passive: true });

    const preview = previewIndex();
    if (preview >= 0 && preview < slides.length) {
      slides.forEach(function (slide, index) {
        const active = index === preview;
        slide.classList.toggle('is-active', active);
        slide.style.display = active ? '' : 'none';
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      slides[preview].querySelectorAll('[data-fragment]').forEach(function (fragment) {
        fragment.classList.add('is-shown');
      });
      document.documentElement.setAttribute('data-preview', '1');
      document.body.setAttribute('data-preview', '1');
      return;
    }

    let index = 0;
    const total = slides.length;

    let progress = document.querySelector('.progress-bar');
    if (!progress) {
      progress = document.createElement('div');
      progress.className = 'progress-bar';
      progress.setAttribute('aria-hidden', 'true');
      progress.innerHTML = '<span></span>';
      document.body.appendChild(progress);
    }
    const progressFill = progress.querySelector('span');

    let overview = document.querySelector('.overview');
    if (!overview) {
      overview = document.createElement('div');
      overview.className = 'overview';
      overview.setAttribute('role', 'dialog');
      overview.setAttribute('aria-label', 'Slide overview');
      overview.setAttribute('aria-modal', 'true');

      slides.forEach(function (slide, slideIndex) {
        const titleNode = slide.querySelector('h1,h2,h3');
        const title = slide.getAttribute('data-title') ||
          (titleNode ? titleNode.textContent : 'Slide ' + (slideIndex + 1));
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'thumb';
        button.innerHTML = '<span class="n">' + (slideIndex + 1) + '</span>' +
          '<span class="t"></span>';
        button.querySelector('.t').textContent = title.trim();
        button.addEventListener('click', function () {
          go(slideIndex);
          toggleOverview(false);
        });
        overview.appendChild(button);
      });
      document.body.appendChild(overview);
    }

    function fragments() {
      return Array.from(slides[index].querySelectorAll('[data-fragment]'));
    }

    function updateHash() {
      const target = '#/' + (index + 1);
      if (location.hash !== target) history.replaceState(null, '', target);
    }

    function go(nextIndex) {
      const bounded = Math.max(0, Math.min(total - 1, nextIndex));
      slides.forEach(function (slide, slideIndex) {
        const active = slideIndex === bounded;
        slide.classList.toggle('is-active', active);
        slide.classList.toggle('is-prev', slideIndex < bounded);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      index = bounded;
      progressFill.style.width = ((index + 1) / total * 100) + '%';
      updateHash();
    }

    function advance() {
      const nextFragment = fragments().find(function (fragment) {
        return !fragment.classList.contains('is-shown');
      });
      if (nextFragment) {
        nextFragment.classList.add('is-shown');
        return;
      }
      go(index + 1);
    }

    function retreat() {
      const shown = fragments().filter(function (fragment) {
        return fragment.classList.contains('is-shown');
      });
      if (shown.length) {
        shown[shown.length - 1].classList.remove('is-shown');
        return;
      }
      go(index - 1);
    }

    function fullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }

    function toggleOverview(force) {
      const open = typeof force === 'boolean' ? force : !overview.classList.contains('open');
      overview.classList.toggle('open', open);
      if (open) overview.querySelector('.thumb')?.focus();
    }

    document.addEventListener('keydown', function (event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (overview.classList.contains('open') && event.key !== 'Escape') return;

      switch (event.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          advance();
          event.preventDefault();
          break;
        case 'ArrowLeft':
        case 'PageUp':
        case 'Backspace':
          retreat();
          event.preventDefault();
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(total - 1);
          break;
        case 'f':
        case 'F':
          fullscreen();
          break;
        case 'o':
        case 'O':
          toggleOverview();
          break;
        case 'Escape':
          toggleOverview(false);
          break;
      }
    });

    let pointerStart = null;
    deck.addEventListener('pointerdown', function (event) {
      if (event.button !== 0 || event.target.closest('a,button,input,textarea,select')) return;
      pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
      try { deck.setPointerCapture?.(event.pointerId); } catch (_) {}
    });

    deck.addEventListener('pointerup', function (event) {
      if (!pointerStart || pointerStart.id !== event.pointerId) return;
      const deltaX = event.clientX - pointerStart.x;
      const deltaY = event.clientY - pointerStart.y;
      pointerStart = null;

      if (Math.abs(deltaX) < 56 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) return;
      if (deltaX < 0) advance();
      else retreat();
    });

    deck.addEventListener('pointercancel', function () {
      pointerStart = null;
    });

    function fromHash() {
      const match = /^#\/(\d+)/.exec(location.hash || '');
      if (match) index = Math.max(0, Math.min(total - 1, parseInt(match[1], 10) - 1));
      go(index);
    }

    window.addEventListener('hashchange', fromHash);
    fromHash();
    document.documentElement.setAttribute('data-slides-ready', '1');
  });
})();
