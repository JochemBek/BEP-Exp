var RaschRecommenderModel = function( options ){

  /***********************************************************
               Options
  ***********************************************************/

  // These options should be set from outside the model with
  // the random conditions assigned

  var defaults = {

    numberOfSets            : 12, // Size for each sample measure, change to 12 for new experiment
    numberOfRecommendations : 6,  //number of recommendations, total for three sets
    logitSize               : 0.5,  // the size of a logit in the used scale 
    //als het goed is hoort hier de relatie bij: Probability = 1 / (1+e^(-(ability - difficulty )))
    //1 logit is gelijk aan 0.731 (dus 73.1%); 2 logit verschil is gelijk aan 88% dat iemand iets niet doet

    condition               : Math.ceil( Math.random() * 3 ), // dit is voor USE 1.1

    /***********EXPLANATION OF LIST BUILD-UP CONDITIONS*************
       1 = Social Condition with normal amounts
       2 = Social Condition with reversed, compression amounts
       3 = Non-social condition
    ****************************************************************/

    numberOfLists           : 1,      //aantal aanbevelingslijsten
    numberOfConditions      : 3,      //aantal condities voor maatregelen (dus erboven, erop, eronder)
    newMeasureNumber        : 0,      // turned off new measures (!!!)

  };

  var options = $.extend(defaults,options);
  var o = options;
  var recommendationLength = o.numberOfRecommendations / o.numberOfLists;


  /***********************************************************
            Variable Declarations
  ***********************************************************/
  
  var measures, newMeasures, measureQuestions, currentUserId, woon, value, geslacht, commentaar, bericht, consent,
    facebookId, email, currentMeasure, inkomen, satisfactionQuestions, abilitySpot, voorselectie = [], wantedRecommendations = [],
    setArray = [], abilitySet = [], filteredMeasures = [], measureHistory = [], selectedMeasures = [], recommendation = [], 
    stepCounter = 0, ability = 0, abilityScaled = 0, yes = 0, nvt = 0, leeftijd = 0, onLevel = [], oneAboveLevel = [], twoAboveLevel = [];

  // Get all the required data from the database
  // Fill the array with all the measures in the database
  $.get( "ajax/selectMeasureQuestions.php", function( data ){
    measureQuestions = $.parseJSON( data );
  });
  


  $.get( "ajax/selectMeasures.php", function( data ){
    //console.log("Data: " + data);
    measures = $.parseJSON( data );
    // Sort according to difficulty
    measures = measures.sort(function (a,b){
      return a.difficulty-b.difficulty;
    });
  }).done(function(){
    getNewQuestions();
 });

  
  
  
   var getNewQuestions = function(){
    // Get the new measures for calculating the level on rash scale - niet relevant nu maar kan geen kwaad
    $.get( "ajax/selectNewMeasures.php", function( data ){
      newMeasures = $.parseJSON( data );
    }).done(function(){

      selectSatisfactionQuestions();
    });
  }

  /***************SATISFACTION QUESTIONS **********/

  /*var selectSatisfactionQuestions = function(){
    $.get( "ajax/selectSatisfactionQuestions.php", function( data ){
      satisfactionQuestions = $.parseJSON( data );
    }).done(function(){
      notifyObservers( "questionsReady" );
    });
  }*/


  /*************UITLEG FILTERING****************************
  *** 0. = geschikt voor alle woonsituaties             ****
  *** 1. = niet geschikt voor huurwoningen              ****
  *** 2. = niet geschikt voor woningen zonder tuin      ****
  *** 3. = niet geschikt voor 1. en 2.                  ****
  ********************************************************** 
  ****Zie voor woonsituatie-waarde filterMeasureView.js ****
  ****Kort gezegd: huurhuizen onder 4; tuinen zijn even ****
  *********************************************************/
  var filterMeasures = function(){
    for( i=0; i<measures.length; i++ ){
      console.log("Going through measure " + i + " now: Filter: " + measures[i].filter);
      // Excluding recommendations that are inappropriate for the user's housing situation.
      if( measures[i].filter == 0 ){
        filteredMeasures.push( measures[i] );
      }else if( measures[i].filter == 1 && woon > 3) {
        filteredMeasures.push( measures[i] ); // maatregelen voor koophuizen alleen erin voor degene met een koophuis 
      }else if( measures[i].filter == 2 && woon % 2 === 0){
        filteredMeasures.push( measures[i] ); // maatregelen voor tuinen alleen erin voor degene met een tuin
      }else if( measures[i].filter == 3 && woon > 3 && woon % 2 === 0){
        filteredMeasures.push( measures[i] ); // een combinatie van de 2 is evident
      } else { 
        console.log("Should be filtered");
      }
    }
    
    createMeasures();

  }


  /***********************************************************
            Helper Functions
  ***********************************************************/

  // Array shuffle function
  shuffle = function( array ){
    console.log("Array to shuffle: " + array);
    var currentIndex = array.length, 
    temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while ( 0 !== currentIndex ) {
        // Pick a remaining element...
        randomIndex = Math.floor( Math.random() * currentIndex );
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
  }

  // Array split function - ik denk alleen met het bins maken
  split = function( a, n ){
    var len = a.length, out = [], i = 0;
    while ( i < len ){
      var size = Math.ceil( ( len - i ) / n--);
      out.push( a.slice( i, i+= size ));
    }
    return out;
  }

  // returns the closest difficulty to the given value (easy for center condition)
  /*getClosest = function( array, value ){
    var closest = null;
    $.each( array, function(){
      if ( closest == null ){ 
        closest = this;
      }
      else if( Math.abs( this.difficulty - value ) < Math.abs( closest.difficulty - value ) ){
        closest = this;
      }
    })
    return closest;
  }*/

  /***********************************************************
            Private Functions
  ***********************************************************/

  // Create the user, add it to the database, and assign the
  // experimental condition.

  createUser = function( ){
    
    console.log("Creating user");
    
    $.post( "ajax/insertUser.php", 
      {
        conditie: o.condition
      }).done( function( data ) {
        currentUserId = data;
      });

    notifyObservers('userCreated');
  }
  
  // After the user has filled out everything, update the user data.
  updateUser = function(){

    $.post( "ajax/updateUser.php", 
      { 
        userId: currentUserId,
        ability: ability,
        woonsituatie: woon,
        leeftijd: leeftijd,
        opleiding: opleiding,
        man: geslacht,
        inkomen: inkomen,
        interested: interested,
        email: email,
        emailSent: emailSent, 
        consent: consent,
        comments: commentaar
      });
  }

  // Take samples from the pool of measures after they've been loaded
  createMeasures = function(){
    
//FILTER HIER************

    selectedMeasures  = [];
    
    setArray = split( filteredMeasures, o.numberOfSets );
    for( i=0; i < o.numberOfSets; i++ ){
      var rand = Math.floor( Math.random() * setArray[i].length );
      selectedMeasures.push( setArray[i][rand] );
    }

    // Add two of the new measures to the list (Dit doet nu dus niks :)
    //shuffle( newMeasures );
    //for( i=0; i < o.newMeasureNumber; i++ ){
      //selectedMeasures.push( newMeasures[i] );
    //}
    // randomize the order of the selected measures
    shuffle( selectedMeasures );
    filterMeasureDone();
    newMeasure();
  }
  
  // Get a measure to present to the user
  newMeasure = function(){
    if( stepCounter < (o.numberOfSets + o.newMeasureNumber) ){
      currentMeasure = selectedMeasures[stepCounter];
      stepCounter++;
      notifyObservers( 'measureReady' );
    }
    else{
      // Create the recommendation when the conditions are met
      console.log("Dat was phase 1");
      createRecommendation();
    }
  }


  // Used when the user votes, can take either "yes", "no" or "nvt" as parameters.
  setUserMeasure = function( value ){
    var answer;
    // This checks if the measure is a existing one or one we are testing to put
    // on the rasch scale as new. The new ones dont have difficulty yet ofcourse.
    if( value == "yes" ){
        yes ++;
        answer = 1;
        // only pushed to history if the answer is yes or nvt
        measureHistory.push( currentMeasure );
      }
      else if( value == "no" ){
        answer = 0;
      }
      else if( value == "nvt"){
        answer = 2;
        nvt++;
        measureHistory.push( currentMeasure );
      }
      
      console.log("Posting answer to db");

      $.post( "ajax/insertUserMeasure.php", 
        { 
          userId: currentUserId,
          measureId: currentMeasure.id,
          answerPre: answer
        }).done(function(){

        newMeasure();
        // When measure is saved get the next one
      });
    
    
  }

  // Create the recommendation from the ability depending on the condition.

  createRecommendation = function(){

    // If someone has 0 'yes' answers we give him one so we have someting to recommend
    if( yes == 0 ) {
      yes = 1;
    }

    // select the set where the user is in and check if questions were NVT and extrapolate accordingly
    abilitySpot     = Math.round( yes + ( ( yes / o.numberOfSets ) * nvt ) ) - 1;
    abilitySet      = setArray[Math.round( yes + ( ( yes / o.numberOfSets ) * nvt ) ) - 1];

    // calculate mean ability of set
    var count       = 0;
    $.each(abilitySet,function(index){
      count       += Number(this.difficulty);
    });
    ability       = count / abilitySet.length;

    var recomArray    = [];
    for( i=0; i<measures.length; i++ ){
      // Not adding recommendations that user is already doing. Returns -1 if not in both arrays
      if( $.inArray( measures[i], measureHistory ) == -1 ){
        recomArray.push( measures[i] );
      }
    }
    
    // Take all measures that are not yet shown in phase 1, and check whether they are at the ability of the user, or one above, or two above
    for (i=0; i < recomArray.length; i++) {
      console.log("Testing if measure " + recomArray[i].id + " from bin " + recomArray[i].bin);
      if (recomArray[i].bin == abilitySpot) {
        onLevel.push(recomArray[i]);
        console.log("Measure " + i + " from bin " + recomArray[i].bin + " added to onLevel" );
      } else if (recomArray[i].bin == abilitySpot + 1) {
        oneAboveLevel.push(recomArray[i]);
        console.log("Measure " + i + " from bin " + recomArray[i].bin + " added to oneAboveLevel" );
      } else if (recomArray[i].bin == abilitySpot + 2) {
        twoAboveLevel.push(recomArray[i]);
        console.log("Measure " + i + " from bin " + recomArray[i].bin + " added to twoAboveLevel" );
      }
    }
    
    
    // Shuffle recommendation arrays, and leave the first 4 measures
    shuffle(onLevel);
    shuffle(oneAboveLevel);
    shuffle(twoAboveLevel);
    onLevel.splice(3, 1);
    oneAboveLevel.splice(3, 1);
    twoAboveLevel.splice(3, 1);
    
    notifyObservers( "recommendationReady" );


    
    
    
    
    
    

 /********************* ALGORTIME GEBASEERD OP DE abilitySpot WAAR JE ZIT ************
 ********************** KAN ALLEEN MET 12 SETS VANWEGE DE DATABASE ******************/
    /*
    for(i=0; i<o.numberOfRecommendations; i++){
      recommendation.push(voorselectie[i]);
      if(i == (o.numberOfRecommendations - 1)){
        insertRecommendation();
        notifyObservers( "recommendationReady" );
      }
    }*/

  }

  filterMeasureDone = function(){
    notifyObservers( "filterReady" );
  }

  trackHover = function ( index, hoverIn ){
    $.post( "ajax/insertTrackHover.php", 
      { 
        userId: currentUserId,
        ability: ability,
        measureId: recommendation[index].id,
        hoverIn: hoverIn
      });
  }

  insertRecommendation = function(){
    if(o.condition == 3){
      for(i=0; i<recommendation.length; i++){
        $.post( "ajax/insertRecommendation.php", 
        { 
          userId: currentUserId,
          ability: ability,
          measureId: recommendation[i].id,
          position: i+1,     // 1 is dus als 'ie bovenaan in de lijst staat
          conditie: o.condition,
          friends: -1
        });
      }
    }else{
      for(i=0; i<recommendation.length; i++){
        $.post( "ajax/insertRecommendation.php", 
        { 
          userId: currentUserId,
          ability: ability,
          measureId: recommendation[i].id,
          position: i+1,     // 1 is dus als 'ie bovenaan in de lijst staat
          conditie: o.condition,
          friends: recommendation[i].friends
        });
      }
    }
  }

    // To add a facebook friend to a user. Accepts the facebook friend object
  insertFacebookFriend = function( friend, score ){
    $.post( "ajax/insertFacebookFriend.php", 
      {
        facebookId: facebookId,
        friendId: friend.id,
        friendName: friend.name,
        score: score,
      }
    );
  }

  setUserRecommendation = function (measureId, answer){
    $.post( "ajax/insertUserRecommendation.php", 
      { 
        userId: currentUserId,
        measureId: measureId,
        answerPost: answer // in deze recommender is het een antwoord op Wel/niet doen
      });
  }

  //Collects recommendations that the user has indicated to like
  sendRecommendation = function ( measureId ){
    for(i=0; i<recommendation.length; i++){
      if(recommendation[i].id == measureId) {
      wantedRecommendations.push(recommendation[i]);
      }
    }
    //createMessage();   
  }


  setUserSelection = function (measureId, answer){
    $.post( "ajax/insertUserSelection.php", 
      { 
        userId: currentUserId,
        ability: ability,
        measureId: measureId,
        choice: answer // in deze recommender is het een antwoord op Wel/niet doen
      });
    sendRecommendation(measureId);
  }

  
  createMessage = function(){
    var textstring="";
    for(i=0; i<wantedRecommendations.length; i++){
      var tabelrij = "<tr><td>"+wantedRecommendations[i].name+"</td><td>"+wantedRecommendations[i].description+"</td></tr>";
      textstring = textstring + tabelrij;
    }
	  bericht = "<html><body><p>Dit zijn de door u geselecteerde tips van besparinghulp.nl! Veel succes met besparen.</p><table border=1><tr><th>Titel van de aanbeveling</th><th>Omschrijving</th></tr>"+textstring+"</table></body></html>";
     //console.log(textstring);
	 console.log(wantedRecommendations);
  }

  setUserSatisfactionQuestion = function( questionId, answer ){
    $.post( "ajax/insertUserSatisfactionQuestion.php", 
      { 
        userId: currentUserId,
        questionId: questionId,
        value: answer
      });
  }

  informationDone = function(){
    notifyObservers( "informationDone" );
  }

  setRecommendationDone = function(){
    createMessage();
	notifyObservers( "setRecommendationDone" );
  }

  satisfactionDone = function(){
    notifyObservers( "satisfactionDone" );
  }

  getMeasure = function(){
    return currentMeasure;
  }

  getRecommendation = function(){
    return recommendation;
  }

  getMeasureQuestions = function(){
    return measureQuestions;
  }

  getSatisfactionQuestions = function(){
    return satisfactionQuestions;
  }

  setLeeftijd = function( value ){
    leeftijd = value;
  }

setInterested = function (value){
    interested = value;
  }

  setConsent = function (value){
    consent = value;
  }

  setEmailInterest = function (value){
    emailSent = value;
    //alert("value="+value);
	if(value == 1 && email != null){
	//alert(email);
	//alert(bericht);
		$.post("ajax/sendEmail.php",
      {
        email: email,
        bericht: bericht
      });
    }
  }

    getAbilityScaled = function(){
    var judgementScale = 10;
    abilityScaled   = Math.round( ( yes + ( ( yes / o.numberOfSets ) * nvt ) ) / (o.numberOfSets / judgementScale) ) ; // het moet op een schaal van 1 tot 10
    return abilityScaled;
  }

  trackWoonsituatie = function ( value ){
    woon = value;
  }

  trackInkomen = function ( value ){
    inkomen = value;
  }

  trackOpleiding = function ( value ){
    opleiding = value;
  }

  trackGeslacht = function ( value ){
    geslacht = value;
  }

 setInterested = function (value){
    interested = value;
  }

  setEmail = function (value, sturen){
    email = value;
    setEmailInterest(sturen);
  }
  setCommentaar = function ( value ){
    commentaar = value;
  }

  demographicsCheck = function(){
    var demographCheck;
    if( opleiding == 0 || geslacht == -1){
      demographCheck = 0;
    }else{
      demographCheck = 1;
    }
    return demographCheck;
  }

  demographicsDone = function(){
    notifyObservers( "demographicsDone" );
  }

  experimentDone = function(){
    notifyObservers("expDone");
  }

  /***********************************************************
            Public Functions
  ***********************************************************/
// dit is nodig om ze vanuit een andere js te kunnen aanroepen
  this.o                    = o;  
  this.recommendationLength = recommendationLength;
  this.stepCounter          = stepCounter;
  this.abilitySpot          = abilitySpot;

  this.createUser                 = createUser;
  this.updateUser                 = updateUser;
  this.filterMeasures             = filterMeasures;
  this.createMeasures             = createMeasures;
  this.newMeasure                 = newMeasure;
  this.createRecommendation       = createRecommendation;
  
  this.getMeasure               = getMeasure;
  this.informationDone          = informationDone;
  this.setRecommendationDone    = setRecommendationDone;
  this.satisfactionDone         = satisfactionDone;
  this.getRecommendation        = getRecommendation;
  this.getSatisfactionQuestions = getSatisfactionQuestions;
  this.demographicsDone         = demographicsDone;
  this.getMeasureQuestions      = getMeasureQuestions;

  this.trackHover                   = trackHover;
  this.setUserMeasure               = setUserMeasure;
  this.setUserRecommendation        = setUserRecommendation;
  this.setUserSatisfactionQuestion  = setUserSatisfactionQuestion;
  this.setUserSelection             = setUserSelection;
  this.insertFacebookFriend         = insertFacebookFriend;

  this.trackWoonsituatie    = trackWoonsituatie;
  this.trackInkomen         = trackInkomen;
  this.trackOpleiding       = trackOpleiding;
  this.trackGeslacht        = trackGeslacht;
  this.demographicsCheck    = demographicsCheck;
  this.getAbilityScaled     = getAbilityScaled;
  this.setConsent           = setConsent;
  this.setInterested        = setInterested;
  this.setEmail             = setEmail;
  this.setEmailInterest     = setEmailInterest;
  this.setCommentaar        = setCommentaar;
  this.setLeeftijd          = setLeeftijd;
  this.experimentDone       = experimentDone;

  /***********************************************************
            Observable Pattern
  ***********************************************************/

  var listeners = [];

  this.addObserver = function( listener ){
    listeners.push( listener );
  }

  notifyObservers = function( args ){
    for ( var i = 0; i < listeners.length; i++ ){
          listeners[i].update(args);
      }
  }

  this.notifyObservers      = notifyObservers;


}