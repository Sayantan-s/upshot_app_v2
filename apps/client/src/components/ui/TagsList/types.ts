export interface Props<TData> {
  value?: string[];
  data: TData[];
  renderTemplate: (item: TData & { active: boolean }) => JSX.Element;
  className?: string;
  onSelect?: (tags: string[]) => void;
  moreButton?: JSX.Element;
}
