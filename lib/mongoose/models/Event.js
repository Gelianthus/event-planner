import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
	eventName: {
		type: String,
		default: "Inom tubig",
	},
	eventDesc: String,
	eventDate: {
		type: Date,
		min: new Date(Date.now() - 24 * 60 * 60 * 1000),
		expires: "1d",
	},
	inviteAll: Boolean,
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	interested: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

const Event =
	mongoose.models.Event || mongoose.model("Event", eventSchema, "events");

export default Event;
