import * as express from "express";

import factureModel from "../shema/model/facture";

const userRouter = express.Router();

userRouter.post(
  "/facture/create",
  async (req: express.Request, res: express.Response) => {
    console.log("req", req?.body);

    const facture = await factureModel.create({
      ...req.body,
    });
    await facture.save();

    try {
      res.status(200).send({
        data: facture,
        success: true,
        status: 200,
        message: "facture",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Failed to create facture",
      });
    }
  }
);

export default userRouter;
