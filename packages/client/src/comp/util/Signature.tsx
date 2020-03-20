import React from 'react'
import SignatureCanvas from 'react-signature-canvas'
import styled from 'styled-components'
import { RoundedButton } from './Button'

const width = 350

const Label = styled.label`
  font-size: 12px;
  color: rgba(30, 134, 218, 0.918);
`

const BottomLine = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.26);
  width: ${width}px;
`

const Margin = styled.div`
  margin: 1em 0;
`

type Props = React.PropsWithChildren<{
  inputRef: React.RefObject<SignatureCanvas>
  label: string
}>

export const Signature = ({ inputRef, label }: Props) => {
  const handleClick: React.MouseEventHandler = (event) => {
    event.preventDefault()
    inputRef.current && inputRef.current.clear()
  }

  return <div>
    <Label>{label}</Label>
    <BottomLine>
      <SignatureCanvas
        canvasProps={{width, height: 200}}
        ref={inputRef}
      />
    </BottomLine>
    <Margin>
      <RoundedButton onClick={handleClick} variant='raised'>Clear Signature</RoundedButton>
    </Margin>
  </div>
}
