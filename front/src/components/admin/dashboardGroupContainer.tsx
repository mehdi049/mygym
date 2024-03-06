export default function DashboardGroupContainer({
  children,
  className,
}: Readonly<{
  children: React.ReactNode
  className?: string
}>) {
  return <div className={'bg-gray-100 p-4 sm:p-8 ' + className}>{children}</div>
}
