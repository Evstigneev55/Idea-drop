import type { Idea } from '@/types/idea'
import { api } from '@/lib/axios'

export async function fetchIdea(ideaId: string): Promise<Idea> {
  const res = await api.get(`/ideas/${ideaId}`)
  return res.data
}

export async function fetchIdeas(limit?: number): Promise<Idea[]> {
  const res = await api.get('/ideas', {
    params: limit ? { _limit: limit } : {},
  })
  return res.data
}

export async function createIdea(newIdea: {
  title: string
  summary: string
  description: string
  tags: string[]
}): Promise<Idea> {
  const res = await api.post('/ideas', {
    ...newIdea,
    createdAt: new Date().toISOString(),
  })
  return res.data
}

export async function deleteIdea(ideaId: string): Promise<void> {
  await api.delete(`/ideas/${ideaId}`)
}

export async function updateIdea(
  ideaId: string,
  updatedData: {
    title: string
    description: string
    summary: string
    tags: string[]
  }
): Promise<Idea> {
  const res = await api.put(`/ideas/${ideaId}`, updatedData);
  return res.data;
}
