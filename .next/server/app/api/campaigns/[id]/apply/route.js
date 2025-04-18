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
exports.id = "app/api/campaigns/[id]/apply/route";
exports.ids = ["app/api/campaigns/[id]/apply/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&page=%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&page=%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_user_Desktop_aaaaa_src_app_api_campaigns_id_apply_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/campaigns/[id]/apply/route.ts */ \"(rsc)/./src/app/api/campaigns/[id]/apply/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/campaigns/[id]/apply/route\",\n        pathname: \"/api/campaigns/[id]/apply\",\n        filename: \"route\",\n        bundlePath: \"app/api/campaigns/[id]/apply/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\user\\\\Desktop\\\\aaaaa\\\\src\\\\app\\\\api\\\\campaigns\\\\[id]\\\\apply\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_user_Desktop_aaaaa_src_app_api_campaigns_id_apply_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/campaigns/[id]/apply/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjYW1wYWlnbnMlMkYlNUJpZCU1RCUyRmFwcGx5JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjYW1wYWlnbnMlMkYlNUJpZCU1RCUyRmFwcGx5JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2FtcGFpZ25zJTJGJTVCaWQlNUQlMkZhcHBseSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2FhYWFhJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUN1c2VyJTVDRGVza3RvcCU1Q2FhYWFhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNnQztBQUM3RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGlmaWNhdGlvbi1zeXN0ZW0vPzhhN2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcdXNlclxcXFxEZXNrdG9wXFxcXGFhYWFhXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGNhbXBhaWduc1xcXFxbaWRdXFxcXGFwcGx5XFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jYW1wYWlnbnMvW2lkXS9hcHBseS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NhbXBhaWducy9baWRdL2FwcGx5XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jYW1wYWlnbnMvW2lkXS9hcHBseS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRGVza3RvcFxcXFxhYWFhYVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxjYW1wYWlnbnNcXFxcW2lkXVxcXFxhcHBseVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY2FtcGFpZ25zL1tpZF0vYXBwbHkvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&page=%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/campaigns/[id]/apply/route.ts":
/*!***************************************************!*\
  !*** ./src/app/api/campaigns/[id]/apply/route.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\n\n\nasync function POST(request, { params }) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_2__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        if (!session?.user?.email) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"로그인이 필요합니다.\"\n            }, {\n                status: 401\n            });\n        }\n        const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n            where: {\n                email: session.user.email\n            }\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"사용자를 찾을 수 없습니다.\"\n            }, {\n                status: 404\n            });\n        }\n        const campaign = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.campaign.findUnique({\n            where: {\n                id: parseInt(params.id)\n            },\n            include: {\n                _count: {\n                    select: {\n                        applications: true\n                    }\n                }\n            }\n        });\n        if (!campaign) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"캠페인을 찾을 수 없습니다.\"\n            }, {\n                status: 404\n            });\n        }\n        // 이미 신청한 경우 체크\n        const existingApplication = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.campaignApplication.findFirst({\n            where: {\n                campaignId: parseInt(params.id),\n                userId: user.id\n            }\n        });\n        if (existingApplication) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"이미 신청한 캠페인입니다.\"\n            }, {\n                status: 400\n            });\n        }\n        // 모집 인원 초과 체크\n        if (campaign._count.applications >= campaign.maxParticipants) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"모집이 마감되었습니다.\"\n            }, {\n                status: 400\n            });\n        }\n        // 캠페인 신청 생성\n        const application = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.campaignApplication.create({\n            data: {\n                campaignId: parseInt(params.id),\n                userId: user.id,\n                status: \"PENDING\"\n            },\n            include: {\n                user: {\n                    select: {\n                        name: true,\n                        email: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(application);\n    } catch (error) {\n        console.error(\"Campaign application error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"캠페인 신청에 실패했습니다.\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9jYW1wYWlnbnMvW2lkXS9hcHBseS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0Q7QUFDbEI7QUFDTztBQUNKO0FBRWxDLGVBQWVJLEtBQ2xCQyxPQUFvQixFQUNwQixFQUFFQyxNQUFNLEVBQThCO0lBRXRDLElBQUk7UUFDQSxNQUFNQyxVQUFVLE1BQU1MLDJEQUFnQkEsQ0FBQ0Msa0RBQVdBO1FBQ2xELElBQUksQ0FBQ0ksU0FBU0MsTUFBTUMsT0FBTztZQUN2QixPQUFPVCxxREFBWUEsQ0FBQ1UsSUFBSSxDQUNwQjtnQkFBRUMsT0FBTztZQUFjLEdBQ3ZCO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7UUFFQSxNQUFNSixPQUFPLE1BQU1QLCtDQUFNQSxDQUFDTyxJQUFJLENBQUNLLFVBQVUsQ0FBQztZQUN0Q0MsT0FBTztnQkFBRUwsT0FBT0YsUUFBUUMsSUFBSSxDQUFDQyxLQUFLO1lBQUM7UUFDdkM7UUFFQSxJQUFJLENBQUNELE1BQU07WUFDUCxPQUFPUixxREFBWUEsQ0FBQ1UsSUFBSSxDQUNwQjtnQkFBRUMsT0FBTztZQUFrQixHQUMzQjtnQkFBRUMsUUFBUTtZQUFJO1FBRXRCO1FBRUEsTUFBTUcsV0FBVyxNQUFNZCwrQ0FBTUEsQ0FBQ2MsUUFBUSxDQUFDRixVQUFVLENBQUM7WUFDOUNDLE9BQU87Z0JBQUVFLElBQUlDLFNBQVNYLE9BQU9VLEVBQUU7WUFBRTtZQUNqQ0UsU0FBUztnQkFDTEMsUUFBUTtvQkFDSkMsUUFBUTt3QkFBRUMsY0FBYztvQkFBSztnQkFDakM7WUFDSjtRQUNKO1FBRUEsSUFBSSxDQUFDTixVQUFVO1lBQ1gsT0FBT2YscURBQVlBLENBQUNVLElBQUksQ0FDcEI7Z0JBQUVDLE9BQU87WUFBa0IsR0FDM0I7Z0JBQUVDLFFBQVE7WUFBSTtRQUV0QjtRQUVBLGVBQWU7UUFDZixNQUFNVSxzQkFBc0IsTUFBTXJCLCtDQUFNQSxDQUFDc0IsbUJBQW1CLENBQUNDLFNBQVMsQ0FBQztZQUNuRVYsT0FBTztnQkFDSFcsWUFBWVIsU0FBU1gsT0FBT1UsRUFBRTtnQkFDOUJVLFFBQVFsQixLQUFLUSxFQUFFO1lBQ25CO1FBQ0o7UUFFQSxJQUFJTSxxQkFBcUI7WUFDckIsT0FBT3RCLHFEQUFZQSxDQUFDVSxJQUFJLENBQ3BCO2dCQUFFQyxPQUFPO1lBQWlCLEdBQzFCO2dCQUFFQyxRQUFRO1lBQUk7UUFFdEI7UUFFQSxjQUFjO1FBQ2QsSUFBSUcsU0FBU0ksTUFBTSxDQUFDRSxZQUFZLElBQUlOLFNBQVNZLGVBQWUsRUFBRTtZQUMxRCxPQUFPM0IscURBQVlBLENBQUNVLElBQUksQ0FDcEI7Z0JBQUVDLE9BQU87WUFBZSxHQUN4QjtnQkFBRUMsUUFBUTtZQUFJO1FBRXRCO1FBRUEsWUFBWTtRQUNaLE1BQU1nQixjQUFjLE1BQU0zQiwrQ0FBTUEsQ0FBQ3NCLG1CQUFtQixDQUFDTSxNQUFNLENBQUM7WUFDeERDLE1BQU07Z0JBQ0ZMLFlBQVlSLFNBQVNYLE9BQU9VLEVBQUU7Z0JBQzlCVSxRQUFRbEIsS0FBS1EsRUFBRTtnQkFDZkosUUFBUTtZQUNaO1lBQ0FNLFNBQVM7Z0JBQ0xWLE1BQU07b0JBQ0ZZLFFBQVE7d0JBQ0pXLE1BQU07d0JBQ050QixPQUFPO29CQUNYO2dCQUNKO1lBQ0o7UUFDSjtRQUVBLE9BQU9ULHFEQUFZQSxDQUFDVSxJQUFJLENBQUNrQjtJQUM3QixFQUFFLE9BQU9qQixPQUFPO1FBQ1pxQixRQUFRckIsS0FBSyxDQUFDLCtCQUErQkE7UUFDN0MsT0FBT1gscURBQVlBLENBQUNVLElBQUksQ0FDcEI7WUFBRUMsT0FBTztRQUFrQixHQUMzQjtZQUFFQyxRQUFRO1FBQUk7SUFFdEI7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGlmaWNhdGlvbi1zeXN0ZW0vLi9zcmMvYXBwL2FwaS9jYW1wYWlnbnMvW2lkXS9hcHBseS9yb3V0ZS50cz8yNGVjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSc7XHJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QoXHJcbiAgICByZXF1ZXN0OiBOZXh0UmVxdWVzdCxcclxuICAgIHsgcGFyYW1zIH06IHsgcGFyYW1zOiB7IGlkOiBzdHJpbmcgfSB9XHJcbikge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKCFzZXNzaW9uPy51c2VyPy5lbWFpbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgICAgICB7IGVycm9yOiAn66Gc6re47J247J20IO2VhOyalO2VqeuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgICAgICAgICAgeyBlcnJvcjogJ+yCrOyaqeyekOulvCDssL7snYQg7IiYIOyXhuyKteuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDA0IH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNhbXBhaWduID0gYXdhaXQgcHJpc21hLmNhbXBhaWduLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgICB3aGVyZTogeyBpZDogcGFyc2VJbnQocGFyYW1zLmlkKSB9LFxyXG4gICAgICAgICAgICBpbmNsdWRlOiB7XHJcbiAgICAgICAgICAgICAgICBfY291bnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHsgYXBwbGljYXRpb25zOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoIWNhbXBhaWduKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICAgICAgICAgIHsgZXJyb3I6ICfsuqDtjpjsnbjsnYQg7LC+7J2EIOyImCDsl4bsirXri4jri6QuJyB9LFxyXG4gICAgICAgICAgICAgICAgeyBzdGF0dXM6IDQwNCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDsnbTrr7gg7Iug7LKt7ZWcIOqyveyasCDssrTtgaxcclxuICAgICAgICBjb25zdCBleGlzdGluZ0FwcGxpY2F0aW9uID0gYXdhaXQgcHJpc21hLmNhbXBhaWduQXBwbGljYXRpb24uZmluZEZpcnN0KHtcclxuICAgICAgICAgICAgd2hlcmU6IHtcclxuICAgICAgICAgICAgICAgIGNhbXBhaWduSWQ6IHBhcnNlSW50KHBhcmFtcy5pZCksXHJcbiAgICAgICAgICAgICAgICB1c2VySWQ6IHVzZXIuaWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChleGlzdGluZ0FwcGxpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICAgICAgICAgIHsgZXJyb3I6ICfsnbTrr7gg7Iug7LKt7ZWcIOy6oO2OmOyduOyeheuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOuqqOynkSDsnbjsm5Ag7LSI6rO8IOyytO2BrFxyXG4gICAgICAgIGlmIChjYW1wYWlnbi5fY291bnQuYXBwbGljYXRpb25zID49IGNhbXBhaWduLm1heFBhcnRpY2lwYW50cykge1xyXG4gICAgICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgICAgICB7IGVycm9yOiAn66qo7KeR7J20IOuniOqwkOuQmOyXiOyKteuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAwIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOy6oO2OmOyduCDsi6Dssq0g7IOd7ISxXHJcbiAgICAgICAgY29uc3QgYXBwbGljYXRpb24gPSBhd2FpdCBwcmlzbWEuY2FtcGFpZ25BcHBsaWNhdGlvbi5jcmVhdGUoe1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBjYW1wYWlnbklkOiBwYXJzZUludChwYXJhbXMuaWQpLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAnUEVORElORycsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluY2x1ZGU6IHtcclxuICAgICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihhcHBsaWNhdGlvbik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NhbXBhaWduIGFwcGxpY2F0aW9uIGVycm9yOicsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXHJcbiAgICAgICAgICAgIHsgZXJyb3I6ICfsuqDtjpjsnbgg7Iug7LKt7JeQIOyLpO2MqO2WiOyKteuLiOuLpC4nIH0sXHJcbiAgICAgICAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsImdldFNlcnZlclNlc3Npb24iLCJhdXRoT3B0aW9ucyIsIlBPU1QiLCJyZXF1ZXN0IiwicGFyYW1zIiwic2Vzc2lvbiIsInVzZXIiLCJlbWFpbCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNhbXBhaWduIiwiaWQiLCJwYXJzZUludCIsImluY2x1ZGUiLCJfY291bnQiLCJzZWxlY3QiLCJhcHBsaWNhdGlvbnMiLCJleGlzdGluZ0FwcGxpY2F0aW9uIiwiY2FtcGFpZ25BcHBsaWNhdGlvbiIsImZpbmRGaXJzdCIsImNhbXBhaWduSWQiLCJ1c2VySWQiLCJtYXhQYXJ0aWNpcGFudHMiLCJhcHBsaWNhdGlvbiIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwiY29uc29sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/campaigns/[id]/apply/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_0__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_1__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                console.log(\"[Authorize] Attempting authorization for:\", credentials?.email);\n                if (!credentials?.email || !credentials?.password) {\n                    console.error(\"[Authorize] Missing email or password.\");\n                    throw new Error(\"이메일과 비밀번호를 입력해주세요.\");\n                }\n                console.log(\"[Authorize] Finding user...\");\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_1__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                console.log(\"[Authorize] User found:\", user ? user.email : \"Not Found\");\n                if (!user || !user.password) {\n                    console.error(\"[Authorize] User not found or password not set.\");\n                    throw new Error(\"이메일 또는 비밀번호가 일치하지 않습니다.\");\n                }\n                console.log(\"[Authorize] Comparing password...\");\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].compare(credentials.password, user.password);\n                console.log(\"[Authorize] Password valid:\", isValid);\n                if (!isValid) {\n                    console.error(\"[Authorize] Invalid password.\");\n                    throw new Error(\"이메일 또는 비밀번호가 일치하지 않습니다.\");\n                }\n                console.log(\"[Authorize] Authorization successful for:\", user.email);\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name || \"\",\n                    role: user.role,\n                    status: user.status\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/admin/login\"\n    },\n    cookies: {\n        sessionToken: {\n            name: `__Secure-next-auth.session-token`,\n            options: {\n                httpOnly: true,\n                sameSite: \"lax\",\n                path: \"/\",\n                secure: \"development\" === \"production\"\n            }\n        }\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n                token.status = user.status;\n                // JWT 토큰 생성\n                token.token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_4___default().sign({\n                    id: user.id,\n                    email: user.email,\n                    role: user.role\n                }, process.env.JWT_SECRET || \"your-stronger-fallback-secret-that-is-consistent-across-restarts\", {\n                    expiresIn: \"7d\"\n                });\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n                session.user.status = token.status;\n                session.user.token = token.token;\n            }\n            return session;\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksQ0FBQ0ssRUFBRSxHQUFHZ0IsTUFBTWhCLEVBQUU7Z0JBQzFCRyxRQUFRUixJQUFJLENBQUNNLElBQUksR0FBR2UsTUFBTWYsSUFBSTtnQkFDOUJFLFFBQVFSLElBQUksQ0FBQ08sTUFBTSxHQUFHYyxNQUFNZCxNQUFNO2dCQUNsQ0MsUUFBUVIsSUFBSSxDQUFDcUIsS0FBSyxHQUFHQSxNQUFNQSxLQUFLO1lBQ3BDO1lBQ0EsT0FBT2I7UUFDWDtJQUNKO0FBQ0osRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL25vdGlmaWNhdGlvbi1zeXN0ZW0vLi9zcmMvbGliL2F1dGgudHM/NjY5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnO1xyXG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSAnQG5leHQtYXV0aC9wcmlzbWEtYWRhcHRlcic7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJy4vcHJpc21hJztcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgeyBSb2xlLCBTdGF0dXMgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gICAgYWRhcHRlcjogUHJpc21hQWRhcHRlcihwcmlzbWEpLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgICAgICAgIG5hbWU6ICdDcmVkZW50aWFscycsXHJcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRob3JpemVdIEF0dGVtcHRpbmcgYXV0aG9yaXphdGlvbiBmb3I6JywgY3JlZGVudGlhbHM/LmVtYWlsKTtcclxuICAgICAgICAgICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdbQXV0aG9yaXplXSBNaXNzaW5nIGVtYWlsIG9yIHBhc3N3b3JkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign7J2066mU7J286rO8IOu5hOuwgOuyiO2YuOulvCDsnoXroKXtlbTso7zshLjsmpQuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRob3JpemVdIEZpbmRpbmcgdXNlci4uLicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aG9yaXplXSBVc2VyIGZvdW5kOicsIHVzZXIgPyB1c2VyLmVtYWlsIDogJ05vdCBGb3VuZCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tBdXRob3JpemVdIFVzZXIgbm90IGZvdW5kIG9yIHBhc3N3b3JkIG5vdCBzZXQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCfsnbTrqZTsnbwg65iQ64qUIOu5hOuwgOuyiO2YuOqwgCDsnbzsuZjtlZjsp4Ag7JWK7Iq164uI64ukLicpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbQXV0aG9yaXplXSBDb21wYXJpbmcgcGFzc3dvcmQuLi4nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0F1dGhvcml6ZV0gUGFzc3dvcmQgdmFsaWQ6JywgaXNWYWxpZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW0F1dGhvcml6ZV0gSW52YWxpZCBwYXNzd29yZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ+ydtOuplOydvCDrmJDripQg67mE67CA67KI7Zi46rCAIOydvOy5mO2VmOyngCDslYrsirXri4jri6QuJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tBdXRob3JpemVdIEF1dGhvcml6YXRpb24gc3VjY2Vzc2Z1bCBmb3I6JywgdXNlci5lbWFpbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSB8fCAnJyxcclxuICAgICAgICAgICAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB1c2VyLnN0YXR1cyxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgXSxcclxuICAgIHNlc3Npb246IHtcclxuICAgICAgICBzdHJhdGVneTogJ2p3dCdcclxuICAgIH0sXHJcbiAgICBwYWdlczoge1xyXG4gICAgICAgIHNpZ25JbjogJy9hZG1pbi9sb2dpbicsXHJcbiAgICB9LFxyXG4gICAgY29va2llczoge1xyXG4gICAgICAgIHNlc3Npb25Ub2tlbjoge1xyXG4gICAgICAgICAgbmFtZTogYF9fU2VjdXJlLW5leHQtYXV0aC5zZXNzaW9uLXRva2VuYCxcclxuICAgICAgICAgIG9wdGlvbnM6IHtcclxuICAgICAgICAgICAgaHR0cE9ubHk6IHRydWUsXHJcbiAgICAgICAgICAgIHNhbWVTaXRlOiAnbGF4JyxcclxuICAgICAgICAgICAgcGF0aDogJy8nLFxyXG4gICAgICAgICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNhbGxiYWNrczoge1xyXG4gICAgICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH0pIHtcclxuICAgICAgICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICAgICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgICAgICAgICAgIHRva2VuLnJvbGUgPSB1c2VyLnJvbGU7XHJcbiAgICAgICAgICAgICAgICB0b2tlbi5zdGF0dXMgPSB1c2VyLnN0YXR1cztcclxuICAgICAgICAgICAgICAgIC8vIEpXVCDthqDtgbAg7IOd7ISxXHJcbiAgICAgICAgICAgICAgICB0b2tlbi50b2tlbiA9IGp3dC5zaWduKFxyXG4gICAgICAgICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogdXNlci5yb2xlIFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCB8fCAneW91ci1zdHJvbmdlci1mYWxsYmFjay1zZWNyZXQtdGhhdC1pcy1jb25zaXN0ZW50LWFjcm9zcy1yZXN0YXJ0cycsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBleHBpcmVzSW46ICc3ZCcgfVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xyXG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi51c2VyKSB7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5pZCBhcyBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnVzZXIucm9sZSA9IHRva2VuLnJvbGUgYXMgUm9sZTtcclxuICAgICAgICAgICAgICAgIHNlc3Npb24udXNlci5zdGF0dXMgPSB0b2tlbi5zdGF0dXMgYXMgU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi51c2VyLnRva2VuID0gdG9rZW4udG9rZW4gYXMgc3RyaW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTsgIl0sIm5hbWVzIjpbIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYmNyeXB0Iiwiand0IiwiYXV0aE9wdGlvbnMiLCJhZGFwdGVyIiwicHJvdmlkZXJzIiwibmFtZSIsImNyZWRlbnRpYWxzIiwiZW1haWwiLCJsYWJlbCIsInR5cGUiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsIkVycm9yIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJyb2xlIiwic3RhdHVzIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJjb29raWVzIiwic2Vzc2lvblRva2VuIiwib3B0aW9ucyIsImh0dHBPbmx5Iiwic2FtZVNpdGUiLCJwYXRoIiwic2VjdXJlIiwicHJvY2VzcyIsImNhbGxiYWNrcyIsInRva2VuIiwic2lnbiIsImVudiIsIkpXVF9TRUNSRVQiLCJleHBpcmVzSW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

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
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&page=%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcampaigns%2F%5Bid%5D%2Fapply%2Froute.ts&appDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cuser%5CDesktop%5Caaaaa&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();