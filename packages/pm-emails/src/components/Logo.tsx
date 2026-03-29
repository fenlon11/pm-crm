import { Img } from '@react-email/components';

const logoStyle = {
  marginBottom: '40px',
};

export const Logo = () => {
  return (
    <Img
      src="https://persistentmomentum.com/images/logo/pm-icon-150.png"
      alt="Persistent Recruiter logo"
      width="40"
      height="40"
      style={logoStyle}
    />
  );
};
