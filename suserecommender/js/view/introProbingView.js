var IntroProbingView = function (model, container) {

  var uitleg            = $("<div><p>Om uw huidige besparingsniveau te bepalen, stellen we u eerst een aantal vragen over uw huidige energiebesparende activiteiten. U krijgt zometeen 12 willekeurige energiebesparingsmaatregelen te zien. Geef steeds aan of u de weergegeven maatregel al uitvoert of niet. Als de maatregel voor u onmogelijk uit te voeren is - bijvoorbeeld: u heeft geen tuin, dus daarom geen zuinige tuinlampen - klik dan op N.V.T. (niet van toepassing).</p> </div>");
  var volgendeButton    = $( "<center><a class='btn btn-default' role='button'> Klik hier om door te gaan </a><center>" );
  var clearfix          = $( '<div class="clearfix">' );

  this.volgendeButton       = volgendeButton;

  model.addObserver( this );
  this.update = function(args){
    //if( args == "userCreated"){
    if ( args == "filterReady"){
        //The container is visible, the elements within it might be hidden
        container.show()
        container.append(uitleg, clearfix, volgendeButton);
      }

    if ( args == "introProbingDone" ){
      container.hide();
    }
  }
  container.hide();


}
