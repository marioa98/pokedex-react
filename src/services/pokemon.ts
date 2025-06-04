import type { PokemonInfo, PokedexResponse } from "@/types/pokemon";
import type { RequestOptions } from "@/types/requests";
import { getRequestOffset } from "@/utils/axios";
import axios from "axios"

export const DEFAULT_PAGE_SIZE = 20;

export const getPokedex = async ({
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE
}: RequestOptions = {}): Promise<PokedexResponse> => {
  const offset = getRequestOffset({ pageNumber, pageSize })
  const { data } = await axios.get<PokedexResponse>(`/pokemon-species?limit=${pageSize}&offset=${offset}`);

  return data
}

export const getPokemonByName = async (name: string): Promise<PokemonInfo> => {
  const { data } = await axios.get<PokemonInfo>(`/pokemon/${name}`);

  return data;
}