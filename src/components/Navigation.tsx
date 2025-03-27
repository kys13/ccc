'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';
import { ChevronDown } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = (menu: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const handleLogout = async () => {
    try {
      await logout();
      showToast('로그아웃되었습니다.', 'success');
      router.push('/');
    } catch (error) {
      showToast('로그아웃에 실패했습니다.', 'error');
    }
  };

  const visitMenuItems = [
    { name: '맛집', href: '/visit/restaurants' },
    { name: '카페', href: '/visit/cafes' },
    { name: '뷰티', href: '/visit/beauty' },
    { name: '호텔', href: '/visit/hotels' },
  ];

  const deliveryMenuItems = [
    { name: '음식', href: '/delivery/food' },
    { name: '뷰티', href: '/delivery/beauty' },
    { name: '리빙', href: '/delivery/living' },
    { name: '패션', href: '/delivery/fashion' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Logo
            </Link>

            <div className="relative" onMouseLeave={handleMouseLeave}>
              <Link
                href="/visit"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-[15px] font-semibold tracking-tight"
                onMouseEnter={() => handleMouseEnter('visit')}
              >
                방문체험
              </Link>
              {activeDropdown === 'visit' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    {visitMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" onMouseLeave={handleMouseLeave}>
              <Link
                href="/delivery"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-[15px] font-semibold tracking-tight"
                onMouseEnter={() => handleMouseEnter('delivery')}
              >
                배송체험
              </Link>
              {activeDropdown === 'delivery' && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    {deliveryMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated && user ? (
              <div className="relative" onMouseLeave={handleMouseLeave}>
                <button
                  className="flex items-center space-x-1 text-gray-900 hover:text-indigo-600 px-3 py-2 text-[15px] font-semibold tracking-tight"
                  onMouseEnter={() => handleMouseEnter('user')}
                >
                  <span>{user.name}님</span>
                </button>
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      <Link
                        href="/mypage"
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        role="menuitem"
                      >
                        마이페이지
                      </Link>
                      <Link
                        href="/mypage/campaigns"
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        role="menuitem"
                      >
                        참여 캠페인
                      </Link>
                      <Link
                        href="/mypage/reviews"
                        className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        role="menuitem"
                      >
                        리뷰 관리
                      </Link>
                      {user && user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                          role="menuitem"
                        >
                          관리자
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        role="menuitem"
                      >
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-900 hover:text-indigo-600 px-3 py-2 text-[15px] font-semibold tracking-tight"
                >
                  로그인
                </Link>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-[15px] font-semibold hover:bg-indigo-700"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 