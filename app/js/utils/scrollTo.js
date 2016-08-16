module.exports = scrollTo;


function scrollTo(x, y) {
    try {
        window.scrollTo(x, y);
    } catch (e) {}
}
