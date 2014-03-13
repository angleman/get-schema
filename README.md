# get-schema

Get Redshift / postgres schema for a table 

## Install

```sh
npm install get-schema
```

## Usage


```js
pg        = require('pg')
conString = 'postgres://postgres:1234@localhost/postgres'
GetSchema = require('get-schema')

pg.connect(conString, function(err, client, done) {
  if(err) throw new Error(err)

  schema = new GetSchema(client) // valid client that supports 'query()'
  schema.getColumns('registered_voters', function(err, result) {
	  // results: [ "id", "timestamp", "name", "voted" ]
  })
  schema.get('registered_voters', function(err, result) {
	// results: 
	// [ { id: 'integer' },
	// { timestamp: 'timestamp' },
	// { name: 'varchar' },
	// { voted: 'boolean' }
  })
  schema.getCreateTypes('registered_voters', function(err, result) {
	// results: 
	// [ { id: 'integer' },
	// { timestamp: 'timestamp' },
	// { name: 'varchar(80)' }, // character length added
	// { voted: 'boolean' }
  })
})
```

## License

### MIT
