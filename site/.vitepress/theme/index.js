import DefaultTheme from 'vitepress/theme';
import RedocView from './RedocView.vue';
import '../../../@theme/styles.css';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('RedocView', RedocView);
  },
};
