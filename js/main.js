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
//    $("section.section-fan").hide();   
//    $("section.section-mesa-roja").show();
//    $("section.section-mesa-roja article.elegir-amigos").animate({ marginTop: "0"}, 700);
    
    $.ajaxSetup({cache: true});
    var facebook_status = 0, User = {};
    var user_picture = 'https://graph.facebook.com/$user_id/picture?width=100&height=100';
    $.getScript('//connect.facebook.net/es_LA/all.js', function () {
        FB.init({appId: 147666458740407, status: true, cookie: true, xfbml: true});
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                setUserData();
                verifyPublishActions();
            } else {
                facebook_status = 0;
            }
        });
    });
    var verifyPublishActions = function(callback) {
        FB.api('/me/permissions', function (response) {
            if (response.data[0].publish_actions) {
                facebook_status = 2;
                if (callback) callback();
            } else {
                facebook_status = 1;
            }
        });
    };
    var setUserData = function(callback) {
        FB.api('/me', function(response) {
            User = response;
            User.friends = [];
            User.picture = user_picture.replace('$user_id', User.id);
            $("#user_picture").css("background-image", 'url(' + User.picture + ')');
            if (callback) callback();
        });
    };
    
    $(".like-page").on("click", function() {
        $("#boton_que_gano").removeClass('hidden');
        $("section.section-no-fan").fadeOut(500).find("article").animate({ marginTop: "-709px"},500,function(){
            $("section.section-fan article").css("display","list-item").animate({ marginTop: "0"},500);
        }).parent().next().css("display","block");
    });
    $("#boton_participa").on("click", function() {
        $(".nano").nanoScroller();
        $("section.section-formulario").css("display","block");
        $("section.section-fan").animate({ marginLeft: "-812px"},1200,function(){
            $("section.section-fan").css("display","none")}).find("article").animate({ marginTop: "-709px"},500,function(){
            $("section.section-formulario article").css("display","list-item").animate({ marginTop: "0"},700);
        });
    });
    $("section.section-formulario input.dia, section.section-formulario input.mes").on("keyup",function(){
        if($(this).val().length >= 2){
            $(this).next().next().focus();
        }
    });
    var calcular_edad = function(fecha) {
        var age_dif_ms = (new Date()).getTime() - fecha.getTime();
        var age_date = new Date(age_dif_ms);
        return Math.abs(age_date.getUTCFullYear() - 1970);
    };
    Date.prototype.parseISO8601 = function(date){
        var matches = date.match(/^\s*(\d{4})-(\d{2})-(\d{2})\s*$/);
        if(matches){
            this.setFullYear(parseInt(matches[1]));    
            this.setMonth(parseInt(matches[2]) - 1);
           this.setDate(parseInt(matches[3]));
        }
        return this;
    }; 
    $("#boton_siguiente").on("click", function() {
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
        var fecha_ingresada = ano.val() + "-" + mes.val() + "-" + dia.val();
        var new_date = (new Date()).parseISO8601(fecha_ingresada);
        var terminos = $("#terminos_check");
        var nameregex = /^([a-zA-Z ñáéíóú äöüÄÖÜß]{2,80})$/;
        var dniregex = /^[0-9]{8,8}$/;
        var emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var numberregex = /^[0-9]{9,9}$/;
        if (nombre.val() === "" && apellido_paterno.val() === "" && apellido_materno.val() === "" && 
                fecha_ingresada === "--" && dni.val() === "" && email.val() === "" && cell.val() === "") {
            form.find("div.error").text("Por favor, completa correctamente los campos.");
            nombre.focus().prev().addClass('error');
            apellido_paterno.prev().addClass('error');
            apellido_materno.prev().addClass('error');
            dia.prev().addClass('error');
            mes.prev().addClass('error');
            ano.prev().addClass('error');
            dni.prev().addClass('error');
            email.prev().addClass('error');
            cell.prev().addClass('error');
            if (!terminos.hasClass('checked')) terminos.addClass('error');
       } else if(!nameregex.test(nombre.val()) || nombre.val() === ""){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.")
            nombre.prev().addClass('error');
        }else if(!nameregex.test(apellido_paterno.val()) || apellido_paterno.val() === ""){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.");
            apellido_paterno.focus().prev().addClass('error');
        }else if(!nameregex.test(apellido_materno.val()) || apellido_materno.val() === ""){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.");
            apellido_materno.focus().prev().addClass('error');
        }else if(isNaN(new_date.getTime()) || calcular_edad(new_date) < 1 || calcular_edad(new_date) > 99){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.");
            dia.prev().addClass('error');
            mes.prev().addClass('error');
            ano.prev().addClass('error');
        }else if(calcular_edad(new_date) < 18){
            form.find(".error").text("Debes ser mayor de edad para participar de la campaña.");
            dia.prev().addClass('error');
            mes.prev().addClass('error');
            ano.prev().addClass('error');
        }else if(!dniregex.test(dni.val()) || dni.val() === ""){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.");
            dni.focus().prev().addClass('error');
        }else if(!emailregex.test(email.val()) || email.val() === ""){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.");
            email.focus().prev().addClass('error');
        }else if(!numberregex.test(cell.val()) || cell.val() === ""){
            form.find("div.error").text("El dato que ingresaste es incorrecto o inválido.");
            cell.focus().prev().addClass('error');
        }else if(!terminos.hasClass('checked')){
            form.find("div.error").text("Debe aceptar los términos y condiciones.");
            terminos.addClass('error');
        }else {
//            var data = $("form").serialize();
//            data+= "&notificaciones=" + ($("#noticias_check").hasClass('checked') ? 1 : 0);
            $.post('verificar_dni.php', {dni: dni.val()})
            .done(function(response) {
                if(response.success) {
                    $("section.section-mesa-roja").css("display","block");
                    $("section.section-formulario").animate({ marginLeft: "-812px"},1200,function(){
                        $(this).css("display","none")}).find("article").animate({ marginTop: "-1709px"},500,function(){
                        $("section.section-mesa-roja article.elegir-amigos").css("display","list-item").animate({ marginTop: "0"},700);
                    });
                }else if(response.cumpleanos) {
                    if(fecha_ingresada === response.cumpleanos){
                        $(".terminos .error").text("El DNI ingresado ya se encuentra participando");
                    } else {
                        $(".terminos .error").text("La fecha de nacimiento no coincide con el DNI ingresado");
                    }
                }else if(response.error) {
                    $(".terminos .error").text(response.error);
                }
            }); 
        }
    });
    $(".check_button").on("click",function(){
        $(this).toggleClass("checked").removeClass('error');
    });
    var validar_boton_elegir = function(callback) {
        if (!facebook_status) {
            FB.login(function(response) {
                if (response.status === 'connected') {
                    facebook_status = 1;
                    setUserData(callback);
                }
            }, {scope: 'publish_actions'});
        } else {
            callback();
        }
    };
    $("#boton_elegir").on("click", function() {
        validar_boton_elegir(function() {
            $("section.section-mesa-roja article.elegir-amigos").animate({ marginTop: "-709px"},700,function(){
                $(this).addClass('hidden');
                $(".agregar-amigo, #boton_unpasomas_inactivo").removeClass('hidden');
            });
        });
    });
    var selected_friend;
    $(".bt-fs-dialog").fSelector({
        oneByOne: true,
        lang: {
            title: "Invitar a amigos",
            summaryBoxResult: "{1} mejores resultados para {0}",
            summaryBoxNoResult: "No hay resultados para {0}",
            searchText: "Busca a todos tus amigos"
        },
        onSubmit: function (friend_id) {
            User.friends.push(friend_id);
            fs_selected_friends = User.friends;
            selected_friend.data('id', friend_id).css("background-image", 'url(' + user_picture.replace('$user_id', friend_id) + ')')
            .addClass('img_selected').find("img.agregar-amigo").addClass('hidden').prev().removeClass('hidden');
            if (User.friends.length === 7) {
                $("#boton_unpasomas_inactivo").addClass('hidden');
                $("#boton_unpasomas").removeClass('hidden');
            }
        }
    });
    $("img.agregar-amigo").on("click", function() {
        selected_friend = $(this).parent();
        $(".bt-fs-dialog").trigger("click");
    });
    $("img.eliminar-amigo").on("click", function() {
        $this = $(this);
        User.friends.splice($.inArray($this.parent().data('id'),User.friends), 1);
        $(this).parent().css("background-image", "url()").removeClass('img_selected');
        $(this).addClass('hidden').next().removeClass('hidden');
        $("#boton_unpasomas").addClass('hidden');
        $("#boton_unpasomas_inactivo").removeClass('hidden');
    });
    $("#boton_unpasomas").on("click", function() {
        $("#boton_unpasomas, img.eliminar-amigo").addClass('hidden');
        $("section.section-mesa-roja article.colocar-nombre").removeClass('hidden').animate({ marginTop: 0},700,function(){
            $("#boton_regresar").hide().removeClass('hidden').fadeIn();
            $("#nombre_mesa").val().length > 2 ? $("#boton_listo").hide().removeClass('hidden').fadeIn() : $("#boton_listo_inactivo").hide().removeClass('hidden').fadeIn();
        });
    });
    $("#boton_regresar").on("click", function() {
        $("#boton_regresar,#boton_listo, #boton_listo_inactivo").addClass('hidden');
        $("section.section-mesa-roja article.colocar-nombre").animate({ marginTop: "-709px"},700,function(){
            $("#boton_unpasomas, img.eliminar-amigo").hide().removeClass('hidden').fadeIn();
        });
    });
    $("#nombre_mesa").on("keyup", function() {
        if($(this).val().length > 2){
            $("#boton_listo").removeClass('hidden');
            $("#boton_listo_inactivo").addClass('hidden');
        }else{
            $("#boton_listo").addClass('hidden');
            $("#boton_listo_inactivo").removeClass('hidden');
        }
    });
    var validar_boton_listo = function(callback) {
        if (facebook_status === 1) {
            FB.login(function() {
                verifyPublishActions(callback);
            }, {scope: 'publish_actions'});
        } else {
            callback();
        }
    };
    function download(canvas, filename) {

        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'),
            e;

        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;

        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL();

        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {

            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                             0, 0, 0, 0, 0, false, false, false,
                             false, 0, null);

            lnk.dispatchEvent(e);

        } else if (lnk.fireEvent) {

            lnk.fireEvent("onclick");
        }
    }
    $("#descargar_imagen").on("click",function(e){
        e.preventDefault();
        //dni = form.find("[name=dni]");
        html2canvas($("section.section-fan"), {
            onrendered: function(canvas) {
                var base64 = canvas.toDataURL();
                $.post('guardar_imagen.php', {
                    "dni": "12345689",
                    "data": base64
                })
                .done(function(response) {
                    console.log(response)
                });
            }
        });
    });
    $("#boton_listo").on("click", function() {
        validar_boton_listo(function() {
            $("section.section-inscrito").css("display","block");
            $("section.section-mesa-roja").animate({ marginLeft: "-812px"},1200,function(){
                $("section.section-mesa-roja").css("display","none")}).find("article.colocar-nombre").animate({ marginTop: "-709px"},500,function(){
                $("section.section-inscrito article").css("display","list-item").animate({ marginTop: "0"},700);
                $(".nombre_ingresado").text('"' + $("article.colocar-nombre input[name=name]").val() + '"');
            });
        });
    });
    $("#boton_que_gano, .boton-terminos-y-condiciones").on("click", function() {
        if ($(this).hasClass('boton-terminos-y-condiciones')) {
            $("section.section-terminos-y-condiciones").css("display", "block").animate({top: 0}, 500);
            $("#scroll_terminos_y_condiciones").resize();
        } else {
            $("section.section-que-gano").css("display", "block").animate({top: 0}, 500);
        }
    });
    $(".boton-cerrar").on("click", function() {
        $(this).parents("section").animate({top: "-709px"}, 500, function() { $(this).hide(); });
    });
});
