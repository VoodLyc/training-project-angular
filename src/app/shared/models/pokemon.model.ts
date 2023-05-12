import { capitalizeText } from 'src/app/util';

export class Pokemon {
    public name: string
    public type: string
    public height: number
    public weight: number
    public ability: string
    public baseExperience: number
    public frontImage: string
    public backImage: string

    constructor(pokemon: any) {
        this.name = pokemon.name
        this.type = pokemon.types[0].type.name
        this.height = pokemon.height
        this.weight = pokemon.weight
        this.ability = pokemon.abilities[0].ability.name
        this.baseExperience = pokemon.base_experience
        this.frontImage = pokemon.sprites.front_default
        this.backImage = pokemon.sprites.back_default
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
}