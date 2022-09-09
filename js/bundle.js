/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const result = document.querySelector(".calculating__result span");

  let sex, height, weight, age, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }
  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }
  function initalSettind(selector, activeclass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.classList.remove(activeclass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeclass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeclass);
      }
    });
  }
  initalSettind("#gender div", "calculating__choose-item_active");
  initalSettind(
    ".calculating__choose_big div",
    "calculating__choose-item_active"
  );

  console.log(sex);
  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "нужно Заполнить форму";
      return;
    }
    if (sex === "female") {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
      );
    }
  }

  calcTotal();
  function getInfo(parent, activeClass) {
    const elements = document.querySelectorAll(parent);
    elements.forEach((elem) => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
          console.log(ratio);
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", e.target.getAttribute("id"));
        }
        console.log(ratio, sex);
        elements.forEach((elem) => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }
  getInfo("#gender div", "calculating__choose-item_active");
  getInfo(".calculating__choose_big div", "calculating__choose-item_active");
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }
      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
    class MenuCad {

        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.transt = 27;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.convertertoUan();

        }

        convertertoUan(dlr) {
            this.price = this.price * this.transt;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.elementa = 'menu__item';
                element.classList.add(this.elementa)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
       <img src=${this.src} alt=${this.alt}>
       <h3 class="menu__item-subtitle">${this.title}</h3>
       <div class="menu__item-descr">${this.description}</div>
       <div class="menu__item-divider"></div>
       <div class="menu__item-price">
           <div class="menu__item-cost">Цена:</div>
           <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
       </div>
   `;
            this.parent.append(element);
        }

    }
    const getResource = async (url) => {
        const res = await fetch(url)
    if(!res.ok){
        throw new Error(`Cound not fetch ${url},status ${res.status}`);
    }
        return await res.json();
    };

   axios.get('http://localhost:3000/menu')
   .then(data=> {
    data.data.forEach(({img,alt,title,descr,price})=>{
  new MenuCad(img,alt,title,descr,price,'.menu .container',
  'menu__item').render();
    });
});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modalka__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalka */ "./js/modules/modalka.js");

function form (){
    const forms = document.querySelectorAll('form');
    const message = {
        load: 'img/form/spinner.svg',
        success: 'Все збс',
        failure: 'Ошибочка маладой'
    };
    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindpostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('img');
            statusMessage.src = message.load
            statusMessage.style.cssText = `
display:block;
margin:0 auto`;
            form.insertAdjacentElement('afterend', statusMessage);





            const formData = new FormData(form);
            
           const json = JSON.stringify(Object.fromEntries(formData.entries()));
           console.log(json);

            
                postData('http://localhost:3000/requests',json)
                .then(data => {
                    console.log(data);
                    shwoThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    shwoThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })
        });
    }

    function shwoThanksModal(message) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.style.display = 'none';
        document.body.style.overflow = '';
        (0,_modalka__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal');
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `<div class="modal__content">
  <div class="modal__close" data-close>x</div>
  <div class="modal_title">${message}</div>
  </div>
  `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.style.display = 'block';
            document.body.style.overflow = '';
            (0,_modalka__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000)
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modalka.js":
/*!*******************************!*\
  !*** ./js/modules/modalka.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}


function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modalka(triggerSelector,modalSelector){
const btnmodal = document.querySelectorAll(triggerSelector);
const modal = document.querySelector(modalSelector);



btnmodal.forEach(btn => {
    btn.addEventListener('click',()=> openModal(modalSelector));
})


modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal(modalSelector);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display == 'block') {
        closeModal(modalSelector);
    }
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        openModal(modalSelector);
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modalka);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
    const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slisdeWrapper = document.querySelector('.offer__slider-wrapper'),
    sildesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slisdeWrapper).width;
  
    let slideIndex = 1;
    let offset = 0;
  
    sildesField.style.width = 100*slides.length + '%';
    sildesField.style.display='flex';
    sildesField.style.transition ='0.5s all';
    slisdeWrapper.style.overflow ='hidden';
    slides.forEach(slide=>{
      slide.style.width=width;
    })
    
    next.addEventListener('click',()=>{
      if(offset== (+width.replace(/\D/g,'')*(slides.length -1))){
          offset = 0;
      }else{
          offset+= +width.replace(/\D/g,'');
      }
    sildesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
  } else {
      slideIndex++;
  }
  current.textContent =  `0${slideIndex}`;
    });
    prev.addEventListener('click',()=>{
      if( offset == 0){
          offset = +width.replace(/\D/g,'')*(slides.length -1)
      }else{
          offset-= +width.replace(/\D/g,'');
      }
    sildesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
  } else {
      slideIndex--;
  }
  current.textContent =  `0${slideIndex}`;
  
    });
  
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent =  `0${slideIndex}`;
  } else {
      total.textContent = slides.length;
      current.textContent =  slideIndex;
  }   
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
let tabs = document.querySelectorAll('.tabheader__item');
let tabsContent = document.querySelectorAll('.tabcontent');
let tabsParent = document.querySelector('.tabheader__items');
let blockelements = document.querySelectorAll('.timer__block');

function hideTabContent() {
    tabsContent.forEach(item => {
        item.style.display = 'none';
    });
    tabs.forEach(tab => {
        tab.classList.remove('tabheader__item_active');
    });

}

function showTabContent(i = 0) {
    tabsContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
};
hideTabContent();
showTabContent();

tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(){
    function setTimer(selector) {
        const timenow = new Date();
        const timer = document.querySelector(selector);
        let days = timer.querySelector('#days');
        let hours = timer.querySelector('#hours');
        let minutes = timer.querySelector('#minutes');
        let seconds = timer.querySelector('#seconds');
        days.textContent = timenow.getDay();
        hours.textContent = timenow.getHours();
        minutes.textContent = timenow.getMinutes();
        seconds.textContent = timenow.getSeconds();
    }

    function timer() {
        setTimer('.timer');
        const timeInterval = setInterval(timer, 1000);
    }

    timer();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modalka__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modalka */ "./js/modules/modalka.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {
     (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
     (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
     (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
     (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
     (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])();
     (0,_modules_modalka__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-modal]','.modal');
     (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])();



});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map