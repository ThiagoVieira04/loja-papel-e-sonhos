const EmbeddedPostgres = require('embedded-postgres').default;

async function main() {
  const pg = new EmbeddedPostgres({
    databaseDir: './pgdata',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
  });

  await pg.initialise();
  await pg.start();
  console.log('PostgreSQL started on port 5432');

  await pg.createDatabase('papel_e_sonhos');
  console.log('Database papel_e_sonhos created');
}

main().catch(console.error);
