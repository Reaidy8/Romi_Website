//  Scroll Animations
class ScrollAnimator {
  constructor() {
    this.isScrolling = false;
    window.addEventListener('scroll', this.throttledScroll.bind(this));
  }

  handleScrollAnimations() {
    const cards = document.querySelectorAll('.reason-card');
    const container = document.querySelector('.reasons-container');
    if (!container) return;

    const windowHeight = window.innerHeight;
    const containerRect = container.getBoundingClientRect();

    cards.forEach((card, index) => {
      card.classList.add('visible');
      if (containerRect.top < windowHeight * 0.3) {
        card.style.zIndex = 3 - index;
      } else if (containerRect.top < windowHeight * 0.6) {
        if (index === 1) card.style.zIndex = 3;
        else if (index === 0) card.style.zIndex = 2;
        else card.style.zIndex = 1;
      } else {
        if (index === 2) card.style.zIndex = 3;
        else if (index === 1) card.style.zIndex = 2;
        else card.style.zIndex = 1;
      }
      card.style.transform = '';
      card.style.opacity = '';
      card.style.visibility = '';
    });
  }

  throttledScroll() {
    if (!this.isScrolling) {
      window.requestAnimationFrame(() => {
        this.handleScrollAnimations();
        this.isScrolling = false;
      });
      this.isScrolling = true;
    }
  }
}

//Robot Navigation
class RobotNavigator {
  constructor() {
    this.currentRobotIndex = 0;
    this.totalRobots = 3;
    this.robotNames = ['ROMI Care', 'ROMI Home', 'ROMI Play'];
    this.init();
  }

  changeRobot(direction) {
    this.currentRobotIndex = (this.currentRobotIndex + direction + this.totalRobots) % this.totalRobots;
    
    this.updateRobotDisplay();
    
    this.updateNavigationButtons();
  }

  updateRobotDisplay() {
    const robotDetails = document.querySelectorAll('.robot-detail');
    const robotCounter = document.querySelector('.robot-counter');
    
    robotDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    

    if (robotDetails[this.currentRobotIndex]) {
        robotDetails[this.currentRobotIndex].classList.add('active');
    }
    

    if (robotCounter) {
        robotCounter.textContent = `${this.currentRobotIndex + 1}/${this.totalRobots}`;
    }
  }

  updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    

    if (prevBtn && nextBtn) {
        prevBtn.classList.toggle('active', this.currentRobotIndex === 0);
        nextBtn.classList.toggle('active', this.currentRobotIndex === this.totalRobots - 1);
    }
  }

  init() {
    window.changeRobot = this.changeRobot.bind(this);
    this.updateRobotDisplay();
    this.updateNavigationButtons();
  }
}

//Profile/Index Page Logic
class ProfileIndexLogic {
  constructor() {
    this.init();
  }

  init() {
    this.setupProfileRouting && this.setupProfileRouting();
    this.handleProfileToggle && this.handleProfileToggle();
    this.autofillRegisterForm && this.autofillRegisterForm();
  }

}

// Register and Sign In form validation (profile.html)
document.addEventListener('DOMContentLoaded', () => {
  // Register form
  const registerForm = document.querySelector('#registerCard form');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      const email = document.getElementById('registerEmail').value.trim();
      if (!email) {
        alert('Please enter your email address.');
        e.preventDefault();
      }
    });
  }
  // Sign In form
  const signInForm = document.querySelector('#signInCard form');
  if (signInForm) {
    signInForm.addEventListener('submit', function(e) {
      const email = document.getElementById('loginEmail').value.trim();
      if (!email) {
        alert('Please enter your email address.');
        e.preventDefault();
      }
    });
  }

  // See it for yourself
  const requestAccessBtn = document.getElementById('request-access-btn');
  if (requestAccessBtn) {
    requestAccessBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const name = document.getElementById('request-name').value.trim();
      const email = document.getElementById('request-email').value.trim();
      if (!name || !email) {
        alert('Please fill in your full name and email address.');
        return;
      }
      const params = new URLSearchParams({ name, email });
      window.location.href = `profile.html?${params.toString()}#register`;
    });
  }
});

// Hash-based routing for profile.html 
document.addEventListener('DOMContentLoaded', () => {
  const registerCard = document.getElementById('registerCard');
  const signInCard = document.getElementById('signInCard');
  function showCorrectCard() {
    if (!registerCard || !signInCard) return;
    if (window.location.hash === '#signin') {
      registerCard.style.display = 'none';
      signInCard.style.display = 'block';
    } else {
      signInCard.style.display = 'none';
      registerCard.style.display = 'block';
    }
  }
  window.addEventListener('hashchange', showCorrectCard);
  showCorrectCard();
});



document.addEventListener('DOMContentLoaded', () => {
  new ScrollAnimator().handleScrollAnimations();
  new RobotNavigator();
  new ProfileIndexLogic();

  // Joke of the Day logic
  const jokeEl = document.getElementById('joke-of-day');
  const authorEl = document.getElementById('joke-of-day-author');
  const btn = document.getElementById('get-new-joke-btn');
  const jokes = [
    { joke: "Why don't robots ever panic? Because they have great byte control!", author: "AI Humorist" },
    { joke: "What do you call a robot who takes the long way around? R2-Detour!", author: "Star Tech" },
    { joke: "Why was the robot angry? Someone kept pushing his buttons!", author: "Bot Banter" },
    { joke: "What's a robot's favorite type of music? Heavy metal!", author: "DJ Cyborg" },
    { joke: "Why don't robots ever get tired? They're always charged up!", author: "Circuit Standup" },
    { joke: "What do you call a robot that loves to dance? A break-dancing bot!", author: "DanceBot" },
    { joke: "Why did the robot go to therapy? It had too many bugs in its system!", author: "Debug Dave" }
  ];
  let lastIndex = -1;
  function showRandomJoke() {
    let idx;
    do {
      idx = Math.floor(Math.random() * jokes.length);
    } while (jokes.length > 1 && idx === lastIndex);
    lastIndex = idx;
    const random = jokes[idx];
    jokeEl.textContent = random.joke;
    authorEl.textContent = random.author ? `— ${random.author}` : '';
  }
  if (jokeEl && authorEl) {
    showRandomJoke();
    if (btn) {
      btn.addEventListener('click', showRandomJoke);
    }
  }
});

// ROMI Wisdom Quote Card API Ninjas integration 
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.quote-card')) {
    fetch("https://api.api-ninjas.com/v1/quotes", {
      headers: {
        'X-Api-Key': 'GntKhqiA063SbCdyV00cRA==BiAxP4NbJMTB7twW'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`API returned status ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data.length > 0 && data[0].quote) {
        document.getElementById("quote").innerText = `"${data[0].quote}"`;
        document.getElementById("author").innerText = `– ${data[0].author}`;
      } else {
        document.getElementById("quote").innerText = "No quote available at the moment.";
      }
    })
    .catch(error => {
      document.getElementById("error-message").innerText = "⚠️ Failed to load quote. Try again later.";
      console.error("API error:", error);
    });
  }
}); 