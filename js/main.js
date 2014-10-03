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
    $.ajaxSetup({cache: true});
    $.getScript('//connect.facebook.net/en_US/all.js', function () {
//        FB.init({appId: 1521037214801847, status: true, cookie: true, xfbml: true, oauth: true});
//        FB.getLoginStatus(function(response) {
//            fbLoginStatus(response);
//        });
//        FB.Event.subscribe('edge.create', page_like_or_unlike_callback);
//        FB.Event.subscribe('edge.remove', page_like_or_unlike_callback);
//        FB.Event.subscribe('auth.login', fbLoginStatus);
//        FB.Event.subscribe('auth.authResponseChange', fbLoginStatus);
    });
    var page_like_or_unlike_callback = function(url, html_element) {
        console.log("page_like_or_unlike_callback");
        console.log("url", url);
        console.log("html_element", html_element);
    };
    var checkLoginState = function() {
        FB.getLoginStatus(function(response) {
            fbLoginStatus(response);
        });
    };
    var fbLoginStatus = function(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            FB.api('/me', function(response) {
                console.log('me');
                console.log(response);
//                FB.api('/me/permissions/publish_actions/', function (response) {
//                    if (response.data[0].publish_actions) {
//                        //todos los permisos
//                    } else {
//                        //sin permisos de publicar
//                    }
//                });
            });
        } else if (response.status === 'not_authorized') {
            go_register = true;
            //sin permisos de ver info
        } else {
            go_register = true;
            //no logeado en fb
        }
    };
    
    $(".like-page").on("click",function(){
        $("#boton_que_gano").removeClass('hidden');
        $(".nano").nanoScroller();
        $("section.section-no-fan").fadeOut(500).find("article").animate({ marginTop: "-709px"},500,function(){
            $("section.section-fan article").css("display","list-item").animate({ marginTop: "0"},500);
        }).parent().next().css("display","block");
    });
    $("#boton_participa").on("click",function(){
        $("section.section-formulario").css("display","block");
        $("section.section-fan").animate({ marginLeft: "-812px"},1200,function(){
            $("section.section-fan").css("display","none")}).find("article").animate({ marginTop: "-709px"},500,function(){
            $("section.section-formulario article").css("display","list-item").animate({ marginTop: "0"},700);
        });
    });
    $("#boton_siguiente").on("click",function(){
        form = $("section.section-formulario");
        form.find(".border.error").removeClass('error');
        var nombre = form.find("[name=nombre]");
        var apellido_paterno = form.find("[name=apellido_paterno]");
        var apellido_materno = form.find("[name=apellido_materno]");
        var dia = form.find("[name=dia]");
        var mes = form.find("[name=mes]");
        var ano = form.find("[name=ano]");
        var dni = form.find("[name=dni]");
        var email = form.find("[name=email]");
        var cell = form.find("[name=cell]");
        var new_date = new Date(ano.val()+"-"+mes.val()+"-"+dia.val());
        var nameregex = /^([a-zA-Z ñáéíóú äöüÄÖÜß]{2,60})$/;
        var dniregex = /[0-9]{8,8}/;
        var emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numberregex = /[0-9-()+]{9,9}/;
        if(!nameregex.test(nombre.val()) || nombre.val() === ""){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            nombre.prev().addClass('error');
        }else if(!nameregex.test(apellido_paterno.val()) || apellido_paterno.val() === ""){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            apellido_paterno.prev().addClass('error');
        }else if(!nameregex.test(apellido_materno.val()) || apellido_materno.val() === ""){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            apellido_materno.prev().addClass('error');
        }else if( isNaN( new_date.getTime() )){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            dia.prev().addClass('error');
            mes.prev().addClass('error');
            ano.prev().addClass('error');
        }else if(!dniregex.test(dni.val()) || dni.val() === ""){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            dni.prev().addClass('error');
        }else if(!emailregex.test(email.val()) || email.val() === ""){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            email.prev().addClass('error');
        }else if(!numberregex.test(cell.val()) || cell.val() === ""){
            form.find(".error").text("El dato que ingresaste es incorrecto o inválido.");
            cell.prev().addClass('error');
        }else {
            $("section.section-mesa-roja").css("display","block");
            $("section.section-formulario").animate({ marginLeft: "-812px"},1200,function(){
                $(this).css("display","none")}).find("article").animate({ marginTop: "-1709px"},500,function(){
                $("section.section-mesa-roja article.elegir-amigos").css("display","list-item").animate({ marginTop: "0"},700);
            });
        }
    });
    $("#boton_elegir").on("click",function(){
        $("section.section-mesa-roja article.elegir-amigos").animate({ marginTop: "-709px"},700,function(){
            $(this).addClass('hidden');
            $(".agregar-amigo").removeClass('hidden')
        });
    });
    $("img.agregar-amigo").on("click",function(){
        $(this).parent(".imagen-recuadro").addClass('img_selected');
        $(this).addClass('hidden').prev().removeClass('hidden');
        if($(".imagen-recuadro.img_selected").length == 8){
            $("#boton_unpasomas").css("display","none").removeClass('hidden').fadeIn("fast");
        }
    });
    $("img.eliminar-amigo").on("click",function(){
        $(this).parent(".imagen-recuadro").removeClass('img_selected');
        $(this).addClass('hidden').next().removeClass('hidden');
        $("#boton_unpasomas").addClass('hidden');
    });
    $("#boton_regresar").on("click",function(){
        $("section.section-mesa-roja article.colocar-nombre").animate({ marginTop: "-709px"},700,function(){
            $("#boton_regresar,#boton_listo").addClass('hidden');
            $(".boton_unpasomas").css("display","none").removeClass('hidden').fadeIn("fast");
        });
    });
    $("#boton_unpasomas").on("click",function(){
        if(!$(this).hasClass('enabled')){
            $("section.section-mesa-roja article.colocar-nombre").removeClass('hidden').animate({ marginTop: 0},700,function(){
                $("#boton_unpasomas").addClass('hidden');
                $("#boton_regresar").css("display","none").removeClass('hidden').fadeIn("fast");
                $("article.colocar-nombre input[name=name]").val().length >0 ? $("#boton_listo").css("display","none").removeClass('hidden').fadeIn("fast") : $("#boton_listo").addClass('hidden');
            });
        }
    });
    $("article.colocar-nombre input[name=name]").on("keyup",function(){
        $("article.colocar-nombre input[name=name]").val().length >0 ? $("#boton_listo").removeClass('hidden') : $("#boton_listo").addClass('hidden');
    });
    $("#boton_regresar").on("click",function(){
        $("section.section-mesa-roja article.colocar-nombre").animate({ marginTop: "-709px"},700,function(){
            $(this).addClass('hidden');
            $("#boton_regresar, #boton_listo").addClass('hidden');
            $("#boton_unpasomas").css("display","none").removeClass('hidden').fadeIn("fast");
        });
    });
    $("#boton_listo").on("click",function(){
        $("section.section-inscrito").css("display","block");
        $("section.section-mesa-roja").animate({ marginLeft: "-812px"},1200,function(){
            $("section.section-mesa-roja").css("display","none")}).find("article.colocar-nombre").animate({ marginTop: "-709px"},500,function(){
            $("section.section-inscrito article").css("display","list-item").animate({ marginTop: "0"},700);
            $(".nombre_ingresado").text('"' + $("article.colocar-nombre input[name=name]").val() + '"');
        });
    });
    $("#boton_que_gano, .boton-terminos-y-condiciones").on("click",function(){
        if($(this).hasClass('boton-terminos-y-condiciones')){
            $("section.section-terminos-y-condiciones").css("display","block").animate({ top: 0},1000);
        }else{
            $("section.section-que-gano").css("display","block").animate({ top: 0},1000);
        }
    });
    $(".boton-cerrar").on("click",function(){
        $(this).parents("section").animate({ top: "-709px"},1000,function(){$(this).css("display","block");});
    });
    $("#boton_compartir,#boton_listo,#boton_unpasomas,#boton_elegir,#boton_siguiente,#boton_participa,#boton_que_gano,#boton_regresar,.boton-cerrar").on("mouseenter",function(){
        src = $(this).attr("src");
        $(this).attr("src", src.replace(".png","-hover.png"));
    }).on("mouseleave",function(){
        src = $(this).attr("src");
        $(this).attr("src", src.replace("-hover.png",".png"));
    });
});
