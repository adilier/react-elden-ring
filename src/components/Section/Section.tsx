import React from 'react';
import {
  Box,
  BoxProps,
  Stack,
  TextProps,
  Text,
  Flex,
  FlexProps,
  HStack,
  Image,
} from '@chakra-ui/react';
import { motion, Variants, useTransform, MotionValue } from 'framer-motion';

import Noise from '../../assets/noise.png';
import Rune from '../../assets/rune.png';

import Award from '../Icons/Award';

const MotionBox = motion<BoxProps>(Box);
const MotionText = motion<Omit<TextProps, 'transition'>>(Text);
const MotionFlex = motion<Omit<FlexProps, 'transition'>>(Flex);

const textVariants: Variants = {
  offscreen: {
    opacity: 0,
  },
  onscreen: {
    opacity: 1,
  },
};

const bannerVariants: Variants = {
  offscreen: {
    opacity: 0,
    x: 100,
  },
  onscreen: {
    opacity: 1,
    x: 0,
  },
};

interface Props {
  boss: {
    name: string;
    description: string;
    backgroundImage: string;
    drops: {
      name: string;
      type: string;
    }[];
  };
  elementHeight: number;
  index: number;
  scroll: MotionValue<number>;
}

const Section = React.forwardRef<HTMLElement, Props>(
  ({ elementHeight, index, scroll, boss }, ref) => {
    const y = useTransform(
      scroll,
      [
        elementHeight * (index + 1) - elementHeight,
        elementHeight * (index + 1),
      ],
      ['0vh', '100vh'],
    );

    return (
      <MotionBox
        w="100%"
        h="100vh"
        scrollSnapAlign="center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.5 }}
        ref={ref}
        zIndex={index + 1}
        position="relative"
      >
        <MotionBox
          bg="blue"
          w="100%"
          h="100%"
          p={4}
          color="white"
          style={{ y }}
          bgImage={`radial-gradient(circle, rgba(9,12,17,0.4) 0%, rgba(9,12,17,1) 100%),url(${Noise}), url(${boss.backgroundImage})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
        >
          <Flex alignItems="center" h="100%" w="100%" p="140px 120px">
            <Stack spacing={4}>
              <Stack w="xl">
                <MotionText
                  variants={textVariants}
                  transition={{ duration: 1 }}
                  fontWeight="extrabold"
                  fontFamily="Raleway"
                  fontSize="9xl"
                >
                  {boss.name}
                </MotionText>
                <MotionText
                  variants={textVariants}
                  transition={{ duration: 1, delay: 0.5 }}
                  fontWeight="regular"
                  fontFamily="Raleway"
                  fontSize="lg"
                >
                  {boss.description}
                </MotionText>
              </Stack>
              <HStack spacing={2}>
                {boss.drops.map((drop, dropIndex) => (
                  <MotionFlex
                    alignItems="center"
                    p="4px 12px"
                    bgColor="rgba(255, 255, 255, 0.1)"
                    backdropFilter="blur(100px)"
                    borderRadius="4px"
                    variants={bannerVariants}
                    transition={{ duration: 1, delay: 0.5 * dropIndex }}
                  >
                    {drop.type === 'rune' ? (
                      <Image src={Rune} w="24px" />
                    ) : (
                      <Award />
                    )}
                    <Text
                      color="#9E9E9F"
                      fontWeight="regular"
                      fontFamily="Raleway"
                      fontSize="md"
                      ml={2}
                    >
                      {drop.name}
                    </Text>
                  </MotionFlex>
                ))}
              </HStack>
            </Stack>
          </Flex>
        </MotionBox>
      </MotionBox>
    );
  },
);

export default Section;
