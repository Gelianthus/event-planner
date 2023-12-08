import { NextResponse } from "next/server";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import Event from "@/lib/mongoose/models/Event";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	try {
		const events = await Event.find({ createdBy: id });
		return NextResponse.json({ events: events }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "An error has occured" },
			{ status: 500 }
		);
	}
}
