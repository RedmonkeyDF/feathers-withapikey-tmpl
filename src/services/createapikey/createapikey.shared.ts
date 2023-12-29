// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
    Createapikey,
    CreateapikeyData,
    CreateapikeyPatch,
    CreateapikeyQuery,
    CreateapikeyService
} from './createapikey.class'

export type { Createapikey, CreateapikeyData, CreateapikeyPatch, CreateapikeyQuery }

export type CreateapikeyClientService = Pick<
    CreateapikeyService<Params<CreateapikeyQuery>>,
    (typeof createapikeyMethods)[number]
>;

export const createapikeyPath = 'createapikey'

export const createapikeyMethods = ['create'] as const

export const createapikeyClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(createapikeyPath, connection.service(createapikeyPath), {
        methods: createapikeyMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [createapikeyPath]: CreateapikeyClientService;
    }
}
