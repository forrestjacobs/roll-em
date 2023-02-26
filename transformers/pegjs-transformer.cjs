const { generate } = require("pegjs");

const pegjsOptions = { format: "commonjs", output: "source" };

module.exports = {
  process: (source) => ({
    code: generate(source, pegjsOptions),
  }),
};
