var RecommendationController = function( model, view ){

	view.volgendeButton.click(function(){
		if($(".rec").length == 0) {
			var sortedSlots = $("#dropspot").sortable("toArray");
			
			model.setSuitabilityScale(sortedSlots);
						
		} else { 
			alert( 'U heeft waarschijnlijk nog niet alle maatregelen naar een plek op de schaal gesleept. Dit doe u door op de maatregel te klikken met de linkermuisknop, deze vast te houden, en de maatregel met de muis te bewegen naar de juiste plek op de schaal.' );
		}
	});

}