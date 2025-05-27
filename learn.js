 document.addEventListener('DOMContentLoaded', function() {
            const startBtn = document.getElementById('start-quiz-btn');
            const quizStart = document.getElementById('quiz-start');
            const quizQuestions = document.getElementById('quiz-questions');
            const quizResult = document.getElementById('quiz-result');
            const nextBtn = document.getElementById('next-btn');
            const prevBtn = document.getElementById('prev-btn');
            const restartBtn = document.getElementById('restart-quiz-btn');
            const questions = document.querySelectorAll('.quiz-question');
            
            let currentQuestion = 1;
            const answers = {};
            
            function showQuestion(questionNumber) {
                questions.forEach(q => {
                    q.classList.remove('active');
                    if (parseInt(q.dataset.question) === questionNumber) {
                        q.classList.add('active');
                    }
                });
                
                prevBtn.disabled = questionNumber === 1;
                nextBtn.textContent = questionNumber === questions.length ? 'See Results' : 'Next';
            }
            
            startBtn.addEventListener('click', function() {
                quizStart.style.display = 'none';
                quizQuestions.style.display = 'block';
                currentQuestion = 1;
                showQuestion(currentQuestion);
            });
            
    
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    const parent = this.parentElement;
                    parent.querySelectorAll('.quiz-option').forEach(sib => {
                        sib.classList.remove('selected');
                    });
                    
                    this.classList.add('selected');
                    
                    const questionNumber = parseInt(this.closest('.quiz-question').dataset.question);
                    answers[questionNumber] = this.dataset.value;
                });
            });
            
            nextBtn.addEventListener('click', function() {
                const activeQuestion = document.querySelector('.quiz-question.active');
                const questionNumber = parseInt(activeQuestion.dataset.question);
                
              
                const selected = activeQuestion.querySelector('.quiz-option.selected');
                if (!selected && nextBtn.textContent !== 'See Results') {
                    alert('Please select an option to continue.');
                    return;
                }
                
                if (questionNumber < questions.length) {
                    currentQuestion = questionNumber + 1;
                    showQuestion(currentQuestion);
                } else {
                    
                    quizQuestions.style.display = 'none';
                    quizResult.style.display = 'block';
                    calculateResult();
                }
            });
            
            prevBtn.addEventListener('click', function() {
                const activeQuestion = document.querySelector('.quiz-question.active');
                const questionNumber = parseInt(activeQuestion.dataset.question);
                
                if (questionNumber > 1) {
                    currentQuestion = questionNumber - 1;
                    showQuestion(currentQuestion);
                }
            });
            
            restartBtn.addEventListener('click', function() {
                quizResult.style.display = 'none';
                quizStart.style.display = 'block';
                
                document.querySelectorAll('.quiz-option').forEach(option => {
                    option.classList.remove('selected');
                });
                
                for (let key in answers) {
                    delete answers[key];
                }
            });
            
            function calculateResult() {
                const counts = { a: 0, b: 0, c: 0, d: 0 };
                for (let key in answers) {
                    counts[answers[key]]++;
                }
                
                let maxCount = 0;
                let maxType = '';
                for (let type in counts) {
                    if (counts[type] > maxCount) {
                        maxCount = counts[type];
                        maxType = type;
                    }
                }
                
                const resultTitle = document.querySelector('#quiz-result h3');
                const resultImage = document.querySelector('.quiz-image');
                const resultDesc = document.querySelectorAll('#quiz-result p');
                
                switch (maxType) {
                    case 'a':
                        resultTitle.textContent = 'You are: The Nature Guardian!';
                        resultImage.textContent = '🌱';
                        resultDesc[0].textContent = 'You have a deep connection with the natural world and are passionate about protecting biodiversity. Like Jane Goodall or David Attenborough, you understand that every species has an important role to play in our ecosystem.';
                        resultDesc[1].textContent = 'Your eco-strengths: Keen observation, patience, and a genuine love for all living things.';
                        resultDesc[2].textContent = 'How you can help: Start a school wildlife garden, organize nature walks, or participate in citizen science projects tracking local species.';
                        break;
                    case 'b':
                        resultTitle.textContent = 'You are: The Community Catalyst!';
                        resultImage.textContent = '👥';
                        resultDesc[0].textContent = 'You understand that environmental change requires collective action. Like Greta Thunberg or Wangari Maathai, you have the power to inspire others and build movements for positive change.';
                        resultDesc[1].textContent = 'Your eco-strengths: Leadership, communication, and bringing people together for a common cause.';
                        resultDesc[2].textContent = 'How you can help: Organize community clean-ups, start petitions for local environmental issues, or represent environmental concerns in student government.';
                        break;
                    case 'c':
                        resultTitle.textContent = 'You are: The Resourceful Innovator!';
                        resultImage.textContent = '♻️';
                        resultDesc[0].textContent = 'You see potential in everything and love finding creative solutions to environmental problems. Like William Kamkwamba or Boyan Slat, you believe in the power of hands-on innovation.';
                        resultDesc[1].textContent = 'Your eco-strengths: Creativity, resourcefulness, and practical problem-solving skills.';
                        resultDesc[2].textContent = 'How you can help: Start a school recycling program, create upcycled art projects, or design solutions for reducing waste in your school.';
                        break;
                    case 'd':
                        resultTitle.textContent = 'You are: The Eco Scientist!';
                        resultImage.textContent = '🔬';
                        resultDesc[0].textContent = 'You approach environmental challenges with a scientific mindset. Like Rachel Carson or Bill Nye, you value data and evidence in understanding and solving ecological problems.';
                        resultDesc[1].textContent = 'Your eco-strengths: Analytical thinking, research skills, and a drive to understand how things work.';
                        resultDesc[2].textContent = 'How you can help: Monitor your school\'s carbon footprint, conduct experiments on renewable energy, or start an environmental data collection project.';
                        break;
                }
            }
        });


        const form = document.getElementById("thanks");
        const successMessage =
            document.getElementById("congo");

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            successMessage.style.display = "block";
        });
    