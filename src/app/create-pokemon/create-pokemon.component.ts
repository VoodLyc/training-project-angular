import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY, Observable, Subscription, catchError, map, of, switchMap } from 'rxjs';
import { Pokemon } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css']
})
export class CreatePokemonComponent implements OnInit {
  types: string[]
  createPokemonForm: FormGroup
  abilities: PokemonPaginationItem[]
  filteredAbilities: PokemonPaginationItem[]
  abilitiesSubscription: Subscription
  frontImage: string
  backImage: string

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getTypes()
    this.abilitiesSubscription = this.pokemonService.getPokemonAbilities().subscribe(
      (abilities: any) => {
        this.abilities = abilities.results
        this.filteredAbilities = [...abilities.results]
        const index = this.abilities.map(ability => ability.name).indexOf('solid-rock')
        this.filteredAbilities.splice(index, 1)
        console.log(this.abilities)
        console.log(this.filteredAbilities)
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
    this.createPokemonForm.get('type').valueChanges.subscribe(value => {
      this.filterAbilities(value)
    })
  }

  onSelectFrontImage(event) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.frontImage = e.target?.result as string
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onSelectBackImage(event) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.backImage = e.target?.result as string
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  onSubmit() {
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

  bmiCalculation(formGroup: FormGroup): { [key: string]: boolean } {
    const weight = formGroup.get('weight').value / 10
    const height = formGroup.get('height').value / 10
    const bmi = weight / (Math.pow(height, 2))
    if (bmi >= 25) {
      return { 'overweight': true }
    }
  }

  minExperience(control: AbstractControl): { [key: string]: boolean } {
    const type = control.get('type').value
    const experience = control.get('experience').value
    if (type === 'Dragon' && experience < 500) {
      return { 'minExperience': true }
    }
  }

  duplicatedName(control: FormControl): Promise<any> | Observable<any> {
    const name = control.value.toLowerCase()
    return this.pokemonService.getPokemonByName(name).pipe(
      switchMap((pokemon: Pokemon) => {
        return new Observable<{ [key: string]: boolean }>(subscriber => {
          if (pokemon) {
            subscriber.next({ 'duplicatedName': true })
          }
          subscriber.complete()
        })
      }),
      catchError(() => of(null))
    )
  }

  filterAbilities(value: string) {
    if (value === 'Rock') {
      this.filteredAbilities = this.abilities
    }
    else {
      let filteredAbilities = [...this.abilities]
      const index = filteredAbilities.map(ability => ability.name).indexOf('solid-rock')
      filteredAbilities.splice(index, 1)
      this.filteredAbilities = filteredAbilities
    }
  }
}