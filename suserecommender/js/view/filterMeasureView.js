var FilterMeasureView = function (model, container){

	var volgendeButton	= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );


	/***WOONSITUATIE VARIABLE EXPLAINED:***************
	*** 1. Studentenhuis 		   ********************
	*** 2. Huurwoning met tuin     ********************
	*** 3. Huurwoning zonder tuin  ********************
	*** 4. Koophuis met tuin       ********************
	*** 5. Koophuis zonder Tuin    ********************
	***************************************************
	*** WAAROM? ***************************************
	- Op deze manier zijn de oneven getalen zonder tuin
	- Zijn de getallen onder de 4 huurwoningen
	**************************************************/

	var woonsituatie	= $( '<label style="margin-bottom: 10px; font-size: 16px; width:100%" class="woonlabel" for="woonsitu">Wat is uw huidige woonsituatie?<br><select name="woonsitu" id="woonsitu" style="width:250px"><option value="0">---------------</option><option value="1">Studentenhuis</option><option value="2">Huurwoning met tuin</option><option value="3">Huurwoning zonder tuin</option><option value="4">Koophuis met tuin</option><option value="5">Koophuis zonder tuin</option>');
	var inkomen			= $( '<label style="margin-bottom: 10px; font-size: 16px; width:100%" class="inkomstlabel" for="inkomst">Wat is uw netto-maandinkomen?<br><select name="inkomst" id="inkomst" style="width:250px"><option value="0">---------------</option><option value="1">Minder dan 1000 euro</option><option value="2">1000 tot 1750 euro</option><option value="3">1750 tot 2500 euro</option><option value="4">Meer dan 2500 euro</option><option value="5">Weet ik niet / Wil ik niet zeggen</option>');
	var value1, value2;

	container.append( woonsituatie, inkomen, volgendeButton );


	$( "#woonsitu" ).selectmenu({

		create: function(event, ui){
			value1 = parseInt($(this).val());
			model.trackWoonsituatie(value1);
		},

		change: function(event, ui){
			value1 = parseInt($(this).val());
			model.trackWoonsituatie(value1);
		}
	});


	$( "#inkomst" ).selectmenu({

		create: function(event, ui){
			value2 = parseInt($(this).val());
			model.trackInkomen(value1);
		},

		change: function(event, ui){
			value2 = parseInt($(this).val());
			model.trackInkomen(value1);
		}
	});


	/*******PUBLIC DECLARATIONS************
	**************************************/
	this.volgendeButton = volgendeButton;

	model.addObserver ( this );
	this.update = function( args ){
		if ( args == "userCreated" ){
			container.show();
		}

		if ( args == "filterReady" ){
			console.log("Close Filter Measures, proceed to Intro Probing.");
			container.hide();
		}
	}

	container.hide();

}
