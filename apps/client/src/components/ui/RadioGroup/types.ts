export interface Props {
  defaultValue?: string | null;
  onSelect: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}
