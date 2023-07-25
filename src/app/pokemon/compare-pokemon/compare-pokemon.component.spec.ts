import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePokemonComponent } from './compare-pokemon.component';

describe('ComparePokemonComponent', () => {
  let component: ComparePokemonComponent;
  let fixture: ComponentFixture<ComparePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparePokemonComponent]
    });
    fixture = TestBed.createComponent(ComparePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
