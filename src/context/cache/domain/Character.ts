import { AggregateRoot } from '@smu-chile/pkg-value-object';

export class Character extends AggregateRoot {
  constructor(readonly id: number, readonly name: string, readonly status: string, readonly species: string) {
    super();
    this.id = id;
    this.name = name;
    this.status = status;
    this.species = species;
  }

  static create(id: number, name: string, status: string, species: string) {
    return new Character(id, name, status, species);
  }

  toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      species: this.species,
    };
  }
}
