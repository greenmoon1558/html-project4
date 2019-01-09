//gallery__btn load-more

function loadMoreCap() {
    let loadMoreBtns = [...document.querySelectorAll(".load-more")];
    loadMoreBtns.forEach(element => element.onclick = () => {
        click();
    });
    function click() {
        let gallery = [...document.querySelector(".gallery__images").children],
            imagesName = "";
        gallery.forEach((row) => {
            [...row.children].forEach((elem) => {
                if (imagesName.indexOf(elem.src) == -1) {
                    row.appendChild(elem.cloneNode(true));
                    imagesName += elem.src;
                }
            });
        });
    } 
}

export default loadMoreCap;
