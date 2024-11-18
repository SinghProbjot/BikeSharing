$(document).ready(function(){
    
    var previousScroll = 0;
    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();
        if (currentScroll > 0 && currentScroll < $(document).height() - $(window).height()){
            if (currentScroll > previousScroll){
                window.setTimeout(hideNav, 100);
            } else {
                window.setTimeout(showNav, 100);
            }
            previousScroll = currentScroll;
        }
    });

    function hideNav() {
    $("[data-nav-status='toggle']").removeClass("is-visible").addClass("is-hidden");
    }
    function showNav() {
    $("[data-nav-status='toggle']").removeClass("is-hidden").addClass("is-visible");
    }
    DownloadLink()
    Smooth()

});

(function () { //Calcola la dimensione dello schermo ogni volta che viene cambiata e assegna la dimensione alla class full
    var width = screen.width, height = screen.height;
    setInterval(function () {
        if (screen.width !== width || screen.height !== height) {
            width = screen.width;
            height = screen.height;
            $(window).trigger('resolutionchange');  
        }
        $('.full').css({"min-height" : ($(window).height() + 10)});
    }, 50);
}());

function DownloadLink() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) 
        $('.download').attr("href","https://www.microsoft.com/it-it/store/apps");
    else if (/android/i.test(userAgent))
        $('.download').attr("href","https://play.google.com/store/apps/");
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) 
        $('.download').attr("href","https://itunes.apple.com/it/");
    else
        $('.download').attr("href","https://www.microsoft.com/it-it/store/b/home");
}

function Smooth() { //Smooth scroll per i browser non compatibili
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function(){
                window.location.hash = hash;
            });
        }
    });
}