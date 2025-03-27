import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock intersection observer
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock Request object for API route testing
global.Request = class Request {
  constructor(input, init) {
    return new (require('node-fetch').Request)(input, init);
  }
};

// Mock Response object for API route testing
global.Response = class Response {
  constructor(body, init) {
    this.body = body;
    this.init = init;
  }

  static json(data) {
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  json() {
    return Promise.resolve(JSON.parse(this.body));
  }
};

// Mock NextRequest and NextResponse for API route testing
jest.mock('next/server', () => {
  const NextRequest = class extends Request {
    constructor(input, init) {
      super(input, init);
      this.nextUrl = new URL(input);
    }
  };

  return {
    NextRequest,
    NextResponse: {
      json: (data, init) => Response.json(data, init),
      redirect: (url) => new Response(null, { status: 302, headers: { Location: url } }),
    },
  };
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
}); 