// Global Utilities... Just putting them somewhere
U = Utility = {
	identity: function (a) { return a; },
	noop: function () {/* Do nothing */},

	/* 
	 * Factory for "pluck" functions
	 * Use:
	 * var pluck = plucker('a', Number, 0)
	 * pluck({ a: 6 }) ==> 6
	 * 
	 */
	plucker: function (attribute, formatter, otherwise) { 
		formatter = formatter || identity;

		return function (obj) {
			var value = obj[attribute];

			if ( ! value ) return otherwise;

			return formatter(value);
		}
	}
};