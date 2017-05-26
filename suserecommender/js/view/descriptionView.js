var DescriptionView = function ( model, container ){

	/***********************************************************
					  Variable Declarations
	***********************************************************/
	var div 						= $( "<div class='descript'></div>" );
  var p               = $( "<p></p>" );

  div.append( p );
	container.append( div );

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
			p.html( "Als onderdeel van ons aanbevelingssysteem stellen we u eerst twee vragen over uw woonsituatie en inkomensniveau. Deze informatie gebruiken wij om onze aanbevelingen te verbeteren.");
		  container.show();
    }

		if( args == "filterReady" ){
			p.html("Om uw huidige besparingsniveau te bepalen, stellen we u eerst een aantal vragen over uw huidige energiebesparende activiteiten. U krijgt zometeen 12 willekeurige energiebesparingsmaatregelen te zien. Geef steeds aan of u de weergegeven maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk uit te voeren is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing).");
      container.show();
		}

		if( args == "measureReady"){
			p.html( "Nu stellen we u eerst een aantal vragen over uw huidige energie-besparende activiteiten. Geef steeds aan of u de betreffende energiebesparende maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing)");
		  container.show();
    }

		if( args == "recommendationReady"){
			p.html( "U krijgt nu energietips van twee verschillende adviseurs. Zij hebben hun aanbevelingen gebaseerd op uw energieprofiel dat we in de vorige stap hebben vastgesteld. Elke adviseur zal zijn/haar advies aanbieden in twee sets van drie aanbevelingen. Na elke set zal u kort om een evaluatie gevraagd worden.");
      container.show();
		}

		if( args == "informationDone" ){
			p.html("Lees alstublieft eerst de instructies en voer daarna de opdracht uit.");
      container.show();
		}
		if( args == "recommendationsDone" ){
			var curadvisor = model.getAdvisor();
			if (curadvisor == 0){
			  p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Ben Cuijpers zijn aangeraden. Geef alstublieft aan in hoeverre u het eens met de volgende stellingen:");
  		} else {
  			p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Peter Daelmans zijn aangeraden. Geef alstublieft aan in hoeverre u het eens met de volgende stellingen:");
  		}
      container.show();
    }


		if( args == "nextRecommendation" ){
			p.html("Lees alstublieft eerst de instructies en voer daarna de opdracht uit.");
      container.show();
		}

		if( args == "qualityQuestionsDone" ){
			p.html("We willen u graag op weg helpen naar een bewuste leefstijl. U kunt daarom, indien u dit wenst, meer informatie ontvangen over de drie besparingsmaatregelen die u zojuist heeft gezien. Wenst u meer informatie te ontvangen over een of meerdere besparingsmaatregelen? Vink dit dan bij de juiste maatregel(en) in de eerste kolom aan. U zal dan na afloop van dit experiment een mail ontvangen met de betreffende details. Voert u een of meerdere van de maatregelen al uit? Vink dit dan bij de juiste maatregel(en) in de tweede kolom aan.");
      container.show();
		}


		if( args == "extraQuestionsDone" ){
			p.html("U heeft van twee personen suggesties ontvangen. Geef alstublieft aan in hoeverre u het eens met de volgende stellingen over deze personen.");
      container.show();
		}
		
		if( args == 'manCheckExpert' ){
			p.html("Beantwoord alstublieft de onderstaande vragen over Ben Cuijpers.");
		}
		
		if( args == 'manCheckNonExpert' ) {
			p.html("Beantwoord alstublieft de onderstaande vragen over Richard Daelmans.");
		}

		if( args == "manCheckDone" ){
			p.html( "Ten slotte willen we u nog kort een paar korte vragen stellen.");
      container.show();
		}

		if( args == "demographicsDone"){
      container.show();
		}

		if( args == "expDone"){
			p.html( "De loting zal plaatsvinden na de sluitingsdatum van het onderzoek.<br>Er wordt contact met u opgenomen indien u geselecteerd bent voor de Bol.com-waardebon t.w.v. €10,-. U kunt deze pagina nu wegklikken.");
		  container.show();
    }
	}
  
  container.hide();

}
