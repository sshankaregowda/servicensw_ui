import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async validateSearchResultsPage(searchText: string) {
    logger.info(`Validating search results for: ${searchText}`);

    await expect(this.page).toHaveURL(/search|\?q=|\?query=/i);
    await expect(this.page.getByRole('main')).toBeVisible();
    await expect(this.page.getByText(/result|results/i).first()).toBeVisible();
    await expect(
      this.page.getByRole('main').locator('a[href*="/transaction/"]').first()
    ).toBeVisible();
  }

  async openServiceDetailsPage(serviceName: string | RegExp) {
    logger.info(`Opening service details page: ${serviceName}`);

    const serviceNamePattern =
      serviceName instanceof RegExp ? serviceName : new RegExp(serviceName, 'i');

    const serviceLink = this.page
      .getByRole('main')
      .locator('a[href*="/transaction/"]')
      .filter({ hasText: serviceNamePattern })
      .first();

    await expect(serviceLink).toBeVisible();
    await Promise.all([this.page.waitForURL(/\/transaction\//i), serviceLink.click()]);
  }

  async validateNoResultsMessage() {
    logger.info('Validating no results message');

    await expect(this.page.getByRole('main')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /0 results found/i })).toBeVisible();
    await expect(this.page.getByRole('button', { name: /search again/i })).toBeVisible();
  }
}
