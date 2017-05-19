var SatisfactionQuestionsView = function (model, container){
	
	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var measureQuestionList		= $( "<div class='list-group' id='setQuestions'>" );
	var volgendeButton	 		= $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );
	var questions;

	container.append( measureQuestionList, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	updateQuestions = function(){
		var questions = model.getQualityQuestions();
		
		var questionElements = [];
		
		for(var i = 0; i < questions.length; i++) {
			questionElements[i] = $("<div id='" + questions[i].nr + "' class='question'> <p>'" + questions[i].text + "'</p> <div> <ul class='likert'> <li> Helemaal mee oneens </li> <li><input type='radio' name='guilty' value='1' /></li> <li><input type='radio' name='guilty' value='2' /></li> <li><input type='radio' name='guilty' value='3' /></li> <li><input type='radio' name='guilty' value='4' /></li> <li><input type='radio' name='guilty' value='5' /></li> <li> Helemaal mee eens </li> </ul> </div>");
		}
		
		for(var i = 0; i < questions.length; i++) {
			measureQuestionList.append(questionElements[i]);
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

		if( args == 'recommendationsDone' ){
			updateQuestions();
			container.show();
		}

		if( args == 'qualityQuestionsDone' ){
			container.hide();
		}
	}

	container.hide();
}