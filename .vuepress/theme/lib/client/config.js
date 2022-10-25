import { defineClientConfig } from '@vuepress/client';
import { applyClientSetup } from './clientSetup';
import { applyClientEnhance } from './clientEnhance';
export default defineClientConfig({
    enhance(...args) {
        applyClientEnhance(...args);
    },
    setup() {
        applyClientSetup();
    },
});
