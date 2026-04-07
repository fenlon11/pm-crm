import { useCallback, useRef, useState } from 'react';
import { styled } from '@linaria/react';
import { themeCssVariables } from 'pm-ui/theme-constants';

import {
  DEFAULT_NARRATOR_ID,
  NARRATOR_PRESETS,
  type NarratorPreset,
} from '@/videos/constants/narrator-presets';
import {
  DEFAULT_TEMPLATE_ID,
  INDUSTRY_TEMPLATES,
  getTemplateById,
} from '@/videos/constants/industry-templates';

// PR brand tokens
const PR_NAVY = '#0a1628';
const PR_BLUE = '#3b82f6';
const PR_BLUE_HOVER = '#2563eb';
const PR_BLUE_LIGHT = '#eff6ff';
const PR_BORDER = '#e2e8f0';
const PR_TEXT = '#1e293b';
const PR_TEXT_MUTED = '#64748b';
const PR_ERROR = '#ef4444';
const PR_ERROR_BG = '#fef2f2';
const PR_ERROR_BORDER = '#fecaca';

// Duration options: 2–5 minutes for v1
// Word count targets at ~150 words/min for TTS pacing
const DURATION_OPTIONS = [
  { value: '2', label: '2 min — Quick pitch (~300 words)' },
  { value: '3', label: '3 min — Concise (~450 words)' },
  { value: '4', label: '4 min — Standard (~600 words)' },
  { value: '5', label: '5 min — In-depth (~750 words)' },
];

const EXPERIENCE_OPTIONS = [
  { value: 'new', label: 'New to industry' },
  { value: 'experienced', label: 'Experienced' },
  { value: 'both', label: 'Both' },
];

const CULTURE_TAGS = [
  'Team-oriented',
  'Independent',
  'Fast-paced',
  'Flexible hours',
  'Remote-friendly',
  'Training-focused',
  'Mentorship',
  'Work-life balance',
  'High-earning potential',
  'Entrepreneurial',
];

const REQUIRED_FIELDS: Record<string, string> = {
  companyName: 'Company name is required',
  differentiator: 'Key differentiator is required',
  topReason1: 'At least one top reason is required',
  topReason2: 'Second top reason is required',
  topReason3: 'Third top reason is required',
  compensation: 'Compensation highlights are required',
  targetRole: 'Target role is required',
  callToAction: 'Call to action is required',
};

type FormData = Record<string, string>;

const buildDefaultForm = (): FormData => ({
  companyName: '',
  industry: 'Mortgage',
  locations: '',
  websiteUrl: '',
  differentiator: '',
  topReason1: '',
  topReason2: '',
  topReason3: '',
  compensation: '',
  benefits: '',
  growthPath: '',
  cultureTags: '',
  cultureDescription: '',
  targetRole: 'Mortgage Loan Officers',
  experienceLevel: 'both',
  objections: '',
  idealCandidate: '',
  teamSize: '',
  hiringGoal: '',
  yearsInBusiness: '',
  teamSizeTotal: '',
  revenue: '',
  clientsServed: '',
  awards: '',
  testimonial1: '',
  testimonial2: '',
  testimonial3: '',
  callToAction: 'Book a 15-minute discovery call',
  calendarLink: '',
  narrator: DEFAULT_NARRATOR_ID,
  duration: '3',
});

export type DiscoveryVideoFormProps = {
  onSubmit: (data: FormData) => void;
  loading?: boolean;
};

export const DiscoveryVideoForm = ({
  onSubmit,
  loading = false,
}: DiscoveryVideoFormProps) => {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState(DEFAULT_TEMPLATE_ID);
  const [form, setForm] = useState<FormData>(buildDefaultForm);
  const [selectedCultureTags, setSelectedCultureTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedTemplate = getTemplateById(selectedTemplateId);

  const update = useCallback(
    (field: string, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [errors],
  );

  const handleTemplateSelect = (templateId: string) => {
    const template = getTemplateById(templateId);
    if (!template) return;
    setSelectedTemplateId(templateId);
    setForm((prev) => ({
      ...prev,
      industry: template.industryDefault,
      targetRole: template.targetRoleDefault,
      // Clear previous template-specific fields when switching templates
    }));
  };

  const toggleCultureTag = (tag: string) => {
    setSelectedCultureTags((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      update('cultureTags', next.join(', '));
      return next;
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    for (const [field, message] of Object.entries(REQUIRED_FIELDS)) {
      if (!form[field]?.trim()) {
        newErrors[field] = message;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    // Phase 1: log to console. Phase 2 will wire to /api/videos/generate-script
    console.log('[Discovery Video] Form submitted:', form);
    onSubmit(form);
  };

  return (
    <StyledForm onSubmit={handleSubmit} noValidate>
      {Object.keys(errors).length > 0 && (
        <ErrorBanner>
          Please fix {Object.keys(errors).length} required field
          {Object.keys(errors).length > 1 ? 's' : ''} below.
        </ErrorBanner>
      )}

      {/* Template Selection */}
      <FormSection title="Choose a Template" number={1}>
        <TemplateGrid>
          {INDUSTRY_TEMPLATES.map((template) => (
            <TemplateCard
              key={template.id}
              type="button"
              data-selected={selectedTemplateId === template.id}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <TemplateCardLabel>{template.label}</TemplateCardLabel>
              <TemplateCardDesc>{template.description}</TemplateCardDesc>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </FormSection>

      {/* Section 1: Company Basics */}
      <FormSection title="Company Basics" number={2}>
        <FieldRow>
          <Field
            label="Company Name"
            value={form.companyName}
            onChange={(v) => update('companyName', v)}
            placeholder="Acme Mortgage Group"
            required
            error={errors.companyName}
          />
          <Field
            label="Industry"
            value={form.industry}
            onChange={(v) => update('industry', v)}
            placeholder="e.g., Mortgage"
          />
        </FieldRow>
        <FieldRow>
          <Field
            label="Location(s)"
            value={form.locations}
            onChange={(v) => update('locations', v)}
            placeholder="Miami, FL"
          />
          <Field
            label="Website URL"
            value={form.websiteUrl}
            onChange={(v) => update('websiteUrl', v)}
            placeholder="https://acmemortgage.com"
          />
        </FieldRow>

        {/* Industry-specific fields */}
        {selectedTemplate && selectedTemplate.industrySpecificFields.length > 0 && (
          <>
            <SectionDivider>
              {selectedTemplate.label}-specific details
            </SectionDivider>
            {selectedTemplate.industrySpecificFields.map((field) =>
              field.type === 'textarea' ? (
                <TextArea
                  key={field.key}
                  label={field.label}
                  value={form[field.key] ?? ''}
                  onChange={(v) => update(field.key, v)}
                  placeholder={field.placeholder}
                  hint={field.hint}
                />
              ) : (
                <Field
                  key={field.key}
                  label={field.label}
                  value={form[field.key] ?? ''}
                  onChange={(v) => update(field.key, v)}
                  placeholder={field.placeholder}
                  hint={field.hint}
                />
              ),
            )}
          </>
        )}
      </FormSection>

      {/* Section 2: Value Proposition */}
      <FormSection title="Value Proposition" number={3}>
        <TextArea
          label="What makes your company different?"
          value={form.differentiator}
          onChange={(v) => update('differentiator', v)}
          placeholder="We built our agency around the agent's success..."
          hint="What would you tell a candidate who asks 'Why should I join you?'"
          required
          error={errors.differentiator}
        />
        <FieldRow3Col>
          <Field
            label="Top Reason #1"
            value={form.topReason1}
            onChange={(v) => update('topReason1', v)}
            placeholder="Uncapped commissions"
            required
            error={errors.topReason1}
          />
          <Field
            label="Top Reason #2"
            value={form.topReason2}
            onChange={(v) => update('topReason2', v)}
            placeholder="90-day paid mentorship"
            required
            error={errors.topReason2}
          />
          <Field
            label="Top Reason #3"
            value={form.topReason3}
            onChange={(v) => update('topReason3', v)}
            placeholder="Warm leads from day one"
            required
            error={errors.topReason3}
          />
        </FieldRow3Col>
        <TextArea
          label="Compensation Highlights"
          value={form.compensation}
          onChange={(v) => update('compensation', v)}
          placeholder="Uncapped commissions. Top agents earn $150K+..."
          hint="Commission structure, base salary, bonuses"
          required
          error={errors.compensation}
        />
        <TextArea
          label="Benefits & Perks"
          value={form.benefits}
          onChange={(v) => update('benefits', v)}
          placeholder="Health insurance, 401k match, flexible PTO..."
        />
        <TextArea
          label="Growth Path"
          value={form.growthPath}
          onChange={(v) => update('growthPath', v)}
          placeholder="Agent → Senior Agent → Team Lead → Manager"
        />
        <div>
          <FieldLabel>Culture</FieldLabel>
          <CultureTagGrid>
            {CULTURE_TAGS.map((tag) => (
              <CultureTag
                key={tag}
                type="button"
                data-active={selectedCultureTags.includes(tag)}
                onClick={() => toggleCultureTag(tag)}
              >
                {tag}
              </CultureTag>
            ))}
          </CultureTagGrid>
        </div>
        <TextArea
          label="Describe Your Culture"
          value={form.cultureDescription}
          onChange={(v) => update('cultureDescription', v)}
          placeholder="We're a tight-knit team that works hard..."
        />
      </FormSection>

      {/* Section 3: Recruiting Specifics */}
      <FormSection title="Recruiting Specifics" number={4}>
        <Field
          label="Role(s) You're Hiring For"
          value={form.targetRole}
          onChange={(v) => update('targetRole', v)}
          placeholder="Mortgage Loan Officers"
          required
          error={errors.targetRole}
        />
        <div>
          <FieldLabel>Experience Level</FieldLabel>
          <RadioGroup>
            {EXPERIENCE_OPTIONS.map((opt) => (
              <RadioLabel key={opt.value}>
                <input
                  type="radio"
                  name="experienceLevel"
                  value={opt.value}
                  checked={form.experienceLevel === opt.value}
                  onChange={(e) => update('experienceLevel', e.target.value)}
                />
                {opt.label}
              </RadioLabel>
            ))}
          </RadioGroup>
        </div>
        <TextArea
          label="Common Objections"
          value={form.objections}
          onChange={(v) => update('objections', v)}
          placeholder="'I've been burned by promises before'..."
          hint="What pushback do you hear from candidates?"
        />
        <TextArea
          label="Ideal Candidate Profile"
          value={form.idealCandidate}
          onChange={(v) => update('idealCandidate', v)}
          placeholder="Ambitious, self-motivated, coachable..."
        />
        <FieldRow>
          <Field
            label="Current Team Size"
            value={form.teamSize}
            onChange={(v) => update('teamSize', v)}
            placeholder="200+"
          />
          <Field
            label="Hiring Goal"
            value={form.hiringGoal}
            onChange={(v) => update('hiringGoal', v)}
            placeholder="10 this quarter"
          />
        </FieldRow>
      </FormSection>

      {/* Section 4: Social Proof */}
      <FormSection title="Social Proof" number={5}>
        <FieldRow4Col>
          <Field
            label="Years in Business"
            value={form.yearsInBusiness}
            onChange={(v) => update('yearsInBusiness', v)}
            placeholder="12"
          />
          <Field
            label="Team Size"
            value={form.teamSizeTotal}
            onChange={(v) => update('teamSizeTotal', v)}
            placeholder="200+"
          />
          <Field
            label="Revenue"
            value={form.revenue}
            onChange={(v) => update('revenue', v)}
            placeholder="$40M+"
          />
          <Field
            label="Clients / States"
            value={form.clientsServed}
            onChange={(v) => update('clientsServed', v)}
            placeholder="8 states"
          />
        </FieldRow4Col>
        <TextArea
          label="Awards & Recognitions"
          value={form.awards}
          onChange={(v) => update('awards', v)}
          placeholder="Inc. 5000, Best Places to Work..."
        />
        <Field
          label="Testimonial #1"
          value={form.testimonial1}
          onChange={(v) => update('testimonial1', v)}
          placeholder="'The mentorship changed my career.' — Sarah M."
        />
        <Field
          label="Testimonial #2"
          value={form.testimonial2}
          onChange={(v) => update('testimonial2', v)}
          placeholder="'I earned more in year one...' — James T."
        />
        <Field
          label="Testimonial #3 (optional)"
          value={form.testimonial3}
          onChange={(v) => update('testimonial3', v)}
          placeholder="Optional third testimonial"
        />
      </FormSection>

      {/* Section 5: Video Settings */}
      <FormSection title="Video Settings" number={6}>
        <FieldRow>
          <Field
            label="Call to Action"
            value={form.callToAction}
            onChange={(v) => update('callToAction', v)}
            placeholder="Book a 15-minute discovery call"
            required
            error={errors.callToAction}
          />
          <Field
            label="Calendar Link (optional)"
            value={form.calendarLink}
            onChange={(v) => update('calendarLink', v)}
            placeholder="https://calendly.com/your-link"
          />
        </FieldRow>
        <div>
          <FieldLabel>Duration</FieldLabel>
          <DurationGrid>
            {DURATION_OPTIONS.map((opt) => (
              <DurationOption
                key={opt.value}
                type="button"
                data-selected={form.duration === opt.value}
                onClick={() => update('duration', opt.value)}
              >
                {opt.label}
              </DurationOption>
            ))}
          </DurationGrid>
        </div>
        <NarratorSelectorField
          selected={form.narrator}
          onChange={(id) => update('narrator', id)}
        />
      </FormSection>

      <SubmitRow>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate Discovery Video Script'}
        </SubmitButton>
        <SubmitHint>
          AI generates your script in ~15 seconds. Review and approve before
          video renders.
        </SubmitHint>
      </SubmitRow>
    </StyledForm>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FormSection({
  title,
  number,
  children,
}: {
  title: string;
  number: number;
  children: React.ReactNode;
}) {
  return (
    <SectionCard>
      <SectionHeader>
        <SectionNumber>{number}</SectionNumber>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      <SectionBody>{children}</SectionBody>
    </SectionCard>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}) {
  return (
    <FieldWrapper data-error={error ? 'true' : undefined}>
      <FieldLabel>
        {label}
        {required && <RequiredMark>*</RequiredMark>}
      </FieldLabel>
      {hint && <FieldHint>{hint}</FieldHint>}
      <StyledInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-error={error ? 'true' : undefined}
      />
      {error && <FieldError>{error}</FieldError>}
    </FieldWrapper>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <FieldWrapper data-error={error ? 'true' : undefined}>
      <FieldLabel>
        {label}
        {required && <RequiredMark>*</RequiredMark>}
      </FieldLabel>
      {hint && <FieldHint>{hint}</FieldHint>}
      <StyledTextarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        data-error={error ? 'true' : undefined}
      />
      {error && <FieldError>{error}</FieldError>}
    </FieldWrapper>
  );
}

function NarratorSelectorField({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (id: string) => void;
}) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePreview = (narrator: NarratorPreset) => {
    if (!narrator.previewAudioUrl) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingId === narrator.id) {
      setPlayingId(null);
      return;
    }

    const audio = new Audio(narrator.previewAudioUrl);
    audioRef.current = audio;
    setPlayingId(narrator.id);
    audio.play().catch(() => setPlayingId(null));
    audio.onended = () => setPlayingId(null);
    audio.onerror = () => setPlayingId(null);
  };

  return (
    <div>
      <FieldLabel>Narrator Voice</FieldLabel>
      <FieldHint>
        Voice previews will be available after Phase 2 (ElevenLabs setup).
      </FieldHint>
      <NarratorGrid>
        {NARRATOR_PRESETS.map((narrator) => (
          <NarratorCard
            key={narrator.id}
            type="button"
            data-selected={selected === narrator.id}
            onClick={() => onChange(narrator.id)}
          >
            <NarratorAvatar data-gender={narrator.gender}>
              {narrator.name.charAt(0)}
              {narrator.previewAudioUrl && (
                <NarratorPlayBtn
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(narrator);
                  }}
                >
                  {playingId === narrator.id ? '⏸' : '▶'}
                </NarratorPlayBtn>
              )}
            </NarratorAvatar>
            <NarratorInfo>
              <NarratorName>
                {narrator.name}
                <NarratorGenderPill data-gender={narrator.gender}>
                  {narrator.gender === 'male' ? 'M' : 'F'}
                </NarratorGenderPill>
              </NarratorName>
              <NarratorDesc>{narrator.description}</NarratorDesc>
            </NarratorInfo>
            {selected === narrator.id && <NarratorCheck>✓</NarratorCheck>}
          </NarratorCard>
        ))}
      </NarratorGrid>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Styled components
// ---------------------------------------------------------------------------

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ErrorBanner = styled.div`
  background: ${PR_ERROR_BG};
  border: 1px solid ${PR_ERROR_BORDER};
  border-radius: 8px;
  color: ${PR_ERROR};
  font-size: 14px;
  font-weight: 500;
  padding: 12px 16px;
`;

// Template selector

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TemplateCard = styled.button`
  background: #fff;
  border: 2px solid ${PR_BORDER};
  border-radius: 10px;
  cursor: pointer;
  padding: 12px 14px;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;

  &[data-selected='true'] {
    background: ${PR_BLUE_LIGHT};
    border-color: ${PR_BLUE};
  }

  &:hover:not([data-selected='true']) {
    border-color: #94a3b8;
  }
`;

const TemplateCardLabel = styled.span`
  color: ${PR_TEXT};
  display: block;
  font-size: 14px;
  font-weight: 600;
`;

const TemplateCardDesc = styled.span`
  color: ${PR_TEXT_MUTED};
  display: block;
  font-size: 12px;
  margin-top: 3px;
`;

// Section card

const SectionCard = styled.div`
  background: #fff;
  border: 1px solid ${PR_BORDER};
  border-radius: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  align-items: center;
  background: ${PR_NAVY};
  display: flex;
  gap: 10px;
  padding: 12px 20px;
`;

const SectionNumber = styled.span`
  align-items: center;
  background: rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  color: #93c5fd;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  height: 22px;
  justify-content: center;
  width: 22px;
`;

const SectionTitle = styled.h2`
  color: #f1f5f9;
  font-size: 15px;
  font-weight: 600;
  margin: 0;
`;

const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
`;

const SectionDivider = styled.div`
  border-top: 1px solid ${PR_BORDER};
  color: ${PR_TEXT_MUTED};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding-top: 14px;
  text-transform: uppercase;
`;

// Field layout

const FieldRow = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FieldRow3Col = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FieldRow4Col = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FieldWrapper = styled.div``;

const FieldLabel = styled.label`
  color: ${PR_TEXT};
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const FieldHint = styled.p`
  color: ${PR_TEXT_MUTED};
  font-size: 12px;
  margin: 0 0 5px;
`;

const RequiredMark = styled.span`
  color: ${PR_ERROR};
  margin-left: 2px;
`;

const FieldError = styled.p`
  color: ${PR_ERROR};
  font-size: 12px;
  margin: 4px 0 0;
`;

const sharedInputStyle = `
  background: #fff;
  border: 1px solid ${PR_BORDER};
  border-radius: 8px;
  box-sizing: border-box;
  color: ${PR_TEXT};
  font-size: 14px;
  outline: none;
  padding: 9px 12px;
  transition: border-color 0.15s, box-shadow 0.15s;
  width: 100%;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: ${PR_BLUE};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  }

  &[data-error='true'] {
    border-color: ${PR_ERROR};
    &:focus {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
  }
`;

const StyledInput = styled.input`
  ${sharedInputStyle}
`;

const StyledTextarea = styled.textarea`
  ${sharedInputStyle}
  resize: vertical;
`;

// Culture tags

const CultureTagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`;

const CultureTag = styled.button`
  background: #f1f5f9;
  border: 1px solid transparent;
  border-radius: 100px;
  color: ${PR_TEXT_MUTED};
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 5px 12px;
  transition: all 0.15s;

  &[data-active='true'] {
    background: ${PR_BLUE_LIGHT};
    border-color: #bfdbfe;
    color: #1d4ed8;
  }

  &:hover:not([data-active='true']) {
    background: #e2e8f0;
  }
`;

// Experience radio

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 6px;
`;

const RadioLabel = styled.label`
  align-items: center;
  color: ${PR_TEXT};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  gap: 6px;
`;

// Duration selector

const DurationGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 6px;
`;

const DurationOption = styled.button`
  background: #fff;
  border: 2px solid ${PR_BORDER};
  border-radius: 8px;
  color: ${PR_TEXT};
  cursor: pointer;
  font-size: 14px;
  padding: 10px 14px;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;

  &[data-selected='true'] {
    background: ${PR_BLUE_LIGHT};
    border-color: ${PR_BLUE};
    color: #1d4ed8;
    font-weight: 600;
  }

  &:hover:not([data-selected='true']) {
    border-color: #94a3b8;
  }
`;

// Narrator selector

const NarratorGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 8px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const NarratorCard = styled.button`
  align-items: center;
  background: #fff;
  border: 2px solid ${PR_BORDER};
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  padding: 12px;
  position: relative;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;

  &[data-selected='true'] {
    background: ${PR_BLUE_LIGHT};
    border-color: ${PR_BLUE};
  }

  &:hover:not([data-selected='true']) {
    border-color: #94a3b8;
  }
`;

const NarratorAvatar = styled.div`
  align-items: center;
  background: ${PR_NAVY};
  border-radius: 8px;
  color: #93c5fd;
  display: flex;
  flex-shrink: 0;
  font-size: 22px;
  font-weight: 700;
  height: 48px;
  justify-content: center;
  position: relative;
  width: 48px;

  &[data-gender='female'] {
    background: #4c1d95;
    color: #c4b5fd;
  }
`;

const NarratorPlayBtn = styled.button`
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 8px;
  bottom: 0;
  cursor: pointer;
  display: flex;
  font-size: 10px;
  inset: 0;
  justify-content: center;
  opacity: 0;
  position: absolute;
  transition: opacity 0.15s;

  ${NarratorCard}:hover & {
    opacity: 1;
  }
`;

const NarratorInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NarratorName = styled.div`
  align-items: center;
  color: ${PR_TEXT};
  display: flex;
  font-size: 14px;
  font-weight: 600;
  gap: 6px;
`;

const NarratorGenderPill = styled.span`
  background: #dbeafe;
  border-radius: 100px;
  color: #1d4ed8;
  font-size: 11px;
  font-weight: 500;
  padding: 1px 7px;

  &[data-gender='female'] {
    background: #ede9fe;
    color: #6d28d9;
  }
`;

const NarratorDesc = styled.div`
  color: ${PR_TEXT_MUTED};
  font-size: 12px;
  margin-top: 2px;
`;

const NarratorCheck = styled.div`
  align-items: center;
  background: ${PR_BLUE};
  border-radius: 50%;
  color: #fff;
  display: flex;
  flex-shrink: 0;
  font-size: 12px;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 20px;
`;

// Submit row

const SubmitRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 4px;
`;

const SubmitButton = styled.button`
  background: ${PR_BLUE};
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 28px;
  transition: background 0.15s, opacity 0.15s;

  &:hover:not(:disabled) {
    background: ${PR_BLUE_HOVER};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SubmitHint = styled.p`
  color: ${PR_TEXT_MUTED};
  font-size: 13px;
  margin: 0;
`;
