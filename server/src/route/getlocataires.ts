import * as express from "express";

import houseHolder from "../shema/model/houseHolderSchema";
import factureModel from "../shema/model/facture";

const userRouter = express.Router();

userRouter.get(
  "/product/:id",
  async (req: express.Request, res: express.Response) => {
    const { id } = req.params;

    const houseHolders = await houseHolder.find({ produitId: id });

    const newHouse = await Promise.all(
      JSON.parse(JSON.stringify(houseHolders)).map(async (item) => {
        return {
          ...item,
          factures: (await factureModel.find({ locataireId: item?._id })) ?? [],
        };
      })
    );

    try {
      res.status(200).send({
        data: newHouse,
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
