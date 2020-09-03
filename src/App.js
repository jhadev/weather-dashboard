import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { client } from './utils/client';
import {
  weatherState as weatherStateAtom,
  searchTermState as searchTermAtom,
} from './recoil/atoms';
import { Container, Row, Col } from 'react-bootstrap';
import SearchForm from './components/SearchForm';

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
    <main>
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h1>Hello</h1>
            <SearchForm />
          </Col>
          <Col xs={12} md={9}>
            <h2>{searchTerm}</h2>
            <pre>{JSON.stringify(weather, null, 2)}</pre>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
