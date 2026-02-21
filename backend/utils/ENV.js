import dotenv from "dotenv";
dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db_name: process.env.DB_NAME,
  },
  jwt: process.env.JWT_SECRET,
  node: process.env.NODE_ENV,
};

export default ENV;
