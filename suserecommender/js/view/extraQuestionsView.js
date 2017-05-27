var ExtraQuestionsView = function (model, container){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var extraQuestionList		= $( "<div class='extraQuestions-group' id='extraQuestions'>" );
	var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' id='extramargin' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );

	container.append( extraQuestionList, volgendeButton, clearfix );

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
