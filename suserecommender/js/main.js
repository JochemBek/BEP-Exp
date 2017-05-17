$(function(){

	var raschRecommenderModel 			= new RaschRecommenderModel();
	var facebookApi 					= new FacebookApi( raschRecommenderModel );

	var headerView 						= new HeaderView( raschRecommenderModel, $( "#boxHeader" ) );
	var headerController 				= new HeaderController( raschRecommenderModel, informedConsentView );

	var informedConsentView 			= new InformedConsentView( raschRecommenderModel, $( "#informedConsent" ), facebookApi );
	var informedConsentController 		= new InformedConsentController( raschRecommenderModel, informedConsentView, facebookApi );

	var filterMeasureView				= new FilterMeasureView( raschRecommenderModel, $( "#filterMeasure") );
	var filterMeasureController			= new FilterMeasureController( raschRecommenderModel, filterMeasureView );

	var measureAbilityView				= new MeasureAbilityView( raschRecommenderModel, $( "#measureAbility" ) );
	var measureAbilityController		= new MeasureAbilityController( raschRecommenderModel, measureAbilityView );

	var informationView					= new InformationView( raschRecommenderModel, $( "#information" ) );
	var informationController 			= new InformationController( raschRecommenderModel, informationView );

	var recommendationView				= new RecommendationView( raschRecommenderModel, $( "#recommendation" ) );
	var recommendationController 		= new RecommendationController( raschRecommenderModel, recommendationView );

	var satisfactionQuestionsView		= new SatisfactionQuestionsView( raschRecommenderModel, $( "#satisfactionQuestions" ) );
	var satisfactionQuestionsController = new SatisfactionQuestionsController ( raschRecommenderModel, satisfactionQuestionsView );

	var demographicsView				= new DemographicsView( raschRecommenderModel, $( "#demographics" ) );
	var demographicsController 			= new DemographicsController( raschRecommenderModel, demographicsView );

	var dataConsentView					= new DataConsentView( raschRecommenderModel, $( "#dataConsent" ) );
	var dataConsentController			= new DataConsentController( raschRecommenderModel, dataConsentView );

})