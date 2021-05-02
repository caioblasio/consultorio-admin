const isValid = (_env) => {
  const env = `${_env}`.toLowerCase();
  const allowedEnvs = ["dev", "production"];

  if (!allowedEnvs.includes(env)) {
    const messages = [
      `Webpack Error (${__filename})`,
      `env should contain one of ["${allowedEnvs.join(
        '", "'
      )}"] (upper case allowed), received "${_env}".`,
    ];

    throw new Error(messages.join("\n"));
  }

  return true;
};

const env = process.env.NODE_ENV;

module.exports = isValid(env)
  ? require(`./build/webpack.${env.toLowerCase()}`)
  : process.exit(1);
