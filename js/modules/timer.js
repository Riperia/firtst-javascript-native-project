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
export default  timer;