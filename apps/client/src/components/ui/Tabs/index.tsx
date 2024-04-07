import * as Tabs from '@radix-ui/react-tabs';

export const ProfileTabs = () => (
  <Tabs.Root
    className="flex flex-col w-[300px] shadow-[0_2px_10px] shadow-black"
    defaultValue="shots"
  >
    <Tabs.List className="shrink-0 flex border-b border-teal-800">
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-teal-600 select-none first:rounded-tl-md last:rounded-tr-md hover:bg-teal-50 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:bg-teal-300 outline-none cursor-pointer"
        value="products"
      >
        Products
      </Tabs.Trigger>
      <Tabs.Trigger
        className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-teal-600 select-none first:rounded-tl-md last:rounded-tr-md hover:bg-teal-50 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:bg-teal-300 outline-none cursor-pointer"
        value="shots"
      >
        Shots
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="products">Products Panel</Tabs.Content>
    <Tabs.Content value="shots">Shots Panel</Tabs.Content>
  </Tabs.Root>
);
