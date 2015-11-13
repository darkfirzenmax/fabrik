/*! Fabrik */
var ListPluginManager=my.Class(PluginManager,{type:"list",constructor:function(a,b){ListPluginManager.Super.call(this,a,b)}}),ListForm=my.Class({autoChangeDbName:!0,options:{j3:!0,activetableOpts:[]},constructor:function(a){var b,c=this;$(document).ready(function(){c.options=$.extend(c.options,a),c.watchTableDd(),c.watchLabel(),$("#addAJoin").on("click",function(a){a.stopPropagation(),c.addJoin()}),$("table.linkedLists")&&(b=$("#table.linkedLists").find("tbody"),new Sortables(b,{handle:".handle",onSort:function(){var a=this.serialize(1,function(a){return a.find("input").prop("name").split("][").pop().replace("]","")}),b=[];a.each(function(a){""!==a&&b.push(a)}),$("input[name*=faceted_list_order]").value=JSON.stringify(b)}})),$("table.linkedForms")&&(b=$("table.linkedForms").find("tbody"),new Sortables(b,{handle:".handle",onSort:function(){var a=this.serialize(1,function(a){return a.find("input").prop("name").split("][").pop().replace("]","")}),b=[];a.each(function(a){""!==a&&b.push(a)}),$("input[name*=faceted_form_order]").value=JSON.stringify(b)}})),c.joinCounter=0,c.watchOrderButtons(),c.watchDbName(),c.watchJoins()})},watchLabel:function(){this.autoChangeDbName=""===jQuery("#jform__database_name").val(),jQuery("#jform_label").on("keyup",function(){if(this.autoChangeDbName){var a=jQuery("#jform_label").val().trim().toLowerCase();a=a.replace(/\W+/g,"_"),jQuery("#jform__database_name").val(a)}}.bind(this)),jQuery("#jform__database_name").on("keyup",function(){this.autoChangeDbName=!1}.bind(this))},watchOrderButtons:function(){var a=this,b=$(".addOrder"),c=$(".deleteOrder");b.off("click"),c.off("click"),b.on("click",function(b){b.stopPropagation(),a.addOrderBy()}),c.on("click",function(b){b.stopPropagation(),a.deleteOrderBy(b)})},addOrderBy:function(a){var b;b=a?$(a.target).closest(".orderby_container"):$(".orderby_container"),b.after(b.clone()),this.watchOrderButtons()},deleteOrderBy:function(a){$(".orderby_container").length>1&&($(a.target).closest(".orderby_container").remove(),this.watchOrderButtons())},watchDbName:function(){var a=$("#database_name");a.on("blur",function(){""===a.val()?a.prop("disabled",!1):a.prop("disabled",!0)})},_buildOptions:function(a,b){var c=[];return a.length>0&&a.each("object"==typeof a[0]?function(a){c.push(a[0]===b?$(document.createElement("option")).attr({value:a[0],selected:"selected"}).text(a[1]):$(document.createElement("option")).attr({value:a[0]}).text(a[1]))}:function(a){c.push(a===b?$(document.createElement("option")).attr({value:a,selected:"selected"}).text(a):$(document.createElement("option")).attr({value:a}).text(a))}),c},watchTableDd:function(){var tbl=$("#tablename");tbl.on("change",function(){var cid=$("#input[name*=connection_id]").val(),table=tbl.val(),url="index.php?option=com_fabrik&format=raw&task=list.ajax_updateColumDropDowns&cid="+cid+"&table="+table;$.ajax({url:url,method:"post"}).done(function(r){eval(r)})})},watchFieldList:function(a){var b=this;$("div[id^=table-sliders-data]").on("change:","select[name*="+a+"]",function(){b.updateJoinStatement($(this).closest("tr").prop("id").replace("join",""))})},_findActiveTables:function(){var a=$.extend($(".join_from"),$(".join_to")),b=this;a.each(function(){var a=$(this).val();-1===b.options.activetableOpts.indexOf(a)&&b.options.activetableOpts.push(a)}),this.options.activetableOpts.sort()},addJoin:function(a,b,c,d,e,f,g,h,i,j){var k,l,m,n,o=this;c=c?c:"left",g=g?g:"",d=d?d:"",e=e?e:"",f=f?f:"",a=a?a:"",b=b?b:"",j=j?j:!1,j?(k='checked="checked"',l=""):(l='checked="checked"',k=""),this._findActiveTables(),h=h?h:[["-",""]],i=i?i:[["-",""]];var p=$(document.createElement("tbody")),q=$(document.createElement("input")).addClass("disabled readonly input-mini").attr({readonly:"readonly",size:"2",name:"jform[params][join_id][]",value:b}),r=$(document.createElement("a")).attr({href:"#","class":"btn btn-danger"}).on("click",function(a){return o.deleteJoin(a),!1}),s='<i class="icon-minus"></i> ';r.html(s),c=$(document.createElement("select")).addClass("inputbox input-mini").attr({name:"jform[params][join_type][]"}).append(this._buildOptions(this.options.joinOpts,c));var t=$(document.createElement("select")).addClass("inputbox join_from input-medium").attr({name:"jform[params][join_from_table][]"}).append(this._buildOptions(this.options.activetableOpts,g));a=$(document.createElement("input")).attr({type:"hidden",name:"group_id[]",value:a});var u=$(document.createElement("select")).addClass("inputbox join_to input-medium").attr({name:"jform[params][table_join][]"}).append(this._buildOptions(this.options.tableOpts,d)),v=$(document.createElement("select")).addClass("table_key inputbox input-medium").attr({name:"jform[params][table_key][]"}).append(this._buildOptions(h,e));f=$(document.createElement("select")).addClass("table_join_key inputbox input-medium").attr({name:"jform[params][table_join_key][]"}).append(this._buildOptions(i,f));var w='<fieldset class="radio"><input type="radio" id="joinrepeat'+this.joinCounter+'" value="1" name="jform[params][join_repeat]['+this.joinCounter+'][]" '+k+'/><label for="joinrepeat'+this.joinCounter+'">'+Joomla.JText._("JYES")+'</label><input type="radio" id="joinrepeatno'+this.joinCounter+'" value="0" name="jform[params][join_repeat]['+this.joinCounter+'][]" '+l+'/><label for="joinrepeatno'+this.joinCounter+'">'+Joomla.JText._("JNO")+"</label></fieldset>";m=$(document.createElement("thead")).append($(document.createElement("tr")).append([$(document.createElement("th")).text("id"),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_JOIN_TYPE")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_FROM")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_TO")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_FROM_COLUMN")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_TO_COLUMN")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_REPEAT_GROUP_BUTTON_LABEL")),$(document.createElement("th"))])),n=$(document.createElement("tr")).attr({id:"join"+this.joinCounter}).append([$(document.createElement("td")).append(q),$(document.createElement("td")).append([a,c]),$(document.createElement("td")).append(t),$(document.createElement("td")).append(u),$(document.createElement("td")).addClass("table_key").append(v),$(document.createElement("td")).addClass("table_join_key").append(f),$(document.createElement("td")).html(w),$(document.createElement("td")).append(r)]);var x=$(document.createElement("table")).addClass("table-striped table").append([m,p.append(n)]);if(0===this.joinCounter)x.appendTo($("#joindtd"));else{var y=$("#joindtd").find("tbody");n.appendTo(y)}this.joinCounter++},deleteJoin:function(a){var b,c;a.stopPropagation(),c=$(a.target).closest("tr"),b=$(a.target).closest("table"),c.remove(),0===b.find("tbody tr").length&&b.remove()},watchJoins:function(){var a,b,c,d,e,f=this,g=$("div[id^=table-sliders-data]");g.on("change",".join_from",function(){d=$(this).closest("tr"),e=d.prop("id").replace("join",""),f.updateJoinStatement(e),c=$(this).val(),b=$("input[name*=connection_id]").val(),a="index.php?option=com_fabrik&format=raw&task=list.ajax_loadTableDropDown&table="+c+"&conn="+b,$.ajax({url:a,method:"post"}).complete(function(a){d.find("td.table_key").html(a.responseText)})}),g.on("change",".join_to",function(){d=$(this).closest("tr"),e=d.prop("id").replace("join",""),f.updateJoinStatement(e),c=$(this).val(),b=$("input[name*=connection_id]").val(),a="index.php?name=jform[params][table_join_key][]&option=com_fabrik&format=raw&task=list.ajax_loadTableDropDown&table="+c+"&conn="+b,$.ajax({url:a,method:"post"}).complete(function(a){d.find("td.table_join_key").html(a.responseText)})}),this.watchFieldList("join_type"),this.watchFieldList("table_join_key"),this.watchFieldList("table_key")},updateJoinStatement:function(a){var b=$("#join"+a+" .inputbox"),c=$(b[0]).val(),d=$(b[1]).val(),e=$(b[2]).val(),f=$(b[3]).val(),g=$(b[4]).val(),h=c+" JOIN "+e+" ON "+d+"."+f+" = "+e+"."+g;$("#join-desc-"+a).html(h)}}),adminFilters=my.Class({options:{j3:!1},constructor:function(a,b,c){this.el=$("#"+a),this.fields=b,this.options=$.extend(this.options,c),this.filters=[],this.counter=0},addHeadings:function(){var a=$(document.createElement("thead")).append($(document.createElement("tr")).attr({id:"filterTh","class":"title"}).append($(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_JOIN")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_FIELD")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_CONDITION")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_VALUE")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_TYPE")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_APPLY_FILTER_TO")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_GROUPED")),$(document.createElement("th")).text(Joomla.JText._("COM_FABRIK_DELETE"))));a.insertBefore($("#filterContainer"))},deleteFilterOption:function(a){this.counter--;var b,c;a.stopPropagation(),c=$(a.target).closest("tr"),b=$(a.target).closest("table"),0===this.counter&&b.hide(),c.find("input, select, textarea").remove(),c.hide()},_makeSel:function(a,b,c,d,e){var f=[];return e=e===!0?!0:!1,e&&f.push($(document.createElement("option")).attr({value:""}).text(Joomla.JText._("COM_FABRIK_PLEASE_SELECT"))),c.each(function(a){f.push(a.value===d?$(document.createElement("option")).attr({value:a.value,selected:"selected"}).text(a.label):$(document.createElement("option")).attr({value:a.value}).text(a.label))}),$(document.createElement("select")).addClass(a+" input-medium").attr("name",b).append(f)},addFilterOption:function(a,b,c,d,e,f,g){var h,i,j,k,l,m,n,o=this;this.counter<=0&&0===this.el.closest("table").find("thead").length&&this.addHeadings(),a=a?a:"",b=b?b:"",c=c?c:"",d=d?d:"",e=e?e:"",g=g?g:"";var p=this.options.filterCondDd,q=$(document.createElement("tr"));if(this.counter>0){var r={type:"radio",name:"jform[params][filter-grouped]["+this.counter+"]",value:"1"};r.checked="1"===g?"checked":"",l=$(document.createElement("label")).text(Joomla.JText._("JYES")).append($(document.createElement("input")).attr(r)),r={type:"radio",name:"jform[params][filter-grouped]["+this.counter+"]",value:"0"},r.checked="1"!==g?"checked":"",k=$(document.createElement("label")).text(Joomla.JText._("JNO")).append($(document.createElement("input")).attr(r))}0===this.counter?j=$(document.createElement("span")).text("WHERE").append($(document.createElement("input")).addClass("inputbox").attr({type:"hidden",id:"paramsfilter-join",name:"jform[params][filter-join][]",value:a})):("AND"===a?(h=$(document.createElement("option")).attr({value:"AND",selected:"selected"}).text("AND"),i=$(document.createElement("option")).attr({value:"OR"}).text("OR")):(h=$(document.createElement("option")).attr({value:"AND"}).text("AND"),i=$(document.createElement("option")).attr({value:"OR",selected:"selected"}).text("OR")),j=$(document.createElement("select")).addClass("inputbox input-medium").attr({id:"paramsfilter-join",name:"jform[params][filter-join][]"}).append([h,i]));var s=$("<td>"),t=$("<td>");this.counter<=0?(s.append($(document.createElement("input")).attr({type:"hidden",name:"jform[params][filter-grouped]["+this.counter+"]",value:"0"})),s.append($(document.createElement("span")).text("n/a"))):(s.append(k),s.append(l)),t.append(j);var u=$("<td>");u.html(this.fields);var v=$("<td>");v.html(p);var w=$("<td>"),x=$("<td>");x.html(this.options.filterAccess);var y=$("<td>"),z=$(document.createElement("textarea")).attr({name:"jform[params][filter-value][]",cols:17,rows:4}).text(d);w.append(z),w.append($("<br />"));var A=[{value:0,label:Joomla.JText._("COM_FABRIK_TEXT")},{value:1,label:Joomla.JText._("COM_FABRIK_EVAL")},{value:2,label:Joomla.JText._("COM_FABRIK_QUERY")},{value:3,label:Joomla.JText._("COM_FABRIK_NO_QUOTES")}],B=this._makeSel("inputbox elementtype","jform[params][filter-eval][]",A,f,!1),C=$("<td>").append(B),D=this.el.id+"-del-"+this.counter,E='<button id="'+D+'" class="btn btn-danger"><i class="icon-minus"></i> </button>';if(y.html(E),q.append(t),q.append(u),q.append(v),q.append(w),q.append(C),q.append(x),q.append(s),q.append(y),this.el.append(q),this.el.closest("table").show(),$("#"+D).on("click",function(a){o.deleteFilterOption(a)}),$("#"+this.el.id+"-del-"+this.counter).click=function(a){o.deleteFilterOption(a)},""!==a&&(n=Array.from(t.getElementsByTagName("SELECT")),n.length>=1))for(m=0;m<n[0].length;m++)n[0][m].value===a&&(n[0].options.selectedIndex=m);if(""!==b&&(n=Array.from(u.getElementsByTagName("SELECT")),n.length>=1))for(m=0;m<n[0].length;m++)n[0][m].value===b&&(n[0].options.selectedIndex=m);if(""!==c&&(n=Array.from(v.getElementsByTagName("SELECT")),n.length>=1))for(m=0;m<n[0].length;m++)n[0][m].value===c&&(n[0].options.selectedIndex=m);if(""!==e&&(n=Array.from(x.getElementsByTagName("SELECT")),n.length>=1))for(m=0;m<n[0].length;m++)n[0][m].value===e&&(n[0].options.selectedIndex=m);this.counter++}});