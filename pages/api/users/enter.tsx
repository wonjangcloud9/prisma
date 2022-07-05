import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler from "../../../lib/server/withHandler";

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
      await db.user.create({
        data: {
          name,
          email,
        },
      });
    }
    console.log(user);
  }
  return res.status(200).end();
}

export default withHandler("POST", handler);
