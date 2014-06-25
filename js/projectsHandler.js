$(document).ready(function(animateArgs) {
    $("#sidebar").affix({
        offset: {
            top: $("#header").offset().top + $("#header").height() - 25
        }
    });

    // Nav option clicks
    $("#sidebar a").click(function() {
        var href = $(this).attr("href");

        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, 500);
        return false;
    });

    $(".thumbnail.small img").css({
        "height": $(".thumbnail.small img").height()
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
});