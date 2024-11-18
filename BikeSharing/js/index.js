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
    myMap()
    Reveal()
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

$('#Locate').click(function(){ //Gestisce l'evento Locate (Click,immagine e testo)
    if(!$('#Locate').hasClass("active")) {
        $('#Locate').addClass("active");
        $('#Scan').removeClass("active");
        $('#Ride').removeClass("active");
        $("#txtContainer").hide();
        $("#txtContainer").html("<a class="+"text-success"+"><strong>Download the BikeSharing app </strong></a><span class="+"text-white"+"><strong>to discover your nearest available bike.</strong></span>");
        $("#txtContainer").fadeIn("slow");
        $("#bg-iphone").hide();
        $("#bg-iphone").attr("src", "img/iphone1.jpg");
        $("#bg-iphone").fadeIn("slow");
    }
});
$('#Scan').click(function(){ //Gestisce l'evento Scan (Click,immagine e testo)
    if(!$('#Scan').hasClass("active")) {
        $('#Locate').removeClass("active");
        $('#Scan').addClass("active");
        $('#Ride').removeClass("active");
        $("#txtContainer").hide();
        $("#txtContainer").fadeIn("slow");
        $("#txtContainer").html("<strong class="+"text-white"+">Scan the QR code to unlock. Learn how to enjoy a safe ride in the app.</strong>");
        $("#bg-iphone").hide();
        $("#bg-iphone").attr("src", "img/iphone2.jpg");
        $("#bg-iphone").fadeIn("slow");
    }
});
$('#Ride').click(function(){ //Gestisce l'evento Ride (Click,immagine e testo)
    if(!$('#Ride').hasClass("active")) {
        $('#Locate').removeClass("active");
        $('#Scan').removeClass("active");
        $('#Ride').addClass("active");
        $("#txtContainer").hide();
        $("#txtContainer").html("<strong class="+"text-white"+">Enjoy your ride. Follow all traffic rules, <span class="+"text-success" + ">stick to the streets &amp; bike lanes</span> where legally permitted. Wear a helmet and respect others sharing the road.</strong>");
        $("#txtContainer").fadeIn("slow");
        $("#bg-iphone").hide();
        $("#bg-iphone").attr("src", "img/iphone3.jpg");
        $("#bg-iphone").fadeIn("slow");
    }
});

$(window).scroll(function(){ //Effetto scale iPhone da rendere responsive
    ratio = $(window).scrollTop() / $(window).height()
    console.log("ratio " + ratio)
    if(ratio > 3.14 && ratio < 4.5) {
        dimIphone = 2 - (ratio / 4)
        console.log("dimIphone " + dimIphone)
        if(dimIphone > 0.30) {
            $('.iphone').css('transform', 'scale(' + dimIphone + ')')
        }
    }

    
});

function myMap() { //Generazione Mappa

    mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleG1vY2NpIiwiYSI6ImNrMnZ1MTU3NjAwYzgzbWxnajVpZnBvdzkifQ.hj2rYfcXaR-l4ZaD7oRzSA';
    
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/alexmocci/ck2vvgccm0dji1co6wshd3qwr',
    });

    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['bikesharing']
        });
        if (!features.length) {
            return;
        }
        var feature = features[0];
        document.getElementById('name').innerHTML = feature.properties.name;
        document.getElementById('description').innerHTML = feature.properties.description;
        document.getElementById('numLabel').innerHTML = "Number of available bikes: "
        document.getElementById('num').innerHTML = feature.properties.numBike;
    });
    $('.mapboxgl-ctrl-logo').remove();
    $('.mapboxgl-ctrl-attrib').remove();
}

function Reveal() {
    ScrollReveal().reveal('.test', { interval: 16, reset: true }); 
}

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