import { z } from 'zod';

import { CurrencyCode } from 'pm-shared/constants';

export const currencyCodeSchema = z.enum(CurrencyCode);
