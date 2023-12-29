// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex';
import { app } from '../src/app';

const dbschema = app.get('dbschema');
const tablename = 'user';

export async function up(knex: Knex): Promise<void> {

    await knex.schema.withSchema(dbschema).createTable(tablename, (table) => {

        table.increments('userid', { primaryKey: true });
        table.string('email', 50).unique();
        table.string('password', 100).notNullable();
        table.boolean('active').notNullable().defaultTo(false);
        table.string('firstname', 200);
        table.string('lastname', 200);
    });
}

export async function down(knex: Knex): Promise<void> {

    await knex.schema.withSchema(dbschema).dropTable(tablename);
}
