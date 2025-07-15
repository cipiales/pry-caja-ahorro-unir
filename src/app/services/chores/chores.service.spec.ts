import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@Angular/common/http/testing';
import { ChoresService } from './chores.service';


describe('ChoresService', () => {
  let service: ChoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,       
      ]
    });
    service = TestBed.inject(ChoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
