(function ($) {
    $.extend($.fn, {
        jqMenu: function (options) {
            $(this).each(function () {
                var settings = $.extend({
                    containerClass: "mnu-container",
                    triggerClass: "mnu-trigger",
                    triggerActiveClass: "mnu-trigger-active",
                    activeClass: "mnu-active",
                    activeClassRegex: /\b([a-z\-]+)active\b/,
                    openMenu: function () { },
                    closeMenu: function () { },
                    openTriggers: [],
                    menuOpenClass: "mnu-container-open"
                }, options);

                settings.menuElement = this;

                $(this).addClass(settings.containerClass);
                $(this).hide();
                //Since we allow the user to have multiple triggers for a menu, this iterates through
                //the trigger array to add the appropriate events.
                for (var i = 0; i < settings.openTriggers.length; i++) {

                    $(settings.openTriggers[i]).addClass(settings.triggerClass);
                    $(settings.openTriggers[i]).bind("click", function (event) {

                        var t = $(event.target);

                        if ($(settings.menuElement).is(":visible")) {
                            $(settings.menuElement).hide();
                            $(this).removeClass(settings.menuOpenClass);

                            settings.closeMenu(event, settings, t);
                        } else {
                            $(this).closeAllMenus("." + settings.menuOpenClass);

                            $(settings.menuElement).show();

                            $(settings.menuElement).addClass(settings.menuOpenClass);

                            //Fire off the openMenu event so the user can do whatever they want with
                            //the associated DOM element.
                            settings.openMenu(event, settings, t);
                        }
                    });

                    //If you are going to change the class or do some work on the actual trigger element
                    //this event will fire when the menu is closed, wether as a "closeAllMenus" event
                    //or a single click event on the trigger element.
                    $(settings.openTriggers[i]).bind("jqmenuclosemenu", { "action": settings.closeMenu }, function (event, data, clicked) {
                        event.data.action(event, data, clicked);
                    });
                }
            });
        },
        closeAllMenus: function (classToClose, triggers) {
            //For each container that has the class
            //to close, hide those elements then remove the
            //class to close clss.
            $(classToClose).each(function () {
                $(this).hide();
                $(this).removeClass(classToClose);
            });

            //For each of the triggers. trigger the close
            //menu event.
            $(triggers).each(function () {
                $(this).trigger("jqmenuclosemenu", [null, $(this)]);
            });
        }
    });
})(jQuery);
//Adding a comment at the end of the jquery script.