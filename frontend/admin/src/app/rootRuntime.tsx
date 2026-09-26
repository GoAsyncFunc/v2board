import React from 'react';
import { DvaContainer, getAdminStore } from './applicationStore';
import type { AdminRootState, AdminStore } from '@/types/storeContracts';

type InitialProps = Partial<AdminRootState> & { store?: AdminStore };

export function rootContainer(children: React.ReactElement): React.ReactElement {
    return <DvaContainer>{children}</DvaContainer>;
}

export function initialProps(props?: InitialProps): InitialProps {
    if (props) return props;
    const {
        auth,
        config,
        coupon,
        giftcard,
        knowledge,
        layout,
        notice,
        order,
        passport,
        payment,
        plan,
        serverAnyTLS,
        serverGroup,
        serverHysteria,
        serverManage,
        serverRoute,
        serverShadowsocks,
        serverTrojan,
        serverTuic,
        serverV2node,
        serverVless,
        serverVmess,
        stat,
        system,
        theme,
        ticket,
        user,
    } = getAdminStore().getState();
    return {
        auth,
        config,
        coupon,
        giftcard,
        knowledge,
        layout,
        notice,
        order,
        passport,
        payment,
        plan,
        serverAnyTLS,
        serverGroup,
        serverHysteria,
        serverManage,
        serverRoute,
        serverShadowsocks,
        serverTrojan,
        serverTuic,
        serverV2node,
        serverVless,
        serverVmess,
        stat,
        system,
        theme,
        ticket,
        user,
    };
}

export function modifyInitialProps(props?: InitialProps): InitialProps {
    return props ? { store: getAdminStore() } : {};
}
