import React from "react";
import InputField from "../form/input/InputField";
import { PostType } from "@/utils/context/DashboardContext";
import { PostErrorType } from "../../interface/interfaces";

export default function PostForm({
  post,
  onChange,
  readOnly = false,
  error,
  setError,
  initialErrorState,
}: {
  post: PostType;
  onChange: (c: PostType) => void;
  readOnly?: boolean;
  error: PostErrorType;
  setError: (val: PostErrorType) => void;
  initialErrorState: PostErrorType;
}) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...post, name: e.target.value });
    setError(initialErrorState);
  };

  return (
    <form className='flex flex-col gap-4'>
      <InputField
        label={"Post Name:"}
        value={post.name ?? ""}
        onChange={handleNameChange}
        id='post-name'
        required
        readOnly={readOnly}
        error={error.name}
      />
    </form>
  );
}
