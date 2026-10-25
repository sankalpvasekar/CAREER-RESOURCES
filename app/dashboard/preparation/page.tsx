'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Eye } from 'lucide-react';
import SecurePDF from '@/components/SecurePDFViewer';

export default function PreparationDashboard() {
  const [pdfs, setPdfs] = useState<{ url: string; title: string }[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/config')
      .then(res => res.json())
      .then(data => {
        setPdfs(data.preparation_pdfs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-[#5D4037] font-bold">Loading...</div>;
  }

  if (selectedPdf) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex flex-col">
        <div className="bg-[#2D2D2D] px-6 py-4 flex items-center justify-between border-b border-white/10">
          <button 
            onClick={() => setSelectedPdf(null)}
            className="flex items-center text-white font-bold hover:text-[#C5A059] transition-colors gap-2 bg-white/10 px-4 py-2 rounded-xl"
          >
            <ArrowLeft size={18} /> Back to Materials
          </button>
          <h2 className="text-white font-semibold truncate max-w-md">{selectedPdf.title}</h2>
          <div />
        </div>
        <div className="flex-1">
          <SecurePDF url={selectedPdf.url} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-[#FDFBF7] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href="/dashboard" className="inline-flex items-center text-[#5D4037] font-bold hover:underline gap-2">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-[#C5A059]">Preparation Material</h1>
        <p className="text-[#A1887F]">Select a preparation document below to view securely.</p>

        {pdfs.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#C5A059]/20 text-center text-[#A1887F]">
            No preparation materials available at the moment.
          </div>
        ) : (
          <div className="grid gap-4">
            {pdfs.map((pdf, i) => (
              <div 
                key={i}
                onClick={() => setSelectedPdf(pdf)}
                className="bg-white p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#5D4037] text-lg group-hover:text-[#C5A059] transition-colors">{pdf.title}</h3>
                    <p className="text-xs text-[#A1887F]">PDF Material • Secure Viewer</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-[#C5A059] text-white px-5 py-2.5 rounded-xl font-bold text-sm group-hover:bg-[#b08d47] transition-colors">
                  <Eye size={16} /> Open PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
