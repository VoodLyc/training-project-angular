import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  abilitiesSubscription: Subscription
  frontImage: string
  backImage: string

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getTypes()
    this.abilitiesSubscription = this.pokemonService.getPokemonAbilities().subscribe(
      (abilities: any) => {
        this.abilities = abilities.results
      }
    )
    this.createPokemonForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'type': new FormControl('Normal', Validators.required),
      'height': new FormControl(null, Validators.required),
      'weight': new FormControl(null, Validators.required),
      'experience': new FormControl(null, Validators.required),
      'ability': new FormControl(null, Validators.required),
      'frontImage': new FormControl(null, Validators.required),
      'backImage': new FormControl(null, Validators.required)
    })
  }

  onSelectFrontImage(event) {
    if (event.target.files) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.frontImage = e.target?.result as string
        console.log(this.frontImage)
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
      this.createPokemonForm.value['height'],
      this.createPokemonForm.value['weight'],
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
}
