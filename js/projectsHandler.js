$(document).ready(function(animateArgs) {

    // Nav option clicks
    $("ul#projnav li a").click(function() {
        var href = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, 500);
        return false;
    });

    // set equal height thumbnail images
    $(document).ready(function() {
        $(".thumbnail.small img").css({
            "height": $(".thumbnail.small img").height()
        });
    });

    // Change the main display thumbnail on click
    $("a.thumbnail").click(function() {
        var main = $(".main img");
        var prev = main.attr("src");
        var self = $(this).find("img");

        main.attr("src", self.attr("src"));
        self.attr("src", prev);

        // Stop default href
        return false;
    });

    // Animate nav option to right
    $("ul#projnav li a").mouseover(function() {
        $(this).animate({
            left: "+=10"
        }, 100);
    });

    // Animate nav option back into place
    $("ul#projnav li a").mouseout(function() {
        $(this).animate({
            left: "-=10"
        }, 100);
    });
});