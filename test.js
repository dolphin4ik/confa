const test = require('ava');
const random = require('randomatic');
const Confa = require('./index');

const foo = () => ({
  "string": random('Aa0', 5),
  "number": Number(random('0', 5)),
  "boolean": !!parseInt(random('?', 1, {chars: '10'})),
  "null": null,
  "undefined": undefined,
  "object": {
    "string": random('Aa0', 5),
    "number": Number(random('0', 5)),
    "boolean": !!parseInt(random('?', 1, {chars: '10'})),
    "null": null,
    "undefined": undefined
  }
});

const TEST = {
  simple: foo(),
  states: {
    alpha: foo(),
    betta: foo()
  }
};

test('Simple and default values', t => {
  const confa = Confa();

  Object.keys(TEST.simple).forEach(k => {
    confa.add(k, TEST.simple[k]);
  });

  t.deepEqual(confa.make(), TEST.simple, 'simple value');
  t.deepEqual(confa.make('alpha'), TEST.simple, 'simple default value on unknown state');
  t.deepEqual(confa.make('betta'), TEST.simple, 'simple default value on unknown state');
});

test('State and default values', t => {
  const confa = Confa();

  Object.keys(TEST.simple).forEach(k => {
    confa.add(k, TEST.simple[k]);
  });

  Object.keys(TEST.simple).forEach(k => {
    confa.add(k, TEST.simple[k], {
      alpha: TEST.states.alpha[k],
      betta: TEST.states.betta[k]
    });
  });

  t.deepEqual(confa.make(), TEST.simple, 'simple value');
  t.deepEqual(confa.make('alpha'), TEST.states.alpha, 'alpha value on alpha state');
  t.deepEqual(confa.make('betta'), TEST.states.betta, 'betta value on betta state');
  t.deepEqual(confa.make('gamma'), TEST.simple, 'simple default value on unknown state');
});
