import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@Angular/common/http/testing';
import { ArchivoOperacionesComponent } from './archivo-operaciones.component';

describe('ArchivoOperacionesComponent', () => {
    let component: ArchivoOperacionesComponent;
    let fixture: ComponentFixture<ArchivoOperacionesComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ArchivoOperacionesComponent],
                imports: [HttpClientTestingModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ArchivoOperacionesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
