import { Check } from '@client/components/icons/Check';
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

  const handleChangeColor = (hex: string) => {
    console.log(hex);
    editor.chain().focus().setColor(hex).run();
  };

  return show ? (
    <BubbleMenu
      editor={editor}
      className="bg-black backdrop-blur-xl shadow-lg space-x-2 flex items-center shadow-gray-900/20 text-gray-50 px-2 py-1.5 rounded-lg"
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
      <BubbleMenuButton
        color="#34d399"
        activeColor="white"
        className="bg-emerald-400"
        isActive={editor.isActive('textStyle', { color: '#34d399' })}
        onClick={() => handleChangeColor('#34d399')}
      />
      <BubbleMenuButton
        color="#10b981"
        activeColor="white"
        className="bg-emerald-500"
        isActive={editor.isActive('textStyle', { color: '#10b981' })}
        onClick={() => handleChangeColor('#10b981')}
      />
      <BubbleMenuButton
        color="#065f46"
        activeColor="white"
        className="bg-emerald-800"
        isActive={editor.isActive('textStyle', { color: '#065f46' })}
        onClick={() => handleChangeColor('#065f46')}
      />
      <BubbleMenuButton
        color="#9ca3af"
        activeColor="white"
        className="bg-gray-400"
        isActive={editor.isActive('textStyle', { color: '#9ca3af' })}
        onClick={() => handleChangeColor('#9ca3af')}
      />
      <BubbleMenuButton
        color="#6b7280"
        activeColor="white"
        className="bg-gray-500"
        isActive={editor.isActive('textStyle', { color: '#6b7280' })}
        onClick={() => handleChangeColor('#6b7280')}
      />
      <BubbleMenuButton
        color="#1f2937"
        activeColor="white"
        className="bg-gray-800"
        isActive={editor.isActive('textStyle', { color: '#1f2937' })}
        onClick={() => handleChangeColor('#1f2937')}
      />
    </BubbleMenu>
  ) : null;
};

export interface IBubbleMenuButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: Icon;
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
  return Icon ? (
    <button
      {...rest}
      className={twMerge(
        'w-6 h-6 flex items-center justify-center rounded-md hover:bg-gray-500/20',
        isActive ? activeClassName : className
      )}
      type="button"
    >
      <Icon size={14} color={isActive ? activeColor : color} strokeWidth="2" />
    </button>
  ) : (
    <button
      className={twMerge(
        'w-5 h-5 rounded-full flex items-center justify-center border border-white/20',
        className
      )}
      type="button"
      {...rest}
    >
      {isActive ? <Check color="white" size={10} /> : null}
    </button>
  );
};
