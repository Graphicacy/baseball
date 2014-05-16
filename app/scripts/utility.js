// Global Utilities... Just putting them somewhere
U = Utility = {
	identity: function (a) { return a; },
	noop: function () {/* Do nothing */},
	log: console.log.bind(console),
	logger: function (message) {
		return console.log.bind(console, message)
	},
	sum: function (a, b) { return a + b; },

	filled_array: function (length, value) {
		var arr = [];

		arr.length = length;

		return _.map(arr, function () {
			return value;
		});
	},

	mean: function (arr) {
		return _.reduce(arr, U.sum) / arr.length;
	},
	
	/* 
	 * Factory for "pluck" functions
	 * Use:
	 * var pluck = plucker('a', Number, 0)
	 * pluck({ a: 6 }) ==> 6
	 * 
	 */
	plucker: function (attribute, parser, otherwise) { 
		parser = parser || this.identity;

		return function (obj) {
			var value = obj[attribute];

			if ( ! value ) return otherwise;

			return parser(value);
		}
	},

	/*
	 * Just throw an error
	 */
	err: function (message) {
		throw new Error(message);
	},

	baseball: {
		ALL: {
			/*
			 * parse the date from ALL baseball data
			 * "19000101" -> new Date(1900, 1, 1);
			 *
			 * For reference, Date constructor args:
			 * new Date(year, month, day, hours, minutes, seconds, milliseconds)
			 */
			parseDate: function (dateStr) {
				var matchDate = /(\d{4})(\d{2})(\d{2})/,
					parts = dateStr.match(matchDate),
					year = parts[1],
					month = parts[2],
					day = parts[3];

				return new Date(year, month, day);
			},

			didWeWin: function (us, game) {

				var p = parseInt,
					home = game['home.team'],
					visit = game['visiting.team'];

				if (us != home && us != visit) U.err('No team w/ that name');

				var weAreHome = game['home.team'] == us,
					homeScore = game['home.team.score'],
					visitScore = game['visiting.team.score'],
					homeWon = p(homeScore) > p(visitScore),
					homeAndWon = weAreHome && homeWon,
					awayAndWon = (! weAreHome ) && (! homeWon );

				return homeAndWon || awayAndWon;
			},

			dateCompare: function (a, b) {
				return a.date.localeCompare(b.date);
			}, 

			// Return an array of length games.length 
			// Where each point represents the
			// running average for the W/L record
			// of team focus in the set of games
			calculateRunningAverage: function (games, focus) {
				var avgs = [],
					chunkSize = Math.floor(games.length / 10),
					// start'm at 50%
					chunk = U.filled_array(chunkSize, 0.5),
					mean = U.mean,
					win = U.baseball.ALL.didWeWin;

				_.each(games, function (g, i) {
					// Dispose of the old, and insert the new
					var won = win(focus, g)
					chunk.shift();
					chunk.push(won ? 1 : 0);

					avgs.push(mean(chunk));
				});

				return avgs;
			},

			logGame: function (game) {
				var facade = {
						home: game['home.team'],
						homeScore: game['home.team.score'],
						away: game['visiting.team'],
						awayScore: game['visiting.team.score'],
						date: game['date']
					},
					template = 'Baseball <%= date %>: H <%= home %> (<%= homeScore %>) v. A <%= away %> (<%= awayScore %>) ==>',
					msg = _.template(template, facade);

				U._ = game;
				U.log(msg, game);
				// U.log('A game between ', game['home.team'], ' and ', game['visiting.team'], ':', game)
			}
		}
	}

};