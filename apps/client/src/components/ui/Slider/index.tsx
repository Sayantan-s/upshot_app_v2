import * as Slider from "@radix-ui/react-slider";
import { Sound } from "iconsax-react";
import { FC } from "react";
import { Props } from "./types";

const RangeSlider: FC<Props> = ({ value, onChange, label, min, max, step }) => {
  return (
    <form>
      {label ? (
        <label className="bg-emerald-50 text-emerald-600 px-2 py-1 flex items-center justify-between w-[5.5rem] rounded-lg text-xs font-bold">
          {label}:{" "}
          <span className="text-emerald-700 font-[900]">
            {value < 10 ? `0${value.toFixed(0)}` : value.toFixed(0)}
          </span>
        </label>
      ) : null}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-[20px] mt-2"
        value={[value]}
        max={max}
        min={min}
        step={step || 1}
        onValueChange={(values) => onChange(values[0])}
      >
        <Slider.Track className="bg-emerald-50 relative flex-grow-[1] rounded-full h-[3px]">
          <Slider.Range className="absolute h-full rounded-full bg-emerald-500" />
        </Slider.Track>
        <Slider.Thumb className="flex items-center justify-center w-7 h-7 bg-white shadow-md shadow-emerald-900/10 rounded-full border border-transparent focus:outline-none focus:border-emerald-400/10 focus:cursor-grab">
          <Sound size="14" color="rgb(6,78,59)" />
        </Slider.Thumb>
      </Slider.Root>
    </form>
  );
};

export default RangeSlider;
