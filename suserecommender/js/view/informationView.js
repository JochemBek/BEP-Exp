var InformationView = function( model, container, facebookApi){

  var volgendeButton       = $( "<a class='btn button btn-default pull-right' role='button'>Volgende &raquo; </a>" );
  var clearfix         = $( '<div class="clearfix">' );

  this.volgendeButton       = volgendeButton;

  model.addObserver( this );
  this.update = function(args){
    if ( args == "recommendationReady"){
        container.show()
        container.append( clearfix, volgendeButton);
    }

    if ( args == "informationDone" ){
      container.hide();
    }
  }
  container.hide();
}
