import Bold from '@tiptap/extension-bold';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import FloatingMenu from '@tiptap/extension-floating-menu';

import CharacterCount from '@tiptap/extension-character-count';
import CodeBlock from '@tiptap/extension-code';
import Color from '@tiptap/extension-color';
import Document from '@tiptap/extension-document';
import Italic from '@tiptap/extension-italic';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';

import { Editor as EditorClass, EditorContent, useEditor } from '@tiptap/react';
import { forwardRef, useImperativeHandle } from 'react';
import { twMerge } from 'tailwind-merge';
import { EditorBubbleMenu } from './EditorBubbleMenu';
import { EditorFloatingMenu } from './FloatingMenu';
import { Props } from './type';

const extensions = (limit: number) => [
  Document,
  Text,
  Paragraph,
  Underline,
  Italic,
  TextStyle,
  Bold,
  BubbleMenu,
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'text-gray-700 bg-gray-200 px-1 py-0.5 rounded-md font-code',
    },
  }),
  Color.configure({
    types: ['textStyle'],
  }),
  FloatingMenu.configure({
    tippyOptions: {
      placement: 'right-end',
      offset: [10, 10],
    },
  }),
  CharacterCount.configure({
    limit,
  }),
];

const Editor = forwardRef<EditorClass, Props>(
  (
    {
      bubbleMenu,
      floatingMenu,
      content,
      isEditable = true,
      className,
      limit = 330,
      onChangeRichTextContent,
      characterCounter,
    },
    ref
  ) => {
    const editor = useEditor({
      extensions: extensions(limit),
      content: JSON.parse(content), // only accept object strings
      editable: isEditable,
      onCreate: (data) => {
        characterCounter?.(
          data.editor.storage.characterCount.characters(),
          data.editor.storage.characterCount.words(),
          limit
        );
      },
      onUpdate: (data) => {
        onChangeRichTextContent?.(JSON.stringify(data.editor.getJSON()));
        characterCounter?.(
          data.editor.storage.characterCount.characters(),
          data.editor.storage.characterCount.words(),
          limit
        );
      },
    });

    useImperativeHandle(ref, () => editor!);

    return editor ? (
      <>
        <EditorContent
          editor={editor}
          className={twMerge(
            `${
              isEditable ? 'cursor-text' : ''
            } focus-within:outline-none editor-content`,
            className
          )}
        />
        <EditorFloatingMenu editor={editor} show={!!floatingMenu} />
        <EditorBubbleMenu show={!!bubbleMenu} editor={editor} />
      </>
    ) : null;
  }
);

export default Editor;
