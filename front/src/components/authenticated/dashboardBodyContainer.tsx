export default function DashboardBodyContainer({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-white p-4 sm:p-8 shadow-lg rounded-sm">{children}</div>
  )
}
