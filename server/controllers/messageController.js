const AsyncHandler = require("express-async-handler");
const Message = require("./../models/messageModel")
const Chat = require("./../models/chatModel")

exports.sendMessage=AsyncHandler(async (req,res)=>{
    const {content, chatId}=req.body;

    if(!content || !chatId){
        
        return res.sendStatus(400).json({
            status:"failed",
            message:"No content or chatId provided"
        });
    }

    let newMessage={
        sender: req.user._id,
        content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage);

        message = await (
            await message.populate("sender", "name pic")
        ).populate({
            path: "chat",
            select: "chatName isGroupChat users",
            model: "Chat",
            populate: { path: "users", select: "name email profilePicture", model: "User" },
        });

        await Chat.findByIdAndUpdate(chatId,{
            latestMessage: message,
        })

        res.status(201).json({
            status:"success",
            data:{
                message,
            }
        })
    } catch (err) {
        res.status(201).json({
            status:"error",
            message: err.message,
            err,
        })
    }
})

exports.allMessages=AsyncHandler(async (req,res)=>{
    const chatId=req.params.chatId;

    try {
        const messages=await Message.find({chat: chatId}).populate("sender","name pic email").populate("chat");
        
        res.status(200).json({
            status:"success",
            data:{
                messages,
            }
        })
    } catch (err) {
        res.status(400).json({
            status:"error",
            message:err.message,
            err
        })
    }
})