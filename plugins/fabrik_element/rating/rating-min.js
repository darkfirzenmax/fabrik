/*! Fabrik */
var FbRating=my.Class(FbElement,{constructor:function(a,b){this.field=$("#"+a),FbRating.Super.call(this,a,b),this.options.canRate!==!1&&("creator-rating"!==this.options.mode||"details"!==this.options.view)&&(this.rating=this.options.rating,Fabrik.addEvent("fabrik.form.refresh",function(a){this.setup(a)}.bind(this)),this.setup(this.options.row_id),this.setStars())},setup:function(a){var b=this;this.options.row_id=a,this.element=$("#"+this.options.element+"_div"),this.spinner=$("<img />").attr({src:Fabrik.liveSite+"media/com_fabrik/images/ajax-loader.gif",alt:"loading","class":"ajax-loader"}),this.stars=this.element.find(".starRating"),this.ratingMessage=this.element.find(".ratingMessage"),this.stars.each(function(a){var c=$(this);a.on("mouseover",function(){b.stars.each(function(){b._getRating(c)>=b._getRating($(this))?$(this).removeClass("icon-star-empty").addClass("icon-star"):$(this).addClass("icon-star-empty").removeClass("icon-star")}),b.ratingMessage.html(a.data("rating"))})}),this.stars.each(function(a){a.on("mouseout",function(){b.stars.each(function(){$(this).removeClass("icon-star").addClass("icon-star-empty")})})}),this.stars.each(function(a){a.on("click",function(){b.rating=b._getRating(a),b.field.val(b.rating),b.doAjax(),b.setStars()})});var c=this.getClearButton();this.element.on("mouseout",function(){b.setStars()}),this.element.on("mouseover",function(){c.setStyles({visibility:"visible"})}),c.on("mouseover",function(){b.ratingMessage.html(Joomla.JText._("PLG_ELEMENT_RATING_NO_RATING"))}),c.on("mouseout",function(a){-1!==b.rating&&(a.target.src=b.options.clearoutsrc)}),c.on("click",function(){b.rating=-1,b.field.val(""),b.stars.each(function(a){a.removeClass("icon-star").addClass("icon-star-empty")}),b.doAjax()}),this.setStars()},doAjax:function(){var a=this;if(this.options.canRate!==!1&&this.options.editable===!1){this.spinner.inject(this.ratingMessage);var b={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"rating",method:"ajax_rate",g:"element",element_id:this.options.elid,formid:this.options.formid,row_id:this.options.row_id,elementname:this.options.elid,userid:this.options.userid,rating:this.rating,listid:this.options.listid};$.ajax({url:"",data:b}).done(function(){a.spinner.remove()})}},_getRating:function(a){return parseInt(a.data("rating"),10)},setStars:function(){var a=this;this.stars.each(function(){var b=a._getRating($(this));b<=a.rating?$(this).removeClass("icon-star-empty").addClass("icon-star"):$(this).removeClass("icon-star").addClass("icon-star-empty")});var b=this.getClearButton();b.prop("sr",-1!==this.rating?this.options.clearoutsrc:this.options.clearinsrc)},getClearButton:function(){return this.element.find("i[data-rating=-1]")},update:function(a){this.rating=parseInt(a,10).round(),this.field.value=this.rating,this.element.find(".ratingScore").text(a),this.setStars()}});