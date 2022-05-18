import 'react-native'
import React from 'react'
import { LoginScreen } from 'screen'
import { firebase } from 'firebaseconf/config'
import { fireEvent, render } from 'react-native-testing-library'
import { expect, it } from '@jest/globals'

describe('Loginscreen unit test', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('functionality', async () => {
    const email = 'ehehe'
    const password = 'uhuuw'
    const { getByPlaceholder } = render(<LoginScreen />)
    const emailfield = getByPlaceholder(/E-mail/i)
    const passwordfield = getByPlaceholder(/Password/i)
    await fireEvent.changeText(emailfield, email)
    await fireEvent.changeText(passwordfield, password)
    expect(emailfield.props.value).toEqual(email)
    expect(passwordfield.props.value).toEqual(password)
  })
  it('authentication', async () => {
    const email = 'adanamanyaa@gmail.com'
    const password = '123456'
    const firebaseMock = {
      signInWithEmailAndPassword: jest.fn().mockResolvedValueOnce(),
    }
    jest.spyOn(firebase, 'auth').mockImplementationOnce(() => firebaseMock)
    const { getByText, getByPlaceholder } = render(<LoginScreen />)
    const button = getByText(/Log in/i)
    await fireEvent.changeText(getByPlaceholder(/E-mail/i), email)
    await fireEvent.changeText(getByPlaceholder(/Password/i), password)
    fireEvent.press(button)
    expect(firebaseMock.signInWithEmailAndPassword).toBeCalled()
    expect(firebaseMock.signInWithEmailAndPassword).toBeCalledWith(
      email,
      password,
    )
    expect(firebaseMock.signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
  })
})
