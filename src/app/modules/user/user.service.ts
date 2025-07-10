import { userModel } from "./user.model"



const getBookmarkDB = async (userId: string) => {
    const result = await userModel.findById(userId)
    .select('bookmark')
    .populate('bookmark')

    return result?.bookmark;
};

const addBookmarkDB = async (userId: string, jobId: string) => {

  const result = await userModel.updateOne(
    {_id:userId},
    { $addToSet: { bookmark: jobId } },
  );

  return result;
};

const removeBookmarkDB = async (userId: string, jobId: string) => {
  const result = await userModel.updateOne(
     {_id:userId},
    { $pull: { bookmark: jobId } },
    { new: true }
  );

  return result;
};


export const userServices = {
    getBookmarkDB,
    addBookmarkDB,
    removeBookmarkDB
}