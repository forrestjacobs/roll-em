const { generate } = require("pegjs");
const { minify } = require("terser");

const pegjsOptions = { format: "commonjs", output: "source" };

module.exports = {
  process: (source) => minify(generate(source, pegjsOptions)),
};
