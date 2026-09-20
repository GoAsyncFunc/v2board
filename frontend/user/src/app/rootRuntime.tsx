import React from 'react';
import { DvaContainer, getUserStore } from './store';
import type { UserRootState, UserStore } from '../types/store';

type InitialProps = Partial<UserRootState> & { store?: UserStore };

export function rootContainer(children: React.ReactElement): React.ReactElement {
    return <DvaContainer>{children}</DvaContainer>;
}

export function initialProps(props?: InitialProps): InitialProps {
    if (props) return props;
    const {
        comm,
        coupon,
        guest,
        invite,
        knowledge,
        layout,
        notice,
        order,
        passport,
        plan,
        server,
        stat,
        telegram,
        ticket,
        tutorial,
        user,
    } = getUserStore().getState();
    return {
        comm,
        coupon,
        guest,
        invite,
        knowledge,
        layout,
        notice,
        order,
        passport,
        plan,
        server,
        stat,
        telegram,
        ticket,
        tutorial,
        user,
    };
}

export function modifyInitialProps(props?: InitialProps): InitialProps {
    return props ? { store: getUserStore() } : {};
}
