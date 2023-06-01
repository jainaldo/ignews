import { render, screen} from '@testing-library/react'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'jest-mock'
import { getSession } from 'next-auth/react'


const post = { 
  slug: 'My-new-post',
  title: 'My new Post',
  content: '<p>Post content</p>',
  updatedAt: '10 de Abril'}

jest.mock('next-auth/react')
jest.mock('../../services/prismic')

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Post post={post}/>)

    expect(screen.getByText('My new Post')).toBeInTheDocument()
    expect(screen.getByText('Post content')).toBeInTheDocument()
  })

  it("redirects user if no subscription is found", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce(null);
    const slug = 'my-new-post'

    const response = await getServerSideProps({ 
      params: { slug }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: `/posts/preview/${slug}`
        })
      })
    )
  })

  it("loads initial data", async () => {
    const getSessionMocked = mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({ 
      activeSubscription: 'fake-active-subscription'
    } as any);

    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{
            type: 'heading',
            text: 'My new post'
          }],
          content: [{
            type: 'paragraph' ,
            text: 'Post content',
            spans: []
          }]
        },
        last_publication_date: '04-01-2021'
      })
    } as any);

    const slug = 'my-new-post'

    const response = await getServerSideProps({ 
      params: { slug }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  })
})
