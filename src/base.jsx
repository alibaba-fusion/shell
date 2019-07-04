import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default function Base(props) {
    const { componentName } = props;
    class Shell extends Component {
        static displayName = componentName;

        static _typeMark = `Shell_${componentName}`;

        static propTypes = {
            prefix: PropTypes.string,
            collapse: PropTypes.bool,
            miniable: PropTypes.bool,
            Component: PropTypes.string,
        }

        static defaultProps = {
            prefix: 'fusion-',
            Component: 'div',
        };

        render() {
            const {
                prefix,
                className,
                collapse,
                miniable,
                device,
                children,
                Component,
                ...others
            } = this.props;

            let Tag = Component;

            const cls = classnames({
                [`${prefix}shell-${componentName.toLowerCase()}`]: true,
                [`${prefix}shell-collapse`]: !!collapse,
                [`${prefix}shell-mini`]: miniable,
                [className]: !!className,
            });

            let newChildren = children;
            if (componentName === 'Content') {
                newChildren = <div className={`${prefix}shell-content-inner`}>{children}</div>;
            }

            if (componentName === 'Page') {
                return children;
            }

            if (['Navigation', 'ToolDock'].indexOf(componentName) > -1) {
                Tag = 'aside';
            }

            return <Tag className={cls} {...others}>{newChildren}</Tag>;
        }
    }

    return Shell;
}
