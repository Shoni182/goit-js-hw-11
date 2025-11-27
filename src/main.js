import './scss/main.scss';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoaderLonger,
  loadGranim,
} from './js/render-functions';

//: пошук DOM елементів
const refs = {
  form: document.querySelector('.form'),
};

//: деструктуризація
const { form } = refs;

document.addEventListener('DOMContentLoaded', () => {
  loadGranim();
});

//: прослуховувач submit
form.addEventListener('submit', evt => {
  evt.preventDefault();

  showLoader();
  const formData = new FormData(form);
  const query = formData.get('search-text');

  if (query.includes(' ')) {
    hideLoaderLonger();

    clearGallery();
    form.reset();
    return iziToast.show({
      messageSize: '20',
      message: `Будь ласка введіть назву фото!`,
      position: 'center',
      close: true,
      closeOnEscape: true,
      theme: 'light',
      color: 'yellow',
    });
  }

  clearGallery();
  form.reset();

  //: Проміс
  getImagesByQuery(query)
    .then(res => {
      const dataArr = res.data.hits;

      if (dataArr.length === 0) {
        return Promise.reject();
      }
      createGallery(dataArr);
      loadGranim();
      hideLoader();
    })
    .catch(() => {
      hideLoaderLonger();
      iziToast.show({
        messageSize: '20',
        message: `На жаль, немає зображень, що відповідають вашому пошуковому запиту. Спробуйте ще раз!`,
        position: 'center',
        close: true,
        closeOnEscape: true,
        theme: 'light',
        color: 'orange',
      });
    });
});
