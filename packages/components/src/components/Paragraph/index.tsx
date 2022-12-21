import React from 'react';

import { VariantProps, CSS } from '@venusui/tokens';

import { Text } from '../Text';

const DEFAULT_TAG = 'p';

type TextSizeVariants = Pick<VariantProps<typeof Text>, 'size'>;
type ParagraphSizeVariants = '1' | '2';
type ParagraphVariants = { size?: ParagraphSizeVariants } & Omit<VariantProps<typeof Text>, 'size'>;
type ParagraphProps = React.ComponentProps<typeof DEFAULT_TAG> &
  ParagraphVariants & { css?: CSS; as?: any };

export const Paragraph = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, ParagraphProps>(
  (props, forwardedRef) => {
    const { size = '1', ...textProps } = props;

    const textSize: Record<ParagraphSizeVariants, TextSizeVariants['size']> = {
      1: { '@initial': '3', '@bp2': '4' },
      2: { '@initial': '5', '@bp2': '6' },
    };

    const textCss: Record<ParagraphSizeVariants, CSS> = {
      1: { lineHeight: '25px', '@bp2': { lineHeight: '27px' } },
      2: { color: '$slate11', lineHeight: '27px', '@bp2': { lineHeight: '30px' } },
    };

    return (
      <Text
        as={DEFAULT_TAG}
        {...textProps}
        ref={forwardedRef}
        size={textSize[size]}
        css={{
          ...textCss[size], ...props.css,
        }}
      />
    );
  }
);