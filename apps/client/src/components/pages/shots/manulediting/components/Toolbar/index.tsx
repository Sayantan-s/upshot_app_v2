import { Button } from '@client/components/ui';
import { Calendar } from '@client/components/ui/Calendar';
import * as Popover from '@radix-ui/react-popover';
import { getUnixTime } from 'date-fns';
import { useState } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';

export const Toolbar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSelectDate: SelectSingleEventHandler = (dateData) => {
    setDate(dateData);
    if (dateData) {
      const unixTime = getUnixTime(dateData.toISOString());
      console.log(unixTime);
    }
  };

  return (
    <nav className="sticky top-0 w-[1200px] mx-auto mt-10 z-50">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button variant={'secondary.flat'}>Date</Button>
        </Popover.Trigger>
        <Popover.Content className="w-auto p-0" side="bottom" sideOffset={5}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            className="rounded-lg border border-slate-200/70 p-4 bg-white shadow-md shadow-slate-800/5"
            fixedWeeks
            initialFocus
            disabled={{ before: new Date() }}
          />
        </Popover.Content>
      </Popover.Root>
    </nav>
  );
};
