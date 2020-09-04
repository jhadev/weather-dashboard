import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/core';

const NavDrawer = ({ children, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState('top');

  return (
    <div m={'auto'}>
      <Button
        variant="ghost"
        height="100%"
        rounded="lg"
        fontSize="xl"
        width="100%"
        p={3}
        onClick={onOpen}>
        <Icon name="chevron-down" size="48px" />
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavDrawer;
