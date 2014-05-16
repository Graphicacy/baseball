/*
 * Intent: Show a simple line in SVG
 */
function lineChart() {
	var clazz = arguments.callee;

	if ( ! clazz.id ) clazz.id = 0;

	var id = clazz.id++,
		pxWidth = 300,
		pxHeight = 100,
		games,
		x,
		group,
		focus,
		round,
		axis;

	function chart(div) {
		var x = d3.scale.linear()
				.domain([0, games.length])
				.range([pxWidth, 0]),
			xOfIndex = function (d, i) { return x(i) },
			y = d3.scale.linear()
				.domain([0, 1])
				.range([0, pxHeight]),
			line = d3.svg.line()
					// .interpolate('basis')
					.x(xOfIndex)
					.y(y),
			win = U.baseball.ALL.didWeWin.bind(null, focus),
			data = U.baseball.ALL.calculateRunningAverage(games, focus);
		

		div.each(function () {
			var graph = div.append('svg:svg')
					.attr('width', pxWidth)
					.attr('height', pxHeight)
				.append('svg:g')

			// var xAxis = d3.svg.axis().scale(x).tickSize(pxHeight).tickSubdivide(true);

			// graph.append('svg:g')
			// 	.attr('class', 'x axis')
			// 	.call(xAxis);

			// var yAxisLeft = d3.svg.axis()
			// 					.scale(y)
			// 					.ticks(4)
			// 					.orient('left');

			// graph.append('svg:g')
			// 	.attr('class', 'y axis')
			// 	.call(yAxisLeft)

			graph.append('svg:path').attr('d', line(data))
		})
	}

	chart.games = function(_) {
      if (!arguments.length) return games;
      games = _;
      return chart;
    };

    chart.averageData = function(_) {
      if (!arguments.length) return averageData;
      averageData = _;
      return chart;
    };

    chart.focus = function(_) {
      if (!arguments.length) return focus;
      focus = _;
      return chart;
    };

    return chart;
}