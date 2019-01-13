import scroll from "./scripts/scroll";
import loadMore from "./scripts/load-more";
import "./scripts/setCurrenPageLink";
import "./scripts/imagesLazy";
document.addEventListener("DOMContentLoaded", () => {
    scroll();
    loadMore(".posts__three-columns");
});
