import React from 'react';
import classNames from 'classnames';
import MobileListItemComponent from './MobileListItem';

export { MobileListBrief, MobileListItem } from './MobileListItem';

type RenderableChild = React.ReactNode;

interface MobileListProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    children?: RenderableChild;
    renderHeader?: RenderableChild | (() => RenderableChild);
    renderFooter?: RenderableChild | (() => RenderableChild);
}

export class MobileList extends React.Component<MobileListProps> {
    static Item = MobileListItemComponent;
    static defaultProps = { prefixCls: 'am-list' };

    render() {
        const { prefixCls, children, className, style, renderHeader, renderFooter, ...restProps } =
            this.props;
        return (
            <div className={classNames(prefixCls, className)} style={style} {...restProps}>
                {renderHeader && (
                    <div className={`${prefixCls}-header`}>
                        {typeof renderHeader === 'function' ? renderHeader() : renderHeader}
                    </div>
                )}
                {children && <div className={`${prefixCls}-body`}>{children}</div>}
                {renderFooter && (
                    <div className={`${prefixCls}-footer`}>
                        {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
                    </div>
                )}
            </div>
        );
    }
}

export default MobileList;
