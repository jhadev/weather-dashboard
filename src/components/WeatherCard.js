import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherState as weatherStateAtom } from '../recoil/atoms';
import Card from 'react-bootstrap/Card';

function WeatherCard() {
  const weather = useRecoilValue(weatherStateAtom);

  const location = `${weather.name}, ${weather.sys.country}`;

  const temp = Math.round(weather.main.temp);
  const high = Math.round(weather.main['temp_max']);
  const low = Math.round(weather.main['temp_min']);
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const alt = weather.weather[0].main;
  const icon = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <Card>
      {/* <Card.Img variant="top" src={icon} /> */}
      <Card.Body>
        <Card.Title>
          {new Date().toLocaleDateString()} {location}{' '}
          <img src={icon} alt={alt} />
        </Card.Title>
        <Card.Text>Temperature: {temp} °F</Card.Text>
        <Card.Text>High: {high} °F</Card.Text>
        <Card.Text>Low: {low} °F</Card.Text>
        <Card.Text>Humidity: {humidity}%</Card.Text>
        <Card.Text>Wind Speed: {wind} MPH</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;
