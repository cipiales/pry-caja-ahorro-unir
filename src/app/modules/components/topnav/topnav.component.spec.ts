import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavComponent } from './topnav.component';
import { RouterTestingModule} from '@angular/router/testing'
import { HttpClientTestingModule } from '@Angular/common/http/testing';
import {MatMenuModule} from '@angular/material/menu';

describe('TopnavComponent', () => {
    let component: TopnavComponent;
    let fixture: ComponentFixture<TopnavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopnavComponent],
            imports : [RouterTestingModule,HttpClientTestingModule,MatMenuModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopnavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
