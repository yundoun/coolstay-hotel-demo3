'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageUploadZone } from './_components/image-upload-zone';
import type { SiteConfig } from '@/domain/site-config/types';
import { Save, Plus, Trash2, Eye, RotateCcw } from 'lucide-react';

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, setValue, watch, reset } = useForm<SiteConfig>();

  const heroImages = watch('heroImages') || [];
  const aboutImages = watch('about.images') || [];
  const nearbyItems = watch('directions.nearbyItems') || [];

  useEffect(() => {
    fetch('/api/admin/config')
      .then((res) => res.json())
      .then((data) => {
        reset(data);
        setLoading(false);
      });
  }, [reset]);

  const onSubmit = async (data: SiteConfig) => {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      setMessage('저장 완료! 사이트에 반영됩니다.');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('저장 실패. 다시 시도해주세요.');
    }
  };

  const addNearbyItem = () => {
    setValue('directions.nearbyItems', [...nearbyItems, { label: '', value: '' }]);
  };

  const removeNearbyItem = (index: number) => {
    setValue('directions.nearbyItems', nearbyItems.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-neutral-500">불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">호텔 사이트 설정</h1>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <Eye className="w-4 h-4" />
          사이트 미리보기
        </a>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

        {/* ── API 키 안내 ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-medium mb-1">객실·예약 데이터 연결</p>
          <p className="text-amber-600">
            호텔의 객실/가격을 불러오려면 <code className="bg-amber-100 px-1 rounded">.env.local</code> 파일에서
            <code className="bg-amber-100 px-1 rounded">COOLSTAY_MOTEL_KEY</code>를 해당 호텔 키로 변경 후 서버를 재시작하세요.
          </p>
        </div>

        {/* ── 기본 정보 ── */}
        <Section title="기본 정보">
          <Field label="호텔명 (한글)">
            <input {...register('name')} className="field" />
          </Field>
          <Field label="호텔명 (영문)" desc="히어로·헤더에 표시">
            <input {...register('nameEn')} className="field" />
          </Field>
          <Field label="도시">
            <input {...register('city')} className="field" />
          </Field>
          <Field label="주소" desc="지도 검색에도 사용됨">
            <input {...register('address')} className="field" />
          </Field>
          <Field label="대표 연락처">
            <input {...register('phone')} className="field" />
          </Field>
          <Field label="이메일" desc="비워두면 화면에 표시되지 않음">
            <input {...register('email')} className="field" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="체크인 시간" desc="기본값 (API 없을 때 사용)">
              <input {...register('checkInTime')} className="field" placeholder="15:00" />
            </Field>
            <Field label="체크아웃 시간" desc="기본값 (API 없을 때 사용)">
              <input {...register('checkOutTime')} className="field" placeholder="11:00" />
            </Field>
          </div>
        </Section>

        {/* ── Hero 섹션 ── */}
        <Section title="Hero 배너">
          <ImageUploadZone
            images={heroImages}
            onChange={(imgs) => setValue('heroImages', imgs)}
            max={5}
            label="배너 슬라이드 이미지"
          />
          <Field label="한 줄 컨셉" desc="브라우저 탭 제목에 표시">
            <input {...register('shortConcept')} className="field" />
          </Field>
        </Section>

        {/* ── 인사말 ── */}
        <Section title="인사말">
          <Field label="제목" desc="줄바꿈은 Enter 키 사용">
            <textarea {...register('greeting.headline')} className="field" rows={2} />
          </Field>
          <Field label="본문" desc="빈 줄로 문단 구분">
            <textarea {...register('greeting.body')} className="field" rows={4} />
          </Field>
          <Field label="서명" desc="뒤에 '올림'이 자동으로 붙음">
            <input {...register('greeting.signature')} className="field" />
          </Field>
        </Section>

        {/* ── About ── */}
        <Section title="호텔 소개 (About)">
          <Field label="소제목" desc="제목 위에 작게 표시 (예: About, Story)">
            <input {...register('about.subtitle')} className="field" />
          </Field>
          <Field label="제목" desc="줄바꿈은 Enter 키 사용">
            <textarea {...register('about.title')} className="field" rows={2} />
          </Field>
          <Field label="본문">
            <textarea {...register('about.body')} className="field" rows={4} />
          </Field>
          <Field label="철학/모토" desc="비워두면 표시되지 않음">
            <input {...register('about.philosophy')} className="field" />
          </Field>
          <ImageUploadZone
            images={aboutImages}
            onChange={(imgs) => setValue('about.images', imgs)}
            max={2}
            label="소개 섹션 이미지"
          />
        </Section>

        {/* ── 찾아오는 길 ── */}
        <Section title="찾아오는 길">
          <Field label="주차 안내" desc="비워두면 화면에 표시되지 않음">
            <textarea {...register('directions.parkingInfo')} className="field" rows={2} />
          </Field>

          <div>
            <p className="text-sm font-medium text-neutral-700 mb-3">주변 정보</p>
            <div className="space-y-2">
              {nearbyItems.map((_, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    {...register(`directions.nearbyItems.${i}.label`)}
                    placeholder="장소명"
                    className="field flex-1"
                  />
                  <input
                    {...register(`directions.nearbyItems.${i}.value`)}
                    placeholder="거리/시간"
                    className="field flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeNearbyItem(i)}
                    className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addNearbyItem}
              className="mt-2 flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> 항목 추가
            </button>
          </div>
        </Section>

        {/* ── 저장 / 초기화 ── */}
        <div className="sticky bottom-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-800 disabled:opacity-50 transition-colors shadow-lg"
          >
            <Save className="w-4 h-4" />
            {saving ? '저장 중...' : '저장'}
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!confirm('원본 데이터로 초기화할까요?')) return;
              await fetch('/api/admin/config', { method: 'DELETE' });
              const res = await fetch('/api/admin/config');
              const data = await res.json();
              reset(data);
              setMessage('원본으로 초기화 완료!');
              setTimeout(() => setMessage(''), 3000);
            }}
            className="flex items-center gap-2 bg-white text-neutral-600 px-6 py-3 rounded-lg font-medium border border-neutral-200 hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
          {message && (
            <span className={`text-sm font-medium ${message.includes('완료') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

/* ── Helper Components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
      <h2 className="text-lg font-semibold text-neutral-900 mb-5">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        {label}
        {desc && <span className="font-normal text-neutral-400 ml-2">{desc}</span>}
      </label>
      {children}
    </div>
  );
}
