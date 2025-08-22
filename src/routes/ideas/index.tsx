import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import IdeaCard from '@/components/IdeaCard'
import { fetchIdeas } from '@/api/ideas'

const ideasQueryOptions = queryOptions({
  queryKey: ['Ideas'],
  queryFn: () => fetchIdeas(),
})

export const Route = createFileRoute('/ideas/')({
  head: () => ({
    meta: [
      {
        title: 'IdeaHub - Browse Ideas',
      },
    ],
  }),
  loader: async ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(ideasQueryOptions),
  component: IdeasPage,
})

function IdeasPage() {
  const { data: ideas } = useSuspenseQuery(ideasQueryOptions)
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Ideas</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {ideas.map((idea) => (
          <IdeaCard idea={idea} key={idea._id} />
        ))}
      </div>
    </div>
  )
}
