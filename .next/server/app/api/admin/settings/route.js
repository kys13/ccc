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
exports.id = "app/api/admin/settings/route";
exports.ids = ["app/api/admin/settings/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_aaaaa_src_app_api_admin_settings_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/settings/route.ts */ \"(rsc)/./src/app/api/admin/settings/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/settings/route\",\n        pathname: \"/api/admin/settings\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/settings/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\aaaaa\\\\src\\\\app\\\\api\\\\admin\\\\settings\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_aaaaa_src_app_api_admin_settings_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/settings/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnNldHRpbmdzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnNldHRpbmdzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZzZXR0aW5ncyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2FhYWFhJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2FhYWFhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUN5QjtBQUN0RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGlmaWNhdGlvbi1zeXN0ZW0vPzAxZTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXGFhYWFhXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHNldHRpbmdzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9zZXR0aW5ncy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FkbWluL3NldHRpbmdzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hZG1pbi9zZXR0aW5ncy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxhYWFhYVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxzZXR0aW5nc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vc2V0dGluZ3Mvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/settings/route.ts":
/*!*********************************************!*\
  !*** ./src/app/api/admin/settings/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   PUT: () => (/* binding */ PUT)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n\n\n\n\n\n// 설정 스키마 정의\nconst SettingsSchema = zod__WEBPACK_IMPORTED_MODULE_4__.z.object({\n    site_name: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().min(1),\n    site_description: zod__WEBPACK_IMPORTED_MODULE_4__.z.string(),\n    contact_email: zod__WEBPACK_IMPORTED_MODULE_4__.z.string().email(),\n    notification_settings: zod__WEBPACK_IMPORTED_MODULE_4__.z.object({\n        email_notifications: zod__WEBPACK_IMPORTED_MODULE_4__.z.boolean(),\n        application_notifications: zod__WEBPACK_IMPORTED_MODULE_4__.z.boolean(),\n        campaign_notifications: zod__WEBPACK_IMPORTED_MODULE_4__.z.boolean()\n    }),\n    campaign_settings: zod__WEBPACK_IMPORTED_MODULE_4__.z.object({\n        auto_approve_campaigns: zod__WEBPACK_IMPORTED_MODULE_4__.z.boolean(),\n        default_campaign_status: zod__WEBPACK_IMPORTED_MODULE_4__.z.enum([\n            \"draft\",\n            \"active\"\n        ]),\n        minimum_reward_amount: zod__WEBPACK_IMPORTED_MODULE_4__.z.number().min(0),\n        maximum_reward_amount: zod__WEBPACK_IMPORTED_MODULE_4__.z.number().min(0)\n    }),\n    security_settings: zod__WEBPACK_IMPORTED_MODULE_4__.z.object({\n        require_email_verification: zod__WEBPACK_IMPORTED_MODULE_4__.z.boolean(),\n        allow_social_login: zod__WEBPACK_IMPORTED_MODULE_4__.z.boolean(),\n        session_timeout_minutes: zod__WEBPACK_IMPORTED_MODULE_4__.z.number().min(1)\n    })\n});\nasync function GET() {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"ADMIN\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"관리자 권한이 필요합니다.\"\n            }, {\n                status: 403\n            });\n        }\n        const settings = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.adminSettings.findFirst();\n        const responseData = settings || {\n            site_name: \"체험단 관리 시스템\",\n            site_description: \"체험단 신청 및 관리 시스템\",\n            contact_email: \"admin@example.com\",\n            notification_settings: {\n                email_notifications: true,\n                application_notifications: true,\n                campaign_notifications: true\n            },\n            campaign_settings: {\n                auto_approve_campaigns: false,\n                default_campaign_status: \"draft\",\n                minimum_reward_amount: 0,\n                maximum_reward_amount: 1000000\n            },\n            security_settings: {\n                require_email_verification: true,\n                allow_social_login: true,\n                session_timeout_minutes: 60\n            }\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            data: responseData\n        });\n    } catch (error) {\n        console.error(\"Failed to fetch admin settings:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"설정을 불러오는데 실패했습니다.\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function PUT(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session || session.user.role !== \"ADMIN\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"관리자 권한이 필요합니다.\"\n            }, {\n                status: 403\n            });\n        }\n        const body = await request.json();\n        // 데이터 유효성 검사\n        const validatedData = SettingsSchema.parse(body);\n        // 설정 업데이트\n        const settings = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.adminSettings.upsert({\n            where: {\n                id: 1\n            },\n            update: validatedData,\n            create: {\n                id: 1,\n                ...validatedData\n            }\n        });\n        // 설정 변경 히스토리 기록\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.settingsHistory.create({\n            data: {\n                changes: JSON.stringify(validatedData),\n                updatedBy: session.user.id,\n                updatedAt: new Date()\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(settings);\n    } catch (error) {\n        if (error instanceof zod__WEBPACK_IMPORTED_MODULE_4__.z.ZodError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"유효성 검사 오류\",\n                errors: error.errors\n            }, {\n                status: 400\n            });\n        }\n        console.error(\"Failed to update admin settings:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"설정 업데이트에 실패했습니다.\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9zZXR0aW5ncy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEyQztBQUNFO0FBQ0o7QUFDSDtBQUNkO0FBRXhCLFlBQVk7QUFDWixNQUFNSyxpQkFBaUJELGtDQUFDQSxDQUFDRSxNQUFNLENBQUM7SUFDNUJDLFdBQVdILGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdDLEdBQUcsQ0FBQztJQUMxQkMsa0JBQWtCTixrQ0FBQ0EsQ0FBQ0ksTUFBTTtJQUMxQkcsZUFBZVAsa0NBQUNBLENBQUNJLE1BQU0sR0FBR0ksS0FBSztJQUMvQkMsdUJBQXVCVCxrQ0FBQ0EsQ0FBQ0UsTUFBTSxDQUFDO1FBQzVCUSxxQkFBcUJWLGtDQUFDQSxDQUFDVyxPQUFPO1FBQzlCQywyQkFBMkJaLGtDQUFDQSxDQUFDVyxPQUFPO1FBQ3BDRSx3QkFBd0JiLGtDQUFDQSxDQUFDVyxPQUFPO0lBQ3JDO0lBQ0FHLG1CQUFtQmQsa0NBQUNBLENBQUNFLE1BQU0sQ0FBQztRQUN4QmEsd0JBQXdCZixrQ0FBQ0EsQ0FBQ1csT0FBTztRQUNqQ0sseUJBQXlCaEIsa0NBQUNBLENBQUNpQixJQUFJLENBQUM7WUFBQztZQUFTO1NBQVM7UUFDbkRDLHVCQUF1QmxCLGtDQUFDQSxDQUFDbUIsTUFBTSxHQUFHZCxHQUFHLENBQUM7UUFDdENlLHVCQUF1QnBCLGtDQUFDQSxDQUFDbUIsTUFBTSxHQUFHZCxHQUFHLENBQUM7SUFDMUM7SUFDQWdCLG1CQUFtQnJCLGtDQUFDQSxDQUFDRSxNQUFNLENBQUM7UUFDeEJvQiw0QkFBNEJ0QixrQ0FBQ0EsQ0FBQ1csT0FBTztRQUNyQ1ksb0JBQW9CdkIsa0NBQUNBLENBQUNXLE9BQU87UUFDN0JhLHlCQUF5QnhCLGtDQUFDQSxDQUFDbUIsTUFBTSxHQUFHZCxHQUFHLENBQUM7SUFDNUM7QUFDSjtBQUVPLGVBQWVvQjtJQUNsQixJQUFJO1FBQ0EsTUFBTUMsVUFBVSxNQUFNN0IsMkRBQWdCQSxDQUFDQyxrREFBV0E7UUFFbEQsSUFBSSxDQUFDNEIsV0FBV0EsUUFBUUMsSUFBSSxDQUFDQyxJQUFJLEtBQUssU0FBUztZQUMzQyxPQUFPaEMscURBQVlBLENBQUNpQyxJQUFJLENBQ3BCO2dCQUFFQyxTQUFTO1lBQWlCLEdBQzVCO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7UUFFQSxNQUFNQyxXQUFXLE1BQU1qQywrQ0FBTUEsQ0FBQ2tDLGFBQWEsQ0FBQ0MsU0FBUztRQUVyRCxNQUFNQyxlQUFlSCxZQUFZO1lBQzdCN0IsV0FBVztZQUNYRyxrQkFBa0I7WUFDbEJDLGVBQWU7WUFDZkUsdUJBQXVCO2dCQUNuQkMscUJBQXFCO2dCQUNyQkUsMkJBQTJCO2dCQUMzQkMsd0JBQXdCO1lBQzVCO1lBQ0FDLG1CQUFtQjtnQkFDZkMsd0JBQXdCO2dCQUN4QkMseUJBQXlCO2dCQUN6QkUsdUJBQXVCO2dCQUN2QkUsdUJBQXVCO1lBQzNCO1lBQ0FDLG1CQUFtQjtnQkFDZkMsNEJBQTRCO2dCQUM1QkMsb0JBQW9CO2dCQUNwQkMseUJBQXlCO1lBQzdCO1FBQ0o7UUFFQSxPQUFPNUIscURBQVlBLENBQUNpQyxJQUFJLENBQUM7WUFBRU8sTUFBTUQ7UUFBYTtJQUNsRCxFQUFFLE9BQU9FLE9BQU87UUFDWkMsUUFBUUQsS0FBSyxDQUFDLG1DQUFtQ0E7UUFDakQsT0FBT3pDLHFEQUFZQSxDQUFDaUMsSUFBSSxDQUNwQjtZQUFFQyxTQUFTO1FBQW9CLEdBQy9CO1lBQUVDLFFBQVE7UUFBSTtJQUV0QjtBQUNKO0FBRU8sZUFBZVEsSUFBSUMsT0FBZ0I7SUFDdEMsSUFBSTtRQUNBLE1BQU1kLFVBQVUsTUFBTTdCLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBRWxELElBQUksQ0FBQzRCLFdBQVdBLFFBQVFDLElBQUksQ0FBQ0MsSUFBSSxLQUFLLFNBQVM7WUFDM0MsT0FBT2hDLHFEQUFZQSxDQUFDaUMsSUFBSSxDQUNwQjtnQkFBRUMsU0FBUztZQUFpQixHQUM1QjtnQkFBRUMsUUFBUTtZQUFJO1FBRXRCO1FBRUEsTUFBTVUsT0FBTyxNQUFNRCxRQUFRWCxJQUFJO1FBRS9CLGFBQWE7UUFDYixNQUFNYSxnQkFBZ0J6QyxlQUFlMEMsS0FBSyxDQUFDRjtRQUUzQyxVQUFVO1FBQ1YsTUFBTVQsV0FBVyxNQUFNakMsK0NBQU1BLENBQUNrQyxhQUFhLENBQUNXLE1BQU0sQ0FBQztZQUMvQ0MsT0FBTztnQkFBRUMsSUFBSTtZQUFFO1lBQ2ZDLFFBQVFMO1lBQ1JNLFFBQVE7Z0JBQUVGLElBQUk7Z0JBQUcsR0FBR0osYUFBYTtZQUFDO1FBQ3RDO1FBRUEsZ0JBQWdCO1FBQ2hCLE1BQU0zQywrQ0FBTUEsQ0FBQ2tELGVBQWUsQ0FBQ0QsTUFBTSxDQUFDO1lBQ2hDWixNQUFNO2dCQUNGYyxTQUFTQyxLQUFLQyxTQUFTLENBQUNWO2dCQUN4QlcsV0FBVzNCLFFBQVFDLElBQUksQ0FBQ21CLEVBQUU7Z0JBQzFCUSxXQUFXLElBQUlDO1lBQ25CO1FBQ0o7UUFFQSxPQUFPM0QscURBQVlBLENBQUNpQyxJQUFJLENBQUNHO0lBQzdCLEVBQUUsT0FBT0ssT0FBTztRQUNaLElBQUlBLGlCQUFpQnJDLGtDQUFDQSxDQUFDd0QsUUFBUSxFQUFFO1lBQzdCLE9BQU81RCxxREFBWUEsQ0FBQ2lDLElBQUksQ0FDcEI7Z0JBQ0lDLFNBQVM7Z0JBQ1QyQixRQUFRcEIsTUFBTW9CLE1BQU07WUFDeEIsR0FDQTtnQkFBRTFCLFFBQVE7WUFBSTtRQUV0QjtRQUVBTyxRQUFRRCxLQUFLLENBQUMsb0NBQW9DQTtRQUNsRCxPQUFPekMscURBQVlBLENBQUNpQyxJQUFJLENBQ3BCO1lBQUVDLFNBQVM7UUFBbUIsR0FDOUI7WUFBRUMsUUFBUTtRQUFJO0lBRXRCO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RpZmljYXRpb24tc3lzdGVtLy4vc3JjL2FwcC9hcGkvYWRtaW4vc2V0dGluZ3Mvcm91dGUudHM/NjQ3YiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xyXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcclxuXHJcbi8vIOyEpOyglSDsiqTtgqTrp4gg7KCV7J2YXHJcbmNvbnN0IFNldHRpbmdzU2NoZW1hID0gei5vYmplY3Qoe1xyXG4gICAgc2l0ZV9uYW1lOiB6LnN0cmluZygpLm1pbigxKSxcclxuICAgIHNpdGVfZGVzY3JpcHRpb246IHouc3RyaW5nKCksXHJcbiAgICBjb250YWN0X2VtYWlsOiB6LnN0cmluZygpLmVtYWlsKCksXHJcbiAgICBub3RpZmljYXRpb25fc2V0dGluZ3M6IHoub2JqZWN0KHtcclxuICAgICAgICBlbWFpbF9ub3RpZmljYXRpb25zOiB6LmJvb2xlYW4oKSxcclxuICAgICAgICBhcHBsaWNhdGlvbl9ub3RpZmljYXRpb25zOiB6LmJvb2xlYW4oKSxcclxuICAgICAgICBjYW1wYWlnbl9ub3RpZmljYXRpb25zOiB6LmJvb2xlYW4oKSxcclxuICAgIH0pLFxyXG4gICAgY2FtcGFpZ25fc2V0dGluZ3M6IHoub2JqZWN0KHtcclxuICAgICAgICBhdXRvX2FwcHJvdmVfY2FtcGFpZ25zOiB6LmJvb2xlYW4oKSxcclxuICAgICAgICBkZWZhdWx0X2NhbXBhaWduX3N0YXR1czogei5lbnVtKFsnZHJhZnQnLCAnYWN0aXZlJ10pLFxyXG4gICAgICAgIG1pbmltdW1fcmV3YXJkX2Ftb3VudDogei5udW1iZXIoKS5taW4oMCksXHJcbiAgICAgICAgbWF4aW11bV9yZXdhcmRfYW1vdW50OiB6Lm51bWJlcigpLm1pbigwKSxcclxuICAgIH0pLFxyXG4gICAgc2VjdXJpdHlfc2V0dGluZ3M6IHoub2JqZWN0KHtcclxuICAgICAgICByZXF1aXJlX2VtYWlsX3ZlcmlmaWNhdGlvbjogei5ib29sZWFuKCksXHJcbiAgICAgICAgYWxsb3dfc29jaWFsX2xvZ2luOiB6LmJvb2xlYW4oKSxcclxuICAgICAgICBzZXNzaW9uX3RpbWVvdXRfbWludXRlczogei5udW1iZXIoKS5taW4oMSksXHJcbiAgICB9KSxcclxufSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gJ0FETUlOJykge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgICAgICB7IG1lc3NhZ2U6ICfqtIDrpqzsnpAg6raM7ZWc7J20IO2VhOyalO2VqeuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAzIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgcHJpc21hLmFkbWluU2V0dGluZ3MuZmluZEZpcnN0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gc2V0dGluZ3MgfHwge1xyXG4gICAgICAgICAgICBzaXRlX25hbWU6ICfssrTtl5jri6gg6rSA66asIOyLnOyKpO2FnCcsXHJcbiAgICAgICAgICAgIHNpdGVfZGVzY3JpcHRpb246ICfssrTtl5jri6gg7Iug7LKtIOuwjyDqtIDrpqwg7Iuc7Iqk7YWcJyxcclxuICAgICAgICAgICAgY29udGFjdF9lbWFpbDogJ2FkbWluQGV4YW1wbGUuY29tJyxcclxuICAgICAgICAgICAgbm90aWZpY2F0aW9uX3NldHRpbmdzOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbF9ub3RpZmljYXRpb25zOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb25fbm90aWZpY2F0aW9uczogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNhbXBhaWduX25vdGlmaWNhdGlvbnM6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FtcGFpZ25fc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIGF1dG9fYXBwcm92ZV9jYW1wYWlnbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdF9jYW1wYWlnbl9zdGF0dXM6ICdkcmFmdCcsXHJcbiAgICAgICAgICAgICAgICBtaW5pbXVtX3Jld2FyZF9hbW91bnQ6IDAsXHJcbiAgICAgICAgICAgICAgICBtYXhpbXVtX3Jld2FyZF9hbW91bnQ6IDEwMDAwMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VjdXJpdHlfc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVfZW1haWxfdmVyaWZpY2F0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgYWxsb3dfc29jaWFsX2xvZ2luOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbl90aW1lb3V0X21pbnV0ZXM6IDYwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBkYXRhOiByZXNwb25zZURhdGEgfSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBhZG1pbiBzZXR0aW5nczonLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgICAgICB7IG1lc3NhZ2U6ICfshKTsoJXsnYQg67aI65+s7Jik64qU642wIOyLpO2MqO2WiOyKteuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQVVQocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLnVzZXIucm9sZSAhPT0gJ0FETUlOJykge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgICAgICB7IG1lc3NhZ2U6ICfqtIDrpqzsnpAg6raM7ZWc7J20IO2VhOyalO2VqeuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAzIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyDrjbDsnbTthLAg7Jyg7Zqo7ISxIOqygOyCrFxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRlZERhdGEgPSBTZXR0aW5nc1NjaGVtYS5wYXJzZShib2R5KTtcclxuXHJcbiAgICAgICAgLy8g7ISk7KCVIOyXheuNsOydtO2KuFxyXG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgcHJpc21hLmFkbWluU2V0dGluZ3MudXBzZXJ0KHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgaWQ6IDEgfSxcclxuICAgICAgICAgICAgdXBkYXRlOiB2YWxpZGF0ZWREYXRhLFxyXG4gICAgICAgICAgICBjcmVhdGU6IHsgaWQ6IDEsIC4uLnZhbGlkYXRlZERhdGEgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g7ISk7KCVIOuzgOqyvSDtnojsiqTthqDrpqwg6riw66GdXHJcbiAgICAgICAgYXdhaXQgcHJpc21hLnNldHRpbmdzSGlzdG9yeS5jcmVhdGUoe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VzOiBKU09OLnN0cmluZ2lmeSh2YWxpZGF0ZWREYXRhKSxcclxuICAgICAgICAgICAgICAgIHVwZGF0ZWRCeTogc2Vzc2lvbi51c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oc2V0dGluZ3MpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiB6LlpvZEVycm9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ+ycoO2aqOyEsSDqsoDsgqwg7Jik66WYJyxcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IGVycm9yLmVycm9ycyBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byB1cGRhdGUgYWRtaW4gc2V0dGluZ3M6JywgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICAgICAgeyBtZXNzYWdlOiAn7ISk7KCVIOyXheuNsOydtO2KuOyXkCDsi6TtjKjtlojsirXri4jri6QuJyB9LFxyXG4gICAgICAgICAgICB7IHN0YXR1czogNTAwIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiYXV0aE9wdGlvbnMiLCJwcmlzbWEiLCJ6IiwiU2V0dGluZ3NTY2hlbWEiLCJvYmplY3QiLCJzaXRlX25hbWUiLCJzdHJpbmciLCJtaW4iLCJzaXRlX2Rlc2NyaXB0aW9uIiwiY29udGFjdF9lbWFpbCIsImVtYWlsIiwibm90aWZpY2F0aW9uX3NldHRpbmdzIiwiZW1haWxfbm90aWZpY2F0aW9ucyIsImJvb2xlYW4iLCJhcHBsaWNhdGlvbl9ub3RpZmljYXRpb25zIiwiY2FtcGFpZ25fbm90aWZpY2F0aW9ucyIsImNhbXBhaWduX3NldHRpbmdzIiwiYXV0b19hcHByb3ZlX2NhbXBhaWducyIsImRlZmF1bHRfY2FtcGFpZ25fc3RhdHVzIiwiZW51bSIsIm1pbmltdW1fcmV3YXJkX2Ftb3VudCIsIm51bWJlciIsIm1heGltdW1fcmV3YXJkX2Ftb3VudCIsInNlY3VyaXR5X3NldHRpbmdzIiwicmVxdWlyZV9lbWFpbF92ZXJpZmljYXRpb24iLCJhbGxvd19zb2NpYWxfbG9naW4iLCJzZXNzaW9uX3RpbWVvdXRfbWludXRlcyIsIkdFVCIsInNlc3Npb24iLCJ1c2VyIiwicm9sZSIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwic2V0dGluZ3MiLCJhZG1pblNldHRpbmdzIiwiZmluZEZpcnN0IiwicmVzcG9uc2VEYXRhIiwiZGF0YSIsImVycm9yIiwiY29uc29sZSIsIlBVVCIsInJlcXVlc3QiLCJib2R5IiwidmFsaWRhdGVkRGF0YSIsInBhcnNlIiwidXBzZXJ0Iiwid2hlcmUiLCJpZCIsInVwZGF0ZSIsImNyZWF0ZSIsInNldHRpbmdzSGlzdG9yeSIsImNoYW5nZXMiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlZEJ5IiwidXBkYXRlZEF0IiwiRGF0ZSIsIlpvZEVycm9yIiwiZXJyb3JzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/settings/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    return null;\n                }\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.password ?? \"\");\n                if (!isValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email ?? \"\",\n                    name: user.name ?? \"\",\n                    role: user.role,\n                    status: user.status\n                };\n            }\n        })\n    ],\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.status = user.status;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.status = token.status;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: \"jwt\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDMEQ7QUFDeEI7QUFDZ0M7QUFDcEM7QUFHdkIsTUFBTUksY0FBK0I7SUFDeENDLFNBQVNMLHdFQUFhQSxDQUFDQywyQ0FBTUE7SUFDN0JLLFdBQVc7UUFDUEosMkVBQW1CQSxDQUFDO1lBQ2hCSyxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1RDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ3BEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDdkIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQy9DLE9BQU87Z0JBQ1g7Z0JBRUEsTUFBTUUsT0FBTyxNQUFNYiwyQ0FBTUEsQ0FBQ2EsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3RDQyxPQUFPO3dCQUFFUCxPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUN0QztnQkFFQSxJQUFJLENBQUNLLE1BQU07b0JBQ1AsT0FBTztnQkFDWDtnQkFFQSxNQUFNRyxVQUFVLE1BQU1kLHdEQUFjLENBQUNLLFlBQVlJLFFBQVEsRUFBRUUsS0FBS0YsUUFBUSxJQUFJO2dCQUU1RSxJQUFJLENBQUNLLFNBQVM7b0JBQ1YsT0FBTztnQkFDWDtnQkFFQSxPQUFPO29CQUNIRSxJQUFJTCxLQUFLSyxFQUFFO29CQUNYVixPQUFPSyxLQUFLTCxLQUFLLElBQUk7b0JBQ3JCRixNQUFNTyxLQUFLUCxJQUFJLElBQUk7b0JBQ25CYSxNQUFNTixLQUFLTSxJQUFJO29CQUNmQyxRQUFRUCxLQUFLTyxNQUFNO2dCQUN2QjtZQUNKO1FBQ0o7S0FDSDtJQUNEQyxPQUFPO1FBQ0hDLFFBQVE7SUFDWjtJQUNBQyxXQUFXO1FBQ1AsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVaLElBQUksRUFBRTtZQUNyQixJQUFJQSxNQUFNO2dCQUNOWSxNQUFNUCxFQUFFLEdBQUdMLEtBQUtLLEVBQUU7Z0JBQ2xCTyxNQUFNTixJQUFJLEdBQUdOLEtBQUtNLElBQUk7Z0JBQ3RCTSxNQUFNTCxNQUFNLEdBQUdQLEtBQUtPLE1BQU07WUFDOUI7WUFDQSxPQUFPSztRQUNYO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRTtZQUM1QixJQUFJQyxRQUFRYixJQUFJLEVBQUU7Z0JBQ2RhLFFBQVFiLElBQUksQ0FBQ0ssRUFBRSxHQUFHTyxNQUFNUCxFQUFFO2dCQUMxQlEsUUFBUWIsSUFBSSxDQUFDTSxJQUFJLEdBQUdNLE1BQU1OLElBQUk7Z0JBQzlCTyxRQUFRYixJQUFJLENBQUNPLE1BQU0sR0FBR0ssTUFBTUwsTUFBTTtZQUN0QztZQUNBLE9BQU9NO1FBQ1g7SUFDSjtJQUNBQSxTQUFTO1FBQ0xDLFVBQVU7SUFDZDtBQUNKLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ub3RpZmljYXRpb24tc3lzdGVtLy4vc3JjL2xpYi9hdXRoLnRzPzY2OTIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJztcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICcuL3ByaXNtYSc7XHJcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJztcclxuaW1wb3J0IHsgUm9sZSwgU3RhdHVzIH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XHJcbiAgICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgICAgICAgbmFtZTogJ0NyZWRlbnRpYWxzJyxcclxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQgPz8gJycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwgPz8gJycsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lID8/ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHVzZXIuc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcGFnZXM6IHtcclxuICAgICAgICBzaWduSW46ICcvbG9naW4nLFxyXG4gICAgfSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5zdGF0dXMgPSB1c2VyLnN0YXR1cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgUm9sZTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlci5zdGF0dXMgPSB0b2tlbi5zdGF0dXMgYXMgU3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXNzaW9uOiB7XHJcbiAgICAgICAgc3RyYXRlZ3k6ICdqd3QnXHJcbiAgICB9XHJcbn07ICJdLCJuYW1lcyI6WyJQcmlzbWFBZGFwdGVyIiwicHJpc21hIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNWYWxpZCIsImNvbXBhcmUiLCJpZCIsInJvbGUiLCJzdGF0dXMiLCJwYWdlcyIsInNpZ25JbiIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsInN0cmF0ZWd5Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fsettings%2Froute&page=%2Fapi%2Fadmin%2Fsettings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fsettings%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();