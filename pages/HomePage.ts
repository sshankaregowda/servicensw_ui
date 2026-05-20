import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private logo = () => this.page.getByRole('link', { name: /Service NSW/i }).first();
  private pageHeading = () => this.page.getByRole('heading', { name: /^Welcome to Service NSW$/i });
  private searchInput = () => this.page.getByRole('combobox', { name: /search/i }).first();
  private searchButton = () => this.page.getByRole('button', { name: /^search$/i }).first();

  async openHomePage() {
    await this.navigateTo('/');
  }

  async validateHomePageLoaded() {
    logger.info('Validating homepage loaded');

    await expect(this.page).toHaveURL(/service\.nsw\.gov\.au/);
    await expect(this.page).toHaveTitle(/Service NSW/i);
    await expect(this.logo()).toBeVisible();
    await expect(this.pageHeading()).toBeVisible();
    await expect(this.searchInput()).toBeVisible();
    await expect(this.searchButton()).toBeVisible();
  }

  async searchForService(serviceName: string) {
    logger.info(`Searching for service: ${serviceName}`);

    await this.searchInput().fill(serviceName);
    await Promise.all([this.page.waitForURL(/search|\?q=|\?query=/i), this.searchButton().click()]);
  }
}
