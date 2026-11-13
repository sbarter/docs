<script setup>
// Renders an OpenAPI file with Redoc (open source), loaded from a pinned CDN build.
import { onMounted, ref, watch } from 'vue';
import { useData, withBase } from 'vitepress';

const props = defineProps({ spec: { type: String, required: true } });
const el = ref(null);
const { isDark } = useData();
const REDOC = 'https://cdn.jsdelivr.net/npm/redoc@2.5.4/bundles/redoc.standalone.js';

function loadRedoc() {
  if (window.Redoc) return Promise.resolve(window.Redoc);
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = REDOC;
    s.onload = () => resolve(window.Redoc);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function theme(dark) {
  const primary = dark ? '#b8a1ff' : '#684bc8';
  return {
    colors: {
      primary: { main: primary },
      text: { primary: dark ? '#e0e1eb' : '#303344' },
      ...(dark ? { border: { dark: '#343445', light: '#343445' } } : {}),
    },
    typography: {
      fontFamily: 'var(--vp-font-family-base)',
      headings: { fontFamily: 'var(--vp-font-family-base)' },
      code: { fontFamily: 'var(--vp-font-family-mono)' },
      links: { color: primary },
    },
    sidebar: {
      backgroundColor: dark ? '#151823' : '#f7f7fb',
      textColor: dark ? '#e0e1eb' : '#303344',
      activeTextColor: primary,
    },
    rightPanel: { backgroundColor: dark ? '#0d0f16' : '#263238' },
    schema: { nestedBackground: dark ? '#1b1e2b' : '#fafafa' },
  };
}

async function render() {
  const Redoc = await loadRedoc();
  Redoc.init(
    withBase('/' + props.spec),
    {
      scrollYOffset: 64,
      hideDownloadButton: false,
      expandResponses: '200,201,202,204',
      jsonSampleExpandLevel: 3,
      theme: theme(isDark.value),
    },
    el.value,
    () => {
      // Links from the guides point at an operation (#tag/<Tag>/operation/<id>): jump there once rendered.
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id && document.getElementById(id);
      if (target) target.scrollIntoView();
    },
  );
}

onMounted(render);
watch(isDark, render);
</script>

<template>
  <div ref="el" class="sb-redoc" :class="{ 'sb-redoc--dark': isDark }" />
</template>
