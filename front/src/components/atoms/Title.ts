import styled from 'styled-components'
import { HTMLAttributes } from 'react'
import { colors, font } from '../../styles'
import Text from './Text'

type TTitle = HTMLAttributes<HTMLHeadingElement> & {
  as: 'h1' | 'h2' | 'h3'
}
export const Title = styled(Text).attrs<TTitle>((props) => ({
  as: props?.as || 'h1',
}))<TTitle>`
  color: ${({ color }) => color || colors.black.black2};
  font-family: ${font.fontFamily};
  ${({ as }) => as === 'h1' && `font-size: ${font.h1}`};
  ${({ as }) => as === 'h2' && `font-size: ${font.h2}`};
  ${({ as }) => as === 'h3' && `font-size: ${font.h3}`};
`
