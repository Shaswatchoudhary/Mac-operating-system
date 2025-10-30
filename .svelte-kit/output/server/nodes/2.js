

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.1IvTnZdp.js","_app/immutable/chunks/DKnqSKc0.js","_app/immutable/chunks/Byc5XkB0.js","_app/immutable/chunks/BIKHJGjw.js"];
export const stylesheets = [];
export const fonts = [];
