var DemographicsController = function( model, view ){

	view.volgendeButton.click(function(){
		//var email = view.emailInput.val();
		//var meedoen = view.meedoenContainer.find("input:checked").val();

		/*if(email != "" && meedoen != null){
			model.setEmail(email);
			if(meedoen == 1){
				model.setInterested(true);
			}
			else{
				model.setInterested(false);
			}
			model.updateUser();

			$(view.form).hide();
			$(view.bedankt).show();
			//$(view.shareBox).show();
			$(view.volgendeButton).hide();
		}
		else{
			alert( 'U bent waarschijnlijk een vraag vergeten!' );
		}*/
		if ( model.demographicsCheck() == 0 || $("#leeftijd").val() == '' ){
			alert( 'U bent waarschijnlijk een vraag vergeten in te vullen!' );
		}else if(isNaN( $("#leeftijd").val() )){
			alert( 'U kunt alleen een getal invullen bij leeftijd');
		}else{
			model.setLeeftijd($("#leeftijd").val());
			model.demographicsDone();
		}

	});
}