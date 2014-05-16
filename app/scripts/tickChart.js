/*
 * Intent: Show a set of games as rectangle
 * composed of a series of tick marks
 * somehow denoting who won or lost that game
 *
 */
function tickChart() {
	var clazz = arguments.callee;

	if ( ! clazz.id ) clazz.id = 0;

	var id = clazz.id++,
		pxWidth = 300,
		pxHeight = 100,
		x,
		group,
		focus,
		round,
		games,
		averageData;

	function chart(div) {
		var x = d3.scale.ordinal()
				.domain(d3.range(games.length))
				.rangeBands([pxWidth, 0]),
			y = d3.scale.linear()
				.domain([0, 1])
				.range([0, pxHeight]),
			win = U.baseball.ALL.didWeWin.bind(null, focus),
			triggerHover = function (game, index) {
				$.trigger('tick.hover', {
					game: game,
					index: index
				});
			};

		div.each(function () {
			var gameUpdate = d3.select(this).selectAll('.game')
								.data(games),
				gameEnter = gameUpdate.enter()
								.append('div')
									.attr('class', 'game');

			gameUpdate.style('left', function (d, i) {
					return x(i) + 'px';
				})
				.style('top', function (d, i) {
					var winVariance = win(d) ? -10 : 0,
						avg = averageData[i],
						pt = y(avg) + winVariance;


					return pt + 'px';
				})
				.classed('win', win)
				.on('click', U.baseball.ALL.logGame)
				.on('mouseenter', triggerHover)
				.sort(U.baseball.ALL.dateCompare)

			gameUpdate.exit().remove();
		})
	}

	chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return chart;
    };

	chart.averageData = function(_) {
      if (!arguments.length) return averageData;
      averageData = _;
      return chart;
    };

	chart.games = function(_) {
      if (!arguments.length) return games;
      games = _;
      return chart;
    };

    chart.focus = function(_) {
      if (!arguments.length) return focus;
      focus = _;
      return chart;
    };

    return chart;
}