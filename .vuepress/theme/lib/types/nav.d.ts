/**
 * Base nav item, displayed as text
 */
export interface NavItem {
    text: string;
    ariaLabel?: string;
}
/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T> extends NavItem {
    children: T[];
}
/**
 * Props for `<NavLink>`
 */
export interface NavLink extends NavItem {
    link: string;
    icon?: string;
    rel?: string;
    target?: string;
}
/**
 * Navbar types
 */
export declare type NavbarItem = NavLink;
export declare type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>;
export declare type NavbarConfig = (NavbarItem | NavbarGroup | string)[];
export declare type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>;
/**
 * Sidebar types
 */
export interface SidebarItem extends NavLink, NavGroup<NavLink | SidebarItem | string> {
    isGroup?: false;
}
export interface SidebarGroup extends NavGroup<SidebarGroup | NavLink | SidebarItem | string> {
    isGroup: true;
}
export declare type SidebarConfigArray = (SidebarGroup | SidebarItem | string)[];
export declare type SidebarConfigObject = Record<string, SidebarConfigArray>;
export declare type SidebarConfig = SidebarConfigArray | SidebarConfigObject;
export interface ResolvedSidebarItem extends Partial<NavLink> {
    level?: number;
    isGroup?: boolean;
    children?: ResolvedSidebarItem[];
}
