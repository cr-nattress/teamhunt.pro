import { Handler } from '@netlify/functions';
import serverless from 'serverless-http';
import app from '../../src/app';

const handler: Handler = serverless(app);

export { handler };