class Select {
  constructor(select) {
    let designedSecelt = select.querySelector(".gallery__filter");
    let designedOptions = [...designedSecelt.children];
    designedOptions.forEach(item =>
      item.addEventListener("click", this.click.bind(this))
    );
  }

  click(e) {
    this.images = [...document.querySelectorAll(".gallery__img")];
    e = e || window.event;
    let target = e.target || e.srcElement;
    this.setActiveFilterItem(target);
    this.checkActiveTag(target.dataset.type);
  }

  checkActiveTag(type) {
    type.indexOf("all") > -1
      ? this.displayAllFilterItems()
      : this.displaySpecialItems(type);
  }

  displaySpecialItems(type) {
    this.images.forEach(item => {
      this.checkTag(item, type)? (item.classList.contains("js-hide") ? item.classList.remove("js-hide") : null) : item.classList.add("js-hide");
      
    });
  }

  checkTag(item, type) {
    return Boolean(item.dataset.type.indexOf(type) > -1);
  }

  displayAllFilterItems() {
    [...document.querySelectorAll(".gallery__img.js-hide")].forEach(item => {
      item.classList.remove("js-hide");
    });
  }

  setActiveFilterItem(target) {
    let activeElements = [...document.querySelectorAll(".filter__item--active")];
    activeElements.forEach(elem =>
      elem.classList.remove("filter__item--active")
    );
    target.classList.add("filter__item--active");
  }
}

// document.addEventListener("DOMContentLoaded", );

export default () => {
  let select = [...document.querySelectorAll(".select")];
  select.forEach(item => new Select(item));
};