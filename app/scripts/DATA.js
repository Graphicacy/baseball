/* 
 * generic info about datasets
 */

var ALL = {
	last100: {
		dateRange: [new Date(2013, 9, 22), new Date(2013, 9, 30)],
		filePath: 'data/ALL_last_100.json',
		beginningTeam: 'ANA'
	},
	last1857: {
		dateRange: [new Date(2013, 5, 15), new Date(2013, 9, 29)],
		filePath: 'data/ALL_last_1857.json',
		beginningTeam: 'ANA'
	},
	last3715: {
		dateRange: [new Date(2012, 6, 29), new Date(2013, 9, 29)],
		filePath: 'data/ALL_last_3715.json',
		beginningTeam: 'ANA'
	},
	/* Don't use, too big! breaks everything */
	ALL: {
		dateRange: [new Date(1900, 04, 20), new Date(2013, 9, 29)],
		filePath: 'data/ALL.json',
		beginningTeam: 'ANA'
	}
}