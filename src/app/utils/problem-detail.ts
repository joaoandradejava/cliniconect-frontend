import { FieldMessage } from './field-message';
export interface ProblemDetail{
  timestamp: string
  type: string
  title: string
  status: number
  detail: string
  userMessage: string
  errors: FieldMessage[]
}
