var HeaderView = function ( model, container ){

	/***********************************************************
					  Variable Declarations
	***********************************************************/
	//var h2 						= $( "<h2>Welkom!</h2>" );
	var h2						= $( "<h2>Welkom op onze website!</h2>");
	var p 						= $( "<p></p>" );
	var vrienden 				= [];
	var counter = 1;
	var recom = 1;

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

		if( args == "filterReady" ){
			h2.html( "Vragen Energiegebruik - Introductie" );
			p.html("");
		}

		if( args == "measureReady"){
			h2.html( "Vragen Energiegebruik  "+counter+" / "+model.o.numberOfSets+"");
			p.html( "Nu stellen we u eerst een aantal vragen over uw huidige energie-besparende activiteiten. Geef steeds aan of u de betreffende energiebesparende maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing)");
			counter++;
		}

		if( args == "recommendationReady"){
			h2.html( "Aanbevelingen - Introductie" );
			p.html( "");
		}

		if( args == "informationDone" ){
			h2.html( "Aanbevelingen - "+model.atRecom+"/4" );
			p.html("Lees alstublieft eerst de instructies en voer daarna de opdracht uit.");
		}
		if( args == "recommendationsDone" ){
			h2.html( "Aanbevelingen - "+recom+"/4 - Evaluatie " );
			p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Peter Green zijn aangeraden. Geef alstublieft aan in hoeverre u het eens met de volgende stellingen:");
		}

		if( args == "nextRecommendation" ){
			recom++;
			h2.html( "Aanbevelingen - "+recom+"/4" );
			p.html("Lees alstublieft eerst de instructies en voer daarna de opdracht uit.");
		}

		if( args == "qualityQuestionsDone" ){
			h2.html( "Aanbevelingen - "+recom+"/4 - Evaluatie " );
			p.html("We willen u graag op weg helpen naar een bewuste leefstijl. U kunt daarom, indien u dit wenst, meer informatie ontvangen over de drie besparingsmaatregelen die u zojuist heeft gezien. Wenst u meer informatie te ontvangen over een of meerdere besparingsmaatregelen? Vink dit dan bij de juiste maatregel(en) in de eerste kolom aan. U zal na afloop van dit experiment een mail ontvangen met de betreffende details. Voert u een of meerdere van de maatregelen al uit? Vink dit dan bij de juiste maatregel(en) in de tweede kolom aan.");
		}


		if( args == "extraQuestionsDone" ){
			h2.html( "Aanbevelingen - Evaluatie" );
			p.html("U heeft van twee personen suggesties ontvangen. Geef alstublieft aan in hoeverre u het eens met de volgende stellingen over deze personen.");
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
			p.html( "De loting zal plaatsvinden na de sluitingsdatum van het onderzoek.<br>Er wordt contact met u opgenomen indien u geselecteerd bent voor de Bol.com-waardebon t.w.v. €10,-");
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
