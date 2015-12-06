/**
 * Input filter for Bootstrap Dropdown
 * @param  {jQuery} $ Global jQuery instance
 * @return {void}
 *
 * @todo Navigation with the keyboard Up and Down
 * @todo Display Not Found msg to user
 * @todo Translate for other languages
 * ------------------------------------------------------
 * @done Auto-focus on input when dropdown is opened
 * @done Add scrollbar to large lists
 */
(function( $ ) {

	$.fn.bsDropDownFilter = function(options) {

		return this.filter(".dropdown-menu").each(function() {
			var $this, $li, $search, $droplist;
			
			$this = $(this).css({
				'overflow-x': 'auto',
				'max-height': 450
			});

			$this.parent().on('shown.bs.dropdown', function(e){
				$(this).find('.dropdown-filter input').focus();
			});

			$li = $('<li role="presentation" class="dropdown-filter"></li>').prependTo($this);

			$search = $('<input type="search" class="form-control" placeholder="Filtrar por:" style="width:96%; margin:0 auto" />')
				.data('dropdownList', $this)
				.bind('click', function(e){
					e.stopPropagation();
				})
				.bind('keyup', function(){
					$droplist = $(this).data('dropdownList');
					$droplist.find('li').show();
					$droplist.find('li:not(:filter("' + this.value + '"))').not('.dropdown-filter').hide();
				})
				.prependTo($li);
		});
	};

	$('[data-filter], .dropdown-filter').bsDropDownFilter();

	// Create a FILTER pseudo class. Like CONTAINS, but case insensitive
	$.expr[":"].filter = $.expr.createPseudo(function(arg) {
		return function( elem ) {
			/*global Diacritics*/
			return Diacritics.clean($(elem).text()).toUpperCase().indexOf(Diacritics.clean(arg).toUpperCase()) >= 0;
		};
	});

}( jQuery ));