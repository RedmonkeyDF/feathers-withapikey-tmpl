// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    createapikeyDataValidator,
    createapikeyPatchValidator,
    createapikeyQueryValidator,
    createapikeyResolver,
    createapikeyExternalResolver,
    createapikeyDataResolver,
    createapikeyPatchResolver,
    createapikeyQueryResolver
} from './createapikey.schema'

import type { Application } from '../../declarations'
import { CreateapikeyService, getOptions } from './createapikey.class'
import { createapikeyPath, createapikeyMethods } from './createapikey.shared'

export * from './createapikey.class'
export * from './createapikey.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const createapikey = (app: Application) => {
    // Register our service on the Feathers application
    app.use(createapikeyPath, new CreateapikeyService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: createapikeyMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(createapikeyPath).hooks({
        around: {
            all: [
                authenticate('jwt'),
                schemaHooks.resolveExternal(createapikeyExternalResolver),
                schemaHooks.resolveResult(createapikeyResolver)
            ]
        },
        before: {
            all: [
                //schemaHooks.validateQuery(createapikeyQueryValidator),
                //schemaHooks.resolveQuery(createapikeyQueryResolver)
            ],
            create: [
                //schemaHooks.validateData(createapikeyDataValidator),
                //schemaHooks.resolveData(createapikeyDataResolver)
            ]
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    })
}

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        [createapikeyPath]: CreateapikeyService;
    }
}
