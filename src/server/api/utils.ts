import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env.mjs";

// npm install @aws-sdk/client-s3



const BUCKET_NAME = env.NEXT_PUBLIC_BUCKET_NAME;

const s3 = new S3Client({
    region: env.NEXT_PUBLIC_REGION,
    credentials: {
        accessKeyId: env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

const removeFileFromS3 = async (imageUrl: string): Promise<void> => {
    const key = imageUrl.split("/").pop();
    if (!key) throw new Error("No file key found.");

    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
    };

    try {
        const command = new DeleteObjectCommand(params);
        await s3.send(command);
    } catch (err) {
        throw err;
    }
};

export { removeFileFromS3 };
