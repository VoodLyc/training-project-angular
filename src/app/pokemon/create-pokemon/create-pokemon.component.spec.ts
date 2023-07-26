import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreatePokemonComponent } from './create-pokemon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'src/app/shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';

describe('CreatePokemonComponent', () => {
  let component: CreatePokemonComponent;
  let fixture: ComponentFixture<CreatePokemonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePokemonComponent],
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
        SharedModule,
        DropdownModule,
        MultiSelectModule,
      ]
    });
    fixture = TestBed.createComponent(CreatePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark name as invalid if it\'s empty', fakeAsync(() => {
    const nameControl = component.createPokemonForm.get('name')
    const asynValidatorMock = () => {
      return new Promise((resolve) => {
        resolve(null)
      })
    }
    
    nameControl.setAsyncValidators(asynValidatorMock)
    expect(nameControl.valid).not.toBeTruthy
    expect(nameControl.errors['required']).toBeTruthy()
    
    nameControl.setValue('notempty')
    tick()
    expect(nameControl.valid).toBeTruthy()
  }))

  it('should mark name as invalid if lenght is greater than 20', fakeAsync(() => {
    const nameControl = component.createPokemonForm.get('name')
    const asynValidatorMock = () => {
      return new Promise((resolve) => {
        resolve(null)
      })
    }

    nameControl.setAsyncValidators(asynValidatorMock)
    nameControl.setValue('validName')
    tick()
    expect(nameControl.valid).toBeTruthy()
    
    nameControl.setValue('morethantwentycharacters')
    tick()
    expect(nameControl.valid).not.toBeTruthy()
    expect(nameControl.errors['maxlength']).toBeTruthy()
  }))

  it('should mark type as invalid if the pokemon is of type Dragon and the experience is less than 500', () => {
    const typeControl = component.createPokemonForm.get('type')
    const experienceControl = component.createPokemonForm.get('experience')
    spyOn(component, 'filterAbilities').and.stub()

    experienceControl.setValue(350)
    typeControl.setValue('Rock')
    experienceControl.updateValueAndValidity()
    expect(experienceControl.valid).toBeTruthy()
   
    typeControl.setValue('Dragon')
    experienceControl.updateValueAndValidity()
    expect(experienceControl.valid).not.toBeTruthy()
    expect(experienceControl.errors['minExperience']).toBeTruthy()
  });

  it('should mark bmi as invalid if the pokemon is overweight', () => {
    const bmiFormGruop = component.createPokemonForm.get('bmi')
    const heightControl = bmiFormGruop.get('height')
    const weightControl = bmiFormGruop.get('weight')
    
    heightControl.setValue(18)
    weightControl.setValue(850)
    expect(bmiFormGruop.valid).not.toBeTruthy()
    expect(bmiFormGruop.errors['overweight']).toBeTruthy()
    
    weightControl.setValue(800)
    expect(bmiFormGruop.valid).toBeTruthy()

    heightControl.setValue(1)
    expect(bmiFormGruop.valid).not.toBeTruthy()
    expect(bmiFormGruop.errors['overweight']).toBeTruthy()
  });
});
