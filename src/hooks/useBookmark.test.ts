import { renderHook, act } from '@testing-library/react';
import { useBookmark } from './useBookmark';
import { toggleBookmark } from '@/lib/api/campaigns';
import { useAuth } from './useAuth';

// Mock the modules
jest.mock('./useAuth');
jest.mock('@/lib/api/campaigns');

// Mock implementation
const mockToggleBookmark = toggleBookmark as jest.MockedFunction<typeof toggleBookmark>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('useBookmark', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      user: { id: '1', email: 'test@example.com', name: 'Test User' },
      login: jest.fn(),
      logout: jest.fn(),
      isLoading: false,
    });
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useBookmark(false));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('toggles bookmark successfully', async () => {
    mockToggleBookmark.mockResolvedValueOnce(undefined);
    
    const { result } = renderHook(() => useBookmark(false));
    
    await act(async () => {
      await result.current.toggle(1);
    });
    
    expect(mockToggleBookmark).toHaveBeenCalledWith('1');
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles toggle error', async () => {
    const error = new Error('Failed to toggle bookmark');
    mockToggleBookmark.mockRejectedValueOnce(error);
    
    const { result } = renderHook(() => useBookmark(false));
    
    await act(async () => {
      await result.current.toggle(1);
    });
    
    expect(mockToggleBookmark).toHaveBeenCalledWith('1');
    expect(result.current.error).toBe('Failed to toggle bookmark');
    expect(result.current.isLoading).toBe(false);
  });

  it('requires authentication to toggle', async () => {
    mockUseAuth.mockReturnValueOnce({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
      isLoading: false,
    });
    
    const { result } = renderHook(() => useBookmark(false));
    
    await act(async () => {
      await result.current.toggle(1);
    });
    
    expect(mockToggleBookmark).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Login required');
  });
}); 