// pages/api/cloudinary-signature/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  res.status(200).json({ timestamp, signature });
}
