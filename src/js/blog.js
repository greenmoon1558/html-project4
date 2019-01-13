import scroll from "./scripts/scroll";
import loadMore from "./scripts/load-more";
import "./scripts/setCurrenPageLink";
document.addEventListener("DOMContentLoaded", () => {
    scroll();
    loadMore(".posts__three-columns");
});
