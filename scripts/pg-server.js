const EmbeddedPostgres = require('embedded-postgres').default;

async function main() {
  const pg = new EmbeddedPostgres({
    databaseDir: './pgdata',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
  });

  await pg.start();
  console.log('PostgreSQL running on port 5432...');
}

main().catch(console.error);
