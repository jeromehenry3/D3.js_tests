app = {
    init: () => {
        console.log('init');
        let rect = document.querySelector("rect");
        rect.addEventListener("click", app.move);
    },
    move: (e) => {
        console.log(e.target.x);
        e.target.style.x = 10;
    }

}

document.addEventListener("DOMContentLoaded", app.init);