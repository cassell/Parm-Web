
(function($, window, document) {

	$(function() {
		
		var Parm = Ember.Application.create({
			rootElement: '#parm-body',
			LOG_TRANSITIONS: true
		});
		
		Parm.Model =  Ember.Object.extend();
		
		Parm.Database = Parm.Model.extend({
			databaseName: null
		});
		
		Parm.DatabaseTable = Parm.Model.extend({
			tableName: null,
			database: new Parm.Database()
		});
		
//		Parm.getAPIUrl = function(url)
//		{
//			//console.log(window.location.href.replace(window.location.hash,""));
//			
//			//return window.location.href.replace(window.location.hash,"").replace("index.php","") + url.substring(1);
//		};
		
		Parm.ajax = function(api,options)
		{
			options.data = options.data || {};
			options.data.api = api;
			
			$.ajax("",{
				success : options.success,
				data : options.data,
				dataType: 'json',
				type: 'POST'
			});
			
			/*
			$.ajax(SQLicious.getAPIUrl(options.url),{
				success : options.success,
				data : options.data,
				dataType: options.dataType
			});
			*/
		}
		
		Parm.Database.reopenClass({
			
			findAll: function()
			{
				var dbs = new Array()
				
				$.each(config.db,function(index,db)
				{
					dbs.push(Parm.Database.create({
						'databaseName': db.databaseName
					}));
				});
					
				return dbs;
			},
			
			find: function(databaseName)
			{
				var database;
				
				$.each(config.db,function(index,db)
				{
					if(db.databaseName == databaseName)
					{
						database = Parm.Database.create({
							'databaseName': db.databaseName
						});
					}
				});
				
				return database;
			}
		});
		
		
		Parm.Router.map(function() {
			
//			this.route('generate', {
//				path: '/generate'
//			});
			
			this.route('database', {
				path: '/database/:databaseName'
			});
			
//			this.route('databaseGenerate', {
//				path: '/database/:databaseName/generate'
//			});
//			
//			this.route('table', {
//				path: '/database/:databaseName/table/:tableName'
//			});
//			
//			this.route('objectCreation', {
//				path: '/database/:databaseName/table/:tableName/objectCreation'
//			});
//			
//			this.route('structure', {
//				path: '/database/:databaseName/table/:tableName/structure'
//			});
//			
//			this.route('extendedStub', {
//				path: '/database/:databaseName/table/:tableName/extendedStub'
//			});
//			
//			this.route('api', {
//				path: '/database/:databaseName/table/:tableName/api'
//			});
			
		});
		
		// dashboard (index)
		Parm.IndexController = Ember.Controller.extend();
		Parm.IndexView = Ember.View.extend();
		Parm.IndexRoute = Ember.Route.extend({
			setupController: function(controller) {
				//controller.set('dbs',Parm.Database.findAll());
			},
			activate: function()
			{
				Parm.ajax('databases',{ 
					success : function(resp)
					{
						
					}
				});
			}
		});
		
		// database page is a list of tables
		Parm.DatabaseView = Ember.View.extend({
			
			keyUp: function(event){
				
				var search = this.$('input').val();

				this.$('#list-of-tables li').each(function(index,item)
				{
					var li = $(item);
					
					search == "" || li.text().toUpperCase().indexOf(search.toUpperCase()) >= 0 ? li.show() : li.hide();

				});
			}
		});
		
		Parm.DatabaseController = Ember.ObjectController.extend({});
		Parm.DatabaseRoute = Ember.Route.extend({
			
			setupController: function()
			{
				this.databaseTablesController = this.controllerFor('databaseTables');
				this.databaseTablesController.set('content',[]);
			},
			
			activate: function()
			{
//				Parm.ajax({ 
//					url : '/api/tables/list.php',
//					data : {
//						'database' : this.context.databaseName
//						},
//					success : function(resp)
//					{
//						this.databaseTablesController.set('database',SQLicious.Database.find(resp.databaseName));
//						this.databaseTablesController.set('content',resp.tables);
//					}.bind(this)
//				});
			},
			
			model: function(params)
			{
				return Parm.Database.find(params.databaseName);
			},
			
			serialize: function(model,params)
			{
				if(model)
				{
					return { databaseName: model.databaseName };
				}
				else
				{
					return {};
				}
				
			}
		});
		
		// sub-template controller and view for database page
		Parm.DatabaseTablesView = Ember.View.extend();
		Parm.DatabaseTablesController = Ember.ArrayController.extend();
		
		Parm.GenerateView = Ember.View.extend({
			
			didInsertElement: function()
			{
				this.$('.modal').modal();
			}
			
		});
		
//		Parm.GenerateRoute = Ember.Route.extend({
//			
//			activate: function()
//			{
////				SQLicious.ajax({ 
////					url : '/api/generator/generate.php',
////					success : function(resp)
////					{
////						if(resp.errors != null && resp.errors.length > 0)
////						{
////							alert(resp.errors);
////						}
////						
////						window.location.hash = '#';
////						window.location.reload(false);
////						
////					}.bind(this)
////				});
//			}
//		});
//	
//		Parm.DatabaseGenerateView = Ember.View.extend({
//			
//			didInsertElement: function()
//			{
//				this.$('.modal').modal();
//			}
//			
//		});
//		
//		Parm.DatabaseGenerateRoute = Ember.Route.extend({
//			
//			activate: function()
//			{
////				Parm.ajax({ 
////					url : '/api/generator/generate.php',
////					data : { 'database' : this.context.databaseName },
////					success : function(resp)
////					{
////						if(resp.errors != null && resp.errors.length > 0)
////						{
////							alert(resp.errors);
////							window.location.hash = '#';
////							window.location.reload(false);
////						}
////						else
////						{
////							window.location.hash = '#/database/' + resp.databaseName + '/';
////							window.location.reload(false);
////						}
////					}.bind(this)
////				});
//			},
//			
//			model: function(params)
//			{
//				return Parm.Database.find(params.databaseName);
//			},
//			
//			serialize: function(model,params)
//			{
//				if(model)
//				{
//					return { databaseName: model.databaseName };
//				}
//				else
//				{
//					return {};
//				}
//			}
//			
//		});
		
//		Parm.TableView = Ember.View.extend();
//		Parm.TableController = Ember.ObjectController.extend({});
//		Parm.TableRoute = Ember.Route.extend({
//			
//			setupController: function(controller) {
//				controller.set('database',Parm.Database.find(this.context.databaseName));
//			},
//			
//			model: function(params)
//			{
//				return Parm.DatabaseTable.create(
//				{
//					tableName : params.tableName,
//					database : Parm.Database.find(params.databaseName),
//					databaseName: params.databaseName
//				});
//				
//			},
//			
//			serialize: function(model,params)
//			{
//				if(model)
//				{
//					return { databaseName: model.databaseName, tableName : model.tableName };
//				}
//				else
//				{
//					return {};
//				}
//			}
//			
//		});
//		
//		Parm.ObjectCreationView = Ember.View.extend();
//		Parm.ObjectCreationController = Ember.ObjectController.extend({});
//		Parm.ObjectCreationRoute = Ember.Route.extend({
//			
//			templateName: 'objectCreation',
//			
//			setupController: function(controller) {
//				controller.set('database',Parm.Database.find(this.context.databaseName));
//				controller.set('table',this.model({ 'databaseName':this.context.databaseName,'tableName':this.context.tableName }));
//			},
//			
//			model: function(params)
//			{
//				return Parm.DatabaseTable.create(
//				{
//					tableName : params.tableName,
//					database : Parm.Database.find(params.databaseName),
//					databaseName: params.databaseName
//				});
//				
//			},
//			
//			serialize: function(model,params)
//			{
//				return { databaseName: model.databaseName, tableName : model.tableName };
//			},
//			
//			activate: function()
//			{
////				Parm.ajax({ 
////					url : '/api/table/object_creation.php',
////					data : {
////						'database' : this.context.databaseName, 
////						'table' : this.context.tableName
////						},
////					success : function(resp)
////					{
////						this.controller.set('responseTemplate',resp.code);
////					}.bind(this)
////				});
//			}
//			
//		});
//		
//		Parm.ExtendedStubView = Ember.View.extend();
//		Parm.ExtendedStubController = Ember.ObjectController.extend({});
//		Parm.ExtendedStubRoute = Ember.Route.extend({
//			
//			templateName: 'extendedStub',
//			
//			setupController: function(controller) {
//				controller.set('database',Parm.Database.find(this.context.databaseName));
//				controller.set('table',this.model({
//					'databaseName':this.context.databaseName,
//					'tableName':this.context.tableName
//				}));
//			},
//			
//			model: function(params)
//			{
//				return Parm.DatabaseTable.create(
//				{
//					tableName : params.tableName,
//					database : Parm.Database.find(params.databaseName),
//					databaseName: params.databaseName
//				});
//			},
//			
//			serialize: function(model,params)
//			{
//				return { databaseName: model.databaseName, tableName : model.tableName };
//			},
//			
//			activate: function()
//			{
////				SQLicious.ajax({ 
////					url : '/api/table/extended_stub.php',
////					data : {
////						'database' : this.context.databaseName, 
////						'table' : this.context.tableName
////						},
////					success : function(resp)
////					{
////						this.controller.set('responseTemplate',resp.code);
////					}.bind(this)
////				});
//			}
//			
//		});
//		
//		
//		Parm.StructureView = Ember.View.extend();
//		Parm.StructureController = Ember.ObjectController.extend({});
//		Parm.StructureRoute = Ember.Route.extend({
//			
//			templateName: 'structure',
//			
//			setupController: function(controller) {
//				controller.set('database',SQLicious.Database.find(this.context.databaseName));
//				controller.set('table',this.model({
//					'databaseName':this.context.databaseName,
//					'tableName':this.context.tableName
//					}));
//			},
//			
//			model: function(params)
//			{
//				return SQLicious.DatabaseTable.create(
//				{
//					tableName : params.tableName,
//					database : SQLicious.Database.find(params.databaseName),
//					databaseName: params.databaseName
//				});
//				
//			},
//			
//			serialize: function(model,params)
//			{
//				return { databaseName: model.databaseName, tableName : model.tableName };
//			},
//			
//			activate: function()
//			{
//				SQLicious.ajax({ 
//					url : '/api/table/table_structure.php',
//					data : {
//						'database' : this.context.databaseName, 
//						'table' : this.context.tableName
//						},
//					success : function(resp)
//					{
//						this.controller.set('responseTemplate',resp.html);
//					}.bind(this)
//				});
//			}
//			
//		});
		
	});

}(window.jQuery, window, document));

// drop a {{debug}} in your template and get a nice output to your console
//Handlebars.registerHelper("debug", function(optionalValue) {console.log("Current Context");console.log("====================");console.log(this);if (optionalValue) {console.log("Value");console.log("====================");console.log(optionalValue);}});