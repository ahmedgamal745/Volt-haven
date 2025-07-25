import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeProductComponent } from './some-product.component';

describe('SomeProductComponent', () => {
  let component: SomeProductComponent;
  let fixture: ComponentFixture<SomeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SomeProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SomeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
