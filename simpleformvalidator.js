(function($){
    $.fn.extend({ 
        myFormValidator: function(options) {
		
			var defaults = {
				toolTipWidth:		200,
				toolTipClassName:	'myFormValidatorTooltip',
				toolTipIdPrefix:	'myFormValidatorTooltip-',
				toolTipOffsetTop:	5,
				toolTipOffsetLeft:	17
			};
			
			var options = $.extend(defaults, options); // overwrite defaults with passed options
 
            return this.each(function(){ //Iterate over the current set of matched elements
				
				var o 			= options; 	// access options with o.optionName
				var obj 		= $(this); 	// obj is the element the plugin is applied to
				var errors		= {}; 		// object to hold all the errors discovered
				
				$(obj).attr("novalidate", true); // override browser validation
				
				//$("<style type='text/css'> ."+ o.toolTipClassName +" { text-align: left; font-size: 11px; width: "+ o.toolTipWidth +"; padding: 10px; background: #555; position: absolute; color:#fff; } </style>").appendTo('head');
				
				var tooltipCSS 	= "<style type='text/css'> ";
				tooltipCSS 		+= "."+ o.toolTipClassName +" { text-align: left; font-size: 11px; width: "+ o.toolTipWidth +"; padding: 10px; background: #555; position: absolute; color:#fff; }";
				tooltipCSS 		+= "."+ o.toolTipClassName +":after { content: ''; position: absolute; top: "+ (o.toolTipOffsetTop + 3) +"px; right: 100%; margin-top: -8px; width: 0; height: 0; border-right: 8px solid #555; border-top: 8px solid transparent; border-bottom: 8px solid transparent; }";
				tooltipCSS 		+= "</style>";
				$(tooltipCSS).appendTo('head');
			
				var tooltip = {
					stripLastBr: function(msg){
						return msg.substring(0, (msg.length - 5));
					},
					show: function(props){
						var id = o.toolTipIdPrefix + props.id;
						$(document.body).append("<div id='"+ id +"' class='"+ o.toolTipClassName +"'>"+ this.stripLastBr(props.message) +"</div>");
						$('#'+ id).parent().css({ position: 'relative' }); // ensure the document.body has a position of relative;
						$('#'+ id).css({
							top: 		props.top + o.toolTipOffsetTop, 
							left: 		props.left + o.toolTipOffsetLeft, 
							position:	'absolute'
						});
					}
				};
				
				
				var funcs = {
					isEmpty: function(s){
						return ($.trim(s) == '' ? true : false);
					},
					addError: function(elmt, msg){
						if(!(elmt in errors)){
							errors[elmt] = [];
						}
						errors[elmt].push(msg);
					},
					capitaliseString: function(s){
						return s.charAt(0).toUpperCase() + s.slice(1);
					},
					clearOldToolTips: function (){
						$('.'+ o.toolTipClassName).remove();
					}
				};
				
				
				var validators = {
					validateEmail: function(email){
						var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
						return (reg.test(email) ? true : false);
					},
					validateNumber: function(num){
						return (!isNaN(num) ? true : false);
					},
					validateSelect: function(elmnt){
						return (typeof $('option:selected', elmnt).attr('notme') === 'undefined' ? true : false);
					}
				};
				
				
				// loop through the errors and create tooltips
				function renderErrors(){
					var counter = 0;
					$.each(errors, function(key, value){
						var selectedElement 	= $("[name="+ key +"]");
						var position 			= selectedElement.position();
						var width				= selectedElement.width();
						
						var toolTipProperties = {
							message:	"",
							id:			counter,
							top:		position.top,
							left:		position.left + width
						};

						$.each(value, function(k, v){
							toolTipProperties.message += v +"<br/>";
						});
						
						tooltip.show(toolTipProperties);
						counter++;
					});
				}
				
				
				function checkTheForm(form){
					
					errors = {}; // clear the errors array
					
					// loop through all 'required' elements in form
					$(form).find('*').filter(':input[required]').each(function(){
						
						var element		= {};
						element.val		= $(this).val();
						element.empty	= funcs.isEmpty(element.val);
						element.name	= $(this).attr('name');
						
						if(typeof $(this).attr('data-datatype') !== 'undefined'){
							element.type = $(this).attr('data-datatype').toLowerCase();
						} else {
							element.type = (typeof $(this).attr('type') === 'undefined' ? $(this).prop("tagName").toLowerCase() : $(this).attr('type').toLowerCase());
						}
						
						
						// grab the label whether it's on the element or the parent element
						var label = $('label[for="'+ $(this).attr('id') +'"]');
						if(label.length <= 0){
							var parentElem 		= $(this).parent();
							var parentTagName 	= parentElem.get(0).tagName.toLowerCase();
							if(parentTagName == "label"){ 
								element.label = parentElem.html(); 
							}
						} else {
							element.label = label.html();
						}
						
						if(element.empty){
							funcs.addError(element.name, funcs.capitaliseString(element.name) + " must not be empty.");
						}
						
						switch(element.type){ // validate by type
							case 'email':
								if(!validators.validateEmail(element.val)){
									funcs.addError(element.name, "Email address is not good.");
								}
								break;
							case 'number':
								if(!validators.validateNumber(element.val)){
									funcs.addError(element.name, "This must be a number.");
								}
								break;
							case 'select':
								if(!validators.validateSelect(this)){
									funcs.addError(element.name, "Please select an option.");
								}
								break;
						}

						/* REMOVE ME */ console.log(element); /* REMOVE ME */
						
					}); // end of loop
				}
				
				
				$(window).on('resize', function(){
					funcs.clearOldToolTips();
					if(!$.isEmptyObject(errors)){ 
						renderErrors();
					}
				});
								
				
				$(obj).submit(function(event){
					
					/* REMOVE ME */ event.preventDefault(); /* REMOVE ME */
					funcs.clearOldToolTips();
					checkTheForm(this);
					
					// create and display the tooltips if errors were found
					if(!$.isEmptyObject(errors)){ 
						event.preventDefault(); // stop the form from submitting
						renderErrors();
					}
						
				});
				

            });
        }
    }); 
     
})(jQuery);