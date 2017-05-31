var RaschRecommenderModel = function( options ){

  /***********************************************************
               Options
  ***********************************************************/

  // These options should be set from outside the model with
  // the random conditions assigned

  var defaults = {

    numberOfSets            : 13, // Size for each sample measure, change to 12 for new experiment
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
    atRecom = 1, qualityQuestions = [], defaultQualityQuestions = [], defaultManCheckQuestions = [], initial = [], advisors = [], forms = [], atMancheck = 0, advisor = 0; 

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
      question: "@ heeft te veel slechte besparingsmaatregelen voorgesteld.",
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
      text: "Hij is deskundig.",
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
    measures = $.parseJSON( data );
    // Sort according to difficulty
    measures = measures.sort(function (a,b){
      return a.difficulty-b.difficulty;
    });
  });
  
  var rand1 = Math.floor(Math.random()*2) + 1; // first non-expert
  var rand2 = Math.floor(Math.random()*2) + 3; // first expert
  
  console.log("I'm in condition: " + o.condition + " and the first non-expert is: " + rand1);
  console.log("I'm in condition: " + o.condition + " and the first expert is: " + rand2);
  
  if(o.condition == 1) {
    if(rand1 == 1) {
      advisors[0] = 1; 
      advisors[2] = 2;
    } else {
      advisors[0] = 2; 
      advisors[2] = 1;
    }
    
    if(rand2 == 3) {
      advisors[1] = 3;
      advisors[3] = 4;
    } else {
      advisors[1] = 4;
      advisors[3] = 3;
    }
    
    forms[0] = 1;
    forms[1] = 1;
    forms[2] = 0;
    forms[3] = 0;
  }
  
  if(o.condition == 2) {
    if(rand1 == 1) {
      advisors[2] = 1; 
      advisors[3] = 2;
    } else {
      advisors[2] = 2; 
      advisors[3] = 1;
    }
    
    if(rand2 == 3) {
      advisors[0] = 3;
      advisors[1] = 4;
    } else {
      advisors[0] = 4;
      advisors[1] = 3;
    }
    
    forms[0] = 1;
    forms[1] = 0;
    forms[2] = 1;
    forms[3] = 0;
  }
  
  if(o.condition == 3) {
    if(rand1 == 1) {
      advisors[0] = 1; 
      advisors[1] = 2;
    } else {
      advisors[0] = 2; 
      advisors[1] = 1;
    }
    
    if(rand2 == 3) {
      advisors[2] = 3;
      advisors[3] = 4;
    } else {
      advisors[2] = 4;
      advisors[3] = 3;
    }
    
    forms[0] = 0;
    forms[1] = 1;
    forms[2] = 0;
    forms[3] = 1;
  }
  
  if(o.condition == 4) {
    if(rand1 == 1) {
      advisors[1] = 1; 
      advisors[3] = 2;
    } else {
      advisors[1] = 2; 
      advisors[3] = 1;
    }
    
    if(rand2 == 3) {
      advisors[0] = 3;
      advisors[2] = 4;
    } else {
      advisors[0] = 4;
      advisors[2] = 3;
    }
    
    forms[0] = 0;
    forms[1] = 0;
    forms[2] = 1;
    forms[3] = 1;
  }
  
  console.log(advisors);
  console.log(forms);

  /***********************************************************
            Helper Functions
  ***********************************************************/

  // Array shuffle function
  shuffle = function( array ){
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

  // Array arraySplit function - ik denk alleen met het bins maken
  // Deze functie is NIET correct
  arraySplit = function( msrs, nr ){
    var out = new Array();

    for(i = 0; i < o.numberOfSets; i++) {
      out[i] = new Array();
      for(j = 0; j < msrs.length; j++) {
        if(msrs[j].bin == (i + 1)) {
          out[i].push(msrs[j]);
        }
      }
    }
    return out;
  }

  /***********************************************************
            Private Functions
  ***********************************************************/

  // Create the user, add it to the database, and assign the
  // experimental condition.

  createUser = function(){
    console.log("Creating user");

    var path = window.location.href;
    var arr = path.split('/');
    var tidstring = arr[arr.length-1];
    var tid = tidstring.replace( /^\D+/g, '');
    console.log("tid is: " + tid);


    $.post( "ajax/insertUser.php",
      {
        conditie: o.condition,
        tid: tid
      }).done( function( data ) {
        currentUserId = data;
      });

  	createMeasures();
  }

  // After the user has filled out everything, update the user data.
  updateUser = function(mail, age){
    var email = mail;
    leeftijd = age;

    $.post( "ajax/insertDemo.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        email: email,
        leeftijd: leeftijd,
        opleiding: opleiding,
        man: geslacht,
        woon: woon,
        inkomen: inkomen,
      }).done(function(){
      });
  }

  // Take samples from the pool of measures after they've been loaded
  createMeasures = function(){

    setArray = arraySplit( measures, o.numberOfSets );
    for( i=0; i < o.numberOfSets; i++ ){
      var rand = Math.floor( Math.random() * setArray[i].length );
      selectedMeasures.push( setArray[i][rand] );
    }

    // randomize the order of the selected measures
    shuffle( selectedMeasures );

    notifyObservers("userCreated");
    //notifyObservers("manCheckDone");
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

  setSuitabilityScale = function( scaled ) {
    console.log( "Initial array was: " + initial[0] + " " + initial[1] + " " + initial[2] );
    var scale = scaled;
    console.log("Adv db: " + advisor);

    $.post("ajax/insertSuitabilityScale.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        screen: atRecom,
        advisor: advisor,
        first: initial[0].id,
        second: initial[1].id,
        third: initial[2].id,
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

  setExtraQuestion = function(question, order, val) {
    var questionId = question;
    var atPlace    = order;
    var mailAlreadyNeither = val;

    if(mailAlreadyNeither == 1) {
      for(i=0; i<measures.length; i++){
        if(measures[i].id == questionId) {
          wantedRecommendations.push(measures[i]);
          console.log("Added measure " + questionId + " to mail");
        }
      }
    }

    $.post("ajax/insertExtraQuestion.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        screen: atRecom,
        questionId: questionId,
        atPlace: atPlace,
        mailAlreadyNeither: mailAlreadyNeither
      }).done(function(){

      console.log("The checkbox answers are saved in the DB");
    });
  }

  setManCheckQuestion = function(advs, question, value, ord) {
    var advis = advs;
    var questionId = question;
    var val = value;
    var order = ord;

    $.post("ajax/insertManCheck.php",
      {
        userId: currentUserId,
        conditie: o.condition,
        advis: advis,
        questionId: questionId,
        value: val,
        order: order,
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
    console.log("Ability: " + abilitySpot);

    if(abilitySpot == 0) {
      abilitySpot = 1;
    }

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

  createMessage = function(){
    console.log("User has selected : " + wantedRecommendations.length + " recommendations for mail.")
    var textstring="";
    for(i=0; i<wantedRecommendations.length; i++){
      var tabelrij = "<tr><td>"+wantedRecommendations[i].name+"</td><td>"+wantedRecommendations[i].description+"</td></tr>";
      textstring = textstring + tabelrij;
    }
	  bericht = "<html><body><p>Dit zijn de door u geselecteerde tips van de besparingshulp! Veel succes met besparen.</p><table border=1><tr><th>Titel van de aanbeveling</th><th>Omschrijving</th></tr>"+textstring+"</table></body></html>";
    console.log(textstring);
	  //console.log(wantedRecommendations);
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
      console.log("Next Recommendation!");
      console.log("I am now at screen: " + atRecom);
      notifyObservers( "nextRecommendation" );
    } else {
      notifyObservers( "manCheck" );
    }
  }

  manCheckQuestionsDone = function() {
    atMancheck++;
    if(atMancheck < 4){
      notifyObservers("manCheck");
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
    console.log("Advisor is : " + advisors[atRecom-1]);
    advisor = advisors[atRecom-1];
    return advisors[atRecom-1];
  }
  
  getAdvMan = function() {
    return advisors[atMancheck];
  }

  getForm = function(){
    console.log("Form is : " + forms[atRecom-1]);
    return forms[atRecom-1];
  }

  getRecommendations = function(){
    var setOfRec = [];
    var shuffledSetOfRec = [];

    setOfRec.push(onLevel[atRecom-1]);
    setOfRec.push(oneAboveLevel[atRecom-1]);
    setOfRec.push(twoAboveLevel[atRecom-1]);

    shuffledSetOfRec = shuffle(setOfRec);

    initial = shuffledSetOfRec;

    console.log("Shuffled set of recommendations: " + shuffledSetOfRec);

    return shuffledSetOfRec;

  }

  getQualityQuestions = function(){
    //qualityQuestions = shuffle(defaultQualityQuestions);
    return defaultQualityQuestions;
  }

  getManCheckQuestions = function(){
    //var manCheckQuestions = shuffle(defaultManCheckQuestions);
    return defaultManCheckQuestions;
  }

  getRandomAdvisor = function(){
    var experts = [0, 1];
    var firstExpert = shuffle(experts);
    return firstExpert[0];
  }

  setInterested = function (value){
    interested = value;
  }

  setConsent = function (value){
    consent = value;
  }

  sendEmail = function (mail){
    var email = mail;

    if(wantedRecommendations.length != 0) {
      $.when( createMessage() ).then( function() {
        console.log("Sending Email to adress:" + email + ", with message: " + bericht);
        $.post("ajax/sendEmail.php",
          {
            email: email,
            bericht: bericht
          });
        }
      );
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
    //sendEmail();
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
  this.createMeasures             = createMeasures;
  this.newMeasure                 = newMeasure;
  this.newQualityQuestions        = newQualityQuestions;
  this.createRecommendation       = createRecommendation;

  this.getMeasure               = getMeasure;
  this.getAdvisor               = getAdvisor;
  this.getAdvMan                = getAdvMan;
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
  this.setCommentaar        = setCommentaar;
  this.experimentDone       = experimentDone;
  this.introProbingDone     = introProbingDone;
  this.sendEmail            = sendEmail;

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
