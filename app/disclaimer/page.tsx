import { query } from '@/lib/db';

export default async function DisclaimerPage() {
  const configs = await query<any>('SELECT disclaimer_content FROM admins_data LIMIT 1');
  const content = configs[0]?.disclaimer_content || 'Disclaimer content will be updated soon.';

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-[#5D4037]">IMPORTANT DISCLAIMER</h1>
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
}