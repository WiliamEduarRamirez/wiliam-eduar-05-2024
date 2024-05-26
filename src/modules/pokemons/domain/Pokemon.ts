export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: {
    name: string;
  }[];
  abilities: string[];
  weight: number;
  height: number;
  sound: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}
