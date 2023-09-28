import * as express from "express";

import factureModel from "../shema/model/facture";

const userRouter = express.Router();

userRouter.get(
  "/facture/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const houseHolder = await factureModel.findOne({ locataireId: id });
    try {
      res.status(200).send({
        data: houseHolder,
        success: true,
        status: 200,
        message: "user",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Failed to get user",
      });
    }
  }
);

export default userRouter;
