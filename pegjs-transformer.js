const { generate } = require("pegjs");

const options = { format: "commonjs", output: "source" };

module.exports = {
  process: (source) => generate(source, options),
};
