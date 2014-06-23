$(document).ready(function(animateArgs) {
    $("ul#projnav li a").click(function() {
        var href = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, 500);
        return false;
    });

    $("ul#projnav li a").mouseover(function() {
        $(this).animate({
            left: "+=10"
        }, 100);
    });

    $("ul#projnav li a").mouseout(function() {
        $(this).animate({
            left: "-=10"
        }, 100);
    });
});