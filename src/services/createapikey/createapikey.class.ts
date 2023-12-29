// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Createapikey, CreateapikeyData, CreateapikeyPatch, CreateapikeyQuery } from './createapikey.schema'
import { app } from '../../app'
import { createHash, randomUUID } from 'node:crypto'

export type { Createapikey, CreateapikeyData, CreateapikeyPatch, CreateapikeyQuery }

export interface CreateapikeyServiceOptions {
    app: Application;
}

export interface CreateapikeyParams extends Params<CreateapikeyQuery> {
}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class CreateapikeyService<ServiceParams extends CreateapikeyParams = CreateapikeyParams>
    implements ServiceInterface<Createapikey, CreateapikeyData, ServiceParams, CreateapikeyPatch> {
    constructor(public options: CreateapikeyServiceOptions) {
    }

    async create(data: CreateapikeyData, params?: ServiceParams): Promise<Createapikey> {
        //todo:  These are sync calls, convert them to async...
        const key = randomUUID()
        const keyhash = createHash('sha256').update(key).digest('hex')

        const cli = app.get('postgresqlClient')
        const res = await cli('apikey')
            .withSchema(app.get('dbschema'))
            .insert({ keyhash: keyhash, active: false })
            .returning('apikeyid')

        return {
            id: res[0].apikeyid,
            apikey: key
        }
    }
}

export const getOptions = (app: Application) => {
    return { app }
}
