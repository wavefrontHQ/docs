$(document).ready(function () {
    if (window.location.pathname.includes("index") || window.location.pathname === "/") {
        document.querySelector("#tg-sb-content").classList.add("index-page-content")
    }
});
