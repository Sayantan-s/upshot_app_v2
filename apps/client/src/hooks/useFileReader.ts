import { useCallback, useState } from "react";

type HookType = [
  string | null,
  {
    handleReadImageFile: (file: File) => Promise<void>;
  }
];

export const useReadImage = (): HookType => {
  const [image, setImage] = useState<string | null>(null);

  const handleRead = useCallback((e: ProgressEvent<FileReader>) => {
    if (e.target?.result) setImage(e.target.result as string);
  }, []);

  const handleReadImageFile = async (file: File) => {
    const reader = new FileReader();
    reader.addEventListener("load", handleRead);
    await reader.readAsDataURL(file);
    // reader.removeEventListener("load", handleRead);
  };

  return [image, { handleReadImageFile }];
};
