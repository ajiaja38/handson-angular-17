import { HttpContextToken } from '@angular/common/http';

export const BYPASS_LOGGING = new HttpContextToken<boolean>(() => false);
