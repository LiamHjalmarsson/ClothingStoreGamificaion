import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dx6tdy5de/image/upload/v1710247670/dl-clothing/kzifiwkrz73k6bx4qpv2.jpg",
        },
        itemCount: {
            type: Number,
            default: 0,
        },
        imageId: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);