
            document.addEventListener('DOMContentLoaded', () => {
                const counters = document.querySelectorAll('.number');
                const speed = 200;

                const animateCounter = (counter) => {
                    const target = +counter.getAttribute('data-target');
                    const updateCount = () => {
                        const count = +counter.innerText;
                        const increment = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10); 
                        } else {
                            counter.innerText = target.toLocaleString(); 
                        }
                    };
                    updateCount();
                };

                const observerOptions = {
                    root: null,
                    threshold: 0.1
                };

                const observerCallback = (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const counter = entry.target.querySelector('.number') || entry.target;
                            if (counter.getAttribute('data-target') && !counter.classList.contains('animated')) {
                                animateCounter(counter);
                                counter.classList.add('animated');
                            }
                        }
                    });
                };

                const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

                const counterItems = document.querySelectorAll('.counter-item');
                if (counterItems.length > 0) {
                    counterItems.forEach(item => intersectionObserver.observe(item));
                } else {
                    counters.forEach(counter => {
                        if (counter.getAttribute('data-target')) {
                            intersectionObserver.observe(counter);
                        }
                    });
                }

                if (!('IntersectionObserver' in window)) {
                    counters.forEach(counter => {
                        if (counter.getAttribute('data-target')) {
                            animateCounter(counter);
                        }
                    });
                }
            });

               const form = document.getElementById("thanks");
        const successMessage =
            document.getElementById("congo");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            successMessage.style.display = "block";
        });

const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
                navLinks.style.display = "flex";

})

       

        function animateCounters() {
            const counters = document.querySelectorAll('.number');
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 200;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(() => animateCounters(), 10);
                } else {
                    counter.innerText = target;
                }
            });
        }

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
            const impactSection = document.querySelector('.impact-section');
            if (impactSection) {
                observer.observe(impactSection);
            }
        });

        document.getElementById('thanks').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const msg = document.getElementById('congo');
            
            if (email) {
                msg.style.display = 'block';
                document.getElementById('email').value = '';
                setTimeout(() => {
                    msg.style.display = 'none';
                }, 3000);
            }
        });

        document.querySelector('.arrow-icon').addEventListener('click', () => {
            document.querySelector('.about-us').scrollIntoView({
                behavior: 'smooth'
            });
        });