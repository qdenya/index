'use strict';

const cardsRestaurans = document.querySelector(".main_slider");

const getData = async function(url) {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Ошибка по адресу ${url}, 
    статус ошибка ${response.status}.`)
  }

  return await response.json();
};

function createCardRestaurant(projects) {

  const { name, 
          text, 
          count_time, 
          type_project,
          link_photo,
          links
        } = projects;
  let title_btn;
  switch (type_project) {
    case "seen":
      title_btn = "Посмотреть";
      break;
    case "demo":
      title_btn = "Демо";
      break;  
  
    default:
      break;
  }      
  const card = `
  <div class="swiper-slide main_slide">
    <div class="main_slide_info">
      <img src="${link_photo}" alt="${name}" class="main_slide_foto">
      <a href="${links}" target="_blank" class="main_slide_link ${type_project}">${title_btn}</a>
    </div>
    <div class="main_slide_texts">
      <div class="main_slide_texts_gen">
        <p class="main_slide_name">${name}</p>
        <p class="main_slide_text">${text}</p>
      </div>
      <div class="main_slide_texts_res">
        <p class="main_slide_text">Срок: ${count_time}</p>
      </div>
    </div>
  
  </div>
  `;

  cardsRestaurans.insertAdjacentHTML('beforeend', card);
}

function init() {
  getData('./projects.json').then(function(data) {
  data.forEach(createCardRestaurant);
  });

  
}


init();

