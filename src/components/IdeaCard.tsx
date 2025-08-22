import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import type { Idea } from '@/types/idea'

const IdeaCard = ({
  idea,
  button = true,
}: {
  idea: Idea
  button?: boolean
}) => {
  const linkClasses = clsx({
    'text-blue-600 hover:underline mt-3': !button,
    'inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white text-center rounded transition': button,
  })
  return (
    <div className='border rounded-lg border-gray-300 p-4 shadow flex flex-col bg-white justify-between'>
      <div>
        <h2 className='text-lg font-semibold'>{idea.title}</h2>
        <p className='text-gray-700'>{idea.summary}</p>
      </div>
      <Link
        to='/ideas/$ideaId'
        params={{ ideaId: String(idea._id) }}
        className={linkClasses}
      >
        {button ? 'View Idea' : 'Read more →'}
      </Link>
    </div>
  )
}
export default IdeaCard
