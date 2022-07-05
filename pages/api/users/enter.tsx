import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      name: string;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email } = req.body;
  let user;
  if (email) {
    user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.log("Did not found. Will create");
      await db.user.create({
        data: {
          name,
          email,
        },
      });
    }
    req.session.user = {
      name,
    };
    await req.session.save();
    console.log(req.session);
    console.log(user);
  }
  return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotSession",
  password: "1232131223313231223131212313212312312213432414fadfsdafdasfds34",
});
