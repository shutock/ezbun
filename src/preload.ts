import { bold, green, icon, red } from "./utils";

const message = {
  success: () =>
    `${green(icon.check)} ${bold("Environment variables loaded successfully")}`,
  error: (messages: string[]) =>
    [
      `${bold(red(icon.cross))} ${bold("Error in loading environment variables:")}`,
      messages.join("\n"),
    ].join("\n"),
};

const loadUserSchema = async () => {
  try {
    const schemaPath = `${process.cwd()}/env.schema.ts`;
    const module = await import(schemaPath);
    return module.default;
  } catch (e) {
    return null;
  }
};

const validateEnv = async () => {
  const envSchema = await loadUserSchema();
  if (!envSchema) return;

  const envValidation = envSchema.safeParse(process.env);
  if (!envValidation.error) return console.info(`${bold(message.success())}\n`);

  throw new Error(
    `\n\n${`${red(icon.cross)} ${bold("Error in loading environment variables")}:\n${envValidation.error.message}`}\n`,
  );
};

validateEnv();
