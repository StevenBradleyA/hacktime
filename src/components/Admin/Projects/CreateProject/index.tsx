import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { uploadFileToS3 } from "~/utils/aws";
import { motion } from "framer-motion";
import Image from "next/image";
import anon from "@public/Admin/admin-black.png";

interface CreateProjectProps {
  closeModal: () => void;
}
interface ErrorsObj {
  image?: string;
  imageExcess?: string;
  imageShortage?: string;
  imageLarge?: string;
  text?: string;
  title?: string;
  priceNone?: string;
  priceExcess?: string;
  link?: string;
}

interface Image {
  link: string;
}

interface ProjectData {
  title: string;
  text: string;
  preview: number;
  userId: string;
  link: string;
  images: Image[];
}

export default function CreateProject({ closeModal }: CreateProjectProps) {
  //todo ability to add edit update images for a project
  //todo add layout to Project

  const { data: session } = useSession();
  const ctx = api.useContext();

  //   const accessDenied = !session || !session.user.isVerified;

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [preview, setPreview] = useState<number>(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<ErrorsObj>({});
  const [enableErrorDisplay, setEnableErrorDisplay] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { mutate } = api.project.create.useMutation({
    onSuccess: () => {
      toast.success("Project Created!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#ff0000",
        },
      });
      void ctx.project.getAll.invalidate();
      closeModal();
    },
  });

  useEffect(() => {
    const maxFileSize = 8 * 1024 * 1024;
    const errorsObj: ErrorsObj = {};
    if (imageFiles.length > 25) {
      errorsObj.imageExcess = "Cannot provide more than 25 photos";
    }
    if (imageFiles.length < 5) {
      errorsObj.imageShortage = "Please provide at least 5 photos";
    }

    if (text.length < 1) {
      errorsObj.text = "Please provide a description of at least 200 words";
    }
    if (!title.length) {
      errorsObj.title = "Please provide a title";
    }
    if (!link.length) {
      errorsObj.link = "Please provide a link";
    }

    for (const file of imageFiles) {
      if (file.size > maxFileSize) {
        errorsObj.imageLarge =
          "One or more images exceeds the max 8 MB file size";
        break;
      }
    }

    setErrors(errorsObj);
  }, [imageFiles, text, title, link]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEnableErrorDisplay(true);

    if (!Object.values(errors).length && !isSubmitting) {
      try {
        const sessionUserId = session?.user?.id;

        if (!sessionUserId) {
          throw new Error("Session expired");
        }

        const data: ProjectData = {
          title,
          text,
          preview,
          link,
          userId: sessionUserId,
          images: [],
        };

        setIsSubmitting(true);

        const imagePromises = imageFiles.map((file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              if (typeof reader.result === "string") {
                const base64Data = reader.result.split(",")[1];
                if (base64Data) {
                  resolve(base64Data);
                }
              } else {
                reject(new Error("Failed to read file"));
              }
            };
            reader.onerror = () => {
              reject(new Error("Failed to read file"));
            };
          });
        });

        const base64DataArray = await Promise.all(imagePromises);
        const imageUrlArr: string[] = [];

        for (const base64Data of base64DataArray) {
          const buffer = Buffer.from(base64Data, "base64");
          const imageUrl = await uploadFileToS3(buffer);
          imageUrlArr.push(imageUrl);
        }

        data.images = imageUrlArr.map((imageUrl) => ({
          link: imageUrl || "",
        }));

        mutate(data);
        setImageFiles([]);
        setHasSubmitted(true);
        setIsSubmitting(false);
      } catch (error) {
        console.error("Submission failed:", error);
        setIsSubmitting(false);
      }
    }
  };

  //   if (accessDenied) {
  //     return <Custom404 />;
  //   }

  return (
    <div className=" desktop:h-[750px] relative flex h-[600px] w-[700px] flex-col overflow-auto text-red-600">
      <Image
        alt="admin logo"
        src={anon}
        className="png-red absolute left-0 top-0 w-12 object-contain "
      />
      <form className="mt-5 flex w-full flex-col gap-5">
        <label className="flex flex-col items-center text-4xl">
          PROJECT TITLE
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" mt-1 w-3/4 rounded-md bg-black px-4 py-2 text-xl"
            placeholder="title"
          />
        </label>
        {enableErrorDisplay && errors.title && (
          <p className="text-xl text-red-500">{errors.title}</p>
        )}
        <label className="flex flex-col items-center text-4xl">
          URL
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className=" mt-1 w-3/4 rounded-md bg-black px-4 py-2 text-xl"
            placeholder="link"
          />
        </label>
        {enableErrorDisplay && errors.link && (
          <p className="text-xl text-red-500">{errors.link}</p>
        )}
        <label className="flex flex-col items-center text-4xl">
          DESCRIPTION
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className=" mt-1 h-60 w-3/4 rounded-md bg-black px-6 py-2 text-lg"
            placeholder="Description"
          ></textarea>
        </label>
        {enableErrorDisplay && errors.text && (
          <p className="text-xl text-red-500">{errors.text}</p>
        )}
        <div className=" flex justify-center text-4xl">IMAGE UPLOAD</div>
        <label className="relative flex justify-center">
          <input
            className="absolute h-full w-3/4 cursor-pointer rounded-md  opacity-0"
            type="file"
            multiple
            // accept="image/png, image/jpg, image/jpeg"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files)
                setImageFiles([...imageFiles, ...e.target.files]);
            }}
          />
          <button className="bg-darkGray w-3/4 rounded-md p-5 text-2xl">
            CLICK ME
          </button>
        </label>
        <div className="mt-5 flex w-full flex-wrap justify-center gap-10  ">
          {imageFiles.map((e, i) => (
            <div key={i} className="relative">
              <Image
                className={`h-24 w-auto cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                  i === preview ? "border-4 border-green-500" : ""
                } `}
                alt={`listing-${i}`}
                src={URL.createObjectURL(e)}
                width={100}
                height={100}
                onClick={() => setPreview(i)}
              />
              <button
                className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  const newImageFiles = [...imageFiles];
                  newImageFiles.splice(i, 1);
                  setImageFiles(newImageFiles);
                  setPreview(0);
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        {errors.imageExcess && (
          <p className="create-listing-errors text-red-500">
            {errors.imageExcess}
          </p>
        )}
        {errors.imageLarge && (
          <p className="create-listing-errors text-red-500">
            {errors.imageLarge}
          </p>
        )}
        {enableErrorDisplay && errors.imageShortage && (
          <p className="text-xl text-red-500">{errors.imageShortage}</p>
        )}
        <div className="flex justify-center">
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              void submit(e);
            }}
            disabled={hasSubmitted || isSubmitting}
            className={`w-1/4 rounded-md border-2 border-red-500 px-6 py-2 text-xl hover:border-black hover:bg-black ${
              hasSubmitted ? "text-red-500" : ""
            } ${isSubmitting ? "text-red-500" : ""}`}
          >
            {isSubmitting ? "Uploading..." : "Submit"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
