# @alifd/shell

![](https://img.alicdn.com/tfs/TB1nNtcelCw3KVjSZFuXXcAOpXa-881-465.png)
````jsx
<Shell> 
  <Shell.Branding />
  <Shell.Navgation/>
  <Shell.Action />
  <Shell.LocaleNavgation />
  <Shell.Ancillary />
  <Shell.Toolbar />
    <Shell.ToolbarItem icon=""  label="" onXXX="" /> 
  <Shell.AppBar />
  <Shell.Content />
  <Shell.Footer /> 
</Shell>
````
其中 `<Shell.Content />` 采用Grid布局， 其他均为 Flex布局

## API
### Shell
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| device             | 预设屏幕宽度，会影响`Navgation` `LocaleNavgation` `Ancillary`等的展开收起状态<br><br>**可选值**:<br>'phone', 'tablet', 'desktop'     | Enum         |  desktop    |
| scrollHideHeader   | Header滚动时隐藏    | Boolean         | false     |
| fullScreenHeader   | Header是否一直撑满屏幕 (是否横跨Aside)    | Boolean         | false     |

### Shell.Navgation
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| miniable   | 是否收缩到只有icon的状态    | Boolean         | false     |
| collaspe   | 是否完全折叠    | Boolean         | false     |
| direction  | 方向<br><br>**可选值**:<br>'hoz', 'ver'    | Enum         |  hoz    |

### Shell.LocaleNavgation
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collaspe   | 是否完全折叠    | Boolean         | false     |

### Shell.Ancillary
| 参数                  | 说明          | 类型              | 默认值              |
| -------------------- | ------------ | ----------------- | ------------------ |
| collaspe   | 是否完全折叠    | Boolean         | false     |


## Config配置项(待视觉稿提供后调整)

- Shell
  - background
- Header (Fixed)
  - height
  - background
  - shadow
  - padding(l, r)
- Navgation (Fixed)
  - width(ver)
  - mini-width (ver)
  - background 
  - padding-top
  - padding-bottom
  - shadow
-  LocaleNavgation (Fixed)
  - width
  - background 
  - padding-top
  - padding-bottom
  - shadow
- Ancillary
  - width
  - background 
  - padding-top
  - padding-bottom
  - shadow
- Toolbar
  - width
  - background 
  - shadow
  - padding(l, r)
  - padding(t, b)
- AppBar
  - background
- Content
  - rows
  - background
  - padding
- Footer
  - background 
  - height
  - shadow
