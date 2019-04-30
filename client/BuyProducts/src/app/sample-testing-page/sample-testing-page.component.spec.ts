import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTestingPageComponent } from './sample-testing-page.component';

describe('SampleTestingPageComponent', () => {
  let component: SampleTestingPageComponent;
  let fixture: ComponentFixture<SampleTestingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleTestingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleTestingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
