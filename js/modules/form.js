import {closeModal,openModal} from './modalka'
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
        openModal('.modal');
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
            closeModal('.modal');
        }, 4000)
    }
}
export default form;
