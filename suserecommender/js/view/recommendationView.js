var RecommendationView = function( model,container ){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var recommendations 		= [];
	var omschrijvingsblok		= $( "<div id='description'>");
	var volgendeButton	 		= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var cont = 1;
	var nameadvisor;
	var taskExpl;

	var completecontainer		= $("<div class=''></div>");
	var upperhalf						= $("<div class='list-group-item' id='parentupper'></div>");
	var lowerhalf						= $("<div class='parentlower'></div>");
	var upperleft						= $("<div class='' id='leftupper'></div>");
	var upperright					= $("<div class='parentrightupper' id='rightupper'></div>");
	var advDescr						= $("<div class='childrightupper'></div>");
	var titleRecom					= $("<div class='childrightupper'></div>");
	var recomButtons				= $("<div class='childrightupper'></div>");

	var scaleDrop 					= $("<div class='childlower parent' id='scaleDrop'></div>");
	var clearfix 						= $("<div class='clearfix'></div>")

		var list									= $( "<div class='list-group'>" );
		var item									= $( "<div class='list-group-item' id='parentbox'>" );
		var image 								= $( "<div class='image' id='imgleft'>");
		var mostSuit							= $( "<div class='child'><h5>Meest Toepasselijk</h5></div>");
		var leastSuit							= $( "<div class='child'><h5>Minst Toepasselijk</h5></div>");



	/***********************************************************
						Private Variables
	***********************************************************/

	findRecommendations = function(callback){
		var description;
		var recommend;
		var dropContainer 			= $( "<div class='child'><ul id='dropspot'> <li style='display: table' id='slotOne' class='drop'> </li> <li style='display: table' id='slotTwo' class='drop'> </li> <li style='display: table' id='slotThree' class='drop'> </li> </ul></div>" );

		var advisor = model.getAdvisor();
		var form = model.getForm();
		if (advisor == 1 && form == 0) { // non-expert1 & telling
			console.log("Advisor is een non-expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Hallo, ik ben Ben Cuijpers. Ik heb afgestudeerd in Japanstudies en werk als vertaler in Den Haag.  <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik heb al eerder de besparingshulp gebruikt om een aantal geschikte energiemaatregelen te vinden. Na uw energieprofiel te hebben bekeken, heb ik drie suggesties voor u:</p> </div>");
			image = $('<img src="img/JoeriCuijpers.jpg" height="200px" width="200px">');
			nameadvisor = "Ben";
		}
		if (advisor == 2 && form == 0) { // non-expert2 & telling
			console.log("Advisor is een non-expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Hallo, ik ben Geert Louws. Ik ben afgestudeerd in rechten en werk als advocaat in Utrecht. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik heb al eerder de besparingshulp gebruikt om een aantal geschikte energiemaatregelen te vinden. Na uw energieprofiel te hebben bekeken, heb ik drie suggesties voor u:</p> </div>");
			image = $('<img src="img/GeertLouws.jpg" height="200px" width="200px">');
			nameadvisor = "Geert";
		}
		if (advisor == 3 && form == 0) { // expert3 & telling
			console.log("Advisor is een expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Goedendag, ik ben Peter Daelmans. Ik ben afgestuurd in duurzaamheidswetenschappen en werk als energieconsulent in Leiden. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik ben bekend met deze besparingshulp, en heb op basis van uw energieprofiel drie suggesties voor u:</p> </div>");
			image = $('<img src="img/RichardDaelmans.jpg" height="200px" width="200px">');
			nameadvisor = "Peter";
		}
		if (advisor == 4 && form == 0) { // expert4 & telling
			console.log("Advisor is een expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Goedendag, ik ben Jan Kleinsma. Ik ben afgestuurd in ecologie en werk als besparingsdeskundige in Rotterdam. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik ben bekend met deze besparingshulp, en heb op basis van uw energieprofiel drie suggesties voor u:</p> </div>");
			image = $('<img src="img/JanKleinsma.jpg" height="200px" width="200px">');
			nameadvisor = "Jan";
		}

		if (advisor == 1 && form == 1) { // non-expert1 & sharing
			console.log("Advisor is een non-expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Hallo, ik ben Ben Cuijpers. Ik heb afgestudeerd in Japanstudies en werk als vertaler in Den Haag. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik heb al eerder de besparingshulp gebruikt om een aantal geschikte energiemaatregelen te vinden. Ik pas de volgende drie maatregelen toe, die wellicht ook voor u geschikt kunnen zijn op basis van uw energieprofiel:</p> </div>");
			image = $('<img src="img/JoeriCuijpers.jpg" height="200px" width="200px">');
			nameadvisor = "Ben";
		}
		if (advisor == 2 && form == 1) { // non-expert2 & sharing
			console.log("Advisor is een non-expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Goedendag, ik ben Geert Louws. Ik ben afgestudeerd in rechten en werk als advocaat in Utrecht. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik heb al eerder de besparingshulp gebruikt om een aantal geschikte energiemaatregelen te vinden. Ik pas de volgende drie maatregelen toe, die wellicht ook voor u geschikt kunnen zijn op basis van uw energieprofiel:</p> </div>");
			image = $('<img src="img/GeertLouws.jpg" height="200px" width="200px">');
			nameadvisor = "Geert";
		}
		if (advisor == 3 && form == 1) { // expert3 & sharing
			console.log("Advisor is een expert");
			description = $("<div class='advisorDescr' id='descrright'> <p> Goedendag, ik ben Peter Daelmans. Ik ben afgestuurd in duurzaamheidswetenschappen en werk als energieconsulent in Leiden. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik ben bekend met deze besparingshulp. Ik pas de volgende drie maatregelen toe, die wellicht ook voor u geschikt kunnen zijn op basis van uw energieprofiel:</p> </div>");
			image = $('<img src="img/RichardDaelmans.jpg" height="200px" width="200px">');
			nameadvisor = "Peter";
		}
		if (advisor == 4 && form == 1) { // expert4 & sharing
			console.log("Advisor is een expert");
			description = $("<div class='advisorDescr' id='descrright'> <p>  Hallo, ik ben Jan Kleinsma. Ik ben afgestuurd in ecologie en werk als besparingsdeskundige in Rotterdam. <hr style='margin: 2px; height:1pt; visibility:hidden;'/>Ik ben bekend met deze besparingshulp. Ik pas de volgende drie maatregelen toe, die wellicht ook voor u geschikt kunnen zijn op basis van uw energieprofiel:</p> </div>");
			image = $('<img src="img/JanKleinsma.jpg" height="200px" width="200px">');
			nameadvisor = "Jan";
		}


		console.log("De vorm is: " + form);

		recommendations = model.getRecommendations();
		console.log(recommendations);

		if (form == 0) { // telling
			recommend = $("<center><div class='addmargin'><div id='" + recommendations[0].id + "' class='rec buttonrec rec1'> <p>" + recommendations[0].telling + " </p> </div> <div id='" + recommendations[1].id + "' class='rec   buttonrec rec2'> <p>" + recommendations[1].telling + " </p> </div> <div id='" + recommendations[2].id + "' class='rec   buttonrec rec3'> <p>" + recommendations[2].telling + " </p> </div></div><center>");
		}
		if (form == 1) { // sharing
			recommend = $("<center><div class='addmargin'><div id='" + recommendations[0].id + "' class='rec buttonrec rec1'> <p>" + recommendations[0].sharing + " </p> </div> <div id='" + recommendations[1].id + "' class='rec   buttonrec rec2'> <p>" + recommendations[1].sharing + " </p> </div> <div id='" + recommendations[2].id + "' class='rec   buttonrec rec3'> <p>" + recommendations[2].sharing + " </p> </div></div><center>");
		}
		taskExpl						= $("<p class='childlower'>Sorteer de drie energietips van "+nameadvisor+". Sleep het advies dat u in uw huidige situatie als ‘meest toepasselijk’ ervaart naar het bovenste vakje. Sleep het advies dat u in uw huidige situatie als ‘minst toepasselijk’ ervaart naar het onderste vakje. Als u de volgorde nog wil veranderen, kunt u de vakjes in de lijst ook onderling verslepen.</p>");
		var h5 										= $( "<b><h4>"+nameadvisor+" heeft de volgende aanbevelingen voor u: </h4></b>")
		container.append(completecontainer, volgendeButton, clearfix);
		completecontainer.append(upperhalf, lowerhalf);
		upperhalf.append(upperleft, upperright);
		lowerhalf.append(taskExpl, scaleDrop);
		upperleft.append(image);
		upperright.append(advDescr, recomButtons);
		scaleDrop.append(mostSuit, dropContainer, leastSuit);
		advDescr.append(description);
		titleRecom.append(h5);
		recomButtons.append(recommend);

		callback							.call();
	}

	makeDraggable = function() {
		$('.rec1').draggable({
      revert: true,
			zIndex: 9999
    });
		$('.rec2').draggable({
      revert: true,
			zIndex: 9999
    });
		$('.rec3').draggable({
      revert: true,
			zIndex: 9999
    });

		$('#dropspot').sortable({
			axis: "y",
			containment: "parent",
			tolerance: "pointer",
			cursor: "pointer"
		});

		$('#slotOne').droppable({
			accept: ".rec",
			tolerance: "pointer",
			activate: function(event, ui) {
				$(this).addClass("highlightDrop");
			},
      deactivate: function(event, ui) {
        $(this).removeClass("highlightDrop");
      },
			over: function(event, ui) {
				$(this).removeClass("highlightDrop");
				$(this).addClass("over");
			},
      out: function(event, ui) {
        $(this).removeClass("over");
        $(this).addClass("highlightDrop");
      },
			drop: function(event , ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				$(this).removeClass("over");
				$(this).addClass("dropped");
				var rec = $(ui.draggable).attr('id');
				$(ui.draggable).remove();
				var $li = $('<div style="display: table-cell; vertical-align: middle;" class="droppedtext">').html(ui.draggable.html());
				         $li.appendTo(this);
				$(this).attr('id', rec);
			}
		});
		$('#slotTwo').droppable({
			accept: ".rec",
			tolerance: "pointer",
			activate: function(event, ui) {
				$(this).addClass("highlightDrop");
			},
      deactivate: function(event, ui) {
        $(this).removeClass("highlightDrop");
      },
			over: function(event, ui) {
				$(this).removeClass("highlightDrop");
				$(this).addClass("over");
			},
      out: function(event, ui) {
        $(this).removeClass("over");
        $(this).addClass("highlightDrop");
      },
			drop: function(event , ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				$(this).removeClass("over");
				$(this).addClass("dropped");
				var rec = $(ui.draggable).attr('id');
				$(ui.draggable).remove();
				var $li = $('<div style="display: table-cell; vertical-align: middle;" class="droppedtext">').html(ui.draggable.html());
				         $li.appendTo(this);
				$(this).attr('id', rec);
			}
		});
		$('#slotThree').droppable({
			accept: ".rec",
			tolerance: "pointer",
			activate: function(event, ui) {
				$(this).addClass("highlightDrop");
			},
      deactivate: function(event, ui) {
        $(this).removeClass("highlightDrop");
      },
			over: function(event, ui) {
				$(this).removeClass("highlightDrop");
				$(this).addClass("over");
			},
      out: function(event, ui) {
        $(this).removeClass("over");
        $(this).addClass("highlightDrop");
      },
			drop: function(event , ui) {
				$(this).droppable('option', 'accept', ui.draggable);
				$(this).removeClass("over");
				$(this).addClass("dropped");
				var rec = $(ui.draggable).attr('id');
				$(ui.draggable).remove();
				var $li = $('<div style="display: table-cell; vertical-align: middle;" class="droppedtext">').html(ui.draggable.html());
				         $li.appendTo(this);
				$(this).attr('id', rec);
			}
		});
	}

	clearUp = function() {
		$('.advisorDescr').remove();
		$('#dropspot').sortable("destroy");
		$('#dropspot').remove();
		$(image).empty();
		$(advDescr).empty();
		$(titleRecom).empty();
		$(upperleft).empty();
		$(image).empty();
		$(taskExpl).empty();
		$(taskExpl).remove();

		$('.drop').each(function() {
			$(this).droppable("destroy");
			$(this).remove();
		});


	}

	/***********************************************************
						Public Variables
	***********************************************************/

	this.volgendeButton 		= volgendeButton;
	this.nameadvisor 	= nameadvisor;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );
	this.update = function( args ){
		if( args == "informationDone" ){
			$('#mainApplication').css('padding-top', '15px')
			findRecommendations(makeDraggable);
			container.show();
		}
		if( args == "recommendationsDone" ){
			$('#mainApplication').css('padding-top', '20px')
			container.hide();
		}
		if( args == "nextRecommendation") {
			$('#mainApplication').css('padding-top', '15px')
			$.when(clearUp()).then(findRecommendations(makeDraggable));
			container.show();
		}
	}

	// hide on start
	container.hide();
}
