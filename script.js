document.addEventListener('DOMContentLoaded', () => {
  // --- High Performance Typing Effect ---
  const typedText = document.getElementById('typed-text');
  if (typedText) {
    const roles = ["Web Developer", "UI/UX Enthusiast", "JavaScript Fanatic", "Python/C# Coder", "Always Learning"];
    let roleIdx = 0, charIdx = 0, isTyping = true;
    let lastTime = 0;
    const speed = 70, deleteSpeed = 30, pause = 1200;

    function type(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      const current = roles[roleIdx];
      
      if (isTyping) {
        if (delta > speed) {
          typedText.textContent = current.slice(0, ++charIdx);
          lastTime = timestamp;
          if (charIdx === current.length) {
            isTyping = false;
            lastTime += pause;
          }
        }
      } else {
        if (delta > deleteSpeed) {
          typedText.textContent = current.slice(0, --charIdx);
          lastTime = timestamp;
          if (charIdx === 0) {
            isTyping = true;
            roleIdx = (roleIdx + 1) % roles.length;
          }
        }
      }
      requestAnimationFrame(type);
    }
    requestAnimationFrame(type);
  }

  // --- Optimized Matrix Effect ---
  const canvas = document.getElementById('matrix-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const colors = ["#00ffae", "#00cfff", "#ff00c8", "#ffea00", "#00ff41"];
    let colorIdx = 0, drops = [], chars = "01abcdefghijklmnopqrstuvwxyz<>/[]{};:";
    let resizeTimeout, width, height, columns;

    function initMatrix() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / 18);
      drops = Array(columns).fill(1);
    }

    function drawMatrix() {
      ctx.fillStyle = 'rgba(24, 28, 36, 0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = '18px Fira Mono';
      ctx.fillStyle = colors[colorIdx];

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.random() * chars.length | 0];
        ctx.fillText(char, i * 18, drops[i] * 18);
        if (drops[i] * 18 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    function animate() {
      drawMatrix();
      requestAnimationFrame(animate);
    }

    initMatrix();
    animate();
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initMatrix, 200);
    });

    document.getElementById('bgcolor-btn')?.addEventListener('click', () => {
      colorIdx = (colorIdx + 1) % colors.length;
    });
  }

  // --- Instant Theme Toggle ---
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
    }
  }

  // --- Efficient Loader ---
  const loader = document.getElementById('loader');
  if (loader) {
    const start = performance.now();
    function checkLoad() {
      if (performance.now() - start > 2000 || document.readyState === 'complete') {
        loader.style.transition = 'opacity 0.6s';
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 600);
      } else {
        requestAnimationFrame(checkLoad);
      }
    }
    requestAnimationFrame(checkLoad);
  }

  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle');
  if (music && musicBtn) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(music);
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.25;
    source.connect(gainNode).connect(audioCtx.destination);

    musicBtn.addEventListener('click', () => {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      music.paused ? music.play() : music.pause();
    });
  }

  // --- Hardware-Accelerated Modal ---
  const modal = document.getElementById('videoModal');
  if (modal) {
    const video = document.getElementById('hobbyVideo');
    modal.style.willChange = 'transform, opacity';

    document.getElementById('hobbyVideoThumb')?.addEventListener('click', () => {
      modal.classList.add('show');
      video.play().catch(e => console.log('Autoplay prevented:', e));
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('#closeModal')) {
        modal.classList.remove('show');
        video.pause();
      }
    });
  }

  // --- Debounced Scroll Effects ---
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const now = performance.now();
    if (now - lastScroll > 100) {
      lastScroll = now;
    }
  }, { passive: true });
});