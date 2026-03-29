import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { styled } from '@linaria/react';
import { getBrandConfig } from 'pm-shared/brand';

const brand = getBrandConfig();

const StyledPage = styled.div`
  background: ${brand.colors.background};
  color: ${brand.colors.text};
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const StyledHeader = styled.header`
  background: ${brand.colors.surface};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  padding: 16px 24px;
`;

const StyledBrandName = styled.span`
  color: ${brand.colors.secondary};
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.3px;
`;

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px 60px;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 380px;
  }
`;

const StyledJobCard = styled.section`
  background: ${brand.colors.surface};
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 32px;
  height: fit-content;
`;

const StyledJobTitle = styled.h1`
  color: ${brand.colors.text};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 8px;
`;

const StyledJobMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const StyledBadge = styled.span`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: ${brand.colors.textLight};
  font-size: 13px;
  padding: 4px 10px;
`;

const StyledSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledSectionTitle = styled.h2`
  color: ${brand.colors.textLight};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.8px;
  margin: 0 0 10px;
  text-transform: uppercase;
`;

const StyledSectionText = styled.p`
  color: ${brand.colors.text};
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
`;

const StyledFormCard = styled.section`
  background: ${brand.colors.surface};
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  height: fit-content;
  padding: 28px;
`;

const StyledFormTitle = styled.h2`
  color: ${brand.colors.text};
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 20px;
`;

const StyledField = styled.div`
  margin-bottom: 16px;
`;

const StyledLabel = styled.label`
  color: ${brand.colors.textLight};
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: ${brand.colors.text};
  font-size: 14px;
  outline: none;
  padding: 10px 14px;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${brand.colors.textLight};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${brand.colors.secondary};
  }
`;

const StyledTextarea = styled.textarea`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  color: ${brand.colors.text};
  font-family: inherit;
  font-size: 14px;
  min-height: 100px;
  outline: none;
  padding: 10px 14px;
  resize: vertical;
  transition: border-color 0.15s;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${brand.colors.textLight};
    opacity: 0.5;
  }

  &:focus {
    border-color: ${brand.colors.secondary};
  }
`;

const StyledSubmitButton = styled.button`
  background: ${brand.colors.secondary};
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 24px;
  transition: opacity 0.15s;
  width: 100%;

  &:hover {
    opacity: 0.88;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const StyledError = styled.p`
  color: #f87171;
  font-size: 13px;
  margin: 8px 0 0;
`;

const StyledSuccess = styled.div`
  background: rgba(26, 188, 156, 0.1);
  border: 1px solid rgba(26, 188, 156, 0.3);
  border-radius: 8px;
  color: ${brand.colors.secondary};
  font-size: 15px;
  line-height: 1.5;
  padding: 16px;
  text-align: center;
`;

const StyledLoading = styled.div`
  color: ${brand.colors.textLight};
  font-size: 15px;
  padding: 60px 24px;
  text-align: center;
`;

type JobData = {
  id: string;
  title: string;
  description: string | null;
  requirements: string | null;
  location: string;
  salaryRange: string | null;
  department: string | null;
  status: string;
  companyName: string | null;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
};

const LOCATION_LABELS: Record<string, string> = {
  REMOTE: 'Remote',
  ONSITE: 'Onsite',
  HYBRID: 'Hybrid',
};

export const JobBoardPage = () => {
  const { jobId } = useParams<{ jobId: string }>();

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });

  useEffect(() => {
    if (!jobId) {
      return;
    }

    fetch(`/api/job-board/${jobId}`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Job not found');
        }

        return res.json() as Promise<JobData>;
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => {
        setError('This job posting is no longer available.');
        setLoading(false);
      });
  }, [jobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.name.trim() || !form.email.trim()) {
      setFormError('Name and email are required.');

      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/job-board/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          coverLetter: form.coverLetter.trim() || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <StyledPage>
        <StyledHeader>
          <StyledBrandName>{brand.name}</StyledBrandName>
        </StyledHeader>
        <StyledLoading>Loading job details…</StyledLoading>
      </StyledPage>
    );
  }

  if (error || !job) {
    return (
      <StyledPage>
        <StyledHeader>
          <StyledBrandName>{brand.name}</StyledBrandName>
        </StyledHeader>
        <StyledMain>
          <StyledJobCard>
            <StyledSectionText>{error ?? 'Job not found.'}</StyledSectionText>
          </StyledJobCard>
        </StyledMain>
      </StyledPage>
    );
  }

  return (
    <StyledPage>
      <StyledHeader>
        <StyledBrandName>{brand.name}</StyledBrandName>
      </StyledHeader>
      <StyledMain>
        <StyledJobCard>
          <StyledJobTitle>{job.title}</StyledJobTitle>
          <StyledJobMeta>
            {job.companyName ? (
              <StyledBadge>{job.companyName}</StyledBadge>
            ) : null}
            <StyledBadge>
              {LOCATION_LABELS[job.location] ?? job.location}
            </StyledBadge>
            {job.department ? (
              <StyledBadge>{job.department}</StyledBadge>
            ) : null}
            {job.salaryRange ? (
              <StyledBadge>{job.salaryRange}</StyledBadge>
            ) : null}
          </StyledJobMeta>

          {job.description ? (
            <StyledSection>
              <StyledSectionTitle>About the Role</StyledSectionTitle>
              <StyledSectionText>{job.description}</StyledSectionText>
            </StyledSection>
          ) : null}

          {job.requirements ? (
            <StyledSection>
              <StyledSectionTitle>Requirements</StyledSectionTitle>
              <StyledSectionText>{job.requirements}</StyledSectionText>
            </StyledSection>
          ) : null}
        </StyledJobCard>

        <StyledFormCard>
          {submitted ? (
            <StyledSuccess>
              <strong>Application submitted!</strong>
              <br />
              Thank you for applying. We'll be in touch soon.
            </StyledSuccess>
          ) : (
            <>
              <StyledFormTitle>Apply for this role</StyledFormTitle>
              <form onSubmit={handleSubmit} noValidate>
                <StyledField>
                  <StyledLabel htmlFor="name">
                    Full Name <span style={{ color: '#f87171' }}>*</span>
                  </StyledLabel>
                  <StyledInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </StyledField>

                <StyledField>
                  <StyledLabel htmlFor="email">
                    Email <span style={{ color: '#f87171' }}>*</span>
                  </StyledLabel>
                  <StyledInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </StyledField>

                <StyledField>
                  <StyledLabel htmlFor="phone">Phone (optional)</StyledLabel>
                  <StyledInput
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </StyledField>

                <StyledField>
                  <StyledLabel htmlFor="coverLetter">
                    Cover Letter (optional)
                  </StyledLabel>
                  <StyledTextarea
                    id="coverLetter"
                    name="coverLetter"
                    placeholder="Tell us why you're a great fit…"
                    value={form.coverLetter}
                    onChange={handleChange}
                  />
                </StyledField>

                {formError ? <StyledError>{formError}</StyledError> : null}

                <StyledSubmitButton type="submit" disabled={submitting}>
                  {submitting ? 'Submitting…' : 'Submit Application'}
                </StyledSubmitButton>
              </form>
            </>
          )}
        </StyledFormCard>
      </StyledMain>
    </StyledPage>
  );
};
