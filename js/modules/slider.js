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
export default slider;