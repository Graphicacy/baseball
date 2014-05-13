function initSelect(teamList) {

	var getName =  U.plucker('name');

	teamList = _.map(teamList, function (name) {
		return { name: name };
	});

	var select  = d3.select("#teamSelect")
		.append("select")
		.on("change", change);
	var options = select.selectAll('option')
		.data(teamList, getName);

	// Enter selection
	options.enter()
		.append("option")
		.text(U.plucker('name'))
		.attr('value', U.plucker('name'))
		.sort(function (a, b) { 
			return getName(a).localeCompare(getName(b))
		});

	function change() {
	    var selectedIndex = select.property('selectedIndex');
	    var chosen = options[0][selectedIndex];
	    var payload = { chosen: $(chosen).val() };

	    $(document.body).trigger('team.select', 
	    	payload)
	}
}