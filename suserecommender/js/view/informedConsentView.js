var InformedConsentView = function(model, container){

	var p					= $("<p> De Energiebesparingshulp helpt u om in slechts een paar stappen passende energiebesparende maatregelen te vinden, waarmee u de komende tijd aan de slag kunt. Op basis van een aantal vragen over uw huidige energiegedrag presenteren we een persoonlijke lijst met energiebesparende maatregelen.</p> <p>De Energiebesparingshulp is onderdeel van een wetenschappelijk onderzoek van de afdeling 'Human-Technology Interaction' van de Technische Universiteit Eindhoven, onder supervisie van ir. Alain Starke. Het onderzoek duurt ongeveer 15 minuten. *</p></br>");
	var startButton	 		= $( "<center><a class='btn btn-default btn-lg' role='button' style='margin-left:auto;font-size: 18px; padding-left:2%; padding-right:2%; ; display:inline-block;'>Klik hier om verder te gaan</a></center?");
	var p1				= $("<p> </p> <p></p>");
	var p2 				= $("<p>* Alle onderzoeken van de afdeling Human-Technology Interaction voldoen aan de ethische code van het NIP (Nederlands Instituut voor Psychologen). Uw gegevens worden altijd anoniem verwerkt en nooit aan derden verstrekt. Voor vragen kunt terecht bij Jochem Bek (j.g.bek@student.tue.nl) of Boy Janissen (b.n.j.janissen@student.tue.nl) . Voor eventuele klachten kunt u terecht bij ir. Alain Starke (A.D.Starke@tue.nl).</p>");
	var clearfix			= $( '<div class="clearfix">' );
	var participantVol 		= $( "<p>Hartelijk dank voor uw interesse in ons onderzoek. Helaas is de deelnemingstermijn van dit onderzoek al verlopen, aangezien we het maximum aantal deelnemers hebben bereikt. Hierdoor is deelnemen op dit moment niet mogelijk.</p><p>We wensen u nog een fijne dag toe!</p>");
	participantVol.hide();

	container.append( p, startButton, p1, p2, clearfix );

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
			container.hide();
		}
	}

}
