let currentSlide = 0;
        let animationIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = slides.length;
        document.getElementById('total-slides').textContent = totalSlides;

        let mouseTimeout;
        document.addEventListener('mousemove', () => {
            document.body.classList.add('show-cursor');
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                document.body.classList.remove('show-cursor');
            }, 3000);
        });

        function showSlide(n) {
            slides[currentSlide].classList.remove('active', 'fade-in', 'slide-left', 'zoom-in');
            currentSlide = (n + totalSlides) % totalSlides;
            const transitions = ['fade-in', 'slide-left', 'zoom-in'];
            const randomTransition = transitions[Math.floor(Math.random() * transitions.length)];
            slides[currentSlide].classList.add('active', randomTransition);
            document.getElementById('current-slide').textContent = currentSlide + 1;
            
            animationIndex = 0;
            setTimeout(() => animateSlideElements(), 300);
        }

        function animateSlideElements() {
            const currentSlideEl = slides[currentSlide];
            const animatableElements = currentSlideEl.querySelectorAll('.animate');
            
            if (animationIndex < animatableElements.length) {
                const element = animatableElements[animationIndex];
                element.classList.add('show');
                
                const animations = ['fly-left', 'fly-right', 'fly-up', 'fly-down', 'bounce'];
                const randomAnim = animations[Math.floor(Math.random() * animations.length)];
                element.classList.add(randomAnim);
                
                animationIndex++;
                
                const delay = element.tagName === 'LI' ? 150 : 200;
                setTimeout(animateSlideElements, delay);
            } else {
                setTimeout(() => {
                    document.getElementById('clickIndicator').style.display = 'block';
                }, 500);
            }
        }

        function nextSlide() {
            document.getElementById('clickIndicator').style.display = 'none';
            const currentSlideEl = slides[currentSlide];
            const animatableElements = currentSlideEl.querySelectorAll('.animate');
            
            if (animationIndex < animatableElements.length) {
                animateSlideElements();
            } else {
                showSlide(currentSlide + 1);
            }
        }

        function prevSlide() {
            document.getElementById('clickIndicator').style.display = 'none';
            showSlide(currentSlide - 1);
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'Home') {
                e.preventDefault();
                showSlide(0);
            } else if (e.key === 'End') {
                e.preventDefault();
                showSlide(totalSlides - 1);
            } else if (e.key === 'f' || e.key === 'F11') {
                e.preventDefault();
                toggleFullscreen();
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                nextSlide();
            }
            if (touchEndX > touchStartX + 50) {
                prevSlide();
            }
        }

        document.querySelector('.presentation').addEventListener('click', (e) => {
            if (!e.target.classList.contains('control-btn')) {
                nextSlide();
            }
        });

        // Animate scatter plot points
        const scatterPoints = document.querySelectorAll('.scatter-point');
        scatterPoints.forEach((point, index) => {
            point.style.opacity = '0';
            setTimeout(() => {
                point.style.transition = 'opacity 0.3s ease-in';
                point.style.opacity = '1';
            }, index * 50);
        });

        // Animate data points
        const dataPoints = document.querySelectorAll('.data-point');
        dataPoints.forEach((point, index) => {
            point.style.opacity = '0';
            setTimeout(() => {
                point.style.transition = 'opacity 0.3s ease-in';
                point.style.opacity = '1';
            }, index * 50);
        });

        // Pulse effect for MLE point
        const pulsePoint = document.querySelector('.pulse-point');
        if (pulsePoint) {
            setInterval(() => {
                pulsePoint.style.animation = 'none';
                setTimeout(() => {
                    pulsePoint.style.animation = 'pulse 1s ease-in-out';
                }, 10);
            }, 2000);
        }

        animateSlideElements();
