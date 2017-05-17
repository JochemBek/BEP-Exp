var InformedConsentView = function(model, container, facebookApi){

	var p					= $( "<p>Dit is een onderzoek van de afdeling ‘Human-Technology Interaction’ van de Technische Universiteit Eindhoven, door Alain Starke onder supervisie van dr.ir. Martijn Willemsen. In dit onderzoek testen we een nieuw energiebesparings-aanbevelingssysteem. Om u passende energiebesparende maatregelen te kunnen aanbevelen, dient u eerst aan te geven welke maatregelen u uitvoert en welke niet. U krijgt daarna aanbevolen welke energiebesparende maatregelen bij u passen. Aansluitend stellen we u nog enkele afsluitende vragen over uw ervaring met het systeem. </p><p>Het onderzoek duurt ongeveer 5-10 minuten.</p><p>Mocht u op enig moment uw deelname aan dit onderzoek willen staken, dan hoeft u alleen uw browser te sluiten. In dat geval wordt al uw data gewist.</p></p><p>Voor deelname vragen wij u om in te loggen met uw Facebook-account. Hiermee willen we de gedane aanbevelingen verbeteren door (anoniem) gebruikers van het systeem met elkaar te kunnen vergelijken. We plaatsen <span style='font-weight:bold'>nooit</span> iets ongevraagd op uw profiel of op dat van anderen. De gebruikte informatie wordt volledig geanonimiseerd en vertrouwelijk behandeld.</p><p>Alle onderzoeken van de afdeling Human-Technology Interaction voldoen aan de ethische code van het NIP (Nederlands Instituut voor Psychologen). Uw antwoorden worden altijd anoniem verwerkt en de rapportage zal alleen op groepsniveau plaatsvinden.</p><p>Door op “Log in with Facebook” knop te klikken, bevestigt u dat u het bovenstaande heeft gelezen en gaat u akkoord met deelname aan dit onderzoek van de afdeling Human-Technology Interaction. Voor vragen kunt terecht bij A.D.Starke@tue.nl. Voor eventuele klachten kunt u terecht bij dr.ir. Martijn Willemsen (M.C.Willemsen@tue.nl).</p><p>Klik op “Log in with Facebook” om naar het onderzoek te gaan. Als u geen Facebook heeft gebruikt kunt u de alternatieve log-in gebruiken.</p>");
	var fbBox				= $( "<div id='fbBox' style='margin-left:40%; margin-bottom:30px;'>");
	var fbStatus 			= $( '<div id="status">' );
	var loginButton 		= $( '<fb:login-button id="fbloginbtn" scope="public_profile,email" onlogin="location.reload();">' );
	var startButton	 		= $( "<a class='btn btn-default btn-lg' role='button' style='margin-left:5%;font-size: 18px; padding-left:2%; padding-right:2%; display:inline-block;'>Start</a>" );
	var clearfix			= $( '<div class="clearfix">' );
	var logoutButton 		= $( "<a id='fblogout'>Log uit</a>");
		logoutButton.hide();

	var participantVol 		= $( "<p>Hartelijk dank voor uw interesse in ons onderzoek. Helaas is de deelnemingstermijn van dit onderzoek al verlopen, aangezien we het maximum aantal deelnemers hebben bereikt. Hierdoor is deelnemen op dit moment niet mogelijk.</p><p>We wensen u nog een fijne dag toe!</p>");
	participantVol.hide();

	var altButton	 		= $( "<button id='klikKnop' style='background:none;border:none; width:100%; text-align:center'><u>Ik heb geen Facebook</u></button>" );


	fbBox.append( loginButton, logoutButton, fbStatus );
	container.append( p, fbBox, startButton, clearfix, altButton ) ;

	//container.append( participantVol );

	/***********************************************************
						Public Variables
	***********************************************************/
	this.container 		= container;
	this.loginButton 	= loginButton;
	this.startButton 	= startButton;
	this.logoutButton 	= logoutButton;
	this.altButton		= altButton;

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