/*! Fabrik */
Fabrik.getWindow=function(a){if(Fabrik.Windows[a.id])a.visible!==!1&&Fabrik.Windows[a.id].open(),Fabrik.Windows[a.id].setOptions(a);else{var b=a.type?a.type:"";switch(b){case"redirect":Fabrik.Windows[a.id]=new Fabrik.RedirectWindow(a);break;case"modal":Fabrik.Windows[a.id]=new Fabrik.Modal(a);break;case"":default:Fabrik.Windows[a.id]=new Fabrik.Window(a)}}return Fabrik.Windows[a.id]},Fabrik.Window=my.Class({options:{id:"FabrikWindow",title:"&nbsp;",container:!1,loadMethod:"html",contentURL:"",createShowOverLay:!1,width:300,height:300,loadHeight:100,expandable:!0,offset_x:null,offset_y:null,visible:!0,onClose:function(){},onOpen:function(){},onContentLoaded:function(){this.fitToContent(!1)},destroy:!0},modal:!1,classSuffix:"",expanded:!1,constructor:function(a){this.options=$.extend(this.options,a),this.makeWindow()},watchTabs:function(){var a=this;$(".nav-tabs a").on("mouseup",function(){a.fitToWidth(),a.drawWindow()})},deleteButton:function(){var a=this,b=function(b){a.close(b)},c=$(Fabrik.jLayouts["modal-close"]);return c.on("click",b),c},center:function(){var a=this.windowWidthInPx(),b=this.window.css("width"),c=this.window.css("height");b=null===b||"auto"===b?a:this.window.css("width"),b=parseInt(b,10),c=null===c||"auto"===c?this.options.height+10:this.window.css("height"),c=parseInt(c,10);var d={width:b+"px",height:c+"px"};if(this.window.css(d),this.modal){var e=(window.getSize().y-c)/2,f=(window.getSize().x-b)/2;d.top=0>e?window.getScroll().y:window.getScroll().y+e,d.left=0>f?window.getScroll().x:window.getScroll().x+f}else{var g=window.getSize().y/2+window.getScroll().y-c/2;d.top="null"!==typeOf(this.options.offset_y)?window.getScroll().y+this.options.offset_y:g;var h=window.getSize().x/2+window.getScroll().x-b/2;d.left="null"!==typeOf(this.options.offset_x)?window.getScroll().x+this.options.offset_x:h}d["margin-left"]=0,this.window.css(d)},windowWidthInPx:function(){return this.windowDimenionInPx("width")},windowDimenionInPx:function(a){var b="height"===a?"y":"x",c=this.options[a]+"";return-1!==c.indexOf("%")?Math.floor(window.getSize()[b]*(c.toFloat()/100)):parseInt(c,10)},makeWindow:function(){var a,b,c,d,e,f,g,h,i=this,j=[];this.window=$("<div />").addClass("fabrikWindow "+this.classSuffix+" modal").attr({id:this.options.id}),this.window.css("width",this.options.width),this.window.css("height",this.options.height),this.center(),this.contentWrapperEl=this.window;var k=this.deleteButton(),l="handlelabel";this.modal||(l+=" draggable",a=$("<div />").addClass("bottomBar modal-footer"),b=$("<div />").addClass("dragger"),e=$(Fabrik.jLayouts["icon-expand"]),e.prependTo(b),a.append(b)),d=jQuery(Fabrik.jLayouts["icon-full-screen"]),f=$("<h3 />").addClass(l).text(this.options.title),j.push(f),this.options.expandable&&this.modal===!1&&(c=$("<a />").addClass("expand").attr({href:"#"}).on("click",function(a){i.expand(a)}).append(d),j.push(c)),j.push(k),this.handle=this.getHandle().append(j);var m=15,n=15,o=this.options.height-m-n;o<this.options.loadHeight&&(o=this.options.loadHeight),this.contentWrapperEl=$("<div />").addClass("contentWrapper").css({height:o+"px"});var p=$("<div />").addClass("itemContent");if(this.contentEl=$("<div />").addClass("itemContentPadder"),p.append(this.contentEl),this.contentWrapperEl.append(p),g=this.windowWidthInPx(),h=this.windowDimenionInPx("height"),this.contentWrapperEl.css({height:h,width:g+"px"}),this.modal)this.window.append([this.handle,this.contentWrapperEl]);else{this.window.append([this.handle,this.contentWrapperEl,a]),this.window.draggable({handle:b,drag:function(){Fabrik.trigger("fabrik.window.resized",this.window),this.drawWindow()}.bind(this)}).resizable();var q={handle:this.handle};q.onComplete=function(){Fabrik.trigger("fabrik.window.moved",this.window),this.drawWindow()}.bind(this),q.container=this.options.container?document.id(this.options.container):null,this.window.makeDraggable(q)}this.options.visible||this.window.fade("hide"),$(document.body).append(this.window),this.loadContent(),this.center()},expand:function(a){if(a.stopPropagation(),this.expanded)this.window.setPosition({x:this.unexpanded.left,y:this.unexpanded.top}).css({width:this.unexpanded.width,height:this.unexpanded.height}),this.expanded=!1;else{this.expanded=!0;var b=window.getSize();this.unexpanded=this.window.getCoordinates();var c=window.getScroll();this.window.setPosition({x:c.x,y:c.y}).css({width:b.x,height:b.y})}this.drawWindow()},getHandle:function(){var a=this.handleClass();return $("<div />").addClass("draggable "+a)},handleClass:function(){return"modal-header"},loadContent:function(){var a,b=this;switch(this.options.loadMethod){case"html":if(void 0===this.options.content)return fconsole("no content option set for window.html"),void this.close();"element"===typeOf(this.options.content)?this.options.content.inject(this.contentEl.empty()):this.contentEl.html(this.options.content),this.options.onContentLoaded.apply(this),this.watchTabs();break;case"xhr":a=this.window.find(".itemContent"),a=this.contentEl,Fabrik.loader.start(a),new $.ajax({url:this.options.contentURL,data:{fabrik_window_id:this.options.id},method:"post"}).success(function(c){a.append(c),Fabrik.loader.stop(a),b.options.onContentLoaded.apply(this),b.watchTabs(),b.center()});break;case"iframe":var c=this.options.height-40,d=window.getWidth(),e=this.contentEl.getScrollSize(),f=e.x+40<d?e.x+40:d;a=this.window.find(".itemContent"),Fabrik.loader.start(a),this.iframeEl&&this.iframeEl.remove(),this.iframeEl=$("<iframe />").addClass("fabrikWindowIframe").attr({id:this.options.id+"_iframe",name:this.options.id+"_iframe",src:this.options.contentURL,marginwidth:0,marginheight:0,frameBorder:0,scrolling:"auto"}).css({height:c+"px",width:f}).inject(this.window.find(".itemContent")),this.iframeEl.hide(),this.iframeEl.on("load",function(){Fabrik.loader.stop(b.window.find(".itemContent")),b.iframeEl.show(),b.trigger("onContentLoaded",[this]),b.watchTabs()})}},drawWindow:function(){var a=this.window.find("."+this.handleClass());a=a?a.getSize().y:25;var b=this.window.find(".bottomBar").getSize().y;this.contentWrapperEl.css("height",this.window.height()-(a+b)),this.contentWrapperEl.css("width",this.window.getDimensions().width-2),"iframe"===this.options.loadMethod&&(this.iframeEl.css("height",this.contentWrapperEl.offsetHeight-40),this.iframeEl.css("width",this.contentWrapperEl.offsetWidth-10))},fitToContent:function(a,b){a=void 0===a?!0:a,b=void 0===b?!0:b,"iframe"!==this.options.loadMethod&&(this.fitToHeight(),this.fitToWidth()),this.drawWindow(),b&&this.center(),!this.options.offset_y&&a&&new Fx.Scroll(window).toElement(this.window)},fitToHeight:function(){var a=this.window.find("."+this.handleClass());a=a?a.getSize().y:25;var b=this.window.find(".bottomBar").getSize().y,c=this.window.find(".itemContent"),d=c.getScrollSize().y+a+b,e=d<window.getHeight()?d:window.getHeight();this.window.css("height",e)},fitToWidth:function(){var a=this.window.find(".itemContent"),b=window.getWidth(),c=a.getScrollSize().x+25<b?a.getScrollSize().x+25:b;this.window.css("width",c)},close:function(a){a&&a.stopPropagation(),this.options.destroy?(this.window.destroy(),delete Fabrik.Windows[this.options.id]):this.window.fade("hide"),this.trigger("onClose",[this])},open:function(a){a&&a.stopPropagation(),this.window.fade("show"),this.trigger("onOpen",[this])}}),Fabrik.Modal=my.Class(Fabrik.Window,{modal:!0,classSuffix:"fabrikWindow-modal",getHandle:function(){return $("<div />").addClass(this.handleClass())}}),Fabrik.RedirectWindow=my.Class(Fabrik.Window,{constructor:function(a){var b={id:"redirect",title:a.title?a.title:"",loadMethod:c,width:a.width?a.width:300,height:a.height?a.height:320,minimizable:!1,collapsible:!0};b.id="redirect",a=$.merge(b,a);var c,d=a.contentURL;a.loadMethod="xhr",d.contains(Fabrik.liveSite)||!d.contains("http://")&&!d.contains("https://")?d.contains("tmpl=component")||(a.contentURL+=d.contains("?")?"&tmpl=component":"?tmpl=component"):a.loadMethod="iframe",this.options=$.extend(this.options,a),this.makeWindow()}});