export interface ChartProps {
  className: string;
  index: string;
  categories: string[];
  colors: (
    | 'blue'
    | 'cyan'
    | 'fuchsia'
    | 'gray'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'violet'
    | 'yellow'
    | 'slate'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'amber'
    | 'emerald'
    | 'sky'
    | 'rose'
  )[];
  yAxisWidth: number;
}

export interface ChartPropsPie {
  className: string;
  index: string;
  category: string;
  colors: (
    | 'blue'
    | 'cyan'
    | 'fuchsia'
    | 'gray'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'violet'
    | 'yellow'
    | 'slate'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'amber'
    | 'emerald'
    | 'sky'
    | 'rose'
  )[];
  yAxisWidth: number;
}
