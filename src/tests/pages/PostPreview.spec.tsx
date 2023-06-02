import { render, screen} from '@testing-library/react'
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic'
import { mocked } from 'jest-mock'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'


const post = { 
  slug: 'My-new-post',
  title: 'My new Post',
  content: '<p>Post content</p>',
  updatedAt: '10 de Abril'}

jest.mock('next-auth/react')
jest.mock('../../services/prismic')
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

describe("Post preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: null,
      }
    } as any);

    render(<PostPreview post={post}/>)

    expect(screen.getByText('My new Post')).toBeInTheDocument()
    expect(screen.getByText('Post content')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it("redirects user to full post when subscribed", async () => {
    const useSessionMocked = mocked(useSession);
    
    useSessionMocked.mockReturnValueOnce({
      data: {
        activeSubscription: 'fake-active-subscription'
      }
    } as any);

    const useRouterMocked = mocked(useRouter);
    const pushMocked = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any )

    render(<PostPreview post={post}/>)

    expect(pushMocked).toHaveBeenCalledWith(`/posts/${post.slug}`)
  })

  it("loads initial data", async () => {
  
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

    const response = await getStaticProps({ params: { slug }});

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
