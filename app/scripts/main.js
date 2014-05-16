/* Adapted from crossfilter homepage */
// Bad global setup...
var settings = ALL.last3715;

d3.json(settings.filePath, function(error, games) {
	var formatNumber = d3.format(",d"),
		parseDate = U.baseball.ALL.parseDate;
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

		dimDate = baseball.dimension(pluckDate),
		grpDate = dimDate.group(),

		dimTeamNames = baseball.dimension(function (d) {
			return pluckHomeTeam(d) + '|' + pluckVisitingTeam(d);
		});

	function fnGames() {
		return dimDate.top(Infinity);
	}

	$.on('team.select', function (payload) {
		currentFocus = payload.chosen;

		dimTeamNames.filter(function (d) {
			return d.indexOf(currentFocus) != -1;
		});

		// Fngames() must come after the filter happens
		var games = fnGames(),
			data = U.baseball.ALL.calculateRunningAverage(games, currentFocus);

		_.each(chartData, function (d) {
			d.focus(currentFocus)
				.averageData(data)
				.games(games);
		});

		$.trigger('dirty.view');
	});

	// Setup re-render listeners
	$.on('dirty.view', function () {
		tick.each(render);
		list.each(render);
		d3.select("#active").text(formatNumber(all.value()));
	});

	// Renders the specified chart or list.
	function render(method) {
		d3.select(this).call(method);
	}

	$.on('tick.hover', function (hovered) {
		var game = hovered.game,
			index = hovered.index;

		scrollList(game, index);
	});

	var chartData = [
		lineChart(),
		tickChart()
	];

    // Render list
	var list = d3.selectAll(".list")
      .data([gameList]);

    // Render tick
    var tick = d3.selectAll('.tickMark')
    	.data(chartData);

	// Render the total.
	d3.selectAll("#total")
      .text(formatNumber(baseball.size()));

	initSelect(teams);

	// Select a team to begin!
	$.trigger('team.select', { chosen: settings.beginningTeam });
});