import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import requestIp from "request-ip";
import geoip from "geoip-lite";

const linkRes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const detectedIp = requestIp.getClientIp(req) || "::ffff:127.0.0.1";
  const geoIp = detectedIp == "::ffff:127.0.0.1" ? geoip.lookup("190.227.13.2") : geoip.lookup(detectedIp);
  const saveIp = JSON.stringify(geoIp);

  console.log("Ip: ", detectedIp);
  console.log("GeoIp: ", geoIp);

  res.setHeader("Content-Type", "application/json");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    return res.json({ status: "error" });
  }

  const data = await prisma.sLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      id: true,
      url: true,
      slug: true,
      utm_campaign: true,
      utm_content: true,
      utm_medium: true,
      utm_source: true,
      utm_term: true,
    },
  });

  if (!data) {
    res.statusCode = 404;
    return res.json({ status: "error" });
  }

  const click = await prisma.sLinkClicks.create({
    data: {
      slug: data.slug,
      url: data.slug,
      linkId: data.id,
      ip: detectedIp,
      geo: saveIp,
    },
  });

  if (!click) {
    console.log("Err");
  }

  return res.json(data);
};

export default linkRes;
