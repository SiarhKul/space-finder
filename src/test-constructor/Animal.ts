export class Dog {
    public readonly name: string;
    public readonly hasAbilities: boolean;

    constructor(name: string, hasAbilities: boolean) {

        this.name = name;
        this.hasAbilities = hasAbilities
    }
}

class Abilities {
    public readonly hasAbilities: boolean = false

    constructor(hasAbilities:boolean) {
        this.hasAbilities=hasAbilities
    }

    run(): void {
        console.log('run')
    }
}

export class Animal extends Abilities {
    public readonly type: string;

    constructor(type: string) {
        super(false)
        this.type = type

        new Dog('bob', false)
    }
}
