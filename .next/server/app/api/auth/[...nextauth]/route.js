"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_aaaaa_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./src/app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\aaaaa\\\\src\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_aaaaa_src_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2FhYWFhJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2FhYWFhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM2QjtBQUMxRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGlmaWNhdGlvbi1zeXN0ZW0vPzBkOGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXGFhYWFhXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERlc2t0b3BcXFxcYWFhYWFcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/auth/[...nextauth]/route.ts":
/*!*************************************************!*\
  !*** ./src/app/api/auth/[...nextauth]/route.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()({\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_3__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"[인증] 로그인 시도:\", credentials?.email);\n                if (!credentials?.email || !credentials?.password) {\n                    console.error(\"[인증] 이메일 또는 비밀번호 없음\");\n                    throw new Error(\"이메일과 비밀번호를 입력해주세요.\");\n                }\n                // 사용자 검색\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    console.error(\"[인증] 사용자를 찾을 수 없음:\", credentials.email);\n                    throw new Error(\"이메일 또는 비밀번호가 일치하지 않습니다.\");\n                }\n                // 비밀번호 확인\n                const passwordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"].compare(credentials.password, user.password);\n                if (!passwordValid) {\n                    console.error(\"[인증] 비밀번호 불일치:\", credentials.email);\n                    throw new Error(\"이메일 또는 비밀번호가 일치하지 않습니다.\");\n                }\n                // 관리자 권한 확인 (필요시 주석 해제)\n                /*\r\n                if (user.role !== 'ADMIN') {\r\n                    console.error('[인증] 관리자 권한 없음:', credentials.email);\r\n                    throw new Error('관리자 권한이 없습니다.');\r\n                }\r\n                */ console.log(\"[인증] 인증 성공:\", user.email, \"역할:\", user.role);\n                // 인증 성공: 사용자 정보 반환\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name || \"\",\n                    role: user.role,\n                    status: user.status\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\",\n        maxAge: 7 * 24 * 60 * 60\n    },\n    jwt: {\n        maxAge: 7 * 24 * 60 * 60\n    },\n    pages: {\n        signIn: \"/admin/login\",\n        error: \"/admin/login?error=true\"\n    },\n    debug: \"development\" === \"development\",\n    cookies: {\n        sessionToken: {\n            name: `next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            // 최초 로그인 시에만 user 객체 존재\n            if (user) {\n                token.id = user.id;\n                token.email = user.email;\n                token.role = user.role;\n                token.status = user.status;\n                // JWT 토큰 생성\n                const secret = process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || \"fallback-secret-key-change-in-production\";\n                token.token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_5___default().sign({\n                    id: user.id,\n                    email: user.email,\n                    role: user.role\n                }, secret, {\n                    expiresIn: \"7d\"\n                });\n                console.log(\"[JWT] 토큰 생성됨:\", user.email);\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            // 세션에 토큰 정보 추가\n            if (session?.user) {\n                session.user.id = token.id;\n                session.user.email = token.email;\n                session.user.role = token.role;\n                session.user.status = token.status;\n                session.user.token = token.token;\n                console.log(\"[세션] 세션 업데이트됨:\", token.email);\n            }\n            return session;\n        }\n    }\n});\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFxRDtBQUNLO0FBQ3BCO0FBQzRCO0FBQ3BDO0FBRUM7QUFzQy9CLE1BQU1NLFVBQVVOLGdEQUFRQSxDQUFDO0lBQ3JCTyxTQUFTTix3RUFBYUEsQ0FBQ0MsK0NBQU1BO0lBQzdCTSxXQUFXO1FBQ1BMLDJFQUFtQkEsQ0FBQztZQUNoQk0sTUFBTTtZQUNOQyxhQUFhO2dCQUNUQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNwRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3ZCTSxRQUFRQyxHQUFHLENBQUMsZ0JBQWdCUCxhQUFhQztnQkFFekMsSUFBSSxDQUFDRCxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQy9DRSxRQUFRRSxLQUFLLENBQUM7b0JBQ2QsTUFBTSxJQUFJQyxNQUFNO2dCQUNwQjtnQkFFQSxTQUFTO2dCQUNULE1BQU1DLE9BQU8sTUFBTWxCLCtDQUFNQSxDQUFDa0IsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3RDQyxPQUFPO3dCQUFFWCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUN0QztnQkFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0EsS0FBS04sUUFBUSxFQUFFO29CQUN6QkUsUUFBUUUsS0FBSyxDQUFDLHNCQUFzQlIsWUFBWUMsS0FBSztvQkFDckQsTUFBTSxJQUFJUSxNQUFNO2dCQUNwQjtnQkFFQSxVQUFVO2dCQUNWLE1BQU1JLGdCQUFnQixNQUFNbkIsd0RBQWMsQ0FBQ00sWUFBWUksUUFBUSxFQUFFTSxLQUFLTixRQUFRO2dCQUU5RSxJQUFJLENBQUNTLGVBQWU7b0JBQ2hCUCxRQUFRRSxLQUFLLENBQUMsa0JBQWtCUixZQUFZQyxLQUFLO29CQUNqRCxNQUFNLElBQUlRLE1BQU07Z0JBQ3BCO2dCQUVBLHdCQUF3QjtnQkFDeEI7Ozs7O2dCQUtBLEdBRUFILFFBQVFDLEdBQUcsQ0FBQyxlQUFlRyxLQUFLVCxLQUFLLEVBQUUsT0FBT1MsS0FBS0ssSUFBSTtnQkFFdkQsbUJBQW1CO2dCQUNuQixPQUFPO29CQUNIQyxJQUFJTixLQUFLTSxFQUFFO29CQUNYZixPQUFPUyxLQUFLVCxLQUFLO29CQUNqQkYsTUFBTVcsS0FBS1gsSUFBSSxJQUFJO29CQUNuQmdCLE1BQU1MLEtBQUtLLElBQUk7b0JBQ2ZFLFFBQVFQLEtBQUtPLE1BQU07Z0JBQ3ZCO1lBQ0o7UUFDSjtLQUNIO0lBQ0RDLFNBQVM7UUFDTEMsVUFBVTtRQUNWQyxRQUFRLElBQUksS0FBSyxLQUFLO0lBQzFCO0lBQ0F6QixLQUFLO1FBQ0R5QixRQUFRLElBQUksS0FBSyxLQUFLO0lBQzFCO0lBQ0FDLE9BQU87UUFDSEMsUUFBUTtRQUNSZCxPQUFPO0lBQ1g7SUFDQWUsT0FBT0Msa0JBQXlCO0lBQ2hDQyxTQUFTO1FBQ0xDLGNBQWM7WUFDVjNCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztZQUMvQjRCLFNBQVM7Z0JBQ0xDLFVBQVU7Z0JBQ1ZDLFVBQVU7Z0JBQ1ZDLE1BQU07Z0JBQ05DLFFBQVFQLGtCQUF5QjtZQUNyQztRQUNKO0lBQ0o7SUFDQVEsV0FBVztRQUNQLE1BQU1yQyxLQUFJLEVBQUVzQyxLQUFLLEVBQUV2QixJQUFJLEVBQUU7WUFDckIsd0JBQXdCO1lBQ3hCLElBQUlBLE1BQU07Z0JBQ051QixNQUFNakIsRUFBRSxHQUFHTixLQUFLTSxFQUFFO2dCQUNsQmlCLE1BQU1oQyxLQUFLLEdBQUdTLEtBQUtULEtBQUs7Z0JBQ3hCZ0MsTUFBTWxCLElBQUksR0FBR0wsS0FBS0ssSUFBSTtnQkFDdEJrQixNQUFNaEIsTUFBTSxHQUFHUCxLQUFLTyxNQUFNO2dCQUUxQixZQUFZO2dCQUNaLE1BQU1pQixTQUFTVixRQUFRVyxHQUFHLENBQUNDLGVBQWUsSUFBSVosUUFBUVcsR0FBRyxDQUFDRSxVQUFVLElBQUk7Z0JBQ3hFSixNQUFNQSxLQUFLLEdBQUd0Qyx3REFBUSxDQUNsQjtvQkFDSXFCLElBQUlOLEtBQUtNLEVBQUU7b0JBQ1hmLE9BQU9TLEtBQUtULEtBQUs7b0JBQ2pCYyxNQUFNTCxLQUFLSyxJQUFJO2dCQUNuQixHQUNBbUIsUUFDQTtvQkFBRUssV0FBVztnQkFBSztnQkFHdEJqQyxRQUFRQyxHQUFHLENBQUMsaUJBQWlCRyxLQUFLVCxLQUFLO1lBQzNDO1lBRUEsT0FBT2dDO1FBQ1g7UUFDQSxNQUFNZixTQUFRLEVBQUVBLE9BQU8sRUFBRWUsS0FBSyxFQUFFO1lBQzVCLGVBQWU7WUFDZixJQUFJZixTQUFTUixNQUFNO2dCQUNmUSxRQUFRUixJQUFJLENBQUNNLEVBQUUsR0FBR2lCLE1BQU1qQixFQUFFO2dCQUMxQkUsUUFBUVIsSUFBSSxDQUFDVCxLQUFLLEdBQUdnQyxNQUFNaEMsS0FBSztnQkFDaENpQixRQUFRUixJQUFJLENBQUNLLElBQUksR0FBR2tCLE1BQU1sQixJQUFJO2dCQUM5QkcsUUFBUVIsSUFBSSxDQUFDTyxNQUFNLEdBQUdnQixNQUFNaEIsTUFBTTtnQkFDbENDLFFBQVFSLElBQUksQ0FBQ3VCLEtBQUssR0FBR0EsTUFBTUEsS0FBSztnQkFFaEMzQixRQUFRQyxHQUFHLENBQUMsa0JBQWtCMEIsTUFBTWhDLEtBQUs7WUFDN0M7WUFFQSxPQUFPaUI7UUFDWDtJQUNKO0FBQ0o7QUFFMkMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RpZmljYXRpb24tc3lzdGVtLy4vc3JjL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzPzAwOTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoLCB7IERlZmF1bHRTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XHJcbmltcG9ydCB7IFJvbGUsIFN0YXR1cyB9IGZyb20gJ0BwcmlzbWEvY2xpZW50JztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ25leHQtYXV0aCcge1xyXG4gICAgaW50ZXJmYWNlIFNlc3Npb24ge1xyXG4gICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgaWQ6IG51bWJlcjtcclxuICAgICAgICAgICAgZW1haWw6IHN0cmluZztcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgICAgICByb2xlOiBSb2xlO1xyXG4gICAgICAgICAgICBzdGF0dXM6IFN0YXR1cztcclxuICAgICAgICAgICAgdG9rZW46IHN0cmluZztcclxuICAgICAgICB9ICYgRGVmYXVsdFNlc3Npb25bJ3VzZXInXVxyXG4gICAgfVxyXG5cclxuICAgIGludGVyZmFjZSBVc2VyIHtcclxuICAgICAgICBpZDogbnVtYmVyO1xyXG4gICAgICAgIHJvbGU6IFJvbGU7XHJcbiAgICAgICAgc3RhdHVzOiBTdGF0dXM7XHJcbiAgICAgICAgdG9rZW4/OiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJmYWNlIEpXVCB7XHJcbiAgICAgICAgaWQ6IG51bWJlcjtcclxuICAgICAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgICAgIHJvbGU6IFJvbGU7XHJcbiAgICAgICAgc3RhdHVzOiBTdGF0dXM7XHJcbiAgICAgICAgdG9rZW4/OiBzdHJpbmc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEV4dGVuZGVkVXNlciA9IHtcclxuICAgIGlkOiBudW1iZXI7XHJcbiAgICBlbWFpbDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcm9sZTogUm9sZTtcclxuICAgIHN0YXR1czogU3RhdHVzO1xyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKHtcclxuICAgIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIENyZWRlbnRpYWxzUHJvdmlkZXIoe1xyXG4gICAgICAgICAgICBuYW1lOiAnQ3JlZGVudGlhbHMnLFxyXG4gICAgICAgICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgICAgICAgICAgZW1haWw6IHsgbGFiZWw6IFwiRW1haWxcIiwgdHlwZTogXCJlbWFpbFwiIH0sXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdb7J247KadXSDroZzqt7jsnbgg7Iuc64+EOicsIGNyZWRlbnRpYWxzPy5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdb7J247KadXSDsnbTrqZTsnbwg65iQ64qUIOu5hOuwgOuyiO2YuCDsl4bsnYwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ydtOuplOydvOqzvCDruYTrsIDrsojtmLjrpbwg7J6F66Cl7ZW07KO87IS47JqULicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOyCrOyaqeyekCDqsoDsg4lcclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgICAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1vsnbjspp1dIOyCrOyaqeyekOulvCDssL7snYQg7IiYIOyXhuydjDonLCBjcmVkZW50aWFscy5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfsnbTrqZTsnbwg65iQ64qUIOu5hOuwgOuyiO2YuOqwgCDsnbzsuZjtlZjsp4Ag7JWK7Iq164uI64ukLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIOu5hOuwgOuyiO2YuCDtmZXsnbhcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmICghcGFzc3dvcmRWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1vsnbjspp1dIOu5hOuwgOuyiO2YuCDrtojsnbzsuZg6JywgY3JlZGVudGlhbHMuZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign7J2066mU7J28IOuYkOuKlCDruYTrsIDrsojtmLjqsIAg7J287LmY7ZWY7KeAIOyViuyKteuLiOuLpC4nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyDqtIDrpqzsnpAg6raM7ZWcIO2ZleyduCAo7ZWE7JqU7IucIOyjvOyEnSDtlbTsoJwpXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXIucm9sZSAhPT0gJ0FETUlOJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1vsnbjspp1dIOq0gOumrOyekCDqtoztlZwg7JeG7J2MOicsIGNyZWRlbnRpYWxzLmVtYWlsKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+q0gOumrOyekCDqtoztlZzsnbQg7JeG7Iq164uI64ukLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW+yduOymnV0g7J247KadIOyEseqztTonLCB1c2VyLmVtYWlsLCAn7Jet7ZWgOicsIHVzZXIucm9sZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIOyduOymnSDshLHqs7U6IOyCrOyaqeyekCDsoJXrs7Qg67CY7ZmYXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSB8fCAnJyxcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB1c2VyLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIHNlc3Npb246IHtcclxuICAgICAgICBzdHJhdGVneTogJ2p3dCcsXHJcbiAgICAgICAgbWF4QWdlOiA3ICogMjQgKiA2MCAqIDYwLCAvLyA37J28KOy0iCDri6jsnIQpXHJcbiAgICB9LFxyXG4gICAgand0OiB7XHJcbiAgICAgICAgbWF4QWdlOiA3ICogMjQgKiA2MCAqIDYwLCAvLyA37J28KOy0iCDri6jsnIQpXHJcbiAgICB9LFxyXG4gICAgcGFnZXM6IHtcclxuICAgICAgICBzaWduSW46ICcvYWRtaW4vbG9naW4nLFxyXG4gICAgICAgIGVycm9yOiAnL2FkbWluL2xvZ2luP2Vycm9yPXRydWUnLFxyXG4gICAgfSxcclxuICAgIGRlYnVnOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyxcclxuICAgIGNvb2tpZXM6IHtcclxuICAgICAgICBzZXNzaW9uVG9rZW46IHtcclxuICAgICAgICAgICAgbmFtZTogYG5leHQtYXV0aC5zZXNzaW9uLXRva2VuYCxcclxuICAgICAgICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgICAgICAgICAgaHR0cE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzYW1lU2l0ZTogJ2xheCcsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiAnLycsXHJcbiAgICAgICAgICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY2FsbGJhY2tzOiB7XHJcbiAgICAgICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICAgICAgICAvLyDstZzstIgg66Gc6re47J24IOyLnOyXkOunjCB1c2VyIOqwneyytCDsobTsnqxcclxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIHRva2VuLmVtYWlsID0gdXNlci5lbWFpbDtcclxuICAgICAgICAgICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5zdGF0dXMgPSB1c2VyLnN0YXR1cztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gSldUIO2GoO2BsCDsg53shLFcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlY3JldCA9IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCB8fCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdmYWxsYmFjay1zZWNyZXQta2V5LWNoYW5nZS1pbi1wcm9kdWN0aW9uJztcclxuICAgICAgICAgICAgICAgIHRva2VuLnRva2VuID0gand0LnNpZ24oXHJcbiAgICAgICAgICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUgXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZWNyZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBleHBpcmVzSW46ICc3ZCcgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tKV1RdIO2GoO2BsCDsg53shLHrkKg6JywgdXNlci5lbWFpbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgICAgICAgIC8vIOyEuOyFmOyXkCDthqDtgbAg7KCV67O0IOy2lOqwgFxyXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbj8udXNlcikge1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyLmVtYWlsID0gdG9rZW4uZW1haWwgYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyLnJvbGUgPSB0b2tlbi5yb2xlIGFzIFJvbGU7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIuc3RhdHVzID0gdG9rZW4uc3RhdHVzIGFzIFN0YXR1cztcclxuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlci50b2tlbiA9IHRva2VuLnRva2VuIGFzIHN0cmluZztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1vshLjshZhdIOyEuOyFmCDsl4XrjbDsnbTtirjrkKg6JywgdG9rZW4uZW1haWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9OyAiXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsImp3dCIsImhhbmRsZXIiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIkVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsInBhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwicm9sZSIsImlkIiwic3RhdHVzIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwibWF4QWdlIiwicGFnZXMiLCJzaWduSW4iLCJkZWJ1ZyIsInByb2Nlc3MiLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwiY2FsbGJhY2tzIiwidG9rZW4iLCJzZWNyZXQiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiLCJKV1RfU0VDUkVUIiwic2lnbiIsImV4cGlyZXNJbiIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) {\n    globalForPrisma.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUFTRixnQkFBZ0JFLE1BQU0sSUFBSSxJQUFJSCx3REFBWUEsR0FBRztBQUVuRSxJQUFJSSxJQUF5QixFQUFjO0lBQ3pDSCxnQkFBZ0JFLE1BQU0sR0FBR0E7QUFDM0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RpZmljYXRpb24tc3lzdGVtLy4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcblxyXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xyXG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hO1xyXG59ICJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/semver","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/oidc-token-hash","vendor-chunks/lodash.isplainobject","vendor-chunks/@panva","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();