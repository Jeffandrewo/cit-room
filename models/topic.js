import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema (
    {
        roomNo: {
            type: String,
            required: true,
          },
          subject: {
            type: String,
            required: true,
          },
          instructor: {
            type: String,
            required: true,
          },
          classSection: {
            type: String,
            required: true,
          },
          buildingName: {
            type: String,
            required: true,
          },
          floorNumber: {
            type: String,
            required: true,
          },
          startDate: {
            type: Date,
            required: true,
          },
          endDate: {
            type: Date,
            required: true,
          },

    },
    {
        timestamps: true,
    }
)

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;