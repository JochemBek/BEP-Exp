var DemographicsView = function( model, container ){

	
	
	/***********************************************************
					  Variable Declarations
	***********************************************************/
	var form				= $( "<form role='form'>" );

	var emailContainer			= $( "<div style='margin-bottom: 25px' class='form-group'>" );
	var emailLabel 				= $( "<label for='emailInput'>Email</label>" );
	var emailInput				= $( "<input type='email' class='form-control' id='emailInput' placeholder='uw email adres'>");
	//var meedoenContainer		= $( "<div class='form-group'>" );
	//var meedoenLabel 			= $( "<label for='meedoenInput'>Wilt u eventueel deelnemen aan het vervolgonderzoek?</label>");
	//var meedoenP 				= $( "<p style='font-style:italic'>Op basis van de resultaten van dit onderzoek zullen we binnenkort een vervolgonderzoek houden waarin we wederom energieadvies zullen geven. We zijn daarbij erg geholpen als we u dan weer mogen uitnodigen om aan dit onderzoek deel te nemen.</p>");
	//var meedoenInput			= $( "<input type='radio' name='geslachtRadio' id='meedoenInput' value='1'>" );
	//var meedoenInput2			= $( "<input type='radio' name='geslachtRadio' id='meedoenInput2' value='0'>" );
	var volgendeButton	 	= $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix			= $( '<div class="clearfix">' );
	var geslacht 			= $( '<div style="font-weight:bold; font-size: 16px; margin-bottom: 25px; width: 100%">Bent u een man of vrouw?<br><select name="geslacht" id="geslacht" style="width: 250px"><option value="-1">---------------</option><option value="0">Vrouw</option><option value="1">Man</option>');
	var leeftijd			= $( '<div style="font-weight:bold; font-size: 16px; margin-bottom: 25px; width: 100%" class="input-group">Hoe oud bent u? <br><input style="font-weight: normal; width: 250px" type="text" pattern="\d*" id="leeftijd" placeholder="Vul hier uw leeftijd in">');
	var opleidingsniveau 	= $( '<label style="font-size: 16px; width: 100%; margin-bottom: 25px;" class="oplabel" for="opleiding">Wat is de hoogste opleiding die u heeft afgerond?<br><select name="opleiding" id="opleiding" style="width:250px"><option value="0">---------------</option><option value="1">Basisonderwijs</option><option value="2">VMBO, Mavo of avo onderbouw</option><option value="3">Havo of vergelijkbaar</option><option value="4">VWO, Gymnasium of vergelijkbaar</opleiding><option value="5">Middelbaar beroepsonderwijs (MBO, MTS, bijv.)</option><option value="6">Hoger beroepsonderwijs (HTS, HBO, bijv.)</option><option value="7">Bachelor aan universiteit</option><option value="8">Master aan universiteit</option><option value="9">PhD / Promotietraject</option>');


	var value2, value3;

	emailContainer.append( emailLabel, emailInput );
	//meedoenContainer.append( meedoenLabel, meedoenP, meedoenInput, "  Ja, u mag mij uitnodigen voor het vervolgonderzoek",  "<br/>", meedoenInput2, " Nee, ik ontvang liever geen uitnodiging meer" );
	form.append( emailContainer);

	container.append( emailContainer, leeftijd, geslacht, opleidingsniveau, clearfix, volgendeButton );



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
			console.log(args);
		}
	}

	container.hide();
}
