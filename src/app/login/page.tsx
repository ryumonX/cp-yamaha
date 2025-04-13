'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { login } from '@/utils/authMethod'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(username, password)
      router.push('/admin')
    } catch (err) {
      setError('Login gagal. Cek kembali username dan password kamu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white/5 backdrop-blur-2xl rounded-xl shadow-2xl w-full max-w-md border border-white/10 overflow-hidden"
      >
        {/* Glowing Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-20" />
        
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="flex justify-center"
            >
              <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <LockClosedIcon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Selamat Datang
              </h1>
              <p className="text-gray-400">Silakan masuk ke akun Anda</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <UserCircleIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-white placeholder-gray-400"
                    placeholder="Nama pengguna"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-white placeholder-gray-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white py-3.5 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Masuk Sekarang'
                )}
              </div>
              {/* Button Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-sm text-gray-400">
            <a 
              href="#"
              className="hover:text-blue-400 transition-colors duration-200 underline underline-offset-4 decoration-transparent hover:decoration-blue-400"
            >
              Lupa password?
            </a>
          </div>
        </div>

        {/* Border Glow Effect */}
        <div className="absolute inset-0 border border-transparent [mask-image:linear-gradient(transparent,#000)] pointer-events-none">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-blue-400/30 via-transparent to-purple-400/30 animate-rotate" />
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage