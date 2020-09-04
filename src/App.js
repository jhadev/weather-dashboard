import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CSSReset, Flex, Stack } from '@chakra-ui/core';
import { useLocalStorage } from 'react-use';
import { client } from './utils/client';
import {
  weatherState as weatherStateAtom,
  searchTermState as searchTermAtom,
  forecastState as forecastStateAtom,
} from './recoil/atoms';
import ColorMode from './components/ColorMode';
import SearchForm from './components/SearchForm';
import NavDrawer from './components/NavDrawer';
import Loading from './components/Loading';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
// const WeatherCard = React.lazy(() => import('./components/WeatherCard'));

function App() {
  const [weather, setWeather] = useRecoilState(weatherStateAtom);
  const [forecast, setForecast] = useRecoilState(forecastStateAtom);
  const searchTerm = useRecoilValue(searchTermAtom);
  const [value, setValue, remove] = useLocalStorage('saved', []);

  console.log(weather);

  const isLoaded = Object.keys(weather).length ? true : false;

  console.log(isLoaded);

  useEffect(() => {
    async function getWeather() {
      setWeather({});
      const data = await client(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}`
      );
      console.log(data);

      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${process.env.REACT_APP_GEO_KEY}&lat=${data.coord.lat}&lon=${data.coord.lon}&format=json`
      );

      const location = await response.json();

      const displayLocation = {
        city: location.address.city,
        state: location.address.state,
        country: location.address.country_code.toUpperCase(),
      };

      console.log(location);

      let arr = [...value, data.name.toLowerCase()];
      arr = [...new Set(arr)];

      if (arr.length > 3) {
        arr.shift();
      }
      setValue(arr);

      setWeather({ ...data, displayLocation });
    }

    async function getForecast() {
      const data = await client(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}`
      );

      setForecast(data.list);
    }

    getWeather().then(() => {
      getForecast();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, setWeather, setForecast]);

  return (
    <ColorMode>
      <CSSReset />
      <main>
        <NavDrawer height="10vh" title="weather dashboard">
          <SearchForm history={value} />
        </NavDrawer>
        <Flex height="80vh" direction="column" align="center" justify="center">
          {isLoaded ? (
            <Stack spacing={2}>
              <WeatherCard />
              <Forecast />
              {/* <pre>{JSON.stringify(weather, null, 2)}</pre> */}
            </Stack>
          ) : (
            <Loading />
          )}
        </Flex>
      </main>
    </ColorMode>
  );
}

export default App;
