import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import React, { PropsWithChildren } from 'react'

import { FloridaInfo, uspsAddressOneLine, Locale, FloridaContact } from '../../common'
import { AddressContainer } from '../../lib/state'
import { client } from '../../lib/trpc'
import { RoundedButton } from '../util/Button'
import { useControlRef } from '../util/ControlRef'
import { BaseInput, PhoneInput, EmailInput, NameInput, BirthDateInput } from '../util/Input'
import { TogglableInput } from '../util/Togglable'
import { useAppHistory } from '../../lib/history'

type Props = PropsWithChildren<{
  locale: Locale<'Florida'>
  contact: FloridaContact
}>

export const Florida = ({locale, contact}: Props) => {
  const { pushSuccess } = useAppHistory()

  const nameRef = useControlRef<Input>()
  const birthdateRef = useControlRef<Input>()
  const emailRef = useControlRef<Input>()
  const phoneRef = useControlRef<Input>()
  const mailingRef = useControlRef<Input>()

  const { county } = locale
  const { clerk, email, url } = contact
  const { address } = AddressContainer.useContainer()
  const uspsAddress = address ? uspsAddressOneLine(address) : null

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.persist()  // allow async function call
    event.preventDefault()
    if (!address || !uspsAddress) return  // TODO: Add warning

    const info: FloridaInfo = {
      state: 'Florida',
      name: nameRef.value(),
      birthdate: birthdateRef.value(),
      email: emailRef.value(),
      addressId: address.id || '',
      mailingAddress: mailingRef.value() || '',
      phone: phoneRef.value(),
      uspsAddress,
      county,
    }
    const result = await client.register(info)
    result.type === 'data' && pushSuccess(result.data)
    // TODO: Add warning if error
  }

  return <Form onSubmit={handleSubmit}>
    <p>
      The election official for {county} is {clerk} and can be reached at <a href={`mailto:${email}`}>{email}</a>.&nbsp;
      For more information, visit the (<a href={url}>County Elections Website</a>).
    </p>
    <p>To apply, fill out the following form and we will send the vote-by-mail application email to both you and the local elections official:</p>
    <NameInput
      id='name'
      ref={nameRef}
      required
    />
    <BirthDateInput
      id='birthdate'
      ref={birthdateRef}
      required
    />
    <EmailInput
      id='email'
      ref={emailRef}
      required
    />
    <PhoneInput
      id='tel'
      ref={phoneRef}
    />
    <TogglableInput
      id='separate'
      label='Mail My Ballot to a Separate Mailing Address'
    >{
      (checked) => <BaseInput
        id='mailing'
        label='Mailing Address'
        ref={mailingRef}
        required={checked}
      />
    }</TogglableInput>
    <RoundedButton color='primary' variant='raised' data-testid='florida-submit'>
      Send my application email
    </RoundedButton>
  </Form>
}
