// src/Tiptap.jsx
import Underline from '@tiptap/extension-underline';

import {
  Editor as EditorClass,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useImperativeHandle } from 'react';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { Props } from './type';

const extensions = [
  StarterKit.configure({
    code: {
      HTMLAttributes: {
        class: 'text-gray-700 bg-gray-200 px-1 py-0.5 rounded-md font-code',
      },
    },
    bold: {
      HTMLAttributes: {
        class: 'font-[900]',
      },
    },
  }),
  Underline,
];

const Editor = forwardRef<EditorClass, Props>(
  (
    {
      bubbleMenu,
      floatingMenu,
      content,
      isEditable = true,
      onChangeRichTextContent,
    },
    ref
  ) => {
    const editor = useEditor({
      extensions,
      content: JSON.parse(content), // only accept object strings
      editable: isEditable,
      onUpdate: (data) => {
        onChangeRichTextContent?.(JSON.stringify(data.editor.getJSON()));
      },
    });

    useImperativeHandle(ref, () => editor!);

    return editor ? (
      <>
        <EditorContent
          editor={editor}
          className={`${isEditable ? 'cursor-text' : ''}`}
        />
        {floatingMenu ? (
          <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        ) : null}
        <EditorBubbleMenu show={!!bubbleMenu} editor={editor} />
      </>
    ) : null;
  }
);

export default Editor;
