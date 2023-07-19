import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../../../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../../../shared/models/pokemon-pagination-item.model';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css']
})
export class CreatePokemonComponent implements OnInit, OnDestroy {
  types: string[]
  createPokemonForm: FormGroup
  abilities: PokemonPaginationItem[]
  filteredAbilities: PokemonPaginationItem[]
  ngUnsubscribe = new Subject<void>()
  frontImage: string
  backImage: string

  constructor(private pokemonService: PokemonService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getTypes()
    this.pokemonService.getPokemonAbilities().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (abilities: any) => {
        this.abilities = abilities.results
        this.filterAbilities('Normal')
      }
    )
    this.createPokemonForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(20)], this.duplicatedName.bind(this)),
      'type': new FormControl('Normal', Validators.required),
      'bmi': new FormGroup({
        'height': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999)]),
        'weight': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(9999)]),
      }, this.bmiCalculation),
      'experience': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(999)]),
      'ability': new FormControl({ name: 'stench', url: 'https://pokeapi.co/api/v2/ability/1/' }, Validators.required),
      'frontImage': new FormControl(null, Validators.required),
      'backImage': new FormControl(null, Validators.required)
    })
    this.createPokemonForm.get('experience').addValidators(this.minExperience(this.createPokemonForm.get('type')))
    this.createPokemonForm.get('type').valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(value => {
      this.filterAbilities(value)
      this.createPokemonForm.get('experience').updateValueAndValidity()
    })
  }

  onSelectFrontImage(event: InputEvent): void {
    this.saveLocalImg(event, (result: string) => {
      this.frontImage = result
    })
  }

  onSelectBackImage(event: InputEvent): void {
    this.saveLocalImg(event, (result: string) => {
      this.backImage = result
    })
  }

  private saveLocalImg(event: InputEvent, callback: (result: string) => void): void {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        callback(e.target?.result as string)
      }
      reader.readAsDataURL(input.files[0])
    }
  }

  onSubmit(): void {
    const pokemon = Pokemon.Pokemon(
      this.pokemonService.generatePokemonId(),
      this.createPokemonForm.value['name'],
      this.createPokemonForm.value['type'],
      this.createPokemonForm.value['bmi']['height'],
      this.createPokemonForm.value['bmi']['weight'],
      this.createPokemonForm.value['ability'].name,
      this.createPokemonForm.value['experience'],
      this.frontImage,
      this.backImage
    )
    this.pokemonService.saveLocalPokemon(pokemon)
    this.createPokemonForm.reset()
    this.frontImage = ''
    this.backImage = ''
    this.toastr.success(`The pokemon was added successfully`, 'Pokemon created!', { timeOut: 2000 });
  }

  bmiCalculation(formGroup: FormGroup): ValidationErrors | null {
    const weight = formGroup.get('weight').value / 10
    const height = formGroup.get('height').value / 10
    const bmi = weight / (Math.pow(height, 2))
    if (isFinite(bmi) && bmi >= 25) {
      return { 'overweight': { actualBmi: bmi.toFixed(1) } }
    }
  }

  minExperience(typeControl: AbstractControl): ValidatorFn {
    return (experienceControl: FormControl): ValidationErrors | null => {
      const type = typeControl.value
      const experience = experienceControl.value
      if (type === 'Dragon' && experience > 0 && experience < 500) {
        return { 'minExperience': true }
      }
    }
  }

  duplicatedName(control: FormControl): Observable<ValidationErrors> | Observable<null> {
    const name = control.value.toLowerCase()
    return this.pokemonService.getPokemonPagination().pipe(
      switchMap((pokemons: PokemonPaginationItem[]) => {
        return new Observable<ValidationErrors | null>(subscriber => {
          const pokemon = pokemons.find(pokemon => pokemon.name.toLowerCase() === name)
          if (pokemon) {
            subscriber.next({ 'duplicatedName': true })
          } else {
            subscriber.next(null)
          }
          subscriber.complete()
        })
      })
    )
  }

  filterAbilities(value: string): void {
    if (value === 'Rock') {
      this.filteredAbilities = this.abilities
    }
    else {
      this.filteredAbilities = [...this.abilities].filter(ability => ability.name !== 'solid-rock')
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}