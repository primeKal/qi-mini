export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start bg-white shadow-xl rounded-xl border border-gray-200 p-8">{children}</div>
  );
}
