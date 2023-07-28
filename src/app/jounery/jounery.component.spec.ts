import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JouneryComponent } from './jounery.component';

describe('JouneryComponent', () => {
  let component: JouneryComponent;
  let fixture: ComponentFixture<JouneryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JouneryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JouneryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
