import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = useMemo(() => {
    const items: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          items.push(i);
        }
        items.push('...');
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push('...');
        items.push(totalPages);
      }
    }
    return items;
  }, [currentPage, totalPages]);

  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'hover:bg-[#FF5C35]/5 focus:outline-none focus:ring-2 focus:ring-[#FF5C35] focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="w-5 h-5 text-[#FF5C35]" />
      </button>

      {pages.map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[#FF5C35] focus:ring-offset-2',
              currentPage === page
                ? 'bg-[#FF5C35] text-white'
                : 'text-gray-700 hover:bg-[#FF5C35]/5'
            )}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="px-4 py-2 text-sm text-gray-700"
            aria-hidden="true"
          >
            {page}
          </span>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-2 rounded-lg transition-colors',
          'hover:bg-[#FF5C35]/5 focus:outline-none focus:ring-2 focus:ring-[#FF5C35] focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
        )}
        aria-label="다음 페이지"
      >
        <ChevronRight className="w-5 h-5 text-[#FF5C35]" />
      </button>
    </nav>
  );
} 