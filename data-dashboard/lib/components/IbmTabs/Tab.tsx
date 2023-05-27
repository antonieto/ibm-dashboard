interface Props {
  children: React.ReactNode;
  title: string;
}

export default function Tab({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  );
}
