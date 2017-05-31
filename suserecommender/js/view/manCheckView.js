var ManCheckView = function (model, container){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var advisorContainer = $("<div style='padding-bottom: 40px' class='advisor-container row'>");
  var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );
	var legend 					= $( "<div id='legend'><span style='float:left'>Helemaal oneens</span><span>Neutraal</span><span  style='float:right'>Helemaal eens</span>" );

	var image1 = $('<img src="img/JoeriCuijpers.jpg" height="133px" width="133px" align="middle">');
	var text1 = $('<p style="font-weight: bold"> Ben Cuijpers </p>');
	var image2 = $('<img src="img/GeertLouws.jpg" height="133px" width="133px" align="middle">');
	var text2 = $('<p style="font-weight: bold"> Geert Louws </p>');
	var image3 = $('<img src="img/RichardDaelmans.jpg" height="133px" width="133px" align="middle">');
	var text3 = $('<p style="font-weight: bold"> Peter Daelmans </p>');
	var image4 = $('<img src="img/JanKleinsma.jpg" height="133px" width="133px" align="middle">');
	var text4 = $('<p style="font-weight: bold"> Jan Kleinsma </p>');

	container.append( advisorContainer, volgendeButton, clearfix );


	/***********************************************************
						Private Variables
	***********************************************************/

	clean = function() {
		$('.descr').remove();
		$('#setQuestions').remove();
		$('#adv').remove();
	}

	displayManCheckQuestions = function(adv){
		var questions  = model.getManCheckQuestions();

		var checkQuestionList		= $( "<div class='col-md-10' id='setQuestions'>" );
		var advisor = $("<div id='adv' style='padding-top: 25px' class='col-md-2'>");

		if(adv == 1) {
			advisor.append(text1);
			advisor.append(image1);
			advisorContainer.attr('id', 'a1');
		} else if (adv == 2) {
			advisor.append(text2);
			advisor.append(image2);
			advisorContainer.attr('id', 'a2');
		} else if (adv == 3) {
			advisor.append(text3);
			advisor.append(image3);
			advisorContainer.attr('id', 'a3');
		} else if (adv == 4) {
			advisor.append(text4);
			advisor.append(image4);
			advisorContainer.attr('id', 'a4');
		}


		$.each( questions, function(key, value) {
			var item 			= $( "<div class='list-group-item'>" );
					item 			.attr( 'id', value.nr );
				var text 			= $( "<p style='margin-top:5px; float:left; width:50%' class='list-group-item-text'>" );
					var q = value.text;
					var newq;
					if(adv == 1) {
						newq = q.replace('Hij', 'Ben');
					} else if (adv == 2){
						newq = q.replace('Hij', 'Geert');
					} else if (adv == 3) {
						newq = q.replace('Hij', 'Peter');
					} else if (adv == 4) {
						newq = q.replace('Hij', 'Jan');
					}
					text 			.html(newq)
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

		if( args == 'manCheck' ){
			clean();
			var adv = model.getAdvMan();
			displayManCheckQuestions(adv);
			container.show();
		}

		if( args == 'manCheckDone' ){
			container.hide();
		}
	}

	container.hide();
}
