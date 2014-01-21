
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
			
			setupController: function(controller, post) {
				
				this._super(controller, post);
//				this.controller = controller;
//				this.model({"fuck":"this"});
				//this.controllerFor('posts').set('currentPost', post);
			},
			
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
		
//		Parm.Model =  Ember.Object.extend();

//		Parm.StationListController = Ember.ObjectController.extend({
		
//		Parm.ParmConfig =  Ember.Object.extend();
//		Parm.ParmConfig.reopenClass(
//		{
//			getConfig: function()
//			{
//				return Ember.$.ajax("",Parm.getAjaxData('databases')).then(function(data) {
//					
//					var config = Parm.ParmConfig.create();
//					
//					config.databases = Ember.A();
//					
//					$.each(data.databases,function(index,db)
//					{
//						config.databases.push(Parm.Database.create({'databaseName' : db.databaseName }));
//					})
//					
//					config.databases.arrayContentDidChange();
//					
//					return config;
//				});
//			}
//		});
		
		
		
//		Parm.Db = Parm.Model.extend();
//		Parm.Db.reopenClass(
//		{
//			getTables: function(database)
//			{
//				return Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : database.databaseName })).then(function(data) {
//					
//					$.each(data.tables,function(index,table) {
//						
//						database.tables.push(table);
//					});
//					
//					database.tables.arrayContentDidChange();
//				});
//			}
//			
//		});
//		
////		Parm.Table = Parm.Model.extend();
//		
//		
//		
//		
//		
//		Parm.DatabaseRoute = Ember.Route.extend({
//			
//			model: function(params) {
//				
//				var model =  Parm.Db.create({'databaseName' : params.databaseName, 'tables' : Ember.A()});
//				Parm.Db.getTables(model);
//				return model;
//			}
//			
//		});
		
		
		
	});

}(window.jQuery, window, document));