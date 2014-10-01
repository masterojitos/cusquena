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
var api_data;
window.fbAsyncInit = function() {
//    FB.init({appId: 1521037214801847, status: true, cookie: true, xfbml: true, oauth: true});
//    FB.init({appId: 1521331134772455, status: true, cookie: true, xfbml: true, oauth: true});
    FB.init({appId: '1521331134772455', xfbml: true, version: 'v2.1'});
    FB.getLoginStatus(fbLoginStatus, true);
//    FB.Event.subscribe('auth.login', fbLoginStatus);
//    FB.Event.subscribe('auth.authResponseChange', fbLoginStatus);
};
var go_register = false;
var fbLoginStatus = function(response) {
    if (response.status === 'connected') {
        FB.api('/me', function (response) {
            console.log(response);
            api_data = response;
            user_id = response.authResponse.userID;
            if (go_register) {
                register_new_account();
                return;
            }
            FB.api('/me/permissions/publish_actions/', function (response) {
                if (response.data[0].publish_actions) {
                    //todos los permisos
                } else {
                    //sin permisos de publicar
                }
            });
        });
    } else if (response.status === 'not_authorized') {
        go_register = true;
        //sin permisos de ver info
    } else {
        go_register = true;
        //no logeado en fb
    }
};
(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


// User code
var $this, $target;
$(document).on("ready", function() {
    $(".like-page").on("click",function(){
        $("#boton_que_gano").removeClass('hidden');
        $(".nano").nanoScroller();
        $("section.section-no-fan").fadeOut(500).find("article").velocity({ marginTop: "-709px"},500,function(){
            $("section.section-fan article").css("display","list-item").velocity({ marginTop: "0"},500);
        }).parent().next().css("display","block");
    });
    $("#boton_participa").on("click",function(){
        $("section.section-formulario").css("display","block");
        $("section.section-fan").velocity({ marginLeft: "-812px"},1200,function(){
            $("section.section-fan").css("display","none")}).find("article").velocity({ marginTop: "-709px"},500,function(){
            $("section.section-formulario article").css("display","list-item").velocity({ marginTop: "0"},700);
        });
    });
    $("#boton_siguiente").on("click",function(){
        //validacion
        //name /^([a-zA-Z ñáéíóú äöüÄÖÜß]{2,60})$/
        //efecto
        $("section.section-mesa-roja").css("display","block");
        $("section.section-formulario").velocity({ marginLeft: "-812px"},1200,function(){
            $(this).css("display","none")}).find("article").velocity({ marginTop: "-1709px"},500,function(){
            $("section.section-mesa-roja article.elegir-amigos").css("display","list-item").velocity({ marginTop: "0"},700);
        });
    });
    $("#boton_elegir").on("click",function(){
        $("section.section-mesa-roja article.elegir-amigos").velocity({ marginTop: "-709px"},700,function(){
            $(this).addClass('hidden');
            $(".agregar-amigo").removeClass('hidden')
        });
    });
    $("img.agregar-amigo").on("click",function(){
        $(this).parent(".imagen-recuadro").css("background","red");
        $(this).addClass('hidden').prev().removeClass('hidden')
    });
    $("img.eliminar-amigo").on("click",function(){
        $(this).parent(".imagen-recuadro").css("background","transparent");
        $(this).addClass('hidden').next().removeClass('hidden')
    });
    $("#boton_unpasomas").on("click",function(){
        console.log($("section.section-mesa-roja article.colocar-nombre"),$(this).hasClass('enabled'))
        if(!$(this).hasClass('enabled')){
            $("section.section-mesa-roja article.colocar-nombre").removeClass('hidden').velocity({ marginTop: 0},700,function(){
                $("#boton_unpasomas").addClass('hidden');
                $("#boton_regresar, #boton_listo").css("display","none").removeClass('hidden').fadeIn("fast");
            });
        }
    });
    $("#boton_regresar").on("click",function(){
        $("section.section-mesa-roja article.colocar-nombre").velocity({ marginTop: "-709px"},700,function(){
            $(this).addClass('hidden');
            $("#boton_regresar, #boton_listo").addClass('hidden');
            $("#boton_unpasomas").css("display","none").removeClass('hidden').fadeIn("fast");
        });
    });
    $("#boton_listo").on("click",function(){
        $("section.section-inscrito").css("display","block");
        $("section.section-mesa-roja").velocity({ marginLeft: "-812px"},1200,function(){
            $("section.section-mesa-roja").css("display","none")}).find("article.colocar-nombre").velocity({ marginTop: "-709px"},500,function(){
            $("section.section-inscrito article").css("display","list-item").velocity({ marginTop: "0"},700);
        });
    });
    $("#boton_que_gano, .boton-terminos-y-condiciones").on("click",function(){
        if($(this).hasClass('boton-terminos-y-condiciones')){
            $("section.section-terminos-y-condiciones").css("display","block").velocity({ top: 0},1000);
        }else{
            $("section.section-que-gano").css("display","block").velocity({ top: 0},1000);
        }
    });
    $(".boton-cerrar").on("click",function(){
        $(this).parents("section").velocity({ top: "-709px"},1000,function(){$(this).css("display","block");});
    });
    
});
