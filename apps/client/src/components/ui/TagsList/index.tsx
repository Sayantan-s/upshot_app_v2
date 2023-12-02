import { cloneElement, useState } from "react";
import { Props } from "./types";

export const TagsList = <
  TData extends { value: string; displayValue: string }
>({
  value,
  data,
  renderTemplate,
  className,
  onSelect,
  moreButton,
}: Props<TData>) => {
  const [tags, setTags] = useState<string[]>(() =>
    Array.isArray(value) && value.length ? value : []
  );

  const handleSelect = (itemValue: string) => {
    if (tags.includes(itemValue)) return;
    setTags((prevTags) => [...prevTags, itemValue]);
    onSelect?.([...tags, itemValue]);
  };

  return (
    <div className={className}>
      {data.map((item) =>
        cloneElement(
          renderTemplate({ ...item, active: tags.includes(item.value) }),
          {
            onClick: () => handleSelect(item.value),
          }
        )
      )}
      {moreButton || null}
    </div>
  );
};
