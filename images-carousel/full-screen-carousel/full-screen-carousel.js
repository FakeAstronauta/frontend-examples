const prev = document.querySelector('#prevBtn');
const next = document.querySelector('#nextBtn');

let carouselItems = document.querySelectorAll('#container > .abs');
let carouselArray = [...carouselItems]; 

let bool = null;
let counter = 0;

var dots = document.getElementsByClassName("dot");
var buttons = document.getElementsByClassName('btn-play-pause');
var dotsTwo = document.getElementsByClassName('dot-two')

/** la funcion de los botones de navegación, llama la función que mueve imágen según el botón presionado; eliminan
 *  la animación del elemenentoque se traslada al otro lado y modifican la apariencia de los puntos*/

prev.addEventListener('click', () => {
    if (bool != true) {
        bool = true;

        carouselArray[carouselArray.length - 1].style.transition = 'none';
        carouselArray[0].style.transition = 'transform 0.3s';

        setCurrentState(prev);

        counter--;
        if(counter < 0){counter = dots.length - 1}
        changeDotAppearence(counter)
    }
})

next.addEventListener('click', () => {
    if (bool != true) {
        bool = true;

        carouselArray[0].style.transition = 'none';
        carouselArray[carouselArray.length - 1].style.transition = 'transform 0.3s';
        
        setCurrentState(next);

        counter++;
        if(counter == dots.length){counter = 0}
        
        changeDotAppearence(counter)
    }
})


// se elimina la clases anterior y se reemplaza 
function updateGallery() {
    carouselArray.forEach(el => {
        el.classList.remove(el.classList[2]);
    });

    carouselArray.slice(0, 7).forEach((el, i) => {
        el.classList.add(`gallery-item-${i + 1}`);
    });
}

// se ordenan los elementos según el botón presionado
function setCurrentState(direction) {
    if (direction.id == 'prevBtn') {
        carouselArray.unshift(carouselArray.pop()); // el último elemento se agrega al principio
    } else {
        carouselArray.push(carouselArray.shift()); // el primer elemento se agrega al final
    }
    
    updateGallery();
    
    setTimeout(() => {
        bool = false;
    }, 300)
}


// cambia la apariencia de los puntos
function changeDotAppearence(n) {
        // este loop le da el color original a todos los puntos
        for (var i = 0; i < dots.length; i++) {
            dots[i].style.background = 'rgba(255, 255, 255, 0.562)';
        }
        for (var i = 0; i < dots.length; i++) {
            dots[i].style.width = '5px';
        }
        for (var i = 0; i < dots.length; i++) {
            dots[i].style.borderRadius = '20px';
        }

        dots[n].style.background = 'rgba(255, 255, 255)';
        dots[n].style.width = '10px';
        dots[n].style.borderRadius = '10px';
    
}

/** la funcion de los puntos, mueve cada imágen, según el botón presionado; elimina la animación del elemenento
que se traslada al otro lado */

function moveEachOne(num){
    if (bool != true) {

        let elem = document.querySelector(`div[class*=elem-${num}]`)
        let obj = elem.getBoundingClientRect();
                
        if (obj.x > 0) {
            carouselArray[0].style.transition = 'none';
            elem.style.transition = 'transform 0.3s';
            bool = true;
            
            setCurrentState(next);
        } else if (obj.x < 0) {
            carouselArray[carouselArray.length - 1].style.transition = 'none';
            elem.style.transition = 'transform 0.3s';
            bool = true;

            setCurrentState(prev);
        }

        changeDotAppearence(num - 1);
    }

}

// cambia la apariencia del botón play/pause
function change_button(event, n) {
    if (event.type == 'mousedown') {
        if (n == 1) {
            buttons[0].src = 'header/icons/pause_circle_filled_blue_24dp.svg';
        } else if (n == 0) {
            buttons[1].src = 'header/icons/play_circle_filled_blue_24dp.svg';
        }
    }

    if (event.type == 'mouseup') {
        if (n == 0) {
            buttons[0].src = 'header/icons/pause_circle_filled_white_24dp.svg';
            startCarousel();
        } else if (n == 1) {
            buttons[1].src = 'header/icons/play_circle_filled_white_24dp.svg';
            clearInterval(runner);
        }

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = 'none';
        }
        buttons[n].style.display = 'block';
    }
}

// mantiene el carrusel girando
function startCarousel() {
    // runner es la variable que se llama cuando se cancela el setInterval
    runner = setInterval(function () {
        carouselArray[0].style.transition = 'none';
        carouselArray[carouselArray.length - 1].style.transition = 'transform 0.3s';
        setCurrentState(next);
    }, 7000);
}

let header =  document.querySelector('#header')
window.onresize = () => {
    title.innerHTML = window.innerWidth;
}
    

// acá inicia todo
startCarousel(); 
changeDotAppearence(1);
// 190 lines