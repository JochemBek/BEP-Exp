var ManCheckView = function (model, container){
	
	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var advisorContainer = $("<div style='padding-bottom: 40px' class='advisor-container row'>");
	var volgendeButton	 		= $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );
	var uitleg = $(" <div id='uitleg' style='padding-bottom: 30px'> <p class='descr'> </p> </div> ")
	var legend 					= $( "<div id='legend'><span style='float:left'>Helemaal oneens</span><span>Neutraal</span><span  style='float:right'>Helemaal eens</span>" );
	
	var imageNon = $('<img src="img/JoeriCuijpers.jpg" height="133px" width="133px" align="middle">');
	var textNon = $('<p> Ben Cuijpers </p>');
	var imageExp = $('<img src="img/RichardDaelmans.jpg" height="133px" width="133px" align="middle">');
	var textExp = $('<p> Richard Daelmans </p>');
	
	container.append( uitleg, advisorContainer, volgendeButton, clearfix );


	/***********************************************************
						Private Variables
	***********************************************************/

	clean = function() {
		$('.descr').remove();
		$('#setQuestions').remove();
		$('#adv').remove();
	}

	displayManCheckQuestions = function(expert){
		var questions  = model.getManCheckQuestions();
		
		var checkQuestionList		= $( "<div class='col-md-10' id='setQuestions'>" );
		var advisor = $("<div id='adv' style='padding-top: 25px' class='col-md-2'>");
			
		if(expert == 0) {
			advisor.append(textNon);
			advisor.append(imageNon);
			advisorContainer.attr('id', 'nonexpert');
				var descr = $("<p class='descr'>");
				descr.html("U heeft van twee personen suggesties ontvangen. Beantwoord alstublieft de onderstaande vragen over Ben Cuijpers.");
			$('#uitleg').append(descr);
			expertDone = 1;
		} else {
			advisor.append(textExp);
			advisor.append(imageExp);
			advisorContainer.attr('id', 'expert');
				var descr = $("<p class='descr'>");
				descr.html("U heeft van twee personen suggesties ontvangen. Beantwoord alstublieft de onderstaande vragen over Richard Daelmans.");
			$('#uitleg').append(descr);
			nonExpertDone = 1;
		}
			
		$.each( questions, function(key, value) {
			var item 			= $( "<div class='list-group-item'>" );
					item 			.attr( 'id', value.nr );
				var text 			= $( "<p style='margin-top:5px; float:left; width:50%' class='list-group-item-text'>" );
					text 			.html(value.text)
					item 			.append(text);
				var radioContainer  = $( "<div class='radioContainer'>" );
	
				for( i=0; i < value.scale; i++ ){
					var label = $( '<label class="radio-inline" style="width:8%">' );
						var radio = $( '<input type="radio">' );
							radio.attr( 'value', i+1 );
							radio.attr( 'name', value.nr );
							label.append( radio );
						radioContainer.append( label );
				}
				
				item.append( radioContainer );
				if( key == 0 || key == 6 || key == 10){
					legend.clone().appendTo( checkQuestionList );
					clearfix.clone().appendTo( checkQuestionList );
				}
				clearfix.clone().appendTo( item );
				checkQuestionList.append( item );
				
		});
		
		advisorContainer.append(advisor);
	
		advisorContainer.append(checkQuestionList);
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

		if( args == 'manCheckNonExpert' ){
			clean();
			displayManCheckQuestions(0);
			container.show();
		}
		
		if( args == 'manCheckExpert' ){
			clean();
			displayManCheckQuestions(1);
			container.show();
		}

		if( args == 'manCheckDone' ){
			container.hide();
		}
	}

	container.hide();
}