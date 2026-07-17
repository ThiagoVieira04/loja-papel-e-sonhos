const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const pgBin = path.join(__dirname, 'node_modules', '@embedded-postgres', 'windows-x64', 'native', 'bin');
const pgCtl = path.join(pgBin, 'pg_ctl.exe');
const pgData = path.join(__dirname, 'pgdata');
const pgLog = path.join(__dirname, 'pg.log');

const isInitialized = fs.existsSync(path.join(pgData, 'postgresql.conf'));

async function main() {
  if (!isInitialized) {
    console.log('Initializing PostgreSQL...');
    execSync(`"${path.join(pgBin, 'initdb.exe')}" -D "${pgData}" -U postgres --encoding=UTF8 --locale=pt_BR`, { stdio: 'inherit' });
  }

  console.log('Starting PostgreSQL...');
  const pg = spawn(pgCtl, ['-D', pgData, '-l', pgLog, 'start'], {
    stdio: 'pipe',
    detached: true,
  });

  pg.stdout.on('data', (d) => process.stdout.write(d));
  pg.stderr.on('data', (d) => process.stderr.write(d));

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Check if running
  try {
    const result = execSync(`"${pgCtl}" -D "${pgData}" status`, { encoding: 'utf8' });
    console.log(result);
  } catch (e) {
    console.log('Status check failed, trying to continue anyway...');
  }

  // Create database
  const createdb = path.join(pgBin, 'createdb.exe');
  try {
    execSync(`"${createdb}" -U postgres papel_e_sonhos`, { stdio: 'inherit' });
    console.log('Database created');
  } catch (e) {
    console.log('Database may already exist, continuing...');
  }

  console.log('Running prisma db push...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', cwd: __dirname });

  console.log('Running seed...');
  execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit', cwd: __dirname });

  console.log('\n✅ Database ready! Starting API...');
  execSync('node dist/main.js', { stdio: 'inherit', cwd: __dirname });
}

main().catch(console.error);
