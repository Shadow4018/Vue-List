import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { name: 'app/files-to-lint', files: ['**/*.{ts,mts,tsx,vue}'] },
  { name: 'app/files-to-ignore', ignores: ['**/dist/**', '**/coverage/**'] },
  // "Strongly recommended" + "recommended" — рівні style guide Vue (https://ua.vuejs.org/style-guide/)
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    // Лабораторна вимагає компонент саме з назвою Users.vue (правило multi-word-component-names)
    name: 'app/lab-component-names',
    files: ['src/components/Users.vue', 'src/App.vue'],
    rules: { 'vue/multi-word-component-names': 'off' },
  },
)
