var DemographicsController = function( model, view ){

	view.volgendeButton.click(function(){
		var email = view.emailInput.val();
		var age = $("#leeftijd").val();
		var gender = $( '#geslacht').val();
		var study =  $( '#opleiding').val();
		var living = $( '#woonsitu').val();
		var money = $( '#inkomst').val();
				
		if( (gender == 1 || gender == 0)  && study != 0 && living != 0 && money != 0 ) {
			model.updateUser(email, age);
			model.sendEmail(email);
			model.demographicsDone();
		} else {
			alert( 'U bent waarschijnlijk een vraag vergeten!' );
		}
	});
	
}