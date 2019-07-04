import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isBoolean, getCollapseMap, getSiderSize } from './util';
import { polyfill } from 'react-lifecycles-compat';
import Icon from './svg';

class Shell extends Component {
    state = {};
    static displayName = 'Shell';

    static _typeMark = 'Shell';

    static propTypes = {
        prefix: PropTypes.string,
        device: PropTypes.oneOf(['phone', 'pad', 'desktop']),
    }

    static defaultProps = {
        prefix: 'fusion-',
        device: 'desktop',
    };

    constructor(props) {
        super(props);

        this.state = {
            controll: false,
            collapseMap: {},
            device: props.device,
        };
    }

    componentDidUpdate(prevProps) {
        const { device } = this.props;
        const deviceMap = getCollapseMap(device);

        if (prevProps.device !== device) {
            this.setState({
                controll: false,
                collapseMap: deviceMap,
                device,
            });
        }
    }

    setChildCollapse = (child, mark) => {
        const { device, collapseMap, controll } = this.state;
        const deviceMap = getCollapseMap(device);

        let collapse;
        if (controll) {
            collapse = collapseMap[mark];
        } else {
            collapse = deviceMap[mark];
        }

        const props = {}

        if (isBoolean(child.props.collapse) === false) {
            props.collapse = collapse;
        }

        if (device !== 'phone' && mark === 'Navigation') {
            props.miniable = true;
        }

        return React.cloneElement(child, props);
    }

    toggleAside = (mark) => {
        const { device, collapseMap } = this.state;

        const deviceMap = getCollapseMap(device);
        const current = mark in collapseMap ? collapseMap[mark] : deviceMap[mark];

        this.setState({
            controll: true,
            collapseMap: {
                ...deviceMap,
                ...this.state.collapseMap,
                [mark]: !current
            }
        });
    }

    toggleNavigation = () => {
        this.toggleAside('Navigation');
    }

    toggleLocalNavigation = () => {
        this.toggleAside('LocalNavigation');
    }

    toggleAncillary = () => {
        this.toggleAside('Ancillary');
    }

    toggleToolDock = () => {
        this.toggleAside('ToolDock');
    }


    renderShell = (props) => {
        const {
            prefix,
            children,
        } = props;

        const { device, collapseMap, controll } = this.state;
        const siderSizes = getSiderSize(device);
        const deviceMap = getCollapseMap(device);

        const layout = {}, contentStyle = {};
        let hasHeader = false, hasToolDock = false, hasHeaderToolDock = false, needBrandingTrigger = false, needDockTrigger = false;


        React.Children.map(children, child => {
            if (
                child &&
                typeof child.type === 'function'
            ) {
                const mark = child.type._typeMark.replace('Shell_', '');
                switch (mark) {
                    case 'Branding':
                    case 'Action':
                        hasHeader = true;

                        if (!layout.header) {
                            layout.header = {};
                        }
                        layout.header[mark] = child;
                        break;
                    case 'LocalNavigation':
                        if (!layout[mark]) {
                            layout[mark] = [];
                        }
                        layout[mark] = this.setChildCollapse(child, mark);
                        break;
                    case 'Ancillary':
                        if (!layout[mark]) {
                            layout[mark] = [];
                        }
    
                        layout[mark] = this.setChildCollapse(child, mark);
                        break;
                    case 'ToolDock':
                        hasToolDock = true;
                        
                        if (!layout[mark]) {
                            layout[mark] = [];
                            contentStyle.paddingRight = 0;
                        }

                        const childT = this.setChildCollapse(child, mark);
                        layout[mark] = childT;

                        if (childT.props.collapse) {
                            hasHeaderToolDock = true;
                        } else {
                            contentStyle.paddingRight += siderSizes[mark]
                        }
                        break;
                    case 'AppBar':
                    case 'Content':
                    case 'Footer':
                        layout.content || (layout.content = []);
                        layout.content.push(child);
                        break;
                    case 'Shell':
                        layout.page || (layout.page = []);
                        layout.page = child;
                        break;
                    case 'Navigation':
                        if (!layout.header) {
                            layout.header = {}
                        }

                        if (child.props.direction === 'hoz') {
                            hasHeader = true;
                            layout.header[mark] = child;
                        } else {
                            if (!layout[mark]) {
                                layout[mark] = []
                                contentStyle.paddingLeft = 0;
                            }

                            needBrandingTrigger = true;

                            const childN = this.setChildCollapse(child, mark);
                            layout[mark] = childN;

                            let paddingLeft = siderSizes[mark];
                            if (childN.props.collapse) {
                                paddingLeft = siderSizes[`${mark}Collapse`];
                            }

                            contentStyle.paddingLeft += paddingLeft;
                        }
                        break;
                    default:
                        break;
                }
            }
        });


        const headerCls = classnames({
            [`${prefix}shell-header`]: true,
        });

        const mainCls = classnames({
            [`${prefix}shell-main`]: true,
        });

        const submainCls = classnames({
            [`${prefix}shell-sub-main`]: true,
        });

        const asideCls = classnames({
            [`${prefix}shell-aside`]: true,
        });

        const contentCls = classnames({
            [`${prefix}shell-content`]: true,
        });

        const asideStyle = {}, dockStyle = {}, ancillaryStyle = {};
        let headerHeight = 0;
        
        if (hasHeader) {
            headerHeight = siderSizes.Header || 0;
            dockStyle.top = headerHeight;
        }

        if (hasToolDock) {
            if (device === 'phone') {
                needDockTrigger = true;                
            }
            
            ancillaryStyle.right = siderSizes.ToolDock;

            if (!hasHeaderToolDock) {
                headerHeight += siderSizes.ToolDockHeader || 0;
            }
        }

        if (needBrandingTrigger) {
            const branding = layout.header.Branding;
            const icon = <div key="nav-trigger" className="nav-trigger" onClick={this.toggleNavigation}>
                <Icon.Expand />
            </div>
            
            if (!branding) {
                layout.header.Branding = icon;
            } else {
                layout.header.Branding = React.cloneElement(branding, {
                }, [
                        icon,
                        branding.props.children
                    ]
                );
            }
        }

        if (needDockTrigger) {
            const action = layout.header.Action;
            const icon = <div key="dock-trigger" className="dock-trigger" onClick={this.toggleToolDock}>
                <Icon.Add />
            </div>;

            if (!action) {
                layout.header.Action = icon;
            } else {
                layout.header.Action = React.cloneElement(action, {
                }, [
                        action.props.children,
                        icon,
                    ]
                );
            }
        }

        asideStyle.top = headerHeight;
        ancillaryStyle.top = headerHeight;
        contentStyle.paddingTop = headerHeight;

        const arr = [], innerArr = [];

        if (layout.LocalNavigation) {
            const mark = 'LocalNavigation';
            const style = {};
            const collapse = controll ? collapseMap[mark] : deviceMap[mark];

            if (collapse) {
                style.width = 0;
            }

            innerArr.push(
                <aside key="localnavigation" className={`${asideCls} ${prefix}aside-localnavigation`} style={style}>
                    {
                        React.cloneElement(layout.LocalNavigation, {
                            style: asideStyle,
                        }, [
                                layout.LocalNavigation.props.children,
                                <div className="local-nav-trigger aside-trigger" onClick={this.toggleLocalNavigation}>
                                    <Icon.ArrowRight />
                                </div>
                            ]
                        )
                    }
                </aside>
            );
        }

        innerArr.push(
            <section key="submain" className={submainCls}>
                {layout.content}
            </section>
        );

        if (layout.Ancillary) {
            const mark = 'Ancillary';
            const style = {};
            const collapse = controll ? collapseMap[mark] : deviceMap[mark];

            if (collapse) {
                style.width = 0;
            }

            innerArr.push(
                <aside key="ancillary" className={`${asideCls} ${prefix}aside-ancillary`} style={style}>
                    {
                        React.cloneElement(layout.Ancillary, {
                            style: ancillaryStyle
                        }, [
                                layout.Ancillary.props.children,
                                <div className="ancillary-trigger aside-trigger" onClick={this.toggleAncillary}>
                                    <Icon.ArrowRight />
                                </div>
                            ]
                        )
                    }
                </aside>
            )
        }


        layout.header && arr.push(
            <header key="header" className={headerCls}>
            {
                Object.keys(layout.header).map(key => layout.header[key])
            }
            </header>
        );

        layout.Navigation && arr.push(
            React.cloneElement(layout.Navigation, {
                className: `${layout.Navigation.className} ${asideCls}`,
                style: { ...layout.Navigation.style, ...asideStyle },
                key: "navigation"
            })
        );

        layout.ToolDock && arr.push(
            React.cloneElement(layout.ToolDock, {
                className: `${layout.ToolDock.className} ${asideCls}`,
                style: { ...layout.ToolDock.style, ...dockStyle },
                key: "tooldock"
            })
        );
        
        arr.unshift(
            <section key="main" className={mainCls} style={{ ...contentStyle }}>
                {innerArr}
            </section>
        );

        return arr;
    }

    render() {
        const {
            prefix,
            className,
            children,
            device,
            ...others
        } = this.props;

        const cls = classnames({
            [`${prefix}shell`]: true,
            [`${prefix}shell-${device}`]: true,
            [className]: !!className,
        });


        return <section className={cls}>
            {this.renderShell(this.props)}
        </section>
    }
}


export default polyfill(Shell);
