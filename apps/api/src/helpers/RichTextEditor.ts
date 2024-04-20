export class RichText {
  static generate(text: string) {
    return JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: text,
            },
          ],
        },
      ],
    });
  }
}
