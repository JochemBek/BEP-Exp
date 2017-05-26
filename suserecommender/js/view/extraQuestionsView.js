var ExtraQuestionsView = function (model, container){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

  var description = $(" <div style='padding-bottom: 25px'> <p> We willen u graag op weg helpen naar een bewuste leefstijl. U kunt daarom, indien u dit wenst, meer informatie ontvangen over de drie besparingsmaatregelen die u zojuist heeft gezien. Wenst u meer informatie te ontvangen over een of meerdere besparingsmaatregelen? Vink dit dan bij de juiste maatregel(en) in de eerste kolom aan. U zal dan na afloop van dit experiment een mail ontvangen met de betreffende details. Voert u een of meerdere van de maatregelen al uit? Vink dit dan bij de juiste maatregel(en) in de tweede kolom aan. </p> </div> ");
	var extraQuestionList		= $( "<div class='extraQuestions-group' id='extraQuestions'>" );
	var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' id='extramargin' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );

	container.append( description, extraQuestionList, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	cleanUp = function() {
		$('.extraQuestions-group').empty();
	}

	displayRecomQuestions = function(){
		var recommendations = model.getRecommendations();

		var legend 					= $( "<div id='legends' class='row'><div class='col-md-6'></div><div class='col-md-3'><p>1. Ik zou graag meer informatie willen ontvangen over deze maatregel.</p></div> <div class='col-md-3'><p>2. Ik voer deze maatregel al uit.</p></div>" );
		extraQuestionList.append(legend);

		$.each(recommendations, function(key, value) {
			var item = $("<div class='list-group-item row'>");
				item.attr('id', value.id);
			var textContainer = $("<div class='col-md-6'>");
			var text = $( "<p class='list-group-item-text'>" );
				text.html(value.infinitive);
				textContainer.append(text)
			item.append(textContainer);


			var emailCheckboxContainer =  $( "<div class='col-md-3'>" );
				var checkboxEmail = $( "<input type='checkbox' name='wantEmail' value='wantEmail' class='wantEmail'>" );
			emailCheckboxContainer.append( checkboxEmail );

			item.append( emailCheckboxContainer );

			var alreadyDoCheckboxContainer =  $( "<div class='col-md-3'>" );
				var checkboxAlreadyDo = $( "<input type='checkbox' name='alreadyDo' value='alreadyDo' class='alreadyDo'>" );
			alreadyDoCheckboxContainer.append( checkboxAlreadyDo );

			item.append( alreadyDoCheckboxContainer );

			extraQuestionList.append( item );

			var space = $("<div style='height: 10px' class='row'>");

			extraQuestionList.append( space );


		});

		/*
		for(var i = 0; i < recommendations.length; i++) {
			units[i] = $("<div id='" + recommendations[i].id + "' class='recomunit'> <p> " + recommendations[i].description + " </p> <input type='checkbox' name='wantEmail' value='wantEmail' class='wantEmail'> <input type='checkbox' name='alreadyDo' value='alreadyDo' class='alreadyDo'>  </div> ");
		}

		for(var i = 0; i < units.length; i++) {
			extraQuestionList.append(units[i]);
		}*/

	}

	/***********************************************************
						Public Variables
	***********************************************************/

	this.volgendeButton 		= volgendeButton;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );

	this.update = function( args ){

		if( args == 'qualityQuestionsDone' ){
			$.when(cleanUp()).then(displayRecomQuestions());
      console.log("Extra Questions View is in actiones!");
			container.show();
		}

		if( args == 'extraQuestionsDone' ){
			console.log(args);
			container.hide();
		}
	}

	container.hide();
}
