import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FunctionComponent, type PropsWithChildren } from "react";
import type { PokemonContextProps } from "./types";
import type { PokemonExternalResource } from "@/types/pokemon";
import { getAllSpecies } from "@/services/pokemon";

const defaultValue: PokemonContextProps = {
  total: 0,
  pokemonList: []
}

const PokemonContext = createContext<PokemonContextProps>(defaultValue);

const PokemonContextProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [total, setTotal] = useState<number>(0);
  const [pokemonList, setPokemonList] = useState<PokemonExternalResource[]>([]);

  const getPokemonData = useCallback(async () => {
    try {
      const { results, count } = await getAllSpecies({
        params: {
          limit: 2000 // Currently 1,025 pokemon known.
        }
      })

      setTotal(count)
      setPokemonList(results);
    } catch (error) {
      console.error('Error fetching pokemon data:', error);
    }
  }, [])

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData])

  const value: PokemonContextProps = useMemo(() => ({
    total,
    pokemonList
  }), [total, pokemonList]);
  
  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePokemonContext = () => useContext(PokemonContext);

export default PokemonContextProvider;
