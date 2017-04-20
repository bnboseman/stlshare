import { StlSharePage } from './app.po';

describe('stl-share App', () => {
  let page: StlSharePage;

  beforeEach(() => {
    page = new StlSharePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
