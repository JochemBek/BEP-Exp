var SatisfactionQuestionsView = function (model, container){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var measureQuestionList		= $( "<div class='list-group' id='setQuestions'>" );
	var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );
	var questions;

	container.append( measureQuestionList, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	cleanUpQuality = function () {
		$('.list-group').empty();
	}

	updateQuestions = function(){
		var questions = model.getQualityQuestions();

		var questionElements = [];

		for(var i = 0; i < questions.length; i++) {
			questionElements[i] = $("<div id='" + questions[i].nr + "' class='question'> <p>'" + questions[i].text + "'</p> <div> <ul id='q" + questions[i].nr + "cont' class='likert'> <li> Helemaal mee oneens </li> <li><input type='radio' name='q" + questions[i].nr + "' value='1' /></li> <li><input type='radio' name='q" + questions[i].nr + "' value='2' /></li> <li><input type='radio' name='q" + questions[i].nr + "' value='3' /></li> <li><input type='radio' name='q" + questions[i].nr + "' value='4' /></li> <li><input type='radio' name='q" + questions[i].nr + "' value='5' /></li> <li> Helemaal mee eens </li> </ul> </div>");
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
			$.when(cleanUpQuality()).then(updateQuestions());
			container.show();
		}

		if( args == 'qualityQuestionsDone' ){
			container.hide();
		}
	}

	container.hide();
}
