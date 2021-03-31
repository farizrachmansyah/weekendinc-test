class HelpAndTips {
  // Get data from API
  async getData() {
    try {
      const API_URL = 'https://wknd-take-home-challenge-api.herokuapp.com/help-tips';

      const data = await fetch(API_URL);
      let res = await data.json();

      // Take only the data that needed
      res = res.map(item => {
        const { image, title } = item;
        return { image, title };
      })

      return res;
    } catch (e) {
      console.log(e);
    }
  }
}

class UI {
  constructor() {
    this.helpTipsBody = document.querySelector('#helpTipsItems');
  }

  // Create the element markup for each data, gathered them in one place, and push it into they're parent element
  displayHelpTips(data) {
    let items = '';
    data.forEach(item => {
      items += `
      <div class="body__item">
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
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const helpTips = new HelpAndTips();

  helpTips.getData()
    .then(data => {
      ui.displayHelpTips(data);
    })
})