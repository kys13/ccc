import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              고객센터
            </h3>
            <div className="mt-4">
              <p className="text-base text-gray-500">
                <span className="block font-bold text-lg">1544-0000</span>
                평일 10:00 - 18:00<br />
                점심 12:30 - 13:30
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              회사정보
            </h3>
            <div className="mt-4">
              <p className="text-base text-gray-500">
                상호명: (주)체험단플랫폼<br />
                대표: 홍길동<br />
                사업자등록번호: 000-00-00000
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              빠른링크
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2024 체험단플랫폼. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 