var InformationView = function( model, container, facebookApi){
  
  var wachtMededeling     = $( "<p style='text-align:center'>Uw besparingsscore wordt op dit moment berekend...</p>");
  var progressContainer   = $( "<div class='progress progress-striped active'>" );
  var progressBar         = $( "<div class='progress-bar' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width:0%'>");
  progressContainer.append( progressBar );

  var volgendeButton       = $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );
  var clearfix         = $( '<div class="clearfix">' );

  this.volgendeButton       = volgendeButton;

  model.addObserver( this );
  this.update = function(args){
  //if( args == "userCreated"){
  if ( args == "recommendationReady"){

    //retrieve ability from model, scaled to 1 to 10
    var ability = model.getAbilityScaled();
    var scoreBlock = $("<p style='float:left; height:130px; width:105px; color:#FAFAFA; font-size:50px; text-align:center; border-radius: 5px 0 0 5px; border: 0px; font-weight:bold; padding-top: 30px'>"+ability+"</p>");
    var scoreText = $("<p style='font-size: 16px; color: #FAFAFA; text-align: center; width: 105px; border-radius: 5px 0 0 5px; border: 0px; height: 39px;'>uit 10</p>");
      if(ability<3){
        scoreBlock.css("background","#FF0000");
        scoreText.css("background","#FF0000");
      }else if(ability<6){
        scoreBlock.css("background","#FFBF00");
        scoreText.css("background","#FFBF00");
      }else{
        scoreBlock.css("background","#01DF01");
        scoreText.css("background","#01DF01");
      }
      scoreBlock.append(scoreText);
      var topText = $( "<p style='font-size:14px; font-weight:bold; padding-top: 15px; text-align: center; height: 130px; padding-left:10px; padding-right: 5px;'>Uw besparingsscore is "+ability+" uit 10. Een hogere besparingsscore betekent dat u meer energiebesparende maatregelen uitvoert.<br><br>Op de volgende pagina presenteren we u uw persoonlijke aanbevelingen.</div>");
      var divje = $( "<div style='width: 100%; border: 1px solid black; border-radius: 5px; margin-bottom: 20px;'>");
      divje.append(scoreBlock, topText);

      //Hide some elements upon the start
      divje.hide();
      volgendeButton.hide();

      //The container is visible, the elements within it might be hidden
      container.show()
      container.append(progressContainer, wachtMededeling, divje, clearfix, volgendeButton);
      
      //First show Progress bar for 2.5 seconds, then show the energy score, and thereafter the explanation / task instruction
      setTimeout(function() {
        progressBar.css('width','12%');
      }, 300);
      setTimeout(function() {
        progressBar.css('width','25%');
      }, 500);
      setTimeout(function() {
        progressBar.css('width','50%');
      }, 1250);
      setTimeout(function() {
        progressBar.css('width','75%');
      }, 2000);
      setTimeout(function() {
        progressBar.css('width','100%');
      }, 2500);
      setTimeout(function() {
        progressContainer.hide();
        wachtMededeling.hide();
        divje.slideDown();
      }, 3000);
      setTimeout(function() {
        volgendeButton.slideDown();
      }, 4000);
    }

    if ( args == "informationDone" ){
      container.hide();
    }
  }
  container.hide();
}