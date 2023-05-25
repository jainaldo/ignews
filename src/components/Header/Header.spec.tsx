import { render, screen } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/navigation', () => {
  return {
    usePathname() {
      return "/"
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return {
        update: (data) => {},
        data: null,
        status: "authenticated"
      }
    }
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Header />
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Posts")).toBeInTheDocument()
  })
})

