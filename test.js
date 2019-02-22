const test = require('ava');
const random = require('randomatic');
const Confa = require('./index');

const foo = () => ({
  "string": random('Aa0', 5),
  "number": Number(random('0', 5)),
  "boolean": !!parseInt(random('?', 1, {chars: '10'})),
  "null": null,
  "undefined": undefined,
  "array": [random('Aa0', 5), Number(random('0', 5))],
  "object": {
    "string": random('Aa0', 5),
    "number": Number(random('0', 5)),
    "boolean": !!parseInt(random('?', 1, {chars: '10'})),
    "null": null,
    "undefined": undefined,
    "array": [random('Aa0', 5), Number(random('0', 5))]
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

test('Predefined environment', t => {
  const environment = ['alpha', 'betta'][parseInt(random('?', 1, {chars: '10'}))];
  const confa = Confa(environment);

  Object.keys(TEST.simple).forEach(k => {
    t.deepEqual(
      confa.add(k, TEST.simple[k]),
      TEST.simple[k],
      'return default value'
    );
  });

  Object.keys(TEST.simple).forEach(k => {
    t.deepEqual(
      confa.add(k, TEST.simple[k], {
        alpha: TEST.states.alpha[k],
        betta: TEST.states.betta[k]
      }),
      TEST.states[environment][k],
      `return ${environment} value`
    );
  });
});
