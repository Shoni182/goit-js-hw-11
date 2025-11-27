import './scss/main.scss';
import Granim from 'granim';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

let granimInstance = new Granim({
  element: '#granim-canvas',
  name: 'granim',
  opacity: [1, 1],
  states: {
    'default-state': {
      gradients: [
        ['#834D9B', '#D04ED6'],
        ['#1CD8D2', '#93EDC7'],
      ],
    },
  },
});

const refs = {
  form: document.querySelector('.form'),
};

const { form } = refs;

form.addEventListener('submit', evt => {
  evt.preventDefault();
  showLoader();

  window.addEventListener('resize', function () {
    // Цей метод змушує Granim перерахувати розміри canvas
    // і оновити градієнт відповідно до нових розмірів.
    granimInstance.changeSize();
  });

  const formData = new FormData(form);
  const query = formData.get('search-text').trim();

  clearGallery();
  form.reset();

  getImagesByQuery(query)
    .then(res => {
      const animArr = res.data.hits;
      if (animArr.length === 0) {
        return Promise.reject(error);
      }
      createGallery(animArr);
      hideLoader();
    })
    .catch(error => {
      hideLoader();
      iziToast.show({
        messageSize: '20',
        message: `Sorry, there are no images matching your search query. Please try again!`,
        position: 'center',
        close: true,
        closeOnEscape: true,
        theme: 'light',
        color: 'red',
      });
    });
});
