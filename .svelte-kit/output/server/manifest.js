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
		client: {start:"_app/immutable/entry/start.BJM-R5xv.js",app:"_app/immutable/entry/app.BLTE2aNf.js",imports:["_app/immutable/entry/start.BJM-R5xv.js","_app/immutable/chunks/S9jX5LGj.js","_app/immutable/chunks/Byc5XkB0.js","_app/immutable/chunks/DFydr33-.js","_app/immutable/entry/app.BLTE2aNf.js","_app/immutable/chunks/Byc5XkB0.js","_app/immutable/chunks/OV1gu7XU.js","_app/immutable/chunks/DKnqSKc0.js","_app/immutable/chunks/DFydr33-.js","_app/immutable/chunks/eMivGRot.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
