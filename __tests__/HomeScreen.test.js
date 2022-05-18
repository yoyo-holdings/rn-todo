import 'react-native'
import React from 'react'
import { HomeScreen } from 'screen'
import { firebase } from 'firebaseconf/config'
import { fireEvent, render, act } from 'react-native-testing-library'
import { expect, it } from '@jest/globals'
describe('Homescreen unit test', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })
  it('Add post', async () => {
    const txttitle = 'hehee'
    const txtcntent = 'contenttest'
    const data = {
      text: txt,
      authorID: null,
      createdAt: null,
    }
    const { getByPlaceholder, getByText } = render(<HomeScreen />)
    const firestoreMock = {
      collection: jest.fn().mockReturnThis(),
      add: jest.fn().mockResolvedValueOnce(),
    }
    jest
      .spyOn(firebase, 'firestore')
      .mockImplementationOnce(() => firestoreMock)
    const titlefield = getByPlaceholder(/Title/i)
    const contentfield = getByPlaceholder(/Content/i)
    const button = getByText(/Add/i)
    await fireEvent.changeText(titlefield, txttitle)
    await fireEvent.changeText(contentfield, txtcntent)
    await fireEvent.press(button)
    await act(async () => {
      expect(titlefield.props.value).toEqual(txttitle)
      expect(contentfield.props.value).toEqual(txtcntent)
    })
    expect(firestoreMock.collection).toBeCalledWith('entities')
    expect(firestoreMock.add).toBeCalledWith(data)
  })
})
