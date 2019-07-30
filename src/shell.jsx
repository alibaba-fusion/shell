import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isBoolean, getCollapseMap } from './util';
import Icon from './svg';

export default function ShellBase(props) {
    const { componentName } = props;
    class Shell extends Component {
        state = {};
        static displayName = componentName;
    
        static _typeMark = componentName;
    
        static propTypes = {
            prefix: PropTypes.string,
            device: PropTypes.oneOf(['phone', 'pad', 'desktop']),
            scrollHideHeader: PropTypes.bool,
        }
    
        static defaultProps = {
            prefix: 'fusion-',
            device: 'desktop',
            scrollHideHeader: true,
        };
    
        constructor(props) {
            super(props);
    
            const deviceMap = getCollapseMap(props.device);

            this.state = {
                controll: false,
                collapseMap: deviceMap,
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
            const { collapse } = child.props;
            const deviceMap = getCollapseMap(device);
            const props = {}

            // 非受控模式
            if (isBoolean(collapse) === false) {
                props.collapse = controll ? collapseMap[mark] : deviceMap[mark];
            }

            if (device !== 'phone' && mark === 'Navigation') {
                props.miniable = true;
            }
    
            return React.cloneElement(child, props);
        }
    
        toggleAside = (mark, e) => {
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

            const { children } = this.props;
            let com;
            if (mark === 'Navigation') {
                com = children.filter(child => child.type._typeMark.replace('Shell_', '') === mark && child.props.direction !== 'hoz').pop();
            } else {
                com = children.filter(child => child.type._typeMark.replace('Shell_', '') === mark).pop();
            }

            const { triggerProps = {} } = com.props;

            if (typeof triggerProps.onClick === 'function') {
                triggerProps.onClick(e, this.state.collapseMap[mark]);
            }
        }
    
        toggleNavigation = (e) => {
            this.toggleAside('Navigation', e);
        }
    
        toggleLocalNavigation = (e) => {
            this.toggleAside('LocalNavigation', e);
        }
    
        toggleAncillary = (e) => {
            this.toggleAside('Ancillary', e);
        }
    
        toggleToolDock = (e) => {
            this.toggleAside('ToolDock', e);
        }

        renderShell = (props) => {
            const {
                prefix,
                sizeMap,
                children,
                className,
            } = props;
    

            const { device } = this.state;
    
            const layout = {};
            let hasToolDock = false, needNavigationTrigger = false, needDockTrigger = false;

            React.Children.map(children, child => {
                if (
                    child &&
                    typeof child.type === 'function'
                ) {
                    const mark = child.type._typeMark.replace('Shell_', '');
                    switch (mark) {
                        case 'Branding':
                        case 'Action':
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
                            }
    
                            const childT = this.setChildCollapse(child, mark);
                            layout[mark] = childT;
    
                            break;
                        case 'AppBar':
                        case 'Content':
                        case 'Footer':
                            layout.content || (layout.content = []);
                            layout.content.push(child);
                            break;
                        case 'Page':
                            layout.page || (layout.page = []);
                            layout.page = child;
                            break;
                        case 'Navigation':
                            if (!layout.header) {
                                layout.header = {}
                            }
    
                            if (child.props.direction === 'hoz') {
                                layout.header[mark] = child;
                            } else {
                                if (!layout[mark]) {
                                    layout[mark] = []
                                }
    
                                needNavigationTrigger = true;
    
                                const childN = this.setChildCollapse(child, mark);
                                layout[mark] = childN;

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
    
            const submainCls = classnames( {
                [`${prefix}shell-sub-main`]: true,
            });
    
            const asideCls = classnames({
                [`${prefix}shell-aside`]: true,
            });
    
            if (hasToolDock) {
                if (device === 'phone') {
                    needDockTrigger = true;                
                }
            }

            // 如果存在垂直模式的 Navigation, 则需要在 Branding 上出现 trigger
            if (needNavigationTrigger) {
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
    
            // 如果存在 toolDock, 则需要在 Action 上出现 trigger
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
    
            let headerDom = [], contentArr = [], innerArr = [];
    
            // 按照dom结构，innerArr 包括 LocalNavigation content Ancillary
            if (layout.LocalNavigation) {
                const localeNavCls = classnames(asideCls, {
                    [`${prefix}aside-localnavigation`]: true,
                });
    
                innerArr.push(
                    <aside key="localnavigation" className={localeNavCls}>
                        {
                            React.cloneElement(layout.LocalNavigation, {}, [
                                <div key="wrapper" className={`${prefix}shell-content-wrapper`}>
                                    {layout.LocalNavigation.props.children}
                                </div>,
                                <div key="local-nav-trigger" className="local-nav-trigger aside-trigger" onClick={this.toggleLocalNavigation}>
                                    <Icon.ArrowRight />
                                </div>
                            ])
                        }
                    </aside>
                );
            }
    
            if (layout.content) {
                innerArr.push(
                    <section key="submain" className={submainCls}>
                        {layout.content}
                    </section>
                );
            }
    
            if (layout.Ancillary) {
                const ancillaryCls = classnames(asideCls, {
                    [`${prefix}aside-ancillary`]: true,
                });
    
                innerArr.push(
                    <aside key="ancillary" className={ancillaryCls}>
                        {
                            React.cloneElement(layout.Ancillary, {}, [
                                <div key="wrapper" className={`${prefix}shell-content-wrapper`}>
                                    {layout.Ancillary.props.children}
                                </div>,
                                <div key="ancillary-trigger" className="ancillary-trigger aside-trigger" onClick={this.toggleAncillary}>
                                    <Icon.ArrowRight />
                                </div>
                            ])
                        }

                    </aside>
                )
            }
    
            // 按照dom结构, arr 包括 header Navigation ToolDock 和 innerArr
            if (layout.header) {
                headerDom = <header key="header" className={headerCls}>
                {
                    Object.keys(layout.header).map(key => 
                        {
                            return React.cloneElement(layout.header[key], {
                                key,
                            })
                        })
                }
                </header>;
            }

            layout.Navigation && contentArr.push(
                React.cloneElement(layout.Navigation, {
                    className: classnames(asideCls, layout.Navigation.props.className),
                    key: "navigation"
                })
            );
    
            let contentArea = innerArr.length > 0 
                ? <section key="main" className={mainCls}>{innerArr}</section>
                : layout.page;

            contentArr.push(contentArea);

            layout.ToolDock && contentArr.push(
                React.cloneElement(layout.ToolDock, {
                    className: classnames(asideCls, layout.ToolDock.props.className),
                    key: "tooldock"
                })
            );

    
            const cls = classnames({
                [`${prefix}shell`]: true,
                [`${prefix}shell-${device}`]: true,
                [className]: !!className,
            });

            if (componentName === 'Page') {
                return contentArr;
            }

            return <section className={cls} >
                {headerDom}
                <section className={mainCls}>
                    {contentArr}
                </section>
            </section>
        }
    
        render() {
            return this.renderShell(this.props);
        }
    }

    return Shell;
}

