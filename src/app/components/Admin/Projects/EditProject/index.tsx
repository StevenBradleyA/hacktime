import type { Project, Images } from "@prisma/client";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { uploadFileToS3 } from "~/utils/aws";
import Image from "next/image";

interface EditProjectProps {
  project: Project;
  closeModal: () => void;
  images: Images[];
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
}

interface Image {
  link: string;
}

interface ProjectData {
  id: string;
  title: string;
  text: string;
  preview: { source: string; index: number };
  userId: string;
  deleteImageIds: string[];
  images: Image[];
}

export default function EditProjectModal({
  project,
  closeModal,
  images,
}: EditProjectProps) {
  const { data: session } = useSession();
  const ctx = api.useContext();

  const [title, setTitle] = useState<string>(project.title);
  const [text, setText] = useState<string>(project.text);
  const [preview, setPreview] = useState<{ source: string; index: number }>({
    source: "prev",
    index: 0,
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<ErrorsObj>({});
  const [enableErrorDisplay, setEnableErrorDisplay] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeDeletedImageIds, setActiveDeletedImageIds] = useState<string[]>(
    [],
  );

  const { mutate } = api.project.update.useMutation({
    onSuccess: () => {
      toast.success("Project Updated!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#ff0000",
        },
      });
      void ctx.project.getAll.invalidate();
      void ctx.image.getAllByResourceId.invalidate();
      closeModal();
    },
  });

  useEffect(() => {
    const maxFileSize = 8 * 1024 * 1024;
    const errorsObj: ErrorsObj = {};

    const totalImageCount =
      (imageFiles.length ?? 0) +
      (images?.length ?? 0) -
      (activeDeletedImageIds.length ?? 0);
    if (totalImageCount > 25) {
      errorsObj.imageExcess = "Cannot provide more than 25 photos";
    }

    if (totalImageCount < 5) {
      errorsObj.imageShortage = "Please provide at least 5 photos";
    }
    if (text.length < 1) {
      errorsObj.text = "Please provide a description of at least 200 words";
    }
    if (!title.length) {
      errorsObj.title = "Please provide a title";
    }

    for (const file of imageFiles) {
      if (file.size > maxFileSize) {
        errorsObj.imageLarge =
          "One or more images exceeds the max 8 MB file size";
        break;
      }
    }

    setErrors(errorsObj);
  }, [imageFiles, text, title, activeDeletedImageIds, images]);

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
          id: project.id,
          title,
          text,
          preview,
          userId: sessionUserId,
          images: [],
          deleteImageIds: activeDeletedImageIds,
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

  return (
    <div className=" flex flex-col items-center">
      <form className="flex w-full flex-col items-center">
        <div className="text-4xl"> Project Title </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className=" my-1 rounded-xl bg-black px-4 py-2 text-xl"
          placeholder="title"
        />
        {enableErrorDisplay && errors.title && (
          <p className="text-xl text-red-400">{errors.title}</p>
        )}

        <div className="mt-3 text-4xl"> Project Description </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className=" text-md my-1 h-60 w-96 rounded-xl bg-black px-6 py-2"
          placeholder="Description"
        ></textarea>

        {enableErrorDisplay && errors.text && (
          <p className="text-xl text-red-400">{errors.text}</p>
        )}

        <div className="mt-3 flex justify-center text-4xl text-red-600">
          H:// Execute Image Upload Protocol
        </div>
        <div className="py-4">
          <label className="relative flex justify-center">
            <input
              className="absolute h-full w-full cursor-pointer opacity-0"
              type="file"
              multiple
              // accept="image/png, image/jpg, image/jpeg"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files)
                  setImageFiles([...imageFiles, ...e.target.files]);
              }}
            />
            <button className="h-20 w-44 rounded-2xl bg-black">
              <span className="bg-black text-center text-red-600">
                Access Data Vessels
              </span>
            </button>
          </label>
        </div>
        <div className="mb-5 flex w-3/4 flex-wrap justify-center gap-10  ">
          {imageFiles.map((e, i) => (
            <div key={i} className="relative">
              <Image
                className={`h-28 w-auto cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                  preview.index === i && preview.source === "new"
                    ? "border-4 border-green-500"
                    : ""
                } `}
                alt={`listing-${i}`}
                src={URL.createObjectURL(e)}
                width={100}
                height={100}
                onClick={() => setPreview({ source: "new", index: i })}
              />
              <button
                className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  const newImageFiles = [...imageFiles];
                  newImageFiles.splice(i, 1);
                  setImageFiles(newImageFiles);
                  setPreview({ source: "new", index: 0 });
                }}
              >
                &times;
              </button>
            </div>
          ))}
          {images &&
            images.length > 0 &&
            images.map((image, i) =>
              !activeDeletedImageIds.includes(image.id) ? (
                <div key={i} className="relative">
                  <Image
                    className={`h-28 w-auto cursor-pointer rounded-lg object-cover shadow-sm hover:scale-105 hover:shadow-md ${
                      preview.index === i && preview.source === "prev"
                        ? "border-4 border-green-500"
                        : ""
                    } `}
                    alt={`listing-${i}`}
                    src={image.link}
                    width={100}
                    height={100}
                    onClick={() => setPreview({ source: "prev", index: i })}
                  />
                  <button
                    className="absolute right-[-10px] top-[-32px] transform p-1 text-2xl text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      const newDeletedImageIds = [
                        ...activeDeletedImageIds,
                        image.id,
                      ];
                      setActiveDeletedImageIds(newDeletedImageIds);
                      setPreview({ source: "prev", index: 0 });
                    }}
                  >
                    &times;
                  </button>
                </div>
              ) : null,
            )}
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
          <p className="text-xl text-red-400">{errors.imageShortage}</p>
        )}

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
          className={`rounded-2xl bg-black px-6 py-2 ${
            hasSubmitted ? "text-red-500" : ""
          } ${isSubmitting ? "text-red-500" : ""}`}
        >
          {isSubmitting ? "Uploading..." : "Submit"}
        </motion.button>
      </form>
    </div>
  );
}
