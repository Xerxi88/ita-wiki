import { vi } from 'vitest'
import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { VoteCounter } from '../../components/molecules'
import { voteMutation } from '../../components/molecules/VoteCounter'
import { fireEvent, screen, waitFor, render } from '../test-utils'
import { urls } from '../../constants'

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useMutation: vi.fn(),
  }
})

describe('Vote counter molecule', () => {
  const mockMutation = vi.fn()

  beforeEach(() =>
    vi.mocked(useMutation).mockReturnValue({
      mutate: mockMutation,
    } as unknown as UseMutationResult<unknown, unknown, unknown, unknown>)
  )

  it('renders correctly', () => {
    render(<VoteCounter voteCount={0} resourceId="test" />)
    expect(screen.getByTestId('increase')).toBeInTheDocument()
    expect(screen.getByTestId('decrease')).toBeInTheDocument()
    expect(screen.getByTestId('voteCounter')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('makes the correct request', async () => {
    render(<VoteCounter voteCount={0} resourceId="test" />)

    const increase = screen.getByTestId('increase')
    const decrease = screen.getByTestId('decrease')

    expect(increase).toBeInTheDocument()
    expect(decrease).toBeInTheDocument()

    fireEvent.click(increase)
    await waitFor(() => {
      expect(mockMutation).toHaveBeenCalledWith('1')
    })

    fireEvent.click(decrease)
    await waitFor(() => {
      expect(mockMutation).toHaveBeenCalledWith('-1')
    })
  })

  // NOTE: Needed for coverage
  it('calls fetch with the correct url and options', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    )
    const resourceId = 'resourceId'
    const voteValue = '1'
    const url = urls.vote
      .replace(':resourceId', resourceId)
      .replace(':vote', voteValue)

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        voteCount: voteValue,
        resourceId,
      }),
    }
    await voteMutation(resourceId, voteValue)

    expect(global.fetch).toHaveBeenCalledWith(url, requestOptions)
  })

  // NOTE: Needed for coverage
  it('throws an error when the fetch response is not ok', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    )

    await expect(voteMutation('resourceId', '1')).rejects.toThrow(
      'error fetching votes'
    )
  })
})
