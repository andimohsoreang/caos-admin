const { readdirSync } = require('fs');

const files = readdirSync(__dirname);
let modules = {}

files.forEach(e => {
  const name = e.split(".")[0]
  const type = e.split(".")[1]
  if(type != "js") {
    modules[`${name}Middleware`] = require(`./${name}.${type}.js`)
  }
})

module.exports = modules