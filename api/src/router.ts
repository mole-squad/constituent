import { Router } from "express";

import AuthRouter from "./routes/auth";
import UserRouter from "./routes/user";

export default function registerRoutes(app) {
  app.use("/auth", AuthRouter);
  app.use("/users", UserRouter);
}
