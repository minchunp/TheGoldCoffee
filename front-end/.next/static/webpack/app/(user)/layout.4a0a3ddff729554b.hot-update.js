"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(user)/layout",{

/***/ "(app-pages-browser)/./src/app/redux/store/index.ts":
/*!**************************************!*\
  !*** ./src/app/redux/store/index.ts ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @reduxjs/toolkit */ \"(app-pages-browser)/./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs\");\n/* harmony import */ var _cartSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cartSlice */ \"(app-pages-browser)/./src/app/redux/cartSlice.ts\");\n/* harmony import */ var _middleware_saveCartToLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../middleware/saveCartToLocalStorage */ \"(app-pages-browser)/./src/app/redux/middleware/saveCartToLocalStorage.ts\");\n/* harmony import */ var _localStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../localStorage */ \"(app-pages-browser)/./src/app/redux/localStorage.ts\");\n\n\n\n\nconst preloadedState = {\n    cart: {\n        cartProducts: (0,_localStorage__WEBPACK_IMPORTED_MODULE_2__[\"default\"])() || []\n    }\n};\nconst store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__.configureStore)({\n    reducer: {\n        cart: _cartSlice__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n    },\n    preloadedState,\n    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(_middleware_saveCartToLocalStorage__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVkdXgvc3RvcmUvaW5kZXgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBa0Q7QUFDWDtBQUNtQztBQUNuQjtBQWtCdkQsTUFBTUksaUJBQXNDO0lBQ3pDQyxNQUFNO1FBQ0hDLGNBQWNILHlEQUF3QkEsTUFBTSxFQUFFO0lBQ2pEO0FBQ0g7QUFFQSxNQUFNSSxRQUFRUCxnRUFBY0EsQ0FBQztJQUMxQlEsU0FBUztRQUNOSCxNQUFNSixrREFBV0E7SUFDcEI7SUFDQUc7SUFDQUssWUFBWSxDQUFDQyx1QkFBeUJBLHVCQUF1QkMsTUFBTSxDQUFDVCwwRUFBc0JBO0FBQzdGO0FBTUEsK0RBQWVLLEtBQUtBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9yZWR1eC9zdG9yZS9pbmRleC50cz9iODE1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbmZpZ3VyZVN0b3JlIH0gZnJvbSBcIkByZWR1eGpzL3Rvb2xraXRcIjtcbmltcG9ydCBjYXJ0UmVkdWNlciBmcm9tIFwiLi4vY2FydFNsaWNlXCI7XG5pbXBvcnQgc2F2ZUNhcnRUb0xvY2FsU3RvcmFnZSBmcm9tIFwiLi4vbWlkZGxld2FyZS9zYXZlQ2FydFRvTG9jYWxTdG9yYWdlXCI7XG5pbXBvcnQgbG9hZENhcnRGcm9tTG9jYWxTdG9yYWdlIGZyb20gXCIuLi9sb2NhbFN0b3JhZ2VcIjtcblxuLy8gxJDhu4tuaCBuZ2jEqWEgaW50ZXJmYWNlIGNobyBz4bqjbiBwaOG6qW0gxJHGsOG7o2MgdGjDqm0gdsOgbyBnaeG7jyBow6BuZ1xuaW50ZXJmYWNlIENhcnRQcm9kdWN0IHtcbiAgIHByb2R1Y3RJZDogc3RyaW5nLFxuICAgbmFtZV9wcm86IHN0cmluZyxcbiAgIGltZ19wcm86IHN0cmluZyxcbiAgIHByaWNlX3BybzogbnVtYmVyLFxuICAgc2FsZV9wcm86IG51bWJlcixcbiAgIHNpemVfcHJvOiBzdHJpbmcsXG4gICBxdWFudGl0eV9wcm86IG51bWJlcixcbiAgIHRvcHBpbmdzOiBhbnlcbn1cblxuaW50ZXJmYWNlIENhcnRTdGF0ZSB7XG4gICBjYXJ0UHJvZHVjdHM6IENhcnRQcm9kdWN0W107XG59XG5cbmNvbnN0IHByZWxvYWRlZFN0YXRlOiB7IGNhcnQ6IENhcnRTdGF0ZSB9ID0ge1xuICAgY2FydDoge1xuICAgICAgY2FydFByb2R1Y3RzOiBsb2FkQ2FydEZyb21Mb2NhbFN0b3JhZ2UoKSB8fCBbXSxcbiAgIH0sXG59O1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHtcbiAgIHJlZHVjZXI6IHtcbiAgICAgIGNhcnQ6IGNhcnRSZWR1Y2VyLFxuICAgfSxcbiAgIHByZWxvYWRlZFN0YXRlLFxuICAgbWlkZGxld2FyZTogKGdldERlZmF1bHRNaWRkbGV3YXJlKSA9PiBnZXREZWZhdWx0TWlkZGxld2FyZSgpLmNvbmNhdChzYXZlQ2FydFRvTG9jYWxTdG9yYWdlKSxcbn0pO1xuXG4vLyBYdeG6pXQgY8OhYyBraeG7g3UgZOG7ryBsaeG7h3UgY+G7p2Egc3RvcmVcbmV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IFJldHVyblR5cGU8dHlwZW9mIHN0b3JlLmdldFN0YXRlPjtcbmV4cG9ydCB0eXBlIEFwcERpc3BhdGNoID0gdHlwZW9mIHN0b3JlLmRpc3BhdGNoO1xuXG5leHBvcnQgZGVmYXVsdCBzdG9yZTsiXSwibmFtZXMiOlsiY29uZmlndXJlU3RvcmUiLCJjYXJ0UmVkdWNlciIsInNhdmVDYXJ0VG9Mb2NhbFN0b3JhZ2UiLCJsb2FkQ2FydEZyb21Mb2NhbFN0b3JhZ2UiLCJwcmVsb2FkZWRTdGF0ZSIsImNhcnQiLCJjYXJ0UHJvZHVjdHMiLCJzdG9yZSIsInJlZHVjZXIiLCJtaWRkbGV3YXJlIiwiZ2V0RGVmYXVsdE1pZGRsZXdhcmUiLCJjb25jYXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/redux/store/index.ts\n"));

/***/ })

});