/* I'm in need of major improvements!! */

/* 
 * Need to be update to closed-function style!
 */
var formatDate = d3.time.format("%B %d, %Y"),
    formatTime = d3.time.format("%I:%M %p"),

    // A nest operator, for grouping the game list.
    nestByDay = d3.nest()
      .key(function(d) { 
        return d3.time.day(d.jsDate); 
      });

var pxHeightListItem  = 60;

function scrollList(game, index) {
  $('.listContainer').scrollTo( index * pxHeightListItem + 'px')

  var dates = $('.listContainer .date');
  dates.removeClass('selected');

  $(dates.get(index)).addClass('selected');
}

function gameList(div) {
  // DUplicating fnGames() in main.js
  var gamesByDate = nestByDay.entries(dimDate.top(Infinity));

  div.each(function() {
    var date = d3.select(this).selectAll(".date")
        .data(gamesByDate, U.plucker('key'));

    date.enter().append("div")
        .attr("class", "date")
      .append("div")
        .attr("class", "day")
        .text(function(d) { return formatDate(d.values[0].jsDate); });

    date.exit().remove();

    var game = date.order().selectAll(".game")
        .data(U.plucker('values'), U.plucker('index', Number));

    var gameEnter = game.enter().append("div")
        .attr("class", "game");

    gameEnter.append("div")
        .attr("class", "origin")
        .text(U.plucker('home.team'));

    gameEnter.append("div")
        .attr("class", "destination")
        .text(U.plucker('visiting.team'));

    game.exit().remove();

    game.order();
  });
}