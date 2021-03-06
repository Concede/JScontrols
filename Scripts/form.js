//form.js


var form = function (config) {
	this.config = config;
	this.create= formInternal.create;
	this.setConfig = formInternal.setConfig;
	this.getConfig = formInternal.getConfig;
	this.getData = formInternal.getData;
	

	this.create();

}

var formInternal = {
	columnClasses: [
		"one-column",
		"two-column",
		"three-column",
	],
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
		//apply my css class.
		ele.classList.add("jsc-form");
		if (core.notNull(formModel.config.columns)) {
			ele.classList.add(formInternal.columnClasses[formModel.config.columns - 1]);
		}
		else {
			ele.classList.add(formInternal.columnClasses[0]);
		}
		//begin generation...
		if(core.notNullOrEmpty(formModel.config.fields)) {
			core.iterateArray(formModel.config.fields, formInternal.generateField, ele);
		}
		if (core.notNull(formModel.config.showSubmitButton)) {
			formInternal.generateSubmitButton(formModel.config, ele);
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

			//then we can check a type was set..
			if (core.notNullOrEmpty(config.type)) {
				//then generate the input.
				var input = document.createElement("input");
				if (core.notNullOrEmpty(config.type)) input.type = config.type;
				if (core.notNullOrEmpty(config.id)) input.id = config.id;
				if (core.notNullOrEmpty(config.name)) input.name = config.name;
				span.appendChild(input);
			}
			ele.appendChild(span);
		}
	},
	generateSubmitButton(config, ele) {
		
		if (core.notNull(config.showSubmitButton) && config.showSubmitButton) {
			var btn = document.createElement("button");
			if (core.notNullOrEmpty(config.submitText)) {
				btn.innerText = config.submitText;
			} else {
				btn.innerText = "Unspecified";
			}
			if (core.notNull(config.submitAction) && core.isFunction(config.submitAction)) {
				btn.addEventListener('click', function () { config.submitAction(); });
            }
			
			ele.appendChild(btn);
		}
    },
	getData: function () {
		//create a fancy object for the data to be presented back to the consumer.
		if (core.notNull(this.config)) {
			if (core.notNull(this.config.id)) {
				var ele = core.getElementById(this.config.id);
				var inputs = ele.getElementsByTagName("input");
				var dataObject = {};
				core.iterateArray(inputs, formInternal.mapInputToObject, dataObject);
				return dataObject;
            } 
		}
	},
	mapInputToObject: function (input, dataObj) {
		var name = input.name;
		var value = input.value;
		dataObj[name] = value;
    },
};


