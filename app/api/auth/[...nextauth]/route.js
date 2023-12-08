import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import User from "@/lib/mongoose/models/User";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			try {
				await mongoConnection();
				const profileExist = await User.findOne({
					email: user.email,
				});
				const isRecognized = process.env.VALID_EMAILS.split(",").includes(
					user.email
				);

				if (!isRecognized) {
					return false;
				}

				if (!profileExist && isRecognized) {
					await User.create({
						email: user.email,
						username: user.name,
						profile_img: user.image,
					});
					return true;
				}
				return true;
			} catch (error) {
				return false;
			}
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
