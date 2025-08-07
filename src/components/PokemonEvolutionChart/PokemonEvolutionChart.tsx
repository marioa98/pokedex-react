import { useEffect, useState, type FunctionComponent } from "react";
import type { PokemonEvolutionChartProps } from "./types";
import usePokemonChain from "@/hooks/usePokemonChain";
import { Flex, Typography } from "antd";
import styles from "./pokemonEvolutionChart.module.scss";
import type { PokemonEvolutionLine, PokemonFullInfo } from "@/types/pokemon";
import { getPokemonByName } from "@/services/pokemon";
import PokemonAvatar from "../PokemonAvatar/PokemonAvatar";
import { DownOutlined } from "@ant-design/icons";

const { Title } = Typography

type EvolutionChain = PokemonFullInfo[] | PokemonFullInfo[][];

const getEvolutionChain = async (
  data: PokemonEvolutionLine | PokemonEvolutionLine[],
  prevEvolution: EvolutionChain = []
): Promise<EvolutionChain> => {
  let currentPokemonData: PokemonFullInfo[] | PokemonFullInfo;

  if (Array.isArray(data)) {
    currentPokemonData = await Promise.all(
      data.map((pokemon) => getPokemonByName(pokemon.species.name))
    );
  } else {
    currentPokemonData = await getPokemonByName(data.species.name);
  }


  const evolutionChain: any = [...prevEvolution, currentPokemonData];

  if (!Array.isArray(data) && data.evolves_to.length) {
    const nextEvolution = data.evolves_to.length === 1 ? data.evolves_to[0] : data.evolves_to;
    return await getEvolutionChain(nextEvolution, evolutionChain);
  }

  return evolutionChain;
};

const PokemonEvolutionChart: FunctionComponent<PokemonEvolutionChartProps> = ({ evolutionChainURL, id }) => {
  const { data } = usePokemonChain(id, evolutionChainURL);
  const [pokemonChain, setPokemonChain] = useState<EvolutionChain>([]);

  useEffect(() => {
    if (!data) return;

    getEvolutionChain(data.chain).
      then((evolutionChain) => {
        setPokemonChain(evolutionChain);
      })
      .catch((error) => {
        console.error("Error fetching evolution chain:", error);
      });
  }, [data])

  if (!data) return

  return (
    <Flex justify="center">
      <Flex
        className={styles["evolution-showcase"]}
        vertical
        justify="center"
      >
        <Title level={3} className={styles.title}>Evolutions</Title>
        <Flex justify="space-around" align="center" vertical>
          {pokemonChain.map((pokemon, chainIndex) => (
            <>
              {Array.isArray(pokemon) ? (
                <Flex key={`pokemon-multiple-line-${chainIndex}`}>
                  {pokemon.map((evolution, subIndex) => (
                    <PokemonAvatar
                      key={`pokemon-evolution-${evolution.name}-${subIndex}`}
                      pokemon={evolution}
                    />
                  ))}
                </Flex>
              ) : (
                <PokemonAvatar key={`pokemon-evolution-${pokemon.name}`} pokemon={pokemon} />
              )}
              {chainIndex < pokemonChain.length - 1 && (
                <DownOutlined className={styles["down-arrow"]} />
              )}
            </>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PokemonEvolutionChart;
