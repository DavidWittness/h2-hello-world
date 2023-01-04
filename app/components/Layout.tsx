interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string | null;
}

export function Layout({children, title, description}: LayoutProps) {
  return (
    <>
      <header className="site-header">
        <h1>{title}</h1>
      </header>
      <div className="Layout">{children}</div>
    </>
  );
}
