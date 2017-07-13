/**
* @desc: Main menu
* @author: namit@langmaster.edu.vn 
* @date: 01/08/2013 
*/
(function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {
        var cfg = {
            interval: 50,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        var cX, cY, pX, pY;

        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                pX = cX; pY = cY;
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        var handleHover = function(e) {
            var ev = jQuery.extend({},e);
            var ob = this;

            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            if (e.type == "mouseenter") {
                pX = ev.pageX; pY = ev.pageY;
                $(ob).on("mousemove.hoverIntent",track);
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}
            } else {
                $(ob).off("mousemove.hoverIntent",track);
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);

function menuNgang(idItem){
	var widthLi = 0;
	var m_col1 = 20;
	var m_col2 = 20;
	var m_col3 = 19;
	var m_col4 = 24;
	var leftMenu = 0;
	var widthMenu = $(idItem).width();
	$(idItem + ' li:first').addClass('start');
	$(idItem + ' ul:first > li').addClass('level0');
	$(idItem + ' ul:first > li').each(function(){
		$('a:first span', this).addClass('down');
	});
	
	$(idItem + ' .level0 > ul').each(function(){
		var totalItem = $('> li', this).size();
		if(totalItem < m_col1) {
			$(this).addClass('m_col1');
			widthLi = parseInt($(this).parent().width());
			widthUl = widthLi;
			leftMenu = 0;
			$(this).css({'width':widthUl + 'px', 'left' : leftMenu + 'px'});
		} else {
			if(totalItem < m_col2) {
				$(this).addClass('m_col2');
			} else {
				if(totalItem < m_col3) {
					$(this).addClass('m_col3');
					$(this).addClass('m_colmulti');
					widthLi = parseInt($('> li:first', this).width()) + parseInt($('> li:first', this).css("padding-left")) + parseInt($('> li:first', this).css("padding-right")) + parseInt($('> li:first', this).css("margin-left")) + parseInt($('> li:first', this).css("margin-right")) + parseInt($('> li:first', this).css("border-left-width")) + parseInt($('> li:first', this).css("border-right-width"));
					widthUl = widthLi * 3;
					//widthLi = (widthUl/5) - parseInt($('> li:first', this).css("padding-left")) - parseInt($('> li:first', this).css("padding-right")) - parseInt($('> li:first', this).css("margin-left")) - parseInt($('> li:first', this).css("margin-right")) - parseInt($('> li:first', this).css("border-left-width")) - parseInt($('> li:first', this).css("border-right-width"));
					//$('> li', this).css({'width' : widthLi + 'px'});
					$('> li', this).each(function(index){
						$(this).attr('id', 'sub_' + (index + 1));
					});
					leftMenu = 0;
					$(this).css({'width':widthUl + 'px', 'left' : leftMenu + 'px'});
				} else {
					if(totalItem < m_col4) {
						$(this).addClass('m_colmulti');
						$(this).parent().css({'position' : 'static'});
						widthLi = parseInt($('> li:first', this).width()) + parseInt($('> li:first', this).css("padding-left")) + parseInt($('> li:first', this).css("padding-right")) + parseInt($('> li:first', this).css("margin-left")) + parseInt($('> li:first', this).css("margin-right")) + parseInt($('> li:first', this).css("border-left-width")) + parseInt($('> li:first', this).css("border-right-width"));
						widthUl = widthLi * 4;
						//widthLi = (widthUl/5) - parseInt($('> li:first', this).css("padding-left")) - parseInt($('> li:first', this).css("padding-right")) - parseInt($('> li:first', this).css("margin-left")) - parseInt($('> li:first', this).css("margin-right")) - parseInt($('> li:first', this).css("border-left-width")) - parseInt($('> li:first', this).css("border-right-width"));
						//$('> li', this).css({'width' : widthLi + 'px'});
						$('> li', this).each(function(index){
							$(this).attr('id', 'sub_' + (index + 1));
						});
						leftMenu = 0;
						$(this).css({'width':widthUl + 'px', 'left' : leftMenu + 'px'});
					} else {
						$(this).addClass('m_colmulti');
						$(this).parent().css({'position' : 'static'});
						widthUl = widthMenu - 10 - parseInt($(this).css("padding-left")) - parseInt($(this).css("padding-right"));
						widthLi = (widthUl/5) - parseInt($('> li:first', this).css("padding-left")) - parseInt($('> li:first', this).css("padding-right")) - parseInt($('> li:first', this).css("margin-left")) - parseInt($('> li:first', this).css("margin-right")) - parseInt($('> li:first', this).css("border-left-width")) - parseInt($('> li:first', this).css("border-right-width"));
						$('> li', this).css({'width' : widthLi + 'px'});
						$('> li', this).each(function(index){
							$(this).attr('id', 'sub_' + (index + 1));
						});
						leftMenu = 0;
						$(this).css({'width':widthUl + 'px', 'left' : leftMenu + 'px'});
					}
				}
			}
		}
	});
	$(idItem + ' .level0').hoverIntent(
		function () {
			$('a:first', this).addClass('active');
			$(this).addClass('selected');
			$('> ul:first', this).slideDown('fast');
			$('> ul:first a:first', this).addClass('start');
			$('.m_col1 li').hover(
				function () {
					$(this).addClass('selected');
					$('a:first', this).addClass('active');
					$('li:first a', this).addClass('start');
					var widthLi = $(this).outerWidth();
					$('> ul:first', this).css({'position':'absolute', 'left':widthLi + 'px', 'top':'0px'});
					$('> ul:first', this).fadeIn('fast');
				},
				function () {
					$(this).removeClass('selected');
					$('a:first', this).removeClass('active');
					$('> ul:first', this).fadeOut('fast');
				}
			);
		},
		function () {
			$(this).removeClass('selected');
			$('a:first', this).removeClass('active');
			$('> ul:first', this).slideUp('fast');
		}
	);
}

function menuDoc(idItem){
	var widthLi = 0;
	var leftMenu = 0;
	var widthMenu = $(idItem).width();
	$(idItem + ' li:first').addClass('start');
	$(idItem + ' ul:first > li').addClass('level0');
	$(idItem + ' ul:first > li').each(function(){
		$('a:first span', this).addClass('down');
	});
	
	$(idItem + ' .level0 > ul').each(function(){
		var totalItem = $('> li', this).size();
		$(this).addClass('m_col1');
		widthLi = parseInt($(this).parent().width());
		widthUl = widthLi;
		leftMenu = widthLi;
		$(this).css({'width':widthUl + 'px', 'left' : leftMenu + 'px', 'top' : '-1px'});
	});
	
	$(idItem + ' .level0').hoverIntent(
		function () {
			$('a:first', this).addClass('active');
			$(this).addClass('selected');
			$('> ul:first', this).fadeIn('fast');
			$('> ul:first li:first', this).addClass('start');
			$('.m_col1 li').hover(
				function () {
					$(this).addClass('selected');
					$('a:first', this).addClass('active');
					$('li:first', this).addClass('start');
					var widthLi = $(this).outerWidth();
					$('> ul:first', this).css({'position':'absolute', 'left':widthLi + 'px', 'top':'0px'});
					$('> ul:first', this).fadeIn('fast');
				},
				function () {
					$(this).removeClass('selected');
					$('a:first', this).removeClass('active');
					$('> ul:first', this).fadeOut('fast');
				}
			);
		},
		function () {
			$(this).removeClass('selected');
			$('a:first', this).removeClass('active');
			$('> ul:first', this).fadeOut('fast');
		}
	);
}

// ma hoa
function encode64(input) {
	input 		= escape(input);
	var keyStr 	= 	"ABCDEFGHIJKLMNOP" +
					"QRSTUVWXYZabcdef" +
					"ghijklmnopqrstuv" +
					"wxyz0123456789+/" +
					"=";
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
		keyStr.charAt(enc1) +
		keyStr.charAt(enc2) +
		keyStr.charAt(enc3) +
		keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);
	return output;
}

function decode64(input) {
	var keyStr 	= 	"ABCDEFGHIJKLMNOP" +
					"QRSTUVWXYZabcdef" +
					"ghijklmnopqrstuv" +
					"wxyz0123456789+/" +
					"=";
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	//remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		alert("There were invalid base64 characters in the input text.\n" +
				"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
				"Expect errors in decoding.");
	}
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		
		output = output + String.fromCharCode(chr1);
		
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
		
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	
	} while (i < input.length);
	output = output.replace('namnv', '');
	return unescape(output);
}

//Popup
function jquery_popup(p_width, p_height, p_content, class_content) {
	$('.box_overlay').remove();
	$('.block_popup').remove();
	var str_html = 	'<div class="box_overlay" onclick="close_popup()"></div>'+
				   	'<div class="block_popup">'+
				   		'<a class="popup_close" href="javascript:void(0);" onclick="close_popup()"></a>'+
						'<div class="block_content '+class_content+'">'+
							p_content +
						'</div>'+
					'</div>';
	$('body').append(str_html);

	$('.block_popup').css({'margin-left' : '-' + (p_width/2) + 'px', 'margin-top' : '-' + (p_height/2) + 'px'});
	$('.block_popup .block_content').css({'width' : p_width + 'px', 'height' : p_height + 'px'});
	
	$('.block_popup').fadeIn();
}

function close_popup(){
	$('.block_popup .block_content').html('');
	$('.box_overlay').fadeOut().remove();
	$('.block_popup').fadeOut().remove();
}

function loading(){
	var htmlLoad = 	'<div class="box_overlay_loading" onclick="close_loading()"><div class="dangtai"></div></div>';
	$('body').append(htmlLoad);
}

function close_loading(){
	$('.box_overlay_loading').fadeOut().remove();
}

function dangxuly(){
	var htmlLoad = 	'<div class="dangxuly">Äang xá»­ lÃ½...</div>';
	$('body').append(htmlLoad);
}

function close_dangxuly(){
	$('.dangxuly').fadeOut().remove();
}

function ajaxPage(urlAjax, idItem){
	loading();
	$.ajax({
		type: "GET",
		url: urlAjax,
		data: "",
		success: function(html){
			$('#'+idItem).html(html);
			close_loading();
		}
	});
}

function download_file(id){
	var urlAjax = base_url + '/article/ajax/tailieu';
	$.ajax({
		url: urlAjax,
		type: 'POST',
		cache: false,
		async: false,
		data: {id_file: id},
		success: function(string){
			var getData = $.parseJSON(string);
			if(getData.thongbao == 1) {
				if(getData.user_info == 0) {
					if(confirm('Báº¡n pháº£i Ä‘Äƒng nháº­p Ä‘á»ƒ sá»­ dá»¥ng chá»©c nÄƒng nÃ y')){
						popup_id('login');
					};
					return false;
				}
				return false;
			} else {
				return true;
			}
		},
		error: function (request, status, error) {
			alert(request.responseText); // ThÃ´ng bÃ¡o lá»—i
		}
	});
}

function load_user(){
	var urlAjax = base_url + '/member/ajax/block';
	$.ajax({
		url: urlAjax,
		type: 'GET',
		cache: false,
		async: false,
		data: '',
		success: function(string){
			$('#load_user').html(string);
		},
		error: function (request, status, error) {
			alert(request.responseText); // ThÃ´ng bÃ¡o lá»—i
		}
	});
}

function check_login(type) {
	if(confirm('Báº¡n pháº£i Ä‘Äƒng nháº­p Ä‘á»ƒ sá»­ dá»¥ng chá»©c nÄƒng nÃ y')){
		if(type == 1) {
			popup_id('login', 'load');
		}
	};
	return false;
}

/*
*Chay ngang vaÂ  doc 
*/
$.fn.jCarouselLite = function(o) {
    o = $.extend({
        btnPrev: null,
        btnNext: null,
        btnGo: null,
        mouseWheel: false,
        auto: null,

        speed: 200,
        easing: null,

        vertical: false,
        circular: true,
        visible: 3,
        start: 0,
        scroll: 1,
		liWidth: 0,
        liHeight: 0,
        beforeStart: null,
        afterEnd: null
    }, o || {});

    return this.each(function() {                           // Returns the element collection. Chainable.

        var running = false, animCss=o.vertical?"top":"left", sizeCss=o.vertical?"height":"width";
        var div = $(this), ul = $("ul", div), tLi = $("li", ul), tl = tLi.size(), v = o.visible;

        if(o.circular) {
            ul.prepend(tLi.slice(tl-v-1+1).clone())
              .append(tLi.slice(0,v).clone());
            o.start += v;
        }

        var li = $("li", ul), itemLength = li.size(), curr = o.start;
		if (o.liWidth) li.css({width: o.liWidth});
        if (o.liHeight) li.css({height: o.liHeight});
        div.css("visibility", "visible");

        li.css({overflow: "hidden", float: o.vertical ? "none" : "left"});
        ul.css({margin: "0", padding: "0", position: "relative", "list-style-type": "none", "z-index": "1"});
        div.css({overflow: "hidden", position: "relative", "z-index": "2", left: "0px"});

        var liSize = o.vertical ? height(li) : width(li);   // Full li size(incl margin)-Used for animation
        var ulSize = liSize * itemLength;                   // size of full ul(total length, not just for the visible items)
        var divSize = liSize * v;                           // size of entire div(total length for just the visible items)

        li.css({width: li.width(), height: li.height()});
        ul.css(sizeCss, ulSize+"px").css(animCss, -(curr*liSize));

        div.css(sizeCss, divSize+"px");                     // Width of the DIV. length of visible images

        if(o.btnPrev)
            $(o.btnPrev).click(function() {
                return go(curr-o.scroll);
            });

        if(o.btnNext)
            $(o.btnNext).click(function() {
                return go(curr+o.scroll);
            });

        if(o.btnGo)
            $.each(o.btnGo, function(i, val) {
                $(val).click(function() {
                    return go(o.circular ? o.visible+i : i);
                });
            });

        if(o.mouseWheel && div.mousewheel)
            div.mousewheel(function(e, d) {
                return d>0 ? go(curr-o.scroll) : go(curr+o.scroll);
            });

        if(o.auto)
            setInterval(function() {
                go(curr+o.scroll);
            }, o.auto+o.speed);

        function vis() {
            return li.slice(curr).slice(0,v);
        };

        function go(to) {
            if(!running) {

                if(o.beforeStart)
                    o.beforeStart.call(this, vis());

                if(o.circular) {            // If circular we are in first or last, then goto the other end
                    if(to<=o.start-v-1) {           // If first, then goto last
                        ul.css(animCss, -((itemLength-(v*2))*liSize)+"px");
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be lesser depending on the number of elements.
                        curr = to==o.start-v-1 ? itemLength-(v*2)-1 : itemLength-(v*2)-o.scroll;
                    } else if(to>=itemLength-v+1) { // If last, then goto first
                        ul.css(animCss, -( (v) * liSize ) + "px" );
                        // If "scroll" > 1, then the "to" might not be equal to the condition; it can be greater depending on the number of elements.
                        curr = to==itemLength-v+1 ? v+1 : v+o.scroll;
                    } else curr = to;
                } else {                    // If non-circular and to points to first or last, we just return.
                    if(to<0 || to>itemLength-v) return;
                    else curr = to;
                }                           // If neither overrides it, the curr will still be "to" and we can proceed.

                running = true;

                ul.animate(
                    animCss == "left" ? { left: -(curr*liSize) } : { top: -(curr*liSize) } , o.speed, o.easing,
                    function() {
                        if(o.afterEnd)
                            o.afterEnd.call(this, vis());
                        running = false;
                    }
                );
                // Disable buttons when the carousel reaches the last/first, and enable when not
                if(!o.circular) {
                    $(o.btnPrev + "," + o.btnNext).removeClass("disabled");
                    $( (curr-o.scroll<0 && o.btnPrev)
                        ||
                       (curr+o.scroll > itemLength-v && o.btnNext)
                        ||
                       []
                     ).addClass("disabled");
                }

            }
            return false;
        };
    });
};

function css(el, prop) {
    return parseInt($.css(el[0], prop)) || 0;
};
function width(el) {
    return  el[0].offsetWidth + css(el, 'marginLeft') + css(el, 'marginRight');
};
function height(el) {
    return el[0].offsetHeight + css(el, 'marginTop') + css(el, 'marginBottom');
};

/*
javascript tooltip
*/
var tooltip=function(){
	var id = 'tt';
	var top = 7;
	var left = 3;
	var maxw = 312;
	var speed = 10;
	var timer = 30;
	var endalpha = 100;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	
	var item = '#'+id;
	
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			
			var h_screen = window.innerHeight;
			var w_screen = window.innerWidth;
			var heightItem = $(item).innerHeight();
			var widthItem = $(item).innerWidth();
			//var topItem = (h_screen - heightItem)/2;
			var topItem = 0;
			var leftItem = 0;
			var select_x = e.clientX;
			var select_y = e.clientY;
			
			if((h_screen - heightItem)/2 > select_y){
		    	topItem = select_y;
		    }else{
			    if(select_y > heightItem){
		    		topItem = (select_y - heightItem);
			    }else{
				    if(h_screen > heightItem){
			    		topItem = (h_screen - heightItem)/2;
				    }else{
				    	topItem = 0;
				    }
			    }
		    }
		    
		    if(widthItem < (w_screen - select_x - 45)){
		    	leftItem = select_x + 30;
		    }else{
		    	leftItem = select_x - widthItem - 30;
		    }
			
			tt.style.top = topItem + 'px';
			tt.style.left = leftItem + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

jQuery(function($) {
	$('.auto_numberic').autoNumeric('init', { mDec: 0, aDec: ',', aSep: '.', vMax: '10000000000'});
});

$(document).ready(function(){
	$("#block_tabs .tabs li:first a").addClass('selected');
	$("#block_tabs .tabs_content:first").css('display','block');
    $("#block_tabs .tabs li a").click(function() {
        $("#block_tabs .tabs li a").removeClass('selected');
        $(this).addClass('selected');
        $("#block_tabs .tabs_content").css('display','none');
        $('#block_tabs div#' + $(this).attr("id")).css('display','block');
    	return false;
    });
    
    $("#block_tabs_hover .tabs li:first a").addClass('selected');
	$("#block_tabs_hover .tabs_content:first").css('display','block');
    $("#block_tabs_hover .tabs li a").hover(function() {
        $("#block_tabs_hover .tabs li a").removeClass('selected');
        $(this).addClass('selected');
        $("#block_tabs_hover .tabs_content").css('display','none');
        $('#block_tabs_hover div#' + $(this).attr("id")).css('display','block');
    	return false;
    });
});