"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoTheme = void 0;
const plugin_active_header_links_1 = require("@vuepress/plugin-active-header-links");
const plugin_back_to_top_1 = require("@vuepress/plugin-back-to-top");
const vuepress_plugin_bulletin_popover_1 = require("@vuepress-reco/vuepress-plugin-bulletin-popover");
const vuepress_plugin_code_copy_1 = require("@vuepress-reco/vuepress-plugin-code-copy");
const vuepress_plugin_comments_1 = require("@vuepress-reco/vuepress-plugin-comments");
const plugin_container_1 = require("@vuepress/plugin-container");
const plugin_external_link_icon_1 = require("@vuepress/plugin-external-link-icon");
const plugin_git_1 = require("@vuepress/plugin-git");
const plugin_nprogress_1 = require("@vuepress/plugin-nprogress");
const vuepress_plugin_page_1 = require("@vuepress-reco/vuepress-plugin-page");
const plugin_palette_1 = require("@vuepress/plugin-palette");
const utils_1 = require("@vuepress/utils");
const plugin_prismjs_1 = require("@vuepress/plugin-prismjs");
const plugin_register_components_1 = require("@vuepress/plugin-register-components");
const plugin_search_1 = require("@vuepress/plugin-search");
const tailwindcss_config_1 = require("@vuepress-reco/tailwindcss-config");
const plugin_theme_data_1 = require("@vuepress/plugin-theme-data");
const bundler_vite_1 = require("@vuepress/bundler-vite");
const vuepress_plugin_vue_preview_1 = require("@vuepress-reco/vuepress-plugin-vue-preview");
const bundler_webpack_1 = require("@vuepress/bundler-webpack");
const resolveContainer_1 = require("./resolveContainer");
const pages_1 = require("./pages");
const recoTheme = (themeConfig) => {
    return {
        name: 'vuepress-theme-reco',
        onInitialized(app) {
            // todo @vuepress/bundler-webpack 适配问题
            // app.options.bundler.name = '@vuepress/bundler-webpack'
            // todo 兼容用户的自定义 bundler
            // @ts-ignore
            if (app.options.bundler.name === '@vuepress/bundler-vite') {
                // @ts-ignore
                app.options.bundler = bundler_vite_1.viteBundler({
                    viteOptions: {
                        css: {
                            postcss: {
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss/nesting'),
                                    require('tailwindcss')(tailwindcss_config_1.tailwindcssConfig),
                                    require('autoprefixer')({}),
                                    require('postcss-each')
                                ]
                            }
                        },
                        optimizeDeps: {
                            exclude: ['vue']
                        }
                    },
                });
            }
            else {
                // @ts-ignore
                app.options.bundler = bundler_webpack_1.webpackBundler({
                    postcss: {
                        postcssOptions: {
                            plugins: [
                                ['tailwindcss', tailwindcss_config_1.tailwindcssConfig],
                                ['autoprefixer', {}],
                                [require('tailwindcss/nesting')],
                                ['postcss-each']
                            ]
                        },
                    },
                });
            }
        },
        templateBuild: utils_1.path.resolve(__dirname, '../../templates/index.build.html'),
        templateDev: utils_1.path.resolve(__dirname, '../../templates/index.dev.html'),
        layouts: utils_1.path.resolve(__dirname, '../client/layouts'),
        clientConfigFile: utils_1.path.resolve(__dirname, '../client/config.js'),
        alias: Object.fromEntries(utils_1.fs
            .readdirSync(utils_1.path.resolve(__dirname, '../client/components'))
            .filter((file) => file.endsWith('.vue'))
            .map((file) => [
            `@theme/${file}`,
            utils_1.path.resolve(__dirname, '../client/components', file),
        ])),
        extendsPage: (page) => {
            // save relative file path into page data to generate edit link
            page.data.filePathRelative = page.filePathRelative;
            // save title into route meta to generate navbar and sidebar
            page.routeMeta.title = page.title;
        },
        plugins: [
            vuepress_plugin_bulletin_popover_1.bulletinPopoverPlugin(),
            vuepress_plugin_comments_1.commentsPlugin(),
            vuepress_plugin_page_1.pagePlugin(pages_1.pages || []),
            plugin_git_1.gitPlugin(),
            plugin_theme_data_1.themeDataPlugin({ themeData: themeConfig }),
            plugin_search_1.searchPlugin({
                hotKeys: [{ key: 's', ctrl: true }]
            }),
            plugin_palette_1.palettePlugin(),
            plugin_nprogress_1.nprogressPlugin(),
            plugin_prismjs_1.prismjsPlugin(),
            plugin_active_header_links_1.activeHeaderLinksPlugin({
                headerLinkSelector: 'a.page-catalog-item',
            }),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('tip')),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('info')),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('warning')),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('danger')),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('details')),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('code-group')),
            plugin_container_1.containerPlugin(resolveContainer_1.resolveContainerOptions('code-group-item')),
            plugin_external_link_icon_1.externalLinkIconPlugin(),
            vuepress_plugin_vue_preview_1.vuePreviewPlugin(),
            plugin_register_components_1.registerComponentsPlugin({
                componentsDir: utils_1.path.resolve(process.cwd(), themeConfig.vuePreviewsDir || './.vuepress/vue-previews'),
            }),
            plugin_register_components_1.registerComponentsPlugin({
                componentsDir: utils_1.path.resolve(process.cwd(), themeConfig.componentsDir || './.vuepress/components'),
            }),
            plugin_back_to_top_1.backToTopPlugin(),
            vuepress_plugin_code_copy_1.codeCopyPlugin()
        ],
    };
};
exports.recoTheme = recoTheme;
