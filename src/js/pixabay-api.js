import axios from 'axios';

// getImagesByQuery(query).Ця функція повинна приймати один параметр
// query(пошукове слово, яке є рядком), здійснювати
// HTTP - запит і повертати значення властивості data з отриманої відповіді.

const refs = {
  form: document.querySelector('.form'),
  galleryElem: document.querySelector('.gallery'),
};

// Дуструктуризація
const { form, galleryElem } = refs;

//- функція для скорочення  викликаємо  server.get()
const server = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '53374429-639c77152d70b3fe75f006246',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

// export додати пізніше
//? Звуваження: забув вставити в get пустий рядок. де повинне бути посилання.
//? та параметер. так як це обʼєкт то потрібно вказати шлях до ключа!
function getImagesByQuery(query) {
  return server.get('', {
    params: {
      q: query,
    },
  });
}

//: Запит на сервер

form.addEventListener('submit', evt => {
  evt.preventDefault();
  const formData = new FormData(form);
  const query = formData.get('search-text');

  getImagesByQuery(query)
    .then(res => {
      const animArr = res.data.hits;
      console.log(animArr);

      const markup = createGallery(animArr);

      galleryElem.innerHTML = markup;
      lightbox.refresh();

      console.log('Server Good ✅ ', res);
    })
    .catch(error => {
      console.log('Server error ❗️ ', error);
    });

  //   form.reset();
});

function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <li class="list-item">
        <div class="item-container">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}">
          </a>
          <div class="desc-container">
            <p class="item-title">Likes <span item-num>${likes}</span></p>
            <p class="item-title">Views <span item-num>${views}</span></p>
            <p class="item-title">Comments <span item-num>${comments}</span></p>
            <p class="item-title">Downloads <span item-num>${downloads}</span></p>
          </div>
        </div>
      </li>`;
}

function createGallery(images) {
  return images.map(imageTemplate).join('');
}
let lightbox = new SimpleLightbox('.gallery a');

// clearGallery();
// showLoader();
// hideLoader();
