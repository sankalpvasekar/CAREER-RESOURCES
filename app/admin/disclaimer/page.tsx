'use client';
import { useEffect, useState } from 'react';
import { Save, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DisclaimerAdminPage() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/config').then(res => res.json()).then(data => {
      setContent(data.disclaimer_content || '');
      setLoading(false);
    });
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disclaimer_content: content })
      });
      toast.success('Disclaimer updated');
    } catch (err) {
      toast.error('Failed');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Manage Disclaimer Content</h1>
      <textarea className="w-full h-64 border p-3 rounded-xl" value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleUpdate} disabled={saving} className="bg-[#5D4037] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
           {saving ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />} Save
      </button>
    </div>
  );
}