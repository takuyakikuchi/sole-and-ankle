import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const FLAG = {
    'on-sale': {
      content: 'Sale',
      color: COLORS.primary,
    },
    'new-release': {
      content: 'Just Released!',
      color: COLORS.secondary,
    },
  }

  const isOnSale = variant === 'on-sale';

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price isOnSale={isOnSale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          { isOnSale && <SalePrice>{formatPrice(salePrice)}</SalePrice> }
        </Row>
        { variant !== 'default' 
          && <Flag style={{ '--color': FLAG[variant].color}}>{FLAG[variant].content}</Flag> }
      </Wrapper>
    </Link>
  );
};

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;

  height: 32px;
  line-height: 32px;
  padding: 0 8px;
  background-color: var(--color);
  border-radius: 2px;

  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  font-size: ${14 / 16}rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration-line: ${({ isOnSale }) => isOnSale ? 'line-through' : 'none'};
  color: ${({ isOnSale }) => isOnSale ? COLORS.gray[700] : 'inherit'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
