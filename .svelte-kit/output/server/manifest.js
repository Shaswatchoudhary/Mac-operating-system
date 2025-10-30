export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Df7Kzhmg.js",app:"_app/immutable/entry/app.BncuPpJ4.js",imports:["_app/immutable/entry/start.Df7Kzhmg.js","_app/immutable/chunks/Bn49OF4S.js","_app/immutable/chunks/6uOvuWSK.js","_app/immutable/chunks/BL0NDTmR.js","_app/immutable/entry/app.BncuPpJ4.js","_app/immutable/chunks/6uOvuWSK.js","_app/immutable/chunks/Bmdpy7vn.js","_app/immutable/chunks/C_2QBIIs.js","_app/immutable/chunks/BL0NDTmR.js","_app/immutable/chunks/CkB3ymRG.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
