import { RESERVED_SUBDOMAINS } from 'pm-shared/constants';
import { isValidTwentySubdomain } from 'pm-shared/utils';

export const isSubdomainValid = (subdomain: string) => {
  return (
    isValidTwentySubdomain(subdomain) &&
    !RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())
  );
};
