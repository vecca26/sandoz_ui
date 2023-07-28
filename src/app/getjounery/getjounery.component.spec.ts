import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetjouneryComponent } from './getjounery.component';

describe('GetjouneryComponent', () => {
  let component: GetjouneryComponent;
  let fixture: ComponentFixture<GetjouneryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetjouneryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetjouneryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
