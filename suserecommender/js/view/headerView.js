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
	var currentadvisor = model.o.currentadvisor;

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
		}

		if( args == "filterReady" ){
			h2.html( "Vragen Energiegebruik - Introductie" );
		}

		if( args == "measureReady"){
			h2.html( "Vragen Energiegebruik  "+counter+" / "+model.o.numberOfSets+"");
			counter++;
		}

		if( args == "recommendationReady"){
			h2.html( "Aanbevelingen - Introductie" );
		}

		if( args == "informationDone" ){
			h2.html( "Aanbevelingen - "+model.atRecom+"/4" );
		}
		
		if( args == "recommendationsDone" ){
			h2.html( "Aanbevelingen - "+recom+"/4 - Evaluatie " );
		}

		if( args == "nextRecommendation" ){
			recom++;
			h2.html( "Aanbevelingen - "+recom+"/4" );
		}

		if( args == "qualityQuestionsDone" ){
			h2.html( "Aanbevelingen - "+recom+"/4 - Evaluatie " );
		}


		if( args == "extraQuestionsDone" ){
			h2.html( "Aanbevelingen - Evaluatie" );
		}

		if( args == "manCheckDone" ){
			h2.html( "Afsluitende vragen 1/2");
		}

		if( args == "demographicsDone"){
			h2.html( "Afsluitende vragen 2/2");
		}

		if( args == "expDone"){
			h2.html( "Hartelijk dank!");
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
