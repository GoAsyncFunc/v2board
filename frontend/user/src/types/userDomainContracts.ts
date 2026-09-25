import type { PutEffect, SelectEffect } from 'redux-saga/effects';
import type { ApiResponse } from './apiContracts';
import type { CommunicationConfig } from './authenticationContracts';
import type { NumericValue } from './commerceContracts';
import type { CatalogPlan, PlanPeriod } from './planContracts';
import type { StateUpdate } from './queryStateContracts';

export interface UserCommunicationConfig {
    commission_distribution_enable?: boolean | number;
    commission_distribution_l1?: number;
    commission_distribution_l2?: number;
    commission_distribution_l3?: number;
    currency?: string;
    currency_symbol?: string;
    is_telegram?: boolean | number;
    telegram_discuss_link?: string;
    withdraw_close?: boolean | number;
    withdraw_methods?: string[];
}

export interface CommunicationState {
    config: UserCommunicationConfig;
}

export interface GuestState {
    commConfig: CommunicationConfig;
    getCommConfigLoading: boolean;
    selectEmailSuffix?: string;
}

export type PlanRecord = Partial<CatalogPlan> & Record<string, NumericValue>;

export interface PlanState {
    plans: CatalogPlan[];
    plan: PlanRecord;
    selectPeriod?: PlanPeriod;
    fetchLoading: boolean;
}

export interface ModelEffects<State> {
    put(action: StateUpdate<State>): PutEffect<StateUpdate<State>>;
}

export interface PlanEffects extends ModelEffects<PlanState> {
    select(selector: (state: { plan: PlanState }) => PlanState): SelectEffect;
}

export type ModelGenerator<State, Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<StateUpdate<State>>,
    void,
    ApiResponse<Data>
>;

export type PlanGenerator<Data> = Generator<
    Promise<ApiResponse<Data>> | PutEffect<StateUpdate<PlanState>> | SelectEffect,
    void,
    ApiResponse<Data> | PlanState
>;
