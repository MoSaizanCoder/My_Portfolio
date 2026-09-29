const theme = getComputedStyle(document.documentElement);
const particlePalette = [
    theme.getPropertyValue("--accent-purple").trim(),
    theme.getPropertyValue("--accent-cyan").trim(),
    theme.getPropertyValue("--color-white").trim()
];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isCompactViewport = window.matchMedia("(max-width: 760px)").matches;

function initializeParticleBackground() {
    const particleScript = document.createElement("script");
    particleScript.src = "https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js";
    particleScript.async = true;
    particleScript.addEventListener("load", () => {
        const particleEngine = window.tsParticles;
        if (!particleEngine) {
            return;
        }

        particleEngine.load("tsparticles", {
            fpsLimit: isCompactViewport ? 45 : 60,
            background: {
                color: theme.getPropertyValue("--bg-color").trim()
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: !isCompactViewport,
                        mode: "grab"
                    },
                    onClick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        links: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        quantity: 4
                    }
                }
            },
            particles: {
                color: {
                    value: particlePalette
                },
                links: {
                    color: particlePalette,
                    distance: 120,
                    enable: true,
                    opacity: 0.7,
                    width: 1.5
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce"
                    },
                    random: false,
                    speed: 1.2,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: isCompactViewport ? 50 : 80
                },
                opacity: {
                    value: 0.8
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1.5, max: 4 }
                }
            },
            detectRetina: true
        }).catch(error => console.error("Particle background failed to initialize.", error));
    });
    document.head.append(particleScript);
}

if (!prefersReducedMotion) {
    const scheduleParticleBackground = () => {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(initializeParticleBackground, { timeout: 2000 });
        } else {
            window.setTimeout(initializeParticleBackground, 1200);
        }
    };

    window.requestAnimationFrame(() => window.requestAnimationFrame(scheduleParticleBackground));
}

const navLinks = document.querySelectorAll('.nav-links a');

// Smooth scrolling for section links; placeholder links remain inert.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
        const target = document.getElementById(anchor.hash.slice(1));
        if (!target) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        if (anchor.matches('.nav-links a')) {
            navLinks.forEach(link => link.classList.toggle('active', link === anchor));
        }
        target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
});

const contactForm = document.querySelector(".contact-form");
const contactStatus = document.querySelector("#contact-status");

if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const idleButtonMarkup = submitButton?.innerHTML ?? "";

    contactForm.addEventListener("submit", async event => {
        event.preventDefault();
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending your message...";
        }
        if (contactStatus) {
            contactStatus.textContent = "";
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm)
            });

            if (!response.ok) {
                throw new Error("Contact form submission failed.");
            }

            contactForm.reset();
            if (contactStatus) {
                contactStatus.textContent = "Thank you. Your message has been sent.";
            }
        } catch (error) {
            console.error("Contact form submission failed.", error);
            if (contactStatus) {
                contactStatus.textContent = "We could not send your message. Please try again later.";
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.innerHTML = idleButtonMarkup;
            }
        }
    });
}