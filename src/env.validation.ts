import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(4000),
  MONGO_URL: Joi.string().default('mongodb://localhost/myapp'),
  MONGO_URL_PROD: Joi.string().default(
    'mongodb+srv://alex2456:rHXzeryKveXdd19G@cluster0.5twkm.mongodb.net/adminDB?retryWrites=true&w=majority',
  ),
});
