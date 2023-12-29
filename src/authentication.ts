// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { Params, Query } from '@feathersjs/feathers'

import type { Application } from './declarations';

declare module './declarations' {
    interface ServiceTypes {
        authentication: AuthenticationService;
    }
}

class OnlyActiveUsersJwtStrategy extends JWTStrategy {
    // Only allow authenticating activated users
    async getEntityQuery(params: Params) {
        return {
            active: true,
        };
    }
}

class OnlyActiveUsersLocalStrategy extends LocalStrategy {
    // Only allow authenticating activated users
    async getEntityQuery(query: Query, params: Params) {
        return {
            ...query,
            active: true,
            $limit: 1,
        };
    }
}

export const authentication = (app: Application) => {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new OnlyActiveUsersJwtStrategy());
    authentication.register('local', new OnlyActiveUsersLocalStrategy());

    app.use('authentication', authentication);
};
