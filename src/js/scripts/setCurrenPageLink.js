function highlightCurrent() {
    const curPage = document.URL;
    const links = document.querySelectorAll("a.menu__link");
    for (let link of links) {
        if (link.href == curPage) {
            link.classList.add("active");
        }
    }
}


document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        highlightCurrent()
    }
};