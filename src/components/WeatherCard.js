import React from 'react';
import { useRecoilValue } from 'recoil';
import { weatherState as weatherStateAtom } from '../recoil/atoms';
import { Badge, Box, Image, Text, Flex, Stack } from '@chakra-ui/core';
import { toggleTempColor } from '../utils/toggleTempColor';

function WeatherCard() {
  const weather = useRecoilValue(weatherStateAtom);

  const location = `${weather.displayLocation.city}, ${weather.displayLocation.state}`;

  const country = weather.displayLocation.country;

  const temp = Math.round(weather.main.temp);
  const high = Math.round(weather.main['temp_max']);
  const low = Math.round(weather.main['temp_min']);
  const humidity = weather.main.humidity;
  const wind = weather.wind.speed;
  const alt = weather.weather[0].main;
  const icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

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
          <Flex justify="center" direction="row">
            <Stack textAlign="center" spacing={2}>
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="2xl"
                letterSpacing="wide">
                {location} &bull; {country}
              </Text>
              <Text
                color="gray.500"
                letterSpacing="wide"
                fontWeight="semibold"
                fontSize="2xl">
                {new Date().toLocaleDateString()}{' '}
              </Text>
            </Stack>
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
