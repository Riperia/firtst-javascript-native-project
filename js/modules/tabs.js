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
export default  tabs;