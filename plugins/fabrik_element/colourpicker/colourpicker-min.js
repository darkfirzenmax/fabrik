/*! Fabrik */
var SliderField=my.Class({constructor:function(a,b){var c=this;this.field=$("#"+a),this.slider=b,this.field.on("change",function(a){c.update(a)})},destroy:function(){var a=this;this.field.removeEvent("change",function(b){a.update(b)})},update:function(a){return this.options.editable?void this.slider.set(parseInt(this.field.value,10)):void this.element.html(a)}}),ColourPicker=my.Class(FbElement,{options:{red:0,green:0,blue:0,value:[0,0,0,1],showPicker:!0,swatchSizeWidth:"10px",swatchSizeHeight:"10px",swatchWidth:"160px"},constructor:function(a,b){this.plugin="colourpicker",(null===b.value||void 0===b.value[0])&&(b.value=[0,0,0,1]),ColourPicker.Super.call(this,a,b),b.outputs=this.outputs,this.element=$("#"+a),this.ini()},ini:function(){var a=this;this.options.callback=function(b,c){b=this.update(b),c!==a.grad&&a.grad&&a.grad.update(b)},this.widget=this.element.closest(".fabrikSubElementContainer").find(".colourpicker-widget"),this.setOutputs();new Drag.Move(this.widget,{handle:this.widget.find(".draggable")});this.options.showPicker&&this.createSliders(this.strElement),this.swatch=new ColourPickerSwatch(this.options.element,this.options,this),this.widget.find("#"+this.options.element+"-swatch").empty().append(this.swatch),this.widget.hide(),this.options.showPicker&&(this.grad=new ColourPickerGradient(this.options.element,this.options,this),this.widget.find("#"+this.options.element+"-picker").empty().append(this.grad.square)),this.update(this.options.value);var b=this.widget.find(".modal-header a");b.on("click",function(b){b.stopPropagation(),a.widget.hide()})},cloned:function(a){ColourPicker.Super.prototype.cloned(this,a);var b=this.element.closest(".fabrikSubElementContainer").find(".colourpicker-widget"),c=b.find(".tab-pane"),d=b.find("a[data-toggle=tab]");d.each(function(b){var c=b.get("href").split("-"),d=c[0].split("_");d[d.length-1]=a,d=d.join("_"),d+="-"+c[1],b.href=d}),c.each(function(b){var c=b.get("id").split("-"),d=c[0].split("_");d[d.length-1]=a,d=d.join("_"),d+="-"+c[1],b.id=d}),d.each(function(a){a.on("click",function(b){b.stopPropagation(),$(a).tab("show")})}),this.ini()},setOutputs:function(){var a=this;this.outputs={},this.outputs.backgrounds=this.getContainer().find(".colourpicker_bgoutput"),this.outputs.foregrounds=this.getContainer().find(".colourpicker_output"),this.outputs.backgrounds.each(function(){$(this).off("click"),$(this).on("click",function(b){a.toggleWidget(b)})}),this.outputs.foregrounds.each(function(){$(this).off("click"),$(this).on("click",function(b){a.toggleWidget(b)})})},createSliders:function(a){var b=this;this.sliderRefs=[],this.table=$(document.createElement("table")),this.tbody=$(document.createElement("tbody")),this.createColourSlideHTML(a,"red","Red:",this.options.red),this.createColourSlideHTML(a,"green","Green:",this.options.green),this.createColourSlideHTML(a,"blue","Blue:",this.options.blue),this.table.appendChild(this.tbody),this.widget.find(".sliders").empty().appendChild(this.table),Fabrik.addEvent("fabrik.colourpicker.slider",function(a,c,d){b.sliderRefs.contains(a.element.id)&&(b.options.colour[c]=d,b.update(b.options.colour.red+","+b.options.colour.green+","+b.options.colour.blue))}),this.redField.on("change",function(a){b.updateFromField(a,"red")}),this.greenField.on("change",function(a){b.updateFromField(a,"green")}.bind(this)),this.blueField.on("change",function(a){b.updateFromField(a,"blue")})},createColourSlideHTML:function(a,b,c,d){var e=$(document.createElement("input")).addClass("input-mini input "+b+"SliderField").attr({type:"text",id:a+b+"redField",size:"3",value:d}),f=[$(document.createElement("td")).text(c),$(document.createElement("td")).append(e)],g=$(document.createElement("tr")).append(f);this.tbody.appendChild(g),this[b+"Field"]=e},updateAll:function(a,b,c){a=a?parseInt(a,10):0,b=b?parseInt(b,10):0,c=c?parseInt(c,10):0,this.options.showPicker&&(this.redField.value=a,this.greenField.value=b,this.blueField.value=c),this.options.colour.red=a,this.options.colour.green=b,this.options.colour.blue=c,this.updateOutputs()},updateOutputs:function(){var a=new Color([this.options.colour.red,this.options.colour.green,this.options.colour.blue,1]);this.outputs.backgrounds.each(function(b){b.css("background-color",a)}),this.outputs.foregrounds.each(function(b){b.css("background-color",a)}),this.element.value=a.red?a.red+","+a.green+","+a.blue:a.rgb.join(",")},update:function(a){return this.options.editable===!1?void this.element.html(a):(null===a||void 0===a?a=[0,0,0]:"string"==typeof a&&(a=a.split(",")),this.updateAll(a[0],a[1],a[2]),a)},updateFromField:function(a,b){var c=Math.min(255,parseInt(a.target.value,10));a.target.value=c,isNaN(c)||(this.options.colour[b]=c,this.options.callback(this.options.colour.red+","+this.options.colour.green+","+this.options.colour.blue))},toggleWidget:function(a){a.stopPropagation(),this.widget.toggle()}}),ColourPickerSwatch=my.Class({options:{},initialize:function(a,b){return this.element=$("#"+a),this.options=$.extend(this.options,b),this.callback=this.options.callback,this.outputs=this.options.outputs,this.redField=null,this.greenField=null,this.blueField=null,this.widget=$(document.createElement("div")),this.colourNameOutput=$(document.createElement("span")).css({padding:"3px"}).inject(this.widget),this.createColourSwatch(a),this.widget},createColourSwatch:function(a){var b,c,d,e,f=this,g=$(document.createElement("div")).css({"float":"left","margin-left":"5px","class":"swatchBackground"});for(c=0;c<this.options.swatch.length;c++)d=$(document.createElement("div")).css({width:this.options.swatchWidth}),e=this.options.swatch[c],b=0,jQuery.each(e,function(e,g){var h=a+"swatch-"+c+"-"+b;d.append($(document.createElement("div")).attr({id:h}).addClass(g).css({"float":"left",width:f.options.swatchSizeWidth,cursor:"crosshair",height:f.options.swatchSizeHeight,"background-color":"rgb("+e+")"}).on("click",function(a){f.updateFromSwatch(a)}).on("mouseenter",function(a){f.showColourName(a)}).on("mouseleave",function(a){f.clearColourName(a)})),b++}),g.append(d);this.widget.append(g)},updateFromSwatch:function(a){a.stopPropagation();var b=new Color($(a.target).css("background-color"));this.options.colour.red=b[0],this.options.colour.green=b[1],this.options.colour.blue=b[2],this.showColourName(a),this.callback(b,this)},showColourName:function(a){this.colourName=a.target.className,this.colourNameOutput.text(this.colourName)},clearColourName:function(){this.colourNameOutput.text("")}}),ColourPickerGradient=my.Class({options:{size:125},constructor:function(a,b){var c=this;this.brightness=0,this.saturation=0,this.options=$.append(this.options,b),this.callback=this.options.callback,this.container=$("#"+a),0!==this.container.length&&(this.offset=0,this.margin=10,this.borderColour="rgba(155, 155, 155, 0.6)",this.hueWidth=40,this.colour=new Color(this.options.value),this.square=$(document.createElement("canvas")).attr({width:this.options.size+65+"px",height:this.options.size+"px"}),this.square.inject(this.container),this.square.on("click",function(a){c.doIt(a)}),this.down=!1,this.square.on("mousedown",function(){c.down=!0}),this.square.on("mouseup",function(){c.down=!1}),$(document).on("mousemove",function(a){c.down&&c.doIt(a)}),this.drawCircle(),this.drawHue(),this.arrow=this.drawArrow(),this.positionCircle(this.options.size,0),this.update(this.options.value))},doIt:function(a){var b={x:0,y:0,w:this.options.size,h:this.options.size},c=this.square.getPosition(),d=a.page.x-c.x,e=a.page.y-c.y;d<b.w&&e<b.h?this.setColourFromSquareSelection(d,e):d>this.options.size+this.margin&&d<=this.options.size+this.hueWidth&&this.setHueFromSelection(d,e)},update:function(a){var b=new Color(a);this.brightness=b.hsb[2],this.saturation=b.hsb[1],this.colour=this.colour.setHue(b.hsb[0]),this.colour=this.colour.setSaturation(100),this.colour=this.colour.setBrightness(100),this.render(),this.positionCircleFromColour(b)},positionCircleFromColour:function(a){this.saturarion=a.hsb[1],this.brightness=a.hsb[2];var b=Math.floor(this.options.size*(this.saturarion/100)),c=Math.floor(this.options.size-this.options.size*(this.brightness/100));this.positionCircle(b,c)},drawCircle:function(){this.circle=$(document.createElement("canvas")).attr({width:"10px",height:"10px"});var a=this.circle.getContext("2d");a.lineWidth=1,a.beginPath();var b=this.circle.width/2,c=this.circle.width/2;a.arc(b,c,4.5,0,2*Math.PI,!0),a.strokeStyle="#000",a.stroke(),a.beginPath(),a.arc(b,c,3.5,0,2*Math.PI,!0),a.strokeStyle="#FFF",a.stroke()},setHueFromSelection:function(a,b){b=Math.min(1,b/this.options.size),b=Math.max(0,b);var c=360-360*b;this.colour=this.colour.setHue(c),this.render(),this.positionCircle();var d=this.colour;d=d.setBrightness(this.brightness),d=d.setSaturation(this.saturation),this.callback(d,this)},setColourFromSquareSelection:function(a,b){var c=this.square.getContext("2d");this.positionCircle(a,b);var d=c.getImageData(a,b,1,1).data,e=new Color([d[0],d[1],d[2]]);this.brightness=e.hsb[2],this.saturation=e.hsb[1],this.callback(e,this)},positionCircle:function(a,b){a=a?a:this.circleX,this.circleX=a,b=b?b:this.circleY,this.circleY=b,this.render();var c=this.square.getContext("2d"),d=this.offset-5;a=Math.max(-5,Math.round(a)+d),b=Math.max(-5,Math.round(b)+d),c.drawImage(this.circle,a,b)},drawHue:function(){var a=this.square.getContext("2d"),b=this.options.size+this.margin+this.offset,c=a.createLinearGradient(0,0,0,this.options.size+this.offset);c.addColorStop(0,"rgba(255, 0, 0, 1)"),c.addColorStop(5/6,"rgba(255, 255, 0, 1)"),c.addColorStop(4/6,"rgba(0, 255, 0, 1)"),c.addColorStop(.5,"rgba(0, 255, 255, 1)"),c.addColorStop(2/6,"rgba(0, 0, 255, 1)"),c.addColorStop(1/6,"rgba(255, 0, 255, 1)"),c.addColorStop(1,"rgba(255, 0, 0, 1)"),a.fillStyle=c,a.fillRect(b,this.offset,this.hueWidth-10,this.options.size),a.strokeStyle=this.borderColour,a.strokeRect(b+.5,this.offset+.5,this.hueWidth-11,this.options.size-1)},render:function(){var a=this.square.getContext("2d"),b=this.offset;a.clearRect(0,0,this.square.width,this.square.height);var c=this.options.size;a.fillStyle=this.colour.hex,a.fillRect(b,b,c,c);var d=a.createLinearGradient(b,b,c+b,0);d.addColorStop(0,"rgba(255, 255, 255, 1)"),d.addColorStop(1,"rgba(255, 255, 255, 0)"),a.fillStyle=d,a.fillRect(b,b,c,c),d=a.createLinearGradient(0,b,0,c+b),d.addColorStop(0,"rgba(0, 0, 0, 0)"),d.addColorStop(1,"rgba(0, 0, 0, 1)"),a.fillStyle=d,a.fillRect(b,b,c,c),a.strokeStyle=this.borderColour,a.strokeRect(b+.5,b+.5,c-1,c-1),this.drawHue();var e=(360-this.colour.hsb[0])/362*this.options.size-2,f=c+this.hueWidth+b+2,g=Math.max(0,Math.round(e)+b-1);a.drawImage(this.arrow,f,g)},drawArrow:function(){var a=$(document.createElement("canvas")),b=a.getContext("2d"),c=16,d=c/3;a.width=c,a.height=c;for(var e=-c/4,f=0,g=0;20>g;g++)b.beginPath(),b.fillStyle="#000",b.moveTo(f,c/2+e),b.lineTo(f+c/4,c/4+e),b.lineTo(f+c/4,c/4*3+e),b.fill();return b.translate(-d,-c),a}});