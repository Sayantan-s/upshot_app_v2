import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 text-gray-700',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-gray-700',
        nav: 'space-x-1 flex items-center',
        nav_button: twMerge(
          // buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex space-x-2',
        head_cell:
          'text-muted-foreground rounded-md w-11 font-normal text-[0.8rem] font-bold text-gray-900 font-bold',
        row: 'flex w-full mt-2 space-x-2',
        cell: 'text-gray-600 h-11 w-11 rounded-full text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: 'h-9 w-9 rounded-full p-0 font-normal aria-selected:opacity-100',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-emerald-500 text-white hover:bg-emerald-500 hover:text-white focus:bg-emerald-500 focus:text-white',
        day_today: 'bg-emerald-100 text-emerald-500',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <button>
            <ArrowLeft2 className="h-4 w-4" color="#1f2937" />
          </button>
        ),
        IconRight: () => (
          <button>
            <ArrowRight2 className="h-4 w-4" color="#1f2937" />
          </button>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
