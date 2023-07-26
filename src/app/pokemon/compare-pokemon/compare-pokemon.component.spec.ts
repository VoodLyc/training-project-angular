import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePokemonComponent } from './compare-pokemon.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { PokemonModule } from '../pokemon.module';

describe('ComparePokemonComponent', () => {
  let component: ComparePokemonComponent;
  let fixture: ComponentFixture<ComparePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparePokemonComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          preventDuplicates: true,
          maxOpened: 3,
          autoDismiss: true
        }),
        PokemonModule
      ]
    });
    fixture = TestBed.createComponent(ComparePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
