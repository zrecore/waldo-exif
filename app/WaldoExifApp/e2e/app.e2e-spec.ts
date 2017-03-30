import { WaldoExifAppPage } from './app.po';

describe('waldo-exif-app App', () => {
  let page: WaldoExifAppPage;

  beforeEach(() => {
    page = new WaldoExifAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
