$(function(){

	var raschRecommenderModel 			= new RaschRecommenderModel();

	var headerView 						= new HeaderView( raschRecommenderModel, $( "#boxHeader" ) );
	var headerController 				= new HeaderController( raschRecommenderModel, informedConsentView );
	
	var descriptionView 						= new DescriptionView( raschRecommenderModel, $( "#descriptionBox" ) );
	var descriptionController 				= new DescriptionController( raschRecommenderModel, descriptionView );

	var informedConsentView 			= new InformedConsentView( raschRecommenderModel, $( "#informedConsent" ) );
	var informedConsentController 		= new InformedConsentController( raschRecommenderModel, informedConsentView );

	var filterMeasureView				= new FilterMeasureView( raschRecommenderModel, $( "#filterMeasure") );
	var filterMeasureController			= new FilterMeasureController( raschRecommenderModel, filterMeasureView );

	var introProbingView				= new IntroProbingView( raschRecommenderModel, $( "#introduceProbes" ) );
	var introProbingController		= new IntroProbingController( raschRecommenderModel, introProbingView );

	var measureAbilityView				= new MeasureAbilityView( raschRecommenderModel, $( "#measureAbility" ) );
	var measureAbilityController		= new MeasureAbilityController( raschRecommenderModel, measureAbilityView );

	var informationView					= new InformationView( raschRecommenderModel, $( "#information" ) );
	var informationController 			= new InformationController( raschRecommenderModel, informationView );

	var recommendationView				= new RecommendationView( raschRecommenderModel, $( "#recommendation" ) );
	var recommendationController 		= new RecommendationController( raschRecommenderModel, recommendationView );

	var satisfactionQuestionsView		= new SatisfactionQuestionsView( raschRecommenderModel, $( "#satisfactionQuestions" ) );
	var satisfactionQuestionsController = new SatisfactionQuestionsController ( raschRecommenderModel, satisfactionQuestionsView );
	
	var extraQuestionsView 					= new ExtraQuestionsView( raschRecommenderModel, $("#extraQuestions") );
	var extraQuestionsController 				= new ExtraQuestionsController (raschRecommenderModel, extraQuestionsView );
	
	var manCheckView 								= new ManCheckView( raschRecommenderModel, $("#manCheck") );
	var manCheckController 							= new ManCheckController(raschRecommenderModel, manCheckView );

	var demographicsView				= new DemographicsView( raschRecommenderModel, $( "#demographics" ) );
	var demographicsController 			= new DemographicsController( raschRecommenderModel, demographicsView );

})
