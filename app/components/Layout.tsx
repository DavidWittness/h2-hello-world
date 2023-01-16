interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  description?: string | null;
}

export function Layout({children, title, description}: LayoutProps) {
  return (
    <>
      <header
        role="banner"
        className="bg-contrast/80 lg:flex sticky backdrop-blur-lg z-40 top-0 justify-center w-full leading-none gap-8 px-12 py-8 font-bold"
      >
        {title}
      </header>
      {children}
    </>
  );
}
