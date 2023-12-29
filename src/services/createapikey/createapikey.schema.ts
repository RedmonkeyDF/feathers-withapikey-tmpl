// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CreateapikeyService } from './createapikey.class'

// Main data model schema
export const createapikeySchema = Type.Object(
    {
        id: Type.Number(),
        apikey: Type.String()
    },
    { $id: 'Createapikey', additionalProperties: false }
)
export type Createapikey = Static<typeof createapikeySchema>;
export const createapikeyValidator = getValidator(createapikeySchema, dataValidator)
export const createapikeyResolver = resolve<Createapikey, HookContext<CreateapikeyService>>({})

export const createapikeyExternalResolver = resolve<Createapikey, HookContext<CreateapikeyService>>({})

// Schema for creating new entries
export const createapikeyDataSchema = Type.Pick(createapikeySchema, [], {
    $id: 'CreateapikeyData'
})
export type CreateapikeyData = Static<typeof createapikeyDataSchema>;
export const createapikeyDataValidator = getValidator(createapikeyDataSchema, dataValidator)
export const createapikeyDataResolver = resolve<Createapikey, HookContext<CreateapikeyService>>({})

// Schema for updating existing entries
export const createapikeyPatchSchema = Type.Partial(createapikeySchema, {
    $id: 'CreateapikeyPatch'
})
export type CreateapikeyPatch = Static<typeof createapikeyPatchSchema>;
export const createapikeyPatchValidator = getValidator(createapikeyPatchSchema, dataValidator)
export const createapikeyPatchResolver = resolve<Createapikey, HookContext<CreateapikeyService>>({})

// Schema for allowed query properties
export const createapikeyQueryProperties = Type.Pick(createapikeySchema, [])
export const createapikeyQuerySchema = Type.Intersect(
    [
        querySyntax(createapikeyQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type CreateapikeyQuery = Static<typeof createapikeyQuerySchema>;
export const createapikeyQueryValidator = getValidator(createapikeyQuerySchema, queryValidator)
export const createapikeyQueryResolver = resolve<CreateapikeyQuery, HookContext<CreateapikeyService>>({})
