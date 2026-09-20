import type { KnowledgeRecord } from '../components/content/KnowledgeDisplayColumns';

export interface KnowledgeState {
  knowledges: KnowledgeRecord[];
  fetchLoading: boolean;
  categorys: string[];
  knowledge: KnowledgeRecord;
  fetchByIdLoading: boolean;
  saveLoading: boolean;
}
