import React from 'react';
import { Skeleton, Box } from '@chakra-ui/core';

function Loading() {
  return (
    <Box p="6" maxW="sm" borderWidth="0px" rounded="lg" overflow="hidden">
      <Skeleton p={2} height="120px" my="10px">
        <Box>
          Couple Playboy mudflaps and hell on his heels Beautifully echoed in
          the pace at which he shovel his meals Like not a farmer among us had a
          harvest survive the winter So dinner split a lima bean in triplets,
          pick a winner Took a couple summers puking pills behind the dumpster
          As the largest Pez dispenser on record recouped his numbers One shoe
          in the soupy gutter One shoe in the velvet heaven Where the mermaids
          told him shake em by the lake of melted weapons
        </Box>
      </Skeleton>
      <Skeleton height="60px" my="10px" />
      <Skeleton height="60px" my="10px" />
    </Box>
  );
}

export default Loading;
