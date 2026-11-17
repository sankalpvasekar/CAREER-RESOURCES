'use client';
import { useEffect, useState } from 'react';
import { Save, Loader2, Smartphone, Check, Sparkles, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { parseHighlightPoints } from '@/lib/highlight';

export default function HomeAdminPage() {
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({ highlight_text: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/config')
      .then(res => res.json())
      .then(data => {
        setConfig({ highlight_text: data.highlight_text || '' });
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load configuration');
        setLoading(false);
      });
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ highlight_text: config.highlight_text.trim() })
      });
      if (res.ok) {
        toast.success('Home page text updated successfully!');
      } else {
        toast.error('Failed to update text');
      }
    } catch (err) {
      toast.error('An error occurred while saving');
    } finally {
      setSaving(false);
    }
  };

  const handleAddPoint = () => {
    const trimmed = config.highlight_text.trim();
    if (!trimmed) {
      setConfig({ highlight_text: '• New Point' });
    } else {
      setConfig({ highlight_text: `${trimmed}\n• ` });
    }
  };

  const handleAutoFormat = () => {
    const points = parseHighlightPoints(config.highlight_text);
    if (points.length > 0) {
      setConfig({ highlight_text: points.join('\n') });
      toast.success('Formatted into clean pointwise lines');
    }
  };

  const previewPoints = parseHighlightPoints(config.highlight_text);

  if (loading) {
    return (
      <div className="p-10 flex items-center justify-center min-h-[50vh]">
        <div className="flex items-center gap-3 text-stone-600 font-semibold">
          <Loader2 className="animate-spin" size={24} />
          Loading configuration...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#3A2418]">Home Page Configuration</h1>
          <p className="text-sm text-stone-500 mt-1">
            Configure the highlighted banner text shown on the main home landing page.
          </p>
        </div>
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form */}
        <div className="lg:col-span-7 bg-white border border-[#C5A059]/20 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <label className="block text-base font-bold text-[#3A2418]">
              Highlight Text (Pointwise)
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAutoFormat}
                className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
                title="Automatically organize into clean separate lines"
              >
                <Sparkles size={13} /> Clean Lines
              </button>
              <button
                type="button"
                onClick={handleAddPoint}
                className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 px-2.5 py-1.5 rounded-lg font-medium flex items-center gap-1 transition-colors"
              >
                <Plus size={13} /> Add Point
              </button>
            </div>
          </div>

          <div className="bg-[#FFFBF2] border border-[#C5A059]/30 rounded-2xl p-4 text-xs text-[#5D4037] leading-relaxed">
            <span className="font-bold block mb-1">💡 Mobile Pointwise Tip:</span>
            Enter each point on a <strong>new line</strong> (press Enter). On the mobile UI, each line will display as clean, formal pointwise bullet text at 12px font size without taking up unnecessary screen space.
          </div>

          <textarea
            rows={7}
            className="w-full border border-stone-300 focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30 rounded-2xl p-4 text-[#3A2418] font-medium text-sm leading-relaxed transition-all resize-y outline-none"
            placeholder="600+ Companies Career Websites [100% FREE Access]&#10;Get Ready for Your Dream Job with Complete Interview Preparation Under One Roof"
            value={config.highlight_text}
            onChange={e => setConfig({ ...config, highlight_text: e.target.value })}
          />

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <span>{previewPoints.length} point{previewPoints.length === 1 ? '' : 's'} detected</span>
            <span>{config.highlight_text.length} characters</span>
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full bg-[#5D4037] hover:bg-[#3E2723] text-white px-6 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update Text
          </button>
        </div>

        {/* Live Mobile UI Preview */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#3A2418]">
            <Smartphone size={18} className="text-[#2E7D32]" />
            <span>Live Mobile UI Preview</span>
            <span className="text-xs font-normal text-stone-500">(How it looks on mobile)</span>
          </div>

          <div className="mx-auto max-w-[340px] bg-[#FDFBF7] border-4 border-stone-800 rounded-[38px] p-3 shadow-2xl overflow-hidden relative">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-stone-800 rounded-full mx-auto mb-3" />

            {/* Mobile Header Bar Mockup */}
            <div className="bg-white border-b border-[#C5A059]/15 px-3 py-2.5 rounded-xl flex items-center justify-between mb-2 shadow-2xs">
              <span className="text-xs font-black tracking-wide text-[#3A2418]">🎓 CAREER SUPPORT 🎓</span>
              <div className="space-y-1">
                <div className="w-4 h-0.5 bg-stone-700" />
                <div className="w-4 h-0.5 bg-stone-700" />
                <div className="w-4 h-0.5 bg-stone-700" />
              </div>
            </div>

            {/* Mobile Card Preview */}
            <div className="p-4 bg-[#FDFBF7] border border-[#C5A059]/30 rounded-3xl shadow-sm text-center">
              {previewPoints.length > 1 ? (
                <ul className="space-y-2 text-left my-2 px-1">
                  {previewPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-[12px] font-semibold text-[#3A2418] leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3A2418] mt-1.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[12px] font-semibold text-[#3A2418] mb-3 leading-relaxed text-center">
                  {previewPoints[0] || '600+ Companies Career Websites [100% FREE Access]'}
                </p>
              )}

              <div className="mt-3">
                <span className="inline-block bg-[#2E7D32] text-white px-5 py-2 rounded-full font-bold text-xs shadow-md">
                  Click Here
                </span>
              </div>
            </div>

            {/* Phone Bottom Home Bar */}
            <div className="w-28 h-1 bg-stone-400 rounded-full mx-auto mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
