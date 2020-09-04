import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { CSSReset, Flex, Stack } from '@chakra-ui/core';
import { client } from './utils/client';
import {
  weatherState as weatherStateAtom,
  searchTermState as searchTermAtom,
} from './recoil/atoms';
import ColorMode from './components/ColorMode';
import SearchForm from './components/SearchForm';
import WeatherCard from './components/WeatherCard';
import NavDrawer from './components/NavDrawer';
import ToggleColorMode from './components/ToggleColorMode';

function App() {
  const [weather, setWeather] = useRecoilState(weatherStateAtom);
  const searchTerm = useRecoilValue(searchTermAtom);

  useEffect(() => {
    async function getWeather() {
      const data = await client(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}`
      );

      setWeather(data);
    }

    getWeather();
  }, [searchTerm]);

  return (
    <ColorMode>
      <CSSReset />
      <main>
        <NavDrawer title="weather dashboard">
          <ToggleColorMode />
          <SearchForm />
        </NavDrawer>
        <Flex direction="row" justifyContent="center">
          <Stack spacing={2}>
            {Object.keys(weather).length && <WeatherCard />}
            <pre>{JSON.stringify(weather, null, 2)}</pre>
          </Stack>
        </Flex>
      </main>
    </ColorMode>
  );
}

export default App;
