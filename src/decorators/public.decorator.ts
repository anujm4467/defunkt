import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const SKIP_INTERCEPTOR = 'skipInterceptor';
export const SkipInterceptor = () => SetMetadata(SKIP_INTERCEPTOR, true);

export const SKIP_ROLE_GUARD = 'skipRoleGuard';
export const SkipRoleGuard = () => SetMetadata(SKIP_ROLE_GUARD, true);
