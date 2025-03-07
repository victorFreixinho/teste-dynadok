import { Schema, model } from "mongoose";
import { CustomerEntity } from "./CustomerEntity";

const CustomerSchema = new Schema<CustomerEntity> (
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const CustomerModel = model<CustomerEntity>("Customer", CustomerSchema);
export { CustomerModel };