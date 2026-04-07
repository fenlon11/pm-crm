import { styled } from '@linaria/react';
import { themeCssVariables } from 'pm-ui/theme-constants';
import { useNavigate } from 'react-router-dom';
import { AppPath } from 'pm-shared/types';

const PR_NAVY = '#0a1628';
const PR_BLUE = '#3b82f6';
const PR_BLUE_HOVER = '#2563eb';
const PR_BORDER = '#e2e8f0';
const PR_TEXT = '#1e293b';
const PR_TEXT_MUTED = '#64748b';

export const VideosPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft>
          <PageTitle>Videos</PageTitle>
          <PageSubtitle>
            Create AI-generated discovery videos for your recruiting campaigns.
          </PageSubtitle>
        </HeaderLeft>
        <CreateButton
          type="button"
          onClick={() => navigate(AppPath.VideosCreate)}
        >
          Create Discovery Video
        </CreateButton>
      </PageHeader>

      <PageBody>
        <EmptyState>
          <EmptyIcon>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </EmptyIcon>
          <EmptyTitle>No videos yet</EmptyTitle>
          <EmptyBody>
            Create your first discovery video and embed it in your recruiting
            landing pages. Candidates watch your video before applying — warm
            leads only.
          </EmptyBody>
          <EmptyAction
            type="button"
            onClick={() => navigate(AppPath.VideosCreate)}
          >
            Create Your First Discovery Video
          </EmptyAction>
        </EmptyState>
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
  align-items: flex-start;
  background: ${themeCssVariables.background.primary};
  border-bottom: 1px solid ${PR_BORDER};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 24px 32px;

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

const PageTitle = styled.h1`
  color: ${PR_TEXT};
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 4px;
`;

const PageSubtitle = styled.p`
  color: ${PR_TEXT_MUTED};
  font-size: 14px;
  margin: 0;
`;

const CreateButton = styled.button`
  background: ${PR_BLUE};
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  transition: background 0.15s;

  &:hover {
    background: ${PR_BLUE_HOVER};
  }
`;

const PageBody = styled.div`
  flex: 1;
  padding: 32px;

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const EmptyState = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${PR_BORDER};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 480px;
  padding: 56px 40px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  color: #94a3b8;
  margin-bottom: 20px;
`;

const EmptyTitle = styled.h2`
  color: ${PR_TEXT};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
`;

const EmptyBody = styled.p`
  color: ${PR_TEXT_MUTED};
  font-size: 14px;
  line-height: 1.6;
  margin: 0 0 28px;
`;

const EmptyAction = styled.button`
  background: ${PR_NAVY};
  border: none;
  border-radius: 8px;
  color: #f1f5f9;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 24px;
  transition: background 0.15s;

  &:hover {
    background: #0f2035;
  }
`;
