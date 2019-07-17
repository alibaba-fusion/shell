import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { isBoolean, getCollapseMap, getSiderSize } from './util';
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
                contentStyle: {},
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
    

            const { device, collapseMap, controll } = this.state;
            const siderSizes = getSiderSize(device, sizeMap);
    
            const layout = {};
            let hasHeader = false, hasToolDock = false, hasHeaderToolDock = false, needNavigationTrigger = false, needDockTrigger = false, hasAncillary = false;
    
            const asideStyle = {}, dockStyle = {}, ancillaryStyle = {}, contentStyle = {};
    
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
                            hasAncillary = true;
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
                        case 'Page':
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
    
                                needNavigationTrigger = true;
    
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
    
            const submainCls = classnames( {
                [`${prefix}shell-sub-main`]: true,
            });
    
            const asideCls = classnames({
                [`${prefix}shell-aside`]: true,
            });
    
            const localeNavCls = classnames(asideCls, {
                [`${prefix}aside-localnavigation`]: true,
            }, layout.LocalNavigation.props.className);
    
            const ancillaryCls = classnames(asideCls, {
                [`${prefix}aside-ancillary`]: true,
            }, layout.Ancillary.props.className);
    
            let headerHeight = 0;
            
            if (hasHeader) {
                headerHeight = siderSizes.Header || 0;
                dockStyle.top = headerHeight;
            }

            if (hasToolDock) {
                if (device === 'phone') {
                    needDockTrigger = true;                
                }
    
                if (!hasHeaderToolDock) {
                    headerHeight += siderSizes.ToolDockHeader || 0;
                }
            }
    
            asideStyle.top = headerHeight;
            ancillaryStyle.top = headerHeight;
            contentStyle.paddingTop = headerHeight;

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
    
            const arr = [], innerArr = [];
    
            // 按照dom结构，innerArr 包括 LocalNavigation content Ancillary
            if (layout.LocalNavigation) {
                const mark = 'LocalNavigation';
                const style = {};
                // const collapse = controll ? collapseMap[mark] : deviceMap[mark];
   
                // const collapse = layout.LocalNavigation.props.collapse;
                const collapse = collapseMap[mark];
                if (collapse) {
                    style.width = 0;
                }
    
                innerArr.push(
                    <aside key="localnavigation" className={localeNavCls} style={style}>
                        {
                            React.cloneElement(layout.LocalNavigation, {
                                style: asideStyle,
                            }, [
                                    layout.LocalNavigation.props.children,
                                    <div key="local-nav-trigger" className="local-nav-trigger aside-trigger" onClick={this.toggleLocalNavigation}>
                                        <Icon.ArrowRight />
                                    </div>
                                ]
                            )
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
                const mark = 'Ancillary';
                const style = {};
                // const collapse = controll ? collapseMap[mark] : deviceMap[mark];
    
                // const collapse = layout.Ancillary.props.collapse;
                const collapse = collapseMap[mark];

                if (collapse) {
                    style.width = 0;
                }
    
                innerArr.push(
                    <aside key="ancillary" className={ancillaryCls} style={style}>
                        {
                            React.cloneElement(layout.Ancillary, {
                                style: ancillaryStyle
                            }, [
                                    layout.Ancillary.props.children,
                                    <div key="ancillary-trigger" className="ancillary-trigger aside-trigger" onClick={this.toggleAncillary}>
                                        <Icon.ArrowRight />
                                    </div>
                                ]
                            )
                        }
                    </aside>
                )
            }
    
            layout.Navigation && arr.push(
                React.cloneElement(layout.Navigation, {
                    className: classnames(asideCls, layout.Navigation.props.className),
                    style: { ...layout.Navigation.style, ...asideStyle },
                    key: "navigation"
                })
            );
    
            layout.ToolDock && arr.push(
                React.cloneElement(layout.ToolDock, {
                    className: classnames(asideCls, layout.ToolDock.props.className),
                    style: { ...layout.ToolDock.style, ...dockStyle },
                    key: "tooldock"
                })
            );
    
            // 按照dom结构, arr 包括 header Navigation ToolDock 和 innerArr
            layout.header && arr.push(
                <header key="header" className={headerCls}>
                {
                    Object.keys(layout.header).map(key => 
                        {
                            return React.cloneElement(layout.header[key], {
                                key,
                            })
                        })
                }
                </header>
            );
            
            // arr.unshift(
            //     <section key="main" className={mainCls} style={{ ...contentStyle }}>
            //         {innerArr}
            //     </section>
            // );
    
            // return arr;
    
            let contentArea = innerArr.length > 0 
                ? <section key="main" className={mainCls}>{innerArr}</section>
                : layout.page;

            arr.unshift(contentArea);
    
            const cls = classnames({
                [`${prefix}shell`]: true,
                [`${prefix}shell-${device}`]: true,
                [className]: !!className,
            });

            if (componentName === 'Page') {
                return arr;
            }

            return <section className={cls} style={{ ...contentStyle }}>
                {arr}
            </section>
        }
    
        render() {
            return this.renderShell(this.props);
        }
    }

    return Shell;
}

