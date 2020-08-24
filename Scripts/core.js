//core.js
var core = {
	getElementById : function(id) {
		if (core.notNullOrEmpty(id)) {
			//ensure first character is not a #
			//Can we modify a string by modifying the character array index?
			if (id[0] === "#") {
				id[0] = "";
			} 
			var element = document.getElementById(id);
			return element;
		}
		
	},
	notNull : function(obj) {
		return typeof(obj) !== 'undefined' && obj;
	},
	notNullOrEmpty : function(obj) {
		//good for strings and arrays.
		return core.notNull(obj) && obj.length > 0;
	},
	isIterable: function (obj) {
		// checks for null and undefined
		if (obj == null) {
			return false;
		}
		return typeof obj[Symbol.iterator] === 'function';
    },
	iterateArray : function(arr, func, additional) {
		//should probably check this is an actual array first...
		if(!core.isIterable(arr)) {
			console.error("This method only accepts an array as the first parameter");
			return;
		}
		if (!core.isFunction(func)) 
		{
			console.error("This method only accepts a function as the second parameter");
			return;
		}
		for(var i = 0; i < arr.length; i++) {
			func(arr[i], additional);
		}
	},
	isFunction:function(func) {
		return typeof(func) === 'function';
	},
};
