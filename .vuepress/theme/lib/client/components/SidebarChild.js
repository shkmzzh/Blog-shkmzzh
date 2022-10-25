import { h } from 'vue';
import { useRoute } from 'vue-router';
import Link from './Link.vue';
const normalizePath = (path) => decodeURI(path)
    .replace(/#.*$/, '')
    .replace(/(index)?\.(md|html)$/, '');
const isActiveLink = (route, link) => {
    if (link === undefined) {
        return false;
    }
    if (route.hash === link) {
        return true;
    }
    const currentPath = normalizePath(route.path);
    const targetPath = normalizePath(link);
    return currentPath === targetPath;
};
const isActiveItem = (route, item) => {
    if (isActiveLink(route, item.link)) {
        return true;
    }
    if (item.children) {
        return item.children.some((child) => isActiveItem(route, child));
    }
    return false;
};
const renderItem = (item, props) => {
    // if the item has link, render it as `<Link>`
    if (item.link) {
        return h(Link, {
            ...props,
            item,
        });
    }
    // if the item only has text, render it as `<p>`
    return h('p', props, item.text);
};
const renderChildren = (item, depth) => {
    var _a;
    if (!((_a = item.children) === null || _a === void 0 ? void 0 : _a.length)) {
        return null;
    }
    return h('ul', {
        class: {
            'sidebar-sub-headers': depth > 0,
        },
    }, item.children.map((child) => h('li', h(SidebarChild, {
        item: child,
        depth: depth + 1,
    }))));
};
export const SidebarChild = ({ item, depth = 0 }) => {
    const route = useRoute();
    const active = isActiveItem(route, item);
    if (item.isGroup) {
        return [
            h('section', {
                class: 'sidebar-group sidebar-item',
            }, [
                renderItem(item, {
                    class: {
                        'sidebar-heading': true,
                        active,
                    },
                }),
                renderChildren(item, depth),
            ]),
        ];
    }
    if (item.children) {
        return [
            h('section', {
                class: 'sidebar-item',
            }, [
                renderItem(item, {
                    class: {
                        'sidebar-heading': true,
                        active,
                    },
                }),
                renderChildren(item, depth),
            ]),
        ];
    }
    return [
        renderItem(item, {
            class: {
                'sidebar-item': true,
                'sidebar-link': true,
                active,
            },
        }),
    ];
};
SidebarChild.displayName = 'SidebarChild';
SidebarChild.props = {
    item: {
        type: Object,
        required: true,
    },
    depth: {
        type: Number,
        required: false,
        default: 0,
    },
};
