import { capitalizeText } from 'src/app/util';

export class Pokemon {
    public id: number
    public name: string
    public type: string
    public height: number
    public weight: number
    public ability: string
    public baseExperience: number
    public frontImage: string
    public backImage: string

    public static Pokemon(id: number, name: string, type: string, height: number, weight: number, ability: string, baseExperience: number, frontImage: string, backImage: string) {
        const pokemon = new Pokemon()
        pokemon.id = id
        pokemon.name = name
        pokemon.type = type
        pokemon.height = height
        pokemon.weight = weight
        pokemon.ability = ability
        pokemon.baseExperience = baseExperience
        pokemon.frontImage = frontImage
        pokemon.backImage = backImage
        return pokemon
    }

    public static PokemonJSON(json: any) {
        const pokemon = new Pokemon()
        pokemon.id = json.id
        pokemon.name = json.name
        pokemon.type = json.types[0].type.name
        pokemon.height = json.height
        pokemon.weight = json.weight
        pokemon.ability = json.abilities[0].ability.name
        pokemon.baseExperience = json.base_experience
        pokemon.frontImage = json.sprites.front_default
        pokemon.backImage = json.sprites.back_default
        return pokemon
    }

    getCapitalizedName(): string {
        return capitalizeText(this.name)
    }

    getFullName(): string {
        return capitalizeText(this.name) + ' ' + capitalizeText(this.type)
    }

    getAge(): number {
        return this.height + 13
    }

    getReviews(): string {
        return this.baseExperience + ' Reviews'
    }
    
    getCapitalizedAbility(): string {
        return capitalizeText(this.ability)
    }

    getPrice(): string {
        return '$' + (this.weight + 20)
    }

    getUpperCaseType(): string {
        return this.type.toUpperCase()
    }
    
    getCapitalizedType(): string {
        return capitalizeText(this.type)
    }
}