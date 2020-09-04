import React from 'react';
import { Skeleton } from '@chakra-ui/core';

function Loading() {
  return (
    <div>
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
      <Skeleton height="40px" my="10px" />
    </div>
  );
}

export default Loading;
