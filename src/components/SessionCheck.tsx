'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { useRouter } from 'next/navigation';

export default function SessionCheck() {
  const { data: session, status, update } = useSession();
  const { showToast } = useToast();
  const router = useRouter();

  // 세션 상태 확인 및 처리
  useEffect(() => {
    console.log('[세션체크] 현재 세션 상태:', status);
    
    if (status === 'loading') {
      console.log('[세션체크] 세션 로딩 중...');
    }
    
    // 세션이 인증됨
    if (status === 'authenticated' && session?.user) {
      console.log('[세션체크] 인증된 사용자:', session.user.email);
      console.log('[세션체크] 사용자 역할:', session.user.role);
      
      // 세션 토큰이 없는 경우 업데이트
      if (!session.user.token) {
        console.log('[세션체크] 토큰 없음, 세션 업데이트 시도');
        update();
      }
      
      // 로컬 스토리지에 인증 플래그 저장
      localStorage.setItem('admin-auth', 'true');
      localStorage.setItem('admin-user', session.user.email);
      
      // 환영 메시지 표시 (이미 표시된 경우 제외)
      const welcomeShown = sessionStorage.getItem('welcome-shown');
      if (!welcomeShown) {
        showToast(`${session.user.name || session.user.email}님 환영합니다`, 'success');
        sessionStorage.setItem('welcome-shown', 'true');
      }
    }
    
    // 인증되지 않음
    if (status === 'unauthenticated') {
      console.log('[세션체크] 인증되지 않은 상태');
      localStorage.removeItem('admin-auth');
      localStorage.removeItem('admin-user');
      sessionStorage.removeItem('welcome-shown');
    }
  }, [status, session, update, showToast]);

  // 관리자 페이지 접근 제어
  useEffect(() => {
    const pathname = window.location.pathname;
    
    // 관리자 페이지에 접근하려고 하는데 인증되지 않은 경우
    if (status === 'unauthenticated' && 
        pathname.startsWith('/admin') && 
        pathname !== '/admin/login') {
      
      console.log('[세션체크] 관리자 페이지 접근 시도, 로그인으로 리디렉션');
      router.push(`/admin/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [status, router]);

  // 디버깅용 숨겨진 상태 정보 (개발 도구에서 확인 가능)
  return (
    <div style={{ display: 'none' }} data-testid="session-check">
      <div id="session-status" data-status={status}>
        {status === 'authenticated' && (
          <div id="user-info">
            <div id="user-email">{session?.user?.email}</div>
            <div id="user-role">{session?.user?.role}</div>
            <div id="has-token">{session?.user?.token ? 'yes' : 'no'}</div>
          </div>
        )}
      </div>
    </div>
  );
} 