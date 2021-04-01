class API {
  // Get data from API
  async helpTipsData() {
    try {
      const API_URL = 'https://wknd-take-home-challenge-api.herokuapp.com/help-tips';

      const data = await fetch(API_URL);
      let res = await data.json();

      // Only take the data that needed
      res = res.map(item => {
        const { image, title } = item;
        return { image, title };
      })

      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async testimonialData() {
    try {
      const API_URL = 'https://wknd-take-home-challenge-api.herokuapp.com/testimonial'

      const data = await fetch(API_URL);
      let res = await data.json();

      // Only take the data that needed
      res = res.map(item => {
        const { testimony, by } = item;
        return { testimony, by };
      })

      return res;
    } catch (e) {
      console.log(e);
    }
  }
}

class UI {
  constructor() {
    this.windowWidth = window.innerWidth;
    this.helpTipsBody = document.querySelector('#helpTipsItems');
    this.carouselParent = document.querySelector('.testimoni__carousel');
  }

  // Create the element markup for each data, gathered them in one place, and push it into they're parent element
  displayHelpTips(data) {
    let items = '';
    data.forEach(item => {
      items += `
      <div class="body__item put-animation">
        <img src=${item.image} alt="image cover" class="body__item-cover" />
        <div class="body__item-content flex flex-ai-c flex-jc-sb">
          <h4 class="name">${item.title}</h4>
          <a href="#" class="btn-arrow">
            <img src="./dist/assets/oval-icon.svg" alt="arrow icon" />
          </a>
        </div>
      </div>
      `;
    });

    this.helpTipsBody.innerHTML = items;
  }

  displayTestimonial(data) {
    // create the owl carousel element
    const owlCarousel = document.createElement('div');
    owlCarousel.classList.add('owl-carousel');

    // create item element for the carousel
    let items = '';
    data.forEach(item => {
      items += `
      <div class="item">
        <div class="item__container">
          <h2 class="item__container-title">${item.by}</h2>
          <p class="item__container-desc">${item.testimony}</p>
        </div>
      </div>
      `;
    });

    // set the items into owl carousel element
    owlCarousel.innerHTML += items;

    // put the carousel into their parent
    this.carouselParent.appendChild(owlCarousel);
    // make the actual owl carousel effect
    this.makeOwlCarousel();
  }

  // Testimonial Slider
  makeOwlCarousel() {
    // get the margin manually for each caraousel item
    // this way is terrible, but i have no choice:')
    const itemMargin = this.getItemMargin();

    $('.owl-carousel').owlCarousel({
      loop: false,
      margin: itemMargin,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2,
          margin: itemMargin
        },
        1024: {
          items: 3,
          margin: itemMargin
        }
      }
    })
  }

  getItemMargin() {
    let margin = 0;

    if (this.windowWidth < 360) {
      margin = -31;
    } else if (this.windowWidth < 375) {
      margin = -72;
    } else if (this.windowWidth < 411) {
      margin = -86;
    } else if (this.windowWidth < 414) {
      margin = -123;
    } else if (this.windowWidth < 768) {
      margin = -126;
    } else if (this.windowWidth < 1024) {
      margin = -90;
    } else if (this.windowWidth < 1280) {
      margin = -23;
    }

    return margin;
  }
}

class EventListener {
  constructor() {
    this.letsgoBtn = document.querySelector('.btn-go');
  }

  // when users scrolling then the elements show up
  userScroll() {
    window.addEventListener('scroll', () => {
      this.scrollAppear();
    })
  }

  scrollAppear() {
    let animatedScrollAppear = document.querySelectorAll('.put-animation');
    animatedScrollAppear.forEach(element => {
      let thePosition = element.getBoundingClientRect().top;
      let screenPosition = window.innerHeight / 1.5;

      if (thePosition < screenPosition) {
        element.classList.add('show-animation');
      }
    });
  }

  // the button at landing page / hero section
  letsgoButton() {
    const theBtn = this.letsgoBtn;

    // give the button a click handle
    theBtn.addEventListener('click', () => {
      this.smoothScroll('.main', 1000);
    });
  }

  // a method to do smooth scrolling effect
  // honestly i got this function from DevEd
  smoothScroll(target, duration) {
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var startTIme = null;

    function animation(currentTime) {
      if (startTIme === null) startTIme = currentTime;
      var timeElapsed = currentTime - startTIme;
      var run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const API_DATA = new API();
  const events = new EventListener();

  API_DATA.helpTipsData()
    .then(data => {
      ui.displayHelpTips(data);
    });
  API_DATA.testimonialData()
    .then(data => {
      ui.displayTestimonial(data);
    });

  events.letsgoButton();
  events.userScroll();
})