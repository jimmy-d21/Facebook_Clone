import { v2 as cloudinary } from "cloudinary";
import ENV from "../utils/ENV.js";

cloudinary.config({
  cloud_name: ENV.cloudinary.cloud_name,
  api_key: ENV.cloudinary.cloud_api_key,
  api_secret: ENV.cloudinary.cloud_secret_key,
});

export default cloudinary;
