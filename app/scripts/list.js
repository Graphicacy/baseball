var formatDate = d3.time.format("%B %d, %Y"),
    formatTime = d3.time.format("%I:%M %p"),

    parseDate = U.baseball.ALL.parseDate,

    // A nest operator, for grouping the game list.
    nestByDate = d3.nest()
      .key(function(d) { 
        var date = parseDate(d.date)
        return d3.time.day(date); 
      });

function gameList(div) {
  var gamesByDate = nestByDate.entries(dimDate.top(40));

  div.each(function() {
    var date = d3.select(this).selectAll(".date")
        .data(gamesByDate, U.plucker('key'));

    date.enter().append("div")
        .attr("class", "date")
      .append("div")
        .attr("class", "day")
        .text(function(d) { return formatDate(parseDate(d.values[0].date)); });

    date.exit().remove();

    var game = date.order().selectAll(".game")
        .data(U.plucker('values'), U.plucker('index'));

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