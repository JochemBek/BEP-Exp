var SatisfactionQuestionsView = function (model, container){
	
	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var measureQuestionList		= $( "<div class='list-group' id='setQuestions'>" );
	var volgendeButton	 		= $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( '<div class="clearfix">' );
	var questions;

	container.append( measureQuestionList, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	updateQuestions = function(){

		var questions 			= model.getSatisfactionQuestions();
		measureQuestionList.empty();

		var legend 					= $( "<div id='legend'><span style='float:left'>Helemaal oneens</span><span>Neutraal</span><span  style='float:right'>Helemaal eens</span>" );
		
		$.each( questions, function(key, value) {
			var item 			= $( "<div class='list-group-item'>" );
				item 			.attr( 'id', value.id );
			var text 			= $( "<p style='margin-top:5px; float:left; width:50%' class='list-group-item-text'>" );
				text 			.html(value.question)
				item 			.append(text);
			var radioContainer  = $( "<div class='radioContainer'>" );

			for( i=0; i < value.scale; i++ ){
				var label = $( '<label class="radio-inline" style="width:8%">' );
					var radio = $( '<input type="radio">' );
						radio.attr( 'value', i+1 );
						radio.attr( 'name', value.id );
						label.append( radio );
						//label.append( i+1 );
					radioContainer.append( label );
			}
			item.append( radioContainer );
			if( key == 0 || key == 5 || key == 9){
				legend.clone().appendTo( measureQuestionList );
				clearfix.clone().appendTo( measureQuestionList );
			}
			clearfix.clone().appendTo( item );
			measureQuestionList.append( item );
			
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

		if( args == "questionsReady" ){
			updateQuestions();
		}

		if( args == "setRecommendationDone" ){
			container.show();
		}

		if( args == "satisfactionDone" ){
			container.hide();
		}
	}

	container.hide();
}