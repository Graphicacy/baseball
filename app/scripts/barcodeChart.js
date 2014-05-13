/*
 * Intent: Show a set of games as rectangle
 * composed of a series of regular, similar rectangles
 * somehow denoting who won or lost that game
 *
 */
function barcodeChart(fnGames, fnFocus) {
	var pluckKey = U.plucker('key');

	function chart(div) {
		var games = fnGames(),
			focus = fnFocus(),
			win = U.baseball.ALL.didWeWin.bind(null, focus);

		div.each(function () {
			var game = d3.select(this).selectAll('.game')
					.data(games),
				gameEnter = game.enter()
					.append('div')
						.attr('class', 'game')

			gameEnter.append('div')

			game.text(function (d) {
					// Todo: try a ordinal scale 
					return win(d) ? 'W': 'L';
				})
				.style('opacity', function (d) {
					// Todo: Use a scale
					var home = d['home.team.score'];
					var visit = d['visiting.team.score'];

					return (Math.abs(home - visit) / 10);
				})
				.classed('win', win)
				.on('click', U.baseball.ALL.logGame)
				.sort(function (a, b) {
					return a.date.localeCompare(b.date);
				});

			game.exit().remove();
		});
	}

	return chart;
}