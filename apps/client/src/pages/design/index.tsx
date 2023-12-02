import { Button } from '@client/components/ui';

export const Design = () => {
  return (
    <div>
      <Button>Hello</Button>
      <Button variant={'secondary.solid'}>Hello</Button>
      <Button variant={'neutral.solid'}>Hello</Button>
      <div>
        <Button size={'md'}>Hello</Button>
        <Button isLoading size={'md'} variant={'secondary.solid'}>
          Hello
        </Button>
        <Button size={'md'} variant={'neutral.solid'}>
          Hello
        </Button>
      </div>
      <div>
        <Button size={'md'} isLoading variant={'primary.flat'}>
          Hello
        </Button>
        <Button size={'md'} variant={'secondary.flat'}>
          Hello
        </Button>
        <Button size={'md'} variant={'neutral.flat'}>
          Hello
        </Button>
      </div>
      <div>
        <Button size={'md'} variant={'primary.ghost'}>
          Hello
        </Button>
        <Button size={'md'} variant={'secondary.ghost'}>
          Hello
        </Button>
        <Button size={'md'} variant={'neutral.ghost'}>
          Hello
        </Button>
      </div>
      <div>
        <Button variant={'danger.outline'}>Creating new kinks</Button>
      </div>
    </div>
  );
};
