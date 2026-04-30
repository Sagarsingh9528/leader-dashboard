import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: String,
    mobile: String,
    email: String,
    city: String,
    service: String,
    budget: Number,
    status: {
      type: String,
      enum: ["New", "Interested", "Converted", "Rejected"],
      default: "New",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);