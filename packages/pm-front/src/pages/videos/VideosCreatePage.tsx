import { useState } from 'react';
import { styled } from '@linaria/react';
import { themeCssVariables } from 'pm-ui/theme-constants';
import { useNavigate } from 'react-router-dom';
import { AppPath } from 'pm-shared/types';

import { DiscoveryVideoForm } from '@/videos/components/DiscoveryVideoForm';

const PR_NAVY = '#0a1628';
const PR_BORDER = '#e2e8f0';
const PR_TEXT = '#1e293b';
const PR_TEXT_MUTED = '#64748b';

export const VideosCreatePage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (data: Record<string, string>) => {
    // Phase 1: log to console only. Phase 2 wires this to /api/videos/generate-script.
    console.log('[Discovery Video] Submitted:', data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <PageContainer>
        <PageHeader>
          <BackButton type="button" onClick={() => navigate(AppPath.VideosPage)}>
            ← Back to Videos
          </BackButton>
          <HeaderTitle>Discovery Video</HeaderTitle>
        </PageHeader>
        <PageBody>
          <SuccessCard>
            <SuccessTitle>Form submitted</SuccessTitle>
            <SuccessBody>
              Script generation will be wired in Phase 2. Your form data was
              logged to the console.
            </SuccessBody>
            <SuccessActions>
              <ActionButton
                type="button"
                onClick={() => setSubmitted(false)}
              >
                Edit Form
              </ActionButton>
              <ActionButtonSecondary
                type="button"
                onClick={() => navigate(AppPath.VideosPage)}
              >
                Back to Videos
              </ActionButtonSecondary>
            </SuccessActions>
          </SuccessCard>
        </PageBody>
      </PageContainer>
    );
  }

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
};

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

  @media (max-width: 640px) {
    padding: 16px 20px;
  }
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

  &:hover {
    color: #f1f5f9;
  }
`;

const HeaderContent = styled.div``;

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

  @media (max-width: 640px) {
    padding: 16px 16px 48px;
  }
`;

const FormWrapper = styled.div`
  margin: 0 auto;
  max-width: 780px;
`;

// Success state

const SuccessCard = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${PR_BORDER};
  border-radius: 12px;
  margin: 0 auto;
  max-width: 480px;
  padding: 40px;
  text-align: center;
`;

const SuccessTitle = styled.h2`
  color: #1e293b;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px;
`;

const SuccessBody = styled.p`
  color: ${PR_TEXT_MUTED};
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 28px;
`;

const SuccessActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const ActionButton = styled.button`
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  transition: background 0.15s;

  &:hover {
    background: #2563eb;
  }
`;

const ActionButtonSecondary = styled.button`
  background: #f1f5f9;
  border: none;
  border-radius: 8px;
  color: ${PR_TEXT};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  transition: background 0.15s;

  &:hover {
    background: #e2e8f0;
  }
`;
