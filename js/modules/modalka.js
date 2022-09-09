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
export default  modalka;
export {closeModal};
export {openModal};