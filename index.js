import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import database from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: database,
});

(async () => {
  await database.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);

app.get("/", (req, res) => {
  res.send("<h1>Backend</h1>");
});

store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});