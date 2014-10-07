/*! Facebook Friend Selector | Copyright (c) 2013 Coders' Grave - http://codersgrave.com */var fs_selected_friends;!function(e,t,s,i){"use strict";var n,l,a,o={},r=!1,d=!1,f=0,c=0,u=1,h="",p="http://developers.facebook.com/docs/reference/javascript/",v=function(){return FB===i?(alert("Facebook integration is not defined. View "+p),!1):(o=s.extend(!0,{},G,o),o.onPreStart(),o.max>0&&null!==o.max&&(o.showSelectedCount=!0,o.showButtonSelectAll=!1),m(),void o.onStart())},b=function(){l.fadeOut(400,function(){n.empty(),l.remove(),C(),a.fadeOut(400,function(){a.remove()})}),r=!1,d=!1,o.onClose()},g=function(){var e=[];if(s("input.fs-friends:checked").each(function(){e.push(parseInt(s(this).val().split("-")[1],10))}),o.facebookInvite===!0){var t=e.join();FB.ui({method:"apprequests",message:o.lang.facebookInviteMessage,to:t},function(t){null!==t&&(o.onSubmit(e),o.closeOnSubmit===!0&&b())})}else o.onSubmit(e),o.closeOnSubmit===!0&&b()},m=function(){if(r!==!0){r=!0,s("body").append(a=s('<div id="fs-overlay"></div>'),l=s('<div id="fs-dialog-box-wrap"></div>')),l.append('<div class="fs-dialog-box-bg" id="fs-dialog-box-bg-n"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-ne"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-e"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-se"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-s"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-sw"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-w"></div><div class="fs-dialog-box-bg" id="fs-dialog-box-bg-nw"></div>'),l.append(n=s('<div id="fs-dialog-box-content"></div>'));var t='<div id="fs-dialog" class="fs-color-'+o.color+'"><h2 id="fs-dialog-title"><span>'+o.lang.title+'</span></h2><div id="fs-filter-box"><div id="fs-input-wrap"><input type="text" id="fs-input-text" title="'+o.lang.searchText+'" /><a href="javascript:{}" id="fs-reset">Reset</a></div></div><div id="fs-user-list"><ul></ul></div>'+(o.oneByOne?"":'<div id="fs-filters-buttons"><div id="fs-filters"><a href="javascript:{}" id="fs-show-selected"><span>'+o.lang.buttonShowSelected+'</span></a></div><div id="fs-dialog-buttons"><a href="javascript:{}" id="fs-submit-button" class="fs-button"><span>'+o.lang.buttonSubmit+'</span></a><a href="javascript:{}" id="fs-cancel-button" class="fs-button"><span>'+o.lang.buttonCancel+"</span></a></div></div>")+"</div>";n.html(t),x(),B(!0),k(),_(),s(e).resize(function(){B(!1)})}},x=function(){s("#fs-user-list").append('<div id="fs-loading"></div>'),o.addUserGroups&&!o.facebookInvite?FB.api("/","POST",{batch:[{method:"GET",relative_url:"me/friends"},{method:"GET",relative_url:"me/groups"}]},function(e){S(e)}):FB.api("/me/friends",function(e){S(e)})},S=function(e){if(e.error)return alert(o.lang.fbConnectError),b(),!1;var t=[];if(o.addUserGroups&&!o.facebookInvite){var t=s.parseJSON(e[0].body).data;s.merge(t,s.parseJSON(e[1].body).data)}else t=e.data;var i=null!==o.maxFriendsCount&&o.maxFriendsCount>0;(o.showRandom===!0||i===!0)&&(t=F(e.data));for(var n=0,l=0;n<t.length&&!(i&&o.maxFriendsCount<=l);n++)s.inArray(parseInt(t[n].id,10),o.getStoredFriends)>=0&&(y(n,t,!0),l++);for(n in fs_selected_friends)o.excludeIds.push(fs_selected_friends[n]);for(var a=0;a<t.length&&!(i&&o.maxFriendsCount<=a+o.getStoredFriends.length);a++)s.inArray(parseInt(t[a].id,10),o.excludeIds)>=0||s.inArray(parseInt(t[a].id,10),o.getStoredFriends)<=-1&&y(a,t,!1);s("#fs-loading").remove()},y=function(e,t,i){var n=s("<li/>"),l='<a class="fs-anchor" href="javascript://"><input class="fs-fullname" type="hidden" name="fullname[]" value="'+t[e].name.toLowerCase().replace(/\s/gi,"0")+'" />'+(o.oneByOne?"":'<input class="fs-friends" type="checkbox" name="friend[]" value="fs-'+t[e].id+'" />')+'<img class="fs-thumb" src="https://graph.facebook.com/'+t[e].id+'/picture" /><span class="fs-name">'+I(t[e].name,15)+"</span></a>";n.data("id",t[e].id).append(l),s("#fs-user-list ul").append(n),i&&w(n)},k=function(){l.delegate("#fs-cancel-button","click.fs",function(){b()}),l.delegate("#fs-submit-button","click.fs",function(){g()}),s("#fs-dialog input").focus(function(){s(this).val()===s(this)[0].title&&s(this).val("")}).blur(function(){""===s(this).val()&&s(this).val(s(this)[0].title)}).blur(),s("#fs-dialog input").keyup(function(){A(s(this))}),l.delegate("#fs-reset","click.fs",function(){s("#fs-input-text").val(""),A(s("#fs-dialog input")),s("#fs-input-text").blur()}),l.delegate("#fs-user-list li","click.fs",function(){w(s(this))}),s("#fs-show-selected").click(function(){E(s(this))}),s(t).keyup(function(e){27===e.which&&o.enableEscapeButton===!0&&b()}),o.closeOverlayClick===!0&&(a.css({cursor:"pointer"}),a.bind("click.fs",b))},w=function(e){var t=e;if(o.oneByOne)return o.onSubmit(parseInt(t.data("id"),10)),void b();if(t.hasClass("checked"))t.removeClass("checked"),t.find("input.fs-friends").prop("checked",!1),u--,u-1!==s("#fs-user-list li").length&&s("#fs-select-all").text(o.lang.buttonSelectAll);else{var i=O();if(i===!1)return t.find("input.fs-friends").prop("checked",!1),!1;u++,t.addClass("checked"),t.find("input.fs-friends").prop("checked",!0)}R()},C=function(){s("#fs-reset").undelegate("click.fs"),s("#fs-user-list li").undelegate("click.fs"),u=1,s("#fs-select-all").undelegate("click.fs")},I=function(e,t){var s=e.length;return t>=s?e:e.substr(0,t)+"..."},A=function(e){var t=s("#fs-dialog"),i=s("#fs-user-list ul");if(h=s.trim(e.val()),""===h)return s.each(i.children(),function(){s(this).show()}),void(t.has("#fs-summary-box").length&&(1===u?s("#fs-summary-box").remove():s("#fs-result-text").remove()));var n=h.toLowerCase().replace(/\s/gi,"0"),l=s("#fs-user-list .fs-fullname[value*="+n+"]");i.children().hide(),s.each(l,function(){s(this).parents("li").show()});var a="";l.length>0&&h>""?(a=o.lang.summaryBoxResult.replace("{0}",'"'+e.val()+'"'),a=a.replace("{1}",l.length)):a=o.lang.summaryBoxNoResult.replace("{0}",'"'+e.val()+'"'),t.has("#fs-summary-box").length?t.has("#fs-result-text").length?s("#fs-result-text").text(a):s("#fs-summary-box").prepend('<span id="fs-result-text">'+a+"</span>"):s("#fs-filter-box").after('<div id="fs-summary-box"><span id="fs-result-text">'+a+"</span></div>")},B=function(i){f=s(e).width(),c=s(e).height();var n=s(t).height(),r=l.width(),d=l.height(),u=f/2-r/2,h=c/2-d/2;i===!0?a.css({"background-color":o.overlayColor,opacity:o.overlayOpacity,height:n}).fadeIn("fast",function(){l.css({left:u,top:h}).fadeIn()}):(l.stop().animate({left:u,top:h},200),a.css({height:n}))},F=function(e){for(var t,s,i=e.length;i;t=parseInt(Math.random()*i,10),s=e[--i],e[i]=e[t],e[t]=s);return e},O=function(){if(u>o.max&&null!==o.max){var e=o.lang.selectedLimitResult.replace("{0}",o.max);return s(".fs-limit").html('<span class="fs-limit fs-full">'+e+"</span>"),!1}},R=function(){if(u>1&&o.showSelectedCount===!0){var e=o.lang.selectedCountResult.replace("{0}",u-1);s("#fs-dialog").has("#fs-summary-box").length?s("#fs-dialog").has(".fs-limit.fs-count").length?s(".fs-limit").text(e):s("#fs-summary-box").append('<span class="fs-limit fs-count">'+e+"</span>"):s("#fs-filter-box").after('<div id="fs-summary-box"><span class="fs-limit fs-count">'+e+"</span></div>")}else""===h?s("#fs-summary-box").remove():s(".fs-limit").remove()},j=function(){s("#fs-user-list li").removeClass("checked"),s("#fs-user-list input.fs-friends").prop("checked",!1),u=1},_=function(){o.showButtonSelectAll===!0&&null===o.max&&(s("#fs-show-selected").before('<a href="javascript:{}" id="fs-select-all"><span>'+o.lang.buttonSelectAll+"</span></a> - "),l.delegate("#fs-select-all","click.fs",function(){u-1!==s("#fs-user-list li").length?(s("#fs-user-list li:hidden").show(),j(),s("#fs-user-list li").each(function(){w(s(this))}),s("#fs-select-all").text(o.lang.buttonDeselectAll),d===!0&&(d=!1,s("#fs-show-selected").text(o.lang.buttonShowSelected))):(j(),R(),s("#fs-select-all").text(o.lang.buttonSelectAll))}))},E=function(e){var t=s("#fs-user-list ul"),i=t.find("li"),n=t.find("li.checked");(0!==n.length&&n.length!==i.length||d===!0)&&(d===!0?(e.removeClass("active").text(o.lang.buttonShowSelected),t.children().show(),d=!1):(e.addClass("active").text(o.lang.buttonShowAll),t.children().hide(),s.each(n,function(){s(this).show()}),d=!0))},G={max:null,excludeIds:[],getStoredFriends:[],closeOverlayClick:!0,enableEscapeButton:!0,overlayOpacity:"0.3",overlayColor:"#000",closeOnSubmit:!1,showSelectedCount:!0,showButtonSelectAll:!0,addUserGroups:!1,color:"default",lang:{title:"Friend Selector",buttonSubmit:"Send",buttonCancel:"Cancel",buttonSelectAll:"Select All",buttonDeselectAll:"Deselect All",buttonShowSelected:"Show Selected",buttonShowAll:"Show All",summaryBoxResult:"{1} best results for {0}",summaryBoxNoResult:"No results for {0}",searchText:"Enter a friend's name",fbConnectError:"You must connect to Facebook to see this.",selectedCountResult:"You have choosen {0} people.",selectedLimitResult:"Limit is {0} people.",facebookInviteMessage:"Invite message"},maxFriendsCount:null,oneByOne:!1,showRandom:!1,facebookInvite:!0,onPreStart:function(){return null},onStart:function(){return null},onClose:function(){return null},onSubmit:function(){return null}};s.fn.fSelector=function(e){return this.unbind("click.fs"),this.bind("click.fs",function(){o=e,v()}),this}}(window,document,jQuery);
/*! Custom JS */!function(){for(var e,a=function(){},o=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],n=o.length,r=window.console=window.console||{};n--;)e=o[n],r[e]||(r[e]=a)}();var $this,$target;$(document).on("ready",function(){$.ajaxSetup({cache:!0});var e=0,a={},o="https://graph.facebook.com/$user_id/picture?width=100&height=100",n="http://www.teclalabs.com/alpha/Phantasia/Cusquena/",r="http://www.facebook.com/masterojitos.apps/app_147666458740407";$.getScript("//connect.facebook.net/es_LA/all.js",function(){FB.init({appId:0x864d46d186b7,status:!0,cookie:!0,xfbml:!0}),FB.getLoginStatus(function(a){"connected"===a.status?(t(),i()):e=0})});var i=function(a){FB.api("/me/permissions",function(o){o.data[0].publish_actions?(e=2,a&&a()):e=1})},t=function(e){FB.api("/me",function(n){a=n,a.friends=[],a.picture=o.replace("$user_id",a.id),$("#user_picture").css("background-image","url("+a.picture+")").hide(),e&&e()})};$("#boton_participa").on("click",function(e){e.preventDefault(),$(".nano").nanoScroller(),$("main").animate({"background-position":"-810px"},1e3,"linear"),$("section.section-fan footer").fadeOut(500).prev().animate({marginTop:"-709px"},500,function(){$(this).parent().hide().next().fadeIn(500).find("article").css("display","list-item").animate({marginTop:"0"},500)})}),$("section.section-formulario input.dia, section.section-formulario input.mes").on("keyup",function(){$(this).val().length>=2&&$(this).next().next().focus()});var s=function(e){var a=(new Date).getTime()-e.getTime(),o=new Date(a);return Math.abs(o.getUTCFullYear()-1970)};Date.prototype.parseISO8601=function(e){var a=e.match(/^\s*(\d{4})-(\d{2})-(\d{2})\s*$/);return a&&(this.setFullYear(parseInt(a[1])),this.setMonth(parseInt(a[2])-1),this.setDate(parseInt(a[3]))),this},$("#boton_siguiente").on("click",function(e){e.preventDefault(),form=$("section.section-formulario"),form.find(".border.error").removeClass("error");var a=form.find("[name=nombre]"),o=form.find("[name=apellido_paterno]"),n=form.find("[name=apellido_materno]"),r=form.find("[name=dia]"),i=form.find("[name=mes]"),t=form.find("[name=ano]"),d=form.find("[name=dni]"),c=form.find("[name=email]"),l=form.find("[name=cell]"),m=t.val()+"-"+i.val()+"-"+r.val(),p=(new Date).parseISO8601(m),u=$("#terminos_check"),f=/^([a-zA-Z ñáéíóú äöüÄÖÜß]{2,80})$/,v=/^[0-9]{8,8}$/,g=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,h=/^[0-9]{9,9}$/;""===a.val()&&""===o.val()&&""===n.val()&&"--"===m&&""===d.val()&&""===c.val()&&""===l.val()?(form.find("div.error").text("Por favor, completa correctamente los campos."),a.focus().prev().addClass("error"),o.prev().addClass("error"),n.prev().addClass("error"),r.prev().addClass("error"),i.prev().addClass("error"),t.prev().addClass("error"),d.prev().addClass("error"),c.prev().addClass("error"),l.prev().addClass("error"),u.hasClass("checked")||u.addClass("error")):f.test(a.val())&&""!==a.val()?f.test(o.val())&&""!==o.val()?f.test(n.val())&&""!==n.val()?isNaN(p.getTime())||s(p)<1||s(p)>99?(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),r.prev().addClass("error"),i.prev().addClass("error"),t.prev().addClass("error")):s(p)<18?(form.find(".error").text("Debes ser mayor de edad para participar de la campaña."),r.prev().addClass("error"),i.prev().addClass("error"),t.prev().addClass("error")):v.test(d.val())&&""!==d.val()?g.test(c.val())&&""!==c.val()?h.test(l.val())&&""!==l.val()?u.hasClass("checked")?$.post("verificar_dni.php",{dni:d.val()}).done(function(e){e.success?($("main").animate({"background-position":"-1622px"},1e3,function(){$("#user_picture").fadeIn("fast")}),$("section.section-formulario footer").fadeOut(500).prev().animate({marginTop:"-709px"},500,function(){$(this).parent().hide().next().fadeIn(500).find("article.elegir-amigos").css("display","list-item").animate({marginTop:"0"},500)})):e.cumpleanos?$(".terminos .error").text(m===e.cumpleanos?"El DNI ingresado ya se encuentra participando.":"La fecha de nacimiento no coincide con el DNI ingresado."):e.error&&$(".terminos .error").text(e.error)}):(form.find("div.error").text("Debe aceptar los términos y condiciones."),u.addClass("error")):(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),l.focus().prev().addClass("error")):(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),c.focus().prev().addClass("error")):(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),d.focus().prev().addClass("error")):(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),n.focus().prev().addClass("error")):(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),o.focus().prev().addClass("error")):(form.find("div.error").text("El dato que ingresaste es incorrecto o inválido."),a.prev().addClass("error"))}),$(".check_button").on("click",function(){$(this).toggleClass("checked").removeClass("error")});var d=function(a){e?a():FB.login(function(o){"connected"===o.status&&(e=1,t(a))},{scope:"publish_actions"})};$("#boton_elegir").on("click",function(e){e.preventDefault(),d(function(){$("section.section-mesa-roja article.elegir-amigos").animate({marginTop:"-709px"},1e3,function(){$(this).addClass("hidden"),$(".imagen-recuadro").show(),$(".agregar-amigo, #boton_unpasomas_inactivo").removeClass("hidden")})})});var c;$(".bt-fs-dialog").fSelector({oneByOne:!0,lang:{title:"Invitar a amigos",summaryBoxResult:"{1} mejores resultados para {0}",summaryBoxNoResult:"No hay resultados para {0}",searchText:"Busca a todos tus amigos"},onSubmit:function(e){a.friends.push(e),fs_selected_friends=a.friends,c.data("id",e).css("background-image","url("+o.replace("$user_id",e)+")").addClass("img_selected").find(".agregar-amigo").addClass("hidden").prev().removeClass("hidden"),7===a.friends.length&&($("#boton_unpasomas_inactivo").addClass("hidden"),$("#boton_unpasomas").removeClass("hidden"))}}),$(".agregar-amigo").on("click",function(e){e.preventDefault(),c=$(this).parent(),$(".bt-fs-dialog").trigger("click")}),$(".eliminar-amigo").on("click",function(e){e.preventDefault(),$this=$(this),a.friends.splice($.inArray($this.parent().data("id"),a.friends),1),$(this).parent().css("background-image","url()").removeClass("img_selected"),$(this).addClass("hidden").next().removeClass("hidden"),$("#boton_unpasomas").addClass("hidden"),$("#boton_unpasomas_inactivo").removeClass("hidden")}),$("#boton_unpasomas").on("click",function(e){e.preventDefault(),$("#boton_unpasomas, .eliminar-amigo").addClass("hidden"),$("section.section-mesa-roja article.colocar-nombre").removeClass("hidden").animate({marginTop:0},1e3,function(){$("#boton_regresar").hide().removeClass("hidden").fadeIn(),$.trim($("#nombre_mesa").val()).length>2?$("#boton_listo").hide().removeClass("hidden").fadeIn():$("#boton_listo_inactivo").hide().removeClass("hidden").fadeIn()})}),$("#boton_regresar").on("click",function(e){e.preventDefault(),$("#boton_regresar, #boton_listo, #boton_listo_inactivo").addClass("hidden"),$("section.section-mesa-roja article.colocar-nombre").animate({marginTop:"-709px"},1e3,function(){$("#boton_unpasomas, .eliminar-amigo").hide().removeClass("hidden").fadeIn()})}),$("#nombre_mesa").on("keyup",function(){$.trim($(this).val()).length>2?($("#boton_listo").removeClass("hidden"),$("#boton_listo_inactivo").addClass("hidden")):($("#boton_listo").addClass("hidden"),$("#boton_listo_inactivo").removeClass("hidden"))});var l,m=function(a){1===e?FB.login(function(){i(a)},{scope:"publish_actions"}):a()};$("#boton_listo").on("click",function(e){e.preventDefault(),m(function(){$("#mesa_roja").append("<img src='img/loading.gif' class='loading' />"),$("#boton_listo, #boton_regresar").hide(),l=$("#formulario_datos_personales").serialize(),l+="&notificaciones="+($("#noticias_check").hasClass("checked")?1:0),l+="&facebook="+encodeURIComponent($.param(a))+"&nombre_mesa="+$("#nombre_mesa").val(),$.ajax({type:"post",url:"insertar_usuario.php",data:l,success:function(){u()},complete:function(){u()}})})});var p=!1,u=function(){p||(p=!0,$("main").animate({"background-position":"-2430px"},1e3,"linear"),$("#mesa_roja .loading").hide().remove(),$(".imagen-recuadro").css("background-image","url()"),FB.api("/me/feed","post",{description:"¡Tú arma la comitiva, Cusqueña pone la Mesa Roja! Participa y disfruta lo mejor del Oktoberfest. Tomar bebidas alcohólicas en exceso es dañino.",link:r,message:"Yo ya armé mi comitiva para ir al Oktoberfest. ¡Arma la tuya y participa por una Mesa Roja!",picture:n+"userfiles/"+$("#formulario_datos_personales input[name=dni]").val()+".jpg",place:"288369631370316",privacy:{value:"SELF"},tags:a.friends.join(",")},function(){}),$("section.section-mesa-roja footer").fadeOut(500).parent().find("article.colocar-nombre").animate({marginTop:"-709px"},500,function(){$(this).parent().hide().next().fadeIn(500).find("article").css("display","list-item").animate({marginTop:"0"},500),$("#nombre_ingresado").text('"'+$("#nombre_mesa").val()+'"')}))};$("#boton_compartir").on("click",function(e){e.preventDefault(),FB.ui({method:"feed",caption:"Oktoberfest Cusqueña",description:"¿Ya estás participando por la Mesa Roja de Cusqueña? Qué esperas para ganarte lo mejor del Oktoberfest! Participa aquí "+r,link:r,picture:n+"img/oktoberfest.jpg"},function(){})}),$("#boton_que_gano, .boton-terminos-y-condiciones").on("click",function(e){e.preventDefault(),$(this).hasClass("boton-terminos-y-condiciones")?($("section.section-terminos-y-condiciones").css("display","block").animate({top:0},500),$("#scroll_terminos_y_condiciones").resize()):$("section.section-que-gano").css("display","block").animate({top:0},500)}),$(".boton-cerrar").on("click",function(e){e.preventDefault(),$(this).parents("section").animate({top:"-709px"},500,function(){$(this).hide()})})});
