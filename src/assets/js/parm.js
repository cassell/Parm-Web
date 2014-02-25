

// drop a {{debug}} in your template and get a nice output to your console
Handlebars.registerHelper("debug", function(optionalValue) {console.log("Current Context");console.log("====================");console.log(this);if (optionalValue) {console.log("Value");console.log("====================");console.log(optionalValue);}});

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
			
			this.route('table', {
				path: '/database/:databaseName/table/:tableName'
			});
			
			this.route('creation', {
					path: '/database/:databaseName/table/:tableName/creation'
			});

			this.route('structure', {
					path: '/database/:databaseName/table/:tableName/structure'
			});

			this.route('extended', {
					path: '/database/:databaseName/table/:tableName/extended'
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
		
		Parm.DatabaseGenerateController = Ember.ObjectController.extend({
			databaseName: ""
		});
		
		Parm.DatabaseGenerateRoute = Ember.Route.extend({
			
			model: function(params) {
				
				return Ember.$.ajax("",Parm.getAjaxData('generate',{'database' : params.databaseName })).then(function(data) {
					
					var model = {};
					model.databaseName = params.databaseName;
					return model;
					
				});
				
			},
			
			afterModel: function(model)
			{
				setTimeout(function(){
					this.transitionTo('database',model.databaseName)
				}.bind(this),1000);
			},
			
			serialize: function(model) {
				
				return { "databaseName" : model.databaseName };
			}
			
		});
		
		
		Parm.TableController = Ember.ObjectController.extend({
			databaseName: "",
			tableName: "",
			info : {}
		});
		
		
		Parm.TableRoute = Ember.Route.extend({
			
			model: function(params) {
				
				return Ember.$.ajax("",Parm.getAjaxData('table',{'database' : params.databaseName,'table' : params.tableName })).then(function(data) {
					
					var model = {};
					model.databaseName = data.databaseName;
					model.tableName = data.tableName;
					model.info = data.info;
					return model;
					
				});
				
			},
			
			afterModel: function(model)
			{
				this.controllerFor('table').set("databaseName",model.databaseName);
				this.controllerFor('table').set("tableName",model.tableName);
				this.controllerFor('table').set("info",model.info);
			},
			
			serialize: function(model) {
				
				return { "databaseName" : model.databaseName, "tableName" : model.tableName};
			}
			
		});

		Parm.CreationController = Ember.ObjectController.extend({
			databaseName: "",
			tableName: "",
			info: {}
		});

		Parm.CreationRoute = Ember.Route.extend({
			
			model: function(params) {

				return Ember.$.ajax("",Parm.getAjaxData('table',{'database' : params.databaseName,'table' : params.tableName })).then(function(data) {

					var model = {};
					model.databaseName = data.databaseName;
					model.tableName = data.tableName;
					model.info = data.info;
					return model;
				});
				
			},
			
			afterModel: function(model)
			{
				if(model.info != null)
				{
					this.controllerFor('creation').set("databaseName",model.databaseName);
					this.controllerFor('creation').set("tableName",model.tableName);
					this.controllerFor('creation').set("info",model.info);
				}
				else
				{
					return this.model(model).then(function(model){

						this.controllerFor('creation').set("databaseName",model.databaseName);
						this.controllerFor('creation').set("tableName",model.tableName);
						this.controllerFor('creation').set("info",model.info);

					}.bind(this));
				}

			},
			
			serialize: function(model) {

				return { "databaseName" : model.databaseName, "tableName" : model.tableName};
			}
			
		});

		Parm.StructureController = Ember.ObjectController.extend({
			databaseName: "",
			tableName: "",
			info: {}
		});

		Parm.StructureRoute = Ember.Route.extend({

			model: function(params) {

				return Ember.$.ajax("",Parm.getAjaxData('table',{'database' : params.databaseName,'table' : params.tableName })).then(function(data) {

					var model = {};
					model.databaseName = data.databaseName;
					model.tableName = data.tableName;
					model.info = data.info;
					return model;
				});

			},

			afterModel: function(model)
			{
				if(model.info != null)
				{
					this.controllerFor('structure').set("databaseName",model.databaseName);
					this.controllerFor('structure').set("tableName",model.tableName);
					this.controllerFor('structure').set("info",model.info);
				}
				else
				{
					return this.model(model).then(function(model){

						this.controllerFor('structure').set("databaseName",model.databaseName);
						this.controllerFor('structure').set("tableName",model.tableName);
						this.controllerFor('structure').set("info",model.info);

					}.bind(this));
				}

			},

			serialize: function(model) {

				return { "databaseName" : model.databaseName, "tableName" : model.tableName};
			}

		});
		
//		Parm.StructureRoute = Ember.Route.extend({
//
//			model: function(params) {
//
//				return Ember.$.ajax("",Parm.getAjaxData('table',{'database' : params.databaseName,'table' : params.tableName })).then(function(data) {
//
//					var model = {};
//					model.databaseName = data.databaseName;
//					model.tableName = data.tableName;
//					model.info = data.info;
//					return model;
//
//				});
//
//			},
//
//			afterModel: function(model)
//			{
//				this.controllerFor('table').set("databaseName",model.databaseName);
//				this.controllerFor('table').set("tableName",model.tableName);
//			},
//
//			serialize: function(model) {
//
//				return { "databaseName" : model.databaseName, "tableName" : model.tableName };
//			}
//
//		});
//
//		Parm.ExtendedRoute = Ember.Route.extend({
//
//			model: function(params) {
//
//				return Ember.$.ajax("",Parm.getAjaxData('table',{'database' : params.databaseName,'table' : params.tableName })).then(function(data) {
//
//					var model = {};
//					model.databaseName = data.databaseName;
//					model.tableName = data.tableName;
//					return model;
//
//				});
//
//			},
//
//			afterModel: function(model)
//			{
//				this.controllerFor('table').set("databaseName",model.databaseName);
//				this.controllerFor('table').set("tableName",model.tableName);
//			},
//
//			serialize: function(model) {
//
//				return { "databaseName" : model.databaseName, "tableName" : model.tableName };
//			}
//
//		});
		
		
		
		
		
		
		
	});

}(window.jQuery, window, document));