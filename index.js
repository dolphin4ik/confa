module.exports = (environment = 'default') => {
  const KEYS = {};
  const choose = (key, environment) =>
    KEYS[key].hasOwnProperty(environment)
      ? KEYS[key][environment]
      : KEYS[key]['default'];

  return {
    add(key, value, extension = {}) {
      if(typeof key !== 'string') {
        throw new Error(`key must be a String`)
      }
      KEYS[key] = {
        ...extension,
        "default": value
      }
      return choose(key, environment);
    },
    make(environment = 'default') {
      const result = {}
      Object.keys(KEYS).forEach(key => {
        result[key] = choose(key, environment);
      });
      return result;
    }
  }
};
