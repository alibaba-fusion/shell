const siderSizes = {
    // height
    Header: 52,
    ToolDockHeader: 52,
    // width
    Navigation: 168,
    NavigationCollapse: 52,
    LocalNavigation: 168,
    Ancillary: 168,
    ToolDock: 52,
};

/**
 * 判断是否为布尔类型
 * @param  {any} val 例：'str' / undefined / null / true / false / 0
 * @return {bool}     例： false / false / false / true / false / false
 */
export function isBoolean(val) {
    return typeof val === "boolean";
}

export function getCollapseMap(device) {
    // by default all of them are collapsed
    const origin = {
        Navigation: true,
        LocalNavigation: true,
        Ancillary: true,
        ToolDock: true,
    };

    let map = [];

    switch (device) {
        case 'phone':
            break;
        case 'pad':
        case 'tablet':
            map = ['ToolDock'];
            break;
        case 'desktop':
            map = ['Navigation', 'LocalNavigation', 'Ancillary', 'ToolDock'];
            break;
        default:
            break;
    }

    Object.keys(origin).forEach(key => {
        if (map.indexOf(key) > -1) {
            origin[key] = false;
        }
    })

    return origin;
}

export function getSiderSize(device, sizesMap) {
    const sMap = { ...siderSizes, ...sizesMap };
    const size = {
        Header: sMap.Header,
        Navigation: 0,
        NavigationCollapse: 0,
        LocalNavigation: 0,
        Ancillary: 0,
        ToolDock: 0,
        ToolDockHeader: 0,
    };

    let map = [];

    switch (device) {
        case 'phone':
            map = ['ToolDockHeader'];
            break;
        case 'pad':
        case 'tablet':
            map = ['Navigation', 'ToolDock', 'NavigationCollapse'];
            break;
        case 'desktop':
            map = ['Navigation', 'LocalNavigation', 'Ancillary', 'ToolDock', 'NavigationCollapse'];
            break;
        default:
            break;
    }

    Object.keys(size).forEach(key => {
        if (map.indexOf(key) > -1) {
            size[key] = sMap[key];
        }
    })

    return size;
}
