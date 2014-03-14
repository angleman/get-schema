// get-schema by angleman, MIT
// Get Redshift / postgres schema for a table

function GetSchema(client) {
	function query(tablename, fields, callback) {
		fields = (typeof fields == 'string') ? fields : fields.join(',')
		qry    = 'SELECT ' + fields + " FROM information_schema.columns WHERE table_name='" + tablename + "'"
		client.query(qry, callback)
	}
	
	this.get = function(tablename, callback, addLength) {
		function extractColumns(err, result) {
			if (result && result.rows) {
				rows = result.rows
				result = {}
				json   = []
				slash  = ''
				quote  = '"'
				SQ     = slash + quote
				for (i = 0; i < rows.length; i++) {
					row = rows[i]
					type = row['data_type']
					typelen = (addLength) ? '(' + row['character_maximum_length'] + ')' : ''
					switch (type) {
					case 'character varying': type = 'varchar' + typelen; break
					case 'character':         type = 'char' + typelen;    break
					case 'double precision':  type = 'float';   break
					default: 
						type = row['data_type'].split(' ')[0]
					}
					json.push(SQ +row['column_name'] + SQ + ": " + SQ + type + SQ)
				}
				result  = JSON.parse('{' + json.join(',') + '}')
			}
			callback(err, result)
		}
		query(tablename, 'column_name, data_type, character_maximum_length', extractColumns)
	}
	
	this.getCreateTypes = function(tablename, callback) {
		return this.get(tablename, callback, true)
	}
	
	this.getColumns = function(tablename, callback) {
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

	return this
}

module.exports = GetSchema