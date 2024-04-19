import { Code } from '@client/components/icons/Code';
import { BubbleMenu } from '@tiptap/react';
import { Icon, TextBold, TextItalic, TextUnderline } from 'iconsax-react';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { IEditorBubbleMenuProps } from './type';

export const EditorBubbleMenu: FC<IEditorBubbleMenuProps> = ({
  editor,
  show,
}) => {
  const handleBold = () => {
    editor.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor.chain().focus().toggleItalic().run();
  };

  const handleUnderline = () => {
    editor.chain().focus().toggleUnderline().run();
  };

  const handleCode = () => {
    editor.chain().focus().toggleCode().run();
  };

  return show ? (
    <BubbleMenu
      editor={editor}
      className="bg-gray-900/95 backdrop-blur-xl shadow-lg space-x-2 flex shadow-gray-900/20 text-gray-50 px-2 py-1.5 rounded-md"
    >
      <BubbleMenuButton
        icon={TextBold}
        color="#f8fafc"
        activeColor="white"
        isActive={editor.isActive('bold')}
        onClick={handleBold}
        activeClassName="bg-gray-400/30"
      />
      <BubbleMenuButton
        icon={TextItalic}
        color="#f8fafc"
        activeColor="white"
        isActive={editor.isActive('italic')}
        onClick={handleItalic}
        activeClassName="bg-gray-400/30"
      />
      <BubbleMenuButton
        icon={TextUnderline}
        color="#f8fafc"
        activeColor="white"
        isActive={editor.isActive('underline')}
        onClick={handleUnderline}
        activeClassName="bg-gray-400/30"
      />
      <BubbleMenuButton
        icon={Code}
        color="#f8fafc"
        activeColor="white"
        isActive={editor.isActive('code')}
        onClick={handleCode}
        activeClassName="bg-gray-400/30"
      />
    </BubbleMenu>
  ) : null;
};

export interface IBubbleMenuButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: Icon;
  isActive: boolean;
  color: string;
  activeColor: string;
  className?: string;
  activeClassName?: string;
}

const BubbleMenuButton: FC<IBubbleMenuButton> = ({
  icon: Icon,
  isActive,
  color,
  activeColor,
  className,
  activeClassName,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={twMerge(
        'w-6 h-6 flex items-center justify-center rounded-md',
        isActive ? activeClassName : className
      )}
      type="button"
    >
      <Icon size={14} color={isActive ? activeColor : color} strokeWidth="2" />
    </button>
  );
};
