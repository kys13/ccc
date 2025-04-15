'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, FileText, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react';
import { LineChart } from '@/components/ui/charts/LineChart';
import { PieChart } from '@/components/ui/charts/PieChart';

// 통계 데이터를 위한 타입 정의
interface RecentApplication {
  id: number;
  createdAt: string; // ISO 날짜 형식
  campaign: any;
  user: any;
}

interface CategoryStat {
  id: number;
  name: string;
  _count: {
    campaigns: number;
  };
}

interface DashboardStats {
  totalUsers: number;
  totalCampaigns: number;
  totalApplications: number;
  activeCampaigns: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  recentApplications: RecentApplication[];
  categoryStats: CategoryStat[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCampaigns: 0,
    totalApplications: 0,
    activeCampaigns: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    recentApplications: [],
    categoryStats: []
  });

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        router.push('/admin/login?returnTo=/admin/dashboard');
        return;
      }

      if (!isAdmin) {
        showToast('관리자 권한이 필요합니다.', 'error');
        router.push('/');
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/stats', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            showToast('인증이 필요합니다. 다시 로그인해주세요.', 'error');
            router.push('/admin/login?returnTo=/admin/dashboard');
            return;
          }
          throw new Error('데이터를 불러오는데 실패했습니다.');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Dashboard stats fetch error:', err);
        showToast('대시보드 데이터를 불러오는데 실패했습니다.', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, isAdmin, router, showToast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const applicationChartData = {
    labels: stats.recentApplications.map(app => 
      new Date(app.createdAt).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })
    ).reverse(),
    datasets: [
      {
        label: '신청 수',
        data: stats.recentApplications.map(app => 1).reverse(),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const categoryChartData = {
    labels: stats.categoryStats.map(stat => stat.name),
    datasets: [
      {
        data: stats.categoryStats.map(stat => stat._count.campaigns),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">대시보드</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 회원</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 캠페인</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCampaigns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 신청</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">진행중인 캠페인</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCampaigns}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">대기중인 신청</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">승인된 신청</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedApplications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">거절된 신청</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejectedApplications}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>최근 신청 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <LineChart data={applicationChartData} />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>카테고리별 캠페인</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <PieChart data={categoryChartData} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 