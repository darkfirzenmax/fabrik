/*! Fabrik */
var FbPassword=my.Class(FbElement,{options:{progressbar:!1},constructor:function(a,b){FbPassword.Super.call(this,a,b),this.options.editable&&this.ini()},ini:function(){var a=this;this.element&&this.element.on("keyup",function(b){a.passwordChanged(b)}),this.options.ajax_validation===!0&&this.getConfirmationField().on("blur",function(b){a.form.doElementValidation(b,!1,"_check")}),""===this.getConfirmationField().get("value")&&(this.getConfirmationField().value=this.element.value)},cloned:function(a){console.log("cloned"),FbPassword.Super.prototype.cloned(this,a),this.ini()},passwordChanged:function(){var a=this.getContainer().find(".strength");if(0!==a.length){var b=new RegExp("^(?=.{6,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$","g"),c=new RegExp("^(?=.{6,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$","g"),d=new RegExp("(?=.{6,}).*","g"),e=this.element,f="";f+='<div class="bar bar-warning" style="width: 10%;"></div>';var g=Joomla.JText._("PLG_ELEMENT_PASSWORD_MORE_CHARACTERS");d.test(e.value)&&(f='<div class="bar bar-info" style="width: 30%;"></div>',g=Joomla.JText._("PLG_ELEMENT_PASSWORD_WEAK")),c.test(e.value)&&(f='<div class="bar bar-info" style="width: 70%;"></div>',g=Joomla.JText._("PLG_ELEMENT_PASSWORD_MEDIUM")),b.test(e.value)&&(f='<div class="bar bar-success" style="width: 100%;"></div>',g=Joomla.JText._("PLG_ELEMENT_PASSWORD_STRONG"));var h={title:g};try{jQuery(a).tooltip("destroy")}catch(i){console.log(i)}jQuery(a).tooltip(h),a.html(f)}},getConfirmationField:function(){return this.getContainer().find("input[name*=check]")}});