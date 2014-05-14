/*
 * Intent: Show a set of games as rectangle
 * composed of a series of regular, similar rectangles
 * somehow denoting who won or lost that game
 *
 */
function barcodeChartList() {
	var clazz = arguments.callee;

	if ( ! clazz.id ) clazz.id = 0;

	var id = clazz.id++,
		fnGames,
		group,
		focus,
		round,
		x,
		axis;

	function chart(div) {
		var nestByDate = d3.nest().key(function (d) {
			return d3.time.month(d.jsDate)
		})
			pxWidth = 300,
			games = fnGames(),
			nestedGames = nestByDate.entries(games);
			x = d3.scale.ordinal()
				.domain(d3.range(games.length))
				.rangeRoundBands([pxWidth, 0]);

		div.each(function () {
			var listUpdate = d3.select(this).selectAll('.date')
					.data(nestedGames, U.plucker('key')),
				listEnter = listUpdate.enter()
					.append('div')
						.attr('class', 'date');
				// barcodeUpdate = listEnter.selectAll('.barcode')
				// 				.data(U.plucker('values'), U.plucker('index')),
				// barcodeEnter = barcodeUpdate.enter().append('div')
				// 				.attr('class', 'barcode')
									
			listUpdate.each(function (groupedGames) {
				var chart = barcodeChart()
					.fnGames(function () {
						return groupedGames.values
					})
					.focus(focus);

				var update = d3.select(this).selectAll('.barcode')
					.data([1]);

				update.enter()
					.append('div')
					.attr('class', 'barcode');

				update.each(function () {
					chart(d3.select(this))
				})

				update.exit().remove();
			});


			// barcodeUpdate.each(barcodeChart().fnGames(fnGames))


			// listUpdate.style('opacity', function (d) {
			// 		// Todo: Use a scale
			// 		var home = d['home.team.score'];
			// 		var visit = d['visiting.team.score'];

			// 		return 1 - (Math.abs(home - visit) / 10);
			// 	})
			// 	.style('width', x.rangeBand() + 'px')
			// 	.style('left', function (d, i) {
			// 		return x(i) + 'px';
			// 	})
			// 	.classed('win', win)
			// 	.on('click', U.baseball.ALL.logGame)
			// 	.sort(function (a, b) {
			// 		return a.date.localeCompare(b.date);
			// 	});

			listUpdate.exit().remove();
		});
	}

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