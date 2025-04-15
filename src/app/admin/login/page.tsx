'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useToast } from '@/contexts/ToastContext';

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    // 리디렉션할 경로 (returnTo 파라미터 또는 기본값)
    const returnTo = searchParams?.get('returnTo') || '/admin/dashboard';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!credentials.email || !credentials.password) {
            showToast('이메일과 비밀번호를 입력해주세요.', 'error');
            return;
        }
        
        setLoading(true);
        
        try {
            console.log('로그인 시도:', credentials.email);
            
            // NextAuth의 signIn 함수 호출
            const result = await signIn('credentials', {
                redirect: false,
                email: credentials.email,
                password: credentials.password
            });
            
            console.log('로그인 결과:', result);
            
            if (result?.error) {
                throw new Error(result.error);
            }
            
            if (result?.ok) {
                // 로그인 성공 - 로컬스토리지에 플래그 저장
                window.localStorage.setItem('admin-auth', 'true');
                showToast('로그인 성공', 'success');
                
                // 세션이 설정될 시간을 주기 위한 짧은 지연
                console.log(`${returnTo}로 리디렉션합니다.`);
                setTimeout(() => {
                    // 리디렉션
                    window.location.href = returnTo;
                }, 1000);
            }
        } catch (error: any) {
            console.error('로그인 오류:', error);
            showToast(error.message || '로그인에 실패했습니다.', 'error');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        관리자 로그인
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        관리자 계정으로 로그인해주세요
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">이메일</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="이메일"
                                value={credentials.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">비밀번호</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="비밀번호"
                                value={credentials.password}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                    로그인 중...
                                </>
                            ) : '로그인'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 