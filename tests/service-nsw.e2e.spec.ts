import { Fixtures, test } from '../fixtures/testFixtures';
import { logger } from '../utils/logger';
import serviceTestData from '../data/service-test-data.json';

type ServiceData = {
  testName: string;
  searchText: string;
  expectedHeading: string;
  pdfFormUrl?: string;
};

test.describe('Service NSW End-to-End Tests', () => {
  async function searchAndValidateService(
    service: ServiceData,
    homePage: Fixtures['homePage'],
    searchResultsPage: Fixtures['searchResultsPage'],
    serviceDetailsPage: Fixtures['serviceDetailsPage']
  ) {
    await homePage.openHomePage();
    await homePage.validateHomePageLoaded();
    await homePage.searchForService(service.searchText);

    await searchResultsPage.validateSearchResultsPage(service.searchText);
    await searchResultsPage.openServiceDetailsPage(service.expectedHeading);

    await serviceDetailsPage.validateServiceDetailsPageLoaded();
    await serviceDetailsPage.validateServiceHeading(service.expectedHeading);
    await serviceDetailsPage.validateServiceText(service.expectedHeading);
    await serviceDetailsPage.validateImportantUIElements();

    if (service.pdfFormUrl) {
      await serviceDetailsPage.clickDownloadPdfFormAndValidate(service.pdfFormUrl);
    }
  }

  for (const service of serviceTestData.positiveSearches as ServiceData[]) {
    test(`Validate important UI elements on ${service.testName} page`, async ({
      homePage,
      searchResultsPage,
      serviceDetailsPage
    }) => {
      await searchAndValidateService(service, homePage, searchResultsPage, serviceDetailsPage);
    });
  }

  for (const search of serviceTestData.negativeSearches) {
    test(`Validate no results message for ${search.testName}`, async ({
      homePage,
      searchResultsPage
    }) => {
      await homePage.openHomePage();
      await homePage.validateHomePageLoaded();
      await homePage.searchForService(search.searchText);

      await searchResultsPage.validateNoResultsMessage();
    });
  }
});
