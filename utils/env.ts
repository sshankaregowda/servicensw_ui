import dotenv from 'dotenv';
import path from 'path';

const envName = process.env.ENV || 'uat';

dotenv.config({
  path: path.resolve(__dirname, `../env/.env.${envName}`)
});

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.service.nsw.gov.au',
  ENV_NAME: process.env.ENV_NAME || envName
};
