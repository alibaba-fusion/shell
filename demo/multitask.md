---
title: Multi Task
order: 2
importStyle: true
---

本 Demo 演示一行文字的用法。

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Shell from '@alifd/shell';
import { Menu, Search, Icon, Nav, Breadcrumb, Card, Tab } from '@alifd/next';

import '@alifd/theme-shell/dist/next.css';

const { SubNav, Item, Group, Divider } = Nav;

const tab1 = <Shell>
    <Shell.LocalNavigation>
        <Nav embeddable>
            <Nav.SubNav label="Local Nav1">
                <Item>Local Nav1</Item>
            </Nav.SubNav>
            <Nav.SubNav label="Local Nav2">
                <Item>Local Nav2</Item>
            </Nav.SubNav>
            <Nav.SubNav label="Local Nav3">
                <Item>Local Nav3</Item>
            </Nav.SubNav>
              <Item>Local Nav4</Item>
              <Item>Local Nav5</Item>
              <Item>Local Nav6</Item>
              <Item>Local Nav7</Item>
              <Item>Local Nav8</Item>
              <Item>Local Nav4</Item>
              <Item>Local Nav5</Item>
              <Item>Local Nav6</Item>
              <Item>Local Nav7</Item>
              <Item>Local Nav8</Item>
            </Nav>
          </Shell.LocalNavigation>

          <Shell.Content>
            <div style={{minHeight: 1200, background: '#fff'}}></div>
          </Shell.Content>
          <Shell.Footer>
            <span>Alibaba Fusion</span>
            <span>@ 2019 Alibaba Piecework 版权所有</span>
          </Shell.Footer>
          
          <Shell.Ancillary>
            
          </Shell.Ancillary>
          <Shell.ToolDock>
            <Shell.ToolDockItem>
              <Icon type="ic_search" />
            </Shell.ToolDockItem>
            <Shell.ToolDockItem>
              <Icon type="calendar" />
            </Shell.ToolDockItem>
            <Shell.ToolDockItem>
              <Icon type="atm" />
            </Shell.ToolDockItem>
            <Shell.ToolDockItem>
              <Icon type="account" />              
            </Shell.ToolDockItem>
          </Shell.ToolDock>
</Shell>

const tab2 = <Shell>
          <Shell.Content>
            <div style={{minHeight: 1200, background: '#fff'}}></div>
          </Shell.Content>
          <Shell.Footer>
            <span>Alibaba Fusion</span>
            <span>@ 2019 Alibaba Piecework 版权所有</span>
          </Shell.Footer>
</Shell>

const tab3 = <Shell>

          <Shell.Footer>
            <span>Alibaba Fusion</span>
            <span>@ 2019 Alibaba Piecework 版权所有</span>
          </Shell.Footer>
</Shell>

class App extends Component {

  render() {
    return (
      <div className="root">
        <Shell className="iframe-hack">
          <Shell.Branding>
            <div className="rectangular"></div>
            <span style={{marginLeft: 10, color: '#FFF'}}>App Name</span>
          </Shell.Branding>
          <Shell.Navigation direction="hoz">
            <Search key="2" shape="simple" type="dark" palceholder="Search" style={{width: '200px'}}/>
          </Shell.Navigation>
          <Shell.Action>
            <Icon type="ic_tongzhi" />
            <img src="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png" className="avatar" alt="用户头像" />
            <span style={{marginLeft: 10, color: '#FFF'}}>MyName</span>
          </Shell.Action>

          <Shell.MultiTask>
            <Tab>
              <Tab.Item title="Home" key="1">{tab1}</Tab.Item>
              <Tab.Item title="Documentation" key="2">{tab2}</Tab.Item>
              <Tab.Item title="Help" key="3">{tab3}</Tab.Item>
            </Tab>
          </Shell.MultiTask>
        </Shell>
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
````
````css
.my-trigger-nav {
  min-height: 30px;
  color: #fff;
  background: #333;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
}
.rectangular {
  width: 32px;
  height: 32px;
  background: #555;
}

.iframe-hack {
  width: 100%;
  height: 300px;
}
.fusion-shell-action .next-icon {
  margin: 0 30px;
  color: #fff;
}
.container .fusion-shell ul {
  margin: 0;
}
.demo-list {
  display: none;
}

.next-menu-item.next-disabled .next-menu-item-text > a {
  background: initial;
}
.fusion-shell-header .fusion-shell-navigation {
  margin: 0;
}

.fusion-shell-main .fusion-shell-footer {
  background: transparent;
  text-align: left;
  line-height: 25px;
  font-family: AlibabaSans-Bold;
  font-size: 16px;
  color: #CCCCCC;
  min-height: 48px;

  padding-bottom: 20px;
}
.fusion-shell-aside .fusion-shell-localnavigation.fusion-shell-collapse .next-nav.next-ver .next-menu-item{
  padding: 0!important;
}
.fusion-shell-aside.fusion-shell-navigation.fusion-shell-collapse.fusion-shell-mini {
  width: 60px;
}
````
