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

    condition               : Math.ceil( Math.random() * 4 ), // dit is voor USE 1.1

    /***********EXPLANATION OF LIST BUILD-UP CONDITIONS*************
       1 = Social Condition with normal amounts
       2 = Social Condition with reversed, compression amounts
       3 = Non-social condition
    ****************************************************************/

    numberOfLists           : 1,      //aantal aanbevelingslijsten
    numberOfConditions      : 4,      //aantal condities voor maatregelen (dus erboven, erop, eronder)
    newMeasureNumber        : 0,      // turned off new measures (!!!)

  };

  var options = $.extend(defaults,options);
  var o = options;
  var recommendationLength = o.numberOfRecommendations / o.numberOfLists;


  /***********************************************************
            Variable Declarations
  ***********************************************************/

  var measures, currentUserId, woon, value, geslacht, commentaar, bericht, consent,
    email, currentMeasure, inkomen, satisfactionQuestions, abilitySpot, wantedRecommendations = [],
    setArray = [], abilitySet = [], filteredMeasures = [], measureHistory = [], selectedMeasures = [], recommendation = [],
    stepCounter = 0, ability = 0, yes = 0, nvt = 0, leeftijd = 0, onLevel = [], oneAboveLevel = [], twoAboveLevel = [],
    atRecom = 1, qualityQuestions = [], defaultQualityQuestions = [], defaultManCheckQuestions = [];

  defaultQualityQuestions = [
    {
      nr: 1,
      question: "De voorgestelde besparingsmaatregelen passen bij mijn voorkeuren.",
      scale: 7
    },
    {
      nr: 2,
      question: "De voorgestelde besparingsmaatregelen zijn relevant.",
      scale: 7
    },
    {
      nr: 3,
      question: "De voorgestelde besparingsmaatregelen zijn aantrekkelijk.",
      scale: 7
    },
    {
      nr: 4,
      question: "Ik vind geen enkele van de voorgestelde besparingsmaatregelen leuk.",
      scale: 7
    },
    {
      nr: 5,
      question: "De adviseur heeft te veel slechte besparingsmaatregelen voorgesteld.",
      scale: 7
    },
    {
      nr: 6,
      question: "Ik ben van plan om de maatregelen die zijn voorgesteld door de adviseur op te volgen.",
      scale: 7
    }
  ];

  defaultManCheckQuestions = [
    {
      nr: 1,
      text: "Hij is een expert op het gebied van energiebesparing. ",
      scale: 7
    },
    {
      nr: 2,
      text: "Hij heeft relevante ervaring.",
      scale: 7
    },
    {
      nr: 3,
      text: "Hij heeft voldoende kennis van zaken.",
      scale: 7
    },
    {
      nr: 4,
      text: "Hij is bekwaam.",
      scale: 7
    },
    {
      nr: 5,
      text: "Hij is onbekwaam.",
      scale: 7
    }
  ];
    
  var expertDone = 0;
  var nonExpertDone = 0;

  // Get all the required data from the database
  // Fill the array with all the measures in the database

  $.get( "ajax/selectMeasures.php", function( data ){
    //console.log("Data: " + data);
    measures = $.parseJSON( data );
    // Sort according to difficulty
    measures = measures.sort(function (a,b){
      return a.difficulty-b.difficulty;
    });
  });


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

    // randomize the order of the selected measures
    shuffle( selectedMeasures );
    filterMeasureDone();
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

  newQualityQuestions = function(){
    notifyObservers( 'recommendationsDone');
  }


  // Used when the user votes, can take either "yes", "no" or "nvt" as parameters.
  setUserMeasure = function( value ){
    var answer;
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

  setSuitabilityScale = function( array ) {
    var scale = array;

    $.post("ajax/insertSuitabilityScale.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        screen: atRecom,
        mostSuitable: scale[0],
        averageSuitable: scale[1],
        leastSuitable: scale[2]
      }).done(function(){

      console.log("The scale is saved in the DB");
      newQualityQuestions();
    });
  }

  setQualityQuestion = function(question, value, place) {
    var questionId = question;
    var val = value;
    var nrInOrder = place;

    $.post("ajax/insertQualityQuestion.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        screen: atRecom,
        questionId: questionId,
        value: val,
        nrInOrder: nrInOrder
      }).done(function(){
      console.log("The question + answer are saved in the DB");
    });
  }

  setExtraQuestion = function(question, wantEmail, alreadyDo) {
    var questionId = question;
    var wantEmailB = wantEmail;
    var alreadyDoB = alreadyDo;
    var wantEmail;
    var alreadyDo;

    if(wantEmailB == false) {
      wantEmail = 0;
    } else {
      wantEmail = 1;
    }

    if(alreadyDoB == false) {
      alreadyDo = 0;
    } else {
      alreadyDo = 1;
    }

    $.post("ajax/insertExtraQuestion.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        screen: atRecom,
        questionId: questionId,
        wantEmail: wantEmail,
        alreadyDo: alreadyDo
      }).done(function(){

      console.log("The checkbox answers are saved in the DB");
    });
  }

  setManCheckQuestion = function(expertise, question, value) {
    var isExpert = expertise;
    var questionId = question;
    var val = value;

    $.post("ajax/insertManCheck.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        isExpert: expertise,
        questionId: questionId,
        value: val
      }).done(function(){

      console.log("The ManChecks are saved in the DB");
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

  //Collects recommendations that the user has indicated to like
  sendRecommendation = function ( measureId ){
    for(i=0; i<recommendation.length; i++){
      if(recommendation[i].id == measureId) {
      wantedRecommendations.push(recommendation[i]);
      }
    }
    //createMessage();
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

  informationDone = function(){
    notifyObservers( "informationDone" );
  }

  setRecommendationDone = function(){
    createMessage();
	   notifyObservers( "setRecommendationDone" );
  }

  qualityQuestionsDone = function(){
    notifyObservers( "qualityQuestionsDone" );
  }

  extraQuestionsDone = function() {
    atRecom++;
    notifyObservers("extraQuestionsDone");
    if(atRecom < 5) {
      console.log("Next Recommendation plox!");
      console.log("I am now at atRecom " + atRecom);
      notifyObservers( "nextRecommendation" );
    } else {
      var expertise = Math.floor(Math.random() * 1);     
      if(expertise == 0) {
        nonExpertDone = 1;
        notifyObservers( "manCheckNonExpert" );
      } else {
        expertDone = 1;
        notifyObservers( "manCheckExpert" );
        console.log("ExpertDone: " + expertDone);
      }
    }
  }

  manCheckQuestionsDone = function() {
    console.log("ExpertDone: " + expertDone + " and nonExpertDone: " + nonExpertDone);

    if(expertDone == 1 && nonExpertDone == 0){
      nonExpertDone = 1;
      notifyObservers("manCheckNonExpert");
    } else if(expertDone == 0 && nonExpertDone == 1) {
      expertDone = 1;
      notifyObservers("manCheckExpert")        
    } else {
      notifyObservers("manCheckDone");
    }
  }

  getMeasure = function(){
    return currentMeasure;
  }

  getRecommendation = function(){
    return recommendation;
  }

  getAdvisor = function(){
    console.log("User gaat naar recommendation set " + atRecom + " en heeft conditie " + o.condition);
    var advisor;
    if (atRecom == 1) {
      if (o.condition == 1 || o.condition == 3) {
        advisor = 0;
      } else {
        advisor = 1;
      }
    } else if (atRecom == 2) {
      if (o.condition == 1 || o.condition == 2) {
        advisor = 1;
      } else {
        advisor = 0;
      }
    } else if (atRecom == 3) {
      if (o.condition == 1 || o.condition == 2) {
        advisor = 0;
      } else {
        advisor = 1;
      }
    } else {
      if (o.condition == 1 || o.condition == 3) {
        advisor = 1;
      } else {
        advisor = 0;
      }
    }
    return advisor;
  }

  getForm = function(){
    var form;
    if (atRecom == 1) {
      if (o.condition == 1 || o.condition == 2) {
        form = 1;
      } else {
        form = 0;
      }
    } else if (atRecom == 2) {
      if (o.condition == 1 || o.condition == 3) {
        form = 1;
      } else {
        form = 0;
      }
    } else if (atRecom == 3) {
      if (o.condition == 1 || o.condition == 3) {
        form = 0;
      } else {
        form = 1;
      }
    } else {
      if (o.condition == 1 || o.condition == 2) {
        form = 0;
      } else {
        form = 1;
      }
    }

    console.log("De vorm is in model: " + form);
    return form;
  }

  getRecommendations = function(){
    var setOfRec = [];
    var shuffledSetOfRec = [];

    setOfRec.push(onLevel[atRecom-1]);
    setOfRec.push(oneAboveLevel[atRecom-1]);
    setOfRec.push(twoAboveLevel[atRecom-1]);

    shuffledSetOfRec = shuffle(setOfRec);

    return shuffledSetOfRec;
  }

  getQualityQuestions = function(){
    qualityQuestions = shuffle(defaultQualityQuestions);
    return qualityQuestions;
  }

  getManCheckQuestions = function(){
    var manCheckQuestions = shuffle(defaultManCheckQuestions);
    return manCheckQuestions;
  }

  getRandomAdvisor = function(){
    var experts = [0, 1];
    var firstExpert = shuffle(experts);
    return firstExpert[0];
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

  introProbingDone = function(){
    notifyObservers("introProbingDone");
    newMeasure();
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
  this.newQualityQuestions        = newQualityQuestions;
  this.createRecommendation       = createRecommendation;

  this.getMeasure               = getMeasure;
  this.getAdvisor               = getAdvisor;
  this.getForm                  = getForm;
  this.getRecommendations       = getRecommendations;
  this.informationDone          = informationDone;
  this.setRecommendationDone    = setRecommendationDone;
  this.qualityQuestionsDone     = qualityQuestionsDone;
  this.extraQuestionsDone       = extraQuestionsDone;
  this.manCheckQuestionsDone    = manCheckQuestionsDone;
  this.getRecommendation        = getRecommendation;
  this.getManCheckQuestions     = getManCheckQuestions;
  this.getRandomAdvisor         = getRandomAdvisor;
  this.getQualityQuestions      = getQualityQuestions;
  this.demographicsDone         = demographicsDone;

  this.trackHover                   = trackHover;
  this.setUserMeasure               = setUserMeasure;
  this.setSuitabilityScale          = setSuitabilityScale;
  this.setQualityQuestion           = setQualityQuestion;
  this.setExtraQuestion             = setExtraQuestion;
  this.setManCheckQuestion          = setManCheckQuestion;
  this.atRecom                      = atRecom;

  this.trackWoonsituatie    = trackWoonsituatie;
  this.trackInkomen         = trackInkomen;
  this.trackOpleiding       = trackOpleiding;
  this.trackGeslacht        = trackGeslacht;
  this.demographicsCheck    = demographicsCheck;
  this.setConsent           = setConsent;
  this.setInterested        = setInterested;
  this.setEmail             = setEmail;
  this.setEmailInterest     = setEmailInterest;
  this.setCommentaar        = setCommentaar;
  this.setLeeftijd          = setLeeftijd;
  this.experimentDone       = experimentDone;
  this.introProbingDone     = introProbingDone;

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
