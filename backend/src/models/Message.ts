import mongoose, { Document, Schema } from 'mongoose';

// Interface for Message document
export interface IMessage extends Document {
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Message schema
const MessageSchema: Schema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export default mongoose.model<IMessage>('Message', MessageSchema); 