import { ArchivoOperacionesModule } from './archivo-operaciones.module';

describe('ArchivoOperacionesModule', () => {
    let archivoOperacionesModule: ArchivoOperacionesModule;

    beforeEach(() => {
      archivoOperacionesModule = new ArchivoOperacionesModule();
    });

    it('should create an instance', () => {
        expect(archivoOperacionesModule).toBeTruthy();
    });
});
