import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherState as weatherStateAtom } from '../recoil/atoms';
import { Badge, Box, Image, Text, Flex, Stack } from '@chakra-ui/core';

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

  function toggleTempColor(temp) {
    let color = '';
    if (temp >= 90) {
      color = 'red';
    } else if (temp < 90 && temp >= 75) {
      color = 'orange';
    } else if (temp < 75 && temp >= 55) {
      color = 'teal';
    } else {
      color = 'blue';
    }

    return color;
  }

  const color = toggleTempColor(temp);

  function genCard() {
    return (
      <Box p="6" maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h2"
          lineHeight="tight"
          isTruncated>
          <Flex justify="space-between" direction="row">
            <Text fontSize="2xl" as="h4">
              {location}
            </Text>
            <Text fontSize="2xl" as="h4">
              {new Date().toLocaleDateString()}{' '}
            </Text>
          </Flex>
        </Box>
        <Flex justify="center" align="center">
          <Image
            src={icon}
            fallbackSrc="https://via.placeholder.com/50"
            alt={alt}
          />
        </Flex>

        <Box>
          <Box alignItems="baseline">
            <Flex justify="center" direction="row">
              <Stack spacing={2} mb={2}>
                <Badge
                  rounded="full"
                  px="2"
                  fontSize="5xl"
                  textAlign="center"
                  variantColor={color}>
                  {temp} °F
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="2xl"
                  textTransform="uppercase">
                  High: {high} °F &bull; Low: {low} °F
                </Box>
              </Stack>
            </Flex>
          </Box>
          <Flex justify="center">
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="lg"
              textTransform="uppercase">
              <Text textAlign="center">Humidity: {humidity}%</Text>
              <Text textAlign="center">Wind Speed: {wind} MPH</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }

  return genCard();
}

export default WeatherCard;
