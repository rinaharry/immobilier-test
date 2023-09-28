import mongoose from "mongoose";

const houseHolderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  andress: { type: String, required: true },
  produitId: { type: String, required: true },
  codepostal: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export default mongoose.model("householders", houseHolderSchema);
