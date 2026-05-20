import { Locator, Page, expect } from '@playwright/test';
import { logger } from '../utils/logger';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    logger.info(`Navigating to: ${path}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }
}
