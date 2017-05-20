var ExtraQuestionsView = function (model, container){
	
	/***********************************************************
					  Variable Declarations
	***********************************************************/

  var description = $(" <div> <p> U heeft zojuist drie aanbevelingen.... </p> </div> ")
	var extraQuestionList		= $( "<div class='extraQuestions-group' id='extraQuestions'>" );
	var volgendeButton	 		= $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );
	var questions;

	container.append( description, extraQuestionList, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	cleanUp = function() {
		$('.extraQuestions-group').empty();
	}

	displayRecomQuestions = function(){
		var recommendations = model.getRecommendations();
    var units = []; 
		
		for(var i = 0; i < recommendations.length; i++) {
			units[i] = $("<div id='" + recommendations[i].id + "' class='recomunit'> <p> " + recommendations[i].description + " </p> <input type='checkbox' name='wantEmail' value='wantEmail' class='wantEmail'> <input type='checkbox' name='alreadyDo' value='alreadyDo' class='alreadyDo'>  </div> ");
		}
		
		for(var i = 0; i < units.length; i++) {
			extraQuestionList.append(units[i]);
		}

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
			container.hide();
		}
	}

	container.hide();
}