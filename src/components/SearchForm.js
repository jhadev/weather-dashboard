import React, { useRef, Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { searchTermState as searchTermAtom } from '../recoil/atoms';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Stack,
  Divider,
  Text,
} from '@chakra-ui/core';
import ToggleColorMode from './ToggleColorMode';

function SearchForm({ history }) {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const inputRef = useRef();

  function submit(e) {
    e.preventDefault();

    setSearchTerm(inputRef.current.value);

    inputRef.current.value = '';
  }

  return (
    <Flex justify="center">
      <Stack>
        <ToggleColorMode />

        <form onSubmit={submit}>
          <FormControl>
            {/* <FormLabel
              textTransform="uppercase"
              letterSpacing="wide"
              textAlign="center"
              mb={2}
              color="gray.500"
              htmlFor="search">
              Search for a location
            </FormLabel> */}
            <Input
              ref={inputRef}
              size="lg"
              id="search"
              placeholder="NEW YORK"
            />

            <Button
              type="submit"
              p={3}
              variantColor="cyan"
              variant="outline"
              height="100%"
              rounded="lg"
              fontSize="xl"
              width="100%"
              mx="auto"
              my={4}>
              SEARCH
            </Button>
          </FormControl>
        </form>
        <Divider />
        <Text
          color="gray.500"
          letterSpacing="wide"
          fontWeight="semibold"
          textAlign="center"
          fontSize="md">
          SEARCH HISTORY
        </Text>
        {history.length &&
          history.map((term, i) => {
            return (
              <Fragment key={i}>
                <Button
                  p={3}
                  variantColor="pink"
                  height="100%"
                  rounded="lg"
                  fontSize="xl"
                  variant="outline"
                  textTransform="uppercase"
                  width="100%"
                  value={term}
                  onClick={(e) => setSearchTerm(e.target.value)}
                  my={2}>
                  {term}
                </Button>
              </Fragment>
            );
          })}
      </Stack>
    </Flex>
  );
}

export default SearchForm;
