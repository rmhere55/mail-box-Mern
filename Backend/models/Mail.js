import mongoose, { Schema } from "mongoose";

const mailSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipients: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: Object,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
  },
  sendAt: {
    type: Date,
    required: true,
  },
});
export const Mail = mongoose.model("Mail", mailSchema);
