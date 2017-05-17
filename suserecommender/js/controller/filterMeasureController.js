var FilterMeasureController = function ( model, view ){
	
	view.volgendeButton.click(function(){

		if( $( '#woonsitu').val() == 0 || $( '#inkomst').val() == 0 ){
			alert("U heeft waarschijnlijk niet alle vragen beantwoord!");
		}else{
			model.filterMeasures();
		}
  	})

}