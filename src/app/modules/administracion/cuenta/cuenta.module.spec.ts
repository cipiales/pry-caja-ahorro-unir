import { CuentaModule } from './cuenta.module';

describe('CuentaModule', () => {
    let archivoClienteModule: CuentaModule;

    beforeEach(() => {
      archivoClienteModule = new CuentaModule();
    });

    it('should create an instance', () => {
        expect(archivoClienteModule).toBeTruthy();
    });


});
