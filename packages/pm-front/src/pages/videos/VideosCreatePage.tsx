import { useCallback, useState } from 'react';
import { styled } from '@linaria/react';
import { themeCssVariables } from 'pm-ui/theme-constants';
import { useNavigate } from 'react-router-dom';
import { AppPath } from 'pm-shared/types';

import { DiscoveryVideoForm } from '@/videos/components/DiscoveryVideoForm';

const PR_NAVY = '#0a1628';
const PR_BLUE = '#3b82f6';
const PR_BORDER = '#e2e8f0';
const PR_TEXT = '#1e293b';
const PR_TEXT_MUTED = '#64748b';

const VIDEO_API_URL = 'https://pr-video-api.fenlon11.workers.dev';

interface ScriptSection {
  title: string;
  speakerNotes: string;
  slideCue: string;
  durationSeconds: number;
}

interface VideoScript {
  title: string;
  totalDurationMinutes: number;
  sections: ScriptSection[];
  metadata: {
    companyName: string;
    industry: string;
    generatedAt: string;
  };
}

type PageState = 'form' | 'generating' | 'script-preview' | 'error';

export const VideosCreatePage = () => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState<PageState>('form');
  const [script, setScript] = useState<VideoScript | null>(null);
  const [error, setError] = useState<string>('');
  const [ttsProgress, setTtsProgress] = useState<Record<number, string>>({});
  const [generatingTts, setGeneratingTts] = useState<number | null>(null);

  const handleSubmit = useCallback(async (data: Record<string, string>) => {
    setPageState('generating');
    setError('');

    try {
      const res = await fetch(`${VIDEO_API_URL}/api/generate-script`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: data.companyName || data.company_name,
          roleTitle: data.roleTitle || data.role_title || data.jobTitle,
          industry: data.industry || 'general',
          jobDescription: data.jobDescription || data.job_description || '',
          benefits: data.benefits ? data.benefits.split(',').map((s: string) => s.trim()) : [],
          cultureTags: data.cultureTags ? data.cultureTags.split(',').map((s: string) => s.trim()) : [],
          location: data.location || '',
          experienceLevel: data.experienceLevel || data.experience_level || 'both',
          durationMinutes: parseInt(data.duration || '3', 10),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const scriptData: VideoScript = await res.json();
      setScript(scriptData);
      setPageState('script-preview');
    } catch (err: any) {
      setError(err.message || 'Failed to generate script');
      setPageState('error');
    }
  }, []);

  const handleGenerateTts = useCallback(async (sectionIndex: number, text: string) => {
    setGeneratingTts(sectionIndex);
    try {
      const res = await fetch(`${VIDEO_API_URL}/api/generate-tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          sectionIndex,
          videoId: script?.metadata?.companyName?.replace(/\s+/g, '-').toLowerCase() || 'video',
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'TTS failed' }));
        throw new Error(errData.error || `HTTP ${res.status}`);
      }

      const ttsData = await res.json();
      setTtsProgress((prev) => ({ ...prev, [sectionIndex]: ttsData.audioUrl }));
    } catch (err: any) {
      setTtsProgress((prev) => ({ ...prev, [sectionIndex]: `error:${err.message}` }));
    } finally {
      setGeneratingTts(null);
    }
  }, [script]);

  const handleGenerateAllTts = useCallback(async () => {
    if (!script) return;
    for (let i = 0; i < script.sections.length; i++) {
      await handleGenerateTts(i, script.sections[i].speakerNotes);
    }
  }, [script, handleGenerateTts]);

  // ── Form state ──────────────────────────────────────────────────
  if (pageState === 'form') {
    return (
      <PageContainer>
        <PageHeader>
          <BackButton type="button" onClick={() => navigate(AppPath.VideosPage)}>
            ← Back to Videos
          </BackButton>
          <HeaderContent>
            <HeaderTitle>Create Discovery Video</HeaderTitle>
            <HeaderSubtitle>
              Fill in the details below. AI generates your script, then renders
              your professional recruiting video in minutes.
            </HeaderSubtitle>
          </HeaderContent>
        </PageHeader>
        <PageBody>
          <FormWrapper>
            <DiscoveryVideoForm onSubmit={handleSubmit} />
          </FormWrapper>
        </PageBody>
      </PageContainer>
    );
  }

  // ── Generating state ────────────────────────────────────────────
  if (pageState === 'generating') {
    return (
      <PageContainer>
        <PageHeader>
          <HeaderTitle>Generating Script...</HeaderTitle>
          <HeaderSubtitle>Gemini Flash is writing your Discovery Video script. This takes about 5 seconds.</HeaderSubtitle>
        </PageHeader>
        <PageBody>
          <CenterCard>
            <Spinner />
            <SpinnerText>Generating script with AI...</SpinnerText>
          </CenterCard>
        </PageBody>
      </PageContainer>
    );
  }

  // ── Error state ─────────────────────────────────────────────────
  if (pageState === 'error') {
    return (
      <PageContainer>
        <PageHeader>
          <BackButton type="button" onClick={() => setPageState('form')}>← Back to Form</BackButton>
          <HeaderTitle>Script Generation Failed</HeaderTitle>
        </PageHeader>
        <PageBody>
          <CenterCard>
            <ErrorText>{error}</ErrorText>
            <ActionButton type="button" onClick={() => setPageState('form')}>Try Again</ActionButton>
          </CenterCard>
        </PageBody>
      </PageContainer>
    );
  }

  // ── Script Preview state ────────────────────────────────────────
  return (
    <PageContainer>
      <PageHeader>
        <BackButton type="button" onClick={() => setPageState('form')}>← Edit Form</BackButton>
        <HeaderContent>
          <HeaderTitle>{script?.title || 'Script Preview'}</HeaderTitle>
          <HeaderSubtitle>
            {script?.sections.length} sections · ~{script?.totalDurationMinutes} minutes ·{' '}
            {script?.metadata?.companyName}
          </HeaderSubtitle>
        </HeaderContent>
        <HeaderActions>
          <GenerateAllButton type="button" onClick={handleGenerateAllTts}>
            Generate All Audio
          </GenerateAllButton>
        </HeaderActions>
      </PageHeader>
      <PageBody>
        <ScriptContainer>
          {script?.sections.map((section, idx) => (
            <SectionCard key={idx}>
              <SectionHeader>
                <SectionNumber>{idx + 1}</SectionNumber>
                <SectionMeta>
                  <SectionTitle>{section.title}</SectionTitle>
                  <SectionDuration>{section.durationSeconds}s · {Math.round(section.speakerNotes.split(/\s+/).length)} words</SectionDuration>
                </SectionMeta>
                <TtsButton
                  type="button"
                  onClick={() => handleGenerateTts(idx, section.speakerNotes)}
                  disabled={generatingTts === idx}
                >
                  {generatingTts === idx
                    ? 'Generating...'
                    : ttsProgress[idx] && !ttsProgress[idx].startsWith('error:')
                    ? '✓ Audio Ready'
                    : 'Generate Audio'}
                </TtsButton>
              </SectionHeader>
              <SlideCue>{section.slideCue}</SlideCue>
              <SpeakerNotes>{section.speakerNotes}</SpeakerNotes>
              {ttsProgress[idx] && !ttsProgress[idx].startsWith('error:') && (
                <AudioPlayer>
                  <audio controls src={ttsProgress[idx]} style={{ width: '100%' }} />
                </AudioPlayer>
              )}
              {ttsProgress[idx]?.startsWith('error:') && (
                <TtsError>{ttsProgress[idx].replace('error:', '')}</TtsError>
              )}
            </SectionCard>
          ))}
        </ScriptContainer>
      </PageBody>
    </PageContainer>
  );
};

// ── Styles ────────────────────────────────────────────────────────

const PageContainer = styled.div`
  background: ${themeCssVariables.background.noisy};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  background: ${PR_NAVY};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 32px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  text-align: left;
  transition: color 0.15s;
  width: fit-content;
  &:hover { color: #f1f5f9; }
`;

const HeaderContent = styled.div``;
const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const HeaderTitle = styled.h1`
  color: #f1f5f9;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px;
`;

const HeaderSubtitle = styled.p`
  color: #94a3b8;
  font-size: 13px;
  margin: 0;
`;

const PageBody = styled.div`
  flex: 1;
  padding: 24px 32px 48px;
  @media (max-width: 640px) { padding: 16px 16px 48px; }
`;

const FormWrapper = styled.div`
  margin: 0 auto;
  max-width: 780px;
`;

const CenterCard = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${PR_BORDER};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 480px;
  padding: 48px;
  text-align: center;
`;

const Spinner = styled.div`
  animation: spin 1s linear infinite;
  border: 3px solid #e2e8f0;
  border-radius: 50%;
  border-top: 3px solid ${PR_BLUE};
  height: 40px;
  width: 40px;
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const SpinnerText = styled.p`
  color: ${PR_TEXT_MUTED};
  font-size: 14px;
  margin: 0;
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin: 0;
`;

const ActionButton = styled.button`
  background: ${PR_BLUE};
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  &:hover { background: #2563eb; }
`;

const GenerateAllButton = styled.button`
  background: ${PR_BLUE};
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  &:hover { background: #2563eb; }
`;

// Script preview styles

const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  max-width: 780px;
`;

const SectionCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${PR_BORDER};
  border-radius: 10px;
  padding: 20px;
`;

const SectionHeader = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
`;

const SectionNumber = styled.div`
  align-items: center;
  background: ${PR_BLUE};
  border-radius: 50%;
  color: #fff;
  display: flex;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
  height: 28px;
  justify-content: center;
  width: 28px;
`;

const SectionMeta = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h3`
  color: ${PR_TEXT};
  font-size: 15px;
  font-weight: 600;
  margin: 0;
`;

const SectionDuration = styled.span`
  color: ${PR_TEXT_MUTED};
  font-size: 12px;
`;

const TtsButton = styled.button`
  background: #f1f5f9;
  border: 1px solid ${PR_BORDER};
  border-radius: 6px;
  color: ${PR_TEXT};
  cursor: pointer;
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  transition: all 0.15s;
  &:hover { background: #e2e8f0; }
  &:disabled { cursor: wait; opacity: 0.6; }
`;

const SlideCue = styled.div`
  background: #f0f9ff;
  border-left: 3px solid ${PR_BLUE};
  border-radius: 4px;
  color: ${PR_TEXT_MUTED};
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 12px;
  padding: 8px 12px;
`;

const SpeakerNotes = styled.div`
  color: ${PR_TEXT};
  font-size: 14px;
  line-height: 1.7;
`;

const AudioPlayer = styled.div`
  margin-top: 12px;
`;

const TtsError = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 8px;
`;
