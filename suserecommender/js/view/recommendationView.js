/* JOCHEM:
Dit wordt de view voor de recommendations; slide 5 van de mockup
*/

var RecommendationView = function( model,container ){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var recommendations 		= [];

	var omschrijvingsblok		= $( "<div id='description'>");

	var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var cont = 1;


	/***********************************************************
						Private Variables
	***********************************************************/

	findRecommendations = function(callback){
		var description;
		var recommend;
		var dropContainer 			= $( "<ul id='dropspot'> <li id='slotOne' class='drop'> </li> <li id='slotTwo' class='drop'> </li> <li id='slotThree' class='drop'> </li> </ul>" );

		var advisor = model.getAdvisor();
		if (advisor == 0) { // non-expert
			console.log("Advisor is een non-expert");
			description = $("<div class='advisorDescr'> <p> Joeri Cuijpers heeft al eerder de besparingshulp gebruikt om een aantal geschikte energiemaatregelen te vinden.  Hij heeft 3 suggesties voor u. Gebaseerd op uw eerder vastgestelde energieprofiel zijn deze mogelijk relevant voor u. Wij vragen u zijn aanbevelingen te sorteren op basis van de toepasselijkheid op uw huidige situatie.</p> </div>");
		}
		if (advisor == 1) { // expert
			console.log("Advisor is een expert");
			description = $("<div class='advisorDescr'> <p> Richard Daelmans is een expert op het gebied van energiebesparing. Hij heeft 10 jaar werkervaring als energieconsulent. Hij heeft 3 aanbevelingen voor u, gebaseerd op uw eerder vastgestelde energieprofiel. Wij vragen u zijn aanbevelingen te sorteren op basis van de toepasselijkheid op uw huidige situatie.</p> </div>");
		}

		var form = model.getForm();
		console.log("De vorm is: " + form);

		recommendations = model.getRecommendations();

		if (form == 0) { // telling
			recommend = $("<center><div id='" + recommendations[0].id + "' class='rec btn btn-primary rec1'> <p>" + recommendations[0].name + " </p> </div> <div id='" + recommendations[1].id + "' class='rec btn btn-primary rec2'> <p>" + recommendations[1].name + " </p> </div> <div id='" + recommendations[2].id + "' class='rec btn btn-primary rec3'> <p>" + recommendations[2].name + " </p> </div><center>");
		}
		if (form == 1) { // sharing
			recommend = $("<center><div id='" + recommendations[0].id + "' class='rec btn btn-primary rec1'> <p>" + recommendations[0].name + " </p> </div> <div id='" + recommendations[1].id + "' class='rec btn btn-primary rec2'> <p>" + recommendations[1].name + " </p> </div> <div id='" + recommendations[2].id + "' class='rec btn btn-primary rec3'> <p>" + recommendations[2].name + " </p> </div><center>");
		}

		omschrijvingsblok.append(description, recommend);
		container.append(omschrijvingsblok, dropContainer, volgendeButton );
		console.log(dropContainer);

		callback.call();
	}

	makeDraggable = function() {
		$('.rec1').draggable({
      revert: true,
    });
		$('.rec2').draggable({
      revert: true,
    });
		$('.rec3').draggable({
      revert: true,
    });

		$('#dropspot').sortable({
			axis: "y"
		});

		console.log("I'm making droppables etc!");
		$('#slotOne').droppable({
			accept: ".rec",
			tolerance: "pointer",
			activate: function(event, ui) {
				console.log("You can now drop!");
				$(this).addClass("highlightDrop");
			},
      deactivate: function(event, ui) {
        $(this).removeClass("highlightDrop");
      },
			over: function(event, ui) {
				console.log("Over!");
				$(this).removeClass("highlightDrop");
				$(this).addClass("over");
			},
      out: function(event, ui) {
        $(this).removeClass("over");
        $(this).addClass("highlightDrop");
      },
			drop: function(event , ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				console.log("Dropped!");
				$(this).removeClass("over");
				$(this).addClass("dropped");
				var rec = $(ui.draggable).attr('id');
				$(ui.draggable).remove();
				$(this).attr('id', rec);
			}
		});
		$('#slotTwo').droppable({
			accept: ".rec",
			tolerance: "pointer",
			activate: function(event, ui) {
				console.log("You can now drop!");
				$(this).addClass("highlightDrop");
			},
      deactivate: function(event, ui) {
        $(this).removeClass("highlightDrop");
      },
			over: function(event, ui) {
				console.log("Over!");
				$(this).removeClass("highlightDrop");
				$(this).addClass("over");
			},
      out: function(event, ui) {
        $(this).removeClass("over");
        $(this).addClass("highlightDrop");
      },
			drop: function(event , ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				console.log("Dropped!");
				$(this).removeClass("over");
				$(this).addClass("dropped");
				var rec = $(ui.draggable).attr('id');
				$(ui.draggable).remove();
				$(this).attr('id', rec);
			}
		});
		$('#slotThree').droppable({
			accept: ".rec",
			tolerance: "pointer",
			activate: function(event, ui) {
				console.log("You can now drop!");
				$(this).addClass("highlightDrop");
			},
      deactivate: function(event, ui) {
        $(this).removeClass("highlightDrop");
      },
			over: function(event, ui) {
				console.log("Over!");
				$(this).removeClass("highlightDrop");
				$(this).addClass("over");
			},
      out: function(event, ui) {
        $(this).removeClass("over");
        $(this).addClass("highlightDrop");
      },
			drop: function(event , ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				console.log("Dropped!");
				$(this).removeClass("over");
				$(this).addClass("dropped");
				var rec = $(ui.draggable).attr('id');
				$(ui.draggable).remove();
				$(this).attr('id', rec);
			}
		});
	}

	clearUp = function() {
		console.log("Clearing up!");
		$('.advisorDescr').remove();
		$('#dropspot').sortable("destroy");
		$('#dropspot').remove();

		$('.drop').each(function() {
			$(this).droppable("destroy");
			$(this).remove();
		});
	}

	/*
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
*//*
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
*/
			/* DIT WERKT WEL MAAR DIT IS LAYOUT-TECHNISCH EEN CRIME
			b.hover(
				function() {
					$( this).prepend( $( "<span> *** </span>"));
				},
				function() {
					$(this).find( "span:last").remove();
				});
*//*
		}
		div.append(hoverlist);
	}*/

	/***********************************************************
						Public Variables
	***********************************************************/

	//this.recommendationList 	= recommendationList;
	this.volgendeButton 		= volgendeButton;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );
	this.update = function( args ){
		if( args == "informationDone" ){
			//updateRecommendationList();
			findRecommendations(makeDraggable);
			container.show();
		}
		if( args == "recommendationsDone" ){
			container.hide();
		}
		if( args == "nextRecommendation") {
			$.when(clearUp()).then(findRecommendations(makeDraggable));
			container.show();
		}
	}

	// hide on start
	container.hide();
}
