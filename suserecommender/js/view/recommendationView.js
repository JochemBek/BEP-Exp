/* JOCHEM: 
Dit wordt de view voor de recommendations; slide 5 van de mockup 
*/

var RecommendationView = function( model,container ){

	/***********************************************************
					  Variable Declarations
	***********************************************************/
	var beschrijving = $();


	var omschrijvingsblok		= $( "<div id='description'>");
	var vraagstelling			= $( "<h4 id='vraagstelling' style='margin-left:30%; width:70%; float:left;'>Selecteer van onderstaande maatregelen uw 1e en 2e keuze die u het liefste in de nabije toekomst zou willen uitvoeren. Klik tevens op 'dit doe ik al' als u een maatregel al uitvoert.</h4>");
	
	var leeghalfblok			= $( "<div id='leeghalfblok' style='width:40%'>");
	var ja						= $( "<div id='ja' style='font-weight:bold; display:inline-block; width:20%'>1e keuze</div>");
	var nee						= $( "<div id='nee' style='font-weight:bold; display:inline-block; width:40%'>2e keuze</div>");
	var doeikal 				= $( "<div id='doeikal' style='font-weight:bold; display:inline-block; width:30%'>Dit doe ik al</div>");
	var ondersteregel			= $( "<div id='ondersteregel' style='margin-left:68.5%; width: 28%; text-align:center'>");
	ondersteregel.append(ja,nee,doeikal);
	omschrijvingsblok.append(vraagstelling,ondersteregel);

	var div						= $( "<div id='blok' style='width: 30%; float: left'>");
	var recommendationList		= $( "<ul id='recommendationList' class='list-group' style='width:70%; float:left;'>" );
	var hoverlist				= $( "<ul id='hoverlist' class='list-group'>" );
	var volgendeButton	 		= $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );

	
	/***********************************************************
						Private Variables
	***********************************************************/
	
	findRecommendations = function(){ 
		var advisor = model.getAdvisor();
		if (advisor == 0) { // non-expert
			console.log("Advisor is een non-expert");
		}  
		if (advisor == 1) { // expert
			console.log("Advisor is een expert");
		}
		
		var form = model.getForm();
		console.log("De vorm is: " + form);
		if (form == 0) { // telling
			console.log("De vorm is telling");
		} 
		if (form == 1) { // sharing
			console.log("De vorm is sharing");
		}
		
		var recommendations = model.getRecommendations();
		console.log("De recommendation on level is : " + recommendations[0].description);
		
	}
	
	
	updateRecommendationList = function(){

		//retrieve measure questions, at the moment it's just an object (not an array)
		var measureQuestions = model.getMeasureQuestions();

		recommendationList.empty();
		var recommendation = model.getRecommendation();

		for( i=0; i<recommendation.length; i++ ){

			if ( model.o.condition == 1 || model.o.condition == 2 ){
				var a 				= $("<li class='list-group-item' style='top:" + i*66 + "px; background-color:#C6E6F0' >");
			} else {
				var a 				= $("<li class='list-group-item' style='top:" + i*45 + "px; background-color:#C6E6F0' >");
			}
				a.attr('id', recommendation[i].id);

			var content			= $("<p class='list-group-item-text' style='font-weight:bold'>");
				content.html(recommendation[i].description)

			var b 				= $("<li class='list-group-item' style='display:inline-block; width:55%'>");
				b.attr('id', recommendation[i].id);
			var title 			= $("<h4 class='list-group-item-heading'>");
				title.html(recommendation[i].name);
			
			if ( model.o.condition == 1 || model.o.condition == 2 ){
				var friends			= $("<p style='background-color:#0398C5; color:white; display:inline-block; font-size: 14px; font-weight:bold; padding-left:2%; padding-right:2%; margin-bottom:0px'> "+recommendation[i].friends+" gebruikers doen dit al</p>")
			}		

			var radioContainer	= $( "<div class='radio-group' style='margin-left:1px; display: inline-block; width:40%; margin-top:0px; margin-bottom:0px; padding:0px; text-align:center;'>" );
				radioContainer.attr('id', recommendation[i].id);


			for( k=0; k<measureQuestions[0].scale; k++ ){
				if ( model.o.condition == 1 || model.o.condition == 2 ){
					var button1			= $( "<div id='button1' style='width:30%; height:64px; border: solid 1px; padding-top: 21px; border-color: #D8D8D8; cursor: pointer; display:inline-block; background-color:#5bc0de; text-align:center'>");
					var button2			= $( "<div id='button2' style='width:30%; height:64px; border: solid 1px; padding-top: 21px; border-color: #D8D8D8; cursor: pointer; display:inline-block; background-color:#C6E6F0; text-align:center'>");
					var button3			= $( "<div id='button3' style='width:40%; height:64px; border: solid 1px; padding-top: 21px; border-color: #D8D8D8; cursor: pointer; display:inline-block; background-color:#5bc0de; text-align:center'>");
					var radio 			= $( '<input id="knop" type="radio" style="vertical-align:middle; margin-bottom:30px">' );
					var checkbox		= $( '<input id="box" type="checkbox" style="vertical-align:middle; margin-bottom:30px">');
				} else {
					var button1			= $( "<div id='button1' style='width:30%; height:43px; border: solid 1px; border-color: #D8D8D8; cursor: pointer; display:inline-block; background-color:#5bc0de; vertical-align:middle; text-align:center'>");
					var button2			= $( "<div id='button2' style='width:30%; height:43px; border: solid 1px; border-color: #D8D8D8; cursor: pointer; display:inline-block; background-color:#C6E6F0; vertical-align:middle; text-align:center'>");
					var button3			= $( "<div id='button3' style='width:40%; height:43px; border: solid 1px; border-color: #D8D8D8; cursor: pointer; display:inline-block; background-color:#5bc0de; vertical-align:middle; text-align:center'>");
					var radio 			= $( '<input id="knop" type="radio" style="vertical-align:middle;">' );
					var checkbox		= $( '<input id="box" type="checkbox" style="vertical-align:middle;">');
				}
				


				if( k == 0 ){
					radio.attr( 'value', recommendation[i].id ); // ja = 1; nee = 2; doe ik al = 3
					radio.attr( 'name', 'first');
					button1.append( radio );
					radioContainer.append(button1);
				}else if( k == 1){
					radio.attr( 'value', recommendation[i].id ); // ja = 1; nee = 2; doe ik al = 3
					radio.attr( 'name', 'second');
					button2.append( radio );
					radioContainer.append(button2);
				}else if( k == 2 ){
					checkbox.attr( 'value', recommendation[i].id);
					button3.append( checkbox );
					radioContainer.append(button3);
				}
			}

			a.append( content );
			if ( model.o.condition == 1 || model.o.condition == 2 ){
				b.append( title, friends );
			} else {
				b.append( title );
			}
			a.hide();

			hoverlist.append( a );
			recommendationList.append( b, radioContainer );
/*
			b.click(function(){
				$('#recommendationList .list-group-item').each(function(){
					$(this).removeClass('active');
				});
				$(this).addClass('active');
			});
*/
			b.mouseover(function() {
				var idx = $('#recommendationList li').index(this);
				$('#hoverlist li').eq(idx).show();
				$( this ).css("background-color","#C6E6F0");
				model.trackHover(idx, 1); //betekent dat je het vak in gaat
			});
			b.mouseout(function() {
				var idt = $('#recommendationList li').index(this);
				$('#hoverlist li').eq(idt).hide();
				$( this ).css("background-color","white");
				model.trackHover(idt, 0); //betekent dat je het vak in gaat
			});

			/* DIT WERKT WEL MAAR DIT IS LAYOUT-TECHNISCH EEN CRIME
			b.hover(
				function() {
					$( this).prepend( $( "<span> *** </span>"));
				},
				function() {
					$(this).find( "span:last").remove();
				});
*/
		}
		div.append(hoverlist);
	}

	/***********************************************************
						Public Variables
	***********************************************************/

	this.recommendationList 	= recommendationList;
	this.volgendeButton 		= volgendeButton;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );
	this.update = function( args ){
		if( args == "informationDone" ){
			//updateRecommendationList();
			findRecommendations();
			setTimeout(function() {
			    container.slideUp();
			    container.append( volgendeButton );
			    container.slideDown();
			}, 1000);
		}
		if( args == "setRecommendationDone" ){
			container.hide();
		}
	}

	// hide on start
	container.hide();
}