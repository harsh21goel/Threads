import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text:{
        type: String,
        maxlenght:500
    },
    img:{
        type: String
    },
    likes:{
        type: Number,
        default: 0
    },
    replies:[
        {
            userid:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            text:{
                type: String,
                required: true
            },
            userProfilepic:{
                type: String,
            },
            userName:{
                type: String
            }
        }
    ]
},{
    timestamps: true
})

const Post = mongoose.model("Post", postSchema);

export default Post;