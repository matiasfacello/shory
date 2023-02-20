import type { NextApiRequest, NextApiResponse } from "next";

const linkRes = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json({ status: "error" });
};

export default linkRes;
