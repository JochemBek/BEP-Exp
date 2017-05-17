var InformedConsentView = function(model, container){

	var p					= $("<p> Hallo! Hier komt de eerste text. </p>");
	var startButton	 		= $( "<a class='btn btn-default btn-lg' role='button' style='margin-left:5%;font-size: 18px; padding-left:2%; padding-right:2%; display:inline-block;'>Start</a>" );
	var clearfix			= $( '<div class="clearfix">' );
	var participantVol 		= $( "<p>Hartelijk dank voor uw interesse in ons onderzoek. Helaas is de deelnemingstermijn van dit onderzoek al verlopen, aangezien we het maximum aantal deelnemers hebben bereikt. Hierdoor is deelnemen op dit moment niet mogelijk.</p><p>We wensen u nog een fijne dag toe!</p>");
	participantVol.hide();

	container.append( p, startButton, clearfix );

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