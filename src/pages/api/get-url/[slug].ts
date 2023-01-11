import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../server/db";

const linkRes = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Slug err" }));

    return;
  }

  const data = await prisma.sLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Slug err" }));

    return;
  }

  return res.json(data);
};

export default linkRes;
