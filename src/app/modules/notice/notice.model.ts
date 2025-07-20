import { Schema, model } from 'mongoose';
import { TNotice } from './notice.interface';

const NoticeSchema = new Schema<TNotice>(
  {
    notice: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const NoticeModal = model<TNotice>('Notice', NoticeSchema);
