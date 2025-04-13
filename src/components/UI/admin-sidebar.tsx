'use client'

import {
  HomeIcon,
  CameraIcon,
  UserIcon,
  ShoppingBagIcon,
  CalendarIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { usePathname, useRouter } from 'next/navigation'
import { logout } from '@/utils/authMethod'

const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    { name: 'Dashboard', href: '/admin/', icon: HomeIcon, current: pathname === '/admin/dashboard' },
    { name: 'Galeri', href: '/admin/gallery', icon: CameraIcon, current: pathname === '/admin/gallery' },
    { name: 'User', href: '/admin/user', icon: UserIcon, current: pathname === '/admin/user' },
    { name: 'Produk', href: '/admin/product', icon: ShoppingBagIcon, current: pathname === '/admin/product' },
    { name: 'Event', href: '/admin/event', icon: CalendarIcon, current: pathname === '/admin/event' },
    { name: 'Artikel', href: '/admin/article', icon: DocumentTextIcon, current: pathname === '/admin/article' },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login') // Ganti sesuai path login kamu
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="flex items-center justify-center py-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-indigo-400">Admin Dashboard</h1>
      </div>

      <nav className="flex-1 px-4 py-8">
        <div className="space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                item.current
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                  : 'text-gray-300 hover:bg-gray-800/40 hover:text-white'
              } group duration-300 cursor-pointer`}
            >
              <item.icon
                className={`h-5 w-5 mr-3 ${
                  item.current ? 'text-indigo-400' : 'text-gray-400 group-hover:text-white'
                }`}
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="px-4 py-6 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors group"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-300" />
          <span className="text-sm font-medium text-red-400 group-hover:text-red-300">
            Logout
          </span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
