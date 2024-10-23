"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(user)/product/[id]/page",{

/***/ "(app-pages-browser)/./src/app/redux/cartSlice.ts":
/*!************************************!*\
  !*** ./src/app/redux/cartSlice.ts ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addProductToCart: function() { return /* binding */ addProductToCart; },\n/* harmony export */   clearAllCart: function() { return /* binding */ clearAllCart; },\n/* harmony export */   decQuantity: function() { return /* binding */ decQuantity; },\n/* harmony export */   incQuantity: function() { return /* binding */ incQuantity; },\n/* harmony export */   removeProductToCart: function() { return /* binding */ removeProductToCart; }\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"(app-pages-browser)/./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs\");\n\nconst initialState = {\n    cartProducts: []\n};\nconst cartSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"cart\",\n    initialState,\n    reducers: {\n        // Thêm sản phẩm vào giỏ hàng\n        addProductToCart: (state, action)=>{\n            const product = action.payload;\n            const existingProduct = state.cartProducts.find((pro)=>pro.productId === product.productId && pro.size_pro === product.size_pro);\n            if (existingProduct) {\n                existingProduct.quantity_pro += product.quantity_pro;\n            } else {\n                state.cartProducts.push(product);\n            }\n        },\n        // Xoá sản phẩm khỏi giỏ hàng\n        removeProductToCart: (state, action)=>{\n            const product = action.payload;\n            const productSize = product.size_pro;\n            state.cartProducts = state.cartProducts.filter((pro)=>!(pro.productId === product.productId && pro.size_pro === productSize));\n        },\n        // Tăng số lượng sản phẩm trong giỏ hàng\n        incQuantity: (state, action)=>{\n            const product = state.cartProducts.find((pro)=>pro.productId === action.payload.productId && pro.size_pro === action.payload.size_pro);\n            if (product) {\n                product.quantity_pro += 1;\n            }\n        },\n        // Giảm số lượng sản phẩm trong giỏ hàng\n        decQuantity: (state, action)=>{\n            const product = state.cartProducts.find((pro)=>pro.productId === action.payload.productId && pro.size_pro === action.payload.size_pro);\n            if (product && product.quantity_pro > 1) {\n                product.quantity_pro -= 1;\n            } else if (product && product.quantity_pro == 1) {\n                state.cartProducts = state.cartProducts.filter((pro)=>!(pro.productId === action.payload.productId && pro.size_pro === action.payload.size_pro));\n            }\n        },\n        // Xoá tất cả các sản phẩm trong giỏ hàng\n        clearAllCart: (state)=>{\n            state.cartProducts = [];\n        }\n    }\n});\nconst { addProductToCart, removeProductToCart, incQuantity, decQuantity, clearAllCart } = cartSlice.actions;\n/* harmony default export */ __webpack_exports__[\"default\"] = (cartSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcmVkdXgvY2FydFNsaWNlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUE4RDtBQWtCOUQsTUFBTUMsZUFBMEI7SUFDOUJDLGNBQWMsRUFBRTtBQUNsQjtBQUVBLE1BQU1DLFlBQVlILDZEQUFXQSxDQUFDO0lBQzVCSSxNQUFNO0lBQ05IO0lBQ0FJLFVBQVU7UUFDUiw2QkFBNkI7UUFDN0JDLGtCQUFrQixDQUFDQyxPQUFPQztZQUN4QixNQUFNQyxVQUFVRCxPQUFPRSxPQUFPO1lBQzlCLE1BQU1DLGtCQUFrQkosTUFBTUwsWUFBWSxDQUFDVSxJQUFJLENBQzdDLENBQUNDLE1BQ0NBLElBQUlDLFNBQVMsS0FBS0wsUUFBUUssU0FBUyxJQUNuQ0QsSUFBSUUsUUFBUSxLQUFLTixRQUFRTSxRQUFRO1lBRXJDLElBQUlKLGlCQUFpQjtnQkFDbkJBLGdCQUFnQkssWUFBWSxJQUFJUCxRQUFRTyxZQUFZO1lBQ3RELE9BQU87Z0JBQ0xULE1BQU1MLFlBQVksQ0FBQ2UsSUFBSSxDQUFDUjtZQUMxQjtRQUNGO1FBRUEsNkJBQTZCO1FBQzdCUyxxQkFBcUIsQ0FBQ1gsT0FBT0M7WUFDM0IsTUFBTUMsVUFBVUQsT0FBT0UsT0FBTztZQUM5QixNQUFNUyxjQUFjVixRQUFRTSxRQUFRO1lBQ3BDUixNQUFNTCxZQUFZLEdBQUdLLE1BQU1MLFlBQVksQ0FBQ2tCLE1BQU0sQ0FDNUMsQ0FBQ1AsTUFDQyxDQUFFQSxDQUFBQSxJQUFJQyxTQUFTLEtBQUtMLFFBQVFLLFNBQVMsSUFBSUQsSUFBSUUsUUFBUSxLQUFLSSxXQUFVO1FBRTFFO1FBRUEsd0NBQXdDO1FBQ3hDRSxhQUFhLENBQUNkLE9BQU9DO1lBQ25CLE1BQU1DLFVBQVVGLE1BQU1MLFlBQVksQ0FBQ1UsSUFBSSxDQUNyQyxDQUFDQyxNQUNDQSxJQUFJQyxTQUFTLEtBQUtOLE9BQU9FLE9BQU8sQ0FBQ0ksU0FBUyxJQUMxQ0QsSUFBSUUsUUFBUSxLQUFLUCxPQUFPRSxPQUFPLENBQUNLLFFBQVE7WUFFNUMsSUFBSU4sU0FBUztnQkFDWEEsUUFBUU8sWUFBWSxJQUFJO1lBQzFCO1FBQ0Y7UUFFQSx3Q0FBd0M7UUFDeENNLGFBQWEsQ0FBQ2YsT0FBT0M7WUFDbkIsTUFBTUMsVUFBVUYsTUFBTUwsWUFBWSxDQUFDVSxJQUFJLENBQ3JDLENBQUNDLE1BQ0NBLElBQUlDLFNBQVMsS0FBS04sT0FBT0UsT0FBTyxDQUFDSSxTQUFTLElBQzFDRCxJQUFJRSxRQUFRLEtBQUtQLE9BQU9FLE9BQU8sQ0FBQ0ssUUFBUTtZQUU1QyxJQUFJTixXQUFXQSxRQUFRTyxZQUFZLEdBQUcsR0FBRztnQkFDdkNQLFFBQVFPLFlBQVksSUFBSTtZQUMxQixPQUFPLElBQUlQLFdBQVdBLFFBQVFPLFlBQVksSUFBSSxHQUFHO2dCQUMvQ1QsTUFBTUwsWUFBWSxHQUFHSyxNQUFNTCxZQUFZLENBQUNrQixNQUFNLENBQzVDLENBQUNQLE1BQ0MsQ0FDRUEsQ0FBQUEsSUFBSUMsU0FBUyxLQUFLTixPQUFPRSxPQUFPLENBQUNJLFNBQVMsSUFDMUNELElBQUlFLFFBQVEsS0FBS1AsT0FBT0UsT0FBTyxDQUFDSyxRQUFRO1lBR2hEO1FBQ0Y7UUFFQSx5Q0FBeUM7UUFDekNRLGNBQWMsQ0FBQ2hCO1lBQ2JBLE1BQU1MLFlBQVksR0FBRyxFQUFFO1FBQ3pCO0lBQ0Y7QUFDRjtBQUVPLE1BQU0sRUFDWEksZ0JBQWdCLEVBQ2hCWSxtQkFBbUIsRUFDbkJHLFdBQVcsRUFDWEMsV0FBVyxFQUNYQyxZQUFZLEVBQ2IsR0FBR3BCLFVBQVVxQixPQUFPLENBQUM7QUFDdEIsK0RBQWVyQixVQUFVc0IsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcmVkdXgvY2FydFNsaWNlLnRzPzUwZTAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlU2xpY2UsIFBheWxvYWRBY3Rpb24gfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xuXG4vLyDEkOG7i25oIG5naMSpYSBpbnRlcmZhY2UgY2hvIHPhuqNuIHBo4bqpbSDEkcaw4bujYyB0aMOqbSB2w6BvIGdp4buPIGjDoG5nXG5pbnRlcmZhY2UgQ2FydFByb2R1Y3Qge1xuICBwcm9kdWN0SWQ6IHN0cmluZztcbiAgbmFtZV9wcm86IHN0cmluZztcbiAgaW1nX3Bybzogc3RyaW5nO1xuICBwcmljZV9wcm86IG51bWJlcjtcbiAgc2FsZV9wcm86IG51bWJlcjtcbiAgc2l6ZV9wcm86IHN0cmluZztcbiAgcXVhbnRpdHlfcHJvOiBudW1iZXI7XG4gIHRvcHBpbmdzOiBhbnk7XG59XG5cbmludGVyZmFjZSBDYXJ0U3RhdGUge1xuICBjYXJ0UHJvZHVjdHM6IENhcnRQcm9kdWN0W107XG59XG5cbmNvbnN0IGluaXRpYWxTdGF0ZTogQ2FydFN0YXRlID0ge1xuICBjYXJ0UHJvZHVjdHM6IFtdLFxufTtcblxuY29uc3QgY2FydFNsaWNlID0gY3JlYXRlU2xpY2Uoe1xuICBuYW1lOiBcImNhcnRcIixcbiAgaW5pdGlhbFN0YXRlLFxuICByZWR1Y2Vyczoge1xuICAgIC8vIFRow6ptIHPhuqNuIHBo4bqpbSB2w6BvIGdp4buPIGjDoG5nXG4gICAgYWRkUHJvZHVjdFRvQ2FydDogKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248Q2FydFByb2R1Y3Q+KSA9PiB7XG4gICAgICBjb25zdCBwcm9kdWN0ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBjb25zdCBleGlzdGluZ1Byb2R1Y3QgPSBzdGF0ZS5jYXJ0UHJvZHVjdHMuZmluZChcbiAgICAgICAgKHBybykgPT5cbiAgICAgICAgICBwcm8ucHJvZHVjdElkID09PSBwcm9kdWN0LnByb2R1Y3RJZCAmJlxuICAgICAgICAgIHByby5zaXplX3BybyA9PT0gcHJvZHVjdC5zaXplX3Byb1xuICAgICAgKTtcbiAgICAgIGlmIChleGlzdGluZ1Byb2R1Y3QpIHtcbiAgICAgICAgZXhpc3RpbmdQcm9kdWN0LnF1YW50aXR5X3BybyArPSBwcm9kdWN0LnF1YW50aXR5X3BybztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLmNhcnRQcm9kdWN0cy5wdXNoKHByb2R1Y3QpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBYb8OhIHPhuqNuIHBo4bqpbSBraOG7j2kgZ2nhu48gaMOgbmdcbiAgICByZW1vdmVQcm9kdWN0VG9DYXJ0OiAoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxDYXJ0UHJvZHVjdD4pID0+IHtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBhY3Rpb24ucGF5bG9hZDtcbiAgICAgIGNvbnN0IHByb2R1Y3RTaXplID0gcHJvZHVjdC5zaXplX3BybztcbiAgICAgIHN0YXRlLmNhcnRQcm9kdWN0cyA9IHN0YXRlLmNhcnRQcm9kdWN0cy5maWx0ZXIoXG4gICAgICAgIChwcm8pID0+XG4gICAgICAgICAgIShwcm8ucHJvZHVjdElkID09PSBwcm9kdWN0LnByb2R1Y3RJZCAmJiBwcm8uc2l6ZV9wcm8gPT09IHByb2R1Y3RTaXplKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgLy8gVMSDbmcgc+G7kSBsxrDhu6NuZyBz4bqjbiBwaOG6qW0gdHJvbmcgZ2nhu48gaMOgbmdcbiAgICBpbmNRdWFudGl0eTogKHN0YXRlLCBhY3Rpb246IFBheWxvYWRBY3Rpb248Q2FydFByb2R1Y3Q+KSA9PiB7XG4gICAgICBjb25zdCBwcm9kdWN0ID0gc3RhdGUuY2FydFByb2R1Y3RzLmZpbmQoXG4gICAgICAgIChwcm8pID0+XG4gICAgICAgICAgcHJvLnByb2R1Y3RJZCA9PT0gYWN0aW9uLnBheWxvYWQucHJvZHVjdElkICYmXG4gICAgICAgICAgcHJvLnNpemVfcHJvID09PSBhY3Rpb24ucGF5bG9hZC5zaXplX3Byb1xuICAgICAgKTtcbiAgICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICAgIHByb2R1Y3QucXVhbnRpdHlfcHJvICs9IDE7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIEdp4bqjbSBz4buRIGzGsOG7o25nIHPhuqNuIHBo4bqpbSB0cm9uZyBnaeG7jyBow6BuZ1xuICAgIGRlY1F1YW50aXR5OiAoc3RhdGUsIGFjdGlvbjogUGF5bG9hZEFjdGlvbjxDYXJ0UHJvZHVjdD4pID0+IHtcbiAgICAgIGNvbnN0IHByb2R1Y3QgPSBzdGF0ZS5jYXJ0UHJvZHVjdHMuZmluZChcbiAgICAgICAgKHBybykgPT5cbiAgICAgICAgICBwcm8ucHJvZHVjdElkID09PSBhY3Rpb24ucGF5bG9hZC5wcm9kdWN0SWQgJiZcbiAgICAgICAgICBwcm8uc2l6ZV9wcm8gPT09IGFjdGlvbi5wYXlsb2FkLnNpemVfcHJvXG4gICAgICApO1xuICAgICAgaWYgKHByb2R1Y3QgJiYgcHJvZHVjdC5xdWFudGl0eV9wcm8gPiAxKSB7XG4gICAgICAgIHByb2R1Y3QucXVhbnRpdHlfcHJvIC09IDE7XG4gICAgICB9IGVsc2UgaWYgKHByb2R1Y3QgJiYgcHJvZHVjdC5xdWFudGl0eV9wcm8gPT0gMSkge1xuICAgICAgICBzdGF0ZS5jYXJ0UHJvZHVjdHMgPSBzdGF0ZS5jYXJ0UHJvZHVjdHMuZmlsdGVyKFxuICAgICAgICAgIChwcm8pID0+XG4gICAgICAgICAgICAhKFxuICAgICAgICAgICAgICBwcm8ucHJvZHVjdElkID09PSBhY3Rpb24ucGF5bG9hZC5wcm9kdWN0SWQgJiZcbiAgICAgICAgICAgICAgcHJvLnNpemVfcHJvID09PSBhY3Rpb24ucGF5bG9hZC5zaXplX3Byb1xuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyBYb8OhIHThuqV0IGPhuqMgY8OhYyBz4bqjbiBwaOG6qW0gdHJvbmcgZ2nhu48gaMOgbmdcbiAgICBjbGVhckFsbENhcnQ6IChzdGF0ZSkgPT4ge1xuICAgICAgc3RhdGUuY2FydFByb2R1Y3RzID0gW107XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgY29uc3Qge1xuICBhZGRQcm9kdWN0VG9DYXJ0LFxuICByZW1vdmVQcm9kdWN0VG9DYXJ0LFxuICBpbmNRdWFudGl0eSxcbiAgZGVjUXVhbnRpdHksXG4gIGNsZWFyQWxsQ2FydCxcbn0gPSBjYXJ0U2xpY2UuYWN0aW9ucztcbmV4cG9ydCBkZWZhdWx0IGNhcnRTbGljZS5yZWR1Y2VyO1xuIl0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiaW5pdGlhbFN0YXRlIiwiY2FydFByb2R1Y3RzIiwiY2FydFNsaWNlIiwibmFtZSIsInJlZHVjZXJzIiwiYWRkUHJvZHVjdFRvQ2FydCIsInN0YXRlIiwiYWN0aW9uIiwicHJvZHVjdCIsInBheWxvYWQiLCJleGlzdGluZ1Byb2R1Y3QiLCJmaW5kIiwicHJvIiwicHJvZHVjdElkIiwic2l6ZV9wcm8iLCJxdWFudGl0eV9wcm8iLCJwdXNoIiwicmVtb3ZlUHJvZHVjdFRvQ2FydCIsInByb2R1Y3RTaXplIiwiZmlsdGVyIiwiaW5jUXVhbnRpdHkiLCJkZWNRdWFudGl0eSIsImNsZWFyQWxsQ2FydCIsImFjdGlvbnMiLCJyZWR1Y2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/redux/cartSlice.ts\n"));

/***/ })

});