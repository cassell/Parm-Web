
(function($, window, document) {

	$(function() {
		
		var Parm = Ember.Application.create({
			rootElement: '#parm-body',
			LOG_TRANSITIONS: true
		});
		
		Parm.Router.map(function() {
			
			this.route('database', {
				path: '/database/:databaseName'
			});
			
			this.route('databaseGenerate', {
				path: '/database/:databaseName/generate'
			});
			
		});
		
		Parm.getAjaxData = function(api,params)
		{
			var data = params || {};
			data.api = api;
			
			return {
				data : data,
				dataType: 'json',
				type: 'POST'
			};
		};
		
		Parm.IndexRoute = Ember.Route.extend({
			
			model: function() {
				
				return Ember.$.ajax("",Parm.getAjaxData('databases')).then(function(data) {
					
					return data;
					
				});
			}
			
		});
		
		Parm.DatabaseController = Ember.ObjectController.extend({
			databaseName: "",
			tables: []
		});
		
		Parm.DatabaseRoute = Ember.Route.extend({
			
//			setupController: function(controller, post) {
//				
//				this._super(controller, post);
////				this.controller = controller;
////				this.model({"fuck":"this"});
//				//this.controllerFor('posts').set('currentPost', post);
//			},
			
			model: function(params) {
				
				return Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : params.databaseName })).then(function(data) {
					
					var model = {};
					model.databaseName = params.databaseName;
					model.tables = data.tables;
					return model;
					
				});
				
			},
			
			afterModel: function(model)
			{
				this.controllerFor('database').set("databaseName",model.databaseName);
				this.controllerFor('database').set("tables",model.tables);
			},
			
			serialize: function(model) {
				
				return { "databaseName" : model.databaseName };
			}
			
		});
		
		
		
		
	});

}(window.jQuery, window, document));