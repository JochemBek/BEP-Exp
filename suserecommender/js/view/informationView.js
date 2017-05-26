/* JOCHEM:
In deze view moet slide 4 van de mock-up komen :D
Graag behouden:
- volgendeButton
*/


var InformationView = function( model, container, facebookApi){

  var volgendeButton       = $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo; </a>" );
  var clearfix         = $( '<div class="clearfix">' );

  this.volgendeButton       = volgendeButton;

  model.addObserver( this );
  this.update = function(args){
    //if( args == "userCreated"){
    if ( args == "recommendationReady"){
        //The container is visible, the elements within it might be hidden
        container.show()
        container.append( clearfix, volgendeButton);
      }

    if ( args == "informationDone" ){
      container.hide();
    }
  }
  container.hide();
}
