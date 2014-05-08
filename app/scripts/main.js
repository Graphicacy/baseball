/* Adapted from crossfilter homepage */
function identity(a) { return a; };
function noop() {/* Do nothing */};

d3.json("data/ALL_first_37.json", function(error, games) {
	function plucker(attr, formatter) { 
		formatter = formatter || identity;

		return function (d) {
			var val = d[attr];

			return formatter(val);
		}
	}

	var formatNumber = d3.format(",d");

	// NO VAR, GLOBALS FOR TESTING
		filter = crossfilter(games),
		all = filter.groupAll(),
		NO = filter.dimension(plucker('visiting.team.score', Number)),
		NOs = NO.group(identity);


	var chartData = [
	 	barChart()
			.dimension(NO)
			.group(NOs)
	    .x(d3.scale.linear()
	    	.domain([0, 37])
	    	.rangeRound([0, 4000]))
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