// src/components/layout/Layout.jsx
function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar ni o‘zingizdagi joyga qo‘ying */}
      <main>{children}</main>
    </div>
  )
}
export default Layout