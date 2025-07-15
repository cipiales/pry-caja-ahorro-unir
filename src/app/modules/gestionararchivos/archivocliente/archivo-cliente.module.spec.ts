import { ArchivoClienteModule } from './archivo-cliente.module';

describe('ArchivoClienteModule', () => {
    let archivoClienteModule: ArchivoClienteModule;

    beforeEach(() => {
      archivoClienteModule = new ArchivoClienteModule();
    });

    it('should create an instance', () => {
        expect(archivoClienteModule).toBeTruthy();
    });

    
});
