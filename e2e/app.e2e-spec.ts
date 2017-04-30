import { AdventuresRxPage } from './app.po';

describe('adventures-rx App', () => {
  let page: AdventuresRxPage;

  beforeEach(() => {
    page = new AdventuresRxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
