
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
					
					var config = Parm.ParmConfig.create();
					
					config.databases = Ember.A();
					
					$.each(data.databases,function(index,db)
					{
						config.databases.push(Parm.Database.create({'databaseName' : db.databaseName }));
					})
					
					config.databases.arrayContentDidChange();
					
					return config;
				});
			}
		});
		
		Parm.Database = Parm.Model.extend();
		Parm.Database.reopenClass(
		{
			getTables: function(database)
			{
				return Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : database.databaseName })).then(function(data) {
					
					$.each(data.tables,function(index,table) {
						
						database.tables.push(Parm.Table.create(table));
					});
					
					database.tables.arrayContentDidChange();
				});
			}
			
		});
		
		Parm.Table = Parm.Model.extend();
		
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
			
			model: function(params) {
				
				var model =  Parm.Database.create({'databaseName' : params.databaseName, 'tables' : Ember.A()});
				Parm.Database.getTables(model);
				setTimeout(function(){ console.log(model.tables); },3000);
				
				//model.tables = Parm.Database.getTables(model.databaseName);
//				console.log(model.tables);
				
				return model;
				
				
//				return Ember.$.ajax("",Parm.getAjaxData('tables',{'database' : params.databaseName })).then(function(data) {
//					return Parm.Database.create({'databaseName' : params.databaseName , 'tables' : data.tables });
//				});
			}
			
			
		});
		
		
		
	});

}(window.jQuery, window, document));