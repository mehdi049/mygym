type LeftSidebarProps = {
  children?: React.ReactNode
}
export const LeftSidebar = ({ children }: LeftSidebarProps) => {
  return (
    <>
      <div>
        <div className="border-r border-r-gray-200 w-72 min-h-screen pt-4 bg-gray-50">
          {children}
        </div>
      </div>
    </>
  )
}
