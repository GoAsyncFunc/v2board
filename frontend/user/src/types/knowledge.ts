export type KnowledgeId = number | string;

export interface KnowledgeArticle {
  id: KnowledgeId;
  title: string;
  updated_at: number;
}

export interface KnowledgeState {
  knowledges: Record<string, KnowledgeArticle[]>;
  knowledge: { title?: string; body?: string };
  fetchLoading: boolean;
  fetchByIdLoading: boolean;
}
