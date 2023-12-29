import { Knex } from 'knex';
import { app } from '../src/app';
import * as dns from 'dns';

const dbschema = app.get('dbschema');
const tablename = 'apikey';

export async function up(knex: Knex): Promise<void> {

    await knex.schema.withSchema(dbschema).createTable(tablename, (table) => {

        table.increments('apikeyid', { primaryKey: true });
        table.string('keyhash', 64).notNullable().unique();
        table.boolean('active').defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {

    await knex.schema.withSchema(dbschema).dropTable(tablename);
}
