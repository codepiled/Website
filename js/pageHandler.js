$(document).ready(function() {
    var $root = $("html, body");
    var $locations = ["projects", "portfolios", "links"];
    var $homepage = "projects";
    var loaded = "";
    var selectedIndex = -1;

    var loadContent = function(page) {
        if (page.hasOwnProperty("animate")) {
            $("#content").load(page.name + ".html", function() {
                $(".animate").each(function() {
                    $(this).css("right", page.animate.offset);
                    $(this).animate({
                        right: page.animate.operator
                    }, 500);
                });
            });
        } else {
            $("#content").load(page.name + ".html");
        }

        document.location.hash = page.name;
        loaded = page.name;

        // a nav element has been clicked
        if (page.changeByName) {
            var a = $("ul#nav li a[href$=" + page.name + "]");
            if (selectedIndex != -1) {
                $("ul#nav li:eq(" + selectedIndex.toString() + ")").toggleClass("active");
            }

            a.parent().toggleClass("active");
            selectedIndex = $("ul#nav li a").index(a);
        }
    }

    window.onhashchange = function() {
        var hash = document.location.hash;
        hash = hash.replace(/\#/g, "");

        if (hash === loaded) {
            return;
        }

        // valid hash load that page
        if ($locations.indexOf(hash) > -1) {
            loadContent({
                name: hash,
                changeByName: true
            });
            // not valid url go back to previous page
        } else {
            window.history.back();
        }

        return false;
    }

    // if no hash assigned redirect to projects page for now
    if (!document.location.hash) {
        loadContent({
            name: $homepage,
            changeByName: true
        });
        // there is a hash left
    } else {
        var hash = document.location.hash;
        hash = hash.replace(/\#/g, "");

        // check hash validity
        if ($locations.indexOf(hash) > -1) {
            loadContent({
                name: hash,
                changeByName: true
            });
        } else {
            loadContent({
                name: $homepage,
                changeByName: true
            });
        }
    }

    // pulls down top nav bar tabs
    $("ul#nav li").each(function() {
        $(this).css("margin-top", $(this).parent().height() - $(this).height());
    });

    // handle menu clicks
    $("ul#nav li a").click(function() {
        var self = $(this);

        if (!(self.parent().hasClass("active"))) {
            var newIndex = $("ul#nav li a").index(self);
            var offset = (newIndex > selectedIndex) ? 2000 : -2000;
            var operator = "+=" + offset.toString();

            changeSelected(newIndex);

            $(".animate").each(function() {
                $(this).animate({
                    right: operator
                }, 490);
            });

            // delay loading next page until animation is done
            setTimeout(function(thing) {
                loadContent(thing);
            }, 500, {
                name: self.attr("href"),
                changeByName: false,

                animate: {
                    offset: -offset,
                    operator: operator
                }
            });
        }
        return false;
    });

    $(document).keydown(function(event) {
        var keyCode = event.keyCode,
            offset,
            name,
            newIndex,
            data;

        switch (keyCode) {
            case 37:
                if (selectedIndex <= 0) return;

                newIndex = selectedIndex - 1;
                offset = -2000;
                break;

            case 39:
                if (selectedIndex >= 2) return;

                newIndex = selectedIndex + 1;
                offset = 2000;
                break;

            default:
                return;
        }

        changeSelected(newIndex);
        name = $("ul#nav li:eq(" + newIndex.toString() + ") a").attr("href");
        data = {
            name: name,
            changeByName: false,

            animate: {
                offset: -offset,
                operator: "+=" + offset.toString()
            }
        }

        $(".animate").each(function() {
            $(this).animate({
                right: data.animate.operator
            }, 490);
        });

        // delay loading next page until animation is done
        setTimeout(function(thing) {
            loadContent(thing);
        }, 500, data);
    });

    var changeSelected = function(newIndex) {
        if (selectedIndex != newIndex) {
            if (selectedIndex != -1) {
                $("ul#nav li:eq(" + selectedIndex.toString() + ")").toggleClass("active");
            }
            $("ul#nav li:eq(" + newIndex.toString() + ")").toggleClass("active");

            selectedIndex = newIndex;
        }
    }

    $("ul#nav li").mouseover(function() {
        $(this).animate({
            top: "-=4"
        }, 100);
    });

    $("ul#nav li").mouseout(function() {
        $(this).animate({
            top: "+=4"
        }, 100);
    });


});