import * as express from "express";

import houseHolderModel from "../shema/model/houseHolderSchema";

const userRouter = express.Router();

userRouter.post(
  "/locataire/create",
  async (req: express.Request, res: express.Response) => {
    console.log("req", req?.body);

    const { id } = req.body;
    const locataire = await houseHolderModel.create({
      ...req.body,
    });

    await locataire.save();

    try {
      res.status(200).send({
        data: locataire,
        success: true,
        status: 200,
        message: "locataire",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Failed to create locataire",
      });
    }
  }
);

export default userRouter;
