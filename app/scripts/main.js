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

var settings = last1857;

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

	var currentFocus = 'ANA';

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

	function barcodeGames() {
		dimTeamNames.filter(function (d) {
			return d.indexOf(currentFocus) != -1;
		});

		return dimDate.top(40);
	}

	function barcodeFocus() {
		return currentFocus;
	}

	var barcodeChartData = [
		barcodeChart(barcodeGames, barcodeFocus)
	];

	initSelect(teams);

	$.on('team.select', function (evt, a) { 
		currentFocus = a.chosen;
		view_dirtied();
	});

    // Render list
	var list = d3.selectAll(".list")
      .data([gameList]);

    var barcode = d3.selectAll('.barcode')
    	.data(barcodeChartData);

	// Render the total.
	d3.selectAll("#total")
      .text(formatNumber(baseball.size()));

	// Setup re-render listeners
	$.on('dirty_view', function () {
		barcode.each(render);
		list.each(render);
		d3.select("#active").text(formatNumber(all.value()));
	});

	// Renders the specified chart or list.
	function render(method) {
		d3.select(this).call(method);
	}

	var view_dirtied = $.trigger.bind(null, 'dirty_view');

	view_dirtied();
});