function scrollList(a,b){$(".listContainer").scrollTo(b*pxHeightListItem+"px");var c=$(".listContainer .date");c.removeClass("selected"),$(c.get(b)).addClass("selected")}function gameList(a){var b=nestByDay.entries(dimDate.top(1/0));a.each(function(){var a=d3.select(this).selectAll(".date").data(b,U.plucker("key"));a.enter().append("div").attr("class","date").append("div").attr("class","day").text(function(a){return formatDate(a.values[0].jsDate)}),a.exit().remove();var c=a.order().selectAll(".game").data(U.plucker("values"),U.plucker("index",Number)),d=c.enter().append("div").attr("class","game");d.append("div").attr("class","origin").text(U.plucker("home.team")),d.append("div").attr("class","destination").text(U.plucker("visiting.team")),c.exit().remove(),c.order()})}function barChart(){function a(a){function d(a){for(var c,d=[],e=-1,f=a.length;++e<f;)c=a[e],d.push("M",b(c.key),",",m,"V",h(c.value),"h9V",m);return d.join("")}function f(a){var b=+("e"==a),c=b?1:-1,d=m/3;return"M"+.5*c+","+d+"A6,6 0 0 "+b+" "+6.5*c+","+(d+6)+"V"+(2*d-6)+"A6,6 0 0 "+b+" "+.5*c+","+2*d+"ZM"+2.5*c+","+(d+8)+"V"+(2*d-8)+"M"+4.5*c+","+(d+8)+"V"+(2*d-8)}var l=b.range()[1],m=h.range()[0];h.domain([0,e.top(1)[0].value]),a.each(function(){var a=d3.select(this),h=a.select("g");if(h.empty()){a.select(".title").append("a").attr("href","javascript:reset("+i+")").attr("class","reset").text("reset").style("display","none"),h=a.append("svg").attr("width",l+g.left+g.right).attr("height",m+g.top+g.bottom).append("g").attr("transform","translate("+g.left+","+g.top+")"),h.append("clipPath").attr("id","clip-"+i).append("rect").attr("width",l).attr("height",m),h.selectAll(".bar").data(["background","foreground"]).enter().append("path").attr("class",function(a){return a+" bar"}).datum(e.all()),h.selectAll(".foreground.bar").attr("clip-path","url(#clip-"+i+")"),h.append("g").attr("class","axis").attr("transform","translate(0,"+m+")").call(j);var n=h.append("g").attr("class","brush").call(k);n.selectAll("rect").attr("height",m),n.selectAll(".resize").append("path").attr("d",f)}if(c)if(c=!1,h.selectAll(".brush").call(k),a.select(".title a").style("display",k.empty()?"none":null),k.empty())h.selectAll("#clip-"+i+" rect").attr("x",0).attr("width",l);else{var o=k.extent();h.selectAll("#clip-"+i+" rect").attr("x",b(o[0])).attr("width",b(o[1])-b(o[0]))}h.selectAll(".bar").attr("d",d)})}barChart.id||(barChart.id=0);var b,c,d,e,f,g={top:10,right:10,bottom:20,left:10},h=d3.scale.linear().range([100,0]),i=barChart.id++,j=d3.svg.axis().orient("bottom"),k=d3.svg.brush();return k.on("brushstart.chart",function(){var a=d3.select(this.parentNode.parentNode.parentNode);a.select(".title a").style("display",null)}),k.on("brush.chart",function(){var a=d3.select(this.parentNode),c=k.extent();f&&a.select(".brush").call(k.extent(c=c.map(f))).selectAll(".resize").style("display",null),a.select("#clip-"+i+" rect").attr("x",b(c[0])).attr("width",b(c[1])-b(c[0])),d.filterRange(c)}),k.on("brushend.chart",function(){if(k.empty()){var a=d3.select(this.parentNode.parentNode.parentNode);a.select(".title a").style("display","none"),a.select("#clip-"+i+" rect").attr("x",null).attr("width","100%"),d.filterAll()}}),a.margin=function(b){return arguments.length?(g=b,a):g},a.x=function(c){return arguments.length?(b=c,j.scale(b),k.x(b),a):b},a.y=function(b){return arguments.length?(h=b,a):h},a.dimension=function(b){return arguments.length?(d=b,a):d},a.filter=function(b){return b?(k.extent(b),d.filterRange(b)):(k.clear(),d.filterAll()),c=!0,a},a.group=function(b){return arguments.length?(e=b,a):e},a.round=function(b){return arguments.length?(f=b,a):f},d3.rebind(a,k,"on")}function barcodeChart(){function a(a){var b=300,d=c(),f=d3.scale.ordinal().domain(d3.range(d.length)).rangeRoundBands([b,0]),g=U.baseball.ALL.didWeWin.bind(null,e);a.each(function(){var a=d3.select(this).append("div").attr("class","barcode").selectAll(".game").data(d),b=a.enter().append("div").attr("class","game");b.append("div"),a.style("opacity",function(a){var b=a["home.team.score"],c=a["visiting.team.score"];return Math.abs(b-c)/10}).style("width",f.rangeBand()+"px").style("left",function(a,b){return f(b)+"px"}).classed("win",g).on("click",U.baseball.ALL.logGame).sort(U.baseball.ALL.dateCompare),a.exit().remove()})}var b=arguments.callee;b.id||(b.id=0);{var c,d,e;b.id++}return a.x=function(b){return arguments.length?(d=b,a):d},a.fnGames=function(b){return arguments.length?(c=b,a):c},a.focus=function(b){return arguments.length?(e=b,a):e},a}function barcodeChartList(){function a(a){var b=d3.nest().key(function(a){return d3.time.month(a.jsDate)});pxWidth=300,games=c(),nestedGames=b.entries(games),e=d3.scale.ordinal().domain(d3.range(games.length)).rangeRoundBands([pxWidth,0]),a.each(function(){{var a=d3.select(this).selectAll(".date").data(nestedGames,U.plucker("key"));a.enter().append("div").attr("class","date")}a.each(function(a){var b=barcodeChart().fnGames(function(){return a.values}).focus(d),c=d3.select(this).selectAll(".barcode").data([1]);c.enter().append("div").attr("class","barcode"),c.each(function(){b(d3.select(this))}),c.exit().remove()}),a.exit().remove()})}var b=arguments.callee;b.id||(b.id=0);{var c,d,e;b.id++}return a.fnGames=function(b){return arguments.length?(c=b,a):c},a.focus=function(b){return arguments.length?(d=b,a):d},a}function tickChart(){function a(a){var b=d3.scale.ordinal().domain(d3.range(e.length)).rangeBands([g,0]),c=d3.scale.linear().domain([0,1]).range([0,h]),i=U.baseball.ALL.didWeWin.bind(null,d),j=function(a,b){$.trigger("tick.hover",{game:a,index:b})};a.each(function(){{var a=d3.select(this).selectAll(".game").data(e);a.enter().append("div").attr("class","game")}a.style("left",function(a,c){return b(c)+"px"}).style("top",function(a,b){var d=i(a)?-10:0,e=f[b],g=c(e)+d;return g+"px"}).classed("win",i).on("click",U.baseball.ALL.logGame).on("mouseenter",j).sort(U.baseball.ALL.dateCompare),a.exit().remove()})}var b=arguments.callee;b.id||(b.id=0);var c,d,e,f,g=(b.id++,300),h=100;return a.x=function(b){return arguments.length?(c=b,a):c},a.averageData=function(b){return arguments.length?(f=b,a):f},a.games=function(b){return arguments.length?(e=b,a):e},a.focus=function(b){return arguments.length?(d=b,a):d},a}function lineChart(){function a(a){var b=d3.scale.linear().domain([0,c.length]).range([e,0]),g=function(a,c){return b(c)},h=d3.scale.linear().domain([0,1]).range([0,f]),i=d3.svg.line().x(g).y(h),j=(U.baseball.ALL.didWeWin.bind(null,d),U.baseball.ALL.calculateRunningAverage(c,d));a.each(function(){var b=a.append("svg:svg").attr("width",e).attr("height",f).append("svg:g");b.append("svg:path").attr("d",i(j))})}var b=arguments.callee;b.id||(b.id=0);var c,d,e=(b.id++,300),f=100;return a.games=function(b){return arguments.length?(c=b,a):c},a.averageData=function(b){return arguments.length?(averageData=b,a):averageData},a.focus=function(b){return arguments.length?(d=b,a):d},a}function initSelect(a){function b(){var a=$(this),b=a.find(":selected"),c={chosen:b.val()};$.trigger("team.select",c)}var c=U.plucker("name");a=_.map(a,function(a){return{name:a}});var d=d3.select("#teamSelect").append("select").on("change",b),e=d.selectAll("option").data(a,c);e.enter().append("option").text(c).attr("value",c).sort(function(a,b){return c(a).localeCompare(c(b))})}U=Utility={identity:function(a){return a},noop:function(){},log:console.log.bind(console),logger:function(a){return console.log.bind(console,a)},sum:function(a,b){return a+b},filled_array:function(a,b){var c=[];return c.length=a,_.map(c,function(){return b})},mean:function(a){return _.reduce(a,U.sum)/a.length},plucker:function(a,b,c){return b=b||this.identity,function(d){var e=d[a];return e?b(e):c}},err:function(a){throw new Error(a)},baseball:{ALL:{parseDate:function(a){var b=/(\d{4})(\d{2})(\d{2})/,c=a.match(b),d=c[1],e=c[2],f=c[3];return new Date(d,e,f)},didWeWin:function(a,b){var c=parseInt,d=b["home.team"],e=b["visiting.team"];a!=d&&a!=e&&U.err("No team w/ that name");var f=b["home.team"]==a,g=b["home.team.score"],h=b["visiting.team.score"],i=c(g)>c(h),j=f&&i,k=!f&&!i;return j||k},dateCompare:function(a,b){return a.date.localeCompare(b.date)},calculateRunningAverage:function(a,b){var c=[],d=Math.floor(a.length/10),e=U.filled_array(d,.5),f=U.mean,g=U.baseball.ALL.didWeWin;return _.each(a,function(a){var d=g(b,a);e.shift(),e.push(d?1:0),c.push(f(e))}),c},logGame:function(a){var b={home:a["home.team"],homeScore:a["home.team.score"],away:a["visiting.team"],awayScore:a["visiting.team.score"],date:a.date},c="Baseball <%= date %>: H <%= home %> (<%= homeScore %>) v. A <%= away %> (<%= awayScore %>) ==>",d=_.template(c,b);U._=a,U.log(d,a)}}}};var formatDate=d3.time.format("%B %d, %Y"),formatTime=d3.time.format("%I:%M %p"),nestByDay=d3.nest().key(function(a){return d3.time.day(a.jsDate)}),pxHeightListItem=60,ALL={last100:{dateRange:[new Date(2013,9,22),new Date(2013,9,30)],filePath:"data/ALL_last_100.json"},last1857:{dateRange:[new Date(2013,5,15),new Date(2013,9,29)],filePath:"data/ALL_last_1857.json"},last3715:{dateRange:[new Date(2012,6,29),new Date(2013,9,29)],filePath:"data/ALL_last_3715.json"},ALL:{dateRange:[new Date(1900,4,20),new Date(2013,9,29)],filePath:"data/ALL.json"}},settings=ALL.last3715;d3.json(settings.filePath,function(a,b){function c(){return dimDate.top(1/0)}function d(a){d3.select(this).call(a)}function c(){return dimDate.top(1/0)}var e="ANA",f=d3.format(",d"),g=U.baseball.ALL.parseDate;pluckVisitingTeamScore=U.plucker("visiting.team.score",Number),pluckHomeTeamScore=U.plucker("home.team.score",Number),pluckDate=U.plucker("jsDate"),pluckHomeTeam=U.plucker("home.team"),pluckVisitingTeam=U.plucker("visiting.team");var h=[];_.each(b,function(a,b){h.push(pluckHomeTeam(a)),h.push(pluckVisitingTeam(a)),a.index=b,a.jsDate=new Date(g(a.date))}),h=_.unique(h);var i;baseball=crossfilter(b),all=baseball.groupAll(),dimVisitingTeamScore=baseball.dimension(pluckVisitingTeamScore),grpVisitingTeamScore=dimVisitingTeamScore.group(U.identity),dimHomeTeamScore=baseball.dimension(pluckHomeTeamScore),grpHomeTeamScore=dimHomeTeamScore.group(U.identity),dimDate=baseball.dimension(pluckDate),grpDate=dimDate.group(U.identity),grpDateByMonth=dimDate.group(d3.time.month),dimTeamNames=baseball.dimension(function(a){return pluckHomeTeam(a)+"|"+pluckVisitingTeam(a)}),chunkTime=d3.time.day,nestTimeChunks=d3.nest().key(function(a){chunkTime(a.jsDate)}),$.on("team.select",function(a){i=a.chosen,dimTeamNames.filter(function(a){return-1!=a.indexOf(i)});var b=c(),d=U.baseball.ALL.calculateRunningAverage(b,i);_.each(j,function(a){a.focus(i).averageData(d).games(b)}),$.trigger("dirty.view")}),$.on("dirty.view",function(){l.each(d),k.each(d),d3.select("#active").text(f(all.value()))}),$.on("tick.hover",function(a){var b=a.game,c=a.index;scrollList(b,c)});var j=[lineChart(),tickChart()],k=d3.selectAll(".list").data([gameList]),l=d3.selectAll(".tickMark").data(j);d3.selectAll("#total").text(f(baseball.size())),initSelect(h),$.trigger("team.select",{chosen:e})});