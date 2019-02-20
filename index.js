const KEYS = {};

module.exports = {
  add(key, value, extension = {}) {

    if(typeof key !== 'string') {
      throw new Error(`key must be a String`)
    }

    if(value === undefined) {
      throw new Error(`default value must be provided`)
    }

    KEYS[key] = {
      ...extension,
      "default": value
    }
  },

  make(environment = "default") {
    const result = {}
    Object.keys(KEYS).forEach(k => {
      result[k] = KEYS[k][environment] || KEYS[k]['default'];
    });
    return result;
  }
}
