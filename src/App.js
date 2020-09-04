import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CSSReset, Flex, Stack, Box } from '@chakra-ui/core';
import { client } from './utils/client';
import {
  weatherState as weatherStateAtom,
  searchTermState as searchTermAtom,
} from './recoil/atoms';
import ColorMode from './components/ColorMode';
import SearchForm from './components/SearchForm';
import NavDrawer from './components/NavDrawer';
import ToggleColorMode from './components/ToggleColorMode';
import Loading from './components/Loading';
import WeatherCard from './components/WeatherCard';
// const WeatherCard = React.lazy(() => import('./components/WeatherCard'));

function App() {
  const [weather, setWeather] = useRecoilState(weatherStateAtom);
  const searchTerm = useRecoilValue(searchTermAtom);

  console.log(weather);

  const isLoaded = Object.keys(weather).length ? true : false;

  console.log(isLoaded);

  useEffect(() => {
    async function getWeather() {
      const data = await client(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}`
      );

      setWeather(data);
    }

    getWeather();
  }, [searchTerm, setWeather]);

  return (
    <ColorMode>
      <CSSReset />
      <main>
        <NavDrawer height="10vh" title="weather dashboard">
          <ToggleColorMode />
          <SearchForm />
        </NavDrawer>
        <Flex height="90vh" direction="row" align="center" justify="center">
          {isLoaded ? (
            <Stack spacing={2}>
              <WeatherCard />
              {/* <pre>{JSON.stringify(weather, null, 2)}</pre> */}
            </Stack>
          ) : (
            <Loading />
          )}
          <Box></Box>
        </Flex>
      </main>
    </ColorMode>
  );
}

export default App;
