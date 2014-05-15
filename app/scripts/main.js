/* Adapted from crossfilter homepage */
// Bad global setup...
var last100 = {
	dateRange: [new Date(2013, 9, 22), new Date(2013, 9, 30)],
	filePath: 'data/ALL_last_100.json'
};

var last1857 = {
	dateRange: [new Date(2013, 5, 15), new Date(2013, 9, 29)],
	filePath: 'data/ALL_last_1857.json'
};

var last3715 = {
	dateRange: [new Date(2012, 6, 29), new Date(2013, 9, 29)],
	filePath: 'data/ALL_last_3715.json'
};

/* Don't use, too big! breaks everything */
var ALL = {
	dateRange: [new Date(1900, 04, 20), new Date(2013, 9, 29)],
	filePath: 'data/ALL.json'
}

var settings = last3715;

d3.json(settings.filePath, function(error, games) {
	var formatNumber = d3.format(",d"),
		parseDate = U.baseball.ALL.parseDate;
		pluckVisitingTeamScore = U.plucker('visiting.team.score', Number),
		pluckHomeTeamScore = U.plucker('home.team.score', Number),
		pluckDate = U.plucker('jsDate'),
		pluckHomeTeam = U.plucker('home.team'),
		pluckVisitingTeam = U.plucker('visiting.team');

	// BEGIN DATA PREPROCESSING
	// TODO: put this somewhere better
	var teams = [];

	_.each(games, function (game, i) {
		teams.push(pluckHomeTeam(game));
		teams.push(pluckVisitingTeam(game));

		// add an index
		game.index = i;

		// Translate the date to something nice
		game.jsDate = new Date(parseDate(game.date));
	});

	teams = _.unique(teams);
	// END DATA PREPROCESSING

	var currentFocus; 

	// NO VAR, GLOBALS FOR TESTING
		baseball = crossfilter(games),
		all = baseball.groupAll(),
		dimVisitingTeamScore = baseball.dimension(pluckVisitingTeamScore),
		grpVisitingTeamScore = dimVisitingTeamScore.group(U.identity),

		dimHomeTeamScore = baseball.dimension(pluckHomeTeamScore),
		grpHomeTeamScore = dimHomeTeamScore.group(U.identity),

		dimDate = baseball.dimension(pluckDate),
		grpDate = dimDate.group(U.identity),
		grpDateByMonth = dimDate.group(d3.time.month)

		dimTeamNames = baseball.dimension(function (d) {
			return pluckHomeTeam(d) + '|' + pluckVisitingTeam(d);
		}),
		chunkTime = d3.time.day,
		nestTimeChunks = d3.nest()
			.key(function (d) {
				chunkTime(d.jsDate);
			});

	$.on('team.select', function (evt, payload) {
		currentFocus = payload.chosen;

		dimTeamNames.filter(function (d) {
			return d.indexOf(currentFocus) != -1;
		});

		_.each(tickChartData, function (d) {
			d.focus(currentFocus);
		});

		$.trigger('dirty.view');
	});

	// Setup re-render listeners
	$.on('dirty.view', function () {
		tick.each(render);
		list.each(render);
		d3.select("#active").text(formatNumber(all.value()));
	});

	var tickChartData = [
		tickChart()
			.fnGames(function () {
				return dimDate.top(Infinity);
			})
	];

    // Render list
	var list = d3.selectAll(".list")
      .data([gameList]);

    // Render tick
    var tick = d3.selectAll('.tick')
    	.data(tickChartData);

	// Render the total.
	d3.selectAll("#total")
      .text(formatNumber(baseball.size()));

	// Renders the specified chart or list.
	function render(method) {
		d3.select(this).call(method);
	}

	initSelect(teams);

	// Select a team to begin!
	$.trigger('team.select', { chosen: 'ANA' });
});