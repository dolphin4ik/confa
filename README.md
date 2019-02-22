# Confa
Simple environment-dependent config tool.
Make your own env-based config easy.


## Using

```npm i confa```

```javascript
const Confa = require('confa');
const confa = Confa();

confa.add('key', 'value'); // value
confa.add('another_key', 'default_value', {
	dev: 'dev_value',
	rc: 'rc_value',
	prod: 'prod_value'
});
// default_value

confa.make(); // { key: 'value', another_key: 'default_value' }
confa.make('dev'); // { key: 'value', another_key: 'dev_value' }
confa.make('rc'); // { key: 'value', another_key: 'rc_value' }
confa.make('banana'); // { key: 'value', another_key: 'default_value' }
```

## Confa([environment])
Return new confa tool with predefined environment (not required)

**environment** affects on the returned result of **.add** method


## .add(key, value, [extension])
Just add any value (number, string, boolean, object) to a key

.add(**key**, **value**, [extension])

**extension** allows you to return the **dependent** value

Returns value that depends on predefined environment in **Confa** or default value
```javascript
const confa = Confa('prod');
confa.add('key', 'value', { prod: 'prod_value' }); // prod_value
```

## .make([env])

Returns the specific {key: value} **object** basing on the environment or state

.make() -> default values

.make('special') -> special values