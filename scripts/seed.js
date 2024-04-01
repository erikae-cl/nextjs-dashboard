const { db } = require('@vercel/postgres');
const {
  portfolios,
  impactportfolios,
  invoices,
  customers,
  revenue,
  users
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedPortfolios(client){
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS portfolios (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nonprofit1 VARCHAR(255) NOT NULL,
        nonprofit2 VARCHAR(255) NOT NULL,
        nonprofit3 VARCHAR(255) NOT NULL,
        weight1 INT NOT NULL,
        weight2 INT NOT NULL,
        weight3 INT NOT NULL
      );
    `;
    console.log(`Created "portfolios" table`);
    const insertedPortfolios = await Promise.all(
      portfolios?.map(async (portfolio) => {
        return client.sql`
        INSERT INTO portfolios (id, name, nonprofit1, nonprofit2, nonprofit3, weight1, weight2, weight3)
        VALUES (${portfolio.id}, ${portfolio.name}, ${portfolio.nonprofit1}, ${portfolio.nonprofit2}, ${portfolio.nonprofit3}, ${portfolio.weight1}, ${portfolio.weight2}, ${portfolio.weight3})
        ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedPortfolios.length} portfolios`);

  return {
    createTable,
    portfolios: insertedPortfolios,
  };
} catch (error) {
  console.error('Error seeding users:', error);
  throw error;
}
}

async function seedImpactPortfolios(client){
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS impactportfolios (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nonprofit1 VARCHAR(255) NOT NULL,
        nonprofit2 VARCHAR(255) NOT NULL,
        nonprofit3 VARCHAR(255) NOT NULL,
        weight1 INT NOT NULL,
        weight2 INT NOT NULL,
        weight3 INT NOT NULL
      );
    `;
    console.log(`Created "impactportfolios" table`);
    const insertedImpactPortfolios = await Promise.all(
      impactportfolios?.map(async (impactPortfolio) => {
        return client.sql`
        INSERT INTO impactportfolios (id, name, nonprofit1, nonprofit2, nonprofit3, weight1, weight2, weight3)
        VALUES (${impactPortfolio.id}, ${impactPortfolio.name}, ${impactPortfolio.nonprofit1}, ${impactPortfolio.nonprofit2}, ${impactPortfolio.nonprofit3}, ${impactPortfolio.weight1}, ${impactPortfolio.weight2}, ${impactPortfolio.weight3})
        ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${insertedImpactPortfolios.length} impact portfolios`);

  return {
    createTable,
    impactPortfolios: insertedImpactPortfolios,
  };
} catch (error) {
  console.error('Error seeding users:', error);
  throw error;
}
}
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedPortfolios(client);
  await seedImpactPortfolios(client);
  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
