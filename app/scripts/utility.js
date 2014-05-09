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
	plucker: function (attribute, parser, otherwise) { 
		parser = parser || identity;

		return function (obj) {
			var value = obj[attribute];

			if ( ! value ) return otherwise;

			return parser(value);
		}
	},

	/*
	 * parse the date from ALL baseball data
	 * "19000101" -> new Date(1900, 1, 1);
	 *
	 * For reference, Date constructor args:
	 * new Date(year, month, day, hours, minutes, seconds, milliseconds)
	 */
	matchALLDate: /(\d{4})(\d{2})(\d{2})/,
	parseALLDate: function (dateStr) {
		var parts = dateStr.match(U.matchALLDate),
			year = parts[1],
			month = parts[2],
			day = parts[3];

		return new Date(year, month, day);
	}

};