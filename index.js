module.exports = () => {
  const KEYS = {};
  return {
    add(key, value, extension = {}) {
      if(typeof key !== 'string') {
        throw new Error(`key must be a String`)
      }
      KEYS[key] = {
        ...extension,
        "default": value
      }
    },
    make(environment = 'default') {
      const result = {}
      Object.keys(KEYS).forEach(k => {
        result[k] = KEYS[k].hasOwnProperty(environment)
          ? KEYS[k][environment]
          : KEYS[k]['default'];
      });
      return result;
    }
  }
};
