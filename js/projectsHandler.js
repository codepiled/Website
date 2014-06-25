$(document).ready(function(animateArgs) {
    var thumbArgs = [];

    $(".img-cycle").each(function() {
        var newArg = {
            thumbs: 0,
            selected: 0
        };

        $(this).find(".thumbnails .thumbnail").each(function() {
            newArg.thumbs++;
        });
        thumbArgs.push(newArg);
        console.log("hello");
    });

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

    $(".img-cycle .thumbnails img").each(function() {
        $(this).css({
            "height": $(".thumbnails img").height()
        });
    });

    // Change the main display thumbnail on click
    $(".img-cycle a.small").click(function() {
        var parent = $(this).closest(".img-cycle");
        var parentInd = $(".img-cycle").index(parent);
        var main = parent.find(".main img");

        main.attr("src", $(this).find("img").attr("src"));
        thumbArgs[parentInd].selected = parent.find(".thumbnails a").index($(this));

        // Stop default href
        return false;
    });

    setInterval(function() {
        var ind = 0;
        $(".img-cycle").each(function() {
            var self = $(this);
            var selfArgs = thumbArgs[ind];
            var main = self.find(".main img");

            self.find(".thumbnails a:eq(" + selfArgs.selected.toString() + ")").toggleClass("active");

            if (selfArgs.selected >= selfArgs.thumbs - 1) {
                selfArgs.selected = 0;
            } else {
                selfArgs.selected++;
            }

            self.find(".thumbnails a:eq(" + selfArgs.selected.toString() + ")").toggleClass("active");
            main.attr("src", self.find(".thumbnails img:eq(" + selfArgs.selected.toString() + ")").attr("src"));

            ind++;
        });

    }, 3000);
});