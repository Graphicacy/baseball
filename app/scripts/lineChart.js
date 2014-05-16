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
			avg = U.baseball.ALL.calculateRunningAverage(games, focus),
			avgLine = line(avg);

		div.each(function () {
			var graph = d3.select('.lineSvgWrapper g').selectAll('path')
				.data([Math.random()]);

			graph.attr('d', avgLine)

			graph.enter()
				.append('svg:path')
					.attr('d', avgLine)

			graph.exit().remove();
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