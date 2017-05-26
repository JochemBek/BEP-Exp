var IntroProbingView = function (model, container) {

  var volgendeButton    = $( "<center><a class='btn button btn-default pull-right' role='button'>Volgende &raquo;</a><center>" );
  var clearfix          = $( '<div class="clearfix">' );

  this.volgendeButton       = volgendeButton;

  model.addObserver( this );
  this.update = function(args){
    //if( args == "userCreated"){
    if ( args == "filterReady"){
        //The container is visible, the elements within it might be hidden
        container.show()
        container.append( clearfix, volgendeButton);
      }

    if ( args == "introProbingDone" ){
      container.hide();
    }
  }
  container.hide();


}
