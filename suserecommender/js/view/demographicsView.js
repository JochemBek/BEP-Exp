var DemographicsView = function( model, container ){



	/***********************************************************
					  Variable Declarations
	***********************************************************/
	var form				= $( "<form role='form'>" );

	var emailContainer			= $( "<div style='margin-bottom: 25px' class='form-group'>" );
	var emailInput				= $('<div style="font-weight:bold; font-size: 16px; margin-bottom: 25px; width: 100%" class="input-group">Wat is uw e-mailadres? (optioneel, maar vereist voor kans op een waardebon) <br><input type="email" style="font-weight: normal; width: 250px" type="text" pattern="\d*" id="emailInput" placeholder="Vul hier uw e-mailadres in">');
	var volgendeButton	 	= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix			= $( '<div class="clearfix">' );
	var leeftijd			= $( '<div style="font-weight:bold; font-size: 16px; margin-bottom: 25px; width: 100%" class="input-group">Hoe oud bent u? <br><input style="font-weight: normal; width: 250px" type="text" pattern="\d*" id="leeftijd" placeholder="Vul hier uw leeftijd in">');
	var geslacht 			= $( '<div style="font-weight:bold; font-size: 16px; margin-bottom: 25px; width: 100%">Bent u een man of vrouw?<br><select name="geslacht" id="geslacht" style="width: 250px"><option value="-1">---------------</option><option value="0">Vrouw</option><option value="1">Man</option>');
	var opleidingsniveau 	= $( '<div style="font-weight:bold; font-size: 16px; margin-bottom: 25px; width: 100%">Wat is de hoogste opleiding die u heeft afgerond?<br><select name="opleiding" id="opleiding" style="width:250px"><option value="0">---------------</option><option value="1">Basisonderwijs</option><option value="2">VMBO, Mavo of avo onderbouw</option><option value="3">Havo of vergelijkbaar</option><option value="4">VWO, Gymnasium of vergelijkbaar</opleiding><option value="5">Middelbaar beroepsonderwijs (MBO, MTS, bijv.)</option><option value="6">Hoger beroepsonderwijs (HTS, HBO, bijv.)</option><option value="7">Bachelor aan universiteit</option><option value="8">Master aan universiteit</option><option value="9">PhD / Promotietraject</option>');
	var woonsituatie	= $( '<label style="margin-bottom: 10px; font-size: 16px; width:100%" class="woonlabel" for="woonsitu">Wat is uw huidige woonsituatie?<br><select name="woonsitu" id="woonsitu" style="width:250px"><option value="0">---------------</option><option value="1">Studentenhuis</option><option value="2">Huurwoning met tuin</option><option value="3">Huurwoning zonder tuin</option><option value="4">Koophuis met tuin</option><option value="5">Koophuis zonder tuin</option>');
	var inkomen			= $( '<label style="margin-bottom: 10px; font-size: 16px; width:100%" class="inkomstlabel" for="inkomst">Wat is uw netto-maandinkomen?<br><select name="inkomst" id="inkomst" style="width:250px"><option value="0">---------------</option><option value="1">Minder dan 1000 euro</option><option value="2">1000 tot 1750 euro</option><option value="3">1750 tot 2500 euro</option><option value="4">Meer dan 2500 euro</option><option value="5">Weet ik niet / Wil ik niet zeggen</option>');

	var value2, value3, value4, value5;

	emailContainer.append(emailInput );
	form.append( emailContainer);

	container.append( emailContainer, leeftijd, geslacht, opleidingsniveau, woonsituatie, inkomen, clearfix, volgendeButton );



	$( "#opleiding").selectmenu({

		create: function(event, ui){
			value2 = parseInt($(this).val());
			model.trackOpleiding(value2);
		},

		change: function(event, ui){
			value2 = parseInt($(this).val());
			model.trackOpleiding(value2);
		}
	});

	$( "#geslacht").selectmenu({
		create: function(event, ui){
			value3 = parseInt($(this).val());
			model.trackGeslacht(value3);
		},

		change: function(event, ui){
			value3 = parseInt($(this).val());
			model.trackGeslacht(value3);
		}
	});


	$( "#woonsitu" ).selectmenu({

		create: function(event, ui){
			value4 = parseInt($(this).val());
			model.trackWoonsituatie(value4);
		},

		change: function(event, ui){
			value4 = parseInt($(this).val());
			model.trackWoonsituatie(value4);
		}
	});


	$( "#inkomst" ).selectmenu({

		create: function(event, ui){
			value5 = parseInt($(this).val());
			model.trackInkomen(value5);
		},

		change: function(event, ui){
			value5 = parseInt($(this).val());
			model.trackInkomen(value5);
		}
	});





	/***********************************************************
						Private Variables
	***********************************************************/

	/***********************************************************
						Public Variables
	***********************************************************/

	this.volgendeButton 		= volgendeButton;
	this.form 					= form;
	this.emailInput				= emailInput;

	/***********************************************************
							 Update
	***********************************************************/

	model.addObserver( this );

	this.update = function( args ){

		if( args == "manCheckDone" ){
			container.show();
		}

		if( args == "demographicsDone"){
			container.hide();
		}
	}

	container.hide();
}
