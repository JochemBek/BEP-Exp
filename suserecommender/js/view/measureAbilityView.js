var MeasureAbilityView = function(model, container){

	/***********************************************************
					  Variable Declarations
	***********************************************************/

	var h2 										= $( "<h3 style='font-family: Lato, sans-serif;' class='text-center'>Voert u deze maatregel al uit?</h3>" );
	var list									= $( "<div class='list-group'>" );
	var item									= $( "<div class='list-group-item'>" );
	var h3										= $( "<h3 class='list-group-item-heading'>" );
	var clearfix			= $( '<div class="clearfix">' );
	var description	 					= $( "<p style='font-style: italic;' class='list-group-item-text'>" );
	var yesButton                            = $( "<a id='btnyes' class='btn btn-default button glow-button-green btn-lg' role='button'> Ja </a>" );
	    var noButton                            = $( "<a id='btnno' class='btn btn-default button glow-button-red btn-lg' role='button'>Nee </a>" );
	    var notusefulButton                = $( "<a id='btnnvt' class='btn btn-default button glow-button-yellow pull-right' role='button'>N.V.T.</a>" );
	    var buttonGroup                     = $( "<center><div class='btn-group col-md-8 text-align:center' id='btnyesno'><center> ");
	    var wrapper                             = $( "<div class='wrapper1'>")
			var wrapperNvt =$("<div class='wraper2'>");



			wrapper				.append( buttonGroup);
			wrapperNvt		.append( notusefulButton);
			buttonGroup 	.append( noButton, yesButton);
			list 					.append( item );
			item 					.append( h3, description );
			container			.append( h2, list, wrapper, wrapperNvt, clearfix ); // die container staat ook in de model-functie en betekent dat ie weergegeven wordt.

	/***********************************************************
						Private Variables
	***********************************************************/

	updateMeasure = function(){
		var measure = model.getMeasure();
			h3.html(measure.name);
			description.html(measure.description);
	}

	/***********************************************************
						Public Variables - dus deze zorgt ervoor dat de controller ze herkent
	***********************************************************/

	this.yesButton 					= yesButton;
	this.noButton 					= noButton;
	this.notusefulButton 		= notusefulButton;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );
	this.update = function( args ){
		//if( args == "NUFFNIET"){
		if( args == "introProbingDone" ){
			container.show();
			//delay(10).slideDown();
		}
		if( args == "measureReady" ){
			updateMeasure();
		}
		if( args == "recommendationReady" ){
			container.hide();
		}
	}

	// hide on start
	container.hide();
}
