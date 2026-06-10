import type { SiteConfig } from '@/domain/site-config/types';
import configJson from './config.json';

export const siteConfig: SiteConfig = configJson as SiteConfig;
