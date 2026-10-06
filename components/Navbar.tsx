'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<{ isAdmin?: boolean } | null>(null);
  const [siteTitle, setSiteTitle] = useState('CAREER RESOURCES');
  const router = useRouter();

  useEffect(() => {
    // Fetch title config
    fetch('/api/admin/config').then(res => res.json()).then(data => {
      setSiteTitle(data.site_title || 'CAREER RESOURCES');
    });

    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');
      setIsLogged(!!token);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkAuth();
    
    window.addEventListener('focus', checkAuth);
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);

    return () => {
      window.removeEventListener('focus', checkAuth);
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    fetch('/api/auth/logout', { method: 'POST' }).finally(() => {
      setIsLogged(false);
      setIsOpen(false);
      toast.success('Sign out successful');
      router.push('/');
      router.refresh();
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-md border-b border-[#C5A059]/10 h-14">
      <div className="max-w-7xl mx-auto px-5 h-full flex justify-between items-center">
        <Link href={user?.isAdmin ? "/admin" : "/"} className="transition-opacity hover:opacity-80">
          <div className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt={siteTitle} 
              width={220} 
              height={40} 
              className="object-contain"
            />
          </div>
        </Link>
        {/* Rest of Navbar... */}
        <div className="hidden md:flex items-center gap-5">
           {/* ... existing links ... */}
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(!isOpen); }}
          className="md:hidden p-1.5 text-[#5D4037] hover:bg-[#C5A059]/5 rounded-md transition-colors z-[101]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}