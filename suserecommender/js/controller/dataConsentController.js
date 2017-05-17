var DataConsentController = function ( model, view ) {
	
	view.endButton.click(function(){
		var email = view.emailInput.val();
		var meedoen = view.meedoenContainer.find("input:checked").val();
		var consent = view.consentContainer.find("input:checked").val();

		if(meedoen != null && consent != null ){
			if (email != "") { 
				if($('#box1').is(':checked')){
					model.setEmail(email, 1);
				}else{
					model.setEmail(email, 0);
				}
			}
			else
				{model.setEmail("no-email", 0);}
				
			model.setCommentaar($("textarea#comments").val());
			model.setConsent(consent);
			if(meedoen == 1){
				model.setInterested(1);
			}
			else{
				model.setInterested(0);
			}
		
			model.updateUser();
			model.experimentDone();


		}
		else{
			alert( 'U bent waarschijnlijk een vraag vergeten in te vullen!' );
		}
	});

}