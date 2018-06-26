import { MaterialModuleModule } from './material-module.module';

describe('MaterialModuleModule', () => {
  let materialModuleModule: MaterialModuleModule;

  beforeEach(() => {
    materialModuleModule = new MaterialModuleModule();
  });

  it('should create an instance', () => {
    expect(materialModuleModule).toBeTruthy();
  });
});
