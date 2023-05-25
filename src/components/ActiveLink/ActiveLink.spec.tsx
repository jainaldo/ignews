import { render, screen } from '@testing-library/react'
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
    render(
      <ActiveLink href='/' activeClassName='active'>
        Home
      </ActiveLink>
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
  })
  
  it('adds active class if the link as currently active', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        Home 
      </ActiveLink>
    )
    expect(screen.getByText("Home")).toHaveClass('active')
  })
})

