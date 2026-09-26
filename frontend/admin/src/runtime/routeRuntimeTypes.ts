import type React from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { AdminRootState, AdminStore } from '@/types/storeContracts';

export type RouteMatchProps = RouteComponentProps<Record<string, string | undefined>>;

export type DynamicRouteProps = Partial<AdminRootState> & {
    store?: AdminStore;
    fetchingProps?: boolean;
    render?: RouteRenderFunction;
};

export interface InitialRoutePropsContext extends DynamicRouteProps {
    isServer: false;
    route: RouteMatchProps['match'];
    location: RouteMatchProps['location'];
    prevInitialProps: DynamicRouteProps;
}

export type RouteRenderProps = RouteMatchProps & DynamicRouteProps;
export type RouteRenderFunction = (props: RouteRenderProps) => React.ReactNode;

export interface RouteComponentStatics {
    getInitialProps?: (
        context: InitialRoutePropsContext,
    ) => Promise<DynamicRouteProps | null | undefined>;
    wrappedWithInitialProps?: boolean;
}
