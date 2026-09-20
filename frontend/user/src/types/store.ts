import type { PassportState } from './auth';
import type { CommunicationState, GuestState, PlanState } from './commonModels';
import type { CouponState, LayoutState, TutorialState } from './contentModels';
import type { InviteState } from './invite';
import type { KnowledgeState } from './knowledge';
import type { OrderModelState } from './payment';
import type { NoticeState, ServerState, TelegramState, TrafficState } from './queryModels';
import type { TicketState } from './ticket';
import type { UserState } from './user';

export type UserValue = object | string | number | boolean | symbol | bigint | null | undefined;

export interface UserAction<Result = void> {
  type: string;
  params?: object;
  callback?: (result: Result) => void;
  [key: string]: UserValue;
}

export type UserDispatchResult<Result> = UserAction<Result> | Promise<Result> | undefined;
export type UserDispatch = <Result = void>(action: UserAction<Result>) => UserDispatchResult<Result>;
export interface UserRootState {
  comm: CommunicationState;
  coupon: CouponState;
  guest: GuestState;
  invite: InviteState;
  knowledge: KnowledgeState;
  layout: LayoutState;
  notice: NoticeState;
  order: OrderModelState;
  passport: PassportState;
  plan: PlanState;
  server: ServerState;
  stat: TrafficState;
  telegram: TelegramState;
  ticket: TicketState;
  tutorial: TutorialState;
  user: UserState;
}

export interface UserStore {
  dispatch: UserDispatch;
  getState(): UserRootState;
}
