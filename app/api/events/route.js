import { NextResponse } from "next/server";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import Event from "@/lib/mongoose/models/Event";

export async function GET() {
	await mongoConnection();
	try {
		const events = await Event.find().populate("createdBy");
		return NextResponse.json({ events: events }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ status: 500 });
	}
}
