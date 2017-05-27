var DataConsentView = function ( model, container ){
	
	var endButton	 		= $( "<a class='btn btn-default pull-right' role='button' style='font-size:24px'>Versturen &raquo;</a>" );
	var form				= $( "<form role='form'>" );

	var emailContainer		= $( "<div class='form-group'>" );
	var emailLabel 			= $( "<label for='emailInput'>Email [optioneel]</label>" );
	var emailInput			= $( "<input type='email' class='form-control' id='emailInput' placeholder='Typ uw email adres hier' style='margin-bottom:2px;'>");
	var emailText			= $( '<p>Indien u aanmerking wilt  komen voor de verloting van één van vijf Bol.com-waardebonnen t.w.v. €20,- dan kunt u hieronder uw emailadres invullen. <strong>Wij gebruiken dit emailadres enkel om contact op te nemen als u gewonnen heeft.</strong> U kunt ook aangeven of u op dit emailadres een bericht met de door u gekozen maatregelen wilt ontvangen.</p>');
	var emailSend			= $( '<p><input id="box1" type="checkbox" style="margin-bottom:10px"> Ja, stuur mij eenmalig de gekozen maatregelen op bovenstaand emailadres.</p>');
	emailContainer.append( emailText, emailLabel, emailInput, emailSend );
	
	var meedoenContainer	= $( "<div class='form-group'>" );
	var meedoenLabel 		= $( "<label for='meedoenInput'>Wilt u deelnemen aan het vervolgonderzoek?</label>");
	var meedoenP 			= $( "<p style='font-style:italic'>Op basis van de resultaten van dit onderzoek zullen we binnenkort een vervolgonderzoek houden waarin we wederom energieadvies zullen geven. We zijn daarbij erg geholpen als we u dan weer mogen uitnodigen om aan dit onderzoek deel te nemen. Dat doen we dan op basis van het emailadres dat u hierboven kan invullen.</p>");
	var meedoenInput		= $( "<input type='radio' name='geslachtRadio' id='meedoenInput' value='1'>" );
	var meedoenInput2		= $( "<input type='radio' name='geslachtRadio' id='meedoenInput2' value='0'>" );
	meedoenContainer.append( meedoenLabel, meedoenP, meedoenInput, "  Ja, u mag mij uitnodigen voor het vervolgonderzoek",  "<br/>", meedoenInput2, " Nee, ik ontvang liever geen uitnodiging meer <br><br>" );

	var consentContainer	= $( "<div class='form-group'>" );
	var consentLabel 		= $( "<label for='meedoenInput'>Wilt u helpen om onze applicatie te verbeteren?</label>");
	var consentP 			= $( "<p style='font-style:italic'>Om voor onze toekomstige gebruikers betere aanbevelingen te genereren, willen we graag uw toestemming vragen om uw gemaakte keuzes aan uw Facebook-vrienden te laten zien die ook deze applicatie gebruiken. Nogmaals, we zullen nooit ongevraagd iets op uw Facebook-pagina plaatsen.</p>");
	var consentInput		= $( "<input type='radio' name='consentRadio' id='consentInput' value='1'>" );
	var consentInput2		= $( "<input type='radio' name='consentRadio' id='consentInput2' value='0'>" );
	consentContainer.append( consentLabel, consentP, consentInput, "  Ja, hier werk ik graag aan mee",  "<br/>", consentInput2, " Nee, hier wil ik niet aan meewerken" );



	var comments			= $( '<p style="font-weight:bold; font-size: 14px;">Wilt u nog iets met ons delen?</p><textarea id="comments" style="width:250px; height:100px" value="">');

	form.append( emailContainer, meedoenContainer, consentContainer );

	/****PUBLIC VARIABLES*******/
	this.endButton 	= endButton;
	this.form 		= form;
	this.emailInput = emailInput;
	this.meedoenContainer = meedoenContainer;
	this.consentContainer = consentContainer;

	/****UPDATE FUNCTIONS*******/
	model.addObserver ( this );
	this.update = function( args ){
		//if( args == "userCreated"){
		/*if ( args == "demographicsDone" ){
			container.append( form, comments, endButton );
			container.show();
		}*/

		if ( args == "expDone" ){
			container.hide();
		}
	}

	container.hide();
}