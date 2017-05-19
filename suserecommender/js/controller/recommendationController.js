var RecommendationController = function( model, view ){

	view.volgendeButton.click(function(){
		if($(".rec").length == 0) {
			var sortedSlots = $("#dropspot").sortable("toArray");
			
			model.setSuitabilityScale(sortedSlots);
			
			/*var firstSlot = sortedSlots[0];
			var secondSlot = sortedSlots[1];
			var thirdSlot = sortedSlots[2];
			
			console.log("De volgorde is: " + firstSlot + ", " + secondSlot + ", " + thirdSlot);*/
			
		} else { 
			alert( 'U heeft waarschijnlijk nog niet alle maatregelen naar een plek op de schaal gesleept. Dit doe u door op de maatregel te klikken met de linkermuisknop, deze vast te houden, en de maatregel met de muis te bewegen naar de juiste plek op de schaal.' );
		}
		/*
		var totalNumber = 2;
		var val11 = $('input[name=first]:checked').val();
		var val22 = $('input[name=second]:checked').val();
	
		if( $( '#recommendationList .radio-group #button1 input:checked' ).length + $( '#recommendationList .radio-group #button2 input:checked' ).length < totalNumber ){
			alert( 'U hebt niet uw eerste en tweede keuze aangegeven. Doe dit voordat u verder gaat.' );
		}else if(val11 == val22){
			alert( 'U heeft waarschijnlijk dezelfde maatregel als eerste en tweede keuze aangegeven. Gelieve dit te veranderen voordat u verder gaat');
		}else{
			$("#recommendationList .radio-group").each(function(){
				var measureId = $(this).attr('id');
				var val1 = $(this).find('#button1 input:checked').val();
				var val2 = $(this).find('#button2 input:checked').val();
				var val3 = $(this).find('#button3 input:checked').val();
				if(val1){
					model.setUserSelection(val1, 1 );
				}
				if(val2){
					model.setUserSelection( val2, 2 );
				}
				if(val3){
					model.setUserRecommendation( val3, 1);
				}else{
					model.setUserRecommendation( measureId, 0); 
				}
				/*
				if($('input[name=first]:checked') && $('input[name=second]:checked')){
*//*
			}).promise().done(function(){
				model.setRecommendationDone();	
			});
		}*/
	});

}