document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el cambio de tema (Claro/Oscuro) ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggleButton) {
        const themeIcon = themeToggleButton.querySelector('i');

        const applyTheme = (theme) => {
            if (theme === 'light') {
                body.classList.add('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        };

        const savedTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(savedTheme);

        themeToggleButton.addEventListener('click', () => {
            const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // --- Lógica para el menú de hamburguesa ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cierra el menú al hacer clic en un enlace (útil para SPAs o navegación en la misma página)
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // --- Lógica para la animación de scroll ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    if (scrollElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    // Si el elemento es una skill-card, animar la barra y el porcentaje
                    if (entry.target.classList.contains('skill-card')) {
                        const progressBar = entry.target.querySelector('.progress-bar-inner');
                        const percentageText = entry.target.querySelector('.progress-percentage');
                        const targetProgress = parseInt(progressBar.parentElement.getAttribute('data-progress'), 10);

                        if (progressBar && percentageText) {
                            setTimeout(() => {
                                progressBar.style.width = targetProgress + '%';

                                // Animación del contador de porcentaje
                                let currentPercentage = 0;
                                const interval = setInterval(() => {
                                    if (currentPercentage >= targetProgress) {
                                        clearInterval(interval);
                                        percentageText.textContent = targetProgress + '%';
                                    } else {
                                        currentPercentage++;
                                        percentageText.textContent = currentPercentage + '%';
                                    }
                                }, 15); // Ajusta la velocidad de la animación

                            }, 200); // Pequeño retraso para que la animación sea más notoria
                        }
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        // Observar elementos con .scroll-animate y también las skill-cards para las barras
        const elementsToObserve = document.querySelectorAll('.scroll-animate, .skill-card');

        elementsToObserve.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Lógica para el botón de "Scroll to Top" ---
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        scrollToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Efecto de inclinación 3D en la sección de inicio ---
    const inicioContent = document.querySelector('.inicio-content');
    if (inicioContent) {
        document.getElementById('inicio').addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2; // Rango de -1 a 1
            const y = (clientY / innerHeight - 0.5) * 2; // Rango de -1 a 1

            const tiltX = y * -10; // Inclinación en grados
            const tiltY = x * 10;

            inicioContent.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
    }

    // --- Animación de escritura en el subtítulo del inicio ---
    const subtitle = document.getElementById('hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.innerHTML = ''; // Limpiar el texto original
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                subtitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Velocidad de escritura
            } else {
                // Añadir un cursor parpadeante al final
                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                subtitle.appendChild(cursor);
            }
        }

        setTimeout(typeWriter, 1200); // Retraso para empezar a escribir
    }

    // --- Lógica para Particles.js ---
    // Verifica si el elemento #particles-js existe en la página actual
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00A8FF"
                },
                "shape": {
                    "type": "triangle"
                },
                "opacity": {
                    "value": 0.5,
                    "random": false
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#e0e0e0",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "repulse": {
                        "distance": 100
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // --- Lógica para el Modal de Proyectos ---
    const modal = document.getElementById('project-modal');
    if (modal) {
        const openModalButtons = document.querySelectorAll('.open-modal-btn');
        const closeModalButton = document.querySelector('.modal-close');

        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalTechTags = document.getElementById('modal-tech-tags');
        const modalDescription = document.getElementById('modal-description');
        const modalLiveLink = document.getElementById('modal-live-link');
        const modalRepoLink = document.getElementById('modal-repo-link');

        const openModal = (projectCard) => {
            // Obtener datos de la tarjeta del proyecto
            const title = projectCard.dataset.title;
            const image = projectCard.dataset.image;
            const description = projectCard.dataset.description;
            const tech = projectCard.dataset.tech.split(',');
            const liveUrl = projectCard.dataset.liveUrl;
            const repoUrl = projectCard.dataset.repoUrl;

            // Poblar el modal con los datos
            modalImg.src = image;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalLiveLink.href = liveUrl;
            modalRepoLink.href = repoUrl;

            // Crear y añadir las etiquetas de tecnología
            modalTechTags.innerHTML = '';
            tech.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tech-tag';
                tagElement.textContent = tag;
                modalTechTags.appendChild(tagElement);
            });

            // Mostrar el modal
            modal.classList.add('is-visible');
        };

        const closeModal = () => {
            modal.classList.remove('is-visible');
        };

        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const projectCard = e.target.closest('.project-card');
                openModal(projectCard);
            });
        });

        closeModalButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
                closeModal();
            }
        });
    }
});
