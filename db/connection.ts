import { Sequelize } from "sequelize";

const db = new Sequelize( 'cursonode', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
})

export default db;