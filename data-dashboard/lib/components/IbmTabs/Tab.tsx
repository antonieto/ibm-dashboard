interface Props {
  children: React.ReactNode;
  title: string;
}

export default function Tab({ children, title: _ }: Props) {
  return (
    // Note: this is done to avoid eslint unused title error
    <div id={_}>
      {children}
    </div>
  );
}
