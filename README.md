## packages:
ts-node: Typescript defination for node
@prisma/client: An auto-generated and type-safe query builder that’s tailored to your data.

## Prisma command 
Step1:  npm i --save-dev prisma
Step2:  npx prisma init --datasource-provider postgresql
        Next steps:
        1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
        2. Run prisma db pull to turn your database schema into a Prisma schema.
        3. Run prisma generate to generate the Prisma Client. You can then start querying your database.
        4. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

        More information in our documentation:
        https://pris.ly/d/getting-started


## How to use

Install npm dependencies:
```
npm install
```
### 2. Set up Supabase

Create a `.env` file at the root of your folder. Copy and update the following environment variables in the `.env` file:

```sh
# .env
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>"
```
DATABASE_URL="" # Set this to the Transaction connection pooler string 
DIRECT_URL=""  # Set this to the Session connection pooler string

Transaction mode is used for application queries and Session mode is used for running migrations with Prisma.


### Create the database 
Run the following command to create a migration file with the SQL necessary to create the database schema:

```
npx prisma migrate dev --name init
```
https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model#what-is-prisma-migrate



### Seed the database
 need to execute the [seed](./prisma/seed.ts) script to seed your database. You can do that using the following command:

```
npx prisma db seed
```
