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

  // --- Interactive Hacking Terminal ---
  const terminalLoader = document.getElementById('terminal-loader');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  
  if (terminalLoader && terminalOutput && terminalInput) {
    let hackingStage = 0; // Track progress through the "hack"
    let commandHistory = [];

    // Focus input when terminal is clicked
    terminalLoader.addEventListener('click', () => {
      terminalInput.focus();
    });

    // Keep input focused
    terminalInput.focus();

    function addOutput(text, className = '') {
      const line = document.createElement('div');
      line.className = `boot-line ${className}`;
      line.textContent = text;
      terminalOutput.appendChild(line);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function addHTMLOutput(html) {
      const line = document.createElement('div');
      line.className = 'boot-line';
      line.innerHTML = html;
      terminalOutput.appendChild(line);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    const commands = {
      help: () => {
        addOutput('');
        addOutput('Available Commands:', 'boot-info');
        addOutput('─────────────────────────────────────────', 'boot-info');
        addOutput('  help        - Display this help menu');
        addOutput('  scan        - Scan portfolio systems');
        addOutput('  hack        - Initiate access sequence');
        addOutput('  access      - Request access');
        addOutput('  enter       - Enter the portfolio');
        addOutput('  whoami      - Display user info');
        addOutput('  ls          - List directory contents');
        addOutput('  clear       - Clear terminal');
        addOutput('  about       - About Ivan');
        addOutput('─────────────────────────────────────────', 'boot-info');
        addOutput('');
        addOutput('TIP: Try typing "hack" to bypass security...', 'boot-warning');
        addOutput('');
      },
      
      whoami: () => {
        addOutput('');
        addOutput('visitor@portfolio', 'boot-success');
        addOutput('Access Level: GUEST', 'boot-warning');
        addOutput('Clearance: NONE', 'boot-error');
        addOutput('');
        addOutput('You need higher clearance to access this portfolio.', 'boot-warning');
        addOutput('Try "hack" to elevate privileges...', 'boot-info');
        addOutput('');
      },

      ls: () => {
        addOutput('');
        addOutput('drwxr-xr-x  2 ivan ivan 4096 Feb 13 2026 about/', 'boot-info');
        addOutput('drwxr-xr-x  2 ivan ivan 4096 Feb 13 2026 education/', 'boot-info');
        addOutput('drwxr-xr-x  2 ivan ivan 4096 Feb 13 2026 experience/', 'boot-info');
        addOutput('drwxr-xr-x  2 ivan ivan 4096 Feb 13 2026 skills/', 'boot-info');
        addOutput('drwxr-xr-x  2 ivan ivan 4096 Feb 13 2026 projects/', 'boot-info');
        addOutput('drwxr-xr-x  2 ivan ivan 4096 Feb 13 2026 contact/', 'boot-info');
        addOutput('-rw-r--r--  1 ivan ivan 1337 Feb 13 2026 resume.pdf', 'boot-success');
        addOutput('-rwxr-xr-x  1 ivan ivan 2048 Feb 13 2026 enter.sh', 'boot-warning');
        addOutput('');
      },

      about: () => {
        addOutput('');
        addOutput('╔══════════════════════════════════════╗', 'boot-success');
        addOutput('║     IVAN POKHYLCHUK PORTFOLIO        ║', 'boot-success');
        addOutput('╚══════════════════════════════════════╝', 'boot-success');
        addOutput('');
        addOutput('> Full-Stack Developer', 'boot-info');
        addOutput('> Computer Science Student @ UE', 'boot-info');
        addOutput('> Tech Enthusiast & Problem Solver', 'boot-info');
        addOutput('');
        addOutput('Specializing in: Python, C++, C#, Java, Web Dev', 'boot-success');
        addOutput('');
      },

      scan: () => {
        addOutput('');
        addOutput('> Initiating system scan...', 'boot-warning');
        setTimeout(() => {
          addOutput('> Scanning network topology...', '');
          setTimeout(() => {
            addOutput('> Analyzing security protocols...', '');
            setTimeout(() => {
              addOutput('');
              addOutput('SCAN RESULTS:', 'boot-success');
              addOutput('─────────────────────────────────────', 'boot-info');
              addOutput('Firewall Status: ACTIVE', 'boot-error');
              addOutput('Encryption: AES-256', 'boot-warning');
              addOutput('Security Level: HIGH', 'boot-error');
              addOutput('Open Ports: 80, 443', 'boot-info');
              addOutput('Vulnerabilities: 0 detected', 'boot-success');
              addOutput('─────────────────────────────────────', 'boot-info');
              addOutput('');
              addOutput('System appears secure. Try "hack" to bypass...', 'boot-warning');
              addOutput('');
              hackingStage = 1;
            }, 800);
          }, 600);
        }, 400);
      },

      hack: () => {
        if (hackingStage === 0) {
          addOutput('');
          addOutput('ERROR: Run "scan" first to identify vulnerabilities.', 'boot-error');
          addOutput('');
          return;
        }
        
        addOutput('');
        addOutput('⚠ WARNING: Initiating unauthorized access sequence...', 'boot-warning');
        
        setTimeout(() => {
          addOutput('> Injecting payload...', '');
          setTimeout(() => {
            addOutput('> Exploiting buffer overflow...', '');
            setTimeout(() => {
              addOutput('> Bypassing firewall...', '');
              setTimeout(() => {
                addOutput('> Cracking encryption keys...', '');
                addOutput('[████████░░░░░░░░] 50%', 'boot-progress');
                setTimeout(() => {
                  addOutput('[████████████████] 100%', 'boot-success');
                  addOutput('');
                  addOutput('✓ ENCRYPTION CRACKED!', 'boot-success');
                  addOutput('✓ FIREWALL BYPASSED!', 'boot-success');
                  addOutput('✓ ACCESS GRANTED!', 'boot-success');
                  addOutput('');
                  addOutput('Privilege escalated: GUEST → ADMIN', 'boot-success');
                  addOutput('');
                  addOutput('You now have full access. Type "enter" to proceed.', 'boot-info');
                  addOutput('');
                  hackingStage = 2;
                }, 1200);
              }, 600);
            }, 600);
          }, 600);
        }, 500);
      },

      access: () => {
        if (hackingStage < 2) {
          addOutput('');
          addOutput('ACCESS DENIED: Insufficient privileges.', 'boot-error');
          addOutput('You need to "hack" the system first.', 'boot-warning');
          addOutput('');
        } else {
          commands.enter();
        }
      },

      enter: () => {
        if (hackingStage < 2) {
          addOutput('');
          addOutput('ERROR: Access denied. Security measures active.', 'boot-error');
          addOutput('Try "hack" to gain access...', 'boot-warning');
          addOutput('');
          return;
        }

        addOutput('');
        addOutput('> Launching portfolio interface...', 'boot-success');
        
        setTimeout(() => {
          addOutput('> Loading modules...', '');
          setTimeout(() => {
            addOutput('  ✓ HTML5................OK', 'boot-success');
            addOutput('  ✓ CSS3.................OK', 'boot-success');
            addOutput('  ✓ JavaScript...........OK', 'boot-success');
            addOutput('  ✓ Python...............OK', 'boot-success');
            addOutput('  ✓ C#...................OK', 'boot-success');
            addOutput('  ✓ Java.................OK', 'boot-success');
            addOutput('  ✓ C++..................OK', 'boot-success');
            addOutput('');
            addOutput('> System Status: READY', 'boot-success');
            addOutput('');
            addOutput('Welcome to Ivan\'s Portfolio!', 'boot-success');
            addOutput('Launching in 3...', 'boot-warning');
            
            let countdown = 2;
            const countInterval = setInterval(() => {
              if (countdown > 0) {
                addOutput(`${countdown}...`, 'boot-warning');
                countdown--;
              } else {
                clearInterval(countInterval);
                addOutput('');
                addOutput('> ACCESS GRANTED. Welcome!', 'boot-success');
                
                setTimeout(() => {
                  terminalLoader.style.opacity = '0';
                  setTimeout(() => {
                    terminalLoader.remove();
                  }, 500);
                }, 800);
              }
            }, 700);
          }, 400);
        }, 300);
      },

      clear: () => {
        terminalOutput.innerHTML = '';
      }
    };

    // Handle command input
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        // Display entered command
        addOutput(`visitor@portfolio:~$ ${terminalInput.value}`, 'command-entered');
        
        // Clear input
        terminalInput.value = '';
        
        // Execute command
        if (command === '') {
          addOutput('');
        } else if (commands[command]) {
          commands[command]();
        } else {
          addOutput('');
          addOutput(`Command not found: ${command}`, 'boot-error');
          addOutput('Type "help" for available commands.', 'boot-info');
          addOutput('');
        }
        
        // Scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });

    // Auto-focus on input
    setInterval(() => {
      if (document.activeElement !== terminalInput && terminalLoader.style.opacity !== '0') {
        terminalInput.focus();
      }
    }, 100);
  }

  // --- Home Button ---
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Music Toggle ---
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

  // --- Contact Form Handler ---
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Show success message (since there's no backend)
      formMessage.textContent = `Thanks ${name}! Your message has been received. I'll get back to you at ${email} soon!`;
      formMessage.style.color = '#00ffae';
      
      // Reset form
      contactForm.reset();
      
      // Clear message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = '';
      }, 5000);
    });
  }

  // --- Smooth Scroll for Navigation ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});