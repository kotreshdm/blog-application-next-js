import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";

export const imageUpload = (file) => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      1280,
      720,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          // make a POST request to api to upload image
          const response = await fetch("/api/curd/uploads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: uri }),
          });

          if (!response.ok) {
            reject(new Error("Image upload failed"));
            toast.error("Image upload failed");
          } else {
            const data = await response.json();
            resolve(data?.url);
          }
        } catch (err) {
          reject(err);
        }
      },
      "base64"
    );
  });
};
