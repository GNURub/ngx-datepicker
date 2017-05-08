import { Ng2DatepickerCliPage } from './app.po';

describe('ngx-datepicker-cli App', () => {
  let page: Ng2DatepickerCliPage;

  beforeEach(() => {
    page = new Ng2DatepickerCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
