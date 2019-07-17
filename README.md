# @alifd/shell

![](https://img.alicdn.com/tfs/TB1nNtcelCw3KVjSZFuXXcAOpXa-881-465.png)
````jsx
<Shell>
    <Shell.Branding /> Box(row)
    <Shell.Navigation/>
    <Shell.Action /> Box(row)
    <Shell.LocaleNavigation /> Box(column)

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
| device             | 预设屏幕宽度，会影响`Navigation` `LocaleNavigation` `Ancillary`等是否占据空间<br><br>**可选值**:<br>'phone', 'tablet', 'desktop'     | Enum         |  desktop    |
| scrollHideHeader   | Header滚动时隐藏    | Boolean         | false     |

### Shell.Navigation
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠(折叠成只有icon状态)   | Boolean         | false     |
| direction  | 方向<br><br>**可选值**:<br>'hoz', 'ver'    | Enum         |  hoz    |
| triggerProps | trigger参数        | Object           | {} |

### Shell.LocaleNavigation
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠（完全收起）    | Boolean         | false     |
| triggerProps | trigger参数        | Object           | {} |

### Shell.ToolDock
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠（完全收起）   | Boolean         | false     |
| triggerProps | trigger参数        | Object           | {} |

### Shell.Ancillary
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collapse   | 是否折叠（完全收起）   | Boolean         | false     |
| triggerProps | trigger参数        | Object           | {} |

## Config配置项(待视觉稿提供后调整)

- Header (Fixed)
  - height
  - background
  - shadow
  - padding(l, r)
  - divider (bottom-border-color, bottom-border-size)
  - navigation-margin
  - navigation-alignment
- Navigation (Fixed)
  - width(ver)
  - mini-width (ver)
  - divider (right-border-color, right-border-size) (ver)
  - background 
  - padding(t, b) 
  - shadow
-  LocaleNavigation (Fixed)
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
