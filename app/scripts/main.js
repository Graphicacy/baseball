/* Adapted from crossfilter homepage */
d3.json("data/ALL_last_100.json", function(error, games) {
	var formatNumber = d3.format(",d"),
		pluckVisitingTeamScore = U.plucker('visiting.team.score', Number),
		pluckHomeTeamScore = U.plucker('home.team.score', Number),
		pluckDate = U.plucker('date', U.parseALLDate, new Date());

	var last100 = {
		dateRange: [new Date(2013, 9, 22), new Date(2013, 9, 30)]
	};

	// NO VAR, GLOBALS FOR TESTING
		baseball = crossfilter(games),
		all = baseball.groupAll(),
		dimVisitingTeamScore = baseball.dimension(pluckVisitingTeamScore),
		grpVisitingTeamScore = dimVisitingTeamScore.group(U.identity),

		dimHomeTeamScore = baseball.dimension(pluckHomeTeamScore),
		grpHomeTeamScore = dimHomeTeamScore.group(U.identity),

		dimDate = baseball.dimension(pluckDate),
		grpDate = dimDate.group(U.identity);

	var chartData = [

		// Home team runs
	 	barChart()
			.dimension(dimHomeTeamScore)
			.group(grpHomeTeamScore)
	    .x(d3.scale.linear()
	    	.domain([0, 15])
	    	.rangeRound([0, 140])),

	    // Visiting team runs
	 	barChart()
			.dimension(dimVisitingTeamScore)
			.group(grpVisitingTeamScore)
	    .x(d3.scale.linear()
	    	.domain([0, 15])
	    	.rangeRound([0, 140])),

	    // Date
	    barChart()
	        .dimension(dimDate)
	        .group(grpDate)
	        .round(d3.time.day.round)
	      .x(d3.time.scale()
	        .domain(last100.dateRange)
	        .rangeRound([0, 10 * 90]))
	        .filter(last100.dateRange)
	];

	// Given our array of charts, which we assume are in the same order as the
	// .chart elements in the DOM, bind the charts to the DOM and render them.
	// We also listen to the chart's brush events to update the display.
	var chart = d3.selectAll(".chart")
    	.data(chartData)
    	.each(function(chart) {
			// Whenever the brush moves, re-rendering everything. 
      		chart.on("brush", renderAll)
      			.on("brushend", renderAll);
      	});

	renderAll();

	// Renders the specified chart or list.
	function render(method) {
		d3.select(this).call(method);
	}

	function renderAll() {
		chart.each(render);
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