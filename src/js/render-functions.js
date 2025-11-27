import SimpleLightbox from 'simplelightbox';

let refs = {
  galleryElem: document.querySelector('.gallery'),
};
const { galleryElem } = refs;

let loader = null;

function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  let tagsText = tags.split(',').slice(0, 3);

  return `
  <li class="list-item">
        <div class="item-container">
        <a href="${largeImageURL}" class="">
          <img src="${webformatURL}" alt="${tagsText}" class="item-img">
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

export function createGallery(images) {
  const markup = images.map(imageTemplate).join('');
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.85,
  });
  galleryElem.innerHTML = markup;
  lightbox.refresh();
  return markup;
}

export function clearGallery() {
  galleryElem.innerHTML = '';
}

export function showLoader() {
  if (!loader) {
    const markup = `<div class="loader"></div>`;
    galleryElem.insertAdjacentHTML('beforebegin', markup);
    loader = document.querySelector('.loader');
  }
}

export function hideLoader() {
  if (loader) {
    loader.remove();
    loader = null;
  }
}
