//form.js


var form = function (config) {
	this.config = config;
	this.create= formInternal.create;
	this.setConfig = formInternal.setConfig;
	this.getConfig = formInternal.getConfig;
	

	this.create();

}

var formInternal = {
	create : function() {
		
		//check config exists.
		if (!core.notNull(this.config)) 
		{
			console.error("Cannot create a form because the config does not exist. Please specify a config. An incomplete form reference has been returned.");
			return;
		}
		
		//get the element reference.
		var ele = core.getElementById(this.config.id);
		//check element exists.
		if(!core.notNull(ele)) {
			console.error("Cannot create a form on a non existent element, please specify a correct element id. An incomplete form reference has been returned.");
			return;
		}
		
		//then we can attempt to generate a form based on the config.
		formInternal.generateForm(this);
	},
	setConfig : function(config) {
		this.config=config;
	},
	getConfig : function() {
		if(core.notNullOrEmpty(this.config)) {
			return this.config;
		}
		return formInternal.newConfig();
	},
	newConfig : function() {
		return {
			id : "",
			fields : [],
		};
	},
	generateForm: function(formModel) {
		//this method should only ever be called from the form object create method, therefore we've already checked for element existence.
		var ele = core.getElementById(formModel.config.id);
		//fully reset the element.
		ele.innerHTML = "";
		//begin generation...
		if(core.notNullOrEmpty(formModel.config.fields)) {
			core.iterateArray(formModel.config.fields, formInternal.generateField, ele);
		}
	},
	generateField: function(config, ele) {
		if(core.notNull(ele)) 
		{
			//here we can now generate each field.
			//put it into a span so it's easily distinguishable.
			var span = document.createElement("span");
			if (core.notNullOrEmpty(config.label)) {
				//first off we can generate the label.
				var label = document.createElement("label");
				label.innerHTML = config.label;
				span.appendChild(label);
			}
			
			if(core.notNullOrEmpty(config.type)) {
				var input = document.createElement("input");
				input.type = config.type;
				span.appendChild(input);
			}
			ele.appendChild(span);
		}
		
		
	},
};


