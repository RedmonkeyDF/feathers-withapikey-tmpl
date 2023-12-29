import { Knex } from 'knex';
import { app } from '../src/app';

const dbschema = app.get('dbschema');

export async function up(knex: Knex): Promise<void> {

    await knex.schema.createSchema(dbschema);
}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropSchema(dbschema);
}

