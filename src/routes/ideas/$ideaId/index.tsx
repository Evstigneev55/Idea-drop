import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { deleteIdea, fetchIdea } from '@/api/ideas'
import { useAuth } from '@/context/AuthContext'

const ideaDetailsQueryOtions = (ideaId: string) =>
  queryOptions({
    queryKey: ['Idea', [ideaId]],
    queryFn: () => fetchIdea(ideaId),
  })

export const Route = createFileRoute('/ideas/$ideaId/')({
  component: IdeaDeatailsPage,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaDetailsQueryOtions(params.ideaId))
  },
})
function IdeaDeatailsPage() {
  const navigate = useNavigate()
  const { ideaId } = Route.useParams()
  const { data: idea } = useSuspenseQuery(ideaDetailsQueryOtions(ideaId))

  const { user } = useAuth()

  const { mutateAsync: deleteAsync, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => navigate({ to: '/ideas' }),
  })

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Idea?'
    )
    if (confirmDelete) await deleteAsync()
  }

  return (
    <div className='p-4'>
      <Link to='/ideas' className='text-blue-500 underline block mb-4'>
        Back to Ideas
      </Link>
      <h2 className='text-2xl font-bold'>{idea.title}</h2>
      <p className='mt-2'>{idea.description}</p>

      {user && user.id === idea.user && (
        <>
          {/* Edit button */}
          <Link
            to='/ideas/$ideaId/edit'
            params={{ ideaId }}
            className='inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition'
          >
            Edit
          </Link>

          {/* Delete Button */}
          <button
            className='text-sm bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded transition disavled:opacity:50'
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </button>
        </>
      )}
    </div>
  )
}
