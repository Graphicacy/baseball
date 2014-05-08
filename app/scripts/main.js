/* Adapted from crossfilter homepage */
d3.json("data/ALL_first_37.json", function(error, games) {
	var formatNumber = d3.format(",d"),
		pluck = U.plucker('visiting.team.score', Number);

	// NO VAR, GLOBALS FOR TESTING
		filter = crossfilter(games),
		all = filter.groupAll(),
		DIM = filter.dimension(pluck),
		GRP = DIM.group(U.identity);

	var chartData = [
	 	barChart()
			.dimension(DIM)
			.group(GRP)
	    .x(d3.scale.linear()
	    	.domain([0, 10])
	    	.rangeRound([0, 130]))
	];

	// Given our array of charts, which we assume are in the same order as the
	// .chart elements in the DOM, bind the charts to the DOM and render them.
	// We also listen to the chart's brush events to update the display.
	var chart = d3.selectAll(".chart")
    	.data(chartData)
    	.each(function(chart) { 
      		chart.on("brush", renderAll)
      			.on("brushend", renderAll);
      	});

	renderAll();

	// Renders the specified chart or list.
	function render(method) {
		d3.select(this).call(method);
	}

	// Whenever the brush moves, re-rendering everything.
	function renderAll() {
		chart.each(render);
		d3.select("#active").text(formatNumber(all.value()));
	}
});