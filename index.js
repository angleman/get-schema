// Module by angleman, MIT
// Get Redshift / postgres schema for a table

function Module(client) {
	self = this
	
	function query(tablename, fields, callback) {
		fields = (typeof fields == 'string') ? fields.join(',') : fields
		client.query('SELECT ' + fields + ' FROM information_schema.columns WHERE table_name ="' + tablename + '"', callback)
	}
	
	self.get = function(tablename, callback) {
		query(tablename, 'column_name, data_type, character_maximum_length', callback)
	}
	
	self.getColumns = function(tablename, callback) {
		query(tablename, 'column_name', callback)
	}
	return this
}

module.exports = Module