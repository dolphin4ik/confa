const confa = require('./index');

confa.add('var1', 'Value-1', {
  dev: 'Value-2',
  prod: 'Value-3'
});
confa.add('A', {a: 'a'}, {
  dev: {a: 'aa'},
  prod: {a: 'aaa'}
});
confa.add('B', 115, {
  dev: 116,
  prod: 117
});
confa.add('C', 'C2H5OH', {
  dev: 'elop'
});

console.log(confa.make());
console.log(confa.make('dev'));
console.log(confa.make('prod'));