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
		.text(getName)
		.attr('value', getName)
		.sort(function (a, b) { 
			return getName(a).localeCompare(getName(b))
		});

	function change() {
		var $select = $(this),
			$selected = $select.find(':selected'),
			payload = { chosen: $selected.val() };

	    $.trigger('team.select', payload)
	}
}