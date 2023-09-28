import * as express from "express";

import getlocataires from "./getlocataires";
import createLocataire from "./createLocataire";
import createFacture from "./createFacture";
import getFacture from "./getFacture";
const route = express.Router();

route.get("/router", (_: express.Request, res: express.Response) =>
  res.status(200).send({ status: "api is ok" })
);
route.use("/", getlocataires);
route.use("/", createLocataire);
route.use("/", createFacture);
route.use("/", getFacture);

export default route;
