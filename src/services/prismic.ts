import * as prismic from '@prismicio/client'
import { enableAutoPreviews } from '@prismicio/next'
import sm from '../../sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

export function createClient() {
  const client = prismic.createClient(endpoint, {
    accessToken: process.env.PERMANENT_ACCESS_TOKEN
  })

  enableAutoPreviews({
    client,
  })

  return client
}
