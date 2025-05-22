
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