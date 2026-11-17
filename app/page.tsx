import { query } from '@/lib/db';
import Link from 'next/link';
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
        <div className="p-4 sm:p-6 bg-[#FDFBF7] border border-[#C5A059]/20 rounded-3xl shadow-sm">
          {points.length > 1 ? (
            <div className="my-2">
              <h1 className="sr-only">Career Support Highlights</h1>
              <ul className="space-y-2 text-left max-w-lg mx-auto px-1 sm:px-2">
                {points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[12px] md:text-[13px] text-[#3A2418] font-semibold leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A2418] mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-[12px] md:text-[13px] font-semibold text-[#3A2418] mb-4 leading-relaxed text-center max-w-lg mx-auto">
              {points[0] || config.highlight_text}
            </p>
          )}

          <p className="text-[11px] md:text-[12px] font-semibold text-[#7D6656] tracking-[1px] uppercase mb-4 text-center hidden">
            (VERIFIED & TOP RATED RECRUITERS)
          </p>

          <div className="mt-4 sm:mt-5">
            <Link
              href="/main"
              className="inline-block bg-[#2E7D32] text-white px-7 py-3 rounded-full font-bold text-sm sm:text-base hover:bg-[#1B5E20] transition-colors shadow-md active:scale-95"
            >
              Click Here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
