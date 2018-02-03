import * as bodyParser from "body-parser";
import * as express from "express";
import * as passport from "passport";

import requestLogger from "../middleware/requestLogger";
import registerRoutes from "./router";
const app = express();

app.set("host", "0.0.0.0");
app.set("port", process.env.SERVER_PORT || 8080);
app.set("secret", process.env.APP_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

if (app.get("env") === "development") {
  app.use(requestLogger);
}

registerRoutes(app);

export default app;
