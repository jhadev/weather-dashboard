import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { searchTermState as searchTermAtom } from '../recoil/atoms';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/core';

function SearchForm() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermAtom);
  const inputRef = useRef();

  function submit(e) {
    e.preventDefault();

    setSearchTerm(inputRef.current.value);

    inputRef.current.value = '';
  }

  return (
    <form onSubmit={submit}>
      <FormControl>
        <FormLabel htmlFor="search">Search for a city.</FormLabel>
        <Input ref={inputRef} id="search" placeholder="New York" />
        <Button
          type="submit"
          p={3}
          variantColor="pink"
          height="100%"
          rounded="lg"
          fontSize="xl"
          width="100%"
          mx="auto"
          my={2}>
          search
        </Button>
      </FormControl>
    </form>
  );
}

export default SearchForm;
