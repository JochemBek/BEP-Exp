var ManCheckView = function (model, container){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

  var uitleg = $(" <div style='padding-bottom: 30px'> <p> U heeft van twee personen suggesties ontvangen. Beantwoord alstublieft de onderstaande vragen over deze personen. </p> </div> ")
	var advisorContainerOne = $("<div style='padding-bottom: 40px' class='advisor-container row'>");
	var advisorContainerTwo = $("<div class='advisor-container row'>");
	var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );

	container.append(advisorContainerOne, advisorContainerTwo, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	displayManCheckQuestions = function(){
		var questions  = model.getManCheckQuestions();
    var firstAdvisor = model.getRandomAdvisor();

		var legend 					= $( "<div id='legend'><span style='float:left'>Helemaal oneens</span><span>Neutraal</span><span  style='float:right'>Helemaal eens</span>" );
		var checkQuestionListOne		= $( "<div class='col-md-10' id='setQuestions'>" );
		var checkQuestionListTwo		= $( "<div class='col-md-10' id='setQuestions'>" );

		var advisorOne = $("<div style='padding-top: 25px' class='col-md-2'>");
		var advisorTwo = $("<div style='padding-top: 25px' class='col-md-2'>");
		var imageNon = $('<img src="img/JoeriCuijpers.jpg" height="133px" width="133px" align="middle">');
		var imageExp = $('<img src="img/RichardDaelmans.jpg" height="133px" width="133px" align="middle">');
		var textNon = $('<p> Ben Cuijpers </p>');
		var textExp = $('<p> Richard Daelmans </p>');


    if(firstAdvisor == 1) {

			advisorOne.append(textExp);
			advisorOne.append(imageExp);
			advisorTwo.append(textNon);
			advisorTwo.append(imageNon);

			advisorContainerOne.attr('id', 'expert');
			advisorContainerTwo.attr('id', 'nonexpert');

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
							//label.append( i+1 );
						radioContainer.append( label );
				}

				item.append( radioContainer );
				if( key == 0 || key == 6 || key == 10){
					legend.clone().appendTo( checkQuestionListOne );
					clearfix.clone().appendTo( checkQuestionListOne );
				}
				clearfix.clone().appendTo( item );
				checkQuestionListOne.append( item );

			});

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
							radio.attr( 'name', value.nr+10 );
							label.append( radio );
							//label.append( i+1 );
						radioContainer.append( label );
				}

				item.append( radioContainer );
				if( key == 0 || key == 6 || key == 10){
					legend.clone().appendTo( checkQuestionListTwo );
					clearfix.clone().appendTo( checkQuestionListTwo );
				}
				clearfix.clone().appendTo( item );
				checkQuestionListTwo.append( item );

			});

    } else {

			advisorOne.append(textNon);
			advisorOne.append(imageNon);
			advisorTwo.append(textExp);
			advisorTwo.append(imageExp);


			advisorContainerOne.attr('id', 'nonexpert');
			advisorContainerTwo.attr('id', 'expert');

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
							radio.attr( 'name', value.nr+10 );
							label.append( radio );
							//label.append( i+1 );
						radioContainer.append( label );
				}

				item.append( radioContainer );
				if( key == 0 || key == 6 || key == 10){
					legend.clone().appendTo( checkQuestionListOne );
					clearfix.clone().appendTo( checkQuestionListOne );
				}
				clearfix.clone().appendTo( item );
				checkQuestionListOne.append( item );

			});

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
							//label.append( i+1 );
						radioContainer.append( label );
				}

				item.append( radioContainer );
				if( key == 0 || key == 6 || key == 10){
					legend.clone().appendTo( checkQuestionListTwo );
					clearfix.clone().appendTo( checkQuestionListTwo );
				}
				clearfix.clone().appendTo( item );
				checkQuestionListTwo.append( item );

			});
    }


		advisorContainerOne.append(advisorOne);
		advisorContainerTwo.append(advisorTwo);

		advisorContainerOne.append(checkQuestionListOne);
		advisorContainerTwo.append(checkQuestionListTwo);

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

		if( args == 'manCheck' ){
			displayManCheckQuestions();
			container.show();
		}

		if( args == 'manCheckDone' ){
			console.log(args);
			container.hide();
		}
	}

	container.hide();
}
