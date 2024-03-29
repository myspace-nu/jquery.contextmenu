// jQuery Context Menu Plugin
//
// Cory S.N. LaViska - http://abeautifulsite.net/
// Johan Johansson - https://github.com/myspace-nu/
//
// This plugin is licensed under the MIT License
//
if(jQuery)( function() {
	$.extend($.fn, {
		
		contextMenu: function(o, callback) {
			// Defaults
			if( o.menu == undefined ) return false;
			if( o.inSpeed == undefined ) o.inSpeed = 150;
			if( o.outSpeed == undefined ) o.outSpeed = 75;
			// 0 needs to be -1 for expected results (no fade)
			if( o.inSpeed == 0 ) o.inSpeed = -1;
			if( o.outSpeed == 0 ) o.outSpeed = -1;
			// Loop each context menu
			$(this).each( function() {
				var el = $(this);
				var offset = $(el).offset();
				// Add contextMenu class
				$('#' + o.menu).addClass('contextMenu');
				// Simulate a true right click
				$(this).on("mousedown", function(e) {
					var evt = e;
					evt.stopPropagation();
					$(this).on("mouseup", function(e) {
						e.stopPropagation();
						var srcElement = $(this);
						$(this).off('mouseup');
						if( evt.button == 2 ) {
							// Hide context menus that may be showing
							$(".contextMenu").hide();
							// Get this context menu
							var menu = $('#' + o.menu);
							
							if( $(el).hasClass('disabled') ) return false;
							
							// Detect mouse position
							var x = e.pageX, y = e.pageY;
							var clientWidth = document.documentElement.clientWidth || window.innerWidth;
							var clientHeight = document.documentElement.clientHeight || window.innerHeight;
							var scrollTop = window.scrollY || document.body.scrollTop;
							var scrollLeft = window.scrollX || document.body.scrollLeft;
							
							// Show the menu
							$(menu).css({ top: Math.min(y,(clientHeight+scrollTop-2)-menu.height()), left: Math.min(x,(clientWidth+scrollLeft-2)-menu.width()) }).fadeIn(o.inSpeed);
							
							// When items are selected
							$('#' + o.menu).find('A').off('click');
							$('#' + o.menu).find('LI:not(.disabled) A').on("click", function() {
								$(".contextMenu").hide();
								// Callback
								if( callback ) callback( $(this).attr('href').substr(1), $(srcElement), {x: x - offset.left, y: y - offset.top, docX: x, docY: y} );
								return false;
							});
						}
					});
				});

				// Hover events
				$('#' + o.menu).find('A').on("mouseover", function() {
					$('#' + o.menu).find('LI.hover').removeClass('hover');
					$(this).parent().addClass('hover');
				});
				$('#' + o.menu).find('A').on("mouseout", function() {
					$('#' + o.menu).find('LI.hover').removeClass('hover');
				});
				
				// Disable text selection
				$('#' + o.menu).on('selectstart dragstart', function(e) {
					e.preventDefault();
					return false;
				});

				// Disable browser context menu (requires both selectors to work in IE/Safari + FF/Chrome)
				$(el).add($('UL.contextMenu')).on('contextmenu', function() { return false; });
				
			});

			// Keyboard
			$(document).on("keyup", function(e) {
				if($('#' + o.menu).is(":hidden")){
					return false;
				}
				switch( e.key ) {
					case "ArrowUp":
						if( $('#' + o.menu).find('LI.hover').length == 0 ) {
							$('#' + o.menu).find('LI:last').addClass('hover');
						} else {
							$('#' + o.menu).find('LI.hover').removeClass('hover').prevAll('LI:not(.disabled)').eq(0).addClass('hover');
							if( $('#' + o.menu).find('LI.hover').length == 0 ) $('#' + o.menu).find('LI:last').addClass('hover');
						}
					break;
					case "ArrowDown":
						if( $('#' + o.menu).find('LI.hover').length == 0 ) {
							$('#' + o.menu).find('LI:first').addClass('hover');
						} else {
							$('#' + o.menu).find('LI.hover').removeClass('hover').nextAll('LI:not(.disabled)').eq(0).addClass('hover');
							if( $('#' + o.menu).find('LI.hover').length == 0 ) $('#' + o.menu).find('LI:first').addClass('hover');
						}
					break;
					case "Enter":
						$('#' + o.menu).find('LI.hover A').trigger('click');
					break;
					case "Escape":
						$(document).trigger('click');
					break
				}
			});

			// Hide bindings
			setTimeout( function() { // Delay for Mozilla
				$(document).on("click", function() {
					$('#' + o.menu).fadeOut(o.outSpeed);
					return false;
				});
			}, 0);

			return $(this);
		},
		
		// Disable context menu items on the fly
		disableContextMenuItems: function(o) {
			if( o == undefined ) {
				// Disable all
				$(this).find('LI').addClass('disabled');
				return( $(this) );
			}
			$(this).each( function() {
				if( o != undefined ) {
					var d = o.split(',');
					for( var i = 0; i < d.length; i++ ) {
						$(this).find('A[href="' + d[i] + '"]').parent().addClass('disabled');
						
					}
				}
			});
			return( $(this) );
		},
		
		// Enable context menu items on the fly
		enableContextMenuItems: function(o) {
			if( o == undefined ) {
				// Enable all
				$(this).find('LI.disabled').removeClass('disabled');
				return( $(this) );
			}
			$(this).each( function() {
				if( o != undefined ) {
					var d = o.split(',');
					for( var i = 0; i < d.length; i++ ) {
						$(this).find('A[href="' + d[i] + '"]').parent().removeClass('disabled');
						
					}
				}
			});
			return( $(this) );
		},
		
		// Disable context menu(s)
		disableContextMenu: function() {
			$(this).each( function() {
				$(this).addClass('disabled');
			});
			return( $(this) );
		},
		
		// Enable context menu(s)
		enableContextMenu: function() {
			$(this).each( function() {
				$(this).removeClass('disabled');
			});
			return( $(this) );
		},
		
		// Destroy context menu(s)
		destroyContextMenu: function() {
			// Destroy specified context menus
			$(this).each( function() {
				// Disable action
				$(this).off('mousedown')
				$(this).off('mouseup');
			});
			return( $(this) );
		}
		
	});
})(jQuery);