import { REACT_APP_SERVER_BASE_URL } from '~/config';
import { getBrandConfig } from 'pm-shared/brand';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@linaria/react';

type JobPublicView = {
  id: string;
  title: string;
  companyName: string;
  description: string | null;
  requirements: string | null;
  location: string | null;
  salary: string | null;
  jobType: string | null;
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const brand = getBrandConfig('recruiter');
const { primary, secondary, background, surface, text, textLight } =
  brand.colors;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${background};
  color: ${text};
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  padding: 0;
  margin: 0;
`;

const Header = styled.header`
  background-color: ${primary};
  border-bottom: 2px solid ${secondary};
  padding: 16px 24px;
  display: flex;
  align-items: center;
`;

const HeaderBrand = styled.span`
  color: ${secondary};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px 64px;

  @media (min-width: 600px) {
    padding: 48px 24px 64px;
  }
`;

const JobCard = styled.div`
  background-color: ${surface};
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 32px;
`;

const JobTitle = styled.h1`
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 8px;
  color: ${text};

  @media (min-width: 600px) {
    font-size: 30px;
  }
`;

const CompanyName = styled.p`
  font-size: 16px;
  color: ${secondary};
  margin: 0 0 20px;
  font-weight: 500;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`;

const MetaBadge = styled.span`
  background-color: rgba(26, 188, 156, 0.12);
  color: ${secondary};
  border: 1px solid rgba(26, 188, 156, 0.25);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
`;

const SectionLabel = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${textLight};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin: 24px 0 8px;
`;

const BodyText = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  white-space: pre-wrap;
`;

const FormCard = styled.div`
  background-color: ${surface};
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px;
`;

const FormTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${text};
  margin: 0 0 24px;
`;

const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

const FieldLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: ${textLight};
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 6px;

  span {
    color: ${secondary};
    margin-left: 2px;
  }
`;

const inputStyles = `
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: ${text};
  font-size: 15px;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.15s;

  &:focus {
    border-color: ${secondary};
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.25);
  }
`;

const Input = styled.input`
  ${inputStyles}
`;

const Textarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 100px;
`;

const FileInputWrapper = styled.div`
  position: relative;
`;

const FileInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(255, 255, 255, 0.04);
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  transition: border-color 0.15s;
  font-size: 14px;
  color: ${textLight};

  &:hover {
    border-color: ${secondary};
    color: ${text};
  }
`;

const FileInputHidden = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const SelectedFileName = styled.span`
  color: ${secondary};
  font-size: 14px;
  margin-top: 6px;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${secondary};
  color: #0f1923;
  font-size: 15px;
  font-weight: 700;
  padding: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const ErrorMessage = styled.p`
  color: #f87171;
  font-size: 14px;
  margin: 16px 0 0;
`;

const SuccessCard = styled.div`
  background-color: rgba(26, 188, 156, 0.08);
  border: 1px solid rgba(26, 188, 156, 0.3);
  border-radius: 12px;
  padding: 40px 32px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const SuccessTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: ${secondary};
  margin: 0 0 12px;
`;

const SuccessBody = styled.p`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
`;

const LoadingText = styled.p`
  color: ${textLight};
  font-size: 16px;
  text-align: center;
  padding: 48px 0;
`;

const ErrorText = styled.p`
  color: #f87171;
  font-size: 16px;
  text-align: center;
  padding: 48px 0;
`;

export const JobApplyPage = () => {
  const { workspaceId, jobId } = useParams<{
    workspaceId: string;
    jobId: string;
  }>();

  const [job, setJob] = useState<JobPublicView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formState, setFormState] = useState<FormState>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!workspaceId || !jobId) {
      setLoadError('Invalid job link.');
      return;
    }

    fetch(`${REACT_APP_SERVER_BASE_URL}/public/jobs/${workspaceId}/${jobId}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((body) => {
            throw new Error(body?.message ?? 'Job not found.');
          });
        }
        return res.json();
      })
      .then((data: JobPublicView) => setJob(data))
      .catch((err: unknown) => {
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load job posting.',
        );
      });
  }, [workspaceId, jobId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setSubmitError('Full name is required.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setSubmitError('A valid email address is required.');
      return;
    }

    setFormState('submitting');
    setSubmitError(null);

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('email', email.trim());
    if (phone.trim()) formData.append('phone', phone.trim());
    if (coverLetter.trim()) formData.append('coverLetter', coverLetter.trim());
    if (resumeFile) formData.append('resume', resumeFile);

    try {
      const res = await fetch(
        `${REACT_APP_SERVER_BASE_URL}/public/jobs/${workspaceId}/${jobId}/apply`,
        { method: 'POST', body: formData },
      );

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          (body as { message?: string }).message ?? 'Submission failed.',
        );
      }

      setFormState('success');
    } catch (err) {
      setFormState('error');
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong.',
      );
    }
  };

  return (
    <PageWrapper>
      <Header>
        <HeaderBrand>{brand.name}</HeaderBrand>
      </Header>
      <Container>
        {!job && !loadError && <LoadingText>Loading job details…</LoadingText>}
        {loadError && <ErrorText>{loadError}</ErrorText>}
        {job && (
          <>
            <JobCard>
              <JobTitle>{job.title}</JobTitle>
              <CompanyName>{job.companyName}</CompanyName>
              <MetaRow>
                {job.location && <MetaBadge>{job.location}</MetaBadge>}
                {job.jobType && <MetaBadge>{job.jobType}</MetaBadge>}
                {job.salary && <MetaBadge>{job.salary}</MetaBadge>}
              </MetaRow>
              {job.description && (
                <>
                  <SectionLabel>About the Role</SectionLabel>
                  <BodyText>{job.description}</BodyText>
                </>
              )}
              {job.requirements && (
                <>
                  <SectionLabel>Requirements</SectionLabel>
                  <BodyText>{job.requirements}</BodyText>
                </>
              )}
            </JobCard>

            {formState === 'success' ? (
              <SuccessCard>
                <SuccessIcon>✓</SuccessIcon>
                <SuccessTitle>Application Submitted!</SuccessTitle>
                <SuccessBody>
                  Thanks for applying to <strong>{job.title}</strong> at{' '}
                  <strong>{job.companyName}</strong>. We'll be in touch soon.
                </SuccessBody>
              </SuccessCard>
            ) : (
              <FormCard>
                <FormTitle>Apply for this Role</FormTitle>
                <form onSubmit={handleSubmit} noValidate>
                  <FieldGroup>
                    <FieldLabel htmlFor="name">
                      Full Name <span>*</span>
                    </FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel htmlFor="email">
                      Email <span>*</span>
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel htmlFor="resume">
                      Resume (PDF, DOC, DOCX — max 10 MB)
                    </FieldLabel>
                    <FileInputWrapper>
                      <FileInputHidden
                        ref={fileInputRef}
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                      <FileInputLabel htmlFor="resume">
                        <span>📎</span>
                        {resumeFile
                          ? resumeFile.name
                          : 'Click to upload resume'}
                      </FileInputLabel>
                    </FileInputWrapper>
                    {resumeFile && (
                      <SelectedFileName>{resumeFile.name}</SelectedFileName>
                    )}
                  </FieldGroup>
                  <FieldGroup>
                    <FieldLabel htmlFor="coverLetter">Cover Letter</FieldLabel>
                    <Textarea
                      id="coverLetter"
                      placeholder="Tell us why you're a great fit for this role…"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                    />
                  </FieldGroup>
                  {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
                  <SubmitButton
                    type="submit"
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting'
                      ? 'Submitting…'
                      : 'Submit Application'}
                  </SubmitButton>
                </form>
              </FormCard>
            )}
          </>
        )}
      </Container>
    </PageWrapper>
  );
};
