import { NextResponse } from "next/server";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import Event from "@/lib/mongoose/models/Event";
import Mailgun from "mailgun.js";
import FormData from "form-data";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	try {
		const event = await Event.findById(id)
			.populate("createdBy")
			.populate("interested");

		if (event) {
			return NextResponse.json({ event: event }, { status: 200 });
		} else {
			return NextResponse.json({ message: "Event not found" }, { status: 404 });
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch event data" },
			{ status: 500 }
		);
	}
}

export async function POST(req, res) {
	await mongoConnection();
	const emailList = process.env.VALID_EMAILS.split(","); // list of emails addresses
	const api_key = process.env.MAILGUN_API_KEY; // variable for api key
	const domain = process.env.MAILGUN_DOMAIN; // variable for domain
	const mailgun = new Mailgun(FormData);
	const mg = mailgun.client({ username: "api", key: api_key });

	const { userId, eventName, eventDesc, eventDate, inviteAll } =
		await req.json();

	const filteredEmail = () => {
		if (inviteAll) {
			return emailList.join(", ");
		} else {
			return emailList
				.filter((emailAddress) => {
					return emailAddress !== "greedygamer04@gmail.com";
				})
				.join(", ");
		}
	};

	const messageData = {
		from: "tandoc.angelonathaniel.p@gmail.com",
		to: filteredEmail(),
		subject: eventName,
		text: `${eventDesc}, ${eventDate}`,
	};

	try {
		const newEvent = await Event.create({
			eventName: eventName,
			eventDesc: eventDesc,
			eventDate: eventDate,
			inviteAll: inviteAll,
			createdBy: userId,
			interested: [userId],
		});

		const sendEmail = await mg.messages.create(domain, messageData);

		if (newEvent && sendEmail) {
			const allEvents = await Event.find().populate("createdBy");
			if (allEvents) {
				return NextResponse.json(
					{ allEvents: allEvents, message: "Event created" },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Failed to create an event" },
					{ status: 500 }
				);
			}
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to create event, from route" },
			{ status: 500 }
		);
	}
}

// updating details
export async function PUT(req, res) {
	await mongoConnection();
}

export async function DELETE(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const eventId = searchParams.get("eventId");
	const userId = searchParams.get("userId");

	try {
		const deletedEvent = await Event.findByIdAndDelete(eventId);

		if (deletedEvent) {
			const yourEvents = await Event.find({ createdBy: userId })
				.populate("createdBy")
				.populate("interested");
			if (yourEvents) {
				return NextResponse.json(
					{ yourEvents: yourEvents, message: "Event deleted!" },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{ message: "Failed to fetch events" },
					{ status: 500 }
				);
			}
		} else {
			return NextResponse.json(
				{ message: "Failed to delete event" },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to delete event" },
			{ status: 500 }
		);
	}
}
