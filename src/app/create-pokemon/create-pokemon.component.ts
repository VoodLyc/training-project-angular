import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Pokemon } from '../shared/models/pokemon.model';

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

  constructor(private pokemonService: PokemonService) { }

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
        'height': new FormControl(null, Validators.required),
        'weight': new FormControl(null, Validators.required),
      }, this.bmiCalculation),
      'experience': new FormControl(null, Validators.required),
      'ability': new FormControl(null, Validators.required),
      'frontImage': new FormControl(null, Validators.required),
      'backImage': new FormControl(null, Validators.required)
    }, [this.minExperience])
    this.createPokemonForm.get('type').valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(value => {
      this.filterAbilities(value)
    })
  }

  onSelectFrontImage(event): void {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.frontImage = e.target?.result as string
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onSelectBackImage(event): void {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.backImage = e.target?.result as string
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onSubmit(): void {
    const pokemon = Pokemon.Pokemon(
      this.pokemonService.generatePokemonId(),
      this.createPokemonForm.value['name'],
      this.createPokemonForm.value['type'],
      this.createPokemonForm.value['bmi.height'],
      this.createPokemonForm.value['bmi.weight'],
      this.createPokemonForm.value['ability'].name,
      this.createPokemonForm.value['experience'],
      this.frontImage,
      this.backImage
    )
    this.pokemonService.saveLocalPokemon(pokemon)
    this.createPokemonForm.reset()
    this.frontImage = ''
    this.backImage = ''
  }

  bmiCalculation(formGroup: FormGroup): ValidationErrors | null {
    const weight = formGroup.get('weight').value / 10
    const height = formGroup.get('height').value / 10
    const bmi = weight / (Math.pow(height, 2))
    if (bmi >= 25) {
      return { 'overweight': true }
    }
  }

  minExperience(form: AbstractControl): ValidationErrors | null {
    const type = form.get('type').value
    const experience = form.get('experience').value
    if (type === 'Dragon' && experience < 500) {
      return { 'minExperience': true }
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