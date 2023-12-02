export interface Props {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min: number;
  max: number;
  step?: number;
}
