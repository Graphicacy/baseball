/*
 * Intent: Show a set of games as rectangle
 * composed of a series of regular, similar rectangles
 * somehow denoting who won or lost that game
 *
 */
function barcodeChart() {
	var clazz = arguments.callee;

	if ( ! clazz.id ) clazz.id = 0;

	var id = clazz.id++,
		fnGames,
		x,
		group,
		focus,
		round,
		axis;

	function chart(div) {
		var pxWidth = 300,
			games = fnGames(),
			x = d3.scale.ordinal()
					.domain(d3.range(games.length))
					.rangeRoundBands([pxWidth, 0]),
			win = U.baseball.ALL.didWeWin.bind(null, focus);

		div.each(function () {
			var gameUpdate = d3.select(this)
					.append('div')
					.attr('class', 'barcode').selectAll('.game')
						.data(games),
				gameEnter = gameUpdate.enter()
					.append('div')
						.attr('class', 'game')

			gameEnter.append('div')

			gameUpdate.style('opacity', function (d) {
					// Todo: Use a scale
					var home = d['home.team.score'];
					var visit = d['visiting.team.score'];

					return (Math.abs(home - visit) / 10);
				})
				.style('width', x.rangeBand() + 'px')
				.style('left', function (d, i) {
					return x(i) + 'px';
				})
				.classed('win', win)
				.on('click', U.baseball.ALL.logGame)
				.sort(function (a, b) {
					return a.date.localeCompare(b.date);
				});

			gameUpdate.exit().remove();
		});
	}

	chart.x = function(_) {
      if (!arguments.length) return x;
      x = _;
      return chart;
    };

	chart.fnGames = function(_) {
      if (!arguments.length) return fnGames;
      fnGames = _;
      return chart;
    };

    chart.focus = function(_) {
      if (!arguments.length) return focus;
      focus = _;
      return chart;
    };

	return chart;
}