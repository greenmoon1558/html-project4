import select from "./scripts/select";
import loadMore from "./scripts/load-more";
import scroll from "./scripts/scroll";
document.addEventListener("DOMContentLoaded", () => {
  scroll();
  select();
  loadMore(".gallery__images");
});
