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
export default  cards;