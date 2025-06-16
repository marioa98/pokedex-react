import type { PokemonAbility, PokemonGenera } from "@/types/pokemon";

export const getAbilitiesFormatted = (abilities: PokemonAbility[]) => {
  return abilities.map((ability) => ability.ability.name).join(', ')
}

export const getHeightFormat = (heightInDecimeters: number): string => {
  const heightInCentimeters = heightInDecimeters * 10;

  if (heightInCentimeters > 100) return `${heightInCentimeters / 100} m`

  return `${heightInCentimeters} cm`
}

export const getLocalizedGenus = (genera: PokemonGenera[], lang = 'en'): string | undefined => {
  const localizedGenusObj = genera.find((genus) => genus.language.name === lang)

  return localizedGenusObj?.genus
}

export const getWeightFormat = (weightInHectograms: number): string => {
  const weightInGrams = weightInHectograms * 100;

  if (weightInGrams > 1000) return `${weightInGrams / 1000} kg`

  return `${weightInGrams} gr`
}