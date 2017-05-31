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
			p.html("Om uw huidige besparingsniveau te bepalen, stellen we u eerst een aantal vragen over uw huidige energiebesparende activiteiten. U krijgt zometeen 13 willekeurige energiebesparingsmaatregelen te zien. Geef steeds aan of u de weergegeven maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk uit te voeren is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing).");
      container.show();
		}

		if( args == "measureReady"){
			p.html( "Nu stellen we u eerst een aantal vragen over uw huidige energie-besparende activiteiten. Geef steeds aan of u de betreffende energiebesparende maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing)");
		  container.show();
    }

		if( args == "recommendationReady"){
			p.html( "U krijgt nu energietips van verschillende personen. Zij hebben eerder aanbevelingen gedaan aan een energieprofiel dat vergelijkbaar is met de uwe. U krijgt vier keer drie suggesties. Na elke set wordt u kort om uw mening gevraagd.");
      container.show();
		}

		if( args == "informationDone" ){
			var curadvisor = model.getAdvisor();
			console.log("In Description view, adivsor: " + curadvisor);
			if (curadvisor == 1) {
				p.html("Lees alstublieft eerst de tekst van Ben Cuijpers hieronder. Volg daarna de instructie daaronder.");
			} 
			if (curadvisor == 2) {
				p.html("Lees alstublieft eerst de tekst van Geert Louws hieronder. Volg daarna de instructie daaronder.");
			}
			if (curadvisor == 3) {
				p.html("Lees alstublieft eerst de tekst van Peter Daelmans hieronder. Volg daarna de instructie daaronder.");
			}
			if (curadvisor == 4) {
				p.html("Lees alstublieft eerst de tekst van Jan Kleinsma hieronder. Volg daarna de instructie daaronder.");
			}
			container.show();
		}
		
		if( args == "recommendationsDone" ){
			var curadvisor = model.getAdvisor();
			if (curadvisor == 1){
			  p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Ben Cuijpers zijn voorgesteld om uit te voeren. Geef alstublieft aan in hoeverre u het eens bent met de volgende stellingen:");
  		} else if (curadvisor == 2) {
  			p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Geert Louws zijn voorgesteld om uit te voeren. Geef alstublieft aan in hoeverre u het eens bent met de volgende stellingen:");
  		} else if (curadvisor == 3) {
  			p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Peter Daelmans zijn voorgesteld om uit te voeren. Geef alstublieft aan in hoeverre u het eens bent met de volgende stellingen:");
  		} else if (curadvisor == 4) {
  			p.html("U heeft zojuist drie energiebesparingsmaatregelen gezien die door Jan Kleinsma zijn voorgesteld om uit te voeren. Geef alstublieft aan in hoeverre u het eens bent met de volgende stellingen:");
  		}
      container.show();
    }


		if( args == "nextRecommendation" ){
			var curadvisor = model.getAdvisor();
			if (curadvisor == 1) {
				p.html("Lees alstublieft eerst de tekst van Ben Cuijpers hieronder. Volg daarna de instructie daaronder.");
			} 
			if (curadvisor == 2) {
				p.html("Lees alstublieft eerst de tekst van Geert Louws hieronder. Volg daarna de instructie daaronder.");
			}
			if (curadvisor == 3) {
				p.html("Lees alstublieft eerst de tekst van Peter Daelmans hieronder. Volg daarna de instructie daaronder.");
			}
			if (curadvisor == 4) {
				p.html("Lees alstublieft eerst de tekst van Jan Kleinsma hieronder. Volg daarna de instructie daaronder.");
			}
			container.show();
		}

		if( args == "qualityQuestionsDone" ){
			p.html("U kunt meer informatie ontvangen over de drie besparingsmaatregelen die u zojuist heeft gezien. Wenst u meer informatie te ontvangen over een of meerdere besparingsmaatregelen? Vink dit dan bij de juiste maatregel(en) in de eerste kolom aan. U zal dan na afloop van dit experiment een mail ontvangen met de betreffende details. Voert u een of meerdere van de maatregelen al uit? Vink dit dan bij de juiste maatregel(en) in de tweede kolom aan.");
      container.show();
		}

		if( args == "extraQuestionsDone" ){
			p.html("U heeft van vier personen suggesties ontvangen. Geef alstublieft aan in hoeverre u het eens met de volgende stellingen over deze personen.");
      container.show();
		}
		
		if( args == 'manCheckExpert' ){
			p.html("Beantwoord alstublieft de onderstaande vragen over Peter Daelmans.");
		}
		
		if( args == 'manCheckNonExpert' ) {
			p.html("Beantwoord alstublieft de onderstaande vragen over Ben Cuijpers.");
		}

		if( args == "manCheckDone" ){
			p.html( "Beantwoord ten slotte alstublieft de volgende korte vragen. Als u mee wilt doen aan de loting van de waardebonnen en extra informatie wilt ontvangen over de geselecteerde maatregelen, zorg er dan voor dat u een e-mailadres opgeeft waar u toegang tot heeft. Wij contacteren u daarover namelijk via e-mail.");
      container.show();
		}

		if( args == "demographicsDone"){
			p.html( "Het onderzoek is afgelopen. Hartelijk dank voor uw deelname. <hr style='margin: 5px; height:1pt; visibility:hidden;'/> Indien u een e-mail adres heeft opgegeven, maakt u kans op één van de Bol.com waardebonnen t.w.v. €10,-. De loting zal plaatsvinden na de sluitingsdatum van het onderzoek. Indien u geselecteerd bent, wordt u via e-mail gecontacteerd. <hr style='margin: 5px; height:1pt; visibility:hidden;'/> Als u voor één of meerdere maatregelen heeft aangegeven meer informatie te willen ontvangen en u een e-mail adres heeft opgegeven, krijgt u binnen 2 weken een mail met de betreffende details. <hr/> <b> U kunt deze pagina nu wegklikken. </b>");
		  container.show();
    }
	}
  
  container.hide();

}
