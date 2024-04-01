import { Calendar } from '@client/components/ui/Calendar';
import { useState } from 'react';

export const Toolbar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <nav className="fixed">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border p-3"
        fixedWeeks
        disabled={{ before: new Date() }}
      />
    </nav>
  );
};
