//gallery__btn load-more

function loadMoreCap(loadItemsClass) {
  let loadMoreBtns = [...document.querySelectorAll(".load-more")];
  loadMoreBtns.forEach(
    element =>
      (element.onclick = () => {
        click(loadItemsClass);
      })
  );
  function click(loadItemsClass) {
    let gallery = [...document.querySelector(loadItemsClass).children];

    gallery.forEach(row => {
      [...row.children].forEach(elem => {
        try {
          let checker =
            loadItemsClass.indexOf("images") != -1 ? checkImg() : checkPost();
          if (checker(elem)) {
            let cloneElement = elem.cloneNode(true);
            if (!cloneElement.classList.contains("js-animate"))
              cloneElement.classList.add("js-animate");
            row.appendChild(cloneElement);
          }
        } catch (e) {
          console.error(e.name + ": " + e.message);
        }
      });
    });
  }
  function checkImg() {
    let imagesName = "";
    return function(elem) {
      if (imagesName.indexOf(elem.src) == -1) {
        imagesName += elem.src;
        return true;
      }
      return false;
    };
  }
  function checkPost() {
    let classNames = "";
    return function(elem) {
      let postNumberClass = [...elem.classList].find(
        elem => elem.indexOf("post--") != -1
      );
      if (classNames.indexOf(postNumberClass) == -1) {
        classNames += postNumberClass;
        return true;
      }
      return false;
    };
  }
}

export default loadMoreCap;
