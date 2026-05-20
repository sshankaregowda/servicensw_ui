import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ServiceDetailsPage } from '../pages/ServiceDetailsPage';

export type Fixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  serviceDetailsPage: ServiceDetailsPage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  serviceDetailsPage: async ({ page }, use) => {
    await use(new ServiceDetailsPage(page));
  }
});

export { expect } from '@playwright/test';
