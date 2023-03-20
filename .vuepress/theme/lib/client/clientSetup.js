import { computed, provide } from 'vue';
import { usePageFrontmatter } from '@vuepress/client';
import { resolveSidebarItems, sidebarItemsSymbol, resolveCatalog, catalogSymbol, } from './composables';
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/lib/client';
export function applyClientSetup() {
    // we need to access sidebar items in multiple components
    // so we make it global computed
    const themeLocal = useThemeLocaleData();
    const frontmatter = usePageFrontmatter();
    const sidebarItems = computed(() => resolveSidebarItems(frontmatter.value, themeLocal.value));
    provide(sidebarItemsSymbol, sidebarItems);
    const catalog = computed(() => resolveCatalog());
    provide(catalogSymbol, catalog);
}
