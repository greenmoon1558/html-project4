import slider from "./scripts/slider";
import select from "./scripts/select";
import loadMore from "./scripts/load-more";
import scroll from "./scripts/scroll";
import "./scripts/setCurrenPageLink";
import "./scripts/imagesLazy";
document.addEventListener("DOMContentLoaded", () => {
    scroll();
    slider();
    select();
    loadMore(".gallery__images");
});

