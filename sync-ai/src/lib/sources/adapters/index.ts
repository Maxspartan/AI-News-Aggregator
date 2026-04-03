export { BaseRSSAdapter, type SourceAdapter } from './base'
export { ArXivAdapter } from './arxiv'
export { OpenAIAdapter } from './openai'
export { HuggingFaceAdapter } from './huggingface'
export { GoogleAIAdapter } from './google-ai'
export { AnthropicAdapter } from './anthropic'
export { DeepMindAdapter } from './deepmind'
export { MetaAdapter } from './meta'
export { StabilityAdapter } from './stability'
export { RedditAdapter } from './reddit'

import { ArXivAdapter } from './arxiv'
import { OpenAIAdapter } from './openai'
import { HuggingFaceAdapter } from './huggingface'
import { GoogleAIAdapter } from './google-ai'
import { AnthropicAdapter } from './anthropic'
import { DeepMindAdapter } from './deepmind'
import { MetaAdapter } from './meta'
import { StabilityAdapter } from './stability'
import { RedditAdapter } from './reddit'
import { SourceAdapter } from './base'

export const sourceAdapters: SourceAdapter[] = [
  new ArXivAdapter(),
  new OpenAIAdapter(),
  new HuggingFaceAdapter(),
  new GoogleAIAdapter(),
  new AnthropicAdapter(),
  new DeepMindAdapter(),
  new MetaAdapter(),
  new StabilityAdapter(),
  new RedditAdapter(),
]

export function getAdapter(name: string): SourceAdapter | undefined {
  return sourceAdapters.find(a => a.name === name)
}
