import { query } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

async function getAdminData() {
  const configs = await query<any>('SELECT * FROM admins_data LIMIT 1');
  return configs[0] || { hero_images: [], price: '499', highlight_text: '500+ Companies Trusted Us' };
}

export default async function HomePage() {
  const config = await getAdminData();

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-4 md:p-6 font-sans">
        <main className="max-w-xl mx-auto space-y-6 text-center">
            {/* Highlight Section */}
            <div className="p-8 bg-[#FDFBF7] border border-[#C5A059]/20 rounded-3xl shadow-sm">
                <h1 className="text-[22px] md:text-3xl font-bold text-[#3A2418] mb-1 leading-tight text-center">
                    {config.highlight_text}
                </h1>
                <p className="text-[11px] md:text-[12px] font-semibold text-[#7D6656] tracking-[1px] uppercase mb-4 text-center hidden">
                    (VERIFIED & TOP RATED RECRUITERS)
                </p>
                <Link href="/main" className="inline-block bg-[#2E7D32] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#1B5E20] transition-colors shadow-lg">
                    Click Here
                </Link>
            </div>
        </main>
    </div>
  );
}