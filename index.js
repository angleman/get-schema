// get-schema by angleman, MIT
// Get Redshift / postgres schema for a table

function GetSchema(client) {
	self = this
	
	function query(tablename, fields, callback) {
		fields = (typeof fields == 'string') ? fields : fields.join(',')
		qry    = 'SELECT ' + fields + " FROM information_schema.columns WHERE table_name='" + tablename + "'"
		client.query(qry, callback)
	}
	
	self.get = function(tablename, callback) {
		function extractColumns(err, result) {
			if (result && result.rows) {
				rows = result.rows
				result = []
				for (i = 0; i < rows.length; i++) {
					row = rows[i]
					type = row['data_type']
					switch (type) {
					case 'character varying': type = 'varchar'; break
					case 'character':         type = 'char';    break
					case 'double precision':  type = 'float';   break
					default: 
						type = row['data_type'].split(' ')[0]
					}
					json = '{"'+row['column_name'] + '": "' + type + '"}'
					row  = JSON.parse(json)
					result.push(row)
				}
			}
			callback(err, result)
		}
		query(tablename, 'column_name, data_type, character_maximum_length', extractColumns)
	}
	
	self.getCreateTypes = function(tablename, callback) {
		function extractColumns(err, result) {
			if (result && result.rows) {
				rows = result.rows
				result = []
				for (i = 0; i < rows.length; i++) {
					row = rows[i]
					type = row['data_type']
					switch (type) {
					case 'character varying': type = 'varchar(' + row['character_maximum_length'] + ')'; break
					case 'character':         type = 'char(' + row['character_maximum_length'] + ')';    break
					case 'double precision':  type = 'float';   break
					default: 
						type = row['data_type'].split(' ')[0]
					}
					json = '{"'+row['column_name'] + '": "' + type + '"}'
					row  = JSON.parse(json)
					result.push(row)
				}
			}
			callback(err, result)
		}
		query(tablename, 'column_name, data_type, character_maximum_length', extractColumns)
	}
	
	self.getColumns = function(tablename, callback) {
		function extractColumns(err, result) {
			if (result && result.rows) {
				rows = result.rows
				result = []
				for (i = 0; i < rows.length; i++) {
					row = rows[i]
					result.push(row['column_name'])
				}
			}
			callback(err, result)
		}
		query(tablename, 'column_name', extractColumns)
	}


	return self
}

module.exports = GetSchema