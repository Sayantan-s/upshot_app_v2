import { Close } from '@client/components/icons';
import { FC, useState } from 'react';
import { closeButtonStyles, fileNameStyles, styles } from './styles';
import { Props } from './types';

export const ImagePanel: FC<Props> = ({
  className,
  variant,
  src,
  alt,
  fileName,
  onRemoveImage,
}) => {
  const [imageUrl, setImageUrl] = useState(src);

  const handleRemoveImage: React.MouseEventHandler<HTMLButtonElement> = (
    eve
  ) => {
    eve.stopPropagation();
    setImageUrl('');
    onRemoveImage();
  };

  return (
    <div className={styles({ className, variant })}>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px] relative rounded-full overflow-hidden">
          <img
            src={imageUrl}
            alt={alt}
            className="absolute left-0 top-0 object-cover w-full h-full"
          />
        </div>
        <p className={fileNameStyles({ variant, className: 'truncate' })}>
          {fileName}
        </p>
      </div>
      <button onClick={handleRemoveImage}>
        <Close size={12} className={closeButtonStyles({ variant })} />
      </button>
    </div>
  );
};
