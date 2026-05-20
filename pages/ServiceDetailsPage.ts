import { Page, expect } from '@playwright/test';
import { PDFParse } from 'pdf-parse';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class ServiceDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private pageHeading = () => this.page.locator('main h1').first();
  private mainContent = () => this.page.getByRole('main');

  async validateServiceDetailsPageLoaded() {
    logger.info('Validating service details page loaded');

    await expect(this.pageHeading()).toBeVisible();
    await expect(this.pageHeading()).not.toBeEmpty();
    await expect(this.page).toHaveURL(/service\.nsw\.gov\.au\/transaction\//i);
  }

  async validateServiceHeading(serviceName: string | RegExp) {
    logger.info(`Validating service heading: ${serviceName}`);

    await expect(this.pageHeading()).toContainText(serviceName);
  }

  async validateServiceText(serviceName: string | RegExp) {
    logger.info(`Validating service details text: ${serviceName}`);

    await expect(this.mainContent().getByText(serviceName).first()).toBeVisible();
  }

  async validateImportantUIElements() {
    logger.info('Validating important UI elements on service details page');

    await expect(this.mainContent()).toBeVisible();
    await expect(this.mainContent().getByRole('link', { name: /home/i }).first()).toBeVisible();
    await expect(
      this.mainContent()
        .getByText(/listen/i)
        .first()
    ).toBeVisible();
    await expect(
      this.mainContent()
        .getByText(/on this page/i)
        .first()
    ).toBeVisible();
    await expect(
      this.mainContent()
        .getByText(/introduction/i)
        .first()
    ).toBeVisible();
    await expect(
      this.mainContent()
        .getByText(/what you need|how to|eligibility|payment methods|more information|documents/i)
        .first()
    ).toBeVisible();
  }

  async clickDownloadPdfFormAndValidate(expectedPdfUrl: string) {
    logger.info(`Clicking Download PDF form and validating URL: ${expectedPdfUrl}`);

    const downloadPdfButton = this.page
      .locator('a[role="button"]', { hasText: /download pdf form/i })
      .first();

    await expect(downloadPdfButton).toBeVisible();
    await expect(downloadPdfButton).toHaveAttribute('href', expectedPdfUrl);

    await downloadPdfButton.scrollIntoViewIfNeeded();

    await Promise.all([
      this.page.waitForURL(expectedPdfUrl, { timeout: 15000 }),
      downloadPdfButton.click()
    ]);
    await this.validatePdfText(expectedPdfUrl, /licence Application/i);
  }

  private async validatePdfText(pdfUrl: string, expectedText: RegExp) {
    logger.info(`Validating PDF text contains: ${expectedText}`);

    const response = await this.page.request.get(pdfUrl);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/pdf');

    const parser = new PDFParse({ data: await response.body() });

    try {
      const result = await parser.getText();
      expect(result.text).toMatch(expectedText);
    } finally {
      await parser.destroy();
    }
  }
}
