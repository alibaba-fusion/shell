# @alifd/shell

![](https://img.alicdn.com/tfs/TB1nNtcelCw3KVjSZFuXXcAOpXa-881-465.png)
````jsx
<Shell>
    <Shell.Branding /> Box(row)
    <Shell.Navigation/>
    <Shell.Action /> Box(row)

    <Shell.MultiTask /> Box(row)
    <Shell.LocalNavigation /> Box(column)

    <Shell.AppBar /> Box(column)
    <Shell.Content /> Grid
    <Shell.Footer /> Box(column)

    <Shell.Ancillary /> Box(column)
    <Shell.ToolDock /> Box(column)
        <Shell.ToolDockItem />
</Shell>
````

其中 `<Shell.Content />` 采用Grid布局， 其他均为 Flex布局

## API
### Shell
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| device             | 预设屏幕宽度，会影响`Navigation` `LocalNavigation` `Ancillary`等是否占据空间<br><br>**可选值**:<br>'phone', 'tablet', 'desktop'     | Enum         |  desktop    |

### Shell.Navigation
向子组件透传 isCollapse 的Context，表示当前是否处于折叠状态

| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠(折叠成只有icon状态)   | Boolean         | false     |
| direction  | 方向<br><br>**可选值**:<br>'hoz', 'ver'    | Enum         |  hoz    |
| onCollapseChange | 组件显示或折叠时触发的回调函数        | Function           | () =>{} |


### Shell.LocalNavigation
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠（完全收起）    | Boolean         | false     |
| onCollapseChange | 组件显示或折叠时触发的回调函数        | Function           | () =>{} |

### Shell.ToolDock
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠（完全收起）   | Boolean         | false     |
| onCollapseChange | 组件显示或折叠时触发的回调函数        | Function           | () =>{} |

### Shell.Ancillary
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠（完全收起）   | Boolean         | false     |
| onCollapseChange | 组件显示或折叠时触发的回调函数        | Function           | () =>{} |

## Config配置项(待视觉稿提供后调整)

- Header (Fixed)
  - height
  - background
  - shadow
  - padding(l, r)
  - divider (bottom-border-color, bottom-border-size)
  - navigation-margin
  - navigation-alignment
- MultiTask (Fixed)
  - height
  - background
  - shadow
  - padding(l, r)
  - divider (bottom-border-color, bottom-border-size)
- Navigation (Fixed)
  - width(ver)
  - mini-width (ver)
  - divider (right-border-color, right-border-size) (ver)
  - background 
  - padding(t, b) 
  - shadow
-  LocalNavigation (Fixed)
  - width
  - background 
  - padding(t, b) 
  - divider (right-border-color, right-border-size)
  - shadow
- Ancillary
  - width
  - background 
  - divider (left-border-color, left-border-size)
  - padding(t, b) 
  - shadow
- ToolDock
  - width
  - background 
  - shadow
  - divider (left-border-color, left-border-size)
  - padding(t, b)
- AppBar
  - min-height
  - background 
  - divider (bottom-border-color, bottom-border-size)
  - shadow
  - padding(l, r) 
- Content
  - max-width
  - columns
  - background
  - padding
  - gutter-row
  - gutter-column
- Footer
  - background 
  - min-height
