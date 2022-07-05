import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";
import db from "../../../lib/server/db";
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      name: string;
    };
  }
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const profile = db.user.findUnique({
    where: { name: req.session.user?.name },
  });
  console.log(profile);
  res.json({
    ok: true,
    profile,
  });

  return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotSession",
  password: "1232131223313231223131212313212312312213432414fadfsdafdasfds34",
});
