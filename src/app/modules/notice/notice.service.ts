import { TNotice } from "./notice.interface";
import { NoticeModal } from "./notice.model";


const CreateNoticeDB = async (payload: TNotice) => {
    const result = await NoticeModal.create(payload);
    return result;
} 
const AllNoticeDB = async () => {
  const result = await NoticeModal.find()
    .sort({ createdAt: -1 })     // descending order (latest first)
    .limit(2)                    // only 2 documents
    .select({ _id: 1, notice: 1 });  // only return _id and notice fields
  return result;
}



export const NoticeServices = {
    CreateNoticeDB,
    AllNoticeDB
}