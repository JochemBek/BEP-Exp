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
		console.log("I'm here");
		var questions = model.getQualityQuestions();
		measureQuestionList.empty();

		var legend 					= $( "<div id='legend'><span style='float:left'>Helemaal oneens</span><span>Neutraal</span><span  style='float:right'>Helemaal eens</span>" );
		
		$.each( questions, function(key, value) {
			var item 			= $( "<div class='list-group-item'>" );
				item 			.attr( 'id', value.nr );
			var text 			= $( "<p style='margin-top:5px; float:left; width:50%' class='list-group-item-text'>" );
				text 			.html(value.question)
				item 			.append(text);
			var radioContainer  = $( "<div class='radioContainer'>" );

			for( i=0; i < value.scale; i++ ){
				var label = $( '<label class="radio-inline" style="width:8%">' );
					var radio = $( '<input type="radio">' );
						radio.attr( 'value', i+1 );
						radio.attr( 'name', value.nr );
						label.append( radio );
						//label.append( i+1 );
					radioContainer.append( label );
			}
			
			item.append( radioContainer );
			if( key == 0 || key == 6 || key == 10){
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