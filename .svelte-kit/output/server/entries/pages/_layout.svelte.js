import { w as attr, x as ensure_array_like, y as stringify, z as attr_style, F as attr_class, G as bind_props, J as head, K as slot } from "../../chunks/index.js";
import { a as ssr_context, e as escape_html } from "../../chunks/context.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Topbar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let timer;
    onDestroy(() => clearInterval(timer));
    let appleMenu = false;
    let helpMenu = false;
    let controlCenter = false;
    let menuItems = ["Finder", "File", "Edit", "View", "Go", "Window", "Help"];
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="fixed top-0 left-0 w-full h-8 bg-gray-900/50 backdrop-blur-lg text-white flex justify-between items-center px-4 z-50 font-sans text-sm"><div class="flex items-center gap-4 relative"><div class="relative"><button class="cursor-pointer rounded hover:bg-white/20 transition" aria-label="Apple menu"${attr("aria-expanded", appleMenu)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"></path></svg></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <!--[-->`);
    const each_array_1 = ensure_array_like(menuItems);
    for (let $$index_8 = 0, $$length = each_array_1.length; $$index_8 < $$length; $$index_8++) {
      let item = each_array_1[$$index_8];
      $$renderer2.push(`<div class="relative"><button class="cursor-pointer px-2 py-0.5 rounded hover:bg-white/20 transition"${attr("aria-label", `${stringify(item)} menu`)}${attr("aria-expanded", item === "Help" && helpMenu)}>${escape_html(item)}</button> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="flex items-center gap-4"><div class="relative"><button class="cursor-pointer rounded hover:bg-white/20 transition" aria-label="Control Center"${attr("aria-expanded", controlCenter)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7zm7 6a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m-7-14a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m2.45 0A3.5 3.5 0 0 1 8 3.5A3.5 3.5 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7"></path></svg></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="ml-auto flex items-center gap-2 text-sm text-white/90 select-none" aria-live="polite"><!---->`);
    {
      $$renderer2.push(`<div>${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }))}</div> <div>${escape_html((/* @__PURE__ */ new Date()).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }))}</div>`);
    }
    $$renderer2.push(`<!----></div></div></div>`);
  });
}
const favicon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='107'%20height='128'%20viewBox='0%200%20107%20128'%3e%3ctitle%3esvelte-logo%3c/title%3e%3cpath%20d='M94.157%2022.819c-10.4-14.885-30.94-19.297-45.792-9.835L22.282%2029.608A29.92%2029.92%200%200%200%208.764%2049.65a31.5%2031.5%200%200%200%203.108%2020.231%2030%2030%200%200%200-4.477%2011.183%2031.9%2031.9%200%200%200%205.448%2024.116c10.402%2014.887%2030.942%2019.297%2045.791%209.835l26.083-16.624A29.92%2029.92%200%200%200%2098.235%2078.35a31.53%2031.53%200%200%200-3.105-20.232%2030%2030%200%200%200%204.474-11.182%2031.88%2031.88%200%200%200-5.447-24.116'%20style='fill:%23ff3e00'/%3e%3cpath%20d='M45.817%20106.582a20.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.503%2018%2018%200%200%201%20.624-2.435l.49-1.498%201.337.981a33.6%2033.6%200%200%200%2010.203%205.098l.97.294-.09.968a5.85%205.85%200%200%200%201.052%203.878%206.24%206.24%200%200%200%206.695%202.485%205.8%205.8%200%200%200%201.603-.704L69.27%2076.28a5.43%205.43%200%200%200%202.45-3.631%205.8%205.8%200%200%200-.987-4.371%206.24%206.24%200%200%200-6.698-2.487%205.7%205.7%200%200%200-1.6.704l-9.953%206.345a19%2019%200%200%201-5.296%202.326%2020.72%2020.72%200%200%201-22.237-8.243%2019.17%2019.17%200%200%201-3.277-14.502%2017.99%2017.99%200%200%201%208.13-12.052l26.081-16.623a19%2019%200%200%201%205.3-2.329%2020.72%2020.72%200%200%201%2022.237%208.243%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-.624%202.435l-.49%201.498-1.337-.98a33.6%2033.6%200%200%200-10.203-5.1l-.97-.294.09-.968a5.86%205.86%200%200%200-1.052-3.878%206.24%206.24%200%200%200-6.696-2.485%205.8%205.8%200%200%200-1.602.704L37.73%2051.72a5.42%205.42%200%200%200-2.449%203.63%205.79%205.79%200%200%200%20.986%204.372%206.24%206.24%200%200%200%206.698%202.486%205.8%205.8%200%200%200%201.602-.704l9.952-6.342a19%2019%200%200%201%205.295-2.328%2020.72%2020.72%200%200%201%2022.237%208.242%2019.17%2019.17%200%200%201%203.277%2014.503%2018%2018%200%200%201-8.13%2012.053l-26.081%2016.622a19%2019%200%200%201-5.3%202.328'%20style='fill:%23fff'/%3e%3c/svg%3e";
const FinderIcon = "/_app/immutable/assets/Finder.CvewObbS.png";
const LaunchpadIcon = "/_app/immutable/assets/launchpad.rG8JnOQy.png";
const PhotosIcon = "/_app/immutable/assets/photos.me8ebiD4.png";
const CalculatorIcon = "/_app/immutable/assets/calculator.Co4ATHwj.png";
const CalendarIcon = "/_app/immutable/assets/calendar.DGUD81v9.png";
const WindcodeIcon = "/_app/immutable/assets/vscode.fEc3hqsc.png";
const AppstoreIcon = "/_app/immutable/assets/Appstore.DP_D3PTD.png";
const FoxIcon = "/_app/immutable/assets/fox.DBj8lfdH.png";
const WallpaperIcon = "/_app/immutable/assets/wallpaper.6NYI0oPX.png";
function Dock($$renderer) {
  let apps = [
    { name: "Finder", icon: FinderIcon },
    { name: "Launchpad", icon: LaunchpadIcon },
    { name: "Photos", icon: PhotosIcon },
    { name: "Calculator", icon: CalculatorIcon },
    { name: "Calendar", icon: CalendarIcon },
    { name: "Windcode", icon: WindcodeIcon },
    { name: "App Store", icon: AppstoreIcon },
    { name: "Portfolio", icon: FoxIcon },
    { name: "Wallpaper", icon: WallpaperIcon }
  ];
  let hoveredIndex = -1;
  function getScale(i) {
    const dist = Math.abs(i - hoveredIndex);
    if (dist === 0) return 1.6;
    if (dist === 1) return 1.3;
    if (dist === 2) return 1.1;
    return 1;
  }
  $$renderer.push(`<div class="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-5 px-8 py-4 rounded-[2rem] backdrop-blur-2xl bg-transparent shadow-2xl border border-white/20 transition-all duration-300 svelte-22fabv" style="min-width: 850px;" role="menubar"><!--[-->`);
  const each_array = ensure_array_like(apps);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let app = each_array[i];
    $$renderer.push(`<button type="button" class="relative transition-all duration-300 ease-out cursor-pointer flex items-end focus:outline-none" style="outline: none;" role="menuitem"${attr("aria-label", app.name)}>`);
    if (hoveredIndex === i) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="absolute left-1/2 -translate-x-1/2 -top-12 bg-gray-800 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-opacity duration-200 whitespace-nowrap z-10">${escape_html(app.name)}</div>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]--> <img${attr("src", app.icon)}${attr("alt", app.name)} draggable="false" class="w-14 h-14 rounded-xl transition-transform duration-200 svelte-22fabv"${attr_style(`transform: scale(${stringify(getScale(i))});`)}/></button> `);
    if (i === 1 || i === 6) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<div class="flex items-center self-center"><div class="w-px h-10 bg-black mx-2 self-center"></div></div>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]--></div> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
const wallpaper1 = "/_app/immutable/assets/wallpaper6.DOeJCnmx.png";
function Desktop($$renderer) {
  let selectedWallpaper = wallpaper1;
  $$renderer.push(`<div class="desktop svelte-s3ltbz"${attr_style(`background-image: url(${stringify(selectedWallpaper)});`)}>`);
  Dock($$renderer);
  $$renderer.push(`<!----> `);
  {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
const appleLogo = "/_app/immutable/assets/mac5._ARyhP3U.png";
function Loadingscreen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let onFinish = $$props["onFinish"];
    let progress = 0;
    let fadeOut = false;
    $$renderer2.push(`<div${attr_class("boot-screen svelte-1p7o1jf", void 0, { "fade-out": fadeOut })}><div class="content svelte-1p7o1jf"><img${attr("src", appleLogo)} alt="Apple Logo" class="logo svelte-1p7o1jf"/> <div class="progress-container svelte-1p7o1jf"><div class="progress-bar svelte-1p7o1jf"><div class="progress-fill svelte-1p7o1jf"${attr_style(`width: ${stringify(progress)}%`)}></div></div></div></div></div>`);
    bind_props($$props, { onFinish });
  });
}
function _layout($$renderer, $$props) {
  let booted = false;
  head($$renderer, ($$renderer2) => {
    $$renderer2.push(`<link rel="icon"${attr("href", favicon)}/>`);
  });
  $$renderer.push(`<main class="relative min-h-screen overflow-hidden bg-black">`);
  if (!booted) {
    $$renderer.push("<!--[-->");
    Loadingscreen($$renderer, { onFinish: () => booted = true });
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (booted) {
    $$renderer.push("<!--[-->");
    Topbar($$renderer);
    $$renderer.push(`<!----> `);
    Desktop($$renderer);
    $$renderer.push(`<!----> `);
    Dock($$renderer);
    $$renderer.push(`<!----> <!--[-->`);
    slot($$renderer, $$props, "default", {});
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></main>`);
}
export {
  _layout as default
};
