import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from '@/contexts/ToastContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

// Mock useSession hook
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      },
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  signIn: jest.fn(() => Promise.resolve({ error: null })),
  signOut: jest.fn(() => Promise.resolve()),
}));

interface WrapperProps {
  children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

function render(ui: React.ReactElement, options = {}) {
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
    user: userEvent.setup(),
  };
}

// 테스트용 캠페인 데이터 생성기
export function createMockCampaign(overrides = {}) {
  return {
    id: 1,
    title: '테스트 캠페인',
    description: '테스트 캠페인 설명',
    imageUrl: '/test-image.jpg',
    reward: 50000,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    status: 'ongoing',
    category: '맛집',
    snsTypes: ['Instagram'],
    currentParticipants: 0,
    maxParticipants: 10,
    requirements: {
      followers: '1000명 이상',
      postType: '피드',
    },
    reviewTemplate: {
      format: '자유형식',
      required: ['음식 사진', '메뉴 설명'],
    },
    location: {
      city: '서울',
      district: '강남구',
    },
    client: {
      companyName: '테스트 회사',
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    is_bookmarked: false,
    ...overrides,
  };
}

// API 응답 모의 함수
export function mockApiResponse(data: any, status = 200) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(data),
  });
}

export * from '@testing-library/react';
export { userEvent };
export { render }; 