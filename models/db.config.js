require('dotenv').config();
// console.log(process.env.TOKEN_SECRET);

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
        // multipleStatements: true
    }
})

knex.schema.createTable('saral_api', table => {
    table.increments('id');
    table.string('name');
    table.string('logo');
    table.string('notes');
    table.string('days_to_complete');
    table.string('short_description');
    table.string('type');
    table.string('course_type');
    table.string('lang_available');
})
.then(() => {
    console.log('Table created');
    
}).catch((err) => {
    console.log(`\n${err.sqlMessage}\n`);
});

const knex2 = require('knex')({
    client: "mysql",
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

knex2.schema.createTable('loginSignup', table2 => {
    table2.increments('id');
    table2.string('name');
    table2.string('email');
    table2.string('password');
})
.then((result) => {
    console.log('The loginSignup table is created.')
}).catch((err) => {
    console.log(`${err.sqlMessage}\n`);
});




module.exports = {knex, knex2};