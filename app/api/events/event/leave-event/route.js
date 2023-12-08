import { NextResponse } from "next/server";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import Event from "@/lib/mongoose/models/Event";

export async function PUT(req, res) {
	await mongoConnection();
	const { userId, eventId } = await req.json();
	try {
		const theEvent = await Event.findById(eventId);

		if (theEvent.interested.length === 1) {
			await Event.findByIdAndDelete(eventId);
			return NextResponse.json({ status: 200 });
		}
		const event = await Event.findByIdAndUpdate(
			eventId,
			{ $pull: { interested: userId } },
			{ new: true }
		)
			.populate("createdBy")
			.populate("interested");

		if (!event) {
			return NextResponse.json(
				{ message: "Failed to update event" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ event: event }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Failed to update event" },
			{ status: 500 }
		);
	}
}
