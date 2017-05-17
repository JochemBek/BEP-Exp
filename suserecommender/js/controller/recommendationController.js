var RecommendationController = function( model, view ){

	view.volgendeButton.click(function(){
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
*/
			}).promise().done(function(){
				model.setRecommendationDone();	
			});
		}
	});

}