import React from 'react';
import {HStack, Box} from 'native-base';
import {StatusBar} from 'react-native';

import colors from 'Theme/colors';

export const CustomHeader = () => {
  return (
    <HStack style={{backgroundColor: colors.purple}}>
      <StatusBar backgroundColor={colors.purple} />
      <Box
        style={{
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      />
    </HStack>
  );
};
