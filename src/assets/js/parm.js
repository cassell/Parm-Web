
(function($, window, document) {

	$(function() {
		
		var Parm = Ember.Application.create({
			rootElement: '#parm-body',
			LOG_TRANSITIONS: true
		});
		
		Parm.getAjaxData = function(api,params)
		{
			var data = params || {};
			data.api = api;
			
			return {
				data : data,
				dataType: 'json',
				type: 'POST'
			}
		}
		
		Parm.Model =  Ember.Object.extend();
		
		Parm.Database = Parm.Model.extend();
		
		Parm.Database.reopenClass(
		{
			databaseName: null,
			
			findAll: function()
			{
				return Ember.$.ajax("",Parm.getAjaxData('databases')).then(function(data) {
					
					return data.databases;
					
//					var databases = Ember.A();
//					
//					$.each(data.databases,function(index,db)
//					{
//						databases.push(Parm.Database.create({'databaseName' : db.databaseName }));
//					})
//					
//					return databases;
				});
			}
			
		});
		
		Parm.IndexRoute = Ember.Route.extend({
			
//			setupController: function(controller, model)
//			{
//				this.controller = controller;
//				model = ["One","Two"];
//			},
			
			model: function() {
				
				return Parm.Database.findAll();
			}
		});
		
		Parm.Router.map(function() {
			
			this.resource('database', {
				path: '/database/:databaseName'
			});
			
		});
		
		
		
	});

}(window.jQuery, window, document));

// drop a {{debug}} in your template and get a nice output to your console
//Handlebars.registerHelper("debug", function(optionalValue) {console.log("Current Context");console.log("====================");console.log(this);if (optionalValue) {console.log("Value");console.log("====================");console.log(optionalValue);}});