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
  schema.get('tablename', function(err, result) {
	  // results: 
  })
})
```

## License

### MIT
