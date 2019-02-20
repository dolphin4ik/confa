const KEYS = {};

module.exports = {
  add(key, defaultValue, extension = {}) {

    if(typeof key !== 'string') {
      throw new Error(`key must be a String`)
    }

    if(defaultValue === undefined) {
      throw new Error(`default value must be provided`)
    }

    KEYS[key] = {
      ...extension,
      "default": defaultValue
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
