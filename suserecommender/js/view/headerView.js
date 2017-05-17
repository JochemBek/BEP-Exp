var HeaderView = function ( model, container ){

	/***********************************************************
					  Variable Declarations
	***********************************************************/
	//var h2 						= $( "<h2>Welkom!</h2>" );
	var h2						= $( "<h2>Welkom!</h2>");
	var p 						= $( "<p></p>" );
	var vrienden 				= [];
	var counter = 1;

	container.append( h2,p );

	/***********************************************************
						Private Variables
	***********************************************************/

	/***********************************************************
						Public Variables
	***********************************************************/

	/***********************************************************
							 Update
	***********************************************************/
	
	model.addObserver( this );
	this.update = function( args ){

		if( args == "userCreated" ){
			h2.html( "Korte vragen" );
			p.html( "Als onderdeel van ons aanbevelingssysteem stellen we u eerst twee vragen over uw woonsituatie en inkomensniveau. Deze informatie gebruiken wij om onze aanbevelingen te verbeteren.");
		}

		if( args == "measureReady"){
			h2.html( "Vragen Energiegebruik  "+counter+" / "+model.o.numberOfSets+"");
			p.html( "Nu stellen we u eerst een aantal vragen over uw huidige energie-besparende activiteiten. Geef steeds aan of u de betreffende energiebesparende maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing)");
			counter++;
		}

		if( args == "recommendationReady"){
			h2.html( "Uw besparingsscore" );
			p.html( "Hieronder staat uw berekend, die we hebben berekend middels uw gegeven antwoorden.");
		}

		if( args == "informationDone" ){
			h2.html( "Uw persoonlijke aanbevelingslijst" );
			p.html( "Hieronder volgen een aantal maatregelen om energie te besparen die u wellicht nog niet uitvoert en u mogelijk aanspreken. We vragen u vriendelijk om de eerste en tweede keuze te selecteren van de maatregelen die het u het liefste in de nabije toekomst zou willen uitvoeren.<br><br>Klik op 'dit doe ik al' als u een maatregel al uitvoert. Om meer informatie te krijgen kunt u met uw muis over de naam van een maatregel heen bewegen. Zodra u tevreden bent met uw keuzes, klik dan op [Volgende]." );
		}

		if( args == "setRecommendationDone" ){
			h2.html( "Uw mening over de lijst met aanbevelingen" );
			p.html( "Hieronder volgen een aantal stellingen over de lijst met aanbevelingen.");
		}

		if( args == "satisfactionDone" ){
			h2.html( "Afsluitende vragen 1/2");
			p.html( "Ten slotte willen we u nog kort een paar korte vragen stellen.");
		}

		if( args == "demographicsDone"){
			h2.html( "Afsluitende vragen 2/2");
		}

		if( args == "expDone"){
			h2.html( "Hartelijk dank!");
			p.html( "De loting zal plaatsvinden na de sluitingsdatum van het onderzoek.<br>Er wordt contact met u opgenomen indien u geselecteerd bent voor de Bol.com-waardebon t.w.v. €20,-");
		}

/*
		if( args == "closeness2Ready"){
			h2.html( "Beoordeling vriend 3/8 - " + vrienden[2].name);
		}

		if( args == "closeness3Ready"){
			h2.html( "Beoordeling vriend 4/8 - " + vrienden[3].name);
		}

		if( args == "closeness4Ready"){
			h2.html( "Beoordeling kennis 5/8 - " + vrienden[4].name);
		}

		if( args == "closeness5Ready"){
			h2.html( "Beoordeling kennis 6/8 - " + vrienden[5].name);
		}

		if( args == "closeness6Ready"){
			h2.html( "Beoordeling kennis 7/8 - " + vrienden[6].name);
		}

		if( args == "closeness7Ready"){
			h2.html( "Beoordeling kennis 8/8 - " + vrienden[7].name);
		}

		if( args == "closenessQuestionsDone"){
			h2.html( "Afsluitende vragen" );
			p.html( "Vul hieronder alstublieft de afsluitende vragen in en klik daarna op 'verzenden'." );
		}
*/
	}

}