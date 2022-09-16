import { handleError, handleUploadError } from "@helpers";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { classNames } from "utils";

interface IAvatarUpload {
  handleImage: (file: File) => void;
  avatar?: string;
}

const AvatarUpload: React.FC<IAvatarUpload> = ({ handleImage, avatar }) => {
  const baseStyle = useMemo(
    () => ({
      borderWidth: 2,
      width: "68px",
      height: "68px",
      borderRadius: "50%",
      borderStyle: "dashed",
      backgroundColor: "transparent",
      color: "#bdbdbd",
      transition: "border .3s ease-in-out",
    }),
    []
  );

  const activeStyle = useMemo(
    () => ({
      borderColor: "#2196f3",
    }),
    []
  );

  const acceptStyle = useMemo(
    () => ({
      borderColor: "#00e676",
    }),
    []
  );

  const rejectStyle = useMemo(
    () => ({
      borderColor: "#ff1744",
    }),
    []
  );

  const [files, setFiles] = useState<Blob[] | string[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setLoading(true);
      setLoading(true);
      if (acceptedFiles.length !== 0) {
        const formData = new FormData();
        formData.append("avatar", acceptedFiles[0], acceptedFiles[0].name);
        setFiles(
          acceptedFiles.map((file: Blob | MediaSource) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        handleImage(acceptedFiles[0]);
        setLoading(false);
      }
    },
    [handleImage]
  );

  const onDropRejected = (fileRejections: FileRejection[]) => {
    handleUploadError(fileRejections[0]);
    setLoading(false);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropRejected,
    // accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    maxSize: 300 * 1024, // 300KB
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [
      baseStyle,
      isDragActive,
      activeStyle,
      isDragAccept,
      acceptStyle,
      isDragReject,
      rejectStyle,
    ]
  );

  const thumbs = files.map((file: any) => (
    <div key={file.name}>
      <img
        className=" h-16 w-16 rounded-full object-cover object-center"
        src={file.preview}
        alt={file.name}
      />
    </div>
  ));

  const deleteAvatar = () => {
    if (files.length !== 0) {
      setFiles([]);
    }
  };

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <div className="mt-1 flex items-center">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div
          className={classNames(
            !loading
              ? "bg-transparent opacity-0 hover:bg-gray-400 hover:opacity-100"
              : "bg-gray-400 opacity-100",
            "absolute flex h-16 w-16 cursor-pointer content-center items-center justify-center rounded-full text-center text-xs text-gray-300"
          )}
        >
          {!loading ? "Drag or Drop Image" : "Loading..."}
        </div>
        <aside>{thumbs}</aside>
        {thumbs.length === 0 && (
          <span className="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100">
            {avatar ? (
              <img
                className=" h-16 w-16 rounded-full object-cover object-center"
                src={avatar}
                alt="avatar"
              />
            ) : (
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={deleteAvatar}
        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Remove
      </button>
    </div>
  );
};

export { AvatarUpload };
