import { Editor } from '@tiptap/react';

export interface Props {
  bubbleMenu?: boolean;
  floatingMenu?: boolean;
  content: string;
  isEditable?: boolean;
  onChangeRichTextContent?: (value: string) => void;
  className?: string;
}

export interface IEditorBubbleMenuProps {
  show: boolean;
  editor: Editor;
}
