type leftSubSidebarProps = {
  children?: React.ReactNode
}

export const LeftSubSidebar = ({ children }: leftSubSidebarProps) => {
  return (
    <div className="border-r border-r-gray-200 min-w-64 min-h-screen pt-4 bg-gray-100">
      {children}
    </div>
  )
}
