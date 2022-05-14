const galleryControls = ['previous', 'add', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');
const carouselArray = [...galleryItems];
const prev = document.querySelector('.gallery-control-prev');
const next = document.querySelector('.gallery-control-next');

// los diferentes títulos de las fotos con una variable que cambia cual aparece
let footerIndex = 0;
const footerItems = [
  'Consectetur Magnam sit corporis quidem',
  'Lorem ipsum dolor sit',
  'Amet consectetur adipisicing elit',
  'Illo aliquid officiis',
  'In ducimus nisi',
  'Nam dolor aperiam itaque',
  'Quas voluptates blanditiis maiores'
];

// se ejecuta al iniciar el script
function setFooter() {
  let footer = document.querySelector('#carousel-footer-container > .carousel-footer');
  footer.innerHTML = footerItems[footerIndex];
}

let bool = null;

// se agrega el desvanecimiento al texto, usando el valor de null que cambia cada vez que la animación termina
function addFade() {
  let carouselFooterCont = document.querySelector('#carousel-footer-container');
  if (bool != true) {
    bool = true;
    carouselFooterCont.style.animation = 'fadeinout 1s linear none'
    // acá se debe eliminar la animación cuando termina para que pueda iniciar de nuevo, elimina esta linea y verás que ocurre
    setTimeout(() => {
      carouselFooterCont.style.animation = 'none';
      bool = false;
    }, 1000)
  }
}

// se modifica el texto, usando el valor de null que cambia cada vez que la animación termina
function changeFooter(i) {
  if (bool != true) {
    addFade(); // se invoca la función que agrega el desvanecimiento
    setTimeout(() => {
      let footer = document.querySelector('#carousel-footer-container > .carousel-footer');
      footer.innerHTML = footerItems[footerIndex];
      
      // se cambia el valor de la variable
      footerIndex += i
      if (footerIndex == footerItems.length) { footerIndex -= footerIndex }
      if (footerIndex < 0) { footerIndex += footerItems.length }
    }, 500)
  }
}

/** se agregan eventos a los botones; la variable bool sirve para que no se pueda ejecutar otra animación antes que
esta termina
*/

prev.addEventListener('click', () => {
  if (bool != true) {

    carouselArray[0].style.transition = 'transform 1s';
    carouselArray[carouselArray.length - 1 ].style.transition = 'none';

    setCurrentState(prev);
    changeFooter(-1)
  }
})

next.addEventListener('click', () => {
  if (bool != true) {

    carouselArray[0].style.transition = 'none';
    carouselArray[carouselArray.length - 1].style.transition = 'transform 1s';

    setCurrentState(next);
    changeFooter(1)
  }
})

// se elimina la clases anterior y se reemplaza
function updateGallery() {
  carouselArray.forEach(el => {
    el.classList.remove(el.classList[1]);
  });

  // here every elemento rotates and gets the style of the earliest who was in the same place
  carouselArray.slice(0, 7).forEach((el, i) => {
    el.classList.add(`gallery-item-${i + 1}`);
  });

}

// Update the current order of the carouselArray and gallery, here are passed the buttons
function setCurrentState(direction) {

  if (direction.classList[0] == 'gallery-control-prev') {
    carouselArray.unshift(carouselArray.pop()); // the last element is added at the beginning
  } else {
    carouselArray.push(carouselArray.shift()); // the first element is added at the end
  }

  updateGallery();
}

setFooter();