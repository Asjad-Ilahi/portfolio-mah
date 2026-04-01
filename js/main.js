/* 
  MAHNOOR TAHIR PORTFOLIO - CORE LOGIC
  Premium, High-End Animations & Interactivity
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize Lucide Icons
    lucide.createIcons();

    // 3. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Ambient Background Orbs Floating
    gsap.to('.orb-1', {
        x: '+=100',
        y: '+=100',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to('.orb-2', {
        x: '-=100',
        y: '-=100',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Fade in sections with staggered reveals
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const revealItems = section.querySelectorAll('.card, .timeline-item, .contact-item, .about-text, .about-sidebar, .section-title');
        
        gsap.set(revealItems, { opacity: 0, y: 30 });

        ScrollTrigger.create({
            trigger: section,
            start: "top 85%",
            onEnter: () => {
                gsap.to(revealItems, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power2.out",
                    overwrite: true
                });
            },
            onEnterBack: () => {
                gsap.to(revealItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    overwrite: true
                });
            }
        });
    });

    // Hero Character Reveal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const lines = originalText.split('<br>');
        
        let newContent = '';
        lines.forEach((line) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;
            
            const isItalic = trimmedLine.includes('<em>');
            const cleanText = trimmedLine.replace(/<[^>]*>/g, '');
            
            let lineHtml = `<div class="title-line" style="overflow: hidden; display: block;">`;
            if (isItalic) lineHtml += `<em>`;
            
            cleanText.split('').forEach(char => {
                lineHtml += `<span class="char" style="display:inline-block; transform:translateY(110%)">${char === ' ' ? '&nbsp;' : char}</span>`;
            });
            
            if (isItalic) lineHtml += `</em>`;
            lineHtml += `</div>`;
            newContent += lineHtml;
        });
        
        heroTitle.innerHTML = newContent;

        gsap.to('.char', {
            y: '0%',
            stagger: 0.02,
            duration: 1.5,
            ease: "expo.out",
            delay: 0.5
        });
    }



    // Card Hover Parallax
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // Custom Cursor Logic with Magnetic Persistence
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        let posX = 0, posY = 0;
        let mouseX = 0, mouseY = 0;

        gsap.to({}, 0.01, {
            repeat: -1,
            onUpdate: function() {
                posX += (mouseX - posX) / 8;
                posY += (mouseY - posY) / 8;

                gsap.set(follower, {
                    css: {
                        left: posX - 20,
                        top: posY - 20
                    }
                });

                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        });

        document.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Magnetic Effect on Interaction Elements
        const hoverElements = document.querySelectorAll('.btn, a, .card, .contact-item, .nav-links li');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => follower.classList.add('active'));
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('active');
                gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            });

            // Subtle magnetic pull
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                if (el.classList.contains('btn') || el.tagName === 'A') {
                    gsap.to(el, {
                        x: x * 0.2,
                        y: y * 0.2,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                lenis.stop();
                gsap.from('.nav-links li', {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    delay: 0.3,
                    ease: "power2.out"
                });
            } else {
                lenis.start();
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                lenis.start();
            });
        });
    }

    // Refresh ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
});
