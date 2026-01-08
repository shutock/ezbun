type Props = LayoutProps<"/">;

export default (({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}) as React.FC<Props>;
