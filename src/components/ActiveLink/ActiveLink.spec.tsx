import { render } from '@testing-library/react'
import { ActiveLink } from '.'

jest.mock('next/navigation', () => {
  return {
    usePathname() {
      return "/"
    }
  }
})

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        Home
      </ActiveLink>
    )
    expect(getByText("Home")).toBeInTheDocument()
  })
  
  it('adds active class if the link as currently active', () => {
    const { getByText } = render(
      <ActiveLink href='/' activeClassName='active'>
        Home 
      </ActiveLink>
    )
    expect(getByText("Home")).toHaveClass('active')
  })
})

