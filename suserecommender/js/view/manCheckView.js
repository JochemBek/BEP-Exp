var ManCheckView = function (model, container){
	
	/***********************************************************
					  Variable Declarations
	***********************************************************/

  var uitleg = $(" <div> <p> U heeft van twee personen suggesties gekregen </p> </div> ")
	var firstManCheckList		= $( "<div class='mancheck-q1' id='manCheck1'>" );	
  var secondManCheckList		= $( "<div class='mancheck-q2' id='manCheck2'>" );
	var volgendeButton	 		= $( "<a class='btn btn-default pull-right' role='button'>Volgende &raquo;</a>" );
	var clearfix				= $( "<div class='clearfix'>" );

	container.append( uitleg, firstManCheckList, secondManCheckList, volgendeButton, clearfix );

	/***********************************************************
						Private Variables
	***********************************************************/

	displayManCheckQuestions = function(){
		var manCheckQs = model.getManCheckQuestions();
    var firstAdvisor = model.getRandomAdvisor();
    var quest1 = []; 
    var quest2 = [];
    
    var cl1;
    var cl2;
    
    if(firstAdvisor == 1) {
      cl1 = "expert";
      cl2 = "nonexpert";
    } else {
      cl1 = "nonexpert";
      cl2 = "expert";
    }
		
		for(var i = 0; i < manCheckQs.length; i++) {
			quest1[i] = $("<div id='" + manCheckQs[i].nr + "' class='question " + cl1 + "'> <p>'" + manCheckQs[i].text + "'</p> <div> <ul id='q" + manCheckQs[i].nr + "cont' class='likert'> <li> Helemaal mee oneens </li> <li><input type='radio' name='1q" + manCheckQs[i].nr + "' value='1' /></li> <li><input type='radio' name='1q" + manCheckQs[i].nr + "' value='2' /></li> <li><input type='radio' name='1q" + manCheckQs[i].nr + "' value='3' /></li> <li><input type='radio' name='1q" + manCheckQs[i].nr + "' value='4' /></li> <li><input type='radio' name='1q" + manCheckQs[i].nr + "' value='5' /></li> <li> Helemaal mee eens </li> </ul> </div>");
      quest2[i] = $("<div id='" + manCheckQs[i].nr + "' class='question " + cl2 + "'> <p>'" + manCheckQs[i].text + "'</p> <div> <ul id='q" + manCheckQs[i].nr + "cont' class='likert'> <li> Helemaal mee oneens </li> <li><input type='radio' name='2q" + manCheckQs[i].nr + "' value='1' /></li> <li><input type='radio' name='2q" + manCheckQs[i].nr + "' value='2' /></li> <li><input type='radio' name='2q" + manCheckQs[i].nr + "' value='3' /></li> <li><input type='radio' name='2q" + manCheckQs[i].nr + "' value='4' /></li> <li><input type='radio' name='2q" + manCheckQs[i].nr + "' value='5' /></li> <li> Helemaal mee eens </li> </ul> </div>");
		}
		
		for(var i = 0; i < quest1.length; i++) {
			firstManCheckList.append(quest1[i]);
		}
    
    for(var i = 0; i < quest2.length; i++) {
			secondManCheckList.append(quest2[i]);
		}

	}	

	/***********************************************************
						Public Variables
	***********************************************************/

	this.volgendeButton 		= volgendeButton;

	/***********************************************************
							 Update
	***********************************************************/
	
	model.addObserver( this );

	this.update = function( args ){

		if( args == 'manCheck' ){
			displayManCheckQuestions();
			container.show();
		}

		if( args == 'manCheckDone' ){
			container.hide();
		}
	}

	container.hide();
}