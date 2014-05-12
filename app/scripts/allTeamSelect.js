function initSelect(teamList) {

	teamList = _.map(teamList, function (name) {
		return { name: name };
	});

	var select  = d3.select("#teamSelect")
		.append("select")
		.on("change", change);
	var options = select.selectAll('option')
		.data(teamList, U.plucker('name'));

	// Enter selection
	options.enter()
		.append("option")
		.text(U.plucker('name'))
		.attr('value', U.plucker('name'));

	function change() {
	    var selectedIndex = select.property('selectedIndex');
	    var chosen = options[0][selectedIndex];
	    var payload = { chosen: $(chosen).val() };

	    $(document.body).trigger('team.select', 
	    	payload)
	}
}