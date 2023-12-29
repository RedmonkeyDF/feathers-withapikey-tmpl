// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import {
    AuthenticationBaseStrategy,
    AuthenticationResult,
    AuthenticationService,
    JWTStrategy,
} from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { Params, Query } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import { createHash } from 'node:crypto';

import type { Application } from './declarations';
import { app } from './app';

declare module './declarations' {
    interface ServiceTypes {
        authentication: AuthenticationService;
    }
}

class ApiKeyStrategy extends AuthenticationBaseStrategy {

    theapp: Application;

    constructor(app: Application) {
        super();
        this.theapp = app;
    }

    async authenticate(authentication: AuthenticationResult) {
        //todo:  Add redis caching to this so it doesnt hit the database every time.
        const cli = this.theapp.get('postgresqlClient');
        const keyhash = createHash('sha256').update(authentication.token).digest('hex');

        const res = await cli('apikey').withSchema(app.get('dbschema')).select('apikeyid').where({
            keyhash: keyhash,
            active: true,
        });

        if (res.length !== 1) {
            throw new NotAuthenticated('Invalid api key authentication.');
        }

        return {
            apikey: res[0].apikeyid,
        };
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

    authentication.register('apikey', new ApiKeyStrategy(app));
    authentication.register('jwt', new OnlyActiveUsersJwtStrategy());
    authentication.register('local', new OnlyActiveUsersLocalStrategy());

    app.use('authentication', authentication);
};
