document.addEventListener("DOMContentLoaded", function(event) {
    var slides = document.querySelectorAll('.slide');
    var current_slide = 0;
    var increment_slide = function (increment) {
        var iframes, i, iframe_url;
        slides[current_slide].className = 'slide';
        slides[current_slide].classList.remove('showing');
        iframes = slides[current_slide].getElementsByTagName('iframe');
        for (i = 0; i < iframes.length; i++) {
            iframes[i].contentWindow.postMessage("hidden", "*");
        };
        current_slide = (current_slide+increment)%slides.length;
        slides[current_slide].classList.add('showing');
        iframe_url = undefined;
        iframes = slides[current_slide].getElementsByTagName('iframe');
        for (i = 0; i < iframes.length; i++) {
            iframes[i].contentWindow.postMessage("shown", "*");
            iframe_url = iframes[i].src;
        };
        if (iframe_url) {
            if (link_to_iframe_url) {
                link_to_iframe_url.remove();
            }
            link_to_iframe_url = document.createElement('a');
            link_to_iframe_url.href = iframe_url;
            link_to_iframe_url.target = '_blank';
            link_to_iframe_url.text = "Open in new tab";
            document.body.insertBefore(link_to_iframe_url, document.body.firstChild);
        }
        previous.disabled = (current_slide === 0);
        next.disabled     = (current_slide === slides.length-1);
    };
    var create_button = function (label) {
        var button = document.createElement('button');
        button.className = "slide-show-button";
        button.innerHTML = label;
        return button;
    };
    var next     = create_button('&#9654;&#xfe0f;');
    var previous = create_button('&#9664;&#xfe0f;');
    var tips     = document.getElementsByClassName('tip');
    var make_tip_button = function (tip) {
        var html = tip.innerHTML;
        tip.className = 'tip-button';
        tip.innerHTML = "TIP";
        tip.title     = "Click to get a tip. Click again to get rid of the tip.";
        tip.addEventListener('click',
                             function () {
                                 var popup    = document.createElement('div');
                                 var contents = document.createElement('div');
                                 var remove_popup = function () {
                                                        popup.remove();
                                                        document.body.removeEventListener('click', remove_popup);
                                                    };
                                 popup.className = 'popup';
                                 contents.innerHTML = html;
                                 popup.appendChild(contents);
                                 popup.title = "Click to get rid of me.";
                                 document.body.appendChild(popup);
                                 setTimeout(function () {
                                     document.body.addEventListener('click', remove_popup);
                                 });
                             });
    };
    var i, link_to_iframe_url;
    for (i = 0; i < tips.length; i++) {
        make_tip_button(tips[i]);
    }
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
