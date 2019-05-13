webpackHotUpdate("main",{

/***/ "./src/components/PlaylistDetailPage.js":
/*!**********************************************!*\
  !*** ./src/components/PlaylistDetailPage.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_imgs_playlist_cover_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/imgs/playlist_cover.png */ "./src/assets/imgs/playlist_cover.png");
/* harmony import */ var _assets_imgs_playlist_cover_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_imgs_playlist_cover_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_css_UserPage_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/css/UserPage.css */ "./src/assets/css/UserPage.css");
/* harmony import */ var _assets_css_UserPage_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_css_UserPage_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _assets_css_PlaylistDetail_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/css/PlaylistDetail.css */ "./src/assets/css/PlaylistDetail.css");
/* harmony import */ var _assets_css_PlaylistDetail_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_assets_css_PlaylistDetail_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Volumes/DATA/Project/maynhac/client/src/components/PlaylistDetailPage.js";





class PlaylistDetailPage extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    this.createSongItem = song => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "item",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        class: "playlist play circle icon big ",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        className: "ui avatar image",
        src: "/images/avatar2/small/lindsay.png",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        },
        __self: this
      }, "Lindsay"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "right floated content",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        class: "plus square icon big ",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        class: "minus square icon big ",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      })));
    };

    this.state = {
      data: props.location.state.data
    };
    console.log(this.state.data);
  }

  render() {
    var songs = [];

    for (var i = 0; i < this.state.data.songs.length; ++i) {
      songs.push(this.createSongItem(this.state.data.songs[i]));
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ui placeholder segment",
      style: {
        backgroundColor: "#004655"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: _assets_imgs_playlist_cover_png__WEBPACK_IMPORTED_MODULE_1___default.a,
      style: {
        maxWidth: "25%",
        width: "25%"
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, this.state.data.name))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ui segment",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "ui primary button",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: this
    }, "Play all")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ui middle aligned divided list",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }, songs)));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (PlaylistDetailPage);

/***/ })

})
//# sourceMappingURL=main.f09a46aee5439aed826f.hot-update.js.map