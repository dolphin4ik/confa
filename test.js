const test = require('ava');
const random = require('randomatic');
const confa = require('./index');

const foo = () => ({
  "string": random('Aa0', 5),
  "number": Number(random('0', 5)),
  "boolean": !!parseInt(random('?', 1, {chars: '10'})),
  "object": {
    "string": random('Aa0', 5),
    "number": Number(random('0', 5)),
    "boolean": !!parseInt(random('?', 1, {chars: '10'}))
  }
});

const TEST = {
  simple: foo(),
  states: {
    alpha: foo(),
    betta: foo()
  }
};

test('Simple default value', t => {

  Object.keys(TEST.simple).forEach(k => {
    confa.add(k, TEST.simple[k]);
  });

  t.deepEqual(confa.make(), TEST.simple, 'simple value');

  t.deepEqual(confa.make('alpha'), TEST.simple, 'simple default value with alpha state');
  t.deepEqual(confa.make('betta'), TEST.simple, 'simple default value with betta state');
});

test('State values', t => {

  Object.keys(TEST.simple).forEach(k => {
    confa.add(k, TEST.simple[k]);
  });

  Object.keys(TEST.states).forEach(k => {
    Object.keys(TEST.states[k]).forEach(j => {
      confa.add(j, TEST.simple[j], TEST.states[k]);
    });
  });

  t.deepEqual(confa.make(), TEST.simple, 'simple value');

  t.deepEqual(confa.make('alpha'), TEST.states.alpha, 'simple default value with alpha state');
  t.deepEqual(confa.make('betta'), TEST.states.betta, 'simple default value with betta state');
});
