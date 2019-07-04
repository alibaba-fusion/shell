import Shell from './shell';
import Base from './base';

['Branding', 'Navigation', 'Action', 'LocalNavigation', 'AppBar', 'Content', 'Footer', 'Ancillary', 'ToolDock', 'ToolDockItem'].forEach(key => {
  Shell[key] = Base({
    componentName: key
  });
});

Shell.Page = Shell;
// Shell.ToolDockItem = Base;

export default Shell;
