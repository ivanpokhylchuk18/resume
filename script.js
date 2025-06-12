document.addEventListener('DOMContentLoaded', function () {
  // --- Constants ---
  let TYPING_CONFIG = {
    speed: 70,
    deletingSpeed: 30,
    pauseBeforeDelete: 1200,
    pauseBeforeType: 400,
    roles: [
      "<Web Developer>",
      "<UI/UX Enthusiast>",
      "<JavaScript Fanatic>",
      "<Python/C# Coder>",
      "<Always Learning>"
    ]
  };

  let MATRIX_CONFIG = {
    fontSize: 18,
    colors: ["#00ffae", "#00cfff", "#ff00c8", "#ffea00", "#00ff41"],
    fadeOpacity: 0.08,
    fallSpeed: 0.3,
    resizeThrottle: 200
  };

  (function() {

    // --- Typing Effect ---
    let typedText = document.getElementById('typed-text');
    if (typedText) {
      let typingState = {
        roleIdx: 0,
        charIdx: 0,
        isTyping: true,
        timeoutId: null
      };

      function typeLoop() {
        const { roles } = TYPING_CONFIG;
        const current = roles[typingState.roleIdx];
        
        if (typingState.isTyping) {
          if (typingState.charIdx < current.length) {
            typedText.textContent = current.slice(0, typingState.charIdx + 1);
            typingState.charIdx++;
            typingState.timeoutId = setTimeout(typeLoop, TYPING_CONFIG.speed);
          } else {
            typingState.isTyping = false;
            typingState.timeoutId = setTimeout(typeLoop, TYPING_CONFIG.pauseBeforeDelete);
          }
        } else {
          if (typingState.charIdx > 0) {
            typedText.textContent = current.slice(0, typingState.charIdx - 1);
            typingState.charIdx--;
            typingState.timeoutId = setTimeout(typeLoop, TYPING_CONFIG.deletingSpeed);
          } else {
            typingState.isTyping = true;
            typingState.roleIdx = (typingState.roleIdx + 1) % roles.length;
            typingState.timeoutId = setTimeout(typeLoop, TYPING_CONFIG.pauseBeforeType);
          }
        }
      }

      // Start typing with first role pre-set
      if (TYPING_CONFIG.roles.length > 0) {
        typedText.textContent = TYPING_CONFIG.roles[0][0];
        typingState.charIdx = 1;
        typingState.timeoutId = setTimeout(typeLoop, 500);
      }

      // Cleanup on unmount
      return () => {
        if (typingState.timeoutId) clearTimeout(typingState.timeoutId);
      };
    }
  })();

  // --- Matrix Background ---
  const canvas = document.getElementById('matrix-bg');
  if (canvas) {
    (function() {
      const ctx = canvas.getContext('2d');
      let matrixState = {
        colorIdx: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        drops: [],
        animationId: null,
        resizeTimeout: null
      };

      function initMatrix() {
        canvas.width = matrixState.width;
        canvas.height = matrixState.height;
        matrixState.drops = Array(Math.floor(matrixState.width / MATRIX_CONFIG.fontSize)).fill(1);
      }

      function randomChar() {
        const chars = "01abcdefghijklmnopqrstuvwxyz<>/[]{};:";
        return chars[Math.floor(Math.random() * chars.length)];
      }

      function drawMatrix() {
        ctx.fillStyle = `rgba(24, 28, 36, ${MATRIX_CONFIG.fadeOpacity})`;
        ctx.fillRect(0, 0, matrixState.width, matrixState.height);
        ctx.font = `${MATRIX_CONFIG.fontSize}px Fira Mono`;
        ctx.fillStyle = MATRIX_CONFIG.colors[matrixState.colorIdx];

        for (let i = 0; i < matrixState.drops.length; i++) {
          const char = randomChar();
          ctx.fillText(char, i * MATRIX_CONFIG.fontSize, matrixState.drops[i] * MATRIX_CONFIG.fontSize);
          if (matrixState.drops[i] * MATRIX_CONFIG.fontSize > matrixState.height && Math.random() > 0.975) {
            matrixState.drops[i] = 0;
          }
          matrixState.drops[i] += MATRIX_CONFIG.fallSpeed;
        }
      }

      function animateMatrix() {
        drawMatrix();
        matrixState.animationId = requestAnimationFrame(animateMatrix);
      }

      function handleResize() {
        clearTimeout(matrixState.resizeTimeout);
        matrixState.resizeTimeout = setTimeout(() => {
          matrixState.width = window.innerWidth;
          matrixState.height = window.innerHeight;
          initMatrix();
        }, MATRIX_CONFIG.resizeThrottle);
      }

      // Initialize
      initMatrix();
      animateMatrix();
      window.addEventListener('resize', handleResize);

      // Color toggle
      const bgColorBtn = document.getElementById('bgcolor-btn');
      if (bgColorBtn) {
        bgColorBtn.addEventListener('click', () => {
          matrixState.colorIdx = (matrixState.colorIdx + 1) % MATRIX_CONFIG.colors.length;
        });
      }

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        if (matrixState.animationId) cancelAnimationFrame(matrixState.animationId);
        if (matrixState.resizeTimeout) clearTimeout(matrixState.resizeTimeout);
      };
    })();
  }

  // --- Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    const handleThemeToggle = () => {
      document.body.classList.toggle('light-mode');
      themeToggleBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
      // Save preference to localStorage
      localStorage.setItem('themePreference', 
        document.body.classList.contains('light-mode') ? 'light' : 'dark');
    };

    const homeBtn = document.getElementById('home-btn');
if (homeBtn) {
  homeBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

    // Initialize from saved preference
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', handleThemeToggle);
  }

  // --- Scroll Handling ---
  (function() {
    let scrollTimeout;
    const SCROLL_DELAY = 100;

    function throttleScroll(callback) {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        callback();
        scrollTimeout = null;
      }, SCROLL_DELAY);
    }

    // Reveal sections
    const sections = document.querySelectorAll('section');
    function revealSections() {
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          section.classList.add('visible');
        }
      });
    }

    // Highlight menu
    function highlightMenuBox() {
      const sectionIds = ['about', 'skills', 'projects', 'contact'];
      let current = '';
      sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section && window.scrollY >= section.offsetTop - 100) {
          current = id;
        }
      });
      document.querySelectorAll('.menu-box').forEach(box => {
        box.classList.toggle('active', box.getAttribute('href') === `#${current}`);
      });
    }

    const handleScroll = () => {
      throttleScroll(() => {
        revealSections();
        highlightMenuBox();
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    revealSections();
    highlightMenuBox();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  })();

const loader = document.getElementById('loader');
if (loader) {
  const loaderImg = loader.querySelector('.loader-img');
  loader.style.zIndex = '9999';

  // Listen for animationend (after spins)
  if (loaderImg) {
    loaderImg.addEventListener('animationend', () => {
      loaderImg.classList.add('loader-exit');
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
      }, 900); // Match transition duration in CSS
    });
  }

  // Fallback in case load event never fires or animation doesn't trigger
  const loadTimeout = setTimeout(() => {
    if (loaderImg && !loaderImg.classList.contains('loader-exit')) {
      loaderImg.classList.add('loader-exit');
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
      }, 900);
    } else {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 600);
    }
  }, 4000);

  window.addEventListener('load', () => {
    clearTimeout(loadTimeout);
    // If animation already ended, do nothing
    if (loaderImg && !loaderImg.classList.contains('loader-exit')) {
      // If the animation hasn't finished, force the transition
      loaderImg.classList.add('loader-exit');
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
      }, 900);
    }
  });

let music = document.getElementById('bg-music');
let musicBtn = document.getElementById('music-toggle');
let musicPlaying = false;

if (music && musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
      music.pause();
      musicBtn.classList.remove('active');
    } else {
      music.volume = 0.25;
      music.play();
      musicBtn.classList.add('active');
    }
    musicPlaying = !musicPlaying;
  });
}
}

  // --- Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      
      if (!name || !email || !message) {
        if (formMessage) {
          formMessage.textContent = "Please fill in all fields";
          formMessage.style.color = '#ff4444';
        }
        return;
      }
      
      if (formMessage) {
        formMessage.textContent = "Sending...";
        formMessage.style.color = '';
      }
      
      try {
        // In a real app, you would actually send the data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (formMessage) {
          formMessage.textContent = "Thank you! I'll get back to you soon.";
          formMessage.style.color = '#00ffae';
        }
        contactForm.reset();
        
        // Reset message after delay
        setTimeout(() => {
          if (formMessage) formMessage.textContent = '';
        }, 5000);
      } catch (error) {
        if (formMessage) {
          formMessage.textContent = "Error sending message. Please try again.";
          formMessage.style.color = '#ff4444';
        }
      }
    });
  }
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
  const thumb = document.getElementById('hobbyVideoThumb');
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('closeModal');
  const video = document.getElementById('hobbyVideo');

  if (thumb && modal && closeBtn && video) {
    function openModal() {
      modal.classList.add('show');
      video.currentTime = 0;
      video.play();
    }
    function closeModal() {
      modal.classList.remove('show');
      video.pause();
    }
    thumb.addEventListener('click', openModal);
    thumb.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') openModal();
    });
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (modal.classList.contains('show') && e.key === 'Escape') closeModal();
    });
  }
});

