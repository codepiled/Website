$(document).ready(function() {
    // Cached variables
    var $locations = ["projects", "portfolios", "links"];
    var $homepage = "projects";

    var loaded = "";
    var selectedIndex = -1;

    function loadContent(loadArgs) {
        if (loadArgs.hasOwnProperty("animate")) {
            $("#content").load(loadArgs.name + ".html", function() {
                $(".animate").each(function() {
                    $(this).css("right", loadArgs.animate.offset);
                    $(this).animate({
                        right: loadArgs.animate.operator
                    }, 500);
                });
            });
        } else {
            $("#content").load(loadArgs.name + ".html");
        }

        document.location.hash = loadArgs.name;
        loaded = loadArgs.name;

        // a nav element has been clicked
        if (loadArgs.changeByName) {
            var a = $("ul#nav li a[href=" + loadArgs.name + "]");
            if (selectedIndex != -1) {
                $("ul#nav li:eq(" + selectedIndex.toString() + ")").toggleClass("active");
            }

            a.parent().toggleClass("active");
            selectedIndex = $("ul#nav li a").index(a);
        }
    }

    function changeSelected(newIndex) {
        if (selectedIndex == newIndex) {
            return;
        }

        if (selectedIndex != -1) {
            $("ul#nav li:eq(" + selectedIndex.toString() + ")").toggleClass("active");
        }
        $("ul#nav li:eq(" + newIndex.toString() + ")").toggleClass("active");

        selectedIndex = newIndex;
    }

    // When the hash is changed navigate to that place if it exists
    window.onhashchange = function() {
        var hash = document.location.hash;

        // Remove the hash from the hash
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
        } else {
            // not valid url go back to previous page
            window.history.back();
        }

        return false;
    }

    // if no hash assigned redirect to homepage
    if (!document.location.hash) {
        loadContent({
            name: $homepage,
            changeByName: true
        });
    } else {
        var hash = document.location.hash;
        var toLoad;

        hash = hash.replace(/\#/g, "");

        // check hash validity
        if ($locations.indexOf(hash) > -1) {
            toLoad = hash;
        } else {
            toLoad = $homepage;
        }

        loadContent({
            name: toLoad,
            changeByName: true
        });
    }

    // pulls down top nav bar tabs
    $("ul#nav li").each(function() {
        $(this).css("margin-top", $(this).parent().height() - $(this).height());
    });

    // handle menu clicks
    $("ul#nav li a").click(function() {
        var self = $(this);
        var newIndex = $("ul#nav li a").index(self);

        // check if the tab that is clicked is already selected
        if (newIndex == selectedIndex) {
            return false;
        }

        var offset = (newIndex > selectedIndex) ? 2000 : -2000;
        var operator = "+=" + offset.toString();

        // select the new tab
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

        return false;
    });

    // Arrow navigation
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
        setTimeout(function(loadArgs) {
            loadContent(loadArgs);
        }, 500, data);
    });

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