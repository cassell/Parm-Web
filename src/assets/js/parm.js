
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
			};
		};
		
		Parm.Model =  Ember.Object.extend();
		
		Parm.ParmConfig = Parm.Model.extend();
		Parm.ParmConfig.reopenClass(
		{
			getConfig: function()
			{
				return Ember.$.ajax("",Parm.getAjaxData('databases')).then(function(data) {
					
					var databases = Ember.A();
					
					$.each(data.databases,function(index,db)
					{
						databases.push(Parm.Database.create({'databaseName' : db.databaseName }));
					})
					
					return databases;
				});
			}
			
		});
		
		
		Parm.Database = Parm.Model.extend();
		
		Parm.Database.reopenClass(
		{
			getTables: function(databaseName)
			{
				var tables = Ember.A();
				
				console.log("Parm.Database:getTables");
				console.log(tables);
				
				Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : databaseName })).then(function(data) {
					
					tables.push({"tableName" : "One"});
					tables.push({"tableName" : "One"});
					tables.push({"tableName" : "One"});
					
					console.log(tables);
//					
//					return [{"tableName" : "One"},{"tableName" : "Two"},{"tableName" : "Three"},{"tableName" : "Four"}];
//					//return data.tables;
				}.bind(tables));
				
//				return Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : databaseName })).then(function(data) {
//					
//					return [{"tableName" : "One"},{"tableName" : "Two"},{"tableName" : "Three"},{"tableName" : "Four"}];
//					//return data.tables;
//				});
				
				return tables;
			}
			
		});
		
		Parm.Router.map(function() {
			
			this.resource('database', {
				path: '/database/:databaseName'
			});
			
		});
		
		Parm.IndexRoute = Ember.Route.extend({
			
			model: function() {
				
				return Parm.ParmConfig.getConfig();
			}
			
		});
		
		
		
		
		
		Parm.DatabaseRoute = Ember.Route.extend({
			
//			beforeModel: function(transition,queryParams) {
//				
//				
//				console.log("DatabaseRoute:beforeModel");
//				console.log(transition);
//				console.log(queryParams);
//			},
			
			
			model: function(params) {
				
				console.log("DatabaseRoute:model");
				
				var model =  Parm.Database.create({'databaseName' : params.databaseName});
				
				model.tables = Parm.Database.getTables(model.databaseName);
				
				return model;
				
				
//				return Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : params.databaseName })).then(function(data) {
//					return Parm.Database.create({'databaseName' : params.databaseName , 'tables' : data.tables });
//				});
			}
			
			
		});
		
		
		
	});

}(window.jQuery, window, document));