import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import {
  Badge,
  Box,
  Image,
  Text,
  Flex,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core';
import { forecastState as forecastStateAtom } from '../recoil/atoms';
import { toggleTempColor } from '../utils/toggleTempColor';

function Forecast() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState('inside');
  const btnRef = useRef();
  const forecast = useRecoilValue(forecastStateAtom);

  console.log(forecast);

  function genForecastCards() {
    const filteredByTime = forecast.filter((item) => {
      return item.dt_txt.indexOf('15:00:00') !== -1;
    });

    console.log(filteredByTime);

    return filteredByTime.map((day) => {
      const temp = Math.round(day.main.temp);
      const high = Math.round(day.main['temp_max']);
      const low = Math.round(day.main['temp_min']);
      const description = day.weather[0].main;
      const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
      const date = new Date(day.dt_txt).toLocaleDateString();

      const color = toggleTempColor(temp);

      return (
        <Box
          key={date}
          p="6"
          maxW="sm"
          my={4}
          borderWidth="1px"
          rounded="lg"
          overflow="hidden">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h2"
            lineHeight="tight"
            isTruncated>
            <Flex justify="space-between" direction="row">
              <Text
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="2xl"
                textTransform="uppercase">
                {description}
              </Text>
              <Text
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="2xl"
                textTransform="uppercase">
                {date}
              </Text>
            </Flex>
          </Box>
          <Flex justify="center" align="center">
            <Image
              src={icon}
              fallbackSrc="https://via.placeholder.com/50"
              alt={description}
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
          </Box>
        </Box>
      );
    });
  }

  const fiveDay = genForecastCards();

  return (
    <>
      <Button
        mt={2}
        ref={btnRef}
        variant="outline"
        variantColor="cyan"
        size="lg"
        onClick={onOpen}>
        SHOW 5 DAY
      </Button>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={scrollBehavior}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader letterSpacing="wide" fontWeight="semibold">
            5 DAY FORECAST
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{forecast.length && fiveDay}</ModalBody>
          <ModalFooter>{/* <Button>Close</Button> */}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Forecast;
