var InformedConsentController = function(model, view, facebookApi){

	view.startButton.click(function(){
		model.createUser();
	});

}