import mongoose from "mongoose";
import Question from "../models/Question.js";

export const postanswer=async(req,res)=>{
    const {id:_id}=req.params;
    const {noofanswers,answerbody,useranswered,userid}=req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    updatenoofquestion(_id,noofanswers);
    try {
        const updatequestion=await Question.findByIdAndUpdate(_id,{
            $addToSet:{answer:[{answerbody,useranswered,userid}]},
        });
        res.status(200).json(updatequestion)
    } catch (error) {
        res.status(404).json({ message: "error in uploading" });
        return
    }
};
const updatenoofquestion=async(_id,noofanswers)=>{
    try {
        await Question.findByIdAndUpdate(_id,{
            $set:{noofanswers:noofanswers},
        });

    } catch (error) {
        console.log(error)
    }
}

export const deleteanswer=async(req,res)=>{
    const {id:_id}=req.params;
    const {answerid,noofanswers}=req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("question unavailable...");
    }
    if (!mongoose.Types.ObjectId.isValid(answerid)) {
        return res.status(404).send("answer unavailable...");
    }
    updatenoofquestion(_id,noofanswers);
    try {
        await Question.updateOne(
            {_id},
            {$pull:{answer:{_id:answerid}}}
        );
        res.status(200).json({message:"successfully deleted.."})
    } catch (error) {
        res.status(404).json({ message: "error in deleting.." });
        return
    }
}