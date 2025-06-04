import type { PokemonInfo, PokedexResponse } from "@/types/pokemon";
import axios from "axios"

export const getPokedex = async (): Promise<PokedexResponse> => {
  const { data } = await axios.get<PokedexResponse>('/pokemon');

  return data
}

export const getPokemonByName = async (name: string): Promise<PokemonInfo> => {
  const { data } = await axios.get<PokemonInfo>(`/pokemon/${name}`);

  return data;
}