document.addEventListener("DOMContentLoaded", function(event) {
    var slides = document.querySelectorAll('.slide');
    var current_slide = 0;
    var increment_slide = function (increment) {
        var iframes, i;
        slides[current_slide].className = 'slide';
//         slides[current_slide].style.opacity = 0;
        slides[current_slide].classList.remove('showing');
        iframes = slides[current_slide].getElementsByTagName('iframe');
        for (i = 0; i < iframes.length; i++) {
            iframes[i].contentWindow.postMessage("hidden", "*");
        };
        current_slide = (current_slide+increment)%slides.length;
        slides[current_slide].classList.add('showing');
        iframes = slides[current_slide].getElementsByTagName('iframe');
        for (i = 0; i < iframes.length; i++) {
            iframes[i].contentWindow.postMessage("shown", "*");
        };
        previous.disabled = (current_slide === 0);
        next.disabled     = (current_slide === slides.length-1);
//         slides[current_slide].style.opacity = 1;
    };
    var create_button = function (label) {
        var button = document.createElement('button');
        button.className = "slide-show-button";
        button.innerHTML = label;
        return button;
    };
    var next     = create_button('&#9654;&#xfe0f;');
    var previous = create_button('&#9664;&#xfe0f;');
    document.body.insertBefore(previous, document.body.firstChild);
    document.body.insertBefore(next,     document.body.firstChild);
    next    .addEventListener('click', function () {
        increment_slide(1);
    });
    previous.addEventListener('click', function () {
        increment_slide(-1);
    });
    increment_slide(0);
});
