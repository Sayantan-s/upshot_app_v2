import { Editor } from '@tiptap/react';

export interface Props {
  bubbleMenu?: boolean;
  floatingMenu?: boolean;
  content: string;
  isEditable?: boolean;
  onChangeRichTextContent?: (value: string) => void;
  className?: string;
  limit?: number;
  characterCounter?: (...args: number[]) => void;
}

export interface IEditorBubbleMenuProps {
  show: boolean;
  editor: Editor;
}
