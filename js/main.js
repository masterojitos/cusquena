// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.


// User code
var $this, $target;
$(document).on("ready", function() {
    $("ul.indice li").on("click", function(e) {
        $(".section-formulario .border").removeClass('error');
        $(".section-mesa-roja .elegir-amigos").removeClass('hidden');
        $(".section-mesa-roja .colocar-nombre, .agregar-amigo, .eliminar-amigo").addClass('hidden');
        $this = $(this);
        $target = $(e.target);
        if ($target.is("span")) {
            if ($this.data('to') === "section-formulario" && $target.data("show") === "error") {
                $(".section-formulario .border").addClass('error');
            } else if ($this.data('to') === "section-mesa-roja") {
                if ($target.data("show") === "agregar") {
                    $(".section-mesa-roja .elegir-amigos").addClass('hidden');
                    $(".agregar-amigo").removeClass('hidden');
                } else if ($target.data("show") === "eliminar") {
                    $(".section-mesa-roja .elegir-amigos").addClass('hidden');
                    $(".eliminar-amigo").removeClass('hidden');
                }
            }
        }
        $("section:visible").hide();
        $("section." + $this.data("to")).fadeIn();
        if ($this.data("to") !== "section-no-fan") {
            $("#boton_que_gano").fadeIn();
        } else {
            $("#boton_que_gano").hide();
        }
        if ($this.data('to') === "section-mesa-roja" && $this.hasClass('nombre')) {
            $(".section-mesa-roja .elegir-amigos").addClass('hidden');
            $(".section-mesa-roja .colocar-nombre").removeClass('hidden');
        }
    });
});
