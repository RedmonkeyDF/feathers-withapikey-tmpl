import { HookContext, NextFunction } from '@feathersjs/feathers';

export default () => async (context: HookContext, next: NextFunction) => {
    const { params, app } = context;

    const headerField = app.get('authentication').apikey.header;
    const token = params.headers ? params.headers[headerField] : null;

    if (token && params.provider && !params.authentication) {
        context.params = {
            ...params,
            authentication: {
                strategy: 'apikey',
                token
            }
        };
    }

    return next();
};
