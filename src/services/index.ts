import { user } from './users/users';
import { createapikey } from './createapikey/createapikey';
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations';

export const services = (app: Application) => {
    app.configure(user);
    app.configure(createapikey)
    // All services will be registered here
};
