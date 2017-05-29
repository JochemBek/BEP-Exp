var DemographicsController = function( model, view ){

	view.volgendeButton.click(function(){
		var email = view.emailInput.val();
		var age = $("#leeftijd").val();
		var gender = $( '#geslacht').val();
		var study =  $( '#opleiding').val();
		
		if(email != "" && age != "" && (gender == 1 || gender == 0)  && (study == 4 || study == 1 || study == 2 || study == 3 || study == 5 || study == 6 || study == 7 || study == 8 || study == 9) ) {
			model.updateUser(email, age);
			model.sendEmail(email);
			model.demographicsDone();
		} else {
			alert( 'U bent waarschijnlijk een vraag vergeten!' );
		}
	});
	
}