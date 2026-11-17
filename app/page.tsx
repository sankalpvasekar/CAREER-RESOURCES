import { query } from '@/lib/db';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { parseHighlightPoints } from '@/lib/highlight';

async function getAdminData() {
  const configs = await query<any>('SELECT * FROM admins_data LIMIT 1');
  return configs[0] || { hero_images: [], price: '499', highlight_text: '500+ Companies Trusted Us' };
}

export default async function HomePage() {
  const config = await getAdminData();
  const points = parseHighlightPoints(config.highlight_text || '');

  return (
    <div className="bg-[#FDFBF7] px-4 pt-1 pb-8 md:pt-4 md:pb-12 font-sans">
      <main className="max-w-xl mx-auto w-full text-center">
        {/* Highlight Section */}
        <div className="p-4 sm:p-8 bg-[#FDFBF7] border border-[#C5A059]/20 rounded-3xl shadow-sm">
          {points.length > 1 ? (
            <div className="my-2 sm:my-3">
              <h1 className="sr-only">Career Support Highlights</h1>
              <ul className="space-y-3 sm:space-y-3.5 text-left max-w-lg mx-auto">
                {points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 bg-white/75 p-3.5 sm:p-4 rounded-2xl border border-[#C5A059]/20 shadow-xs"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2E7D32]/15 text-[#2E7D32] flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="text-[15px] sm:text-[17px] font-bold text-[#3A2418] leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h1 className="text-[20px] md:text-2xl font-bold text-[#3A2418] mb-6 leading-tight text-center">
              {points[0] || config.highlight_text}
            </h1>
          )}

          <p className="text-[11px] md:text-[12px] font-semibold text-[#7D6656] tracking-[1px] uppercase mb-4 text-center hidden">
            (VERIFIED & TOP RATED RECRUITERS)
          </p>

          <div className="mt-6">
            <Link
              href="/main"
              className="inline-block bg-[#2E7D32] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1B5E20] transition-colors shadow-lg active:scale-95"
            >
              Click Here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
