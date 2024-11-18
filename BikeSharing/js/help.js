$(function() {
    // Since there's no list-group/tab integration in Bootstrap
    $('.list-group-item').on('click',function(e){
     	  var previous = $(this).closest(".list-group").children(".active");
     	  previous.removeClass('active'); // previous list-item
     	  $(e.target).addClass('active'); // activated list-item
   	});
});

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