/*
 * Intent: Show a set of games as rectangle
 * composed of a series of regular, similar rectangles
 * somehow denoting who won or lost that game
 *
 */

function didHomeWin(game) {
	return didWeWin(game['home.team'], game);
}

function didWeWin(us, game) {

	var p = parseInt,
		home = game['home.team'],
		visit = game['visiting.team'];

	if (us != home && us != visit) U.err('No team w/ that name');

	var weAreHome = game['home.team'] == us,
		homeScore = game['home.team.score'],
		visitScore = game['visiting.team.score'],
		homeWon = p(homeScore) > p(visitScore),
		homeAndWon = weAreHome && homeWon,
		awayAndWon = (! weAreHome ) && (! homeWon );

	return homeAndWon || awayAndWon;
}

function barcodeChart(fnGames, fnFocus) {
	var pluckKey = U.plucker('key');

	function chart(div) {
		var games = fnGames(),
			focus = fnFocus(),
			win = didWeWin.bind(null, focus);

		div.each(function () {
			var game = d3.select(this).selectAll('.game')
					.data(games),
				gameEnter = game.enter()
					.append('div')
						.attr('class', 'game')
						.attr('class', function (d) {
							return 'game ' + (win(d) ? 'win': 'loss');
						})
						.on('click', U.baseball.ALL.logGame)
						.sort(function (a, b) {
							return a.date.localeCompare(b.date);
						});

			gameEnter.append('div')
				.text(function (d) {
					return win(d) ? 'W': 'L';
				})

			game.exit().remove();
		});
	}

	return chart;
}