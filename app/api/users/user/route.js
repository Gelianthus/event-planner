import { NextResponse } from "next/server";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import User from "@/lib/mongoose/models/User";

export async function GET(req, res) {
	const { searchParams } = new URL(req.url);
	const useremail = searchParams.get("useremail");
	await mongoConnection();
	try {
		const user = await User.findOne({
			email: useremail,
		});
		return NextResponse.json({ user: user }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ status: 404 });
	}
}
