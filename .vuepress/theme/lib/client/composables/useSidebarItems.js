import { inject } from 'vue';
import { useRoute } from 'vue-router';
import { isArray, isPlainObject, isString, resolveLocalePath, } from '@vuepress/shared';
import { useNavLink } from './useNavLink';
export const sidebarItemsSymbol = Symbol('sidebarItems');
export const useSidebarItems = () => {
    const sidebarItems = inject(sidebarItemsSymbol);
    if (!sidebarItems) {
        throw new Error('useSidebarItems() is called without provider.');
    }
    return sidebarItems;
};
export const resolveSidebarItems = (frontmatter, themeLocal) => {
    var _a, _b;
    // get sidebar config from frontmatter > themeConfig
    const sidebarConfig = (_b = (_a = frontmatter.series) !== null && _a !== void 0 ? _a : themeLocal.series) !== null && _b !== void 0 ? _b : 'auto';
    // resolve sidebar items according to the config
    if (frontmatter.home || sidebarConfig === false) {
        return [];
    }
    if (isArray(sidebarConfig)) {
        return resolveArraySidebarItems(sidebarConfig);
    }
    if (isPlainObject(sidebarConfig)) {
        return resolveMultiSidebarItems(sidebarConfig);
    }
    return [];
};
/**
 * Resolve sidebar items if the config is an array
 */
export const resolveArraySidebarItems = (sidebarConfig) => {
    const handleChildItem = (item) => {
        let childItem;
        if (isString(item)) {
            childItem = useNavLink(item);
        }
        else {
            childItem = item;
        }
        if (childItem.isGroup && childItem.children) {
            return {
                ...childItem,
                children: childItem.children.map(handleChildItem),
            };
        }
        return childItem;
    };
    return sidebarConfig.map((item) => {
        if (isString(item)) {
            return useNavLink(item);
        }
        return {
            ...item,
            children: item.children.map(handleChildItem),
        };
    });
};
/**
 * Resolve sidebar items if the config is a key -> value (path-prefix -> array) object
 */
export const resolveMultiSidebarItems = (sidebarConfig) => {
    var _a;
    const route = useRoute();
    const sidebarPath = resolveLocalePath(sidebarConfig, route.path);
    const matchedSidebarConfig = (_a = sidebarConfig[sidebarPath]) !== null && _a !== void 0 ? _a : [];
    return resolveArraySidebarItems(matchedSidebarConfig);
};
