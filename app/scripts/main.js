/* Adapted from crossfilter homepage */
// Bad global setup...
var last100 = {
	dateRange: [new Date(2013, 9, 22), new Date(2013, 9, 30)],
	filePath: 'data/ALL_last_100.json'
};

var settings = last100;

d3.json(settings.filePath, function(error, games) {
	var formatNumber = d3.format(",d"),
		parseDate = U.baseball.ALL.parseDate;
		pluckVisitingTeamScore = U.plucker('visiting.team.score', Number),
		pluckHomeTeamScore = U.plucker('home.team.score', Number),
		pluckDate = U.plucker('date', parseDate, new Date()),
		pluckHomeTeam = U.plucker('home.team'),
		pluckVisitingTeam = U.plucker('visiting.team');
	var teams = [];

	_.each(games, function (game) {
		teams.push(pluckHomeTeam(game));
		teams.push(pluckVisitingTeam(game));
	});

	teams = _.unique(teams);

	var currentFocus = 'CHN';

	// NO VAR, GLOBALS FOR TESTING
		baseball = crossfilter(games),
		all = baseball.groupAll(),
		dimVisitingTeamScore = baseball.dimension(pluckVisitingTeamScore),
		grpVisitingTeamScore = dimVisitingTeamScore.group(U.identity),

		dimHomeTeamScore = baseball.dimension(pluckHomeTeamScore),
		grpHomeTeamScore = dimHomeTeamScore.group(U.identity),

		dimDate = baseball.dimension(pluckDate),
		grpDate = dimDate.group(U.identity),

		dimTeamNames = baseball.dimension(function (d) {
			return pluckHomeTeam(d) + '|' + pluckVisitingTeam(d);
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

	$(document.body).on('team.select', function (b, a) { 
		currentFocus = a.chosen;
		renderAll();
	});

	// Given our array of charts, which we assume are in the same order as the
	// .chart elements in the DOM, bind the charts to the DOM and render them.
	// We also listen to the chart's brush events to update the display.
	var chart = d3.selectAll(".chart")
   //  	.data(chartData)
   //  	.each(function(chart) {
			// // Whenever the brush moves, re-rendering everything. 
   //    		chart.on("brush", renderAll)
   //    			.on("brushend", renderAll);
   //    	});

    // Render list
	var list = d3.selectAll(".list")
      .data([gameList, gameList]);

    var barcode = d3.selectAll('.barcode')
    	.data(barcodeChartData);

	// Render the total.
	d3.selectAll("#total")
      .text(formatNumber(baseball.size()));

	renderAll();

	// Renders the specified chart or list.
	function render(method) {
		d3.select(this).call(method);
	}

	function renderAll() {
		list.each(render);
		chart.each(render);
		barcode.each(render);
		d3.select("#active").text(formatNumber(all.value()));
	}

	window.filter = function(filters) {
		filters.forEach(function(d, i) { chartData[i].filter(d); });
		renderAll();
	};

	window.reset = function(i) {
		chartData[i].filter(null);
		renderAll();
	};
});