var InformedConsentView = function(model, container){

	var p								= $("<p>In dit onderzoek presenteren we u een aantal energiebesparende maatregelen. Op basis van een aantal vragen over uw huidige energiegedrag ontvangt u persoonlijke tips, die worden aangeboden door een ander persoon. U kunt er voor kiezen om met deze maatregelen de komende tijd aan de slag te gaan.</p>");
	var p1 							= $("<p>Deze applicatie is onderdeel van een wetenschappelijk onderzoek van de afdeling 'Human-Technology Interaction' van de Technische Universiteit Eindhoven, onder supervisie van ir. Alain Starke. Het onderzoek duurt ongeveer 15 minuten.*</p>");
	var p2							= $("<p>Onder de deelnemers die het onderzoek afronden, verloten we tevens 5x een Bol.com-waardebon t.w.v. €10,-.</p></br>");
	var startButton	 		= $("<center><a class='button btn-default btn-lg' role='button' style='margin-left:auto;font-size: 18px; padding-left:2%; padding-right:2%; ; display:inline-block;'>Klik hier om verder te gaan</a></center></br>");
	var p3							= $("<p></p> <p></p>");
	var p4 							= $("<p>* Alle onderzoeken van de afdeling Human-Technology Interaction voldoen aan de ethische code van het NIP (Nederlands Instituut voor Psychologen). Uw gegevens worden altijd anoniem verwerkt en nooit aan derden verstrekt. Voor vragen kunt terecht bij Jochem Bek (j.g.bek@student.tue.nl) of Boy Janissen (b.n.j.janissen@student.tue.nl). Voor eventuele klachten kunt u terecht bij ir. Alain Starke (A.D.Starke@tue.nl).</p>");
	var clearfix				= $("<div class='clearfix'>");
	var participantVol 	= $("<p>Hartelijk dank voor uw interesse in ons onderzoek. Helaas is de deelnemingstermijn van dit onderzoek al verlopen, aangezien we het maximum aantal deelnemers hebben bereikt. Hierdoor is deelnemen op dit moment niet mogelijk.</p><p>We wensen u nog een fijne dag toe!</p>");
	participantVol.hide();

	container.append( p, p1, p2, startButton, p3, p4, clearfix);

	//container.append( participantVol );

	/***********************************************************
						Public Variables
	***********************************************************/
	this.container 		= container;
	this.startButton 	= startButton;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );
	this.update = function( args ){
		if( args == "userCreated" ){
			console.log("Close informed consent, proceed to Ability Measures");
			container.hide();
		}
		/*if( args == "manCheckDone" ){
			console.log("Close informed consent, proceed to Filter Measures");
			container.hide();
		}*/
	}

}
