import { Sequelize } from 'sequelize';

const db = new Sequelize('Cashier', "root", "" ,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: "Asia/Bangkok",
    dialectOptions: {
        charset: "utf8_unicode_ci",
        dateStrings: true,
        timezone: "local",
        typeCast: function (field: any, next: any) {
          if (field.type === 'DATETIME') {
            return field.string()
          }
          return next()
        },
      },
      pool: {
        max: 10,
        min: 1,
        acquire: 30000,
        idle: 10000,
      }
});

export const databseConnection = async () =>{
  await db.sync();

  console.log("database is connected");
}

export const forceDatabse = async () => {
  db.sync({ force: true }).then(() => {
      console.log("Drop and Resync Db");
    });
}
export default db;