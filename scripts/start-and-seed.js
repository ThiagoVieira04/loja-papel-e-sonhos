const { execSync } = require('child_process');
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

  console.log('Running prisma db push...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });

  console.log('Running seed...');
  execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });

  console.log('\nDatabase ready! Starting API...');

  // Keep process alive
  process.on('SIGINT', async () => {
    await pg.stop();
    process.exit(0);
  });
}

main().catch(console.error);
