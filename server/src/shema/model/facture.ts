import mongoose from "mongoose";

const factureSchema = new mongoose.Schema({
  currency: { type: String, required: true },
  dueDate: { type: String, required: true },
  locataireId: { type: String, required: true },
});

export default mongoose.model("factures", factureSchema);
