import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import reactRenderer from '@astrojs/react/server.js';

export async function getContainer() {
  const container = await AstroContainer.create();
  container.addServerRenderer({
    name: '@astrojs/react',
    serverEntrypoint: reactRenderer
  });
  return container;
}
