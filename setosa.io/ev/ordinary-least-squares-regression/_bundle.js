(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function (require, module, exports) {
    "use strict";
    var THREE = require("three");
    require("OrbitControls")(THREE), require("TrackballControls")(THREE);
    var d3 = require("d3");
    require("d3-masonic")(d3);
    var React = require("react"),
      color = require("color"),
      alphaify = require("alphaify"),
      utils = require("./utils"),
      style = require("./style"),
      LeastSquares = require("./LeastSquares.react"),
      LeastSquares3DModule = require("./LeastSquares3DModule.react"),
      RegressionAsNobsModule = require("./RegressionAsNobsModule.react"),
      SLRParameters = require("./SLRParameters.react"),
      App = React.createClass({
        displayName: "App",
        getInitialState: function () {
          var e = d3.scale.category10(),
            t = [
              [16, 5],
              [13, 23],
              [24, 33],
              [43, 32],
              [51, 53],
              [84, 65],
              [90, 85]
            ].map(function (t, a) {
              return {
                point: t,
                color: e(a)
              }
            }),
            a = {
              leastSquaresPoints: t,
              regressionPoints: [
                [20, 20],
                [80, 80]
              ],
              betas: this._getBetas(t),
              leastSquaresErrors: this._updateLeastSquaresErrors(t)
            };
          return a
        },
        _locationAccessor: function (e) {
          return e.point
        },
        _onDragOLSNob: function (e, t) {
          if ("point" === e) {
            var a = this.state.leastSquaresPoints.slice(0);
            a[t.i].point = t.pos, this._updatePoint(a[t.i], t.pos)
          }
        },
        _onDragRegressionNob: function (e, t) {
          if ("regression" === e) {
            var a = this.state.regressionPoints;
            this._updateRegressionPoint(a[t.i], t.pos)
          }
        },
        _updatePoint: function (e, t) {
          var a = this.state.leastSquaresPoints.slice(0);
          e.point = t, this.setState({
            leastSquaresPoints: a,
            betas: this._getBetas(a),
            leastSquaresErrors: this._updateLeastSquaresErrors(a)
          })
        },
        _updateRegressionPoint: function (e, t) {
          var a = this.state.regressionPoints.slice(0);
          e[0] = t[0], e[1] = t[1], this.setState({
            regressionPoints: a
          })
        },
        _updateLeastSquaresErrors: function (e) {
          return utils.wrapLeastSquaresErrors(e, this._locationAccessor)
        },
        _getBetas: function (e) {
          var t = e.map(function (e) {
              return [e.point[0]]
            }),
            a = e.map(function (e) {
              return e.point[1]
            });
          return utils.hessian(a, t)
        },
        _leastSquaresValueAccessor: function (e) {
          return e.error
        },
        _leastSquaresColorAccessor: function (e) {
          return e.color
        },
        render: function () {
          return React.createElement("div", null, React.createElement("h3", null, "???????????????!"), React.createElement("p", null, React.createElement("i", null, "???????????????"), " ?????????????????????", React.createElement("img", {
            src: "ev/linear-regression/resources/dial-tutorial.gif",
            style: style.tutorialVideo
          })), React.createElement("p", null, React.createElement("i", null, "?????????????????????"), " ?????????????????????", React.createElement("img", {
            style: style.tutorialVideo,
            src: "ev/linear-regression/resources/point-tutorial.gif"
          })), React.createElement("p", null, "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? \"???????????? \"?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????OLS????????????????????????????????????????????????????????????????????????--\"????????? \"???????????????????????????--\"????????? \"???????????????"), React.createElement("p", null, "?????????OLS??????????????????????????????????????????????????????????????????????????????????????????--???????????? \"betas\"--???OLS??????????????????????????????beta_1?????????????????????????????????????????????????????????????????????????????????????????_2???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????beta	????????????"), React.createElement(LeastSquares, {
            key: "least-squares",
            points: this.state.leastSquaresPoints,
            betas: this.state.betas,
            onDragNob: this._onDragOLSNob,
            margins: {
              l: 20,
              t: 20,
              r: 30,
              b: 30
            },
            mode: "point",
            width: 400,
            height: 400,
            showErrorSquares: !1,
            showErrorLines: !1,
            colorAccessor: function () {
              return color.senary
            },
            style: {
              "float": "left"
            },
            xAxisLabel: "hand size",
            yAxisLabel: "height"
          }), React.createElement(SLRParameters, {
            width: 400,
            height: 400,
            betas: this.state.betas
          }), React.createElement("p", null, '????????????????????????????????????"betas?????????????????????" ???????????????OLS??????????????????????????????????????????beta????????????'), React.createElement("p", null, "?????????????????????????????????????????????????????????????????????????????????????????????OLS???????????? ", React.createElement("em", null, "??????"), " ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????betas?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????OLS!"), React.createElement(RegressionAsNobsModule, {
            points: this.state.leastSquaresPoints,
            onDragOLSNob: this._onDragOLSNob,
            leastSquaresValueAccessor: function (e) {
              return e.error
            },
            leastSquaresColorAccessor: function (e) {
              return e.d.color
            }
          }), React.createElement(LeastSquares3DModule, null))
        }
      });
    React.render(React.createElement(App, null), d3.select(".myApp").node());


  }, {
    "./LeastSquares.react": 3,
    "./LeastSquares3DModule.react": 4,
    "./RegressionAsNobsModule.react": 7,
    "./SLRParameters.react": 8,
    "./style": 10,
    "./utils": 11,
    "OrbitControls": "OrbitControls",
    "TrackballControls": "TrackballControls",
    "alphaify": "alphaify",
    "color": "color",
    "d3": "d3",
    "d3-masonic": "d3-masonic",
    "react": "react",
    "three": "three"
  }],
  2: [function (require, module, exports) {
    "use strict";
    var _extends = require("babel-runtime/helpers/extends")["default"],
      d3 = require("d3"),
      React = require("react"),
      PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin"),
      Dial = React.createClass({
        displayName: "Dial",
        mixins: [PureRenderMixin],
        sel: function () {
          return d3.select(this.getDOMNode())
        },
        getDefaultProps: function () {
          return {
            min: -10,
            max: 10,
            value: 0,
            size: 120,
            nobFill: "rgba(0, 0, 0, 0.1)",
            wrapInSVG: !0
          }
        },
        getInitialState: function () {
          return this._updateStateFromProps(this.props, {
            scale: null
          })
        },
        _updateStateFromProps: function (e, t) {
          return t.scale = d3.scale.linear().domain([e.min, e.max]).range([0, 360]).clamp(!0), t
        },
        componentWillReceiveProps: function (e) {
          this.setState(this._updateStateFromProps(e, this.state))
        },
        componentDidMount: function () {
          var e = this.sel().select(".stage"),
            t = this,
            r = d3.behavior.drag().on("drag", function () {
              var r = d3.mouse(e.node()),
                a = Math.atan2(r[1], r[0]) / Math.PI * 180 + 180,
                n = t.state.scale.invert(a);
              t.props.onChangeValue(n)
            });
          e.call(r)
        },
        render: function () {
          var e = this.props,
            t = this.state,
            r = e.size,
            a = e.style,
            n = e.nobFill,
            s = e.nobStroke,
            i = e.value,
            l = e.wrapInSVG,
            o = 10,
            c = 30,
            u = r / 2 - o,
            m = this.props.innerNobRadius || u / 4,
            d = _extends({}, e);
          l && (d.transform = "translate(" + [r / 2, r / 2] + ") ");
          var p = React.createElement("g", d, React.createElement("g", {
            className: "stage"
          }, React.createElement("g", null, d3.range(c).map(function (e, r) {
            var a = t.scale(i) > e / (c - 1) * 360,
              n = e / (c - 1) * 360 + 180,
              s = [u + 5, 0],
              l = a ? e / (c - 1) : 0;
            return React.createElement("rect", {
              width: 5,
              height: 4,
              key: r,
              transform: "rotate(" + n + ") translate(" + s + ")",
              style: {
                fill: "rgba(0, 0, 0, " + l + ")"
              }
            })
          })), React.createElement("g", {
            transform: "rotate(" + t.scale(e.value) + ")"
          }, React.createElement("circle", {
            r: u,
            style: {
              fill: n,
              stroke: s,
              cursor: "move"
            }
          }), React.createElement("g", {
            transform: "translate(" + -r / 4 + ",0)"
          }, React.createElement("circle", {
            r: m,
            style: {
              fill: "rgba(0, 0, 0, 0.2)",
              stroke: "none",
              cursor: "move"
            }
          }), React.createElement("path", {
            d: "M 8, -2 L -8, -2 M 8, 2 L -8, 2",
            transform: "rotate(" + -t.scale(i) + ")",
            style: {
              shapeRendering: "crispEdges",
              pointerEvents: "none",
              stroke: "rgba(0, 0, 0, 0.1)",
              strokeWidth: 2,
              fill: "none"
            }
          })))));
          return l ? React.createElement("svg", {
            width: r,
            height: r,
            key: "root-1",
            style: a
          }, p) : p
        }
      });
    module.exports = Dial;


  }, {
    "babel-runtime/helpers/extends": 13,
    "d3": "d3",
    "react": "react",
    "react/lib/ReactComponentWithPureRenderMixin": 25
  }],
  3: [function (require, module, exports) {
    "use strict";

    function axisStyle(t) {
      t.style("shape-rendering", "crispEdges").style("font-size", "12px"), t.selectAll("path").style("fill", "none").style("stroke", "black"), t.selectAll("line").style("fill", "none").style("stroke", "black")
    }

    function tickStyle(t) {
      t.style({
        "stroke-width": 1,
        stroke: "rgba(0, 0, 0, 0.1)",
        "shape-rendering": "crispEdges"
      })
    }

    function updateTicks(t, e, r, s, a) {
      var n = t.selectAll("line").data(a);
      n.exit().remove(), n.enter().append("line"), n.attr("x1", "x" === e ? r : r.range()[0]).attr("y1", "x" === e ? s.range()[0] : s).attr("x2", "x" === e ? r : r.range()[1]).attr("y2", "x" === e ? s.range()[1] : s).call(tickStyle)
    }
    var _Object$assign = require("babel-runtime/core-js/object/assign")["default"],
      d3 = require("d3"),
      React = require("react"),
      alphaify = require("alphaify"),
      color = require("color"),
      puid = require("puid"),
      utils = require("./utils"),
      buildNobs = require("./buildNobs"),
      LeastSquares = React.createClass({
        displayName: "LeastSquares",
        sel: function () {
          return d3.select(this.getDOMNode())
        },
        getDefaultProps: function () {
          return {
            points: [],
            betas: [0, 1],
            locationAccessor: function (t) {
              return t.point
            },
            colorAccessor: function (t) {
              return t.color
            },
            onDragNob: function () {
              return void 0
            },
            mode: "points",
            showErrorSquares: !0,
            showNobs: !0,
            showErrorLines: !0,
            showRegressionLine: !0,
            width: 410,
            height: 410,
            margins: {
              l: 30,
              t: 20,
              r: 20,
              b: 30
            },
            xAxisLabel: "x",
            yAxisLabel: "y",
            svgPadding: 50
          }
        },
        getInitialState: function () {
          var t = this.props,
            e = t.width,
            r = t.height,
            s = t.margins,
            a = t.svgPadding,
            n = e,
            o = r,
            i = s,
            p = d3.scale.linear().domain([0, 100]).range([i.l, n - i.r]),
            l = d3.scale.linear().domain([0, 100]).range([o - i.b, i.t]),
            d = function (t) {
              return [p(t[0]), l(t[1])]
            },
            c = function (t) {
              return [p.invert(t[0]), l.invert(t[1])]
            },
            u = {
              w: n,
              h: o,
              m: i,
              x: p,
              y: l,
              xy: d,
              xyi: c,
              svgPadding: a
            };
          return this._updateStateFromProps(this.props, u)
        },
        componentDidMount: function () {
          var t = this,
            e = this.state,
            r = (this.sel(), this.sel().append("svg").attr({
              width: e.w + 2 * e.svgPadding,
              height: e.h + 2 * e.svgPadding
            }).style({
              position: "absolute",
              left: -e.svgPadding + "px",
              top: -e.svgPadding + "px",
              "pointer-events": "none"
            })),
            s = r.append("defs"),
            a = "gradient-" + puid(),
            n = s.append("linearGradient").attr({
              id: a,
              gradientUnits: "objectBoundingBox",
              x2: 1,
              y2: 0
            }),
            o = .1,
            i = "white";
          n.append("stop").attr("stop-color", i).attr("stop-opacity", 0).attr("offset", 0), n.append("stop").attr("stop-color", i).attr("stop-opacity", 1).attr("offset", o), n.append("stop").attr("stop-color", i).attr("stop-opacity", 1).attr("offset", 1 - o), n.append("stop").attr("stop-color", i).attr("stop-opacity", 0).attr("offset", 1);
          var p = "gradient-" + puid(),
            l = s.append("linearGradient").attr({
              id: p,
              gradientUnits: "objectBoundingBox",
              x2: 0,
              y2: 1
            });
          l.append("stop").attr("stop-color", i).attr("stop-opacity", 0).attr("offset", 0), l.append("stop").attr("stop-color", i).attr("stop-opacity", 1).attr("offset", o), l.append("stop").attr("stop-color", i).attr("stop-opacity", 1).attr("offset", 1 - o), l.append("stop").attr("stop-color", i).attr("stop-opacity", 0).attr("offset", 1);
          var d = "mask-" + puid();
          s.append("mask").attr("id", d).append("rect").attr({
            width: e.w + 2 * e.svgPadding,
            height: e.h + 2 * e.svgPadding,
            fill: "url(#" + a + ")"
          });
          var c = "mask-" + puid();
          s.append("mask").attr("id", c).append("rect").attr({
            width: e.w + 2 * e.svgPadding,
            height: e.h + 2 * e.svgPadding,
            fill: "url(#" + p + ")"
          });
          var u = r.append("g").attr("mask", "url(#" + d + ")"),
            h = u.append("g").attr("mask", "url(#" + c + ")"),
            g = h.append("g").attr("class", "stage").attr("transform", "translate(" + [e.svgPadding, e.svgPadding] + ")");
          g.append("g").call(d3.svg.axis().scale(e.x).ticks(5)).call(axisStyle).attr("transform", "translate(" + [0, e.y.range()[0]] + ")").append("text").attr("transform", "translate(" + [d3.mean(e.x.range()), 35] + ")").attr("text-anchor", "middle").style("font-size", 14).text(this.props.xAxisLabel), g.append("g").call(d3.svg.axis().scale(e.y).orient("left").ticks(5)).call(axisStyle).attr("transform", "translate(" + e.x.range()[0] + ", 0)").append("text").attr("transform", "translate(-30," + d3.mean(e.y.range()) + ")\n          rotate(-90)").text(this.props.yAxisLabel).style("font-size", 14).attr("text-anchor", "middle"), g.append("g").attr("class", "x-ticks").call(updateTicks, "x", e.x, e.y, e.x.ticks()), g.append("g").attr("class", "y-ticks").call(updateTicks, "y", e.x, e.y, e.y.ticks()), this.props.showRegressionLine && g.append("line").attr("class", "line-ols").style("stroke", color.primary), this.props.showErrorLines && g.append("g").attr("class", "error-lines").selectAll("line").data(this.state.errors).enter().append("line").style("stroke", this.props.colorAccessor).style("stroke-width", 2).style("stroke-dasharray", "2, 2"), this.props.showErrorSquares && g.append("g").attr("class", "error-squares").selectAll("rect").data(this.state.errors).enter().append("rect").style("pointer-events", "none").style("fill", function (e, r) {
            return alphaify(t.props.colorAccessor(e.d, r), .2)
          }), "point" === this.props.mode && buildNobs(g, this.props.points, "point-nobs").call(d3.behavior.drag().on("drag", function (r, s) {
            var a = e.xyi(d3.mouse(g.node()));
            a[0] = d3.round(a[0], 2), a[1] = d3.round(a[1], 2), t._clamp(a), t.props.onDragNob("point", {
              pos: a,
              d: r,
              i: s
            })
          })).style("pointer-events", "auto"), "regression" === this.props.mode && buildNobs(g, this.props.regressionPoints, "regression-nobs").style("pointer-events", "auto").call(d3.behavior.drag().on("drag", function (r, s) {
            var a = e.xyi(d3.mouse(g.node()));
            a[0] = d3.round(a[0], 2), a[1] = d3.round(a[1], 2), t._clamp(a), t.props.onDragNob("regression", {
              pos: a,
              d: r,
              i: s
            })
          })), g.append("g").attr("class", "points").selectAll("g").data(this.props.points).enter().append("g").append("circle").attr("r", 4).style("fill", this.props.colorAccessor).style("pointer-events", "none"), this._updateDOM()
        },
        componentWillReceiveProps: function (t) {
          this.setState(this._updateStateFromProps(t)), this._updateDOM()
        },
        shouldComponentUpdate: function (t) {
          var e = t.points !== this.props.points || t.regressionPoints !== this.props.regressionPoints || t.betas !== this.props.betas || t.betas && this.props.betas && (t.betas[0] !== this.props.betas[0] || t.betas[1] !== this.props.betas[1]);
          return e
        },
        _clamp: function (t) {
          var e = this.state.x,
            r = this.state.y;
          return t[0] = Math.max(e.domain()[0], Math.min(e.domain()[1], t[0])), t[1] = Math.max(r.domain()[0], Math.min(r.domain()[1], t[1])), t
        },
        _updatePoints: function () {
          var t = this.props,
            e = t.locationAccessor,
            r = t.points,
            s = this.state.xy;
          this.sel().select(".points").selectAll("g").data(r).attr("transform", function (t) {
            return "translate(" + s(e(t)) + ")"
          })
        },
        _updateTrendLine: function () {
          var t = this.state,
            e = t.x,
            r = t.y,
            s = (t.req, t.rs),
            a = [e.domain()[0], s(e.domain()[0])],
            n = [e.domain()[1], s(e.domain()[1])];
          a[1] < r.domain()[0] ? a = [s.invert(r.domain()[0]), r.domain()[0]] : a[1] > r.domain()[1] && (a = [s.invert(r.domain()[1]), r.domain()[1]]), n[1] < r.domain()[0] ? n = [s.invert(r.domain()[0]), r.domain()[0]] : n[1] > r.domain()[1] && (n = [s.invert(r.domain()[1]), r.domain()[1]]), this.sel().select(".line-ols").attr({
            x1: e(a[0]),
            y1: r(a[1]),
            x2: e(n[0]),
            y2: r(n[1])
          })
        },
        _updateNobs: function () {
          var t = this.state,
            e = this.props,
            r = t.xy,
            s = e.locationAccessor,
            a = e.points,
            n = e.regressionPoints,
            o = e.showNobs;
          this.sel().select(".point-nobs").selectAll(".nob").data(a).attr("transform", function (t) {
            return "translate(" + r(s(t)) + ")"
          }).style({
            opacity: o ? 1 : 0,
            "pointer-events": o ? "auto" : "none"
          }), n && this.sel().select(".regression-nobs").selectAll(".nob").data(n).attr("transform", function (e) {
            return "translate(" + t.xy(e) + ")"
          })
        },
        _updateErrors: function () {
          var t = this.state,
            e = this.props,
            r = t.errors,
            s = t.x,
            a = t.y,
            n = t.reg,
            o = t.xy,
            i = e.locationAccessor;
          this.sel().select(".error-lines").selectAll("line").data(r).attr({
            x1: function (t) {
              return s(i(t.d)[0])
            },
            x2: function (t) {
              return s(i(t.d)[0])
            },
            y1: function (t) {
              return a(i(t.d)[1])
            },
            y2: function (t) {
              return a(i(t.d)[1] + t.err)
            }
          }), this.sel().select(".error-squares").selectAll("rect").data(r).attr("transform", function (t) {
            return "translate(" + o(i(t.d)) + ")"
          }).attr({
            x: function (t) {
              function e(e) {
                return t.apply(this, arguments)
              }
              return e.toString = function () {
                return t.toString()
              }, e
            }(function (t) {
              return n.b > 0 && t.err < 0 ? s(i(t.d)[1] + t.err) - s(i(t.d)[1]) : 0
            }),
            y: function (t) {
              function e(e) {
                return t.apply(this, arguments)
              }
              return e.toString = function () {
                return t.toString()
              }, e
            }(function (t) {
              return t.err < 0 ? 0 : a(i(t.d)[1] + t.err) - a(i(t.d)[1])
            }),
            width: function (t) {
              return Math.abs(s(i(t.d)[1] + t.err) - s(i(t.d)[1]))
            },
            height: function (t) {
              return Math.abs(a(i(t.d)[1] + t.err) - a(i(t.d)[1]))
            }
          })
        },
        _updateStateFromProps: function (t, e) {
          e = e || this.state;
          var r, s = (e.x, e.y, this.props.locationAccessor);
          r = "point" === t.mode ? this.props.betas ? {
            a: this.props.betas[0],
            b: this.props.betas[1]
          } : utils.ols(this.props.points, s) : function () {
            var e = t.regressionPoints[0][0],
              r = t.regressionPoints[0][1],
              s = t.regressionPoints[1][0],
              a = t.regressionPoints[1][1],
              n = a - r,
              o = s - e;
            Math.abs(o) < 1e-6 && (o = 1);
            var i = n / o,
              p = -i * e + r;
            return {
              a: p,
              b: i
            }
          }();
          var a = d3.scale.linear().domain([0, 1]).range([r.a, r.a + 1 * r.b]);
          return e.errors = t.points.map(function (t) {
            var e = s(t);
            return {
              err: a(e[0]) - e[1],
              d: t
            }
          }), e.reg = r, e.rs = a, e
        },
        _updateDOM: function () {
          this._updateTrendLine(), this._updatePoints(), this._updateNobs(), this._updateErrors()
        },
        render: function () {
          var t = _Object$assign({
            width: this.state.w + "px",
            height: this.state.h + "px",
            position: "relative"
          }, this.props.style || {});
          return React.createElement("div", {
            style: t
          })
        }
      });
    module.exports = LeastSquares;


  }, {
    "./buildNobs": 9,
    "./utils": 11,
    "alphaify": "alphaify",
    "babel-runtime/core-js/object/assign": 12,
    "color": "color",
    "d3": "d3",
    "puid": "puid",
    "react": "react"
  }],
  4: [function (require, module, exports) {
    "use strict";
    var React = require("react"),
      d3 = require("d3"),
      color = require("color"),
      utils = require("./utils"),
      LeastSquares = require("./LeastSquares.react"),
      OLS3D = require("./OLS3D.react"),
      Dial = require("./Dial.react"),
      style = require("./style"),
      LeastSquares3DModule = React.createClass({
        displayName: "LeastSquares3DModule",
        getInitialState: function () {
          var e = d3.scale.category10(),
            t = [
              [16, 10, 5],
              [13, 30, 23],
              [24, 20, 33],
              [43, 44, 32],
              [51, 52, 53],
              [84, 71, 65],
              [90, 80, 85]
            ].map(function (t, s) {
              return {
                point: t,
                color: e(s)
              }
            }),
            s = {
              points: t,
              width: 205,
              height: 205,
              dialHeight: 100,
              betas: this._getBetas(t),
              regressionPoints: {
                x1: [
                  [20, 20],
                  [80, 80]
                ],
                x2: [
                  [20, 20],
                  [80, 80]
                ]
              },
              regressionBetas: [50, 0, 0],
              regressionPlaneNob: {
                pos: [0, 0, 0],
                rot: [0, 0, 0]
              }
            };
          return s
        },
        _locationAccessorX1Y: function (e) {
          return [e.point[0], e.point[1]]
        },
        _locationAccessorX2Y: function (e) {
          return [e.point[2], e.point[1]]
        },
        _onDragPoint3: function (e, t) {
          t.point = e, this.setState({
            points: this.state.points.slice(0)
          })
        },
        _onDragPointX1Y: function (e, t) {
          var s = [t.pos[0], t.pos[1], t.d.point[2]];
          "point" === e && this._updatePoint(t.d, s)
        },
        _onDragPointX2Y: function (e, t) {
          var s = [t.d.point[0], t.pos[1], t.pos[0]];
          "point" === e && this._updatePoint(t.d, s)
        },
        _getBetas: function (e) {
          var t = e.map(function (e) {
              return [e.point[0], e.point[2]]
            }),
            s = e.map(function (e) {
              return e.point[1]
            });
          return utils.hessian(s, t)
        },
        _updatePoint: function (e, t) {
          var s = this.state.points.slice(0);
          e.point = t, this.setState({
            points: s,
            betas: this._getBetas(s)
          })
        },
        _updateRegressionBeta: function (e, t) {
          var s = this.state.regressionBetas.slice();
          s[e] = t, this.setState({
            regressionBetas: s
          })
        },
        _updateRegressionBeta0: function (e) {
          this._updateRegressionBeta(0, e)
        },
        _updateRegressionBeta1: function (e) {
          this._updateRegressionBeta(1, e)
        },
        _updateRegressionBeta2: function (e) {
          this._updateRegressionBeta(2, e)
        },
        _renderDial: function (e) {
          var t = this.state.dialHeight,
            s = 60,
            a = t / 2 + 6,
            i = t / 2;
          return React.createElement("g", null, React.createElement("text", {
            transform: "translate(" + e.posX + ", " + a + ")",
            textAnchor: "middle",
            style: style.dialFontSmall
          }, d3.format(".2f")(this.state.regressionBetas[e.betaIndex])), React.createElement(Dial, {
            transform: "translate(" + e.posX + ", " + i + ")",
            min: e.min,
            max: e.max,
            size: s,
            innerNobRadius: s / 4,
            value: this.state.regressionBetas[e.betaIndex],
            onChangeValue: this["_updateRegressionBeta" + e.betaIndex],
            wrapInSVG: !1
          }))
        },
        _renderDials: function () {
          var e = this.state.dialHeight,
            t = [75, 115, 155, 190, 305, 350, 385, 490],
            s = e / 2 + 8;
          return React.createElement("svg", {
            width: 620,
            height: e,
            style: style.dialDemo
          }, this._renderDial({
            posX: t[0],
            betaIndex: 0,
            min: -100,
            max: 100
          }), React.createElement("text", {
            transform: "translate(" + t[1] + ", " + s + ")",
            textAnchor: "middle",
            style: style.dialFont
          }, " + "), this._renderDial({
            posX: t[2],
            betaIndex: 1,
            min: -5,
            max: 5
          }), React.createElement("text", {
            transform: "translate(" + t[3] + "," + s + ")",
            textAnchor: "start",
            style: style.dialFont
          }, " * hand size "), React.createElement("text", {
            transform: "translate(" + t[4] + "," + s + ")",
            textAnchor: "middle",
            style: style.dialFont
          }, " + "), this._renderDial({
            posX: t[5],
            betaIndex: 2,
            min: -5,
            max: 5
          }), React.createElement("text", {
            transform: "translate(" + t[6] + "," + s + ")",
            textAnchor: "start",
            style: style.dialFont
          }, " * hand size "), React.createElement("text", {
            transform: "translate(" + t[7] + "," + s + ")",
            textAnchor: "start",
            style: style.dialFont
          }, " = height "))
        },
        render: function () {
          var e = {
              l: 20,
              t: 20,
              r: 20,
              b: 20
            },
            t = this.state,
            s = t.width,
            a = t.height,
            i = t.betas;
          return React.createElement("div", null, React.createElement("section", {
            key: "ls3d-1",
            style: {
              clear: "both",
              padding: 0,
              marginBottom: 60
            }
          }, React.createElement("p", null, "???????????????????????????????????????????????????????????????????????????????????????OLS?????????????????????????????????????????????????????????????????????????????????OLS??????????????????????????????????????????????????????????????????????????????????????????????????????????????????OLS??????????????????????????????????????????????????????????????????????????????????????????????????????"), React.createElement(LeastSquares, {
            key: "least-squares-x1-y",
            width: s,
            height: a,
            margins: e,
            betas: [i[0], i[1]],
            mode: "point",
            xAxisLabel: "x1",
            yAxisLabel: "y",
            showErrorSquares: !1,
            showErrorLines: !1,
            showRegressionLine: !0,
            points: this.state.points,
            locationAccessor: this._locationAccessorX1Y,
            onDragNob: this._onDragPointX1Y,
            style: {
              "float": "left"
            }
          }), React.createElement(LeastSquares, {
            key: "least-squares-x2-y",
            width: s,
            height: a,
            margins: e,
            betas: [i[0], i[2]],
            mode: "point",
            xAxisLabel: "x2",
            yAxisLabel: "",
            showErrorSquares: !1,
            showErrorLines: !1,
            showRegressionLine: !0,
            points: this.state.points,
            locationAccessor: this._locationAccessorX2Y,
            onDragNob: this._onDragPointX2Y,
            style: {
              "float": "left"
            }
          }), React.createElement(OLS3D, {
            width: s,
            height: a,
            showPointNobs: !1,
            regressionPlaneColor: color.primary,
            key: "least-squares-x1-x2-y",
            points: this.state.points,
            onDragPoint: this._onDragPoint3,
            style: {
              "float": "left"
            }
          }), React.createElement("div", {
            style: {
              clear: "both"
            }
          })), React.createElement("section", {
            key: "ls3d-2",
            style: {
              padding: 0,
              clear: "both",
              marginBottom: 60
            }
          }, React.createElement("p", null, "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"), React.createElement("p", null, "?????????????????????????????????betas?????????????????????????????????"), React.createElement("p", null, "???????????????OLS??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????"), this._renderDials(), React.createElement(LeastSquares, {
            key: "least-squares-x1-y-basis",
            width: s,
            height: a,
            margins: e,
            betas: [this.state.regressionBetas[0], this.state.regressionBetas[1]],
            mode: "point",
            xAxisLabel: "x1",
            yAxisLabel: "y",
            showErrorSquares: !1,
            showErrorLines: !1,
            showRegressionLin: !0,
            showNobs: !1,
            points: this.state.points,
            locationAccessor: this._locationAccessorX1Y,
            onDragNob: this._onDragPointX1Y,
            style: {
              "float": "left"
            }
          }), React.createElement(LeastSquares, {
            key: "least-squares-x2-y-basis",
            width: s,
            height: a,
            betas: [this.state.regressionBetas[0], this.state.regressionBetas[2]],
            mode: "point",
            margins: e,
            xAxisLabel: "x2",
            yAxisLabel: "",
            showErrorSquares: !1,
            showErrorLines: !1,
            showRegressionLine: !0,
            showNobs: !1,
            points: this.state.points,
            locationAccessor: this._locationAccessorX2Y,
            onDragNob: this._onDragPointX2Y,
            style: {
              "float": "left"
            }
          }), React.createElement(OLS3D, {
            key: "least-squares-x1-x2-y",
            width: s,
            height: a,
            showPointNobs: !1,
            regressionNob: this.state.regressionNob,
            regressionPlaneColor: color.primary,
            betas: this.state.regressionBetas,
            points: this.state.points,
            onDragPoint: this._onDragPoint3,
            style: {
              "float": "left"
            }
          }), React.createElement("div", {
            style: {
              clear: "both"
            }
          })))
        }
      });
    module.exports = LeastSquares3DModule;


  }, {
    "./Dial.react": 2,
    "./LeastSquares.react": 3,
    "./OLS3D.react": 6,
    "./style": 10,
    "./utils": 11,
    "color": "color",
    "d3": "d3",
    "react": "react"
  }],
  5: [function (require, module, exports) {
    "use strict";
    var d3 = require("d3"),
      React = require("react"),
      PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin"),
      MasonicSquares = React.createClass({
        displayName: "MasonicSquares",
        mixins: [PureRenderMixin],
        sel: function () {
          return d3.select(this.getDOMNode())
        },
        getDefaultProps: function () {
          return {
            valueAccessor: function (t) {
              return t.value
            },
            colorAccessor: function (t) {
              return t.color
            }
          }
        },
        getInitialState: function () {
          return this._updateStateFromProps(this.props, {})
        },
        _updateStateFromProps: function (t, e) {
          var t = this.props,
            r = d3.masonic().width(function (t) {
              return t.width
            }).height(function (t) {
              return t.height
            }).columnWidth(1).outerWidth(t.width).reset();
          return e.wrappedData = t.data.map(function (e, n) {
            var i = 4 * Math.sqrt(t.valueAccessor(e)),
              o = r({
                width: i,
                height: i
              });
            return o.id = n, o.color = t.colorAccessor(e), delete o.data, o
          }), e
        },
        componentWillReceiveProps: function (t) {
          this.setState(this._updateStateFromProps(t, this.state))
        },
        componentDidMount: function () {
          this._redraw()
        },
        componentDidUpdate: function () {
          this._redraw()
        },
        _redraw: function () {
          var t = this.sel().selectAll("rect").data(this.state.wrappedData);
          t.enter().append("rect"), t.exit().remove(), t.transition().ease("cubic-out").style("fill", function (t) {
            return t.color
          }).attr({
            x: function (t) {
              return t.x
            },
            y: function (t) {
              return t.y
            },
            width: function (t) {
              return t.width
            },
            height: function (t) {
              return t.height
            }
          })
        },
        render: function () {
          var t = this.props,
            e = t.width,
            r = t.height,
            n = t.style;
          return React.createElement("svg", {
            width: e,
            height: r,
            style: n
          })
        }
      });
    module.exports = MasonicSquares;


  }, {
    "d3": "d3",
    "react": "react",
    "react/lib/ReactComponentWithPureRenderMixin": 25
  }],
  6: [function (require, module, exports) {
    "use strict";
    var _Object$assign = require("babel-runtime/core-js/object/assign")["default"],
      assert = require("assert"),
      THREE = require("three");
    assert(THREE.OrbitControls, "THREE.OrbitControls not yet set");
    var d3 = require("d3"),
      React = require("react"),
      color = require("color"),
      utils = require("./utils"),
      buildNobs = require("./buildNobs"),
      OLS3D = React.createClass({
        displayName: "OLS3D",
        sel: function () {
          return d3.select(this.getDOMNode())
        },
        getDefaultProps: function () {
          return {
            width: 500,
            height: 400,
            errorSquareColor: color.primary,
            regressionPlaneColor: color.secondary,
            pointSize: .015,
            valueAccessor: function (e) {
              return e.value
            },
            colorAccessor: function (e) {
              return e.color
            },
            locationAccessor: function (e) {
              return e.point
            },
            onDragPoint: function () {
              return void 0
            },
            regressionNob: null,
            showPointNobs: !0,
            betas: null
          }
        },
        getInitialState: function () {
          var e = new THREE.Scene,
            t = new THREE.WebGLRenderer({
              alpha: !0,
              antialias: !0
            }),
            o = {
              betas: [0, 0, 0],
              scene: e,
              renderer: t,
              materials: {},
              geometries: {},
              objects: {},
              xScale: d3.scale.linear().domain([0, 100]).range([-.5, .5]),
              yScale: d3.scale.linear().domain([0, 100]).range([-.5, .5]),
              zScale: d3.scale.linear().domain([0, 100]).range([-.5, .5])
            };
          return this._updateStateFromProps(this.props, o)
        },
        _updateStateFromProps: function (e, t) {
          t = t || this.state, t.renderer.setSize(e.width, e.height), t.renderer.setPixelRatio(window.devicePixelRatio);
          var o = e.points.map(function (e) {
              return [e.point[0], e.point[2]]
            }),
            s = e.points.map(function (e) {
              return e.point[1]
            });
          return t.betas = e.betas || utils.hessian(s, o), this._updateNobData(e, t), t
        },
        _mouseToDevice: function (e) {
          var t = [];
          return t[0] = e[0] / this.props.width * 2 - 1, t[1] = 2 * -(e[1] / this.props.height) + 1, t
        },
        _deviceToMouse: function (e) {
          var t = [];
          return t[0] = (e[0] + 1) / 2 * this.props.width, t[1] = -(e[1] - 1) / 2 * this.props.height, t
        },
        _getPrediction: function (e, t) {
          var o = this.state;
          return o.betas[0] + o.betas[1] * e + o.betas[2] * t
        },
        componentDidMount: function () {
          var e = this,
            t = this.props,
            o = _Object$assign({}, this.state),
            s = t.width / t.height,
            r = d3.select(o.renderer.domElement);
          this.sel().node().appendChild(r.node()), r.on("mousedown", this._onMouseDown).on("mousemove", this._onMouseMove).on("mouseup", this._onMouseUp).style({
            position: "absolute",
            left: "0px",
            top: "0px"
          });
          var n = this.sel().append("svg").attr({
              width: t.width,
              height: t.height
            }).style({
              position: "absolute",
              left: "0px",
              top: "0px"
            }).style("pointer-events", "none").attr("class", "overlay"),
            i = new THREE.PerspectiveCamera(75, s, .1, 1e3);
          i.setLens(50), o.objects.camera = i;
          var a = new THREE.Vector3(0, 0, 3.3);
          a.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0), o.objects.camera.position.copy(a), o.objects.camera.lookAt(new THREE.Vector3(0, 0, 0));
          var c = new THREE.OrbitControls(i, o.renderer.domElement);
          c.noZoom = !0, c.noPan = !0, c.autoRotateSpeed = 1, c.autoRotate = !0, o.objects.controls = c, c.addEventListener("change", function () {
            e._updateNobData(t, e.state), e._updateNobs()
          });
          var p = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10, 8, 8), new THREE.MeshBasicMaterial({
            color: 0,
            opacity: .25,
            transparent: !0
          }));
          p.visible = !1, o.scene.add(p), o.objects.intersectPlane = p, o.objects.raycaster = new THREE.Raycaster, this._setupGrid(o), this._setupGridLabels(o), o.objects.pointGroup = new THREE.Object3D, o.scene.add(o.objects.pointGroup), o.geometries.point = new THREE.SphereGeometry(t.pointSize, 32, 32), this._setupRegressionPlane(o), this._setupErrorLines(o), this._setupErrorSquares(o), this._updateNobData(t, o), buildNobs(n, o.pointNobData, "point-nobs").call(d3.behavior.drag().on("dragstart", this._onDragStart).on("drag", this._onDrag).on("dragend", this._onDragEnd)).style("pointer-events", "auto"), this.setState(o), this._updateScene(), this._renderScene(), this._updateNobData(t, e.state), this._updateNobs(); {
            var l, u = 0;
            Math.PI / 8
          }
          d3.timer(function (t) {
            l = t - u, u = t, e._renderScene()
          })
        },
        componentWillReceiveProps: function (e) {
          this.setState(this._updateStateFromProps(e))
        },
        shouldComponentUpdate: function (e, t) {
          var o = !!(e.points !== this.props.points || e.betas && e.betas !== this.props.betas);
          return o
        },
        componentDidUpdate: function () {
          this._updateScene(), this._renderScene()
        },
        _setupGrid: function (e) {
          var t = .5,
            o = .1,
            s = new THREE.GridHelper(t, o),
            r = 0,
            n = 16185078,
            i = 1;
          s.position.y = -.5, s.setColors(r, n), s.material.opacity = i, e.scene.add(s), e.objects.gridHelperX = s, s = new THREE.GridHelper(t, o), s.position.x = -.5, s.rotation.z = Math.PI / 2, s.setColors(r, n), s.material.opacity = i, e.scene.add(s), e.objects.gridHelperY = s, s = new THREE.GridHelper(t, o), s.position.z = -.5, s.rotation.x = Math.PI / 2, s.setColors(r, n), s.material.opacity = i, e.scene.add(s), e.objects.gridHelperZ = s
        },
        _setupGridLabels: function (e) {
          function t(e, t, o, s) {
            var r = document.createElement("canvas"),
              n = 256,
              i = 256;
            r.width = n, r.height = i;
            var a = r.getContext("2d");
            a.fillStyle = "rgba(0,0,0,1)", a.font = "100 30px Lato, sans-serif", a.textAlign = "center", a.fillText(s, n / 2, i / 2 + 22);
            var c = new THREE.Texture(r);
            c.needsUpdate = !0;
            var p = new THREE.SpriteMaterial({
                map: c,
                color: 16777215
              }),
              l = new THREE.Sprite(p);
            return l.scale.set(.5, .5, 1), l.position.x = e, l.position.y = t, l.position.z = o, l
          }
          var o = new THREE.Object3D;
          d3.range(6).map(function (s) {
            var r = 20 * s,
              n = e.xScale(r),
              i = e.yScale(0) - .05,
              a = e.zScale(0) - .05;
            o.add(t(n, i, a, r))
          }), d3.range(5).map(function (s) {
            var r = 20 * s + 20,
              n = e.xScale(0) - .05,
              i = e.yScale(0) - .05,
              a = e.zScale(r);
            o.add(t(n, i, a, r))
          }), d3.range(5).map(function (s) {
            var r = 20 * s + 20,
              n = e.xScale(0) - .05,
              i = e.yScale(r),
              a = e.zScale(0) - .05;
            o.add(t(n, i, a, r))
          }), e.objects.gridLabelGroup = o, e.scene.add(o)
        },
        _setupRegressionPlane: function (e) {
          var t = e.geometries.plane = new THREE.Geometry;
          t.dynamic = !0, t.vertices.push(new THREE.Vector3(-.5, 0, -.5)), t.vertices.push(new THREE.Vector3(.5, 0, -.5)), t.vertices.push(new THREE.Vector3(.5, 0, .5)), t.vertices.push(new THREE.Vector3(-.5, 0, .5)), t.faces.push(new THREE.Face3(0, 1, 2)), t.faces.push(new THREE.Face3(2, 3, 0));
          var o = e.materials.plane = new THREE.MeshBasicMaterial({
            color: new THREE.Color(this.props.regressionPlaneColor).getHex(),
            side: THREE.DoubleSide,
            transparent: !0,
            depthTest: !0,
            opacity: .2
          });
          e.scene.add(e.objects.plane = new THREE.Mesh(t, o))
        },
        _setupErrorLines: function (e) {
          var t = (e.materials, e.geometries, e.materials.errorLines = new THREE.LineBasicMaterial({
              color: 16711680
            })),
            o = e.geometries.errorLines = new THREE.Geometry;
          o.dynamic = !0, e.objects.errorLines = new THREE.Line(o, t, THREE.LinePieces), e.scene.add(e.objects.errorLines)
        },
        _setupErrorSquares: function (e) {
          e.objects.errorSquaresGroup = new THREE.Object3D, e.scene.add(e.objects.errorSquaresGroup)
        },
        _updatePoints: function () {
          var e = this.props.points,
            t = this.state,
            o = t.objects.pointGroup;
          o.children.forEach(function (e) {
            o.remove(e), e.material.dispose()
          }), e.forEach(function (e) {
            var s = new THREE.MeshBasicMaterial({
                color: new THREE.Color(this.props.colorAccessor(e)).getHex()
              }),
              r = new THREE.Mesh(this.state.geometries.point, s);
            r.position.x = t.xScale(e.point[0]), r.position.y = t.yScale(e.point[1]), r.position.z = t.zScale(e.point[2]), r.userData = e, o.add(r)
          }, this)
        },
        _updateNobs: function () {
          var e = this;
          this.sel().select(".overlay").select(".point-nobs").selectAll(".nob").data(this.state.pointNobData).attr("transform", function (t) {
            return "translate(" + e._deviceToMouse(t.pos) + ")"
          })
        },
        _updateErrorLines: function () {
          var e = this.state,
            t = e.geometries.errorLines;
          t.vertices.splice(0, t.vertices.length), this.props.points.forEach(function (o) {
            var s = e.xScale(o.point[0]),
              r = e.yScale(o.point[1]),
              n = e.zScale(o.point[2]),
              i = e.yScale(this._getPrediction(o.point[0], o.point[2]));
            t.vertices.push(new THREE.Vector3(s, r, n)), t.vertices.push(new THREE.Vector3(s, i, n))
          }, this), t.verticesNeedUpdate = !0, t.computeLineDistances()
        },
        _updateErrorSquares: function () {
          var e = this.state,
            t = e.objects.errorSquaresGroup;
          t.children.forEach(function (e) {
            t.remove(e), e.geometry.dispose(), e.material.dispose()
          }), this.props.points.forEach(function (o) {
            var s = new THREE.Geometry,
              r = new THREE.MeshBasicMaterial({
                color: new THREE.Color(this.props.colorAccessor(o)).getHex(),
                side: THREE.DoubleSide,
                trasparent: !0,
                depthTest: !0,
                opacity: .8
              }),
              n = e.xScale(o.point[0]),
              i = e.yScale(o.point[1]),
              a = e.zScale(o.point[2]),
              c = e.yScale(this._getPrediction(o.point[0], o.point[2])),
              p = Math.abs(c - i);
            s.vertices.push(new THREE.Vector3(n, i, a)), s.vertices.push(new THREE.Vector3(n, c, a)), s.vertices.push(new THREE.Vector3(n + p, c, a)), s.vertices.push(new THREE.Vector3(n + p, i, a)), s.faces.push(new THREE.Face3(0, 1, 2)), s.faces.push(new THREE.Face3(0, 2, 3)), t.add(new THREE.Mesh(s, r))
          }, this)
        },
        _updateRegressionPlane: function () {
          for (var e = this.state, t = e.geometries.plane.vertices, o = e.betas, s = 0; 4 > s; s++) t[s].y = e.yScale(o[0] + o[1] * e.xScale.invert(t[s].x) + o[2] * e.zScale.invert(t[s].z));
          this.state.geometries.plane.verticesNeedUpdate = !0
        },
        _updateScene: function () {
          this._updatePoints(), this._updateNobs(), this._updateErrorLines(), this._updateErrorSquares(), this._updateRegressionPlane()
        },
        _updateNobData: function (e, t) {
          var o = t.objects.camera;
          o && e.showPointNobs ? t.pointNobData = e.points.map(function (e, s) {
            var r = [t.xScale(e.point[0]), t.yScale(e.point[1]), t.zScale(e.point[2])],
              n = (new THREE.Vector3).fromArray(r).project(o).toArray().slice(0, 2);
            return {
              pos: n,
              datum: e
            }
          }) : t.pointNobData = []
        },
        _onDragStart: function (e, t) {
          var o = this.state,
            s = o.objects.intersectPlane,
            r = (this._mouseToDevice(d3.mouse(this.sel().node())), this.state.objects.camera);
          o.objects.controls.enabled = !1, o.objects.controls.autoRotate = !1, s.position.fromArray([o.xScale(e.datum.point[0]), o.yScale(e.datum.point[1]), o.zScale(e.datum.point[2])]), s.lookAt(r.position)
        },
        _onDrag: function (e, t) {
          var o, s, r = this.state.objects.intersectPlane,
            n = new THREE.Vector2;
          return n.fromArray(this._mouseToDevice(d3.mouse(this.sel().node()))), this.state.objects.raycaster.setFromCamera(n, this.state.objects.camera), o = this.state.objects.raycaster.intersectObject(r), o.length ? (s = o[0].point.toArray(), s[0] = this.state.xScale.invert(s[0]), s[1] = this.state.yScale.invert(s[1]), s[2] = this.state.zScale.invert(s[2]), void this.props.onDragPoint(s, e.datum)) : void console.warn("warning: intersect plane on hit in mouse move")
        },
        _onDragEnd: function () {
          this.state.objects.controls.enabled = !0
        },
        _onMouseDown: function () {
          this.state.objects.controls.autoRotate = !1
        },
        _onMouseMove: function () {},
        _onMouseUp: function () {},
        _renderScene: function () {
          var e = this.state;
          e.objects.controls.update(), e.renderer.render(e.scene, e.objects.camera)
        },
        render: function () {
          var e = _Object$assign({
            width: this.props.width,
            height: this.props.height,
            position: "relative"
          }, this.props.style || {});
          return React.createElement("div", {
            style: e
          })
        }
      });
    module.exports = OLS3D;


  }, {
    "./buildNobs": 9,
    "./utils": 11,
    "assert": 20,
    "babel-runtime/core-js/object/assign": 12,
    "color": "color",
    "d3": "d3",
    "react": "react",
    "three": "three"
  }],
  7: [function (require, module, exports) {
    "use strict";
    var d3 = require("d3"),
      React = require("react"),
      style = require("./style"),
      utils = require("./utils"),
      Dial = require("./Dial.react"),
      LeastSquares = require("./LeastSquares.react"),
      MasonicSquares = require("./MasonicSquares.react"),
      RegressionAsNobsModule = React.createClass({
        displayName: "RegressionAsNobsModule",
        getDefaultProps: function () {
          return {
            onDragOLSNob: function () {
              return void 0
            },
            points: null
          }
        },
        getInitialState: function () {
          return this._updateStateFromProps(this.props, {
            betas: [0, 1]
          })
        },
        _updateStateFromProps: function (t, e) {
          var a = t.points,
            s = utils.wrapLeastSquaresErrors(a, function (t) {
              return t.point
            }, e.betas);
          return e.leastSquaresErrors = s, e
        },
        _updateBetas: function (t) {
          var e = this.props.points,
            a = utils.wrapLeastSquaresErrors(e, function (t) {
              return t.point
            }, t);
          this.setState({
            betas: t,
            leastSquaresErrors: a
          })
        },
        componentWillReceiveProps: function (t) {
          this.setState(this._updateStateFromProps(t, this.state))
        },
        _onChangeDialValueB0: function (t) {
          var e = this.state.betas;
          e[0] = t, this._updateBetas(e)
        },
        _onChangeDialValueB1: function (t) {
          var e = this.state.betas;
          e[1] = t, this._updateBetas(e)
        },
        render: function () {
          var t = 120;
          return React.createElement("section", {
            style: {
              padding: 0,
              marginBottom: 40
            }
          }, React.createElement("svg", {
            width: 620,
            height: t,
            style: style.dialDemo
          }, React.createElement("text", {
            transform: "translate(100, " + (t / 2 + 8) + ")",
            textAnchor: "middle",
            style: style.dialFont
          }, d3.format(".2f")(this.state.betas[0])), React.createElement(Dial, {
            min: -100,
            max: 100,
            transform: "translate(100, " + t / 2 + ")",
            value: this.state.betas[0],
            onChangeValue: this._onChangeDialValueB0,
            wrapInSVG: !1
          }), React.createElement("text", {
            transform: "translate(200, " + (t / 2 + 8) + ")",
            textAnchor: "middle",
            style: style.dialFont
          }, " + "), React.createElement("text", {
            transform: "translate(300, " + (t / 2 + 8) + ")",
            textAnchor: "middle",
            style: style.dialFont
          }, d3.format(".2f")(this.state.betas[1])), React.createElement(Dial, {
            min: -5,
            max: 5,
            transform: "translate(300, " + t / 2 + ")",
            value: this.state.betas[1],
            onChangeValue: this._onChangeDialValueB1,
            wrapInSVG: !1
          }), React.createElement("text", {
            transform: "translate(370, " + (t / 2 + 8) + ")",
            textAnchor: "start",
            style: style.dialFont
          }, " * hand size = height")), React.createElement("div", {
            style: {
              clear: "both"
            }
          }, React.createElement(LeastSquares, {
            width: 400,
            height: 400,
            style: {
              "float": "left"
            },
            points: this.props.points,
            betas: this.state.betas,
            colorAccessor: function (t) {
              return t.color
            },
            onDragNob: this.props.onDragOLSNob,
            mode: "point",
            showErrorSquares: !0,
            showNobs: !1,
            key: "least-squares-without-squares"
          }), React.createElement(MasonicSquares, {
            style: {
              "float": "left"
            },
            width: 500,
            height: 400,
            data: this.state.leastSquaresErrors,
            valueAccessor: this.props.leastSquaresValueAccessor,
            colorAccessor: this.props.leastSquaresColorAccessor
          })), React.createElement("div", {
            style: {
              clear: "both"
            }
          }))
        }
      });
    module.exports = RegressionAsNobsModule;


  }, {
    "./Dial.react": 2,
    "./LeastSquares.react": 3,
    "./MasonicSquares.react": 5,
    "./style": 10,
    "./utils": 11,
    "d3": "d3",
    "react": "react"
  }],
  8: [function (require, module, exports) {
    "use strict";
    var d3 = require("d3"),
      React = require("react"),
      PureRenderMixin = require("react/lib/ReactComponentWithPureRenderMixin"),
      alphaify = require("alphaify"),
      color = require("color"),
      SLRParameters = React.createClass({
        displayName: "SLRParameters",
        mixins: [PureRenderMixin],
        componentDidMount: function () {
          this._DOMWasUpdated()
        },
        componentDidUpdate: function () {
          this._DOMWasUpdated()
        },
        _DOMWasUpdated: function () {
          var e = this.getDOMNode().getBoundingClientRect(),
            t = this.refs.beta1Text.getDOMNode(),
            r = t.getClientRects()[0],
            a = (t.getComputedTextLength(), {
              x: r.left + r.width / 2 - e.left,
              y: r.top + r.height / 2 - e.top
            }),
            n = this.refs.beta2Text.getDOMNode(),
            i = n.getClientRects()[0],
            l = (n.getComputedTextLength(), {
              x: i.left + i.width / 2 - e.left,
              y: i.top + i.height / 2 - e.top
            });
          d3.select(this.refs.beta1Highlight.getDOMNode()).attr("transform", "translate(" + a.x + ", " + a.y + ")"), d3.select(this.refs.beta2Highlight.getDOMNode()).attr("transform", "translate(" + l.x + ", " + l.y + ")")
        },
        render: function () {
          return React.createElement("svg", {
            width: 310,
            height: 310
          }, React.createElement("g", {
            ref: "beta1Highlight"
          }, React.createElement("circle", {
            r: 25,
            style: {
              fill: alphaify(color.primary, .5)
            }
          }), React.createElement("line", {
            x1: 0,
            y1: -25,
            x2: 0,
            y2: -50,
            style: {
              stroke: color.primary
            }
          })), React.createElement("g", {
            ref: "beta2Highlight"
          }, React.createElement("circle", {
            r: 25,
            style: {
              fill: alphaify(color.secondary, .5)
            }
          }), React.createElement("line", {
            x1: 0,
            y1: 25,
            x2: 0,
            y2: 50,
            style: {
              stroke: color.secondary
            }
          })), React.createElement("g", {
            transform: "translate(160, 160)"
          }, React.createElement("text", {
            transform: "translate(-20, -60)",
            textAnchor: "middle",
            fontSize: 12,
            fill: color.primary
          }, "Beta 1 - The y-intercept of the regression line."), React.createElement("text", {
            transform: "translate(-20, 60)",
            textAnchor: "middle",
            fontSize: 12,
            fill: color.secondary
          }, "Beta 2 - The slope of the regression line."), React.createElement("text", {
            ref: "equation",
            transform: "translate(0, 0)",
            textAnchor: "middle",
            fontSize: "20px"
          }, React.createElement("tspan", {
            ref: "beta1Text"
          }, d3.format(".2f")(this.props.betas[0])), React.createElement("tspan", null, " + "), React.createElement("tspan", {
            ref: "beta2Text"
          }, d3.format(".2f")(this.props.betas[1])), React.createElement("tspan", null, " * hand size = height"))))
        }
      });
    module.exports = SLRParameters;


  }, {
    "alphaify": "alphaify",
    "color": "color",
    "d3": "d3",
    "react": "react",
    "react/lib/ReactComponentWithPureRenderMixin": 25
  }],
  9: [function (require, module, exports) {
    "use strict";
    module.exports = function (t, e, n) {
      function a(t) {
        t.transition().duration(1e3).ease("ease-out").attr({
          r: 25
        }).style({
          fill: "rgba(0, 0, 0, 0.2)"
        }).transition().ease("ease-in").duration(1e3).attr({
          r: 20
        }).style({
          fill: "rgba(0, 0, 0, 0.1)"
        }).each("end", function () {
          return a(d3.select(this))
        })
      }
      var r = t.append("g").attr("class", n).selectAll(".nob").data(e || []).enter().append("g").attr("class", "nob"),
        l = r.append("circle").attr("r", 20);
      return l.call(a).on("mousedown", function () {
        d3.selectAll(".nob").select("circle").transition().each("end", null).transition().duration(1e3).ease("ease-out").attr({
          r: 20
        }).style({
          fill: "rgba(0, 0, 0, 0.1)"
        })
      }), r
    };


  }, {}],
  10: [function (require, module, exports) {
    "use strict";
    var style = module.exports = {
      dialDemoStyle: {
        backgroundColor: "rgba(0, 0, 0, 0)"
      },
      dialFont: {
        pointerEvents: "none",
        fontSize: 20
      },
      dialFontSmall: {
        pointerEvents: "none",
        fontSize: 14
      },
      tutorialVideo: {
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
      }
    };


  }, {}],
  11: [function (require, module, exports) {
    "use strict";
    var numeric = require("numeric"),
      utils = module.exports = {
        ols: function (r, n) {
          var e = r.map(n || function (r) {
              return r
            }),
            t = d3.mean(e, function (r) {
              return r[0]
            }),
            u = d3.mean(e, function (r) {
              return r[1]
            }),
            a = e.reduce(function (r, n) {
              return r + (n[0] - t) * (n[1] - u)
            }, 0),
            i = e.reduce(function (r, n) {
              return r + Math.pow(n[0] - t, 2)
            }, 0),
            o = a / i,
            c = u - o * t;
          return {
            a: c,
            b: o
          }
        },
        hessian: function (r, n) {
          var e, t = n.length,
            u = (n[0].length + 1, []);
          for (e = 0; t > e; e++) u[e] = [1].concat(n[e]);
          var a = numeric.transpose(u),
            i = numeric.dot(a, u);
          return numeric.dot(numeric.dot(numeric.inv(i), a), r)
        },
        wrapLeastSquaresErrors: function (r, n, e) {
          var t = e ? {
              a: e[0],
              b: e[1]
            } : utils.ols(r, n),
            u = d3.scale.linear().domain([0, 1]).range([t.a, t.a + 1 * t.b]);
          return r.map(function (r) {
            var e = n(r),
              t = Math.abs(u(e[0]) - e[1]);
            return t *= t, {
              error: t,
              d: r
            }
          })
        }
      };


  }, {
    "numeric": "numeric"
  }],
  12: [function (require, module, exports) {
    module.exports = {
      "default": require("core-js/library/fn/object/assign"),
      __esModule: !0
    };


  }, {
    "core-js/library/fn/object/assign": 14
  }],
  13: [function (require, module, exports) {
    "use strict";
    var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];
    exports["default"] = _Object$assign || function (e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s])
      }
      return e
    }, exports.__esModule = !0;


  }, {
    "babel-runtime/core-js/object/assign": 12
  }],
  14: [function (require, module, exports) {
    require("../../modules/es6.object.assign"), module.exports = require("../../modules/$").core.Object.assign;


  }, {
    "../../modules/$": 18,
    "../../modules/es6.object.assign": 19
  }],
  15: [function (require, module, exports) {
    var $ = require("./$");
    module.exports = Object.assign || function (e, r) {
      for (var t = Object($.assertDefined(e)), n = arguments.length, s = 1; n > s;)
        for (var a, g = $.ES5Object(arguments[s++]), u = $.getKeys(g), o = u.length, c = 0; o > c;) t[a = u[c++]] = g[a];
      return t
    };


  }, {
    "./$": 18
  }],
  16: [function (require, module, exports) {
    function ctx(e, n) {
      return function () {
        return e.apply(n, arguments)
      }
    }

    function $def(e, n, o) {
      var t, f, i, r, c = e & $def.G,
        d = c ? global : e & $def.S ? global[n] : (global[n] || {}).prototype,
        u = c ? core : core[n] || (core[n] = {});
      c && (o = n);
      for (t in o) f = !(e & $def.F) && d && t in d, f && t in u || (i = f ? d[t] : o[t], c && !isFunction(d[t]) ? r = o[t] : e & $def.B && f ? r = ctx(i, global) : e & $def.W && d[t] == i ? ! function (e) {
        r = function (n) {
          return this instanceof e ? new e(n) : e(n)
        }, r.prototype = e.prototype
      }(i) : r = e & $def.P && isFunction(i) ? ctx(Function.call, i) : i, $.hide(u, t, r))
    }
    var $ = require("./$"),
      global = $.g,
      core = $.core,
      isFunction = $.isFunction;
    $def.F = 1, $def.G = 2, $def.S = 4, $def.P = 8, $def.B = 16, $def.W = 32, module.exports = $def;


  }, {
    "./$": 18
  }],
  17: [function (require, module, exports) {
    module.exports = function (e) {
      return e.FW = !1, e.path = e.core, e
    };


  }, {}],
  18: [function (require, module, exports) {
    "use strict";

    function toInteger(e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? floor : ceil)(e)
    }

    function desc(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      }
    }

    function simpleSet(e, t, n) {
      return e[t] = n, e
    }

    function createDefiner(e) {
      return DESC ? function (t, n, r) {
        return $.setDesc(t, n, desc(e, r))
      } : simpleSet
    }

    function isObject(e) {
      return null !== e && ("object" == typeof e || "function" == typeof e)
    }

    function isFunction(e) {
      return "function" == typeof e
    }

    function assertDefined(e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e
    }
    var global = "undefined" != typeof self ? self : Function("return this")(),
      core = {},
      defineProperty = Object.defineProperty,
      hasOwnProperty = {}.hasOwnProperty,
      ceil = Math.ceil,
      floor = Math.floor,
      max = Math.max,
      min = Math.min,
      DESC = !! function () {
        try {
          return 2 == defineProperty({}, "a", {
            get: function () {
              return 2
            }
          }).a
        } catch (e) {}
      }(),
      hide = createDefiner(1),
      $ = module.exports = require("./$.fw")({
        g: global,
        core: core,
        html: global.document && document.documentElement,
        isObject: isObject,
        isFunction: isFunction,
        it: function (e) {
          return e
        },
        that: function () {
          return this
        },
        toInteger: toInteger,
        toLength: function (e) {
          return e > 0 ? min(toInteger(e), 9007199254740991) : 0
        },
        toIndex: function (e, t) {
          return e = toInteger(e), 0 > e ? max(e + t, 0) : min(e, t)
        },
        has: function (e, t) {
          return hasOwnProperty.call(e, t)
        },
        create: Object.create,
        getProto: Object.getPrototypeOf,
        DESC: DESC,
        desc: desc,
        getDesc: Object.getOwnPropertyDescriptor,
        setDesc: defineProperty,
        getKeys: Object.keys,
        getNames: Object.getOwnPropertyNames,
        getSymbols: Object.getOwnPropertySymbols,
        assertDefined: assertDefined,
        ES5Object: Object,
        toObject: function (e) {
          return $.ES5Object(assertDefined(e))
        },
        hide: hide,
        def: createDefiner(0),
        set: global.Symbol ? simpleSet : hide,
        mix: function (e, t) {
          for (var n in t) hide(e, n, t[n]);
          return e
        },
        each: [].forEach
      });
    "undefined" != typeof __e && (__e = core), "undefined" != typeof __g && (__g = global);


  }, {
    "./$.fw": 17
  }],
  19: [function (require, module, exports) {
    var $def = require("./$.def");
    $def($def.S, "Object", {
      assign: require("./$.assign")
    });


  }, {
    "./$.assign": 15,
    "./$.def": 16
  }],
  20: [function (require, module, exports) {
    function replacer(t, e) {
      return util.isUndefined(e) ? "" + e : util.isNumber(e) && !isFinite(e) ? e.toString() : util.isFunction(e) || util.isRegExp(e) ? e.toString() : e
    }

    function truncate(t, e) {
      return util.isString(t) ? t.length < e ? t : t.slice(0, e) : t
    }

    function getMessage(t) {
      return truncate(JSON.stringify(t.actual, replacer), 128) + " " + t.operator + " " + truncate(JSON.stringify(t.expected, replacer), 128)
    }

    function fail(t, e, r, i, s) {
      throw new assert.AssertionError({
        message: r,
        actual: t,
        expected: e,
        operator: i,
        stackStartFunction: s
      })
    }

    function ok(t, e) {
      t || fail(t, !0, e, "==", assert.ok)
    }

    function _deepEqual(t, e) {
      if (t === e) return !0;
      if (util.isBuffer(t) && util.isBuffer(e)) {
        if (t.length != e.length) return !1;
        for (var r = 0; r < t.length; r++)
          if (t[r] !== e[r]) return !1;
        return !0
      }
      return util.isDate(t) && util.isDate(e) ? t.getTime() === e.getTime() : util.isRegExp(t) && util.isRegExp(e) ? t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase : util.isObject(t) || util.isObject(e) ? objEquiv(t, e) : t == e
    }

    function isArguments(t) {
      return "[object Arguments]" == Object.prototype.toString.call(t)
    }

    function objEquiv(t, e) {
      if (util.isNullOrUndefined(t) || util.isNullOrUndefined(e)) return !1;
      if (t.prototype !== e.prototype) return !1;
      if (util.isPrimitive(t) || util.isPrimitive(e)) return t === e;
      var r = isArguments(t),
        i = isArguments(e);
      if (r && !i || !r && i) return !1;
      if (r) return t = pSlice.call(t), e = pSlice.call(e), _deepEqual(t, e);
      var s, n, a = objectKeys(t),
        u = objectKeys(e);
      if (a.length != u.length) return !1;
      for (a.sort(), u.sort(), n = a.length - 1; n >= 0; n--)
        if (a[n] != u[n]) return !1;
      for (n = a.length - 1; n >= 0; n--)
        if (s = a[n], !_deepEqual(t[s], e[s])) return !1;
      return !0
    }

    function expectedException(t, e) {
      return t && e ? "[object RegExp]" == Object.prototype.toString.call(e) ? e.test(t) : t instanceof e ? !0 : e.call({}, t) === !0 ? !0 : !1 : !1
    }

    function _throws(t, e, r, i) {
      var s;
      util.isString(r) && (i = r, r = null);
      try {
        e()
      } catch (n) {
        s = n
      }
      if (i = (r && r.name ? " (" + r.name + ")." : ".") + (i ? " " + i : "."), t && !s && fail(s, r, "Missing expected exception" + i), !t && expectedException(s, r) && fail(s, r, "Got unwanted exception" + i), t && s && r && !expectedException(s, r) || !t && s) throw s
    }
    var util = require("util/"),
      pSlice = Array.prototype.slice,
      hasOwn = Object.prototype.hasOwnProperty,
      assert = module.exports = ok;
    assert.AssertionError = function (t) {
      this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = getMessage(this), this.generatedMessage = !0);
      var e = t.stackStartFunction || fail;
      if (Error.captureStackTrace) Error.captureStackTrace(this, e);
      else {
        var r = new Error;
        if (r.stack) {
          var i = r.stack,
            s = e.name,
            n = i.indexOf("\n" + s);
          if (n >= 0) {
            var a = i.indexOf("\n", n + 1);
            i = i.substring(a + 1)
          }
          this.stack = i
        }
      }
    }, util.inherits(assert.AssertionError, Error), assert.fail = fail, assert.ok = ok, assert.equal = function (t, e, r) {
      t != e && fail(t, e, r, "==", assert.equal)
    }, assert.notEqual = function (t, e, r) {
      t == e && fail(t, e, r, "!=", assert.notEqual)
    }, assert.deepEqual = function (t, e, r) {
      _deepEqual(t, e) || fail(t, e, r, "deepEqual", assert.deepEqual)
    }, assert.notDeepEqual = function (t, e, r) {
      _deepEqual(t, e) && fail(t, e, r, "notDeepEqual", assert.notDeepEqual)
    }, assert.strictEqual = function (t, e, r) {
      t !== e && fail(t, e, r, "===", assert.strictEqual)
    }, assert.notStrictEqual = function (t, e, r) {
      t === e && fail(t, e, r, "!==", assert.notStrictEqual)
    }, assert["throws"] = function (t, e, r) {
      _throws.apply(this, [!0].concat(pSlice.call(arguments)))
    }, assert.doesNotThrow = function (t, e) {
      _throws.apply(this, [!1].concat(pSlice.call(arguments)))
    }, assert.ifError = function (t) {
      if (t) throw t
    };
    var objectKeys = Object.keys || function (t) {
      var e = [];
      for (var r in t) hasOwn.call(t, r) && e.push(r);
      return e
    };


  }, {
    "util/": 24
  }],
  21: [function (require, module, exports) {
    "function" == typeof Object.create ? module.exports = function (t, e) {
      t.super_ = e, t.prototype = Object.create(e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })
    } : module.exports = function (t, e) {
      t.super_ = e;
      var o = function () {};
      o.prototype = e.prototype, t.prototype = new o, t.prototype.constructor = t
    };


  }, {}],
  22: [function (require, module, exports) {
    function drainQueue() {
      if (!draining) {
        draining = !0;
        for (var e, o = queue.length; o;) {
          e = queue, queue = [];
          for (var r = -1; ++r < o;) e[r]();
          o = queue.length
        }
        draining = !1
      }
    }

    function noop() {}
    var process = module.exports = {},
      queue = [],
      draining = !1;
    process.nextTick = function (e) {
      queue.push(e), draining || setTimeout(drainQueue, 0)
    }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.binding = function (e) {
      throw new Error("process.binding is not supported")
    }, process.cwd = function () {
      return "/"
    }, process.chdir = function (e) {
      throw new Error("process.chdir is not supported")
    }, process.umask = function () {
      return 0
    };


  }, {}],
  23: [function (require, module, exports) {
    module.exports = function (o) {
      return o && "object" == typeof o && "function" == typeof o.copy && "function" == typeof o.fill && "function" == typeof o.readUInt8
    };


  }, {}],
  24: [function (require, module, exports) {
    (function (process, global) {
      function inspect(e, r) {
        var t = {
          seen: [],
          stylize: stylizeNoColor
        };
        return arguments.length >= 3 && (t.depth = arguments[2]), arguments.length >= 4 && (t.colors = arguments[3]), isBoolean(r) ? t.showHidden = r : r && exports._extend(t, r), isUndefined(t.showHidden) && (t.showHidden = !1), isUndefined(t.depth) && (t.depth = 2), isUndefined(t.colors) && (t.colors = !1), isUndefined(t.customInspect) && (t.customInspect = !0), t.colors && (t.stylize = stylizeWithColor), formatValue(t, e, t.depth)
      }

      function stylizeWithColor(e, r) {
        var t = inspect.styles[r];
        return t ? "[" + inspect.colors[t][0] + "m" + e + "[" + inspect.colors[t][1] + "m" : e
      }

      function stylizeNoColor(e, r) {
        return e
      }

      function arrayToHash(e) {
        var r = {};
        return e.forEach(function (e, t) {
          r[e] = !0
        }), r
      }

      function formatValue(e, r, t) {
        if (e.customInspect && r && isFunction(r.inspect) && r.inspect !== exports.inspect && (!r.constructor || r.constructor.prototype !== r)) {
          var n = r.inspect(t, e);
          return isString(n) || (n = formatValue(e, n, t)), n
        }
        var i = formatPrimitive(e, r);
        if (i) return i;
        var o = Object.keys(r),
          s = arrayToHash(o);
        if (e.showHidden && (o = Object.getOwnPropertyNames(r)), isError(r) && (o.indexOf("message") >= 0 || o.indexOf("description") >= 0)) return formatError(r);
        if (0 === o.length) {
          if (isFunction(r)) {
            var u = r.name ? ": " + r.name : "";
            return e.stylize("[Function" + u + "]", "special")
          }
          if (isRegExp(r)) return e.stylize(RegExp.prototype.toString.call(r), "regexp");
          if (isDate(r)) return e.stylize(Date.prototype.toString.call(r), "date");
          if (isError(r)) return formatError(r)
        }
        var a = "",
          c = !1,
          l = ["{", "}"];
        if (isArray(r) && (c = !0, l = ["[", "]"]), isFunction(r)) {
          var p = r.name ? ": " + r.name : "";
          a = " [Function" + p + "]"
        }
        if (isRegExp(r) && (a = " " + RegExp.prototype.toString.call(r)), isDate(r) && (a = " " + Date.prototype.toUTCString.call(r)), isError(r) && (a = " " + formatError(r)), 0 === o.length && (!c || 0 == r.length)) return l[0] + a + l[1];
        if (0 > t) return isRegExp(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special");
        e.seen.push(r);
        var f;
        return f = c ? formatArray(e, r, t, s, o) : o.map(function (n) {
          return formatProperty(e, r, t, s, n, c)
        }), e.seen.pop(), reduceToSingleString(f, a, l)
      }

      function formatPrimitive(e, r) {
        if (isUndefined(r)) return e.stylize("undefined", "undefined");
        if (isString(r)) {
          var t = "'" + JSON.stringify(r).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return e.stylize(t, "string")
        }
        return isNumber(r) ? e.stylize("" + r, "number") : isBoolean(r) ? e.stylize("" + r, "boolean") : isNull(r) ? e.stylize("null", "null") : void 0
      }

      function formatError(e) {
        return "[" + Error.prototype.toString.call(e) + "]"
      }

      function formatArray(e, r, t, n, i) {
        for (var o = [], s = 0, u = r.length; u > s; ++s) o.push(hasOwnProperty(r, String(s)) ? formatProperty(e, r, t, n, String(s), !0) : "");
        return i.forEach(function (i) {
          i.match(/^\d+$/) || o.push(formatProperty(e, r, t, n, i, !0))
        }), o
      }

      function formatProperty(e, r, t, n, i, o) {
        var s, u, a;
        if (a = Object.getOwnPropertyDescriptor(r, i) || {
            value: r[i]
          }, a.get ? u = a.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : a.set && (u = e.stylize("[Setter]", "special")), hasOwnProperty(n, i) || (s = "[" + i + "]"), u || (e.seen.indexOf(a.value) < 0 ? (u = isNull(t) ? formatValue(e, a.value, null) : formatValue(e, a.value, t - 1), u.indexOf("\n") > -1 && (u = o ? u.split("\n").map(function (e) {
            return "  " + e
          }).join("\n").substr(2) : "\n" + u.split("\n").map(function (e) {
            return "   " + e
          }).join("\n"))) : u = e.stylize("[Circular]", "special")), isUndefined(s)) {
          if (o && i.match(/^\d+$/)) return u;
          s = JSON.stringify("" + i), s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (s = s.substr(1, s.length - 2), s = e.stylize(s, "name")) : (s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), s = e.stylize(s, "string"))
        }
        return s + ": " + u
      }

      function reduceToSingleString(e, r, t) {
        var n = 0,
          i = e.reduce(function (e, r) {
            return n++, r.indexOf("\n") >= 0 && n++, e + r.replace(/\u001b\[\d\d?m/g, "").length + 1
          }, 0);
        return i > 60 ? t[0] + ("" === r ? "" : r + "\n ") + " " + e.join(",\n  ") + " " + t[1] : t[0] + r + " " + e.join(", ") + " " + t[1]
      }

      function isArray(e) {
        return Array.isArray(e)
      }

      function isBoolean(e) {
        return "boolean" == typeof e
      }

      function isNull(e) {
        return null === e
      }

      function isNullOrUndefined(e) {
        return null == e
      }

      function isNumber(e) {
        return "number" == typeof e
      }

      function isString(e) {
        return "string" == typeof e
      }

      function isSymbol(e) {
        return "symbol" == typeof e
      }

      function isUndefined(e) {
        return void 0 === e
      }

      function isRegExp(e) {
        return isObject(e) && "[object RegExp]" === objectToString(e)
      }

      function isObject(e) {
        return "object" == typeof e && null !== e
      }

      function isDate(e) {
        return isObject(e) && "[object Date]" === objectToString(e)
      }

      function isError(e) {
        return isObject(e) && ("[object Error]" === objectToString(e) || e instanceof Error)
      }

      function isFunction(e) {
        return "function" == typeof e
      }

      function isPrimitive(e) {
        return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || "undefined" == typeof e
      }

      function objectToString(e) {
        return Object.prototype.toString.call(e)
      }

      function pad(e) {
        return 10 > e ? "0" + e.toString(10) : e.toString(10)
      }

      function timestamp() {
        var e = new Date,
          r = [pad(e.getHours()), pad(e.getMinutes()), pad(e.getSeconds())].join(":");
        return [e.getDate(), months[e.getMonth()], r].join(" ")
      }

      function hasOwnProperty(e, r) {
        return Object.prototype.hasOwnProperty.call(e, r)
      }
      var formatRegExp = /%[sdj%]/g;
      exports.format = function (e) {
        if (!isString(e)) {
          for (var r = [], t = 0; t < arguments.length; t++) r.push(inspect(arguments[t]));
          return r.join(" ")
        }
        for (var t = 1, n = arguments, i = n.length, o = String(e).replace(formatRegExp, function (e) {
            if ("%%" === e) return "%";
            if (t >= i) return e;
            switch (e) {
              case "%s":
                return String(n[t++]);
              case "%d":
                return Number(n[t++]);
              case "%j":
                try {
                  return JSON.stringify(n[t++])
                } catch (r) {
                  return "[Circular]"
                }
              default:
                return e
            }
          }), s = n[t]; i > t; s = n[++t]) o += isNull(s) || !isObject(s) ? " " + s : " " + inspect(s);
        return o
      }, exports.deprecate = function (e, r) {
        function t() {
          if (!n) {
            if (process.throwDeprecation) throw new Error(r);
            process.traceDeprecation ? console.trace(r) : console.error(r), n = !0
          }
          return e.apply(this, arguments)
        }
        if (isUndefined(global.process)) return function () {
          return exports.deprecate(e, r).apply(this, arguments)
        };
        if (process.noDeprecation === !0) return e;
        var n = !1;
        return t
      };
      var debugs = {},
        debugEnviron;
      exports.debuglog = function (e) {
        if (isUndefined(debugEnviron) && (debugEnviron = process.env.NODE_DEBUG || ""), e = e.toUpperCase(), !debugs[e])
          if (new RegExp("\\b" + e + "\\b", "i").test(debugEnviron)) {
            var r = process.pid;
            debugs[e] = function () {
              var t = exports.format.apply(exports, arguments);
              console.error("%s %d: %s", e, r, t)
            }
          } else debugs[e] = function () {};
        return debugs[e]
      }, exports.inspect = inspect, inspect.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
      }, inspect.styles = {
        special: "cyan",
        number: "yellow",
        "boolean": "yellow",
        undefined: "grey",
        "null": "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
      }, exports.isArray = isArray, exports.isBoolean = isBoolean, exports.isNull = isNull, exports.isNullOrUndefined = isNullOrUndefined, exports.isNumber = isNumber, exports.isString = isString, exports.isSymbol = isSymbol, exports.isUndefined = isUndefined, exports.isRegExp = isRegExp, exports.isObject = isObject, exports.isDate = isDate, exports.isError = isError, exports.isFunction = isFunction, exports.isPrimitive = isPrimitive, exports.isBuffer = require("./support/isBuffer");
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      exports.log = function () {
        console.log("%s - %s", timestamp(), exports.format.apply(exports, arguments))
      }, exports.inherits = require("inherits"), exports._extend = function (e, r) {
        if (!r || !isObject(r)) return e;
        for (var t = Object.keys(r), n = t.length; n--;) e[t[n]] = r[t[n]];
        return e
      };


    }).call(this, require('_process'), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

  }, {
    "./support/isBuffer": 23,
    "_process": 22,
    "inherits": 21
  }],
  25: [function (require, module, exports) {
    "use strict";
    var shallowEqual = require("./shallowEqual"),
      ReactComponentWithPureRenderMixin = {
        shouldComponentUpdate: function (e, t) {
          return !shallowEqual(this.props, e) || !shallowEqual(this.state, t)
        }
      };
    module.exports = ReactComponentWithPureRenderMixin;


  }, {
    "./shallowEqual": 26
  }],
  26: [function (require, module, exports) {
    "use strict";

    function shallowEqual(r, n) {
      if (r === n) return !0;
      var t;
      for (t in r)
        if (r.hasOwnProperty(t) && (!n.hasOwnProperty(t) || r[t] !== n[t])) return !1;
      for (t in n)
        if (n.hasOwnProperty(t) && !r.hasOwnProperty(t)) return !1;
      return !0
    }
    module.exports = shallowEqual;


  }, {}]
}, {}, [1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvdmljdG9ycG93ZWxsL0RvY3VtZW50cy9wcm9qZWN0cy9ldi9jbGllbnQvZXhwbGFuYXRpb25zL29yZGluYXJ5LWxlYXN0LXNxdWFyZXMtcmVncmVzc2lvbi9zcmMvbWFpbi5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L2NsaWVudC9leHBsYW5hdGlvbnMvb3JkaW5hcnktbGVhc3Qtc3F1YXJlcy1yZWdyZXNzaW9uL3NyYy9EaWFsLnJlYWN0LmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvY2xpZW50L2V4cGxhbmF0aW9ucy9vcmRpbmFyeS1sZWFzdC1zcXVhcmVzLXJlZ3Jlc3Npb24vc3JjL0xlYXN0U3F1YXJlcy5yZWFjdC5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L2NsaWVudC9leHBsYW5hdGlvbnMvb3JkaW5hcnktbGVhc3Qtc3F1YXJlcy1yZWdyZXNzaW9uL3NyYy9MZWFzdFNxdWFyZXMzRE1vZHVsZS5yZWFjdC5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L2NsaWVudC9leHBsYW5hdGlvbnMvb3JkaW5hcnktbGVhc3Qtc3F1YXJlcy1yZWdyZXNzaW9uL3NyYy9NYXNvbmljU3F1YXJlcy5yZWFjdC5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L2NsaWVudC9leHBsYW5hdGlvbnMvb3JkaW5hcnktbGVhc3Qtc3F1YXJlcy1yZWdyZXNzaW9uL3NyYy9PTFMzRC5yZWFjdC5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L2NsaWVudC9leHBsYW5hdGlvbnMvb3JkaW5hcnktbGVhc3Qtc3F1YXJlcy1yZWdyZXNzaW9uL3NyYy9SZWdyZXNzaW9uQXNOb2JzTW9kdWxlLnJlYWN0LmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvY2xpZW50L2V4cGxhbmF0aW9ucy9vcmRpbmFyeS1sZWFzdC1zcXVhcmVzLXJlZ3Jlc3Npb24vc3JjL1NMUlBhcmFtZXRlcnMucmVhY3QuanMiLCIvVXNlcnMvdmljdG9ycG93ZWxsL0RvY3VtZW50cy9wcm9qZWN0cy9ldi9jbGllbnQvZXhwbGFuYXRpb25zL29yZGluYXJ5LWxlYXN0LXNxdWFyZXMtcmVncmVzc2lvbi9zcmMvYnVpbGROb2JzLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvY2xpZW50L2V4cGxhbmF0aW9ucy9vcmRpbmFyeS1sZWFzdC1zcXVhcmVzLXJlZ3Jlc3Npb24vc3JjL3N0eWxlLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvY2xpZW50L2V4cGxhbmF0aW9ucy9vcmRpbmFyeS1sZWFzdC1zcXVhcmVzLXJlZ3Jlc3Npb24vc3JjL3V0aWxzLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYXNzaWduLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZncuanMiLCIvVXNlcnMvdmljdG9ycG93ZWxsL0RvY3VtZW50cy9wcm9qZWN0cy9ldi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIi9Vc2Vycy92aWN0b3Jwb3dlbGwvRG9jdW1lbnRzL3Byb2plY3RzL2V2L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9hc3NlcnQvYXNzZXJ0LmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luaGVyaXRzL2luaGVyaXRzX2Jyb3dzZXIuanMiLCIvVXNlcnMvdmljdG9ycG93ZWxsL0RvY3VtZW50cy9wcm9qZWN0cy9ldi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCIvVXNlcnMvdmljdG9ycG93ZWxsL0RvY3VtZW50cy9wcm9qZWN0cy9ldi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIiwiL1VzZXJzL3ZpY3RvcnBvd2VsbC9Eb2N1bWVudHMvcHJvamVjdHMvZXYvbm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4uanMiLCIvVXNlcnMvdmljdG9ycG93ZWxsL0RvY3VtZW50cy9wcm9qZWN0cy9ldi9ub2RlX21vZHVsZXMvcmVhY3QvbGliL3NoYWxsb3dFcXVhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQUFHWixDQUhZLEdBR1IsT0FBUSxRQUFRLFFBRXBCLFNBQVEsaUJBQWlCLE9BRXpCLFFBQVEscUJBQXFCLE1BQzdCLElBQUksSUFBSyxRQUFRLEtBRWpCLFNBQVEsY0FBYyxHQUN0QixJQUFJLE9BQVEsUUFBUSxTQUdoQixNQUFRLFFBQVEsU0FDaEIsU0FBVyxRQUFRLFlBR25CLE1BQVEsUUFBUSxXQUNoQixNQUFRLFFBQVEsV0FDaEIsYUFBZSxRQUFRLHdCQUN2QixxQkFBdUIsUUFBUSxnQ0FDL0IsdUJBQXlCLFFBQVEsa0NBQ2pDLGNBQWdCLFFBQVEseUJBRXhCLElBQU0sTUFBTSwrQkFDZCxnQkFBZSxXQUNiLEdBQUksR0FBUSxHQUFHLE1BQU0sYUFDakIsSUFDRCxHQUFLLElBQ0wsR0FBSSxLQUNKLEdBQUksS0FDSixHQUFJLEtBQ0osR0FBSSxLQUNKLEdBQUksS0FDSixHQUFJLEtBQ0wsSUFBSSxTQUFTLEVBQU8sR0FBSyxPQUFTLE1BQU8sRUFBTyxNQUFPLEVBQU0sTUFDM0QsR0FDRixtQkFBb0IsRUFDcEIsbUJBQW9CLEdBQUksS0FBTSxHQUFJLEtBQ2xDLE1BQU8sS0FBSyxVQUFVLEdBQ3RCLG1CQUFvQixLQUFLLDBCQUEwQixHQUVyRCxPQUFPLElBRVQsa0JBQWlC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RSxXQUdyQixPQUFNLGlCQUN5QixLQUFLLE1BQTdCLEVBQUssRUFBTCxNQUFPLEVBQU0sRUFBTixPQUFRLEVBQUssRUFBTCxLQUNwQixPQUFPLE9BQUEsY0FBQSxPQUFVLE1BQUEsRUFBTyxPQUFBLEVBQVEsTUFBQSxNQUlwQyxRQUFPLFFBQVU7QUh0RFAsQUNEVixJQUFJLEtBQUssRURDUSxDQ0RMLENEQ08sQ0FBQyxLQ0RELENEQ08sQUNETixDRENPLElBQUksQ0FBQyxDQ0RMLENBQUMsQ0FBQSxPRENjLEVBQUUsQ0FBQyxDQUFBO0FDQTdDLEFDRkEsQUNKQSxBSmdCQSxHQ1YrQyxDQ0EzQyxBQ0ZBLEFDSkEsQUpnQkEsRUloQkUsRUZNRSxDQ0ZDLEFDSkEsQUpnQkEsRUVWRSxDQ0ZDLEFIWUEsSUloQkksQ0FBQyxDRk1DLENBQUMsQUNGQSxBSFlBLENHWkMsQUhZQSxDSWhCQyxDQUFDLENBQUEsRUZNRyxDQUFDLENBQUEsQUNGQyxDQUFDLENBQUEsQUhZQyxDQUFDLENBQUE7QUNUNUIsQUdORixBSmdCQSxJSWhCSSxBSmdCQSxLSWhCSyxBSmdCQSxHSWhCRyxBSmdCQSxLQ1ZLLEVBQUEsQUdORSxBSmdCQSxDSWhCQyxBSmdCQSxPSWhCTyxDQUFDLENBQUEsQUpnQkMsQ0FBQyxDQUFBLGVDVlY7QUFDaEIsQUNBSixBQ0ZBLEFDSkEsQUNKQSxBTG9CQSxJRVZJLEFDRkEsQUNKQSxBSmdCQSxLRVZLLEFDRkEsRUZFRSxDQ0FDLEFDRkEsQUVSQSxDQUFBLEdMb0JJLEdFVkcsQUNGQSxBQ0pBLEFKZ0JBLENFVkMsQUNGQSxFQ0pFLElKZ0JJLENBQUMsRUVWRSxBQ0ZBLEFDSkEsQ0ZNQyxBQ0ZBLEFDSkEsQ0ZNQSxBQ0ZBLGtCSFltQixDQUFDLENBQUEsd0JJaEJ5QixDQUFDLENBQUEsYUNEeEUsT0FBUyxRQUFRLFVBQ2pCLE1BQVEsUUFBUSxRQUNwQixRQUFPLE1BQU0sY0FBZSxrQ0FDNUIsSUFBSSxJQUFLLFFBQVEsTUFDYixNQUFRLFFBQVEsU0FFaEIsTUFBUSxRQUFRLFNBQ2hCLE1BQVEsUUFBUSxX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QUNQLE9BQVEsSUFDUixPQUFRLFFBQU8sUUFDZixPQUFRLEtBQUssTUFBTSxPQUNuQixNQUFPLEtBQUssTUFBTSxNQUNsQixjQUFlLFNBQUEsU0FBSyxHQUFFLE9BQ3RCLFVBQVcsS0FBSyxNQUFNLGFBQ3RCLEtBQUssUUFDTCxrQkFBa0IsRUFDbEIsVUFBVSxFQUNWLElBQUksa0NBQ04sTUFBQSxjQUFDLGdCQUNDLE9BQVEsUUFBTyxRQUNmLE1BQU8sSUFDUCxPQUFRLElBQ1IsS0FBTSxLQUFLLE1BQU0sbUJBQ2pCLGNBQWUsS0FBSyxNQUFNLDBCQUMxQixjQUFlLEtBQUssTUFBTSw2QkFFOUIsTUFBQSxjQUFBLE9BQUssT0FBUSxNQUFPLGFBSzFCLFFBQU8sUUFBVTtBTHpGWCxBQ0FOLEFFUkUsQUNKRixBTHNCQSxJS3RCSSxBTHNCQSxHQUFHLENJbEJDLENGUUMsQ0VSQyxBQ0pBLEFMc0JBLENJbEJDLEVIUUUsQUlaQSxFSllFLEFEVUEsQ0FBQyxFRVZFLENBQUMsQ0FBQyxBR1pBLENBQUMsQ0hZQyxJRVJJLENBQUMsQUprQkEsQ0FBQyxDS3RCQyxDQUFDLENBQUEsSUpZSztBQUM3QixBQ0FKLEFDRkYsQUNORSxBQ0pGLEFDRkEsR0pjRyxDQUFDLEFDRkEsQUVWQSxBQ0ZBLENGTUMsQ0VOQyxDRk1ELEVGUUksQUdaQSxBQ0ZBLENKY0MsRUdaRSxHSllHLENLZEMsQ0xjQyxBS2RBLEVERUUsQ0FBQyxDSllDLEFLZEEsQ0ZNYixBRU5jLENMZWpCLEFLZmlCLENMZWpCLEFFSG1CLEdERUcsQUNGQSxBRVZBLENBQUMsQ0hZQyxBR1pELEdGVUksQ0FBQyxRREVRLENBQUMsQ0FDdEMsQ0NId0MsQ0FBQyxHREdwQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUM1QixBRVZRLEFDSFYsQUNGQSxHTGVHLEFDQUEsQ0FBQyxBSWZBLEVERUUsQ0FBQyxFQ0ZFLEVGS1EsQ0NITCxBQ0ZBLENKZUMsQUVWTSxBQ0hOLENIYUMsQUVWTSxLRUxELENKZUMsQUVWTSxBRUxOLENKZUMsQUVWTSxDRld0QixH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LEFDRkEsRUxlRSxDSWJDLEFDRkEsQ05zQkMsRUNQRSxDQUFDLEFET0EsQ0daQyxBQ05BLENKa0JDLENHWkQsQUNOQSxBQ0ZFLEFDRkEsQU5zQkEsQ0twQkMsQUNGQSxJTnNCSSxDQUFDLEVLcEJFLENBQUMsQ0FBQSxBQ0ZDLENBQUMsQ0FBQSxJTnNCSyxFQ1BFLEFET0EsQ0NQQyxBRE9ELElDUEssQ0FBQyxHRUx2QixBQ05BLEVIVzRCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtBRUo1RCxBQ05BLEFFSkosQUNKQSxBUDBCSSxHQ1BELENLZkMsQUNKQSxFQUFFLEVKY0UsQUhZQSxDTXRCQyxBQ0pBLEVIUUUsQ0VKQyxDSFVDLENIWUMsRUdaRSxBSWRBLENBQUMsQVAwQkEsQ0daQyxBSGFaLENHYmEsQUdWQSxBTnVCWixDTXZCYSxDQ0pDLEFQMkJaLENPM0JhLENBQUEsQVAyQlYsQ0diWSxBSGFYLENHYlksQUhhWCxFQUNSLENBQUMsQ014QnNCLENBQUMsQU53QnJCLENNeEJxQixDTndCbkIsRUFBRSxDR2RzQixBSGNyQixFR2R1QixBSGUvQixDR2YrQixBSGU5QixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQ1IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ1QsQ0FBQyxHQUFHLENBQUMsVUFBUyxLQUFLLEVBQUUsQ0FBQyxFQUFFO0FDZDNCLEFDSUYsQUNUSSxBQ05FLEFDRk4sQUNGQSxBQ0pBLEFQaUMrQixJSzNCM0IsQUNGQSxBQ0pBLElKY0ksQUdWQSxDSm1CQyxBR2pCQSxBRU5BLEVESUUsQ0RFQyxBRU5BLENQaUMwQixDR25CeEIsQ0htQjBCLEVHbkJ2QixDRFNDLEFDUlosQUdYWSxDSm1CQyxBQ1JaLEFDUFksQUNGQSxBQ0ZBLEFDSkEsQ0x1QkMsQUdqQkEsQUVOQSxBUGlDeUIsQ0dsQnBDLEFDUFksQ0ZlQyxBRlV5QixDQ2R4QixBRUpaLEVGSVksQUVKVixFQUFHLEFFVFcsQUVOQSxBUGlDeUIsQ0dsQm5DLEFFVFcsQUVOQSxDSmVWLEFFVFUsQUVOQSxBUGlDMEIsRUdqQmhELENBQUMsQ0daMEIsQ0hZeEIsQUdaeUIsQU42QnlCLENNN0J6QixDSFl2QixBSGlCa0QsRUdqQmhELEVBQUUsQ0hpQm1ELENHakJqRCxBSGlCa0QsQ0dqQmpELEFIaUJrRCxDSXpCL0MsQUp5QmdELENHaEIvRCxBQ1RnQixDRFNmLEFIZ0JnRSxDQUFBLENHaEI5RCxFQUFFLEVBQUUsRUFBRSxFRkVTLEFFRlAsQ0FBQyxFQUNaLENBQUMsQ0ZDc0IsQ0VEcEIsQ0ZDc0IsQ0VEcEIsRUFBRSxFRkN1QixBRURyQixFRkN1QixBRURyQixDQUFDLEVBQ1osQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUNaLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFDWixDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ2IsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQztBRkZmLEFDSUYsQUdqQkYsQUNGQSxBQ0pBLEFDSkEsR04yQkcsQ0FBQyxBR2pCQSxBQ0ZBLEFDSkEsQ1BnQ3FFLENBQUMsQ0FBQSxFQ2JqRSxBQ0lBLEFHakJBLENKYUMsQUNJQSxFR2pCRSxBR1ZBLEFBRVosQ0x1QnlCLEFLekJiLEVQdUJHLEFFRVcsQUNkQSxDQUFDLEFFSFgsQ0ZHWSxDSFlWLENJYkMsQUNGQSxBQ0pBLENObUJDLEFFRVcsQUVmWCxBR1JiLENQcUJjLENFRUssQUNkTyxBR1BYLElObUJJLEFLZkEsQ0xlQyxBRUVJLEFHakJKLENFTlYsQ0x1QmdCLEFFZkosQUVOQSxDRk1DLEFFTkEsQ0ZNQSxFSmFHLENFRUssQ0ZGSCxDQUM1QixBRUNpQyxDS3ZCSixFQUFPLEVMdUJFLEFLdkJJLENQc0JwQyxBRUNpQyxDRkRoQyxBRUNpQyxDRkRoQyxBRUNpQyxBS2xCOUMsRUxrQitDLEdGRDdCLEFLaEI2QixDTGdCNUIsQUtoQjZCLENBQUEsQ0VEdkMsQ1BpQmEsRUFBRSxBT2pCVixHQUNaLEVQZ0IyQixBT2Z4QixDUGV5QixHQUFHLENBQUMsQ0FBQyxDQUM5QixLQUFLLENBQUMsQU9mTixDUGVPLENBQUMsQU1yQjRELENBQUMsQ05xQjNELEFNckIyRCxHTnFCeEQsQ0FBQyxDQUFDLEFPZk4sQ1BnQlQsSU9mQSxDUGVLLENBQUMsR09mRCxDUGVLLENBQUMsQ0FBQSxTT2RYLE1BQU0sRUFBRyxLQUNULE9BQU8sS0FBTSx1QkFDYixhQUNBLEtBQUssV0FDTCxTQUFTLEtBQ1QsTUFBTSxFQUFHLEtBQ1QsT0FBTyxLQUFNLHVCQUNiLEtBQUssTUFBTyxXQUFhLE1BQU8sR0FBSyxHQUFHLE9BQU8sU0FoQnBELEdBQUksR0FBTyxFQUFNLE9BQU8sS0FBSyxLQUFLLFFBQVMsR0FDeEMsVUFBVSxRQUFRLEtBQUssT0FBWSxRQUNqQyxPQUFPLEtBQUssS0FBSyxRQUFTLE9BQzNCLEVBQVMsRUFBSyxPQUFPLFVBQVUsS0FBSyxJQUFLLEdBMkI3QyxPQVpBLEdBQ0csS0FBSyxHQUNMLEdBQUcsWUFBYSxXQUNmLEdBQUcsVUFBVSxRQUFRLE9BQU8sVUFDekIsYUFDQSxLQUFLLE1BQU8sTUFDWixhQUNBLFNBQVMsS0FDVCxLQUFLLFlBQ0wsTUFBTSxFQUFHLEtBQ1QsT0FBTyxLQUFNLHlCQUViO0FQTkwsQUNDQSxBR2pCSixBQ0ZBLEFONEJJLElLMUJBLEFDRkEsQ0hnQjhDLENBQUMsQ0FBQSxBQ2RsQixDSjBCekIsR0NWRyxFSWhCRSxBTDBCQSxHQ1ZHLEFJaEJBLEFMMEJBLENDVkEsQ0NDRSxBSW5CQSxFSm1CRSxDQUFDLEFJbkJBLEVERUUsQ0FBQyxJQ0ZJLENBQUMsUURFUSxDQUFDLENBQUEsY0NGZSxDQUFDLENBQUE7QUpvQmxELEFDSEEsQUNkRSxBR05OLEFDSkEsQVJvQ00sR0NWSCxDTXRCQyxFQ0pFLENBQUMsQ0x3QkMsRURHRSxFQUFFLEFLdkJBLENKb0JDLENLeEJDLENESUMsQ0pvQkMsQ0t4QkMsRUpVRSxFQUFFLENHTkMsQ0FBQyxDUGdDQyxFUXBDRSxBUm9DQSxNRVRNLEFGU0EsQ09oQ0MsQ0FBQyxDQUFBLEFDSkMsQ0FBQyxLQUFLLEVBQUUsQ0pVdEIsQ0FBQyxFSVZ5QixFQUFFLFNBQVMsRUFBRTtBUDJCMUQsQUNDRSxBQ0hFLEFFZE4sQUNGQSxBQ0pBLEFDSkUsQVJvQ0ksSUsxQkYsQUNGQSxBQ0pBLEVDSkUsR0hVRyxBRU5BLENDSkMsRUx3QkUsQUVkQSxBRU5BLENDSkMsQ0x3QkMsQ0NmWSxDQUFDLENBQUMsQUNDWCxDQUFDLEFHVkEsQ0RJQyxBQ0pBLENMd0JDLEFJcEJBLENMdUJDLENFbEJZLEFKMkJYLENFVEMsQ0ZTQyxDUXBDQyxBUm9DQSxDTTVCQyxBRVJBLEFSb0NBLENDVkMsQU10QkEsQ0FBQyxBUGdDQSxDQ1ZELEFJaEJFLEFDRkEsQUNKRCxBQ0pDLENIVUMsQUdWQSxBUm9DQSxDUXBDQyxDUm9DQyxDQUFDLENNNUJDLENKbUJDLEFJbkJBLEFFUkEsQVJvQ0EsQ1FwQ0MsQVJvQ0EsRUFBRSxFQUFFLEVBQUUsQ1FwQ0MsQVJvQ0EsQ0FBQyxDUXBDQyxDRlFDLENBQUMsT0VSTyxDQUFDLENBQ2xELFFQeUJ1QixDT3pCZCxDQUFDLEdQeUJrQixFQUFFLENPekJkLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUN4QyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtBUHlCbkMsQUVGRSxBS3RCSixBUmtDSSxBU3hDTixHUCtCRyxDQUFDLENBQUEsQ016QkUsQ0pNMkIsQ0hrQnpCLENBQUMsQUdqQkosQ0FBQSxDRGVNLEFIWUEsQ1FsQ0MsQUNOQSxBQUVaLENOMEJhLEFIWUEsQVN4Q0QsRURNRyxDTHNCQyxBTTFCWixDUjRCYSxBRFVBLENDVkMsQURVQSxDUWxDQyxDQUFDLEVQd0JFLENBQUMsQVE1QlgsR0RJYyxDQUFDLEFSa0NBLENBQUMsRVN0Q1QsSVRzQ2UsQ1FsQ0MsQVJrQ0EsQ1FsQ0MsQ0FBQyxFQ0huQyxFREd1QyxDQUFDLEVQd0JFLENBQUMsQU94QkEsRUFBRSxFQUFFLENQd0JDLEFPeEJBLENBQUEsQ1B3QkUsRVExQmhELEVSMEJvRCxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsS1ExQjNDLG9CQUVuQixVQUNFLGNBQWUsT0FDZixTQUFVLElBRVosZUFDRSxjQUFlLE9BQ2YsU0FBVSxJQUVaLGVBQ0UsVUFBVztBTmNULEFJcEJOLEFDRkUsQVJrQ0ksQ0VUTCxFRERFLEFHakJBLENHTEMsT0NGTyxDTHNCQyxFQUFFLENLdEJDLENBQUMsQ0xzQkMsQUlwQkEsQUNGQSxFQUFFLENERUMsSVBnQ0ksQ09oQ0MsQ0FBQyxBUGdDQSxJQUFJLENBQUMsTU9oQ00sQ0FBQyxrQlBnQ2tCLENBQUMsTUFBTSxDQUFDLEVBQzNELENBQUE7QUNWSCxBRUZJLEFDZkosQUNEQSxBQ0ZBLEFFSkUsQVJtQ0EsQVN6Q0osSUFBSSxDSllDLEFHTkEsQ0FDRSxDSEtGLEVJWkksRVR5Q0UsQ1N6Q0MsSU40QkksQUtyQkMsQVJrQ0QsQ0k1QkMsQUVIQSxBTitCRCxDR2JFLEFLckJDLEFDUEQsQ1I4QkMsQUdqQkYsQUVIQSxBRUZWLEFDUlksRVI4QkEsQUVGRSxDRWhCYixJSVprQixDRFFYLENBQUMsQ0NSYSxHRFFULENBQUMsQ0FDZCxJQUFJLENBQUMsT0pJUSxBRUhBLEdFREUsQ1BxQkEsQU9yQkMsQ0FDaEIsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQ2IsS0FBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FDbkMsVUFBVSxFQUFFLENBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNmLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FDZCxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FDYixLQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQyxDQUNuQyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVc7QVBjMUIsQUNDSixBQ0hNLEFDZkYsQUNGTSxBQ0ROLEFFTTRCLEFDaEI5QixHVHlDQyxLQ1hLLENDQ0MsRURERSxBRUZBLEFDZkEsQUNGTSxBQ0ROLEVIa0JFLEFFakJNLEFHS29CLENQY3pCLEFJbkJNLENERUwsQUtiQSxDTGFDLENEZUMsQUtaMEIsQUNoQjFCLENSOEJDLEFFRkEsQUtaMEIsQ1BjekIsQ0NDQyxBR3BCTSxBR0tvQixDTmV6QixBR3BCTSxBR0tvQixDUGN6QixBQ0NBLEVEREUsQUNDQSxDRERDLEFJbkJNLENBQUMsQ0ZpQkwsQUtaMEIsQ05lekIsQUNIQSxBS1owQixFTmV4QixDRERDLEFDQ0EsQ0REQyxBT2QwQixDTmV6QixBTWYwQixDTmV6QixBQ0hBLEFLWjBCLENMWXpCLEFLWnlCLENOZXhCLEFHcEJNLENERUwsQ0FBQyxBQ0ZNLENBQUMsQ0ptQkwsQUluQkssQ0ptQkosQUNDQSxDRWxCQyxDRmtCQyxBRWxCQSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUE7QUZtQm5ELEFDSEksQUdsQkEsQUNKSixBUG1DQSxBU3pDRSxBQ0pKLEdOaUJHLEFDSDRDLEVHS2UsQ05nQnhELEFNaEJ5RCxDQUFBLENQY3BCLEFNdkJuQyxDTHlCQyxDS3pCQyxDQUFDLENOdUJvQyxBQ0VuQyxBUW5DQSxBQUVaLENSaUNhLEFRbkNELENSbUNFLENERm9DLENTL0I5QyxFSlljLENMbUJvQyxBRFluQyxBU3pDQSxDUjZCbUMsQUtuQmxDLENOK0JELEFTekNFLENONEJDLENER0MsQ0FBQyxBQ0hBLENPOUJWLENIUVksQ0FBQyxHTHlCRyxDQUFDLENBQUMsQ1FqQ1YsR1JpQ2MsQ0FBQyxFTy9CRSxFQUNwQyxDUDhCdUMsQ0FBQyxDQUFBLEFRaEN2QyxJVjBDZ0IsQ0FBQyxDVTFDVCxDVjBDVyxNVTFDSixTQUVqQixJQUFHLFNBQUMsRUFBUyxHQUNYLEdBQUksR0FBUyxFQUFRLElBQUksR0FBa0IsU0FBQSxTQUFLLEtBQzVDLEVBQVEsR0FBRyxLQUFLLEVBQVEsU0FBQSxTQUFLLEdBQUUsS0FDL0IsRUFBUSxHQUFHLEtBQUssRUFBUSxTQUFBLFNBQUssR0FBRSxLQUMvQixFQUFPLEVBQU8sT0FBTyxTQUFDLEVBQU8sR0FDL0IsTUFBTyxJQUFTLEVBQUUsR0FBSyxJQUFVLEVBQUUsR0FBSyxJQUN2QyxHQUNDLEVBQVMsRUFBTyxPQUFPLFNBQUMsRUFBTyxHQUNqQyxNQUFPLEdBQVEsS0FBSyxJQUFJLEVBQUUsR0FBSyxFQUFPLElBQ3JDLEdBQ0MsRUFBSSxFQUFPLEVBQ1gsRUFBSSxFQUFRLEVBQUksQ0FDcEIsUUFBUSxFQUFBLEVBQUcsRUFBQSxJQUdiLFFBQU8sU0FBQyxFQUFHLEdBQ1QsR0FBSSxHQUFNLEVBQUksRUFBRyxPQUE4QixHQUFsQixFQUFHLEdBQUcsT0FBUyxLQUM1QyxLQUFJLEVBQUksRUFBTyxFQUFKLEVBQU8sSUFBSyxFQUFFLElBQU0sR0FBRyxPQUFPLEVBQUcsR0FDNUMsSUFBSSxHQUFNLFFBQVEsVUFBVSxHQUN4QixFQUFRLFFBQVEsSUFBSSxFQUFLLEVBQzdCLE9BQU8sU0FBUSxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksR0FBUSxHQUFNLElBRTNELHVCQUFzQixTQUFDLEVBQVEsRUFBVSxHQUN2QyxHQUFJLEdBQU0sR0FBUyxFQUFHLEVBQU0sR0FBSSxFQUFHLEVBQU0sSUFBTSxNQUFNLElBQUksRUFBUSxHQUM3RCxFQUFLLEdBQUcsTUFBTSxTQUFTLFFBQVEsRUFBRyxJQUFJLE9BQU8sRUFBSSxFQUFHLEVBQUksRUFBWSxFQUFSLEVBQUksR0FDcEUsT0FBTyxHQUFPLElBQUksU0FBQSxHQUNoQixHQUFJLEdBQVEsRUFBUyxHQUVqQixFQUFRLEtBQUssSUFBSSxFQUFHLEVBQU0sSUFBTSxFQUFNLEdBRTFDLE9BREEsSUFBZ0IsR0FDUixNQUFBLEVBQU8sRUFBQTtBVERqQixBQ0VGLEFDSE0sQUNmTixBQ0hBLEFFSkEsQVBrQ3VCLEFTdkN2QixHRGNDLEVOZ0JFLENBQUMsRURGRSxFQ0VFLEFDSEEsQU0zQkEsQ1R1Q3NCLENDWHBCLEFDRUEsQUNIQSxBSFlxQixBU3ZDckIsQ1A4QkMsQUNIQSxBSFlxQixDR1pwQixDRkNDLEFLcEJXLENIbUJWLENGQ0MsQUluQkEsQ0ptQkMsQUVEQSxBSFlxQixDRVRwQixBR3JCRixBRUpFLEFQa0NvQixDR1puQixDREdDLEFDSEEsQUl0QkYsQ0x5QkUsQ0NIRSxBQ2ZBLENEZUMsQUduQlcsQ0ZJWixDSGdCRyxBRURBLENGQ0MsQ0VEQyxFQUFFLENGQ0MsQUVEQSxDQUFDLENGQ0MsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENJbkJ6QixJRUpFLE1IT0UsQ0hnQmdDLElHaEIzQixFQUFFLEtBQUssRUFBRTtBSGlCaEMsQUNFSixBQ0hNLEFDZkosQUNIQSxBRUxvQixBQ1V0QixBQ2RFLEFDTEosR1YyQ3lDLENVM0NyQyxDUm1DQyxDQUFDLENJdkI2QixDRkszQixBR1JvQixBQ1VwQixDRFZxQixBQ1d4QixDUGFLLEFFREEsQ0ZDQyxBQ0VBLEFHckJBLEFLZEEsQ1BnQ0MsQ0RHQyxBQ0hBLEFDZkEsQUlHSixDUGFLLEFDRUEsQUNIQSxBS1pKLEFFcEJJLEVUaUNFLEFFREEsQUNmQSxDSGdCQyxBUTVCQSxDTjJCQyxBS1pKLENBQUMsQUNmSSxDUDhCQyxBQ0hBLEFDZkEsQUlJZixDTmNnQixBQ0hBLEFDZkEsQU1qQkEsQ1RpQ0MsQU9aZixBRXJCZSxDVGlDQyxBRURBLEFJdkJvQixBQ1luQyxDTFdnQixDSXZCcUIsQUVKcEIsQ1I0QkMsQUVEQSxBQ2ZBLEFHUm1CLENOd0JsQixBQ0VBLEFFbEJELENGa0JFLEFDSEEsQ0RHQSxDQ0hFLENGQ0MsQUVEQSxBT2hDQSxDUGdDQyxBT2hDQSxDVGlDQyxBU2pDRCxDVGlDRSxBRUEzQixBS1pZLENQWWUsQ09aYixZQUFXO0FQYTFCLEFDRUosQUNGSSxBQ2hCRixBQ0hFLEFDRkEsQUVTQSxBUnNCSixBU3RDRSxBQ0xKLEdIUStDLENHUjNDLENSbUNDLENBQ0EsQU1mRyxDQUFDLENKSkQsQ01qQkMsQ1RpQ0MsQUNHRCxDQUFDLEFHdEJDLENDRkMsQUdQQSxBQ0xBLENMY0MsQ0NGQyxBR1BBLENSNEJDLEFDR0QsQUVuQkMsQUowQkEsQ0s3QkMsQUdPRSxBQ2hCRixDUCtCQSxBTWZHLEFSc0JKLENDVkcsQUdoQkEsQUVMQSxBR05mLEFDTmUsQ0FBQyxDTmlCQyxBRUpmLENKdUJlLEFDSEMsQUNoQkEsQUVKaEIsQ0xvQmlCLENBQUMsQUVBQSxBS1pFLENMWUQsQUtaRSxDQUFDLENOZUYsQUNIQyxBT2pDQSxFVGlDRSxBRUFBLEFDaEJBLENIZ0JDLEFDR0QsQUNIQyxBT2pDQSxDVGlDQyxBR2hCQSxDSGdCQyxBRUFBLEFDZnhCLEFJRzBCLENQWUQsQUNHRCxBQ0hDLEFLWkUsQ1BZRCxBQ0dELEFDSEMsRUZBRSxDQUFDLEFDR1UsQUVsQmxDLENIZXlCLEFDR1UsQUVsQmxDLENIZXlCLEFDR1UsQ0RIVCxDQUFDLEFPWkUsQVJzQjFCLENRdEIyQixDQUNsQyxDUFdrQyxBQ0dVLENGT2pDLENFUG1DLENBQUMsQUZPbEMsQ0NWeUIsQUNHVSxBRWxCbkMsQUp5QkMsQ0NWeUIsQUNHVSxBRWxCbkMsQ0ZrQm9DLEFGT2xDLENDVnlCLEFDSTdDLEFFbkJvQixFSUlOLENQV2tDLENDSTVDLEFNZlksQ05lWCxBTWRELENQVStDLEdBQUcsQUNJN0MsQU1kRCxDQUFDLENOY0UsQ0RKOEMsQ0FBQSxFQ0kxQyxBTWRELEVBQUUsR05jSSxDTWRBLENBQUMsQ05jRSxBTWJuQixHTmFzQixDQUFDLENBQUMsS0FBSyxBTWJuQixFTmFxQixBTWJuQixDTmFvQixBTVpoQyxDTllpQyxDQUFDLEdBQUcsQ0FBQyxDQUFZLENBQ3RELEFNYlksQ0FBQyxHTmFULENBQUMsQU1iWSxDQUFDLENBQ2QsRU5ZSyxFQUFFLEFNWkgsQ0FBQyxHTllNLEtBQUssRU1aRCxDTllJLEFNWkgsQ0FDaEIsRU5Xc0IsQ0FBQyxDTVhuQixDQUFDLENOV2dDLENBQUMsQU1YaEMsQ05XaUMsQU1YaEMsRUFBRSxFQUFFLENOV2lDLENNWGhDLENOV2tDLEFNWGpDLENOV2tDLEFNVi9DLENOVWdELENBQUMsQ0FBQyxDQUN0RCxDTVhTLENBQUMsRU5XTixBTVhPLENOV04sR01YVSxDTldOLENNWFEsQ05XTixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxFTVhTLEVBQUMsQ05XTCxBTVhNLENBQUEsQ05XSixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBWSxDQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7QUROZCxBRUFBLEFDaEJxQixBQ0hyQixBRU5KLEFQbUNFLEFTckNGLEFFVkYsQ1Q0Q0MsRUkzQkUsQUVlRSxDQUFDLENBQUEsRUdoQ0MsQ1grQ0MsRUNWRSxFSW5CRSxBTDZCQSxDSTFCc0IsQ0FBQyxBQ0hyQixDSm1CQyxBR2hCcUIsQUtYckIsQ0VWSSxDTmtCRixBTDZCQSxBU3JDQSxDUjJCQyxFR2hCdUIsQUdUckIsQ0hTcUIsQ0hnQm5CLEFNekJGLENOeUJHLENFQUMsQUhVQSxFR1ZFLEFIVUEsQVcvQ0ksRVZxQ0YsQUVBRCxDRkFFLEVFQUMsRUFBRSxDRkFFLEFFQUQsQVFyQ0ssQ1ZxQ0gsQUVBRCxFQUFFLENBQUMsRUFBRSxDRkFFLEFFQUQsQ0ZBRSxBRUFELEVBQUUsR0ZBSSxBRUFELENGQUUsQ0FBQSxBRUFBLENBQUMsQ0FBQyxDSXpCM0IsQ0p5QjZCLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUNyRCxDQUFBLE9RdENzRSxZQUFZO0FWc0NqRixBRUNGLEFFcEJFLEFDREosQUNOdUIsQUNxQnZCLEFSZUksQVNyQ0YsQUNORixLTmdCeUMsQU1oQnRDLENOZ0J1QyxDQUNyQyxBTWpCRixDSE93QixDQUFDLEFDcUJyQixDUEtDLEFEVUEsQ0NWQyxBRUNBLEVDakJFLEFJV0EsQ0pYQyxBSVdELEVQS0csQUVDQSxBSFNBLENDVkMsQUVDRCxBR3JCQyxBR1BBLEVIT0EsQU44QkUsQVNyQ0EsQ0NOYixFTGNnQixDRVBzQixBUG9DckIsQ0kxQkEsQUNIQyxBTDZCQSxDSTFCQSxBR1ZzQixBRURyQixDRkNxQixDSFVwQixBTWpCYixFTGNnQixBTDZCQSxBVTNDZCxDVGlDZSxBSW5CQSxBTDZCQSxDQ1ZDLEtBQUssQ0FBQyxBSW5CQSxDSm1CQSxJU2pDVCxFQUFFLEVKYVYsRU44QjRCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FFRnpELEFFeEI0QixBQ0Z0QixBQ0RGLEFOOEJFLEFTckNGLEFDTkEsQ0Y0QkgsQ0FBQSxDTE1FLEFJNUI2QyxDTGtDNUMsQ0RQQyxDQUFDLENBQUEsQ1NqQ0UsR0phRyxDTjhCQyxBU3JDQSxDTFV1QixBSjJCdEIsQ0kzQnVCLEFKMkJ0QixBU3JDQSxBQ05BLENOZ0J1QixBRUh0QixBTjhCQSxDRUhDLEFJM0JBLEFOOEJBLEFTckNBLENUcUNDLEFVM0NBLENWMkNDLEFTcENmLENQaUNnQixFRXhCd0IsQ0FBQSxDSjJCcEIsQ0VIQyxBUXhDQSxDUndDQyxBUXhDQSxDTGNDLEFMNkJBLENBQUMsQ0s3QkMsQUw2QkEsQVUzQ0EsQ0FBQyxFVjJDRSxDQUFBLENLN0JFLENBQUMsRUgwQkUsQ0FBQyxBSTNCQSxDQUFDLElBQUksQUliQSxDTGNDLEFDREEsR0liSSxFSmFDLEVBQUUsTUliSCxDQUFDO0FUa0M1QyxBRUNGLEFFcEJJLEFDREEsQUNQSixBUHFDSSxBU3BDSixLTFEyQyxDQUFDLENIa0J2QyxBR2pCQSxDSGlCQyxFRFVFLENNOUJDLEFOOEJBLENDVkMsQ0FBQyxBS3BCQSxBSWR1QyxDSmN0QyxBSWR1QyxDTGV0QyxBQ0RBLEFHTkEsQ0ZEQyxDTjJCQyxBSW5CQSxBQ0RBLEFHTkEsQ1IwQkMsQUdqQkEsQUVIQSxBQ1BGLENOMkJFLEFHakJDLEFFSEEsQ0ZHQyxDQUFDLEFFRmhCLENIb0JpQixBQ2pCZixBQ0hlLEFDQWhCLENBQUEsQU42QmlCLENHVEMsQUhTQSxNQUFNLENBQUMsQ0kxQmQsQUowQmUsQ0kxQmQsQUowQmUsQ0FBQyxDQUFDLEVBQUUsQ0kxQmQsQUowQmUsQ0kxQmQsQUowQmUsR0FBRyxDQUFDLENJMUJkLEFHWFYsQVBxQ3dCLENJMUJiLENBQ3ZCLEtBQUssRUFBRSxDRGdCVSxBQ2hCVixDRGdCVztBQ2ZyQixBQ0pFLEFFUkYsQUVDQSxBR2ZKLEdYeUNHLEFLbkJBLEVONkJFLEFVN0NnRCxBQUFDLENBQUMsQ0FBQSxDSFEvQyxDSFlDLENBQUMsQ0RlbUIsQ0FBQyxBU3ZDOUIsQ1R1QytCLEFJM0JsQixBRUNBLENOMEJtQixDTTFCakIsQ0ZEQyxBS1paLEdUdUNpQyxBRW5CbEIsQ0ZtQm1CLEFJM0JsQixDSjJCbUIsQUNmbEIsQUNKQSxBRVJBLENKMkJtQixFQUFFLEFDZmxCLENEZW1CLENBQUMsR0NmZixDQUFDLENEZW1CLEFJM0JsQixDSjJCbUIsQVN2QzdCLENUdUM4QixBSTNCbEIsQ0oyQm1CLEFDZmxCLEFHWkEsQ0oyQm1CLEFDZmxCLEdBQUcsQ0FBQyxDUXhCVixJUG9CUixDQUFDLEVJUHlCLEVMV0MsQ0FBQyxFQUFFLENBQUMsRUFBRSxBR1pDLEVBQUUsQ0FBQSxxQktaVyxVQUVwRSxTQUFRLFdBQWEsZ0JBQWtCLFNBQVUsR0FDL0MsSUFBSyxHQUFJLEdBQUksRUFBRyxFQUFJLFVBQVUsT0FBUSxJQUFLLENBQ3pDLEdBQUksR0FBUyxVQUFVLEVBRXZCLEtBQUssR0FBSSxLQUFPLEdBQ1YsT0FBTyxVQUFVLGVBQWUsS0FBSyxFQUFRLEtBQy9DLEVBQU8sR0FBTyxFQUFPLElBSzNCLE1BQU8sSUFHVCxRQUFRLFlBQWE7QVh3Qm5CLEFDS0EsQUVwQkksQUVKSixBQ1JFLEFHUkEsR1BrQ2lELEFIV2xELEFTcENBLEVQK0JFLEFPOUJKLENBQUEsQ1A4QkksQ0RMRyxBTTNCQSxBR1JBLEVUbUNBLEFHZkUsR01wQkcsRU5vQkUsQUNMVyxDQUFDLEFLZlgsQ0xlWSxBRVBYLENIWUMsQU1wQkEsQ0FBQyxDSFFDLEVMZ0NaLEFFcEJjLEFDTFcsQ0RLVixBRUpBLEFJaEJBLENIUUMsQUdSQSxDSmdCRCxBQ1JFLEVIWUUsQ0hlaEIsQUdmaUIsQ0daQyxDQUFDLEFHUkEsRUFBRSxDTm9CQyxDQUFDLEtHWkssQ0FBQyxFR1JSLENBQUMsSU5vQmMsQ0FBQyxDQUFDLENBQUMsQUdaQSxDSFlDLENHWkMsQ0FBQSxDSFlFLENBQUMsQ0FBQSxBRUovQixLQUFLLEVBQUUsS0FBSyxFQUFFO0FKd0I1QixBQ0xSLEFDZEksQUp5QkosT0svQitCLENKcUJ4QixBS25CQSxFRklDLENGbUJPLENFbkJMLENIZUUsQUNJSyxBUXhDa0IsQ1J3Q2pCLEFJdkJMLEFJakJ1QixDTnFCdkIsQU1yQndCLENUb0NkLEFTcENlLENKaUJyQixBSWpCc0IsR1RvQ1osQUNJSCxDREpqQixBQ0lrQixDQ0xMLEFDZEEsQUVKRSxBTjZCRixDSXpCQyxBRUpkLENIa0JlLEFIV0YsQ0VOUyxBRW5CUCxDSGVWLEFDSWtCLEdJdkJqQixDRkljLEVBQUUsSUZtQlcsQ0VuQk4sQ0ZtQlEsQ0FBQyxBRW5CUCxDRm1CTyxLRW5CRCxFQUFFLEtBQUssRURjM0IsQUNkNEIsQUp5QjdCLENHWEUsQUNkNEIsQ0FBQSxFSnlCMUIsRUFBRSxDQUFDLEVBQUU7QUl4QjFCLEFDTkEsQUwrQkYsR0VQMkMsRVF4Q04sQ0FBQyxDQUFBLENUb0MxQixBR2RSLEFKeUJBLENJekJDLEVEYW9CLEFDYmxCLENEYW1CLEFIWWxCLENDWFMsQUVEVSxDQUFDLEFDYmxCLENBQUMsQ0hjVSxBR2RWLENKeUJFLEVHWm9CLEFFbkJsQixDSm9CVSxBRURTLENGQ3RCLEFFRHVCLEFFbkJsQixDRm1CbUIsRUFBRSxDQUFDLENGQ3RCLEFFRHVCLEdIWWYsRUdab0IsQUhZbEIsQ0dabUIsQ0FBQyxDQUFDLENBQUMsU0VuQmhDLENBQUM7QUh5QnBCLEFFbEJJLEFFTEYsQUNQQSxBUHFDRSxBVS9DRixBR1JKLEdWMENxRCxLRkU1QyxBR2RELEFFTEEsQUNQQSxBR1ZBLEFHUkEsQ1Q4QkMsQ0p5QkMsRUNYRyxDU3BDQSxDTnNCQyxBRUxBLENMbUJnRCxBSXJCcEMsQ0FBQyxBTGdDWCxBVS9DQSxDUndDQyxBRWxCQSxBQ1BXLEFDRVgsQ0lqQkMsQ1J3Q0QsQUs5QkUsQVBxQ0EsQVUvQ0EsQ1RvQ2dELENBQTFELENHZGEsQUNQVyxBQ0VYLEFDUEEsQ0hZQyxBRUxBLEFOOEJBLEFVL0NBLENWK0NDLEFVL0NBLENUb0NYLElEV2dCLENBQUMsQVUvQ0EsQ0hVQyxDQUFDLEFHVkEsSU5zQkksQ0FBQyxDQUFDLENBQUMsQ0FBQSxFTXRCUCxDQUFDLEFHUGpDLEVQd0I2QyxDSnVCekIsQUl2QjBCLEFDUEEsQVBxQ0EsQ0FBQSxDT3JDRSxDQUFDLENBQUMsQU1qQjNDLENOaUI0QyxDRE9DLEFDUEQsRURPRyxJT3hCckMsTVB3QnFDLENBQUMsQ094QjlCLG1CQUFtQixLQUFLLE9BQU87QVhnRHBELEFDTkYsQUNaSSxBR1pGLEFQcUNFLE9LakMyQixDSnFCbEIsQU16QlAsRVBxQ0UsQ0VQQyxBRk9BLEVDWlMsQUdiUCxBRU44QyxBSWpCdEIsQ0ppQnVCLEFJakJ0QixDUG1DdkIsQUNaQSxBRU44QyxBSWpCdEIsQ1RvQ3VCLEFHYjlDLEFNdkJ3QixDUG1DekIsQU9uQzBCLEdOdUJyQixBRU44QyxDTG1CQyxBR2IvQyxDSGFMLENNekJRLEdBQUcsQ055Qk4sTURZYSxDQUFDLENPckNDLENBQUMsSUp3QnBCLEFIYXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0didkIsQUhhd0IsRUdidEIsQUhhd0IsQ0FBQyxDQUFDLEVHYnRCLENIYXlCLENHYnZCLEFIYXdCLENBQUEsR09yQ0ksRUFBRSxDQUFBO0FMK0JyRCxBQ05GLEFDWkUsQUNSQSxBRUpGLEtESzhELEFOZ0M3RCxBVWpEb0MsQ0FBQyxDSmlCMEIsQUlqQjFCLENUb0NwQixBRUFkLEFJeEJBLENKd0JDLEdETUcsQUl6QjZELENGTzVELEFFUDZELENKeUI1RCxBQ05BLENGQWUsQUdaZCxDRmtCQyxBRWxCRCxDRFlFLENGQTZDLEFLbkJpQixDQUFDLENBQUEsQ0NMM0QsQ0p3QkMsQUVwQkEsQ0pvQjZDLEFFQTdDLENGQUEsQUlwQkUsQUVKQSxPTndCSyxtQklwQkwsQ0FBQztBSDJCbkIsQUNORixBR25CQSxBQ0xFLEFHWkYsR1ZpREQsRUl6QkUsQ0FBQyxDQUFBLEFHWkMsQ051QndCLEFFQ3ZCLEFPcENBLENQb0NDLEFHbkJBLEFDTEEsQ0RLQyxDSnlCQyxDUTFDQyxDUjBDQyxDQUFDLENBQUMsQUczQmMsQUtmZCxDTGVlLENKb0JVLEFDT3ZCLEFDTkEsQUVyQmMsQ0gyQmIsQUNOQSxDRE1DLENEUDJDLEFNdkIxQyxDQUFDLEFHWkEsQ0xlZSxBS2ZkLEdUbUM2QyxBTXZCMUMsQ051Qk0sRUtsQkgsQUNMQSxBR1pBLENBQUMsRUppQkUsSUxrQlMsRUtsQkgsQ0FBQSxDQ0xFLEFHWlQsQ0hZVSxJR1pMLENIWVUsQ0daUixDQUFDLENIWVUsQ0FBQyxBR1pOLEdIWVMsS0FBSyxDQUFDLElBQUk7QUwrQnhELEFDTkEsQUNaRixBRVBBLEFDTEUsQVBxQ0osQVVqREksQUlWTixHQUFJLEdBQUksQ1R3QjRCLEFFRjdCLENOc0JtQyxDTXRCakMsRUhZRSxBRVBBLENIbUJDLENGRm1DLEFTbENsQyxDUG9DQyxBSGFBLEFjM0RFLEViNEM4QyxBR1Y5QyxBRVBBLEFOZ0NGLENJekJFLEFFUEEsQ0htQkUsQU9wQ0EsQ1BvQ0MsQ0l4QkMsQU9uQnBCLENieUNtRSxBTXRCOUMsQUdaQSxDVGtDcUIsQUNRcEIsQVExQ0EsQ0FBQyxDUjBDQyxBQ05BLEFJeEJBLEFHWkEsQ1BvQ0MsQU9wQ0EsQ0FBQyxDVGtDcUIsQU10QnBCLENPbkJwQixDSk9zQixFUG9DRSxDQUFDLEVPcENFLENBQUEsQ0lQakIsQ1gyQ29CLENBQUMsQUl4QkEsQVBxQ3ZCLENHYndCLEFJeEJBLEFQcUN2QixBVWpEdUIsQ1BvQ0MsQU9wQ0EsQ1ZpRHRCLEFVakR1QixDQUFDLENBQUMsQUlQbkIsQ2R3REgsQ09yQ3dCLENQcUN0QixBVWpEdUIsRUhZRSxDQUFDLENMOEJ6QixDQUFDLEFRMUMwQixBSVBqQixDUG1Ca0IsQUdaRCxBQUFDLENBQUEsSUhZSyxDQUFDLEVPbkJSLENQbUJXLENPbkJILENQb0JyRCxDQUFBLENPZkgsSUFIQSxHQUFJLEdBQUksT0FBTyxFQUFFLGNBQWMsSUFDM0IsRUFBSSxVQUFVLE9BQ2QsRUFBSSxFQUNGLEVBQUksR0FNUixJQUxBLEdBSUksR0FKQSxFQUFTLEVBQUUsVUFBVSxVQUFVLE1BQy9CLEVBQVMsRUFBRSxRQUFRLEdBQ25CLEVBQVMsRUFBSyxPQUNkLEVBQVMsRUFFUCxFQUFTLEdBQUUsRUFBRSxFQUFNLEVBQUssTUFBUSxFQUFFLEVBRTFDLE9BQU87QVg4QitCLEFFckJsQyxBTG1DRixHSXpCRCxBRVBBLEVIbUJFLEFPcENBLENQb0NDLENBQUEsQU9wQ0MsQ1RpQzBDLEFEZ0J6QyxBVWpEQSxDQUFDLENBQUEsSVZpREssQ0VSZSxDQUFDLENEUjRCLEFDUTNCLEFHM0JkLEFMbUNBLEVLbkNFLENKbUIyQyxDRGdCekMsQ0VSZSxBRlFkLEdDaEI2QyxDQUFsQixDRGdCdEIsQ0FBQyxPQ2hCOEIsV0RnQlosQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUl4QnJELEFFUEEsQUNKRSxBUG9DQSxBVWpEQSxHUG9DRCxFSGFFLENBQUMsQ0VUOEIsQ0szQjVCLEFHYkEsR1ZpREcsR01oQ0csQU5nQ0EsQVVqREEsQ0xhVyxDQ0lYLENDSkcsQVBvQ0EsQVVqREEsQ1ZpREEsRU9wQ0csR0diRyxDTGFXLEFFQVYsQUdiQSxDSGFDLEVIV0UsRUFBQSxBR1hFLENBQUMsQUdiQSxDQUFDLE9KaUJoQixDQ0p3QixDQUFDLENHYlIsRUppQlosRUFBRSxDSWpCZSxFQUFFLENBQUMsQ0hhVSxDR2JMLENIYU8sQ0FBQSxXSFd4QixLQUFLLEVBQUU7QUhTL0IsQUNRRSxBQ0pKLEFDWkUsQUdYQSxBUG9DQSxBVWpERSxPTFk0QixDSm9CMUIsQUdSQSxBRVBDLEFDSkQsQVBvQ0EsQ0l6QkMsQUp5QkEsSVVqREksQ0ppQkUsQ0xlQSxFRUlFLEFDWkEsQUVQRSxBTmdDRixDQ2pCQyxBR1JBLEFKeUJBLEFVakRBLENSd0NDLEFDSkYsQUl2QkUsQ05tQkMsQ0FBQSxBQ1FDLEFJdkJFLEFJakJGLENOd0JDLEFFUEUsQUNKRixDSFdDLEVNeEJFLENBQUMsQ0ppQkcsQ0FBcEIsQ0lqQm9CLENBQUMsQ0hhQyxBR2JBLENIYUMsQUdiQSxDQUFDLENKaUJsQixBSWpCbUIsR0FBRyxLQUFLLEVSd0NyQixBQ0pILEFDWjBCLEFNeEJBLENSd0N0QixBRWhCdUIsQU14QkEsQ0hhQyxBR2JBLENBQUEsQ1BvQ3hCLEFJdkIwQixDQUFDLENKdUJ6QixBQ1owQixBR1hBLENBQUMsQ0hXQyxBR1hELEdKdUJ0QixDQ1oyQixDRFl6QixBQ1owQixLQUFLLENBQUMsQ0FBQyxDQUFBO0FIUzVELEFFSUEsQUV4QkUsQUVDRixBUG9DRSxBZTNETixHWGtDRyxFTXhCRSxFQUFFLENUZ0NDLEFFSUEsQUl2QkEsQUdiQSxBS1ZDLENMVUEsQ0FBQSxDUG9DRSxFWTlDRSxDWjhDQyxDREdZLEFDSFgsQVk5Q0UsQ2QwQ0QsQUNPVyxDQUFDLENhaEQxQixDZHlDaUIsQUlwQkEsQ0Z3QkMsQ0ZKQyxBRUlBLEFFeEJBLENKb0JBLEFDT1ksQ0sxQlYsQ0p1QkMsQUhhQSxBZTFEZixDWjZDZ0IsQUV4QkEsQ0Z3QkMsQUl2QkEsQVBvQ0EsQ0diQyxFQUFFLEdIYUcsRUdiRSxDQUFDLEFJdkJBLENBQUMsQVFyQmhDLEVaNENrQyxDQUFDLENBQUMsQ0FBQyxDWTVDOUIsQ1o0Q2dDLEVZNUM3QixHWjRDa0MsQ0FBQyxDQUFDLENBQUMsQVk1Qy9CLEVBQU0sR1o0QzhCLENBQUMsQUl2QkEsQ0p1QkMsQ0FBQyxBSXZCQSxDSnVCQyxBSXZCRCxDSnVCQyxJWWxDNUQsUUFBUyxNQUFLLEVBQU0sRUFBTSxHQUN4QixHQUFJLEdBQUssRUFBSyxFQUFLLEVBQ2YsRUFBVyxFQUFPLEtBQUssRUFDdkIsRUFBVyxFQUFXLE9BQVMsRUFBTyxLQUFLLEVBQ3ZDLE9BQU8sSUFBUyxPQUFPLFFBQWEsVUFDeEMsRUFBVyxFQUFXLEtBQU8sS0FBSyxLQUFVLEtBQUssTUFDbEQsS0FBUyxFQUFTLEVBQ3JCLEtBQUksSUFBTyxHQUVULElBQVEsRUFBTyxLQUFLLElBQU0sR0FBVSxJQUFPLEdBQ3hDLEdBQU8sSUFBTyxLQUVqQixFQUFNLEVBQU0sRUFBTyxHQUFPLEVBQU8sR0FFOUIsSUFBYSxXQUFXLEVBQU8sSUFBTSxFQUFNLEVBQU8sR0FFN0MsRUFBTyxLQUFLLEdBQUssRUFBSSxFQUFNLElBQUksRUFBSyxRQUVwQyxFQUFPLEtBQUssR0FBSyxFQUFPLElBQVEsR0FBSyxTQUFTLEdBQ3BELEVBQU0sU0FBUyxHQUNiLE1BQU8sZ0JBQWdCLEdBQUksR0FBSSxHQUFFLEdBQVMsRUFBRSxJQUU5QyxFQUFJLFVBQVksRUFBRSxXQUNsQixHQUNHLEVBQU0sRUFBTyxLQUFLLEdBQUssV0FBVyxHQUFPLElBQUksU0FBUyxLQUFNLEdBQU8sRUFFeEUsRUFBRSxLQUFLLEVBQVMsRUFBSyxJQTFDekIsR0FBSSxHQUFhLFFBQVEsT0FDckIsT0FBYSxFQUFFLEVBQ2YsS0FBYSxFQUFFLEtBQ2YsV0FBYSxFQUFFLFVBT25CLE1BQUssRUFBSSxFQUNULEtBQUssRUFBSSxFQUNULEtBQUssRUFBSSxFQUNULEtBQUssRUFBSSxFQUNULEtBQUssRUFBSSxHQUNULEtBQUssRUFBSSxHQThCVCxPQUFPLFFBQVU7QWRFYixBRUlBLEFDWkYsQUNaSSxBQ0lGLEFDSEEsQVBvQ0UsQVVqREYsT1JzQzZCLENETnpCLEFFSUEsQUdwQkEsQUNIQSxBR2JBLENBQUMsRVZpREUsQ0diQyxBT3BDQSxDVmlEQyxDTWpDQyxFSWhCRSxDVGdDQyxBRUlBLEFHcEJBLEFOaUNBLENBQUMsQ0l6QkMsQUNaQSxBS1pBLENUZ0NDLENHUkQsQUNaRSxBRUNBLENER0MsQ0FBQyxDTGdCQyxBRUlBLEFJdkJBLENGREMsQUtaQSxDUG9DQyxBT3BDRCxDVGdDRSxBRGlCQSxDQ2pCQyxBRGlCQSxFR2JFLENGSkMsQUVJQSxHSGFHLENBQUMsR0NqQkcsQ0FBQSxJRUlLLENBQUMsQ0dwQkMsQ0FBQyxHSG9CRyxDQUFDLEFDWjVCLENEWTZCLENHcEJDLENIb0JDLENHcEJDLEVIb0JFLENBQUMsQ0FBQSxNR3BCSCxDQUFDO0FMaUJuRCxBQ01FLEFFZmtCLEFDWGxCLEFFQ0EsQVBvQ0EsQVVqREYsR1BvQ0QsSUl2QkksQ05tQkMsQUdUb0IsQU12QnBCLENOdUJxQixBR1ZwQixBR2JBLEVMWUUsQ0taQyxDTFlDLEFDRzhDLENBQUMsQ0p1QjdDLEFJdkI4QyxDRlF6QixDRmVuQixBRzFCQSxBS1pBLENOdUJxQixDQUFBLEFDVmpDLENBQUEsQUNFNkQsQUNGOUMsQUdiQSxDSGFDLEFHYkEsQ1RnQ0MsRURpQkUsQVVqREEsQ1RnQ0MsQU1uQkEsQ1BvQ0MsRU9wQ0UsQ05tQkMsQVNoQ0EsQ1RnQ0MsQURpQkEsQVVqREQsQ1ZpREUsSUNqQkksQ0FBQyxHTW5CRyxDQUFDLEtBQUssR0FBRyxDQUFDLENObUJDLEVNbkJFLEVObUJFLEVEaUJFLENPcENDLEFQb0NBLENPcENDLElBQUksQ05tQkMsQURpQkEsQ0FBQyxFQ2pCRSxBRGtCN0QsQ0NsQjhELEFEa0I3RCxDQ2xCNkQsQURrQjdEO0FDakJGLEFFSUYsQUl2QkksQUdiRixHTnNCb0MsQUNUckMsQUxxQ0EsRU1wQytELEVBQUUsQUNEN0QsQ05tQkMsQ01uQkMsRUdiRSxDSmM4RCxDQUFDLEFJZDlELENKYzhELEFJZDdELENScUNVLENRckNYLENQb0NLLEFPcENKLEVQb0NJLEFPcENGLENUZ0NLLEFNbkJBLEFHYkosQ0hhSyxDR2JOLENBQUMsQ1JxQ2dCLEFLeEJSLENHYlAsQ0FBQSxDSGFVLFNObUJBLEVNbkJXLENBQUMsRU5tQlAsQ0FBQyxDQUFBLENFSWYsQ0l2QjJCLEdKdUJ2QixBSXZCMEIsQ0FBQyxDSnVCekIsRUl2QjRCLEdKdUJ2QixFQUFFLEFJdkIwQixDQUFDLEdBQUcsRUFDeEQsQ0FBQTtBTm1CRCxBRUlBLEFDZEYsQUNUQSxBQ0NFLEFOb0NGLEFnQnBFRixHTmtCRyxJUm9DNkIsQWN0RHpCLENma0RDLEFFSUEsQUd0QkEsQ0FBQyxFSHNCRSxHQUFHLENBQUMsQWF0REUsRWZrREEsQUluQkEsQUNDQSxDQUFDLENMa0JDLEFJbkJGLENGdUJHLEFDZEEsQUVSRCxDSHNCRSxDQUFDLEFDZEYsQ0RjRyxDSGNDLEFnQnBFRSxDVmdDRixDTm9DQSxDTXBDTCxBVTdCakIsQ2JtRDBCLENBQUMsQ0FBQyxDQUFDLENHdEJQLENIc0JTLEFhckQvQixDVitCd0IsRVUvQnRCLEVicURrQyxDQUFDLENhckQ1QixFYnFEK0IsQWFwRHhDLENib0R5QyxDQUFDLEFhcER4QyxDYm9EeUMsQ0V2QnpCLENGdUIyQixFYXBEcEMsRUFBRSxDYm9EdUMsQUNkN0IsQUVScUIsQ0hzQlMsQ0d0QlAsRUhzQlUsQWFuRC9DLENibURnRCxDQUFDLEFIY2pDLENHZGtDLEFIY2pDLENHZGtDLEFHdEJSLENIc0JRLEFIY2hDLENNcEN5QixDQUFDLENBQUEsQU5vQ3ZCLEVBQUU7QUNqQjNCLEFDSUEsQUNBRixBQ2ZxQixBQ1JyQixBRUNBLEFQb0NBLEdNcENELEdDQUcsQ0FBQyxDSnNCQyxBQ2ZxQixBQ1JyQixBTHFDQSxDSTdCc0IsQ0ZlcEIsRUFBRSxBQ0FBLENFdkJDLEFFQ0EsQ0FBQyxBUG9DQSxFSTdCdUIsQUNSckIsQ0Z1QkMsQUhjQSxDQ2xCQyxBR1hxQixBR1ByQixDTmtCQyxBR1hvQixBR1BwQixDTHNCQyxBR3ZCQSxDTHFDQyxDQUFDLENPcENDLENKc0JDLEFJdEJBLENGREMsQ0Z1QkMsQUV2QkEsQ0xxQ0MsQ0NsQkMsQURrQkEsRUdkRSxDRkpDLEFFSUEsQUV2QkEsRUFBRSxDQUFBLElFQ0ssQ0FBQyxJTmtCSSxBRUlBLENBQUMsQUhjQSxDQUFDLENDbEJDLENBQUMsRUVJRSxBSXRCQSxDSnNCQyxBSGNBLENDbEJDLEFFSUEsQUl0QkEsQVBvQ0EsQ09wQ0MsQVBvQ0EsQ0dkQyxBSXJCOUMsQVBtQzhDLENDbEJDLEFEa0JELENDbEJFLENFSUMsQ0ZKQyxBRUlBLEFJckI5QyxDSnFCOEMsQUlyQjdDLEdOaUJpRCxHQUFHLENBQUMsQ0FBQyxHQUFHLEFNakI5QyxJTmlCa0QsQ0FBQSxZTWpCbkMsYUFBYSxDQUFDLENBQUMsVUFBSyxhQUFhLENBQUMsQ0FBQyxPQUFJLENBQUE7QUxzQnZFLEFHdkJGLEFDQ0YsQUNDRSxBUG1DQSxBVWxERixHUG9DQyxBQ2hCc0MsRUhZcEMsQURrQkEsQ09uQ0MsQVBtQ0EsQ09uQ0MsQVBtQ0EsQ0tyQ0MsQUxxQ0EsQ1VsREMsRVZrREUsQVVsREYsRUhlSSxDQUFDLEFQbUNBLENBQUMsQ0tyQ0MsQUxxQ0EsQ0FBQyxDT25DQyxDRkZDLEFFRUEsQVBtQ0EsQ0FBQyxDQUFDLENFZEMsQUZjQSxDS3JDQyxBRUVBLEFQbUNBLENFZEMsQUtyQkEsRVBtQ0UsQ01wQ0MsQ0pzQkMsQUd2QkEsQUtibEIsQ0xhbUIsQUNDRixBTm9DRSxBVWxEbEIsQ1ZrRG1CLENBQUMsQVVsRGxCLENWa0RtQixDQUFBLEFVbERqQixFQUFFLEdIZXFCLENBQUMsR0ZGRyxDQUFDLEVBQUMsSUVFSyxDRkZBLENFRUUsQ0ZGQSxBRUVDLENBQzdDLEdGSGdELENFRzVDLENGSDhDLEFFRzdDLE1ERmdCLEdERHNDLEVBQUUsQUNDbkMsQUNFVixFREZZLEVERHFDLEVBQUMsQ0FBQyxDQUFBLFNFR3BDLGFBQWEsQ0FBQyxDQUFDLFVBQUssYUFBYSxDQUFDLENBQUMsT0FBSSxDQUFBO0FOaUJ6RSxBQ0lFLEFDQUosQUNoQkEsQUNQRSxBQ0NBLEFOb0NBLEFVbERBLEdIZ0JELEtOZ0JLLEFJbkJBLEFDQ0EsQU5vQ0EsQVVsREEsQ05vQkMsQUVOQSxBTm9DQSxBVWxEQSxFUG9DRSxBQ2hCRixFRGdCRSxBRXZCRSxDSHVCQyxFREpFLEFDSUEsQUd2QkEsQ0NDQyxBTm9DQSxDTXBDQyxBTm9DQSxDQ2xCQyxDQ0lDLEFGY0QsRU1wQ0csQ0FBQyxPRk1YLEVEZ0JBLElIY3VCLEVHZGpCLEFIY21CLEVHZGpCLElHdEJ3QixBTm9DRCxDTXBDRSxDTm9DRCxDQUFDLENBQUEsRU1wQ0ssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBSnVCMUQsQUNBRixBQ2hCQSxBQ1BFLEFFR0osQVV0Q0YsR1hvQ0csQU5vQ0EsS0dkSyxBQ2hCQSxBR0pBLEFHakJHLENQcUNGLEFPckNHLENIaUJKLENGSEcsQ0Z1QkMsQWN6Q1osQ2J5QmEsQUNQQSxDQUFDLENBQUMsQ0RPQyxDQ1BDLENGdUJDLEFFdkJBLENGdUJDLENEQUMsQUVoQkEsQUNQQSxDRE9DLEFDUEEsQVlsQlosQ2Z5Q2EsQUNBQSxBRXZCQSxDRnVCQyxDQ2hCQyxFRmdCRSxBRWhCQSxDQUFDLENHSmhCLElVckJRLENkeUNJLENBQUMsQ2N4Q3RCLENid0JrQyxDQUFD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aEJGLEFDUEUsQUNDRixBTm9DQSxLR2hCZ0QsQ0ZKOUMsQUVJK0MsQ0FBQSxDR3BCN0MsQUlqQnFCLENOdUJwQixBTXZCcUIsQ051QnBCLENGZ0JDLEFGY0EsQ1VyRHNCLENSdUNwQixBSXRCQSxDRk1DLEFDUEEsQUtoQnFCLENBQUMsQ1J1Q3BCLEFFaEJBLEFDUEEsQUNDQSxBTm9DQSxBVXJEcUIsQ051QnBCLEFKOEJBLEFVckRxQixDQUFDLEVKaUJuQixDQUFDLEVGTUUsQ0NQQyxBS2hCcUIsQ051QnBCLENBQUEsQUVOQyxDQUFDLEFJakJxQixDQUFDLElKaUJqQixDQUFBLE1Ob0NPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FFYmpFLEFDRkYsQUNkQSxBQ1BFLEFDQ0YsR05vQ0QsS0doQkssQUlwQlEsQUdsQm1DLENQc0MxQyxBQ2RBLEFFTkEsQUlsQjJDLENOeUI3QyxBRVBHLENBQUMsQ0pzQkMsQUNGQSxBR3BCQSxBSWxCMkMsQ0hrQmxDLENMc0JQLEFReEMyQyxDTGlCMUMsQUNDQSxBQ0FRLEFHbEJrQyxFUndDeEMsQUd2QkEsQ0ZxQkMsQUlwQlEsQUFBQyxDSm9CUixBRXJCQSxDRFFGLEFFUEcsQUNBUSxDREFSLENIb0JFLEFDYkgsQ0RhSSxBQ1poQixHR1IyQixDSFF2QixDQUFDLEFHUndCLEdBQUcsQUFBQyxFSm9CakIsQ0FBQyxLQ1pELENBQUMsQ0FDakIsS0FBSyxDQUFDLE1BQU0sRUFBRSxVQUFBLENBQUM7QUZjaEIsQUd2QkEsQUNDRixBTm9DRixBVXRERSxBUXJCSixHQUFJLEdYdUNFLEVEQUUsQ0FBQyxBSWxCRCxBUXJCRyxDakJxREYsQVNoQ0EsQ1ZzREUsRUVkRSxBQ0hlLEFDWEYsQUo0QmYsQVV0REMsQ1BxQ2lCLEFDWEYsQU0xQmQsQ1J3Q0UsQUNIZSxBQ1hGLENDVFosQUtqQkQsQ1J3Q0MsQVF4Q0EsQVFyQkcsQ2hCNkRGLEFHdkJDLENKZUEsQ0NRQyxBQ0hnQixBQ1hGLEFDVGIsQUtqQkQsQ1RnQ0EsQUVLaUIsQUduQmYsQUlsQkQsQ1J3Q0MsQUNIZ0IsQUduQmYsQ0htQmdCLEFPckNoQixDUndDQyxBUXhDQSxDUndDQyxDUXhDQyxDUndDQyxBSXRCQyxBWXRDM0IsQ2pCb0QwQixBS2RFLEFJbEJELENSd0NDLEFJdEJBLEFJbEJBLENBQUMsQ1J3Q0MsQVF4Q0EsQ1J3Q0MsQUZjbkIsQVV0RG1CLENRcEIxQixDaEI0RDRCLENReENDLENSd0NDLEFReENBLENBQUMsQ1J3Q0MsQUZjbkIsQVV0RG1CLEFRcEIzQixDaEI0RDRCLEFReENBLENWc0RsQixBa0IxRVAsQ2hCNEQyQixFQUFFLEVBQUMsQVF4Q0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxBUXBCekIsQ1JvQjBCLENBQUMsQ0FBQSxJUXBCbkIsUUFBUTtBaEI2RGxDLEFHdkJBLEFMcUNGLEFVdERBLEdKa0JELEVIa0JtQyxBQ1hMLENEV00sQUNYTCxDRFdLLEFDVmhDLENIT0MsQURxQkEsQVV0REEsQ1ZzREMsRUk1QkUsQU0xQkEsQ04wQkMsQUo0QkEsQ0tyQ0MsQ0tqQkMsQ0xpQkMsQ0h1QkMsQ0d2QkMsQ0h1QkMsQUZjQSxDQUFDLEVFZEUsQVF4Q0EsQ1ZzREMsQVV0REEsQ1ZzREMsUVV0RFEsQ0FBQyxDVnNEQSxBVXREQyxDVnNEQSxBVXREQyxDQUFBLENWc0RDO0FFYjdCLEFDSkYsQUNWSSxBQ1RGLEFDQ0osQU5tQ21DLEFVckRqQyxPTjBCSyxDTTFCRCxDTjBCRyxDR1ZGLENKb0JFLENFbkJDLENFREEsQVBxQ2dDLEFVckQvQixDTGlCQyxBTG9DK0IsQ09yQ2hDLEFQcUNpQyxDRWI5QixBQ0pBLEFFbkJBLEFMb0MrQixBVXJEL0IsQ1BvQ0MsQUVuQkEsQ0h1QkMsRUVkUCxDRmNVLEFFZFQsQUoyQndDLENLcEM5QixBQ0NBLEFObUMrQixDS3BDOUIsQUxvQytCLEFVckQvQixDUG9DQyxBR2xCRixBTm1DaUMsQVVyRC9CLENQb0NDLEFIaUIrQixDR2pCOUIsQUhpQjhCLENVckQ3QixDUG9DQyxBT3BDQSxDUG9DQyxBRW5CQSxDRm1CQyxDQUFBLEFFbkJDLEFFREYsQUdoQkUsQ0xpQkMsQ0tqQkMsQ0FBQyxDQUFDLENBQUEsRUxpQkcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQUNDL0IsQ0REZ0MsQ0FBQyxDQUFDLEVDQzdCLENERGdDLENDQzlCLENERGdDLEdBQUcsQ0FBQyxDQUFDO0FId0I3RCxBR3ZCQSxBQ0NGLEFJbEJBLEdQb0NELEVIZ0J1RCxDQUFDLENBQUEsQ01sQ25ELEFDRkEsR0doQkcsQ0xpQkMsQ0NDQyxDRERDLENEUUUsQ0ZlQSxBRWZDLEFDUkQsQUNDQSxDRk9FLEFDUkQsQ0h1QkMsQUVmQyxBTXpCRCxDQUFDLENSd0NDLEFJdEJBLENBQUMsQ0p1QmhCLEFHeEJpQixBS2pCQSxDUnlDakIsQUd4QmtCLEFLakJBLEdKa0JHLENBQUMsRURERSxDS2pCQyxDTGlCQyxBS2pCQSxDTGlCQyxBQ0NBLENBQUEsQ0lsQkUsQ0FBQyxHTGlCRyxDQUFDLENBQUMsQUVEeEIsQ0ZDeUIsQUVEeEIsQ0doQnlCLENMaUJDLEFFRHhCLEFHaEJ3QixFSGdCdEIsQUFBQyxDRkN3QixBS2pCQSxDTGlCQyxBRUR4QixBR2hCd0IsQ0xpQkMsQ0FBQyxHRURyQixBR2hCd0IsQ0FBQyxDTGlCQyxBRUR4QixDRkN5QixBS2pCQSxDTGlCQyxBRUR6QixDRkMwQixDS2pCQyxDQUFDLENMaUJDLEFFRHpCLENHaEIwQixDTGlCQyxBRUR6QixBR2hCeUIsQ0FBQyxDQUFBLENMaUJFLENBQUMsQ0FBQyxHRUR0QixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEVBQUMsQUFBQyxHQUFHO0FKcUJwRSxBRW5CSSxBQ0NGLEFOa0NBLEFtQk1KLEdqQmpCRyxBUXpDQSxJTndCZ0IsQ0dSWCxBUG9DQSxBbUJNQyxDYnhDQSxBTmtDQSxDQ3JCRSxBS2JELENBQUMsQ0xhRSxBSWRELEFDQ0EsQU5rQ0EsQ0NyQkUsQ0VLQSxBRW5CQSxDQ0NDLENIa0JELEFFbkJFLENBQUMsQ0pjRSxBRHFCRCxBbUJNQSxDbEIzQkUsQURxQkQsQ01sQ0MsQWF3Q0csQ2J4Q0gsQ0RERSxBTG1DQSxDS25DQyxBTG1DQSxBbUJPckIsSWxCNUIwQixDQUFDLENBQUMsQUlkRCxBYzBDdkIsRWQxQ3lCLENKY0UsQUlkRCxDSmNFLEFEcUJGLENBQUMsQ21CT3RCLENuQlB3QixFR2hCcEIsQUVuQnVCLEFFRHhCLENKb0JFLEFFbkJ1QixDQUFDLEFFRHhCLENKb0JFLEFFbkJ1QixDRUR2QixDTmVpQixBSWRRLEFFRHhCLEFBQUMsQ05lZ0IsQUVLZixDSXBCQSxDTmVpQixBRUtmLEFFbkJ1QixDSmNQLEFJZFEsQUVEeEIsQVkyQ0EsQ2QxQ3lCLENKY0osQUlkSyxBRUR4QixDQUFDLEFZNENmLEVaNUNpQixBQUFDLENZNENiLENkM0NzQyxBRUR4QixDRkN5QixBYzZDakQsQ2Q3Q2tELEFFRHhCLENGQ3lCLENFRHZCLENBQUMsQUFBQyxDRkN3QixBYzZDakQsQ1o5QzBCLENGQ3lCLENFRHZCLEVGQzBCLEFFRHhCLENGQ3lCLEFFRHhCLENGQ3lCLENFRHZCLEFBQUMsQ0ZFeEMsQWM0Q2UsQ2Q1Q2YsQUVGeUMsSVk4Q2YsQ1o5Q29CLEVBQUUsRUFBQyxJWThDZCxFWjlDb0IsQ1krQ2pELENaL0NtRCxDWStDN0MsSVovQ2tELENBQUMsTVlpRDlELENaakRxRSxFQUFDLEFBQUMsRVlpRGxFLENaakRxRSxVWWlEMUQsSUFBVSxLQUFLLFNBQVMsR0FDbkMsRUFBTSxXQUVSLEVBR1QsUUFBUyxVQUFTLEVBQUcsR0FDbkIsTUFBSSxNQUFLLFNBQVMsR0FDVCxFQUFFLE9BQVMsRUFBSSxFQUFJLEVBQUUsTUFBTSxFQUFHLEdBRTlCLEVBSVgsUUFBUyxZQUFXLEdBQ2xCLE1BQU8sVUFBUyxLQUFLLFVBQVUsRUFBSyxPQUFRLFVBQVcsS0FBTyxJQUN2RCxFQUFLLFNBQVcsSUFDaEIsU0FBUyxLQUFLLFVBQVUsRUFBSyxTQUFVLFVBQVcsS0FjM0QsUUFBUyxNQUFLLEVBQVEsRUFBVSxFQUFTLEVBQVUsR0FDakQsS0FBTSxJQUFJLFFBQU8sZ0JBQ2YsUUFBUyxFQUNULE9BQVEsRUFDUixTQUFVLEVBQ1YsU0FBVSxF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YixLQUFLLEVBQVEsRUFBVSxFQUFTLE1BQU8sT0FBTyxpQkFzRGxELE9BQUEsVUFBZ0IsU0FBUyxFQUFtQixFQUFtQixHQUM3RCxRQUFRLE1BQU0sT0FBTyxHQUFNLE9BQU8sT0FBTyxLQUFLLGNBSWhELE9BQU8sYUFBZSxTQUFTLEVBQW1CLEdBQ2hELFFBQVEsTUFBTSxPQUFPLEdBQU8sT0FBTyxPQUFPLEtBQUssY0FHakQsT0FBTyxRQUFVLFNBQVMsR0FBTyxHQUFJLEVBQU0sS0FBTSxHQUVqRCxJQUFJLFlBQWEsT0FBTyxNQUFRLFNBQVUsR0FDeEMsR0FBSSxLQUNKLEtBQUssR0FBSSxLQUFPLEdBQ1YsT0FBTyxLQUFLLEVBQUssSUFBTSxFQUFLLEtBQUssRUFFdkMsT0FBTztBbEIzU0csQUNVVixBQ0xFLEFDWkksQUNOSixBQ0FBLEFOaUNpQyxBVW5EbkMsT053Qk8sQUdSQyxDSm9CRixBR2xCQSxDRk1HLEFFTkYsRURBRSxFTGlDaUMsQ0dmOUIsQUhlK0IsQ0tqQzlCLEFMaUMrQixDQ3BCOUIsQUliQSxDSHVCQyxBQ0xBLEVES0EsQ0RWRyxBR1BULEFKMkJ3QyxDR2Y5QixBQ1pULEFFTlMsQU5pQytCLENHZjlCLEFHbEJBLEFOaUMrQixDQ3BCOUIsQURvQitCLENBQUEsQVVuRDlCLEVBQUEsQ1BvQ0csQUdsQkEsQ0xhQyxBRUtBLEFHbEJBLENMYUMsQUtiRCxLTGFNLEFFS0EsQ0ZMQyxBRUtBLEVFbEJFLENBQUMsRUphRSxBRUtBLENGTEMsQUVLQSxDQUFDLEFFbEJBLENGa0JDLEFFbEJBLENKYUUsQUVLRixDRkxHLENDVTFCLEVHdkI0QixDSmFFLENJYkEsS0FBSyxDQUFDLENKYUUsQUliRixDS2xCL0IsRVQrQm9DLENBQUMsQ0FBQSxBQUFDLEVTL0JoQyxDVCtCbUMsQ1MvQmpDLEVUK0JvQyxBQUFDLENBQUEsS1MvQjdCLEVBQUUsS0FBSyxFQUFFO0FUZ0N0QyxBRUtSLEFPcENBLEdMa0JELEFDQUEsRUhrQkUsQUhjbUQsQ0dkbEQsQUlwQkEsQVBrQ21ELENBQUEsQ1VsRGpELEdQb0NHLEFPcENBLEdQb0NHLEFPcENBLENOdUJFLENIUUEsQUdSQyxDRmtCOEIsQUNMOUIsQUNiQyxDRGFELEFDYkUsQ012QkEsRVJ5Q2dDLENEVjdCLEFDVThCLEFRekM5QixFQUFDLENUK0JHLEFTL0JGLENUK0JHLENDVThCLEFRekMvQixHVCtCSyxFUy9CQSxDQUFDLENBQUMsQ0FBQyxFQUFFLENUK0JHLEFTL0JGLEVBQUUsQ1QrQkcsQ0FBQyxDQUFBLEFBQUMsRVMvQkEsQ1QrQkcsQVMvQkYsQ0FBQyxDQUFDLENUK0JHLENTL0JGLEVUK0JLLENTL0JGLEVUK0JLLEFBQUMsQ0FBQSxFUy9CRCxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7QVRnQ2xFLEFFS1IsQUVsQkYsQUNBQSxBTmdDRSxBVWxEQSxPTnNCZSxDRmtCVixBQ0pELEFHbEJBLEFJbEJBLENQb0NDLENHbEJELEFJbEJFLENWa0RDLEVFVkcsQVF4Q0QsRUFBRSxDVCtCQyxBRG1CQSxBVWxEQSxDUG9DQyxBSGNBLENHZEMsRUFBQyxDT3BDRSxDQUFDLENSd0NiLEFHdEJjLENMZ0NDLENDbkJDLEFJYkYsQUxnQ0UsQ0dkQSxBSGNDLEVDbkJFLEFDU2QsQUNKSyxBR2xCUixBTmdDaUIsQVVsREEsQ1QrQkUsQURtQkQsQ0FBQyxBVWxEQSxDVmtEQSxBVWxEQyxHUG9DTixFQUFFLENPcENVLENUK0JFLEFTL0JELENBQUMsQ0FBQyxDVCtCRSxBRUtWLENGTFcsQVMvQkQsQ1BvQ1IsQU9wQ1MsQ1QrQkcsQVMvQkYsQ1QrQkcsQVMvQkYsQ1QrQkcsQVMvQkYsQ1QrQkUsQUVLVixDQUFDLEdPcENZLENBQUMsQ0FBQyxHTGtCN0IsQUtsQmdDLENQb0NSLEFPcENTLENQb0NSLEFPcENTLEVBQUUsQ0xrQi9CLEVBQUUsQUtsQmdDLENQb0NSLEFPcENTLENQb0NSLEFPcENTLEVQb0NSLENBQUMsQUVsQnRCLEFLbEJnQyxDUG9DVixDRWxCcEIsQ0tsQmlDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7QVRnQ25FLEFHVEosQUNKSixBQ0FBLEFJbEJBLEFVOUJ5QixHakJrRTFCLEFIY0EsS0VYYSxBSXJCUixDREFDLEFDQUEsQ0NKQSxDSFFJLEFNdEJGLENMa0JDLEFDQUEsQ0ZJRyxBR1JILENMeUJVLENJckJQLEFDSkYsQ05pQkcsQUtiRCxDREFFLEFLbEJBLENBQUMsQVU5QlAsR25CNkRVLEFJYkEsQUtsQkEsQ0FBQyxFVCtCRSxBQ1FSLENHckJTLENBQUMsQWVoRFIsRW5CNkRVLEFHVGIsQ0FBQyxDRmlCTSxDRFJVLEFJYkQsQUVKRixDTmlCSSxBSWJGLEFLbEJULENBQUMsQVU1QnJCLEVWNEJ5QixDVCtCVSxJbUIzRDVCLEluQjJEb0MsR0FBRyxDQUFDLEFtQjNEOUIsQ25CMkQ4QixBQUFDLEdBQUksQ0FBQyxDQUFBLEdtQjNEbEIsRUFBTSxHQUN2QyxFQUFLLE9BQVMsRUFDZCxFQUFLLFVBQVksT0FBTyxPQUFPLEVBQVUsV0FDdkMsYUFDRSxNQUFPLEVBQ1AsWUFBWSxFQUNaLFVBQVUsRUFDVixjQUFjLE1BTXBCLE9BQU8sUUFBVSxTQUFrQixFQUFNLEdBQ3ZDLEVBQUssT0FBUyxDQUNkLElBQUksR0FBVyxZQUNmLEdBQVMsVUFBWSxFQUFVLFVBQy9CLEVBQUssVUFBWSxHQUFJLEdBQ3JCLEVBQUssVUFBVSxZQUFjO0FuQjBDckIsQUVLVixBRWxCRSxBQ0FBLEFOZ0NGLEFVbERJLFFSc0NrQixBS3hCaEIsQ0ZJQyxDQUFDLEFLbEJBLENKa0JDLElKb0JvQixBRWpCWCxBTXJCTCxDTnFCTSxDQUFDLENDSEosQUtsQkEsQ1QrQkMsQUliQSxHREdRLENEZUosRURFQyxBQ0ZELENFbEJHLEFLbEJBLENMa0JDLEFLbEJBLENWa0RDLEFVbERBLENBQUMsQ1ZrREMsQVVsREQsRVJzQ0UsQUdwQkMsQ0FBQyxLQUFLLEVBQUUsQUVKeEIsQ0FBQyxFQUFFLEVGSTBCLEFFSnhCLEFBQUMsQ0ZJd0IsQ0VKdkIsRU5pQkUsR0liMkIsQUVKeEIsQ0ZJeUIsQ0phdkIsQUlidUIsQUVKdkIsRU5pQkUsQUVLUixBSXRCTyxDTmlCRSxBQUFDLEVBQUMsQUVLUixDSXRCUSxDSnNCTixDSXRCUSxFSnNCTCxDRkxTLENFS1AsQUhjSixDQ25CYSxBRG1CWixDQ25CYSxBQUFDLEVBQUMsQU1qQkQsQ0FBQyxFTmlCRyxFQUFFLENBQUMsQUFBQyxBTWpCRixDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsRUFBQyxBQUFDLEdBQUc7QU5rQjFELEFFS1YsQUVsQkEsT0RFdUIsQ0ZpQk0sQUNEekIsQUl0QkEsQ0ZJQyxDQUFDLENMK0J5QixDQUFDLENBQUMsS0VaTSxBR25CekIsQUwrQndCLENLL0J2QixJSmFJLEFFS0EsR0FBRyxFRENPLEVDREgsQ0FBQyxDRWxCQyxDQUFDLEdGa0JHLENGTEQsQUVLRSxDRENNLEFLdkI3QixDRkl5QixDQUFDLEFFSnhCLEVBQUUsQ05pQnVCLEFNakJ0QixBQUFDLEVBQUMsRUFBRSxFQUFFLEVBQUUsQUFBQyxDSnNCd0IsQ0FBQyxBSXRCeEIsRUFBRSxDRkl5QixDQUFDLEFFSnhCLENKc0J5QixBRWxCRCxBRUp2QixBQUFDLEVKc0J5QixBSXRCeEIsQ0pzQndCLENJdEJ0QixDTmlCa0IsQ01qQmhCLEVBQUUsQUFBQyxFQUFDLElOaUJxQixDTWpCaEIsRUFBRSxFQUFDLENOaUJpQixLTWpCWCxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUMsQUFBQyxHQUFHO0FOa0JsRSxBRUtWLEFDaEJJLEFDRkosQUtsQkUsR1ZnRG9DLElPbENoQyxDTHVCRCxBR25CRCxBQ0ZZLENKcUJWLEFHbkJELENLbEJDLEVScUNXLEFFakJQLEFDRkYsQ0NGYSxDRklULENFSlcsQUloQlosRVJxQ1csQUduQlQsQUNGVyxDREVWLEFLbEJBLENUK0JDLEFFS0EsQ0FBQyxDRkxDLENTL0JDLENUK0JBLEFFS0MsQU9wQ0EsQ1BvQ0MsQUVsQkEsQUNGVyxDREVWLENDRlksQUloQlgsQ1QrQkEsQUVLQyxBR3BCVyxBSWhCWCxDTGtCQyxDQUFDLEFDRlcsQUloQlgsQ1BvQ0MsQUNoQmQsQU1wQmMsQ1BvQ0EsQUNoQmIsSU1wQmtCLENBQUMsQ0FBQyxDQUFDLENMa0JULEFLbEJVLENMa0JULENDRnNCLENJaEJWLENKZ0JZLEVBQUUsRUFBQyxBQUFDLEFJaEJYLENUK0JGLEFTL0JHLENBQUMsQ0FBQyxDQUFDLENBQUEsQ1QrQkQsTUFBRyxFQUFDLEFBQUMsR0FBRyxDQUFBO0FFTXRELEFIWUYsQVVoREksQVc1Qk4sTWY0Q00sQUNGQSxFTHNCTSxBQ0FKLEFrQmhFQyxDbkJnRUksQUNBSixFRkxFLEFTL0JBLENUK0JDLEFDS2dCLENHbkJNLENBQUMsQUtqQnJCLENObUJPLEFDRmUsQ0RFZCxBQ0ZlLENGbUJwQixBQ2pCTSxDRmlCVyxBQ0FoQixDT3BDQyxDUG9DQSxDRW5CdUIsQ0FBQyxBS2pCckIsQVczQmxCLENqQjhDeUIsQUNGZSxDQUFDLEVBQUUsQWdCNUN2QyxDaEI0Q3dDLEFLakJyQixDTGlCc0IsQUwrQnJCLEFVaERELEVWZ0RHLEdLL0J3QixDQUFDLENGbUJyQixBRW5Cc0IsQWdCNUNwRCxDaEI0Q3FELEFnQnpDckQsQ2xCNERlLEFFbkJ3QyxTZ0J6QzVDLENBR1gsS2xCeUQ4QixBa0IzRDlCLEVsQjJEK0IsQ0FBQyxBa0IzRDVCLENsQjJENEIsRWtCMUQ1QixFQUFNLE1yQnNFZ0IsQXFCdEVWLENyQnNFVyxNcUJyRXJCLEdBQUssQ0FDUCxFQUFlLE1BQ2YsUUFFQSxLQURBLEdBQUksR0FBSSxLQUNDLEVBQUksR0FDVCxFQUFhLElBRWpCLEdBQU0sTUFBTSxPQUVoQixVQUFXLEdBZ0JmLFFBQVMsU0FwQ1QsR0FBSSxTQUFVLE9BQU8sV0FDakIsU0FDQSxVQUFXLENBb0JmLFNBQVEsU0FBVyxTQUFVLEdBQ3pCLE1BQU0sS0FBSyxHQUNOLFVBQ0QsV0FBVyxXQUFZLElBSS9CLFFBQVEsTUFBUSxVQUNoQixRQUFRLFNBQVUsRUFDbEIsUUFBUSxPQUNSLFFBQVEsUUFDUixRQUFRLFFBQVUsR0FDbEIsUUFBUSxZQUlSLFFBQVEsR0FBSyxLQUNiLFFBQVEsWUFBYyxLQUN0QixRQUFRLEtBQU8sS0FDZixRQUFRLElBQU0sS0FDZCxRQUFRLGVBQWlCLEtBQ3pCLFFBQVEsbUJBQXFCLEtBQzdCLFFBQVEsS0FBTyxLQUVmLFFBQVEsUUFBVSxTQUFVLEdBQ3hCLEtBQU0sSUFBSSxPQUFNLHFDQUlwQixRQUFRLElBQU0sV0FBYyxNQUFPLEtBQ25DLFFBQVEsTUFBUSxTQUFVLEdBQ3RCLEtBQU0sSUFBSSxPQUFNLG1DQUVwQixRQUFRLE1BQVEsV0FBYSxNQUFPO0FYdEI5QixHUG9DSCxFRXBCd0QsQ0FBQyxDREUvQixBQ0YrQixDSG1CN0MsQ0RKSCxBQ0lJLEFFaEJULENBQUMsQ0FBQSxBSjRCMkIsQ0VaQyxBRllBLENBQUMsQVUvQ3hCLEVBQUMsR1YrQzRCLENFWkMsQ1FuQ3hCLEVBQUwsS0FBSyxFQUFFLENBQUMsRUFBRCxDQUFDLEVBQUMsQ0FBQTtBUHFDckIsQUVwQkUsR0RHRCxBSjJCdUMsRVU5Q3JDLENBQUMsQ0FBQSxDVCtCRSxBSWZBLENBQUMsQ0NGRSxBQ0ZGLEVGSUcsR0NGSSxFREVDLEFDRkMsQ0RFQSxDRUpBLENERUcsQUFBQyxDQ0ZILENERUksRUhzQkMsQUVwQkEsQ0FBQyxDRm9CRCxFRXBCSSxBQ0ZDLENERUEsQ0NGRSxDQUFDLEFBQUMsRUFBQyxLQUFLLENERVYsQ0FBQyxBQ0ZXLEVDRkQsR0RFTSxDQUFDLFFBQVEsQUFBQyxJSHNCL0IsR0FBRyxFQUFFO0FERDFCLEFDQzRCLEFDaEI5QixBSjJCQSxHVTlDQyxFQUNGLENBQUEsRVJpQ08sQUNDNEIsQUNoQjVCLEFFRkEsQUNMQSxBUGtDQSxDRVpDLEFDQzRCLENDaEI3QixBSjJCQSxFRVpJLENHbkJzQixDSG1CcEIsQUduQnFCLENIbUJwQixBR25CcUIsS0htQmhCLEFHbkJxQixDSG1CcEIsQUduQnFCLENBQUMsQ0FBQyxJSG1CakIsQ0VmaEIsQUoyQkEsQ0Vaa0IsQ0FBQyxBQ0M0QixDQUFDLENBQUMsRUFBRSxFREQxQixDQUFDLEFDQzRCLENERDNCLEFDQzRCLENERDNCLEFDQzJCLEVERHpCLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDaEUsQUZZQSxBc0JwRkosR25Cd0VvRSxFRXBCeEIsQ0FBQyxDQUFBLEFpQnBEdEMsQ3BCd0VDLENBQUMsRUZZRSxDQ2pCQSxBQ0tDLEVBQUUsQ0FBQyxBb0J4RUUsRWxCeURnQixHRmViLENETEEsQUNLQyxBRWZnQixDQUFDLEVrQnpESCxHcEJ3RVIsQUVmZ0IsQWtCeER6QyxFcEJ1RTJCLENBQUMsR29CdkVyQixFckJrRXVCLENDS0ksQ0FBQyxBb0J2RU4sQ3BCdUVPLENBQUMsQ0RMRixDQUFDLEFDS0csR0FBRyxDQUFDLENETEYsQUNLRyxDRExGLEFDS0csS0RMRSxBQ0tHLENETEYsQUNLRyxBb0J2RTlCLENwQnVFK0IsQ0FBQyxFb0J0RTVCLENyQmlFNEIsQUNLRyxDRExGLEFDS0csQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDRExKLEFDS0ssQ0FBQyxDQUFDLENBQUMsQ0FBQSxNb0J0RXRELEdBQUksTUFDUyxrQkFBYixHQUFJLE1BQ2Msa0JBQWxCLEdBQUk7QXBCcUVkLEFDQUYsQUVwQkUsUUhvQkksQUVoQkMsQ0NKQSxDSmVDLEFDS0EsQUdwQkEsRUNDSSxDSm1CRCxBRWhCQyxFQ0pDLEdBQUcsR0NDSyxFRkdkLEFDSmMsQ0ZvQkMsQUVwQkEsQ0hvQlgsQ0FBQyxBQ0FVLEVDaEJWLENDSmUsSUFBSSxLQUFLLENBQUMsR0plckIsQ0FBQyxDS2R3QixDTGN0QixBS2R1QixDRERFLENBQUMsQ0FBQyxBQ0NELENBQUMsQ0RERSxDQUFDLENBQUMsQUNDRCxDRERDLEFDQ0EsQ0xjdEIsQUFBQyxBS2RxQixJSG1CM0IsRUduQitCLENIbUI1QixDR25CNkIsQ0htQjNCLFNHbkJxQyxFQUFDLFFBQVE7QUxlaEUsQUVJb0IsQUVuQjVCLEFDQ00sQUNMQSxRSnVCMEIsQUNoQnBCLEFDSFIsQ0ZtQjZCLEFFbkI1QixJSG1CUyxDQUFDLEFFaEJHLENGZ0JGLENBQUMsQ0RKSixBQ0lLLEFJbEJQLENKa0JRLENESkosQUNJSyxBSWxCUCxDSmtCUSxDREpMLEFDSU0sQUt2QlAsRUx1QlMsQUduQkwsQUVKSCxDTHVCUyxBRWhCYixBQ0hRLEFDQ0YsQ0xjRSxBQ0lNLEFJbEJQLENKa0JRLENESkwsQUNJTSxDQUFDLENBQUMsQUduQkwsQ0htQk0sQUNBdUIsQUNoQnBDLENGZ0JjLEFDQXVCLEFFbkI1QixDRm1CNkIsQ0dsQjdCLEFBQUMsQ0xjQyxBRUk2QixFRkozQixBSWZDLENGbUI2QixBRW5CNUIsQ0ZtQjZCLEFFbkI3QixDRm1CNkIsR0ZKekIsRUFBRSxBTW5CRixTTm1CVyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQUFBQyxHQUFHO0FJZHJFLEFFSk0sR0pzQjBELEVEQWhDLENBQUEsQUZZOUIsRUk1QmtCLEVIYWQsQUtmd0IsQ0RBdkIsQ0NBeUIsQ0ZFUCxBRUZRLEdEQXJCLENBQUEsRUNBMkIsQ0FBQyxFQ0p4QixDSE1JLENHTkgsQ0RJNEIsQ0FBQyxDQUFDLENGRXRCLEdFRjBCLENBQUMsQUNKM0IsS0RJZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUptQm5FLEFDQUYsQUl0QlEsR0ZJUCxLSGtCSyxDSW5CdUUsRUptQnBFLEdBQUcsTUt0QkksRUFBRSxFSnNCSSxBSXRCRixBQUFDLEVKc0JDLENEQVYsQ0FBQyw4QkNBVSxHQUFHLEVBQUU7QUFBRSxBQ2hCNUIsQUdMTSxBZ0J1RVYsUXBCbERvQyxBR2pCNUIsQWlCbUVDLENwQmxENEIsRUNoQjFCLEVGZ0JRLENESk4sQUNJTyxDQUFDLENBQUMsQUtyQlIsQ2dCdUVHLENoQnZFRCxDZ0J1RU0sR3JCbERNLEFxQm9EMUIsQ3RCeERvQixBQ0lPLEFLckJSLENMcUJTLEFLckJSLENMcUJTLEFxQm9EekIsQ3JCcEQwQixDQUFDLENBQUMsQUlqQnpCLENpQnNFTCxDckJyRGdDLEFDQXNCLENEQXJCLEFDQXNCLEFJckI5QixBQUFDLENMcUJRLEFDQXNCLEFHakIvQyxFSGlCaUQsRUdqQmhELENIaUJtRCxBb0JzRDdELENyQnREd0MsQUNBc0IsQUNoQjlDLENGZ0J5QixBQ0FxQixBR2pC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RjNDLEFDR1YsQUdoQkYsTUwwQkksRUdWRyxBR2JELEFDUEEsR0xvQkcsSUFBSSxDQUFDLEFHaEJBLEVGZ0JHLEFFaEJILENKYUcsRUFBRSxBRUdFLElBQUksQ0FBQyxLQUFLLENBQXhCLEtEQTRCLENBQUMsSUFBSSxBQ0F2QixBRWhCRixDSGdCMEIsSUdoQnJCLENIZ0IwQixDR2hCeEIsQ0hnQjBCLFNBQVMsQ0FBQyxDQUFBO0FERjVDLEFHWmhCLEdGZUcsR0VmRyxDQUFDLE9BQU8sR0FBRyxHSFlHLEVBQUUsU0daUyxDQUFBLFVIWVc7QUFDMUIsQUVFWixRQUFJLElHZE0sSUhjRSxHQUFHLEVBQUUsQUdkRSxDTFlELEFFRUQsRUZGRyxNQUFNLGNLWmEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsTUFBSSxFQUFDLFVBQVUsRUFBQyxRQUFRO0FMYTVELEFDR2QsQUNERSxBRWZBLEFDQ00sQUNQQSxBaUI5Q1YsUXJCbUVRLEFFZkEsQUx3QkEsSXdCMUVSLEVuQmtEYyxFbUJsRFYsQ3JCaUVhLEFFZkEsQUNDRixFSmVJLEFHaEJBLEFDQ0YsQ0hjRyxBRWZELENIZ0JBLEFLdEJBLENObUJHLENNbkJGLENObUJJLEFLWkYsQ0FBQyxLTFlPLEFFRUEsQXFCakVYLEV2QmdFSixBQUFDLENFQ2lCLEFHZEYsQUFBQyxDSGNFLENGRGYsRUVDa0IsQ0FBQyxBcUJqRVgsQ3JCaUVXLElJckJFLE9Mc0JsQixNc0J4Q2xCLG1DQUNGLHNCQUF1QixTQUFTLEVBQVcsR0FDekMsT0FBUSxhQUFhLEtBQUssTUFBTyxLQUN6QixhQUFhLEtBQUssTUFBTyxJQUlyQyxRQUFPLFFBQVU7QXRCa0NiLEFDREEsQUVmQSxBRU5NLFFMc0JGLEFDREEsRUVmRSxDQUFDLENKY0MsQUNFQSxBR2hCQSxDRmVDLEFFZkEsRUhnQkUsQ0NEQyxBRWZBLEFBQUMsR0hnQkUsQ0FBQSxDR2hCRyxDQUFDLEFFTkgsQ0ZNSSxDQUFDLEFFTkosRUpxQkssQ0VmRSxFRmVDLENBQUMsQ0FBQSxBRWZFLENBQUMsQUVOSixLRk1TLENBQUMsSUpjckIsQ0FBQyxBSWR5QixFSmN4QixDSWQ0QixDQUFDLEdBQUcsQ0FBQyxDQUFBLDBCSmNBO0FBQ3ZDLEFDRVYsQUNEQSxBRWZBLEFFTk0sUUxzQkYsQ0lqQm1DLENEQ2pDLENGZUMsQUVmQSxDQUFDLENIZ0JDLEFHaEJBLEdIZ0JHLEFHaEJBLEVBQUUsRUhnQkUsQUt0QkYsQ0xzQkcsQ0t0QkQsQ05vQkcsQUlkQSxDQUFDLEFFTkYsQUFBQyxDRk1FLENIZ0JDLEFHaEJBLENIZ0JBLEVHaEJHLElBQUksQ0FBQyxHSmNFLENBQUMsQ0lkRSxDQUFDLEdKY0UsQ0FBQyxFSWRHLENBQUEsQUFBQyxFSmNDLENBQUMsQUlkQyxDQUFDLEdBQUcsQ0pjQSxBSWRDLENKY0EsQUlkQSxNSmNLO0FBQzlDLEFDRVYsQUdoQkEsQUVOTSxRTHNCRixBSWRBLEVKY0UsQ0doQkMsRUhnQkUsR0t0QkMsQ0xzQkcsQUdoQkEsQ0hnQkMsQUdoQkQsQUVORCxDTm9CRyxFQUFFLEFDRUEsRUFBRSxBS3RCRixDTHNCRSxBS3RCRCxTQUFTLEFBQUM7QU5xQmhCLEF3QnRFaEIsR3BCd0RHLE1Mb0JpQixHeUJuRXBCLFNBQVMsU3hCNkRxQixFQUFFLEd3QjdEVixFQUFNLEdBQzFCLEdBQUksQ3hCNERzQyxHd0I1RDdCLEVBQ1gsT0FBTyxDQUVULElBQUksRUFFSixLQUFLLElBQU8sR0FDVixHQUFJLEVBQUssZUFBZSxNQUNsQixFQUFLLGVBQWUsSUFBUSxFQUFLLEtBQVMsRUFBSyxJQUNuRCxPQUFPLENBSVgsS0FBSyxJQUFPLEdBQ1YsR0FBSSxFQUFLLGVBQWUsS0FBUyxFQUFLLGVBQWUsR0FDbkQsT0FBTyxDQUdYLFFBQU8sRUFHVCxPQUFPLFFBQVU7QXhCeUNELEFDRVosQUdoQkYsTUZhSSxFREdFLENLdEJPLEVMc0JKLENJaEJHLEVKZ0JBLEVHaEJFLEVIZ0JFLEFHaEJGLENIZ0JHLEVJaEJJLENKZ0JELEVBQUUsQ0FBQyxJREZJLEVBQUUsQUNFQSxDQUFDLEtERkssQUNFQSxDQUFDLENBQUMsR0doQnRCLENIZ0IwQixDQUFDLEFJaEJELENBQUMsR0RBckIsQUNBd0IsQ0FBQyxDREF2QixFQ0EwQixDQUFDLENBQUEsTUFBSSxFQUFDLFVBQVUsRUFBRSxRQUFRLEFBQUM7QUxlOUQsQUNFVixBR2hCRixBQ0FNLFFEQUYsQUVOQSxBUHlCQSxHRUhHLEVBQUUsQUdoQkEsR0FBRyxDQ0FELENKZ0JHLEFHaEJBLENIZ0JDLEFHaEJELEFDQUQsQ0pnQkcsRURGRSxDQ0VDLENERkMsQUtkRixDQUFDLEdKZ0JLLENBQUMsSUloQkUsQUFBQyxJTm1CbkIsRUVIMEIsQ0ZHdkIsRUVIMEIsQUZHekIsQ0VIMEIsQ0RGQyxpRERLd0I7QUNKcEQsQUNFVixBR2hCRixBTG1CTSxTS25CRCxDQUFDLEFDRHdCLENEQ3ZCLENIZ0JDLEFHaEJBLEFDRHdCLENBQUMsQ0ppQnZCLENHaEJDLEFMbUJBLENLbkJDLENMbUJDLEVFSEUsQUlqQndCLENKaUJ2QixBSWpCd0IsQ0ppQnZCLENHaEJDLEFMbUJBLENLbkJDLEFMbUJBLENFSEMsQUdoQkEsQ0FBQyxBQ0R3QixDQUFDLENMZXZCLEFLZndCLENEQ3ZCLENKY0MsQUNFQSxBR2hCQSxDSmNDLEFDRUEsQUdoQkQsQ0NEMEIsQ0FBQyxDREN2QixDQUFDLEVMbUJFLEFBQUMsQ0tuQkEsQUNEd0IsQ0FBQyxDTm9CdEIsQ0VIQSxDR2hCQyxDQUFDLENIZ0JDLEFJakJ3QixDSmlCdkIsQUlqQndCLENBQUMsQ0FBQyxDREN2QixBQ0R3QixDREN2QixLQUFLLENBQUE7QUplckMsQUVIUixBRVhKLEtIZ0JDLENBQUMsQ0FBQyxBRkdHLEVLbkJELEFDRnNFLENERXJFLENBQUMsQ0hnQkMsQUdoQkEsQ0hnQkMsRUdoQkUsRUFBRSxFRldBLENGR0csRUFBRSxDSWRDLENBQUMsQ0FBQyxDQUFDLEVKY0UsQ0lkQyxDSmVkLEFBQUMsQUlmYyxDQUFBLEFBQUMsRUplWixDSWZlLENBQUMsQ0ZXSCxFRVhNLEVGV0YsQ0FBQyxDRVhLLENBQUMsRUZXRixHRVhPLENBQUMsTUZXSCxBRVhTLENBQUEsUUZXQSxNQUFJO0FETXJELEFDTEUsQUVYSixBRVJNLE1QMkJKLEVNcEJFLEdMZ0JNLEFJZkgsR0hnQkcsQ0t4QkQsQ0x3QkcsQUdoQkEsQ0FBQSxBRVJGLEdKbUJJLEVBQUMsSURLTyxDS3hCRixDRE9mLEVIWWtCLEVHWmQsSUFBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEFBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxBQUFDLEVBQUMsU0FBUyxzQkFBb0IsQ0FBQyxHQUFHLENBQUMsTUFBSTtBSmtCL0QsQUNMRSxBR1pFLEFDUEEsR0ZRUCxNSmVTLENDQ0YsRUFBRSxDQUFDLEVDTEEsQUdaRSxFSFlBLEFHWkUsQ0ppQkMsQ0FBQyxFSWpCRSxBQ1BGLENKbUJDLEFHWkUsQ0hZRCxJR1pNLENBQUMsQ0ppQkMsR0FBRyxDSWpCQyxDQUFDLENBQUMsQ0ppQkMsQUNMRixBQUFDLEFHWkMsQUFBQyxFQUFDLEFDUEosQ0FBQyxVQUFLLENBQUMsQ0RPVSxFQUFFLEdDUFIsQ0RPWSxDQUFDLG9CQUFvQixBQUFDO0FKa0J6RSxBR2hCSixBQ0RRLEFDUEEsT051QkEsQ0VKRCxDREtBLENDTEUsQ0RLQSxBQ0xDLENES0EsSUdoQkksQ0hnQkMsQUNMQyxDREtBLEFDTEMsQUVYSCxDQ0RHLEVBQUUsQ0NQRCxDSm1CSSxDQUFDLEFJbkJKLENKbUJLLENHWkEsQUFBQyxFSmlCQyxDQ0xFLEFHWkEsQ0hZQyxDREtBLENLeEJGLEdMd0JNLEFDTEMsQ0FBQyxNRVhwQixFQUFFLEVBQUUsRUFBRSxFQUFFLENGVzJCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FETS9ELEFHaEJGLEFFUk0sS051QkYsQ0FBQSxDRUpLLENFWEwsQUNBQSxBTmlCQSxLS2pCSyxHQUFHLElBQUksQUVSRixDRlFHLENIZ0JDLEFLeEJILEVMd0JLLEVHaEJFLENBQUEsQ0VSRCxFTHdCSztBREExQixBSWZBLEtIZ0JDLENBQUMsQUNMQSxDREtBLENEREUsQ0FBQyxDTXZCQyxDRlFDLEtBQUssQ0FBQyxDSmVDLElJZkksQ0FBQyxDQUFDLENBQUMsQ0ZXbEIsRUVYcUIsRUZXakIsR0VYc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FKZWpELEFFSFosR0VYTCxTQ0ZXLENMZ0JhLElFSFYsSUZHa0IsQUtoQlosQ0xnQlksWUVISCxJQUFJLENBQUMsSUFBSSxDR2JFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0hhTCxBR2JNLENBQUEsSUhhRCxFR2JLLEVBQUMsRUhhRixRR2JZLEVBQUMsT0FBTztBSm1CdkUsQUNMSSxBR2JFLFFKa0JGLEdDTEcsQ0RLQyxDQ0xDLENJckJJLENMMEJGLEVDTEUsQUdiRixBQ1JLLENMMEJGLEFDTEEsQ0RLQyxBSWxCRixBQ1JJLEVKcUJBLEFBQUMsR0diQSxDSmtCRyxBSWxCRixDSmtCRyxJSzFCTSxFTDBCQSxDQUFDLEFJbEJGLEFBQUMsQ0prQkM7QURGeEIsQUVGRCxTSEVhLEVHRlYsQ0l0QnVCLENOd0JsQixBRUZILENJdEJ1QixDQUFDLEVKc0JwQixDQUFDLEdBQUcsQUFBQyxBSXRCcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBTDRCbkUsQUNMSSxRREtBLENJcEJxRCxFQ1JtQixDSnVCcEUsRUFBRSxLREtLLEdBQUcsQUNMQSxBQUFDLFdES1UsR0FBRyxJQUFJLEVBQUUsQ0FBQTtBQUN0QyxBQ0xJLEFFWE4sT0NKVSxDTGVhLEFDS2pCLEFGSkEsRUNEa0IsQU12QmhCLEtOdUJxQixFQUFFLEFDS2hCLEVHaEJFLENIZ0JDLENETGlCLEFJWGxCLENGV0csQ0ZBaUIsQ0NLZixBQ0xBLENES0MsSURMb0IsRUFBRSxBQ0toQixDQUFDLEFDTEEsR0ZBbUIsQUVBaEIsQ0FBQyxBQUFDLENGQWdCLEFEQ3hDLEdDRDJDLEVBQUUsQURDeEMsRUFBRSxJRUk0QixDQUFDLEFGSnhCLENDRHlDLEFDS2hCLEFHaEI1QixBTFlJLEVDRDBDLEVDS2QsQ0FBQyxFRExrQixFQUFMLElEQzdCLEFBQUMsQ0NEaUMsRUFBQztBQ01wRSxBQ0xFLEFFWEosQUxZTSxNTWhCSixFTGVDLEFDS0MsQUdoQkEsRUhnQkUsRUdoQkUsQ0ZXQyxBSENBLEVHREUsQUVYQSxBTFlELENDREMsR0VBSSxBRVhBLENGV0MsQUVYRCxDSGdCRSxJQ0xJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQUFBQyxVSENRLEdBQUc7QUVLL0QsQUNMRSxBRVhKLE9KV00sQURDQSxDQ0RBLEFJWEYsS0FBSyxHQUFHLEdIZ0JHLENHaEJDLENIZ0JDLEFDTEEsQUVYQSxFRldFLEdFWEcsQ0ZXQyxDQUFDLFlES1ksV0NMVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQUFBQztBRE1oRSxBQ0xFLEtGREUsQ0RFSixFRUlFLEFHakJvQixFSGlCbEIsQUl0QkMsQ0pzQkEsRUdqQnNCLEVDTGpCLENES29CLENGWW5CLEFHakJDLEVIaUJDLEFHakJBLEtIaUJLLEFBQUMsQUdqQkQsRUFBRSxDSGlCRSxJRVpzQixDQ0xsQixDREtvQixDQ0xuQixBQUFDLENES29CLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBSGtCM0QsQUdqQkYsR0pXRCxFRUNLLENBQUEsRURLQSxBR2pCQSxBQ0xBLEVKc0JFLENBQUMsQUtoQ2lCLEVMaUN2QixBR2xCUSxDSGtCUCxDQUFBLENHbEJVLEtBQUssQ0FBQyxLQUFLLENDTGxCLEVES3FCLEtBQUssQ0FBQyxJQ0xmLEVES3FCLENBQUE7QUhtQnRDLEFHbEJBLEFDTE0sQ0xnQlQsQ0FBQyxDQUFBLEFFQ0MsS0RNSyxBR2xCQSxFRWZFLEVMaUNFLEVHbEJFLENIa0JDLEFJdkJBLEVES0UsQUNMQSxDSnVCQyxDQUFBLEFHbEJDLENBQUMsQUNMQSxBQUFDLE1ES0ssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FIbUJqRCxBQ05GLEFHakJRLFFKdUJGLE1DTk0sRUFBQSxBR2pCRSxDSnVCQyxDSXZCQyxFSnVCRSxDSXZCQyxBQUFDLE1KdUJLLENBQUEsWUNOVjtBRkFqQixBQ09JLEFHbEJBLEFDTE0sTUxnQkosQ0FBQyxBREFHLENHQ0QsQUVaRCxDQUFDLEdBQUcsQ0hrQkMsQ0RQQyxBQ09BLEFHbEJBLEFFakJHLENGaUJGLEFDTEEsRUxnQkUsQUtoQkEsQUNaRyxDSjZCRCxDRVpBLEFDTEQsQUNaRyxDTG1DRCxDRFBDLEFDT0EsQUNORSxBRVpGLENKV0EsQUlYQyxFQ0xDLENIaUJJLENBQUMsQUdqQkgsQ0p1QkUsQ0FBQyxDQUNyQixDS3BDeUIsQ0o2QkMsQ0FBeEIsQUdqQnNCLENKd0JwQixBR25Cc0IsQ0htQnJCLEFHbkJzQixBQ0xGLEFBQUMsTURLTyxDQUFDLENGWXRCLEdFWjBCLENIbUJyQixDR25CdUIsQ0htQnJCLEFHbkJzQixDQUFBLFFIbUJiLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3BCLEFJekJNLE1OZ0JKLE1PN0I0QixDTHNDckIsQ0FBQyxBS3RDc0IsQ0FBQyxDRGFyQixFQUFFLEVKeUJFLENBQUMsQUt0Q3NCLENEYXJCLEFDYnNCLENEYXJCLElKeUJJLEFLdENzQixDTHNDckIsQUl6QkEsQUNic0IsQ0x1QzNDLEFJMUJzQixBQ2JzQixJTHVDeEMsQUt2QzRDLENMdUMzQyxBS3ZDNEMsQ0RhckIsQUFBQyxJQ2J5QixDQUFDLEtBQUssQ0x1QzNDLEFLdkM0QyxDQUFDLENMdUMzQyxBS3ZDNEMsQ0FBQyxRTHVDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3JELElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDdkIsQUNYQSxBRVhBLEFDTE0sUUhnQkYsRUVYRSxDRldDLEFFWEEsQUVuQnFFLEVMeUNuRSxBR3RCQSxDSHNCQyxBQ1hBLEFFWEEsQ0ZXQyxBR2hCQSxFSGdCRSxBR2hCQSxFSGdCRSxDRFdDLENBQUMsQUkzQkEsQ0hnQkMsQUdoQkEsRUhnQkUsQ0VYQyxFSHNCRSxBQ1hBLEFFWEEsQUNMQSxDSjJCQyxBSTNCQSxDSjRCckIsQUNac0IsRUVYRSxDRldDLEFFWEEsQ0h1QnJCLEFJNUJzQixBQUFDLENKNEJ0QixBQ1pzQixHQUFHLEVBQUUsR0FBRyxFQUFFLEFFWEEsQ0FBQyxDSHVCckIsQUd0QmpCLENGVXdDLENEWXJCLEFHdEJqQixDRlV3QyxBRVZ2QyxHRlUwQyxDQUFDLENBQUEsR0RZbEIsQ0FBQyxDQUFDLENHdEJoQixFQUFFLENIc0JrQixDQUFDLEVHdEJmLENBQUMsV0hzQjRCLENHdEJoQixDSHNCa0IsQUd0QmpCLENIc0JrQixBR3JCcEQsQ0hxQnFELENBQ3JELEFHdEJFLENBQUMsR0hzQkMsQ0FBQyxLR3RCTyxFQUFFLENIc0JELEVBQUUsQ0FBQyxBR3RCRSxDQUFDLEVIc0JBLElBQUksQ0FBQyxDQUFBLEVHdEJLLENBQUMsQ0FDOUIsS0FBSyxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFBO0FIc0J6RCxBQ2JBLEFHaEJNLFFIZ0JGLEVJOUJFLEdMMkNHLEFDYkEsQ0RhQyxFQ2JFLElEYUksQ0FBQyxFSTdCRSxFQUFFLENIZ0JDLENEYUMsQ0FBQyxDQUNyQixBQ2RzQixDQUFDLEdEY25CLEFDZHNCLENEY3JCLEFDZHNCLENBQUEsQUdoQlQsQ0FBQyxVSjhCRixFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3JELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUd0QnBCLFFBQUksT0FBTyxHQUFHLENDVFksQ0FBQyxDQUFDLENEU1YsQ0FBQyxHQUFHLEFDVFcsRURTVCxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDbkMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUNoRCxLQUFLLENBQUMsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQ3RELEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQTtBSG9CM0IsT0ZqQk0sQ0VpQkYsR0lqQzZCLEFBQUMsUUppQ25CLEdBQUcsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFBO0FBQ3RDLEFHbkJBLEFDZE0sTU5nQkosRUVpQkUsQUduQkEsTUFBTSxHSG1CRyxBR25CQSxFQ2RFLENKaUNDLENHbkJDLEFDZEEsR0ppQ0csQ0FBQyxBSWpDQSxDRGNDLEFDZEEsQU5nQm5CLENLRm9CLElIbUJJLEFJakNBLENKaUNDLEFJakNBLE1OZ0JiLE1LRnlCLEFDZEEsQUFBQyxDRGNBLEVBQUUsQ0htQkMsQ0FBQyxBR25CQSxDSG1CQyxJQUFJLEFHbkJBLENIbUJDLENHbkJDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtBSG9CNUQsQUduQkYsQUNkTSxBTmdCRixRRWlCQSxFQUFFLEFHbkJBLENBQUMsQUU5Qm1DLEFQZ0NuQyxFQUFDLENNaEJFLEVBQUMsRURjRyxDQUFDLEVIbUJFLEFHbkJBLENBQUMsQ0FBQSxBQ2RBLEtOZ0JLO0FFa0JyQixBR25CRixBQ2RNLEFOZ0JGLFNLRkMsQUU5Qk0sQ0Y4QkwsSUxFSSxFQUFFLENLRkMsQ0FBQyxDSG1CQyxDRmpCQyxDRWlCQyxBRmpCQSxHS0ZHLEVDZEUsQU5nQkEsQ0tGQyxBTEVBLENNaEJDLElBQUksQUFBQyxDRGNBLENBQUEsTUhtQk8sS0ZqQkssQUFBQztBRWtCeEMsQUlqQ0ksQU5nQkYsT09oQ0UsQ0xpREYsRUFBRSxDQUFDLEVGakJFLEVBQUUsR01oQkcsQ05nQkMsQ01oQkMsQU5nQkEsS01oQkssQUFBQyxBTmdCRCxDQUFDLEtBQUssQUFBQztBRWtCMUIsQUNmRixBRUpBLEFDZE0sQU5nQkYsS09oQ0UsQ0FBQSxFTGlERixBR25CQSxFSG1CRSxDQUFDLEFDZkEsRURnQk4sQUlsQ1EsQ0prQ1AsQ0FBQSxBSWxDUSxFRGNHLEFMRUEsRUFBRSxDS0ZDLEdMRUcsQ0tGQyxBTEVBLEtLRkssQ0FBQyxPQUFPLEFMRUEsQUFBQyxDS0ZBLENBQUMsRUFBRSxDQUFDLEVBQUUsRUNkQyxDRGNFLENBQUMsQ0FBQSxBQ2RBO0FKbUM1QyxBR3BCQSxBTEVJLEdPaENMLEVBQ0YsQ0FBQyxDQUFBLENEZU0sS0prQ0ssQUdwQkEsQ0hvQkMsQUdwQkEsQ0xFQyxFQUFFLEVBQUMsQ0VrQkUsQUZsQkQsQ0VrQkUsQ0ZsQkEsRUFBRSxFQUFFLENFa0JFLEFGbEJELENFa0JFLEFHcEJBLEFDZG5CLENKbUNGLEFHckJzQixBTEVELEVBQUUsRUVtQm5CLEFHckJzQixBTEVELENFbUJwQixBRm5CcUIsRUFBRSxFS0ZHLEFMRUQsQ0tGRSxDTEVBLENBQUMsQ01oQmpCLENOZ0JtQixFQUFFLENFbUJwQixBR3JCc0IsQ0FBQyxBTEVGLEFBQUMsQ0VtQnBCLEFHckJzQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUhxQnBCLEFHckJzQixDSHFCckIsQUdyQnNCLENIcUJyQixBR3JCc0IsQ0FBQSxHSHFCbEIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3JELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDcEIsQUd0QkEsQUNkTSxBTmdCRixRR0FRLENFRlAsQ0FBQyxFTEVFLENFb0JDLEFDcEJRLENEb0JQLEFGcEJELENHQVUsQUdoQlIsRURjRSxBQ2RBLENIZ0JTLEFBQUMsQUVGVCxDQ2RBLENKb0NFLEFDcEJRLENEb0JQLEFGcEJELEdLRkksQUNkRCxDRGNFLENGRVMsQUdoQlQsQ0pvQ0UsQ0FBQyxBQ3BCUSxDRHFCN0IsR0lyQ3dCLENKcUNwQixBR3ZCc0IsQ0h1QnJCLEFHdkJzQixBQ2RGLEFBQUMsSUhnQmEsQUFBQyxBRUZULENBQUMsQ0ZFUyxLQUFLLENEcUI3QixDQ3JCK0IsQ0RxQjdCLEFHdkJzQixDQUFDLENBQUEsRUZFVyxDQUFDLElEcUIxQixDQUFDLENBQUMsRUNyQmdDLEFBQUMsRURxQjdCLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3ZCLEFHeEJBLEFDZE0sQUNmVixBUCtCUSxNR0NELEFJaENELENBQUMsRUY2QkUsQ0ZHRSxBRUhELENGR0UsRURxQkMsQUZ0QkEsQ0VzQkMsQUtyREEsQ0RlQyxBTmdCQSxFS0ZFLEFDZEEsQUNmQSxDRjZCQyxBTEVBLEFBQUMsRUVzQkMsQUl0Q0EsQUFBQyxDSnNDQSxDQ3JCRSxDQUFDLENFSEEsQ0ZHQyxBRUhBLEVId0JFLENBQUMsQ0FDckIsQUN0QnNCLENJaENDLENKZ0NDLEFFSEEsQUU3QkQsQ0Y2QkUsQ0h5QnJCLENBQUMsQUN0QnNCLENBQUMsQ0FBQyxBRUhBLENGR0MsRUFBRSxFRUhFLENBQUMsSUh5QmxCLEVBQUUsQUN0QnNCLENFSEMsQ0ZHQyxBRUhBLENGR0MsQUVIQSxFRkdFLEFFSEEsQ0FBQyxFRkdFLEFFSEEsQ0h5QnJCLEFHekJzQixDSHlCckIsQUN0QnNCLEFFSEEsQ0h5QnJCLEFDdEJzQixBRUhBLENBQUEsRUZHRyxDRHNCckIsQ0FBQyxBQ3RCc0IsR0FBRyxFQUFFLEdBQUcsRUFBQyxDQUFDLEdEc0JsQixFQUFFLENBQUMsQ0FBQyxDQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUMzQixBSXhDTSxBTmdCRixNR0VGLE9Ec0JPLENBQUMsQUZ4QkEsRU1oQkUsQU5nQkEsRU1oQkUsQ05nQkMsQUFBQyxDRXdCQSxDQUFDLEFJeENBLEFBQUMsTUp3Q0ssQ0FBQyxDQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQ3JELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUczQnBCLEFDZE0sQU5nQkYsUUtGQSxNQ2RNLEVEY0UsQUNkQSxHRGNHLENDZEMsQ0FBQyxFRGNFLENMRUMsRU1oQkUsQU5nQkEsQ01oQkMsQ0RjQyxDQUFDLEVMRUUsQUFBQyxXS0ZVLENBQUMsRUNkRSxBQUFDLElEY0csRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3pFLEFDZE0sQU5nQkYsVUdBSSxFRUZBLENBQUMsTUZFUSxBRUZGLEdBQUcsQUxFQSxDTWhCQyxDTmdCQyxDTWhCQyxDRGNDLENBQUEsRUNkRyxBTmdCQSxBQUFDLENNaEJBLEtBQUssQ0hnQkMsQUdoQkEsR0hnQkcsQ0FBQyxDQUFDLENBQUMsVUFBSyxLQUFLLElHaEJTLEFBQUMsRUhnQk4sRUFBQyxVQUFVLEVBQUMsUUFBUTtBRDJCeEUsQUMxQkksQUVGSixBQ2RNLEFOZ0JGLFFFMEJBLElHNUJJLENBQUMsRUg0QkUsQUMxQkYsRUFBRSxDRDBCRyxBRzVCQSxHQUFHLEFMRUEsQ0dBRCxDQUFDLEFHaEJFLEFOZ0JBLEVFMEJFLEFHNUJBLEFDZEEsQ0RjQSxFSDRCRyxDSTFDQyxDQUFDLENIZ0JELEFBQUMsQ0QwQkUsRUFBRSxDQUFBLEFJMUNDLENBQUMseUJBQXlCLEFBQUMsR0FBRztBSjJDN0QsQUc1QkEsT0NkUSxDSjBDSixDQUFDLEdHNUJHLENBQUMsRUg0QkUsQ0FBQyxDRjNCYSxLRTJCUCxBRjNCWSxDRTJCWCxBRjNCWSxDRTJCWCxJQUFJLEFHNUJBLENINEJDLEFGM0JZLEVLRFYsQ0FBRyxDSDRCRCxBRzVCQyxFSDRCQyxPQUFPLENBQUMsQ0FDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNuQixBRzdCSixNQ2RFLENIY21DLEVIQUEsQUFBQyxFRTZCN0IsQ0c3QkQsQ0g2QkcsQUc3QkYsS0g2Qk8sQ0FBQyxDQUFDLEdBQUcsQUc3QkYsR0FBRyxFSDZCSSxDQUFDLENHN0JELENBQUEsSUNkbkIsSUoyQzhCLENJM0N6QixFSjJDNEIsQUkzQzFCLENKMkMyQixDSTNDMUIsS0FBSyxFQUFFLE1BQU0sRUFBQyxBQUFDLEdBQU87QUo0Q2pDLEFGN0JBLEtNZE0sQ0hlUCxBR2ZPLElIZUgsQ0FBQyxDRDRCRSxDRjdCRCxDRTZCRyxDRjdCRCxFQUFDLEVFNkJLLENBQUMsQ0FBQyxDQzVCQSxBSERGLENHQ0csQ0Q0QkUsQUY3QkgsQ0dDRSxJRDRCTSxBQzVCRixDRDRCRyxBRjdCSCxDR0NFLENIREQsQUFBQyxFR0NHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0Q0QkcsR0FBRyxDQUFDLElDNUJFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUM7QUQ2QjlELEFHN0JKLEFMQUksR01kTCxFQUNGLENIZUssQUdmSixDQUFBLEVEYU8sQ0g2QkcsQUc3QkYsRUg2QkksS0c3QkcsQ0FBQyxBTEFBLENFNkJHLENGN0JGLEVFNkJLLElHN0JFLEdBQUcsRUxBQyxFRTZCSyxHQUFHLENHN0JELENBQUEsQ0g2Qkk7QUc1QnJDLEFMQUksS0U2QkQsQ0FBQyxDQUFBLEtHN0JJLENBQUMsS0xBSyxFQUFDLFFBQVEsQ0tBRSxDQUFDLENMQUQsT0tBUyxFQUFFLFlBQVc7QUg4Qi9DLEFHN0JFLEFDYk4sTUFBTSxBTmFBLENNYkMsQ0owQ0MsRUM3QkksQUVBRixDQUFDLEdDYkcsQ0owQ0MsRUkxQ0UsQ0owQ0MsQ0M3QkcsTUQ2QkksQUc3QkEsQ0FBQyxBTEFuQixFRTZCcUIsR0c3QkcsQ0g2QkMsQ0c3QkMsQ0g2QkMsQ0FBQSxDQzdCRSxDRUFDLENBQUMsQ0ZBQyxBR2JBLEFOYW5CLENHQW9CLEFHYkQsQ0hhRSxDQUFDLENFQUMsQUxBdEIsQ0tBdUIsQ0FBQSxHTEFsQixFQUFFLENHQWtCLEVIQWYsQUFBQyxFQUFDLENHQWtCLEtIQVosQ0dBZ0IsQ0hBZCxDR0FlLEVIQVosQUFBQyxFQUFDLEtBQUssQ0dBZSxDSEFiLENHQWMsR0hBVixDQUFDLEdHQWdCLEVIQVgsQ0FBQyxLQUFLLEFBQUMsR0FBRztBRThCckUsQUM3QkksQUVBRixNTEFBLEVFNkJFLENBQUMsQ0c3QkMsQ0FBQyxJSDZCSSxBQzdCRixDRDZCRyxDQzdCRCxLRDZCTyxBQzdCRixBRUFF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TUg2RU8sQUN2R0QsRUFBRSxLQUFLLEFBQUMsSUR1R3ZCLGdCQUFnQjtBQ3RHZixRRHNHaUIsQUc3RVAsSUFBSSxFSDZFUyxDRzdFTixHQUFHLENBQUEsTUg2RUgsR0N0R0MsRUFBRSxDRHNHRyxHQ3RHQyxBQUFDO0FBQ3pCLEFFeUJOLFFINkVLLEFHN0VELEVINkVHLEdBQUksR0N0R0MsQ0RzR0csQ0FBQyxBQ3RHRixBRXlCQSxHQUFHLENGekJDLENEc0dHLEFDdEdGLENEc0dkLENHN0VnQixDSDZFZCxFQ3RHaUIsQ0FBQyxDRXlCQyxDQUFDLElGekJJLEFBQUMsTUV5QkssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUZ4QjNDLEFFeUJOLFFBQUksZUFBZSxHRnpCRyxBRXlCQSxDQUFRLENGekJOLElBQUksQ0FBQyxvQkFBb0IsQUFBQztBRHNHbEQsQUNyR00sUURxR0YsQUc3RTRCLENINkUzQixHQUFHLEVBQUUsQ0FBQyxFRzdFOEIsRUZ4QjFCLENFd0I2QixDSDZFM0IsQUNyR0EsQ0RxR0MsR0NyR0csQ0FBQyxFRXdCOEIsR0g2RXpCLENBQUMsQ0FBQyxRQ3JHUSxBQUFDLENEcUdBLENBQUMsR0FBRyxDQUFDLENBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDWixJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUEsQ0FBQztBQ3RHaEIsUUV1QmdELE9GdkIzQyxBRXVCa0QsRUZ2QmhELENFdUJtRCxDRnZCbEQsQUV1Qm1ELENBQUEsSUZ2QjlDLEVBQUUsRURzR2tCLEVBQUUsQ0FBQyxDQ3RHZixFQUFDLEFBQUMsR0FBRyxVRHNHMEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUFHLENBQUMsQ0FBQSxDQ3JHOUQsb0JBQUMsS0FBSztBQUNKLEFFdUJOLEdIOEVELFdHOUVXLENGdkJDLEFFdUJBLEVGdkJFLEtBQUssQUFBQyxDRXVCQSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQTtBSCtFOUIsQUNyR1EsQUV1Qk4sY0FBVSxDQUFDLENGdkJDLEVEcUdFLEFDckdBLEVEcUdBLElDckdNLEFBQUMsQUV1QkQsQ0FBQyxlQUFlLEVBQUUsTUg4RXJCLEdHOUU4QixDQUFDLENBQUE7QUZ0QjFDLEFFdUJOLGNBQVUsQ0FBQyxFSDhFVyxJQUFJLENBQUMsQ0NyR1IsQUV1QkEsQ0FBQyxDRnZCQyxFRHFHVyxHQ3JHTixBQUFDLENFdUJBLEdBQUcsT0FBTyxDQUFBO0FGdEIvQixBRXVCTixRSDZFSyxDQUFDLEFHN0VELENBQUMsS0FBSyxDQUFDLEdINkVQLEFHN0VVLENINkVULEFHN0VVLFVGdkJVLEFFdUJBLENBQUMsQ0Z2QkMsQUV1QkQsS0Z2Qk0sQ0FBQyxPQUFPLEFBQUM7QUFDcEMsQUV1Qk4sUUg0RVEsQ0FBQyxBRzVFSixDQUFDLEdGdkJHLEVBQUMsRUV1QkcsQ0FBQyxDSDRFTixDQUFDLFNHNUVnQixHQUFHLE1GdkJLLElFdUJLLENBQUE7QUZ0QmhDLFFEa0dLLEdBQUcsS0NsR0YsRUFBRSxHRGtHSCxDQ2xHTyxDQUFDLENEa0dMLElDbEdVLENBQUMsTUFBTSxBQUFDO0FBQzFCLEFFdUJOLFFIMEVnQixFQUFFLElHMUVSLEdBQUcsR0gwRUcsQ0NqR0MsQUV1QkEsQ0gwRUMsQ0NqR0MsR0V1QkcsQ0Z2QkMsQUV1QkEsQ0Z2QkMsU0V1QlMsQ0FBQyxHRnZCRyxBQUFDLENFdUJBLEVBQUUsSUFBSSxDQUFDLENBQUE7QUZ0QnZDLEFFdUJOLGNBQVUsQ0Z2QkMsQUV1QkEsRUZ2QkUsRUFBQyxJRXVCSyxDRnZCQSxBRXVCQyxDQUFDLENGdkJBLEVFdUJHLENBQUMsR0Z2QkUsQUV1QkMsQ0FBQSxDRnZCQSxBQUFDLEdBQUc7QURpR2hDLEFHekVBLFFIeUVJLEFDaEdBLEVEZ0dFLEdBQUcsQ0FBQyxBR3pFQSxDSHlFQyxBR3pFQSxDSHlFQyxNQUFNLENHekVDLENIeUVDLEFHekVBLENIeUVDLEFHekVBLENIeUVDLENBQUMsQ0d6RUMsQ0h5RUMsRUFBRSxDQUFDLEFHekVBLENIeUVDLEFHekVBLENIeUVDLENHekVDLEVGdkJ0QixDRXVCeUIsQ0FBQyxDSHlFQyxBR3pFRCxFSHlFRyxBQ2hHeEIsQ0RnR3lC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R2xCLEFFOEJKLFNBQUcsQ0FBQyxPRjlCTyxDRThCQyxDRjlCQyxBRThCQSxJQUFJLEVBQUUsQ0Y5QkMsQUFBQyxBRThCRCxFSGlGbUIsQ0dqRmhCLENBQUMsRUFBRSxDSGlGa0IsQUdqRmpCLENIaUZrQixFQUFFLEFHakZqQixDSGlGa0IsQUdqRmpCLENIaUZrQixDQUFDLENHakZoQixFQUFFLENBQUMsQ0FBQTtBRjdCakMsQUU4QkosS0hnRnFELENBQUMsQ0FBQSxHR2hGbEQsS0Y5QkssRUFBRSxBRThCQSxDRjlCQyxFRThCRSxFRjlCRSxDQUFDLENFOEJDLElGOUJJLENBQUMsQUU4QkEsQ0FBQyxPQUFPLENBQUMsTUY5Qk0sQUU4QkEsQ0Y5QkMsQUU4QkEsQ0Y5QkMsQUU4QkQsQ0Y5QkUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDO0FBQ3RFLEFFOEJKLEdIZ0ZILFVHaEZVLENGOUJDLEFFOEJBLEVGOUJDLE9BQU8sRUU4QkcsR0FBRyxJQUFJLENBQUE7QUhpRjlCLEFDOUdRLEFFOEJKLFVBQUksS0hnRkssRUFBQSxDR2hGRyxFRjlCRSxDRThCQyxDRjlCQSxHRThCSSxDRjlCQSxJRThCSyxDQUFDLFdIZ0ZiLEdHaEYyQixDQUFDLEVBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQTtBRjdCcEUsQUU4QkosUUhnRkcsRUdoRkMsR0hnRkksR0FBVyxBR2hGVCxHQUFHLENIZ0ZVLEFDOUdULENEOEdYLENDOUdZLENFOEJFLEVGOUJDLENEOEdWLEVHaEZjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FGN0JuQyxBRThCSixRSCtFVSxJRy9FSixDSCtFUyxBRy9FUixHSCtFWSxFRy9FUCxDQUFDLENIK0VVLENBQWIsQ0cvRU0sQ0FBQyxHSCtFRixBQzdHSyxBRThCQSxFRjlCRSxBRThCQSxHQUFHLEVGOUJFLEFBQUMsQUU4QkQsQ0FBQyxDQUFDLENBQUE7QUY3QnpCLEFFOEJKLFFIK0VHLElHL0VHLENBQUMsQ0grRUUsR0FBbUIsSUcvRWIsQ0grRWtCLEFHL0VqQixDSCtFYixBRy9FYyxDRjlCQyxFQUFFLEFFOEJBLENBQUMsQ0FBQSxDSCtFWixFQzdHZ0IsQUFBQztBQUN0QixBRThCSixRSDhFVyxDQUFDLEdBQWdCLEFHOUV0QixDQUFDLElIOEUwQixDQUF0QixDQUFDLEVHOUVHLENBQUMsQ0FBQyxHQUFHLENGOUJDLEFFOEJBLENBQUEsQ0Y5QkUsSUFBSSxBQUFDO0FBQ3hCLEFFOEJKLFFINkVjLENBQUMsR0FBYSxBRzdFdEIsQ0FBQyxJSDZFMEIsQ0FBbkIsQUMzR0YsQ0QyR0csQ0MzR0QsQ0U4QkMsQ0FBQyxDQUFDLEVGOUJFLEFBQUMsQ0U4QkEsQ0FBQyxDQUFBO0FGN0JqQixBRThCSixRSDRFaUIsR0FBRyxFRzVFYixDSDRFcUIsRUMxR2xCLEVBQUUsQ0QwR3FCLEFHNUVwQixDSDRFSSxBRzVFSixFRjlCRyxDRDBHSSxBQzFHSCxLQUFLLENBQUMsTUFBTSxBQUFDO0FBQzFCLEtFOEJMLEdIMkV1QixFQUFFLEdBQUksS0FBSyxDQUFYLEVBQUUsS0N6R0osRUFBRSxJQUFJLENBQUMsb0JBQW9CLEFBQUM7QUFDNUMsQUU4Qk4sTUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHRjlCRyxBRThCQSxDQUFDLENGOUJDLElBQUksQ0FBQyxJRThCTixDQUFDLEVBQUksUUY5QmdCLEFBQUM7QUR5R3RDLEFDeEdNLEFFOEJKLFFIMEVFLEVHMUVFLENIMEVDLEVHMUVFLENIMEVDLENDeEdDLENFOEJDLENGOUJDLEFFOEJBLEVIMEVFLEFDeEdELENEd0dFLEFHMUVBLEVBQUUsQ0FBQSxDRjlCQyxFQUFFLE1BQU0sRUFBQyxBQUFDLEVEd0dHLENBQUEsQUN4R0E7QUR5R2hDLEFHMUVFLFFIMEVFLEFDeEdBLENEd0dDLENHMUVDLENBQUMsQ0gwRUMsRUFBRSxBRzFFQSxDSDBFQyxJRzFFSSxDQUFDLENIMEVDLENBQUMsSUcxRUksQ0FBQyxDRjlCbEIsRUU4QnFCLENBQUMsQ0FBQSxJSDBF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QkksQUFBQyxDRThCQSxDQUFDLENBQUE7QUY3QmhCLEdFOEJQLG9CRjlCb0IsRUFBRSxLQUFLLEFBQUM7QUFDckIsQUU4QlIsdUJGOUJxQixBRThCQSxFRjlCRSxBRThCRixJRjlCTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEFBQUMsT0U4QjFCLEtBQUssRUFBRTtBRjdCckIsQUU4Qk4sUUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNGOUJTLENFOEJDLENGOUJDLEFFOEJBLEtGOUJLLEFFOEJBLENGOUJDLEVFOEJFLElBQUksQ0Y5QkMsQUFBQyxJRThCRyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FGN0JsRCxBRThCTixRQUFJLENBQUMsTUY5Qk0sQ0U4QkMsQ0Y5QkMsRUU4QkUsRUY5QkUsQ0FBQyxDRThCQyxDQUFBLEdGOUJJLENBQUMsZUFBZSxBQUFDO0FBQ2xDLGdCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEFBQUM7QUFDMUIsQUU4Qk4sUUFBSSxDSDRERyxBRzVERixRQUFRLENBQUMsQ0g0RFAsQ0FBQyxDQzFGUyxDRDBGTCxBRzVETSxDRjlCQyxBRThCQSxJRjlCSSxBRThCQSxDRjlCQyxJRThCSSxDQUFDLE9BQU8sQ0Y5QkMsQUFBQyxBRThCRCxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FINkQ5QyxBQzFGQSxBRThCTixRQUFJLENBQUMsR0g0REssR0FBRyxBQzFGRixDRDBGRyxDQUFDLEFDMUZGLEFFOEJBLENBQUMsQ0Y5QkEsQ0QwRkksQ0FBQyxDRzVERCxDQUFDLENGOUJBLENEMEZJLENBQUMsQUMxRkgsQ0QwRkksQUc1REYsR0g0REssRUMxRkQsQUU4QkMsQ0g0REcsQUc1REYsQ0g0REcsQUMxRkosQUFBQyxFRDJGckIsQ0MzRndCLEdFOEJJLENBQUUsRUg2RHZCLENBQUMsQUc3RHlCLENINkR4QixDRzdEMEIsQ0FBQyxDSDZEeEIsQ0FBQyxBRzdEeUIsQ0g2RHhCLEFHN0R5QixDSDZEeEIsQ0FBQyxDQUFDLEFHN0R5QixDSDZE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QUNiLFFBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7QUFDdEIsU0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDL0IsU0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0dBQ3pEO0FBQ0QsUUFBTSxFQUFBLGtCQUFHO0FBQ1AsUUFBSSxLQUFLLEdBQUcsZUFBYztBQUN4QixXQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO0FBQ3ZCLFlBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07QUFDekIsY0FBUSxFQUFFLFVBQVUsRUFDckIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUMxQixXQUFPLDZCQUFLLEtBQUssRUFBRSxLQUFLLEFBQUMsR0FBRyxDQUFBO0dBQzdCLEVBQ0YsQ0FBQyxDQUFBOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuXG4vLyBUaGlyZCBwYXJ0eSBtb2R1bGVzLlxudmFyIFRIUkVFID0gcmVxdWlyZSgndGhyZWUnKVxuLy8gQWRkcyBgT3JiaXRDb250cm9sc2AgdG8gdGhlIGBUSFJFRWAgb2JqZWN0LlxucmVxdWlyZSgnT3JiaXRDb250cm9scycpKFRIUkVFKVxuLy8gQWRkcyBgVHJhY2tiYWxsQ29udHJvbHNgIHRvIHRoZSBgVEhSRUVgIG9iamVjdC5cbnJlcXVpcmUoJ1RyYWNrYmFsbENvbnRyb2xzJykoVEhSRUUpXG52YXIgZDMgPSByZXF1aXJlKCdkMycpXG4vLyBBZGRzIGEgYG1hc29uaWNgIHByb3BlcnR5IHRvIHRoZSBgZDNgIG9iamVjdC5cbnJlcXVpcmUoJ2QzLW1hc29uaWMnKShkMylcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcblxuLy8gU2hhcmVkIG1vZHVsZXMgYWNyb3NzIGV4cGxhbmF0aW9ucy5cbnZhciBjb2xvciA9IHJlcXVpcmUoJ2NvbG9yJylcbnZhciBhbHBoYWlmeSA9IHJlcXVpcmUoJ2FscGhhaWZ5JylcblxuLy8gTG9jYWwgbW9kdWxlcyB0byB0aGlzIGV4cGxhbmF0aW9uLlxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJylcbnZhciBMZWFzdFNxdWFyZXMgPSByZXF1aXJlKCcuL0xlYXN0U3F1YXJlcy5yZWFjdCcpXG52YXIgTGVhc3RTcXVhcmVzM0RNb2R1bGUgPSByZXF1aXJlKCcuL0xlYXN0U3F1YXJlczNETW9kdWxlLnJlYWN0JylcbnZhciBSZWdyZXNzaW9uQXNOb2JzTW9kdWxlID0gcmVxdWlyZSgnLi9SZWdyZXNzaW9uQXNOb2JzTW9kdWxlLnJlYWN0JylcbnZhciBTTFJQYXJhbWV0ZXJzID0gcmVxdWlyZSgnLi9TTFJQYXJhbWV0ZXJzLnJlYWN0JylcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHZhciBjb2xvciA9IGQzLnNjYWxlLmNhdGVnb3J5MTAoKVxuICAgIHZhciBwb2ludHMgPSBbXG4gICAgICBbMTYsICA1XSxcbiAgICAgIFsxMywgMjNdLFxuICAgICAgWzI0LCAzM10sXG4gICAgICBbNDMsIDMyXSxcbiAgICAgIFs1MSwgNTNdLFxuICAgICAgWzg0LCA2NV0sXG4gICAgICBbOTAsIDg1XVxuICAgIF0ubWFwKGZ1bmN0aW9uKHBvaW50LCBpKSB7IHJldHVybiB7IHBvaW50OiBwb2ludCwgY29sb3I6IGNvbG9yKGkpIH0gfSlcbiAgICB2YXIgc3RhdGUgPSB7XG4gICAgICBsZWFzdFNxdWFyZXNQb2ludHM6IHBvaW50cyxcbiAgICAgIHJlZ3Jlc3Npb25Qb2ludHM6IFtbMjAsIDIwXSwgWzgwLCA4MF1dLFxuICAgICAgYmV0YXM6IHRoaXMuX2dldEJldGFzKHBvaW50cyksXG4gICAgICBsZWFzdFNxdWFyZXNFcnJvcnM6IHRoaXMuX3VwZGF0ZUxlYXN0U3F1YXJlc0Vycm9ycyhwb2ludHMpLFxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbiAgfSxcbiAgX2xvY2F0aW9uQWNjZXNzb3IoZCkgeyByZXR1cm4gZC5wb2ludCB9LFxuICBfb25EcmFnT0xTTm9iKHR5cGUsIGUpIHtcbiAgICBpZiAodHlwZSA9PT0gJ3BvaW50Jykge1xuICAgICAgdmFyIHBvaW50cyA9IHRoaXMuc3RhdGUubGVhc3RTcXVhcmVzUG9pbnRzLnNsaWNlKDApXG4gICAgICBwb2ludHNbZS5pXS5wb2ludCA9IGUucG9zXG4gICAgICB0aGlzLl91cGRhdGVQb2ludChwb2ludHNbZS5pXSwgZS5wb3MpXG4gICAgfVxuICB9LFxuICBfb25EcmFnUmVncmVzc2lvbk5vYih0eXBlLCBlKSB7XG4gICAgaWYgKHR5cGUgPT09ICdyZWdyZXNzaW9uJykge1xuICAgICAgdmFyIHBvaW50cyA9IHRoaXMuc3RhdGUucmVncmVzc2lvblBvaW50c1xuICAgICAgdGhpcy5fdXBkYXRlUmVncmVzc2lvblBvaW50KHBvaW50c1tlLmldLCBlLnBvcylcbiAgICB9XG4gIH0sXG4gIF91cGRhdGVQb2ludChkLCBwb3MpIHtcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5zdGF0ZS5sZWFzdFNxdWFyZXNQb2ludHMuc2xpY2UoMCkgLy8gY29weVxuICAgIGQucG9pbnQgPSBwb3NcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxlYXN0U3F1YXJlc1BvaW50czogcG9pbnRzLFxuICAgICAgYmV0YXM6IHRoaXMuX2dldEJldGFzKHBvaW50cyksXG4gICAgICBsZWFzdFNxdWFyZXNFcnJvcnM6IHRoaXMuX3VwZGF0ZUxlYXN0U3F1YXJlc0Vycm9ycyhwb2ludHMpLFxuICAgIH0pXG4gIH0sXG4gIF91cGRhdGVSZWdyZXNzaW9uUG9pbnQoZCwgcG9zKSB7XG4gICAgdmFyIHBvaW50cyA9IHRoaXMuc3RhdGUucmVncmVzc2lvblBvaW50cy5zbGljZSgwKSAvLyBjb3B5XG4gICAgZFswXSA9IHBvc1swXSwgZFsxXSA9IHBvc1sxXVxuICAgIHRoaXMuc2V0U3RhdGUoe3JlZ3Jlc3Npb25Qb2ludHM6IHBvaW50c30pXG4gIH0sXG4gIF91cGRhdGVMZWFzdFNxdWFyZXNFcnJvcnMocG9pbnRzKSB7XG4gICAgcmV0dXJuIHV0aWxzLndyYXBMZWFzdFNxdWFyZXNFcnJvcnMocG9pbnRzLCB0aGlzLl9sb2NhdGlvbkFjY2Vzc29yKVxuICB9LFxuICBfZ2V0QmV0YXMocG9pbnRzKSB7XG4gICAgdmFyIFggPSBwb2ludHMubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIFtkLnBvaW50WzBdXSB9KVxuICAgIHZhciB5ID0gcG9pbnRzLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLnBvaW50WzFdIH0pXG4gICAgcmV0dXJuIHV0aWxzLmhlc3NpYW4oeSwgWClcbiAgfSxcbiAgX2xlYXN0U3F1YXJlc1ZhbHVlQWNjZXNzb3I6IGQgPT4gZC5lcnJvcixcbiAgX2xlYXN0U3F1YXJlc0NvbG9yQWNjZXNzb3I6IGQgPT4gZC5jb2xvcixcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2PlxuICAgICAgPGgzPlRoaXMgZXhwbGFuYXRpb24gaXMgaW50ZXJhY3RpdmUhPC9oMz5cbiAgICAgIDxwPlxuICAgICAgICA8aT5EaWFsczwvaT4gYWxsb3cgeW91IHRvIGFkanVzdCBzY2FsYXIgdmFsdWVzLlxuICAgICAgICA8aW1nIHNyYz0nL2V2L2xpbmVhci1yZWdyZXNzaW9uL3Jlc291cmNlcy9kaWFsLXR1dG9yaWFsLmdpZidcbiAgICAgICAgICBzdHlsZT17c3R5bGUudHV0b3JpYWxWaWRlb30gLz5cbiAgICAgIDwvcD5cbiAgICAgIDxwPlxuICAgICAgICA8aT5Qb2ludHM8L2k+IHRoYXQgaGF2ZSBhIGdyYXkgY2lyY2xlIGFyb3VuZCB0aGVtIGFyZSBkcmFnZ2FibGUuXG4gICAgICAgIDxpbWcgc3R5bGU9e3N0eWxlLnR1dG9yaWFsVmlkZW99XG4gICAgICAgICAgc3JjPScvZXYvbGluZWFyLXJlZ3Jlc3Npb24vcmVzb3VyY2VzL3BvaW50LXR1dG9yaWFsLmdpZicgLz5cbiAgICAgIDwvcD5cbiAgICAgIDxwPlxuICAgICAgICBTdGF0aXN0aWNhbCByZWdyZXNzaW9uIGlzIGJhc2ljYWxseSBhIHdheSB0byBwcmVkaWN0IHVua25vd24gcXVhbnRpdGllcyBmcm9tIGEgYmF0Y2ggb2YgZXhpc3RpbmcgZGF0YS4gRm9yIGV4YW1wbGUsIHN1cHBvc2Ugd2Ugc3RhcnQgb3V0IGtub3dpbmcgdGhlIGhlaWdodCBhbmQgaGFuZCBzaXplIG9mIGEgYnVuY2ggb2YgaW5kaXZpZHVhbHMgaW4gYSBcInNhbXBsZSBwb3B1bGF0aW9uLFwiIGFuZCB0aGF0IHdlIHdhbnQgdG8gZmlndXJlIG91dCBhIHdheSB0byBwcmVkaWN0IGhhbmQgc2l6ZSBmcm9tIGhlaWdodCBmb3IgaW5kaXZpZHVhbHMgbm90IGluIHRoZSBzYW1wbGUuIEJ5IGFwcGx5aW5nIE9MUywgd2UnbGwgZ2V0IGFuIGVxdWF0aW9uIHRoYXQgdGFrZXMgaGFuZCBzaXplLS0tdGhlICdpbmRlcGVuZGVudCcgdmFyaWFibGUtLS1hcyBhbiBpbnB1dCwgYW5kIGdpdmVzIGhlaWdodC0tLXRoZSAnZGVwZW5kZW50JyB2YXJpYWJsZS0tLWFzIGFuIG91dHB1dC5cbiAgICAgIDwvcD5cbiAgICAgIDxwPlxuICAgICAgICBCZWxvdywgT0xTIGlzIGRvbmUgYmVoaW5kLXRoZS1zY2VuZXMgdG8gcHJvZHVjZSB0aGUgcmVncmVzc2lvbiBlcXVhdGlvbi4gVGhlIGNvbnN0YW50cyBpbiB0aGUgcmVncmVzc2lvbi0tLWNhbGxlZCAnYmV0YXMnLS0tYXJlIHdoYXQgT0xTIHNwaXRzIG91dC4gSGVyZSwgYmV0YV8xIGlzIGFuIGludGVyY2VwdDsgaXQgdGVsbHMgd2hhdCBoZWlnaHQgd291bGQgYmUgZXZlbiBmb3IgYSBoYW5kIHNpemUgb2YgemVyby4gQW5kIGJldGFfMiBpcyB0aGUgY29lZmZpY2llbnQgb24gaGFuZCBzaXplOyBpdCB0ZWxscyBob3cgbXVjaCB0YWxsZXIgd2Ugc2hvdWxkIGV4cGVjdCBzb21lb25lIHRvIGJlIGZvciBhIGdpdmVuIGluY3JlbWVudCBpbiB0aGVpciBoYW5kIHNpemUuIERyYWcgdGhlIHNhbXBsZSBkYXRhIHRvIHNlZSB0aGUgYmV0YXMgY2hhbmdlLlxuICAgICAgPC9wPlxuICAgICAgPExlYXN0U3F1YXJlc1xuICAgICAgICBrZXk9J2xlYXN0LXNxdWFyZXMnXG4gICAgICAgIHBvaW50cz17dGhpcy5zdGF0ZS5sZWFzdFNxdWFyZXNQb2ludHN9XG4gICAgICAgIGJldGFzPXt0aGlzLnN0YXRlLmJldGFzfVxuICAgICAgICBvbkRyYWdOb2I9e3RoaXMuX29uRHJhZ09MU05vYn1cbiAgICAgICAgbWFyZ2lucz17e2w6IDIwLCB0OiAyMCwgcjogMzAsIGI6IDMwfX1cbiAgICAgICAgbW9kZT0ncG9pbnQnXG4gICAgICAgIHdpZHRoPXszMTB9XG4gICAgICAgIGhlaWdodD17MzEwfVxuICAgICAgICBzaG93RXJyb3JTcXVhcmVzPXtmYWxzZX1cbiAgICAgICAgc2hvd0Vycm9yTGluZXM9e2ZhbHNlfVxuICAgICAgICBjb2xvckFjY2Vzc29yPXsoKSA9PiBjb2xvci5zZW5hcnl9XG4gICAgICAgIHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0J319XG4gICAgICAgIHhBeGlzTGFiZWw9J2hhbmQgc2l6ZSdcbiAgICAgICAgeUF4aXNMYWJlbD0naGVpZ2h0Jy8+XG4gICAgICA8U0xSUGFyYW1ldGVycyB3aWR0aD17MzEwfSBoZWlnaHQ9ezMxMH0gYmV0YXM9e3RoaXMuc3RhdGUuYmV0YXN9IC8+XG4gICAgICA8cD5cbiAgICAgICAgQXQgc29tZSBwb2ludCwgeW91IHByb2JhYmx5IGFza2VkIHlvdXIgcGFyZW50cywgXCJXaGVyZSBkbyBiZXRhcyBjb21lIGZyb20/XCIgTGV0J3MgcmFpc2UgdGhlIGN1cnRhaW4gb24gaG93IE9MUyBmaW5kcyBpdHMgYmV0YXMuXG4gICAgICA8L3A+XG4gICAgICA8cD5cbiAgICAgICAgRXJyb3IgaXMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBwcmVkaWN0aW9uIGFuZCByZWFsaXR5OiB0aGUgdmVydGljYWwgZGlzdGFuY2UgYmV0d2VlbiBhIHJlYWwgZGF0YSBwb2ludCBhbmQgdGhlIHJlZ3Jlc3Npb24gbGluZS4gT0xTIGlzIGNvbmNlcm5lZCB3aXRoIHRoZSA8ZW0+c3F1YXJlczwvZW0+IG9mIHRoZSBlcnJvcnMuIEl0IHRyaWVzIHRvIGZpbmQgdGhlIGxpbmUgZ29pbmcgdGhyb3VnaCB0aGUgc2FtcGxlIGRhdGEgdGhhdCBtaW5pbWl6ZXMgdGhlIHN1bSBvZiB0aGUgc3F1YXJlZCBlcnJvcnMuIEJlbG93LCB0aGUgc3F1YXJlZCBlcnJvcnMgYXJlIHJlcHJlc2VudGVkIGFzIHNxdWFyZXMsIGFuZCB5b3VyIGpvYiBpcyB0byBjaG9vc2UgYmV0YXMgKHRoZSBzbG9wZSBhbmQgaW50ZXJjZXB0IG9mIHRoZSByZWdyZXNzaW9uIGxpbmUpIHNvIHRoYXQgdGhlIHRvdGFsIGFyZWEgb2YgYWxsIHRoZSBzcXVhcmVzICh0aGUgc3VtIG9mIHRoZSBzcXVhcmVkIGVycm9ycykgaXMgYXMgc21hbGwgYXMgcG9zc2libGUuIFRoYXQncyBPTFMhXG4gICAgICA8L3A+XG4gICAgICA8UmVncmVzc2lvbkFzTm9ic01vZHVsZVxuICAgICAgICBwb2ludHM9e3RoaXMuc3RhdGUubGVhc3RTcXVhcmVzUG9pbnRzfVxuICAgICAgICBvbkRyYWdPTFNOb2I9e3RoaXMuX29uRHJhZ09MU05vYn1cbiAgICAgICAgbGVhc3RTcXVhcmVzVmFsdWVBY2Nlc3Nvcj17ZCA9PiBkLmVycm9yfVxuICAgICAgICBsZWFzdFNxdWFyZXNDb2xvckFjY2Vzc29yPXtkID0+IGQuZC5jb2xvcn0gLz5cbiAgICAgIDxMZWFzdFNxdWFyZXMzRE1vZHVsZSAvPlxuICAgICAgPHA+XG4gICAgICAgIFNwZWNpYWwgdGhhbmtzIHRvIDxhIGhyZWY9XCJodHRwOi8vdHdpdHRlci5jb20vZW5qYWxvdFwiPklhbiBKb2huc29uPC9hPiBmb3IgcmV2aWV3aW5nIGFuIGVhcmxpZXIgdmVyc2lvbiBvZiB0aGlzIGV4cGxvcmFibGUgZXhwbGFuYXRpb24gYW5kIHN1Z2dlc3RpbmcgdGhlIGlkZWEgb2YgdXNpbmcgR0lGcyB0byBleHBsYWluIGhvdyB0aGUgY29udHJvbHMgd29yay5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgfVxufSlcblxuUmVhY3QucmVuZGVyKDxBcHAgLz4sIGQzLnNlbGVjdCgnLm15QXBwJykubm9kZSgpKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJylcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluJylcblxudmFyIERpYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG4gIHNlbCgpIHsgcmV0dXJuIGQzLnNlbGVjdCh0aGlzLmdldERPTU5vZGUoKSkgfSxcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtaW46IC0xMCxcbiAgICAgIG1heDogMTAsXG4gICAgICB2YWx1ZTogMCxcbiAgICAgIHNpemU6IDEyMCxcbiAgICAgIG5vYkZpbGw6ICdyZ2JhKDAsIDAsIDAsIDAuMSknLFxuICAgICAgd3JhcEluU1ZHOiB0cnVlLFxuICAgIH1cbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl91cGRhdGVTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzLCB7c2NhbGU6IG51bGx9KVxuICB9LFxuICBfdXBkYXRlU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgc3RhdGUuc2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKVxuICAgICAgLmRvbWFpbihbcHJvcHMubWluLCBwcm9wcy5tYXhdKVxuICAgICAgLnJhbmdlKFswLCAzNjBdKVxuICAgICAgLmNsYW1wKHRydWUpXG4gICAgcmV0dXJuIHN0YXRlXG4gIH0sXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMocHJvcHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVByb3BzKHByb3BzLCB0aGlzLnN0YXRlKSlcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdmFyIHNlbCA9IHRoaXMuc2VsKCkuc2VsZWN0KCcuc3RhZ2UnKSwgc2VsZiA9IHRoaXNcbiAgICB2YXIgZHJhZyA9IGQzLmJlaGF2aW9yLmRyYWcoKS5vbignZHJhZycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHAgPSBkMy5tb3VzZShzZWwubm9kZSgpKVxuICAgICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMihwWzFdLCBwWzBdKSAvIE1hdGguUEkgKiAxODAgKyAxODBcbiAgICAgIHZhciB2YWx1ZSA9IHNlbGYuc3RhdGUuc2NhbGUuaW52ZXJ0KGFuZ2xlKVxuICAgICAgc2VsZi5wcm9wcy5vbkNoYW5nZVZhbHVlKHZhbHVlKVxuICAgIH0pXG4gICAgc2VsLmNhbGwoZHJhZylcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHZhciB7cHJvcHMsIHN0YXRlfSA9IHRoaXNcbiAgICB2YXIge3NpemUsIHN0eWxlLCBub2JGaWxsLCBub2JTdHJva2UsIHZhbHVlLCB3cmFwSW5TVkd9ID0gcHJvcHNcbiAgICB2YXIgcGFkZGluZyA9IDEwXG4gICAgdmFyIG51bVRpY2tzID0gMzBcbiAgICB2YXIgbm9iUmFkaXVzID0gc2l6ZSAvIDIgLSBwYWRkaW5nXG4gICAgdmFyIGlubmVyTm9iUmFkaXVzID0gdGhpcy5wcm9wcy5pbm5lck5vYlJhZGl1cyB8fCBub2JSYWRpdXMgLyA0XG4gICAgdmFyIGNvbnRlbnRQcm9wcyA9IHsuLi5wcm9wc31cbiAgICBpZiAod3JhcEluU1ZHKSB7XG4gICAgICBjb250ZW50UHJvcHMudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgW3NpemUgLyAyLCBzaXplIC8gMl0gKyAnKSAnXG4gICAgfVxuICAgIHZhciBjb250ZW50cyA9IDxnIHsuLi5jb250ZW50UHJvcHN9PlxuICAgICAgPGcgY2xhc3NOYW1lPSdzdGFnZSc+XG4gICAgICAgIHsvKiBUaWNrcy4gKi99XG4gICAgICAgIDxnPlxuICAgICAgICAgIHtkMy5yYW5nZShudW1UaWNrcykubWFwKChkLCBpKSA9PiB7XG4gICAgICAgICAgICB2YXIgc2hvdyA9IHN0YXRlLnNjYWxlKHZhbHVlKSA+IChkIC8gKG51bVRpY2tzIC0gMSkgKiAzNjApXG4gICAgICAgICAgICB2YXIgcm90YXRlID0gKGQgLyAobnVtVGlja3MgLSAxKSAqIDM2MCArIDE4MClcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSBbKG5vYlJhZGl1cyArIDUpLCAwXVxuICAgICAgICAgICAgdmFyIGFscGhhID0gc2hvdyA/IChkIC8gKG51bVRpY2tzIC0gMSkpIDogMFxuICAgICAgICAgICAgcmV0dXJuIDxyZWN0IHdpZHRoPXs1fSBoZWlnaHQ9ezR9IGtleT17aX1cbiAgICAgICAgICAgICAgdHJhbnNmb3JtPXtgcm90YXRlKCR7cm90YXRlfSkgdHJhbnNsYXRlKCR7dHJhbnNsYXRlfSlgfVxuICAgICAgICAgICAgICBzdHlsZT17e2ZpbGw6IGByZ2JhKDAsIDAsIDAsICR7YWxwaGF9KWB9fSAvPlxuICAgICAgICAgIH0pfVxuICAgICAgICA8L2c+XG4gICAgICAgIDxnIHRyYW5zZm9ybT17YHJvdGF0ZSgke3N0YXRlLnNjYWxlKHByb3BzLnZhbHVlKX0pYH0+XG4gICAgICAgICAgPGNpcmNsZSByPXtub2JSYWRpdXN9XG4gICAgICAgICAgICBzdHlsZT17e2ZpbGw6IG5vYkZpbGwsIHN0cm9rZTogbm9iU3Ryb2tlLCBjdXJzb3I6ICdtb3ZlJ319IC8+XG4gICAgICAgICAgPGcgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7LXNpemUvNH0sMClgfT5cbiAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgcj17aW5uZXJOb2JSYWRpdXN9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgZmlsbDogJ3JnYmEoMCwgMCwgMCwgMC4yKScsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAnbW92ZScsXG4gICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgICA8cGF0aCBkPSdNIDgsIC0yIEwgLTgsIC0yIE0gOCwgMiBMIC04LCAyJ1xuICAgICAgICAgICAgICB0cmFuc2Zvcm09e2Byb3RhdGUoJHsoLXN0YXRlLnNjYWxlKHZhbHVlKSl9KWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgc2hhcGVSZW5kZXJpbmc6ICdjcmlzcEVkZ2VzJyxcbiAgICAgICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiAncmdiYSgwLCAwLCAwLCAwLjEpJyxcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aDogMixcbiAgICAgICAgICAgICAgICBmaWxsOiAnbm9uZScsXG4gICAgICAgICAgICAgIH19IC8+XG4gICAgICAgICAgPC9nPlxuICAgICAgICA8L2c+XG4gICAgICA8L2c+XG4gICAgPC9nPlxuICAgIGlmICghd3JhcEluU1ZHKSByZXR1cm4gY29udGVudHNcbiAgICBlbHNlIHJldHVybiA8c3ZnIHsuLi57d2lkdGg6IHNpemUsIGhlaWdodDogc2l6ZSwga2V5OiAncm9vdC0xJywgc3R5bGV9fT5cbiAgICAgIHtjb250ZW50c31cbiAgICA8L3N2Zz5cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBEaWFsIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIFRoaXJkIHBhcnR5IG1vZHVsZXMuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG4vLyBDb21tb24gRVYgbW9kdWxlcy5cbnZhciBhbHBoYWlmeSA9IHJlcXVpcmUoJ2FscGhhaWZ5JylcbnZhciBjb2xvciA9IHJlcXVpcmUoJ2NvbG9yJylcbnZhciBwdWlkID0gcmVxdWlyZSgncHVpZCcpXG4vLyBNb2R1bGVzIGxvY2FsIHRvIHRoaXMgZXhwbGFuYXRpb24uXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcbnZhciBidWlsZE5vYnMgPSByZXF1aXJlKCcuL2J1aWxkTm9icycpXG5cbi8vIFN0eWxlcy5cblxuZnVuY3Rpb24gYXhpc1N0eWxlKGcpIHtcbiAgZy5zdHlsZSgnc2hhcGUtcmVuZGVyaW5nJywgJ2NyaXNwRWRnZXMnKVxuICAgLnN0eWxlKCdmb250LXNpemUnLCAnMTJweCcpXG4gIGcuc2VsZWN0QWxsKCdwYXRoJylcbiAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgLnN0eWxlKCdzdHJva2UnLCAnYmxhY2snKVxuICBnLnNlbGVjdEFsbCgnbGluZScpXG4gICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgIC5zdHlsZSgnc3Ryb2tlJywgJ2JsYWNrJylcbn1cblxuZnVuY3Rpb24gdGlja1N0eWxlKGcpIHtcbiAgZy5zdHlsZSh7XG4gICAgJ3N0cm9rZS13aWR0aCc6IDEsXG4gICAgc3Ryb2tlOiAncmdiYSgwLCAwLCAwLCAwLjEpJyxcbiAgICAnc2hhcGUtcmVuZGVyaW5nJzogJ2NyaXNwRWRnZXMnXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRpY2tzKGcsIGF4aXMsIHgsIHksIHRpY2tzKSB7XG4gIHZhciBlbnQgPSBnLnNlbGVjdEFsbCgnbGluZScpLmRhdGEodGlja3MpXG4gIGVudC5leGl0KCkucmVtb3ZlKClcbiAgZW50LmVudGVyKCkuYXBwZW5kKCdsaW5lJylcbiAgZW50XG4gICAgLmF0dHIoJ3gxJywgYXhpcyA9PT0gJ3gnID8geCAgICAgICAgICAgIDogeC5yYW5nZSgpWzBdKVxuICAgIC5hdHRyKCd5MScsIGF4aXMgPT09ICd4JyA/IHkucmFuZ2UoKVswXSA6IHkgICAgICAgICAgIClcbiAgICAuYXR0cigneDInLCBheGlzID09PSAneCcgPyB4ICAgICAgICAgICAgOiB4LnJhbmdlKClbMV0pXG4gICAgLmF0dHIoJ3kyJywgYXhpcyA9PT0gJ3gnID8geS5yYW5nZSgpWzFdIDogeSAgICAgICAgICAgKVxuICAgIC5jYWxsKHRpY2tTdHlsZSlcbn1cblxudmFyIExlYXN0U3F1YXJlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgc2VsKCkgeyByZXR1cm4gZDMuc2VsZWN0KHRoaXMuZ2V0RE9NTm9kZSgpKSB9LFxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvaW50czogW10sXG4gICAgICBiZXRhczogWzAsIDFdLFxuICAgICAgbG9jYXRpb25BY2Nlc3NvcjogZCA9PiBkLnBvaW50LFxuICAgICAgY29sb3JBY2Nlc3NvcjogZCA9PiBkLmNvbG9yLFxuICAgICAgb25EcmFnTm9iOiAoKSA9PiB1bmRlZmluZWQsXG4gICAgICBtb2RlOiAncG9pbnRzJyxcbiAgICAgIHNob3dFcnJvclNxdWFyZXM6IHRydWUsXG4gICAgICBzaG93Tm9iczogdHJ1ZSxcbiAgICAgIHNob3dFcnJvckxpbmVzOiB0cnVlLFxuICAgICAgc2hvd1JlZ3Jlc3Npb25MaW5lOiB0cnVlLFxuICAgICAgd2lkdGg6IDQxMCxcbiAgICAgIGhlaWdodDogNDEwLFxuICAgICAgbWFyZ2luczoge2w6IDMwLCB0OiAyMCwgcjogMjAsIGI6IDMwfSxcbiAgICAgIHhBeGlzTGFiZWw6ICd4JyxcbiAgICAgIHlBeGlzTGFiZWw6ICd5JyxcbiAgICAgIHN2Z1BhZGRpbmc6IDUwLFxuICAgIH1cbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHZhciB7d2lkdGgsIGhlaWdodCwgbWFyZ2lucywgc3ZnUGFkZGluZ30gPSB0aGlzLnByb3BzXG4gICAgdmFyIFt3LCBoLCBtXSA9IFt3aWR0aCwgaGVpZ2h0LCBtYXJnaW5zXVxuICAgIHZhciB4ID0gZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFswLCAxMDBdKS5yYW5nZShbbS5sLCB3IC0gbS5yXSlcbiAgICB2YXIgeSA9IGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihbMCwgMTAwXSkucmFuZ2UoW2ggLSBtLmIsIG0udF0pXG4gICAgdmFyIHh5ID0gZCA9PiBbeChkWzBdKSwgeShkWzFdKV1cbiAgICB2YXIgeHlpID0gZCA9PiBbeC5pbnZlcnQoZFswXSksIHkuaW52ZXJ0KGRbMV0pXVxuICAgIHZhciBpbml0U3RhdGUgPSAge3csIGgsIG0sIHgsIHksIHh5LCB4eWksIHN2Z1BhZGRpbmd9XG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIGluaXRTdGF0ZSlcbiAgfSxcbiAgLy8gTGlmZSBjeWNsZSBldmVudHMuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICB2YXIgZWwgPSB0aGlzLnNlbCgpXG5cbiAgICB2YXIgc3ZnID0gdGhpcy5zZWwoKS5hcHBlbmQoJ3N2ZycpLmF0dHIoe1xuICAgICAgd2lkdGg6IHN0YXRlLncgKyBzdGF0ZS5zdmdQYWRkaW5nICogMixcbiAgICAgIGhlaWdodDogc3RhdGUuaCArIHN0YXRlLnN2Z1BhZGRpbmcgKiAyXG4gICAgfSkuc3R5bGUoe1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBsZWZ0OiAtc3RhdGUuc3ZnUGFkZGluZyArICdweCcsXG4gICAgICB0b3A6IC1zdGF0ZS5zdmdQYWRkaW5nICsgJ3B4JyxcbiAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuICAgIH0pXG5cbiAgICB2YXIgZGVmcyA9IHN2Zy5hcHBlbmQoJ2RlZnMnKVxuICAgIFxuICAgIHZhciBncmFkaWVudElkMCA9ICdncmFkaWVudC0nICsgcHVpZCgpXG4gICAgdmFyIGdyYWRpZW50MCA9IGRlZnMuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpLmF0dHIoe1xuICAgICAgaWQ6IGdyYWRpZW50SWQwLFxuICAgICAgZ3JhZGllbnRVbml0czogJ29iamVjdEJvdW5kaW5nQm94JyxcbiAgICAgIHgyOiAxLFxuICAgICAgeTI6IDAsXG4gICAgfSlcbiAgICB2YXIgZmFkZSA9IDAuMVxuICAgIHZhciBncmFkQ29sb3IgPSAnd2hpdGUnXG4gICAgZ3JhZGllbnQwLmFwcGVuZCgnc3RvcCcpXG4gICAgICAuYXR0cignc3RvcC1jb2xvcicsIGdyYWRDb2xvcikuYXR0cignc3RvcC1vcGFjaXR5JywgMClcbiAgICAgIC5hdHRyKCdvZmZzZXQnLCAwKVxuICAgIGdyYWRpZW50MC5hcHBlbmQoJ3N0b3AnKVxuICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBncmFkQ29sb3IpLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDEpXG4gICAgICAuYXR0cignb2Zmc2V0JywgZmFkZSlcbiAgICBncmFkaWVudDAuYXBwZW5kKCdzdG9wJylcbiAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgZ3JhZENvbG9yKS5hdHRyKCdzdG9wLW9wYWNpdHknLCAxKVxuICAgICAgLmF0dHIoJ29mZnNldCcsIDEgLSBmYWRlKVxuICAgIGdyYWRpZW50MC5hcHBlbmQoJ3N0b3AnKVxuICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBncmFkQ29sb3IpLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDApXG4gICAgICAuYXR0cignb2Zmc2V0JywgMSlcblxuICAgIHZhciBncmFkaWVudElkMSA9ICdncmFkaWVudC0nICsgcHVpZCgpXG4gICAgdmFyIGdyYWRpZW50MSA9IGRlZnMuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpLmF0dHIoe1xuICAgICAgaWQ6IGdyYWRpZW50SWQxLFxuICAgICAgZ3JhZGllbnRVbml0czogJ29iamVjdEJvdW5kaW5nQm94JyxcbiAgICAgIHgyOiAwLFxuICAgICAgeTI6IDEsXG4gICAgfSlcbiAgICBncmFkaWVudDEuYXBwZW5kKCdzdG9wJylcbiAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgZ3JhZENvbG9yKS5hdHRyKCdzdG9wLW9wYWNpdHknLCAwKVxuICAgICAgLmF0dHIoJ29mZnNldCcsIDApXG4gICAgZ3JhZGllbnQxLmFwcGVuZCgnc3RvcCcpXG4gICAgICAuYXR0cignc3RvcC1jb2xvcicsIGdyYWRDb2xvcikuYXR0cignc3RvcC1vcGFjaXR5JywgMSlcbiAgICAgIC5hdHRyKCdvZmZzZXQnLCBmYWRlKVxuICAgIGdyYWRpZW50MS5hcHBlbmQoJ3N0b3AnKVxuICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCBncmFkQ29sb3IpLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDEpXG4gICAgICAuYXR0cignb2Zmc2V0JywgMSAtIGZhZGUpXG4gICAgZ3JhZGllbnQxLmFwcGVuZCgnc3RvcCcpXG4gICAgICAuYXR0cignc3RvcC1jb2xvcicsIGdyYWRDb2xvcikuYXR0cignc3RvcC1vcGFjaXR5JywgMClcbiAgICAgIC5hdHRyKCdvZmZzZXQnLCAxKVxuXG4gICAgLy8gTWFza3NcbiAgICB2YXIgbWFza0lkMCA9ICdtYXNrLScgKyBwdWlkKClcbiAgICBkZWZzLmFwcGVuZCgnbWFzaycpLmF0dHIoJ2lkJywgbWFza0lkMClcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKHtcbiAgICAgICAgd2lkdGg6IHN0YXRlLncgKyBzdGF0ZS5zdmdQYWRkaW5nICogMixcbiAgICAgICAgaGVpZ2h0OiBzdGF0ZS5oICsgc3RhdGUuc3ZnUGFkZGluZyAqIDIsXG4gICAgICAgIGZpbGw6ICd1cmwoIycgKyBncmFkaWVudElkMCArICcpJ1xuICAgICAgfSlcbiAgICB2YXIgbWFza0lkMSA9ICdtYXNrLScgKyBwdWlkKClcbiAgICBkZWZzLmFwcGVuZCgnbWFzaycpLmF0dHIoJ2lkJywgbWFza0lkMSlcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKS5hdHRyKHtcbiAgICAgICAgd2lkdGg6IHN0YXRlLncgKyBzdGF0ZS5zdmdQYWRkaW5nICogMixcbiAgICAgICAgaGVpZ2h0OiBzdGF0ZS5oICsgc3RhdGUuc3ZnUGFkZGluZyAqIDIsXG4gICAgICAgIGZpbGw6ICd1cmwoIycgKyBncmFkaWVudElkMSArICcpJ1xuICAgICAgfSlcblxuICAgIHZhciBiZzAgPSBzdmcuYXBwZW5kKCdnJykuYXR0cignbWFzaycsICd1cmwoIycgKyBtYXNrSWQwICsgJyknKVxuICAgIHZhciBiZzEgPSBiZzAuYXBwZW5kKCdnJykuYXR0cignbWFzaycsICd1cmwoIycgKyBtYXNrSWQxICsgJyknKVxuXG4gICAgdmFyIHN0YWdlID0gYmcxLmFwcGVuZCgnZycpXG4gICAgICAuYXR0cignY2xhc3MnLCAnc3RhZ2UnKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJ1xuICAgICAgICArIFtzdGF0ZS5zdmdQYWRkaW5nLCBzdGF0ZS5zdmdQYWRkaW5nXVxuICAgICAgKyAnKScpXG5cbiAgICBzdGFnZS5hcHBlbmQoJ2cnKS5jYWxsKGQzLnN2Zy5heGlzKCkuc2NhbGUoc3RhdGUueCkudGlja3MoNSkpXG4gICAgICAuY2FsbChheGlzU3R5bGUpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgWzAsIHN0YXRlLnkucmFuZ2UoKVswXV0gKyAnKScpXG4gICAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIFtkMy5tZWFuKHN0YXRlLngucmFuZ2UoKSksIDM1XSArICcpJylcbiAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ21pZGRsZScpXG4gICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgMTQpXG4gICAgICAgIC50ZXh0KHRoaXMucHJvcHMueEF4aXNMYWJlbClcblxuICAgIHN0YWdlLmFwcGVuZCgnZycpLmNhbGwoZDMuc3ZnLmF4aXMoKS5zY2FsZShzdGF0ZS55KS5vcmllbnQoJ2xlZnQnKS50aWNrcyg1KSlcbiAgICAgIC5jYWxsKGF4aXNTdHlsZSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7c3RhdGUueC5yYW5nZSgpWzBdfSwgMClgKVxuICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKC0zMCwke2QzLm1lYW4oc3RhdGUueS5yYW5nZSgpKX0pXG4gICAgICAgICAgcm90YXRlKC05MClgKVxuICAgICAgICAudGV4dCh0aGlzLnByb3BzLnlBeGlzTGFiZWwpXG4gICAgICAgIC5zdHlsZSgnZm9udC1zaXplJywgMTQpXG4gICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgIFxuICAgIHN0YWdlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3gtdGlja3MnKVxuICAgICAgLmNhbGwodXBkYXRlVGlja3MsICd4Jywgc3RhdGUueCwgc3RhdGUueSwgc3RhdGUueC50aWNrcygpKVxuICAgIHN0YWdlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3ktdGlja3MnKVxuICAgICAgLmNhbGwodXBkYXRlVGlja3MsICd5Jywgc3RhdGUueCwgc3RhdGUueSwgc3RhdGUueS50aWNrcygpKVxuICAgICAgXG5cbiAgICAvLyBBZGQgdHJlbmQgbGluZS5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93UmVncmVzc2lvbkxpbmUpXG4gICAgICBzdGFnZS5hcHBlbmQoJ2xpbmUnKS5hdHRyKCdjbGFzcycsICdsaW5lLW9scycpXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgY29sb3IucHJpbWFyeSlcblxuICAgIC8vIEFkZCBlcnJvciBsaW5lcy5cbiAgICBpZiAodGhpcy5wcm9wcy5zaG93RXJyb3JMaW5lcylcbiAgICAgIHN0YWdlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2Vycm9yLWxpbmVzJylcbiAgICAgICAgLnNlbGVjdEFsbCgnbGluZScpLmRhdGEodGhpcy5zdGF0ZS5lcnJvcnMpXG4gICAgICAgIC5lbnRlcigpLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCB0aGlzLnByb3BzLmNvbG9yQWNjZXNzb3IpXG4gICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCAyKVxuICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLWRhc2hhcnJheScsICcyLCAyJylcblxuICAgIC8vIEFkZCBlcnJvciBzcXVhcmVzLlxuICAgIGlmICh0aGlzLnByb3BzLnNob3dFcnJvclNxdWFyZXMpXG4gICAgICBzdGFnZS5hcHBlbmQoJ2cnKS5hdHRyKCdjbGFzcycsICdlcnJvci1zcXVhcmVzJylcbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdCcpLmRhdGEodGhpcy5zdGF0ZS5lcnJvcnMpLmVudGVyKCkuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgICAgLnN0eWxlKCdmaWxsJywgKGQsIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gYWxwaGFpZnkoc2VsZi5wcm9wcy5jb2xvckFjY2Vzc29yKGQuZCwgaSksIDAuMilcbiAgICAgICAgfSlcblxuICAgIC8vIEFkZCBub2JzLlxuICAgIGlmICh0aGlzLnByb3BzLm1vZGUgPT09ICdwb2ludCcpXG4gICAgICBidWlsZE5vYnMoc3RhZ2UsIHRoaXMucHJvcHMucG9pbnRzLCAncG9pbnQtbm9icycpXG4gICAgICAgIC5jYWxsKGQzLmJlaGF2aW9yLmRyYWcoKVxuICAgICAgICAgIC5vbignZHJhZycsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBwID0gc3RhdGUueHlpKGQzLm1vdXNlKHN0YWdlLm5vZGUoKSkpXG4gICAgICAgICAgICBwWzBdID0gZDMucm91bmQocFswXSwgMiksIHBbMV0gPSBkMy5yb3VuZChwWzFdLCAyKVxuICAgICAgICAgICAgc2VsZi5fY2xhbXAocClcbiAgICAgICAgICAgIHNlbGYucHJvcHMub25EcmFnTm9iKCdwb2ludCcsIHsgcG9zOiBwLCBkOiBkLCBpOiBpIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgKS5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnYXV0bycpXG5cbiAgICBpZiAodGhpcy5wcm9wcy5tb2RlID09PSAncmVncmVzc2lvbicpXG4gICAgICBidWlsZE5vYnMoc3RhZ2UsIHRoaXMucHJvcHMucmVncmVzc2lvblBvaW50cywgJ3JlZ3Jlc3Npb24tbm9icycpXG4gICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnYXV0bycpXG4gICAgICAgIC5jYWxsKGQzLmJlaGF2aW9yLmRyYWcoKVxuICAgICAgICAgIC5vbignZHJhZycsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICB2YXIgcCA9IHN0YXRlLnh5aShkMy5tb3VzZShzdGFnZS5ub2RlKCkpKVxuICAgICAgICAgICAgcFswXSA9IGQzLnJvdW5kKHBbMF0sIDIpLCBwWzFdID0gZDMucm91bmQocFsxXSwgMilcbiAgICAgICAgICAgIHNlbGYuX2NsYW1wKHApXG4gICAgICAgICAgICBzZWxmLnByb3BzLm9uRHJhZ05vYigncmVncmVzc2lvbicsIHsgcG9zOiBwLCBkOiBkLCBpOiBpIH0pXG4gICAgICAgICAgfSkpXG5cbiAgICAvLyBBZGQgcG9pbnRzLlxuICAgIHN0YWdlLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3BvaW50cycpXG4gICAgICAuc2VsZWN0QWxsKCdnJylcbiAgICAgIC5kYXRhKHRoaXMucHJvcHMucG9pbnRzKVxuICAgICAgLmVudGVyKCkuYXBwZW5kKCdnJykuYXBwZW5kKCdjaXJjbGUnKVxuICAgICAgICAuYXR0cigncicsIDQpXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMucHJvcHMuY29sb3JBY2Nlc3NvcilcbiAgICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICBcbiAgICB0aGlzLl91cGRhdGVET00oKVxuICB9LFxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgLy8gV29uJ3QgdHJpZ2dlciByZS1yZW5kZXIuXG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl91cGRhdGVTdGF0ZUZyb21Qcm9wcyhuZXdQcm9wcykpXG4gICAgdGhpcy5fdXBkYXRlRE9NKClcbiAgfSxcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzKSB7XG4gICAgLy8gU2ltcGxlIGRpcnR5IGNoZWNraW5nLiBSZXF1aXJlcyBjb3B5IHRvIGZvcmNlIHJlZHJhdy5cbiAgICB2YXIgc2hvdWxkVXBkYXRlID1cbiAgICAgICAgIG5ld1Byb3BzLnBvaW50cyAhPT0gdGhpcy5wcm9wcy5wb2ludHNcbiAgICAgIHx8IG5ld1Byb3BzLnJlZ3Jlc3Npb25Qb2ludHMgIT09IHRoaXMucHJvcHMucmVncmVzc2lvblBvaW50c1xuICAgICAgfHwgbmV3UHJvcHMuYmV0YXMgIT09IHRoaXMucHJvcHMuYmV0YXNcbiAgICAgIHx8IG5ld1Byb3BzLmJldGFzICYmIHRoaXMucHJvcHMuYmV0YXMgJiZcbiAgICAgICAgKFxuICAgICAgICAgICAgIG5ld1Byb3BzLmJldGFzWzBdICE9PSB0aGlzLnByb3BzLmJldGFzWzBdXG4gICAgICAgICAgfHwgbmV3UHJvcHMuYmV0YXNbMV0gIT09IHRoaXMucHJvcHMuYmV0YXNbMV1cbiAgICAgICAgKVxuICAgIHJldHVybiBzaG91bGRVcGRhdGVcbiAgfSxcbiAgX2NsYW1wKHApIHtcbiAgICB2YXIgeCA9IHRoaXMuc3RhdGUueCwgeSA9IHRoaXMuc3RhdGUueVxuICAgIHBbMF0gPSBNYXRoLm1heCh4LmRvbWFpbigpWzBdLCBNYXRoLm1pbih4LmRvbWFpbigpWzFdLCBwWzBdKSlcbiAgICBwWzFdID0gTWF0aC5tYXgoeS5kb21haW4oKVswXSwgTWF0aC5taW4oeS5kb21haW4oKVsxXSwgcFsxXSkpXG4gICAgcmV0dXJuIHBcbiAgfSxcbiAgX3VwZGF0ZVBvaW50cygpIHtcbiAgICB2YXIge2xvY2F0aW9uQWNjZXNzb3IsIHBvaW50c30gPSB0aGlzLnByb3BzXG4gICAgdmFyIHt4eX0gPSB0aGlzLnN0YXRlXG4gICAgdGhpcy5zZWwoKS5zZWxlY3QoJy5wb2ludHMnKS5zZWxlY3RBbGwoJ2cnKVxuICAgICAgLmRhdGEocG9pbnRzKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGQgPT4gYHRyYW5zbGF0ZSgke3h5KGxvY2F0aW9uQWNjZXNzb3IoZCkpfSlgKVxuICB9LFxuICBfdXBkYXRlVHJlbmRMaW5lKCkge1xuICAgIHZhciB7eCwgeSwgcmVxLCByc30gPSB0aGlzLnN0YXRlXG4gICAgdmFyIHAxID0gW3guZG9tYWluKClbMF0sIHJzKHguZG9tYWluKClbMF0pXVxuICAgIHZhciBwMiA9IFt4LmRvbWFpbigpWzFdLCBycyh4LmRvbWFpbigpWzFdKV1cblxuICAgIC8vIFJlc3RyaWN0IHRoZSBsaW5lIHRvIHRoZSBwbG90IGFyZWEuXG4gICAgaWYgKHAxWzFdIDwgeS5kb21haW4oKVswXSlcbiAgICAgIHAxID0gW3JzLmludmVydCh5LmRvbWFpbigpWzBdKSwgeS5kb21haW4oKVswXV1cbiAgICBlbHNlIGlmIChwMVsxXSA+IHkuZG9tYWluKClbMV0pXG4gICAgICBwMSA9IFtycy5pbnZlcnQoeS5kb21haW4oKVsxXSksIHkuZG9tYWluKClbMV1dXG5cbiAgICBpZiAocDJbMV0gPCB5LmRvbWFpbigpWzBdKVxuICAgICAgcDIgPSBbcnMuaW52ZXJ0KHkuZG9tYWluKClbMF0pLCB5LmRvbWFpbigpWzBdXVxuICAgIGVsc2UgaWYgKHAyWzFdID4geS5kb21haW4oKVsxXSlcbiAgICAgIHAyID0gW3JzLmludmVydCh5LmRvbWFpbigpWzFdKSwgeS5kb21haW4oKVsxXV1cblxuICAgIHRoaXMuc2VsKCkuc2VsZWN0KCcubGluZS1vbHMnKVxuICAgICAgLmF0dHIoeyB4MTogeChwMVswXSksIHkxOiB5KHAxWzFdKSwgeDI6IHgocDJbMF0pLCB5MjogeShwMlsxXSkgfSlcbiAgfSxcbiAgX3VwZGF0ZU5vYnMoKSB7XG4gICAgdmFyIHtzdGF0ZSwgcHJvcHN9ID0gdGhpc1xuICAgIHZhciB7eHl9ID0gc3RhdGVcbiAgICB2YXIge2xvY2F0aW9uQWNjZXNzb3IsIHBvaW50cywgcmVncmVzc2lvblBvaW50cywgc2hvd05vYnN9ID0gcHJvcHNcbiAgICB0aGlzLnNlbCgpLnNlbGVjdCgnLnBvaW50LW5vYnMnKVxuICAgICAgLnNlbGVjdEFsbCgnLm5vYicpXG4gICAgICAuZGF0YShwb2ludHMpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgZCA9PiBgdHJhbnNsYXRlKCR7eHkobG9jYXRpb25BY2Nlc3NvcihkKSl9KWApXG4gICAgICAuc3R5bGUoe1xuICAgICAgICBvcGFjaXR5OiBzaG93Tm9icyA/IDEgOiAwLFxuICAgICAgICAncG9pbnRlci1ldmVudHMnOiBzaG93Tm9icyA/ICdhdXRvJyA6ICdub25lJyxcbiAgICAgIH0pXG4gICAgaWYgKHJlZ3Jlc3Npb25Qb2ludHMpIHRoaXMuc2VsKCkuc2VsZWN0KCcucmVncmVzc2lvbi1ub2JzJylcbiAgICAgIC5zZWxlY3RBbGwoJy5ub2InKVxuICAgICAgICAuZGF0YShyZWdyZXNzaW9uUG9pbnRzKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZCA9PiBgdHJhbnNsYXRlKCR7c3RhdGUueHkoZCl9KWApXG4gIH0sXG4gIF91cGRhdGVFcnJvcnMoKSB7XG4gICAgdmFyIHtzdGF0ZSwgcHJvcHN9ID0gdGhpc1xuICAgIHZhciB7ZXJyb3JzLCB4LCB5LCByZWcsIHh5fSA9IHN0YXRlXG4gICAgdmFyIGFjYyA9IHByb3BzLmxvY2F0aW9uQWNjZXNzb3JcbiAgICB0aGlzLnNlbCgpLnNlbGVjdCgnLmVycm9yLWxpbmVzJykuc2VsZWN0QWxsKCdsaW5lJylcbiAgICAgIC5kYXRhKGVycm9ycylcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgeDE6IGQgPT4geChhY2MoZC5kKVswXSksXG4gICAgICAgIHgyOiBkID0+IHgoYWNjKGQuZClbMF0pLFxuICAgICAgICB5MTogZCA9PiB5KGFjYyhkLmQpWzFdKSxcbiAgICAgICAgeTI6IGQgPT4geShhY2MoZC5kKVsxXSArIGQuZXJyKSxcbiAgICAgIH0pXG4gICAgdGhpcy5zZWwoKS5zZWxlY3QoJy5lcnJvci1zcXVhcmVzJykuc2VsZWN0QWxsKCdyZWN0JylcbiAgICAgIC5kYXRhKGVycm9ycylcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBkID0+IGB0cmFuc2xhdGUoJHt4eShhY2MoZC5kKSl9KWApXG4gICAgICAuYXR0cih7XG4gICAgICAgIHg6IGQgPT4ge1xuICAgICAgICAgIGlmIChyZWcuYiA+IDAgJiYgZC5lcnIgPCAwKVxuICAgICAgICAgICAgcmV0dXJuIHgoYWNjKGQuZClbMV0gKyBkLmVycikgLSB4KGFjYyhkLmQpWzFdKVxuICAgICAgICAgIGVsc2UgcmV0dXJuIDBcbiAgICAgICAgfSxcbiAgICAgICAgeTogZCA9PiAoZC5lcnIgPCAwKSA/IDAgOiB5KGFjYyhkLmQpWzFdICsgZC5lcnIpIC0geShhY2MoZC5kKVsxXSksXG4gICAgICAgIHdpZHRoOiBkID0+IE1hdGguYWJzKHgoYWNjKGQuZClbMV0gKyBkLmVycikgLSB4KGFjYyhkLmQpWzFdKSksXG4gICAgICAgIGhlaWdodDogZCA9PiBNYXRoLmFicyh5KGFjYyhkLmQpWzFdICsgZC5lcnIpIC0geShhY2MoZC5kKVsxXSkpLFxuICAgICAgfSlcbiAgfSxcbiAgX3VwZGF0ZVN0YXRlRnJvbVByb3BzKHByb3BzLCBzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUgfHwgdGhpcy5zdGF0ZVxuICAgIHZhciB7eCwgeX0gPSBzdGF0ZVxuICAgIHZhciBhY2MgPSB0aGlzLnByb3BzLmxvY2F0aW9uQWNjZXNzb3JcbiAgICB2YXIgcmVnXG4gICAgaWYgKHByb3BzLm1vZGUgPT09ICdwb2ludCcpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmJldGFzKVxuICAgICAgICByZWcgPSB7YTogdGhpcy5wcm9wcy5iZXRhc1swXSwgYjogdGhpcy5wcm9wcy5iZXRhc1sxXX1cbiAgICAgIGVsc2VcbiAgICAgICAgcmVnID0gdXRpbHMub2xzKHRoaXMucHJvcHMucG9pbnRzLCBhY2MpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmVnID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgeDEgPSBwcm9wcy5yZWdyZXNzaW9uUG9pbnRzWzBdWzBdLCB5MSA9IHByb3BzLnJlZ3Jlc3Npb25Qb2ludHNbMF1bMV1cbiAgICAgICAgdmFyIHgyID0gcHJvcHMucmVncmVzc2lvblBvaW50c1sxXVswXSwgeTIgPSBwcm9wcy5yZWdyZXNzaW9uUG9pbnRzWzFdWzFdXG4gICAgICAgIHZhciBkeSA9IHkyIC0geTEsIGR4ID0geDIgLSB4MVxuICAgICAgICBpZiAoTWF0aC5hYnMoZHgpIDwgMWUtNikgZHggPSAxXG4gICAgICAgIHZhciBiID0gZHkgLyBkeCwgYSA9IC0gYiAqIHgxICsgeTFcbiAgICAgICAgcmV0dXJuIHsgYTogYSwgYjogYn1cbiAgICAgIH0pKClcbiAgICB9XG4gICAgdmFyIHJzID0gZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFswLCAxXSkucmFuZ2UoW3JlZy5hLCByZWcuYSArIHJlZy5iICogMV0pXG4gICAgc3RhdGUuZXJyb3JzID0gcHJvcHMucG9pbnRzLm1hcChkID0+IHtcbiAgICAgIHZhciBwb2ludCA9IGFjYyhkKVxuICAgICAgcmV0dXJuIHtlcnI6IHJzKHBvaW50WzBdKSAtIHBvaW50WzFdIC8qIGVyciA9IHggLSBYICovLCBkOiBkfVxuICAgIH0pXG4gICAgc3RhdGUucmVnID0gcmVnXG4gICAgc3RhdGUucnMgPSByc1xuICAgIHJldHVybiBzdGF0ZVxuICB9LFxuICBfdXBkYXRlRE9NKCkge1xuICAgIHRoaXMuX3VwZGF0ZVRyZW5kTGluZSgpXG4gICAgdGhpcy5fdXBkYXRlUG9pbnRzKClcbiAgICB0aGlzLl91cGRhdGVOb2JzKClcbiAgICB0aGlzLl91cGRhdGVFcnJvcnMoKVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB3aWR0aDogdGhpcy5zdGF0ZS53ICsgJ3B4JyxcbiAgICAgIGhlaWdodDogdGhpcy5zdGF0ZS5oICsgJ3B4JyxcbiAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgfSwgdGhpcy5wcm9wcy5zdHlsZSB8fCB7fSlcbiAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGV9IC8+XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTGVhc3RTcXVhcmVzIiwiJ3VzZSBzdHJpY3QnXG5cbi8vIFRoaXJkIHBhcnR5IG1vZHVsZXMuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG52YXIgZDMgPSByZXF1aXJlKCdkMycpXG4vLyBTaGFyZWQgbW9kdWxlcyBhY3Jvc3MgZXhwbGFuYXRpb25zLlxudmFyIGNvbG9yID0gcmVxdWlyZSgnY29sb3InKVxuLy8gTG9jYWwgbW9kdWxlcyB0byB0aGlzIGV4cGxhbmF0aW9uLlxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG52YXIgTGVhc3RTcXVhcmVzID0gcmVxdWlyZSgnLi9MZWFzdFNxdWFyZXMucmVhY3QnKVxudmFyIE9MUzNEID0gcmVxdWlyZSgnLi9PTFMzRC5yZWFjdCcpXG52YXIgRGlhbCA9IHJlcXVpcmUoJy4vRGlhbC5yZWFjdCcpXG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJylcblxudmFyIExlYXN0U3F1YXJlczNETW9kdWxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgdmFyIGNvbG9yID0gZDMuc2NhbGUuY2F0ZWdvcnkxMCgpXG4gICAgdmFyIHBvaW50cyA9IFtcbiAgICAgIFsxNiwgMTAsICA1XSxcbiAgICAgIFsxMywgMzAsIDIzXSxcbiAgICAgIFsyNCwgMjAsIDMzXSxcbiAgICAgIFs0MywgNDQsIDMyXSxcbiAgICAgIFs1MSwgNTIsIDUzXSxcbiAgICAgIFs4NCwgNzEsIDY1XSxcbiAgICAgIFs5MCwgODAsIDg1XVxuICAgIF0ubWFwKChwb2ludCwgaSkgPT4gKHtwb2ludCwgY29sb3I6IGNvbG9yKGkpfSkpXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgcG9pbnRzOiBwb2ludHMsXG4gICAgICB3aWR0aDogMjA1LFxuICAgICAgaGVpZ2h0OiAyMDUsXG4gICAgICBkaWFsSGVpZ2h0OiAxMDAsXG4gICAgICBiZXRhczogdGhpcy5fZ2V0QmV0YXMocG9pbnRzKSxcbiAgICAgIHJlZ3Jlc3Npb25Qb2ludHM6IHtcbiAgICAgICAgeDE6IFtbMjAsIDIwXSwgWzgwLCA4MF1dLFxuICAgICAgICB4MjogW1syMCwgMjBdLCBbODAsIDgwXV0sXG4gICAgICB9LFxuICAgICAgcmVncmVzc2lvbkJldGFzOiBbNTAsIDAsIDBdLFxuICAgICAgcmVncmVzc2lvblBsYW5lTm9iOiB7cG9zOiBbMCwgMCwgMF0sIHJvdDogWzAsIDAsIDBdfSxcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG4gIH0sXG4gIF9sb2NhdGlvbkFjY2Vzc29yWDFZOiBkID0+IFtkLnBvaW50WzBdLCBkLnBvaW50WzFdXSxcbiAgX2xvY2F0aW9uQWNjZXNzb3JYMlk6IGQgPT4gW2QucG9pbnRbMl0sIGQucG9pbnRbMV1dLFxuICBfb25EcmFnUG9pbnQzKHBvaW50LCBkYXRhKSB7XG4gICAgZGF0YS5wb2ludCA9IHBvaW50XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwb2ludHM6IHRoaXMuc3RhdGUucG9pbnRzLnNsaWNlKDApIC8vIGNvcHlcbiAgICB9KVxuICB9LFxuICBfb25EcmFnUG9pbnRYMVkodHlwZSwgZXZlbnQpIHtcbiAgICB2YXIgcG9zID0gW2V2ZW50LnBvc1swXSwgZXZlbnQucG9zWzFdLCBldmVudC5kLnBvaW50WzJdXVxuICAgIGlmICh0eXBlID09PSAncG9pbnQnKSB0aGlzLl91cGRhdGVQb2ludChldmVudC5kLCBwb3MpXG4gIH0sXG4gIF9vbkRyYWdQb2ludFgyWSh0eXBlLCBldmVudCkge1xuICAgIHZhciBwb3MgPSBbZXZlbnQuZC5wb2ludFswXSwgZXZlbnQucG9zWzFdLCBldmVudC5wb3NbMF1dXG4gICAgaWYgKHR5cGUgPT09ICdwb2ludCcpIHRoaXMuX3VwZGF0ZVBvaW50KGV2ZW50LmQsIHBvcylcbiAgfSxcbiAgX2dldEJldGFzKHBvaW50cykge1xuICAgIHZhciBYID0gcG9pbnRzLm1hcChkID0+IFtkLnBvaW50WzBdLCBkLnBvaW50WzJdXSlcbiAgICB2YXIgeSA9IHBvaW50cy5tYXAoZCA9PiBkLnBvaW50WzFdKVxuICAgIHJldHVybiB1dGlscy5oZXNzaWFuKHksIFgpXG4gIH0sXG4gIF91cGRhdGVQb2ludChkLCBwb3MpIHtcbiAgICB2YXIgcG9pbnRzID0gdGhpcy5zdGF0ZS5wb2ludHMuc2xpY2UoMClcbiAgICBkLnBvaW50ID0gcG9zXG4gICAgdGhpcy5zZXRTdGF0ZSh7cG9pbnRzLCBiZXRhczogdGhpcy5fZ2V0QmV0YXMocG9pbnRzKX0pXG4gIH0sXG4gIF91cGRhdGVSZWdyZXNzaW9uQmV0YShpZHgsIHZhbCkge1xuICAgIHZhciByZWdyZXNzaW9uQmV0YXMgPSB0aGlzLnN0YXRlLnJlZ3Jlc3Npb25CZXRhcy5zbGljZSgpXG4gICAgcmVncmVzc2lvbkJldGFzW2lkeF0gPSB2YWxcbiAgICB0aGlzLnNldFN0YXRlKHtyZWdyZXNzaW9uQmV0YXN9KVxuICB9LFxuICBfdXBkYXRlUmVncmVzc2lvbkJldGEwKHZhbCkgeyB0aGlzLl91cGRhdGVSZWdyZXNzaW9uQmV0YSgwLCB2YWwpIH0sXG4gIF91cGRhdGVSZWdyZXNzaW9uQmV0YTEodmFsKSB7IHRoaXMuX3VwZGF0ZVJlZ3Jlc3Npb25CZXRhKDEsIHZhbCkgfSxcbiAgX3VwZGF0ZVJlZ3Jlc3Npb25CZXRhMih2YWwpIHsgdGhpcy5fdXBkYXRlUmVncmVzc2lvbkJldGEoMiwgdmFsKSB9LFxuICBfcmVuZGVyRGlhbChvcHRzKSB7XG4gICAgdmFyIHtkaWFsSGVpZ2h0fSA9IHRoaXMuc3RhdGVcbiAgICB2YXIgZGlhbFNpemUgPSA2MFxuICAgIHZhciBkaWFsRm9udFkgPSBkaWFsSGVpZ2h0IC8gMiArIDZcbiAgICB2YXIgZGlhbFkgPSBkaWFsSGVpZ2h0IC8gMlxuICAgIHJldHVybiA8Zz5cbiAgICAgIDx0ZXh0XG4gICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke29wdHMucG9zWH0sICR7ZGlhbEZvbnRZfSlgfVxuICAgICAgICB0ZXh0QW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgc3R5bGU9e3N0eWxlLmRpYWxGb250U21hbGx9PlxuICAgICAgICB7ZDMuZm9ybWF0KCcuMmYnKSh0aGlzLnN0YXRlLnJlZ3Jlc3Npb25CZXRhc1tvcHRzLmJldGFJbmRleF0pfVxuICAgICAgPC90ZXh0PlxuICAgICAgPERpYWxcbiAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7b3B0cy5wb3NYfSwgJHtkaWFsWX0pYH1cbiAgICAgICAgbWluPXtvcHRzLm1pbn1cbiAgICAgICAgbWF4PXtvcHRzLm1heH1cbiAgICAgICAgc2l6ZT17ZGlhbFNpemV9XG4gICAgICAgIGlubmVyTm9iUmFkaXVzPXtkaWFsU2l6ZSAvIDR9XG4gICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnJlZ3Jlc3Npb25CZXRhc1tvcHRzLmJldGFJbmRleF19XG4gICAgICAgIG9uQ2hhbmdlVmFsdWU9e3RoaXNbJ191cGRhdGVSZWdyZXNzaW9uQmV0YScgKyBvcHRzLmJldGFJbmRleF19XG4gICAgICAgIHdyYXBJblNWRz17ZmFsc2V9IC8+XG4gICAgPC9nPlxuICB9LFxuICBfcmVuZGVyRGlhbHMoKSB7XG4gICAgdmFyIHtkaWFsSGVpZ2h0fSA9IHRoaXMuc3RhdGVcbiAgICB2YXIgcG9zID0gWzc1LCAxMTUsIDE1NSwgMTkwLCAzMDUsIDM1MCwgMzg1LCA0OTBdXG4gICAgdmFyIHRleHRZID0gZGlhbEhlaWdodCAvIDIgKyA4XG4gICAgLy8gRm9yIHRoZSBkZW1vIHZpZGVvLlxuICAgIC8vIGlmICh0cnVlKSB7XG4gICAgLy8gICByZXR1cm4gPHN2ZyB3aWR0aD17NjIwfSBoZWlnaHQ9e2RpYWxIZWlnaHR9IHN0eWxlPXtzdHlsZS5kaWFsRGVtb30+XG4gICAgLy8gICAgIHt0aGlzLl9yZW5kZXJEaWFsKHtwb3NYOiA2MjAgLyAyLCBiZXRhSW5kZXg6IDAsIG1pbjogLTUsIG1heDogNX0pfVxuICAgIC8vICAgPC9zdmc+XG4gICAgLy8gfVxuICAgIHJldHVybiA8c3ZnIHdpZHRoPXs2MjB9IGhlaWdodD17ZGlhbEhlaWdodH0gc3R5bGU9e3N0eWxlLmRpYWxEZW1vfT5cbiAgICAgIHsvKiBEaWFsIGZvciBiZXRhIDAgKi99XG4gICAgICB7dGhpcy5fcmVuZGVyRGlhbCh7cG9zWDogcG9zWzBdLCBiZXRhSW5kZXg6IDAsIG1pbjogLTEwMCwgbWF4OiAxMDB9KX1cbiAgICAgIFxuICAgICAgPHRleHQgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7cG9zWzFdfSwgJHt0ZXh0WX0pYH0gdGV4dEFuY2hvcj0nbWlkZGxlJ1xuICAgICAgICBzdHlsZT17c3R5bGUuZGlhbEZvbnR9PiArIDwvdGV4dD5cbiAgICAgIFxuICAgICAge3RoaXMuX3JlbmRlckRpYWwoe3Bvc1g6IHBvc1syXSwgYmV0YUluZGV4OiAxLCBtaW46IC01LCBtYXg6IDV9KX1cblxuICAgICAgPHRleHQgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7cG9zWzNdfSwke3RleHRZfSlgfSB0ZXh0QW5jaG9yPSdzdGFydCdcbiAgICAgICAgc3R5bGU9e3N0eWxlLmRpYWxGb250fT4gKiBoYW5kIHNpemUgPC90ZXh0PlxuXG4gICAgICA8dGV4dCB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtwb3NbNF19LCR7dGV4dFl9KWB9IHRleHRBbmNob3I9J21pZGRsZSdcbiAgICAgICAgc3R5bGU9e3N0eWxlLmRpYWxGb250fT4gKyA8L3RleHQ+XG5cbiAgICAgIHsvKiBEaWFsIGZvciBiZXRhIDIgKi99XG4gICAgICB7dGhpcy5fcmVuZGVyRGlhbCh7cG9zWDogcG9zWzVdLCBiZXRhSW5kZXg6IDIsIG1pbjogLTUsIG1heDogNX0pfVxuXG4gICAgICA8dGV4dCB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHtwb3NbNl19LCR7dGV4dFl9KWB9IHRleHRBbmNob3I9J3N0YXJ0J1xuICAgICAgICBzdHlsZT17c3R5bGUuZGlhbEZvbnR9PiAqIGhhbmQgc2l6ZSA8L3RleHQ+XG5cbiAgICAgIDx0ZXh0IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3Bvc1s3XX0sJHt0ZXh0WX0pYH0gdGV4dEFuY2hvcj0nc3RhcnQnXG4gICAgICAgIHN0eWxlPXtzdHlsZS5kaWFsRm9udH0+ID0gaGVpZ2h0IDwvdGV4dD5cbiAgICA8L3N2Zz5cbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHZhciBtYXJnaW5zID0ge2w6IDIwLCB0OiAyMCwgcjogMjAsIGI6IDIwfVxuICAgIHZhciB7d2lkdGgsIGhlaWdodCwgYmV0YXN9ID0gdGhpcy5zdGF0ZVxuICAgIHJldHVybiA8ZGl2PlxuICAgICAgPHNlY3Rpb24ga2V5PSdsczNkLTEnIHN0eWxlPXt7Y2xlYXI6ICdib3RoJywgcGFkZGluZzogMCwgbWFyZ2luQm90dG9tOiA2MH19PlxuICAgICAgICA8cD5cbiAgICAgICAgICBOb3csIHJlYWwgc2NpZW50aXN0cyBhbmQgZXZlbiBzb2Npb2xvZ2lzdHMgcmFyZWx5IGRvIHJlZ3Jlc3Npb24gd2l0aCBqdXN0IG9uZSBpbmRlcGVuZGVudCB2YXJpYWJsZSwgYnV0IE9MUyB3b3JrcyBleGFjdGx5IHRoZSBzYW1lIHdpdGggbW9yZS4gQmVsb3cgaXMgT0xTIHdpdGggdHdvIGluZGVwZW5kZW50IHZhcmlhYmxlcy4gSW5zdGVhZCBvZiB0aGUgZXJyb3JzIGJlaW5nIHJlbGF0aXZlIHRvIGEgbGluZSwgdGhvdWdoLCB0aGV5J3JlIG5vdyByZWxhdGl2ZSB0byBhIHBsYW5lIGluIDNEIHNwYWNlLiBTbyBub3cgdGhlIGpvYiBvZiBPTFMgaXMgdG8gZmluZCB0aGUgZXF1YXRpb24gZm9yIHRoYXQgcGxhbmUuIFRoZSBzbGljZSBvZiB0aGUgcGxhbmUgdGhyb3VnaCBlYWNoIGF4aXMgaXMgc2hvd24gaW4gdGhlIGZpcnN0IHR3byBmaWd1cmVzLlxuICAgICAgICA8L3A+XG4gICAgICAgIDxMZWFzdFNxdWFyZXNcbiAgICAgICAgICBrZXk9J2xlYXN0LXNxdWFyZXMteDEteSdcbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgbWFyZ2lucz17bWFyZ2luc31cbiAgICAgICAgICBiZXRhcz17W2JldGFzWzBdLCBiZXRhc1sxXV19XG4gICAgICAgICAgbW9kZT0ncG9pbnQnXG4gICAgICAgICAgeEF4aXNMYWJlbD0neDEnXG4gICAgICAgICAgeUF4aXNMYWJlbD0neSdcbiAgICAgICAgICBzaG93RXJyb3JTcXVhcmVzPXtmYWxzZX1cbiAgICAgICAgICBzaG93RXJyb3JMaW5lcz17ZmFsc2V9XG4gICAgICAgICAgc2hvd1JlZ3Jlc3Npb25MaW5lPXt0cnVlfVxuICAgICAgICAgIHBvaW50cz17dGhpcy5zdGF0ZS5wb2ludHN9XG4gICAgICAgICAgbG9jYXRpb25BY2Nlc3Nvcj17dGhpcy5fbG9jYXRpb25BY2Nlc3NvclgxWX1cbiAgICAgICAgICBvbkRyYWdOb2I9e3RoaXMuX29uRHJhZ1BvaW50WDFZfVxuICAgICAgICAgIHN0eWxlPXt7ZmxvYXQ6ICdsZWZ0J319IC8+XG4gICAgICAgIDxMZWFzdFNxdWFyZXNcbiAgICAgICAgICBrZXk9J2xlYXN0LXNxdWFyZXMteDIteSdcbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgbWFyZ2lucz17bWFyZ2luc31cbiAgICAgICAgICBiZXRhcz17W2JldGFzWzBdLCBiZXRhc1syXV19XG4gICAgICAgICAgbW9kZT0ncG9pbnQnXG4gICAgICAgICAgeEF4aXNMYWJlbD0neDInXG4gICAgICAgICAgeUF4aXNMYWJlbD0nJ1xuICAgICAgICAgIHNob3dFcnJvclNxdWFyZXM9e2ZhbHNlfVxuICAgICAgICAgIHNob3dFcnJvckxpbmVzPXtmYWxzZX1cbiAgICAgICAgICBzaG93UmVncmVzc2lvbkxpbmU9e3RydWV9XG4gICAgICAgICAgcG9pbnRzPXt0aGlzLnN0YXRlLnBvaW50c31cbiAgICAgICAgICBsb2NhdGlvbkFjY2Vzc29yPXt0aGlzLl9sb2NhdGlvbkFjY2Vzc29yWDJZfVxuICAgICAgICAgIG9uRHJhZ05vYj17dGhpcy5fb25EcmFnUG9pbnRYMll9XG4gICAgICAgICAgc3R5bGU9e3tmbG9hdDogJ2xlZnQnfX0gLz5cbiAgICAgICAgPE9MUzNEXG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIHNob3dQb2ludE5vYnM9e2ZhbHNlfVxuICAgICAgICAgIHJlZ3Jlc3Npb25QbGFuZUNvbG9yPXtjb2xvci5wcmltYXJ5fVxuICAgICAgICAgIGtleT0nbGVhc3Qtc3F1YXJlcy14MS14Mi15J1xuICAgICAgICAgIHBvaW50cz17dGhpcy5zdGF0ZS5wb2ludHN9XG4gICAgICAgICAgb25EcmFnUG9pbnQ9e3RoaXMuX29uRHJhZ1BvaW50M31cbiAgICAgICAgICBzdHlsZT17e2Zsb2F0OiAnbGVmdCd9fSAvPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7Y2xlYXI6J2JvdGgnfX0gLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uIGtleT0nbHMzZC0yJyBzdHlsZT17e3BhZGRpbmc6IDAsIGNsZWFyOiAnYm90aCcsIG1hcmdpbkJvdHRvbTogNjB9fT5cbiAgICAgICAgPHA+XG4gICAgICAgICAgQnkgcGxheWluZyB3aXRoIHRoZSBkb3RzLCB5b3UgY2FuIHNlZSB0aGF0LCB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSB2YXJpYWJsZXMgaW52b2x2ZWQsIHRoZSB0cnVlIHJlbGF0aW9uc2hpcHMgY2FuIGJlIHZlcnkgY291bnRlcmludHVpdGl2ZS4gVGhhdCdzIHdoeSB3ZSBoYXZlIHN0YXRpc3RpY3M6IHRvIG1ha2UgdXMgdW5zdXJlIGFib3V0IHRoaW5ncy5cbiAgICAgICAgPC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICBCZWxvdywgc2VlIGlmIHlvdSBjYW4gY2hvb3NlIHRoZSBiZXRhcyB0byBtaW5pbWl6ZSB0aGUgc3VtIG9mIHNxdWFyZWQgZXJyb3JzLlxuICAgICAgICA8L3A+XG4gICAgICAgIDxwPlxuICAgICAgICAgIFRoZXJlIGFyZSBtYW55IG90aGVyIHByZWRpY3Rpb24gdGVjaG5pcXVlcyBtdWNoIG1vcmUgY29tcGxpY2F0ZWQgdGhhbiBPTFMsIGxpa2UgbG9naXN0aWMgcmVncmVzc2lvbiwgd2VpZ2h0ZWQgbGVhc3Qtc3F1YXJlcyByZWdyZXNzaW9uLCByb2J1c3QgcmVncmVzc2lvbiBhbmQgdGhlIGdyb3dpbmcgZmFtaWx5IG9mIG5vbi1wYXJhbWV0cmljIG1ldGhvZHMuIFxuICAgICAgICA8L3A+XG4gICAgICAgIHt0aGlzLl9yZW5kZXJEaWFscygpfVxuICAgICAgICA8TGVhc3RTcXVhcmVzXG4gICAgICAgICAga2V5PSdsZWFzdC1zcXVhcmVzLXgxLXktYmFzaXMnXG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIG1hcmdpbnM9e21hcmdpbnN9XG4gICAgICAgICAgYmV0YXM9e1t0aGlzLnN0YXRlLnJlZ3Jlc3Npb25CZXRhc1swXSwgdGhpcy5zdGF0ZS5yZWdyZXNzaW9uQmV0YXNbMV1dfVxuICAgICAgICAgIG1vZGU9J3BvaW50J1xuICAgICAgICAgIHhBeGlzTGFiZWw9J3gxJ1xuICAgICAgICAgIHlBeGlzTGFiZWw9J3knXG4gICAgICAgICAgc2hvd0Vycm9yU3F1YXJlcz17ZmFsc2V9XG4gICAgICAgICAgc2hvd0Vycm9yTGluZXM9e2ZhbHNlfVxuICAgICAgICAgIHNob3dSZWdyZXNzaW9uTGluPXt0cnVlfVxuICAgICAgICAgIHNob3dOb2JzPXtmYWxzZX1cbiAgICAgICAgICBwb2ludHM9e3RoaXMuc3RhdGUucG9pbnRzfVxuICAgICAgICAgIGxvY2F0aW9uQWNjZXNzb3I9e3RoaXMuX2xvY2F0aW9uQWNjZXNzb3JYMVl9XG4gICAgICAgICAgb25EcmFnTm9iPXt0aGlzLl9vbkRyYWdQb2ludFgxWX1cbiAgICAgICAgICBzdHlsZT17e2Zsb2F0OiAnbGVmdCd9fSAvPlxuICAgICAgICA8TGVhc3RTcXVhcmVzXG4gICAgICAgICAga2V5PSdsZWFzdC1zcXVhcmVzLXgyLXktYmFzaXMnXG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgIGJldGFzPXtbdGhpcy5zdGF0ZS5yZWdyZXNzaW9uQmV0YXNbMF0sIHRoaXMuc3RhdGUucmVncmVzc2lvbkJldGFzWzJdXX1cbiAgICAgICAgICBtb2RlPSdwb2ludCdcbiAgICAgICAgICBtYXJnaW5zPXttYXJnaW5zfVxuICAgICAgICAgIHhBeGlzTGFiZWw9J3gyJ1xuICAgICAgICAgIHlBeGlzTGFiZWw9JydcbiAgICAgICAgICBzaG93RXJyb3JTcXVhcmVzPXtmYWxzZX1cbiAgICAgICAgICBzaG93RXJyb3JMaW5lcz17ZmFsc2V9XG4gICAgICAgICAgc2hvd1JlZ3Jlc3Npb25MaW5lPXt0cnVlfVxuICAgICAgICAgIHNob3dOb2JzPXtmYWxzZX1cbiAgICAgICAgICBwb2ludHM9e3RoaXMuc3RhdGUucG9pbnRzfVxuICAgICAgICAgIGxvY2F0aW9uQWNjZXNzb3I9e3RoaXMuX2xvY2F0aW9uQWNjZXNzb3JYMll9XG4gICAgICAgICAgb25EcmFnTm9iPXt0aGlzLl9vbkRyYWdQb2ludFgyWX1cbiAgICAgICAgICBzdHlsZT17e2Zsb2F0OiAnbGVmdCd9fSAvPlxuICAgICAgICA8T0xTM0RcbiAgICAgICAgICBrZXk9J2xlYXN0LXNxdWFyZXMteDEteDIteSdcbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgc2hvd1BvaW50Tm9icz17ZmFsc2V9XG4gICAgICAgICAgcmVncmVzc2lvbk5vYj17dGhpcy5zdGF0ZS5yZWdyZXNzaW9uTm9ifVxuICAgICAgICAgIHJlZ3Jlc3Npb25QbGFuZUNvbG9yPXtjb2xvci5wcmltYXJ5fVxuICAgICAgICAgIGJldGFzPXt0aGlzLnN0YXRlLnJlZ3Jlc3Npb25CZXRhc31cbiAgICAgICAgICBwb2ludHM9e3RoaXMuc3RhdGUucG9pbnRzfVxuICAgICAgICAgIG9uRHJhZ1BvaW50PXt0aGlzLl9vbkRyYWdQb2ludDN9XG4gICAgICAgICAgc3R5bGU9e3tmbG9hdDogJ2xlZnQnfX0gLz5cbiAgICAgICAgPGRpdiBzdHlsZT17e2NsZWFyOidib3RoJ319IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTGVhc3RTcXVhcmVzM0RNb2R1bGUiLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKVxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxudmFyIFB1cmVSZW5kZXJNaXhpbiA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW4nKVxuXG52YXIgTWFzb25pY1NxdWFyZXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl0sXG4gIHNlbCgpIHsgcmV0dXJuIGQzLnNlbGVjdCh0aGlzLmdldERPTU5vZGUoKSkgfSxcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZUFjY2Vzc29yOiBkID0+IGQudmFsdWUsXG4gICAgICBjb2xvckFjY2Vzc29yOiBkID0+IGQuY29sb3IsXG4gICAgfVxuICB9LFxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIHt9KVxuICB9LFxuICBfdXBkYXRlU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgdmFyIHByb3BzID0gdGhpcy5wcm9wc1xuICAgIHZhciBtYXNvbmljID0gZDMubWFzb25pYygpXG4gICAgICAud2lkdGgoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC53aWR0aCB9KVxuICAgICAgLmhlaWdodChmdW5jdGlvbihkKSB7IHJldHVybiBkLmhlaWdodCB9KVxuICAgICAgLmNvbHVtbldpZHRoKDEpXG4gICAgICAub3V0ZXJXaWR0aChwcm9wcy53aWR0aClcbiAgICAgIC5yZXNldCgpXG4gICAgc3RhdGUud3JhcHBlZERhdGEgPSBwcm9wcy5kYXRhLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICB2YXIgd2lkdGggPSBNYXRoLnNxcnQocHJvcHMudmFsdWVBY2Nlc3NvcihkKSkgKiA0XG4gICAgICB2YXIgbmQgPSBtYXNvbmljKHt3aWR0aDogd2lkdGgsIGhlaWdodDogd2lkdGh9KVxuICAgICAgbmQuaWQgPSBpXG4gICAgICBuZC5jb2xvciA9IHByb3BzLmNvbG9yQWNjZXNzb3IoZClcbiAgICAgIGRlbGV0ZSBuZC5kYXRhXG4gICAgICByZXR1cm4gbmRcbiAgICB9KVxuICAgIHJldHVybiBzdGF0ZVxuICB9LFxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKHByb3BzKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl91cGRhdGVTdGF0ZUZyb21Qcm9wcyhwcm9wcywgdGhpcy5zdGF0ZSkpXG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50KCkgeyB0aGlzLl9yZWRyYXcoKSB9LFxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMuX3JlZHJhdygpIH0sXG4gIF9yZWRyYXcoKSB7XG4gICAgdmFyIHJlY3RzID0gdGhpcy5zZWwoKS5zZWxlY3RBbGwoJ3JlY3QnKS5kYXRhKHRoaXMuc3RhdGUud3JhcHBlZERhdGEpXG4gICAgcmVjdHMuZW50ZXIoKS5hcHBlbmQoJ3JlY3QnKVxuICAgIHJlY3RzLmV4aXQoKS5yZW1vdmUoKVxuICAgIHJlY3RzXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZWFzZSgnY3ViaWMtb3V0JylcbiAgICAgIC5zdHlsZSgnZmlsbCcsIGQgPT4gZC5jb2xvcilcbiAgICAgIC5hdHRyKHtcbiAgICAgICAgeDogZCA9PiBkLngsXG4gICAgICAgIHk6IGQgPT4gZC55LFxuICAgICAgICB3aWR0aDogZCA9PiBkLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IGQgPT4gZC5oZWlnaHQsXG4gICAgICB9KVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgdmFyIHt3aWR0aCwgaGVpZ2h0LCBzdHlsZX0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIDxzdmcgey4uLnt3aWR0aCwgaGVpZ2h0LCBzdHlsZX19IC8+XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTWFzb25pY1NxdWFyZXMiLCIndXNlIHN0cmljdCdcblxuLy8gVGhpcmQgcGFydHkuXG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbnZhciBUSFJFRSA9IHJlcXVpcmUoJ3RocmVlJylcbmFzc2VydChUSFJFRS5PcmJpdENvbnRyb2xzLCAnVEhSRUUuT3JiaXRDb250cm9scyBub3QgeWV0IHNldCcpO1xudmFyIGQzID0gcmVxdWlyZSgnZDMnKVxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxuLy8gTG9jYWwuXG52YXIgY29sb3IgPSByZXF1aXJlKCdjb2xvcicpXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcbnZhciBidWlsZE5vYnMgPSByZXF1aXJlKCcuL2J1aWxkTm9icycpXG5cbnZhciBPTFMzRCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgc2VsKCkgeyByZXR1cm4gZDMuc2VsZWN0KHRoaXMuZ2V0RE9NTm9kZSgpKSB9LFxuICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoOiA1MDAsXG4gICAgICBoZWlnaHQ6IDQwMCxcbiAgICAgIGVycm9yU3F1YXJlQ29sb3I6IGNvbG9yLnByaW1hcnksXG4gICAgICByZWdyZXNzaW9uUGxhbmVDb2xvcjogY29sb3Iuc2Vjb25kYXJ5LFxuICAgICAgcG9pbnRTaXplOiAwLjAxNSxcbiAgICAgIHZhbHVlQWNjZXNzb3I6IGQgPT4gZC52YWx1ZSxcbiAgICAgIGNvbG9yQWNjZXNzb3I6IGQgPT4gZC5jb2xvcixcbiAgICAgIGxvY2F0aW9uQWNjZXNzb3I6IGQgPT4gZC5wb2ludCxcbiAgICAgIG9uRHJhZ1BvaW50OiAoKSA9PiB1bmRlZmluZWQsXG4gICAgICByZWdyZXNzaW9uTm9iOiBudWxsLFxuICAgICAgc2hvd1BvaW50Tm9iczogdHJ1ZSxcbiAgICAgIGJldGFzOiBudWxsLFxuICAgIH1cbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHZhciBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpXG4gICAgdmFyIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2FscGhhOiB0cnVlLCBhbnRpYWxpYXM6IHRydWV9KVxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIGJldGFzOiBbMCwgMCwgMF0sXG4gICAgICBzY2VuZTogc2NlbmUsXG4gICAgICByZW5kZXJlcjogcmVuZGVyZXIsXG4gICAgICBtYXRlcmlhbHM6IHt9LFxuICAgICAgZ2VvbWV0cmllczoge30sXG4gICAgICBvYmplY3RzOiB7fSxcbiAgICAgIHhTY2FsZTogZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFswLCAxMDBdKS5yYW5nZShbLTAuNSwgMC41XSksXG4gICAgICB5U2NhbGU6IGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihbMCwgMTAwXSkucmFuZ2UoWy0wLjUsIDAuNV0pLFxuICAgICAgelNjYWxlOiBkMy5zY2FsZS5saW5lYXIoKS5kb21haW4oWzAsIDEwMF0pLnJhbmdlKFstMC41LCAwLjVdKSxcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVByb3BzKHRoaXMucHJvcHMsIHN0YXRlKVxuICB9LFxuICBfdXBkYXRlU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCB0aGlzLnN0YXRlXG4gICAgc3RhdGUucmVuZGVyZXIuc2V0U2l6ZShwcm9wcy53aWR0aCwgcHJvcHMuaGVpZ2h0KVxuICAgIHN0YXRlLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8pXG4gICAgdmFyIFggPSBwcm9wcy5wb2ludHMubWFwKGQgPT4gW2QucG9pbnRbMF0sIGQucG9pbnRbMl0gXSlcbiAgICB2YXIgeSA9IHByb3BzLnBvaW50cy5tYXAoZCA9PiBkLnBvaW50WzFdKVxuICAgIHN0YXRlLmJldGFzID0gcHJvcHMuYmV0YXMgfHwgdXRpbHMuaGVzc2lhbih5LCBYKVxuICAgIHRoaXMuX3VwZGF0ZU5vYkRhdGEocHJvcHMsIHN0YXRlKVxuICAgIHJldHVybiBzdGF0ZVxuICB9LFxuICAvKipcbiAgICAqIGhlbHBlcnNcbiAgICAqL1xuICBfbW91c2VUb0RldmljZShtb3VzZSkge1xuICAgIC8vIGNhbGN1bGF0ZSBtb3VzZSBwb3NpdGlvbiBpbiBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlc1xuICAgIC8vICgtMSB0byArMSkgZm9yIGJvdGggY29tcG9uZW50c1xuICAgIHZhciBkZXZpY2UgPSBbXVxuICAgIGRldmljZVswXSA9IChtb3VzZVswXSAvIHRoaXMucHJvcHMud2lkdGgpICogMiAtIDFcbiAgICBkZXZpY2VbMV0gPSAtKG1vdXNlWzFdIC8gdGhpcy5wcm9wcy5oZWlnaHQpICogMiArIDFcbiAgICByZXR1cm4gZGV2aWNlXG4gIH0sXG4gIF9kZXZpY2VUb01vdXNlKGRldmljZSkge1xuICAgIHZhciBtb3VzZSA9IFtdXG4gICAgbW91c2VbMF0gPSAoZGV2aWNlWzBdICsgMSkgLyAyICogdGhpcy5wcm9wcy53aWR0aFxuICAgIG1vdXNlWzFdID0gLShkZXZpY2VbMV0gLSAxKSAvIDIgKiB0aGlzLnByb3BzLmhlaWdodFxuICAgIHJldHVybiBtb3VzZVxuICB9LFxuICBfZ2V0UHJlZGljdGlvbih4MSwgeDIpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlXG4gICAgcmV0dXJuIHN0YXRlLmJldGFzWzBdICsgc3RhdGUuYmV0YXNbMV0gKiB4MSArIHN0YXRlLmJldGFzWzJdICogeDJcbiAgfSxcbiAgLyoqXG4gICAgKiBSZWFjdCBMaWZlY3ljbGUgaG9va3NcbiAgICAqL1xuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICB2YXIgcHJvcHMgPSB0aGlzLnByb3BzLCBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpXG4gICAgdmFyIHJhdGlvID0gcHJvcHMud2lkdGggLyBwcm9wcy5oZWlnaHRcbiAgICB2YXIgY2FudmFzID0gZDMuc2VsZWN0KHN0YXRlLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG5cbiAgICB0aGlzLnNlbCgpLm5vZGUoKS5hcHBlbmRDaGlsZChjYW52YXMubm9kZSgpKVxuXG4gICAgY2FudmFzLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93bilcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpXG4gICAgICAub24oJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXApXG4gICAgICAuc3R5bGUoe3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAnMHB4JywgdG9wOiAnMHB4J30pXG5cbiAgICB2YXIgb3ZlcmxheSA9IHRoaXMuc2VsKCkuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoe3dpZHRoOiBwcm9wcy53aWR0aCwgaGVpZ2h0OiBwcm9wcy5oZWlnaHR9KVxuICAgICAgLnN0eWxlKHtwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogJzBweCcsIHRvcDogJzBweCd9KVxuICAgICAgLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdub25lJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdvdmVybGF5JylcblxuICAgIHZhciBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNzUsIHJhdGlvLCAwLjEsIDEwMDApXG4gICAgY2FtZXJhLnNldExlbnMoNTApXG4gICAgc3RhdGUub2JqZWN0cy5jYW1lcmEgPSBjYW1lcmFcblxuICAgIHZhciBjYW1lcmFQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAzLjMpXG4gICAgY2FtZXJhUG9zLmFwcGx5QXhpc0FuZ2xlKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCAwKVxuICAgIHN0YXRlLm9iamVjdHMuY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKVxuICAgIHN0YXRlLm9iamVjdHMuY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSlcblxuICAgIHZhciBjb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKGNhbWVyYSwgc3RhdGUucmVuZGVyZXIuZG9tRWxlbWVudClcbiAgICBjb250cm9scy5ub1pvb20gPSB0cnVlXG4gICAgY29udHJvbHMubm9QYW4gPSB0cnVlXG4gICAgY29udHJvbHMuYXV0b1JvdGF0ZVNwZWVkID0gMS4wXG4gICAgY29udHJvbHMuYXV0b1JvdGF0ZSA9IHRydWVcblxuICAgIHN0YXRlLm9iamVjdHMuY29udHJvbHMgPSBjb250cm9sc1xuICAgIGNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5fdXBkYXRlTm9iRGF0YShwcm9wcywgc2VsZi5zdGF0ZSlcbiAgICAgIHNlbGYuX3VwZGF0ZU5vYnMoKVxuICAgIH0pXG5cbiAgICB2YXIgaW50ZXJzZWN0UGxhbmUgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEwLCAxMCwgOCwgOCksXG4gICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHgwMDAwMDAsXG4gICAgICAgIG9wYWNpdHk6IDAuMjUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlXG4gICAgICB9KVxuICAgIClcbiAgICBpbnRlcnNlY3RQbGFuZS52aXNpYmxlID0gZmFsc2VcbiAgICBzdGF0ZS5zY2VuZS5hZGQoaW50ZXJzZWN0UGxhbmUpXG4gICAgc3RhdGUub2JqZWN0cy5pbnRlcnNlY3RQbGFuZSA9IGludGVyc2VjdFBsYW5lXG5cbiAgICBzdGF0ZS5vYmplY3RzLnJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKVxuXG4gICAgdGhpcy5fc2V0dXBHcmlkKHN0YXRlKVxuICAgIHRoaXMuX3NldHVwR3JpZExhYmVscyhzdGF0ZSlcblxuICAgIHN0YXRlLm9iamVjdHMucG9pbnRHcm91cCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpXG4gICAgc3RhdGUuc2NlbmUuYWRkKHN0YXRlLm9iamVjdHMucG9pbnRHcm91cClcblxuICAgIHN0YXRlLmdlb21ldHJpZXMucG9pbnQgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkocHJvcHMucG9pbnRTaXplLCAzMiwgMzIpXG5cbiAgICB0aGlzLl9zZXR1cFJlZ3Jlc3Npb25QbGFuZShzdGF0ZSlcbiAgICB0aGlzLl9zZXR1cEVycm9yTGluZXMoc3RhdGUpXG4gICAgdGhpcy5fc2V0dXBFcnJvclNxdWFyZXMoc3RhdGUpXG5cbiAgICB0aGlzLl91cGRhdGVOb2JEYXRhKHByb3BzLCBzdGF0ZSlcbiAgICBidWlsZE5vYnMob3ZlcmxheSwgc3RhdGUucG9pbnROb2JEYXRhLCAncG9pbnQtbm9icycpXG4gICAgICAuY2FsbChkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgLm9uKCdkcmFnc3RhcnQnLCB0aGlzLl9vbkRyYWdTdGFydClcbiAgICAgICAgLm9uKCdkcmFnJywgdGhpcy5fb25EcmFnKVxuICAgICAgICAub24oJ2RyYWdlbmQnLCB0aGlzLl9vbkRyYWdFbmQpXG4gICAgICApLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdhdXRvJylcblxuICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpIC8vIE5lZWRzIHRvIGNvbWUgZmlyc3QuXG4gICAgdGhpcy5fdXBkYXRlU2NlbmUoKVxuICAgIHRoaXMuX3JlbmRlclNjZW5lKClcbiAgICB0aGlzLl91cGRhdGVOb2JEYXRhKHByb3BzLCBzZWxmLnN0YXRlKVxuICAgIHRoaXMuX3VwZGF0ZU5vYnMoKVxuXG4gICAgdmFyIHByZXZfdCA9IDAsIGR0LCByb3RZID0gTWF0aC5QSSAvIDhcbiAgICBkMy50aW1lcigodCkgPT4ge1xuICAgICAgZHQgPSB0IC0gcHJldl90LCBwcmV2X3QgPSB0XG4gICAgICBcbiAgICAgIC8vIHJvdFkgKz0gTWF0aC5QSSAqIGR0IC8gMjAwMDBcblxuICAgICAgLy8gdmFyIGNhbWVyYVBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAsIDMuMylcbiAgICAgIC8vIGNhbWVyYVBvcy5hcHBseUF4aXNBbmdsZShuZXcgVEhSRUUuVmVjdG9yMygwLCAxLCAwKSwgcm90WSlcbiAgICAgIC8vIGNhbWVyYVBvcy55ID0gMC41XG4gICAgICAvLyBzdGF0ZS5vYmplY3RzLmNhbWVyYS5wb3NpdGlvbi5jb3B5KGNhbWVyYVBvcylcbiAgICAgIC8vIHN0YXRlLm9iamVjdHMuY2FtZXJhLmxvb2tBdChuZXcgVEhSRUUuVmVjdG9yMygwLCAwLCAwKSlcbiAgICAgIFxuICAgICAgc2VsZi5fcmVuZGVyU2NlbmUoKVxuICAgIH0pXG4gIH0sXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICB0aGlzLnNldFN0YXRlKHRoaXMuX3VwZGF0ZVN0YXRlRnJvbVByb3BzKG5ld1Byb3BzKSlcbiAgfSxcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5ld1Byb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAvLyBTaW1wbGUgZGlydHkgY2hlY2tpbmcuIFJlcXVpcmVzIGNvcHkgdG8gZm9yY2UgcmVkcmF3LlxuICAgIHZhciBzaG91bGQgPSAhIShuZXdQcm9wcy5wb2ludHMgIT09IHRoaXMucHJvcHMucG9pbnRzXG4gICAgICB8fCAobmV3UHJvcHMuYmV0YXMgJiYgbmV3UHJvcHMuYmV0YXMgIT09IHRoaXMucHJvcHMuYmV0YXMpKVxuICAgIHJldHVybiBzaG91bGRcbiAgfSxcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3VwZGF0ZVNjZW5lKClcbiAgICB0aGlzLl9yZW5kZXJTY2VuZSgpXG4gIH0sXG4gIC8qKlxuICAgICogLS0tLS0tLSBTRVRVUCAtLS0tLS0tLVxuICAgICovXG4gIF9zZXR1cEdyaWQoc3RhdGUpIHtcbiAgICB2YXIgc2l6ZSA9IDAuNSwgc3RlcCA9IDAuMVxuICAgIHZhciBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoc2l6ZSwgc3RlcClcbiAgICB2YXIgY29sb3JDZW50ZXJMaW5lID0gMHgwMDAwMDAsIGNvbG9yR3JpZCA9IDB4ZjZmNmY2LCBvcGFjaXR5ID0gMVxuICAgIC8vIGdyaWRIZWxwZXIucm90YXRpb24ueCA9IE1hdGguUEkgLyAyXG4gICAgZ3JpZEhlbHBlci5wb3NpdGlvbi55ID0gLTAuNVxuICAgIGdyaWRIZWxwZXIuc2V0Q29sb3JzKGNvbG9yQ2VudGVyTGluZSwgY29sb3JHcmlkKVxuICAgIGdyaWRIZWxwZXIubWF0ZXJpYWwub3BhY2l0eSA9IG9wYWNpdHlcbiAgICBzdGF0ZS5zY2VuZS5hZGQoZ3JpZEhlbHBlcilcbiAgICBzdGF0ZS5vYmplY3RzLmdyaWRIZWxwZXJYID0gZ3JpZEhlbHBlclxuXG4gICAgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKHNpemUsIHN0ZXApXG4gICAgZ3JpZEhlbHBlci5wb3NpdGlvbi54ID0gLTAuNVxuICAgIGdyaWRIZWxwZXIucm90YXRpb24ueiA9IE1hdGguUEkgLyAyXG4gICAgZ3JpZEhlbHBlci5zZXRDb2xvcnMoY29sb3JDZW50ZXJMaW5lLCBjb2xvckdyaWQpXG4gICAgZ3JpZEhlbHBlci5tYXRlcmlhbC5vcGFjaXR5ID0gb3BhY2l0eVxuICAgIHN0YXRlLnNjZW5lLmFkZChncmlkSGVscGVyKVxuICAgIHN0YXRlLm9iamVjdHMuZ3JpZEhlbHBlclkgPSBncmlkSGVscGVyXG5cbiAgICBncmlkSGVscGVyID0gbmV3IFRIUkVFLkdyaWRIZWxwZXIoc2l6ZSwgc3RlcClcbiAgICBncmlkSGVscGVyLnBvc2l0aW9uLnogPSAtMC41XG4gICAgZ3JpZEhlbHBlci5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDJcbiAgICBncmlkSGVscGVyLnNldENvbG9ycyhjb2xvckNlbnRlckxpbmUsIGNvbG9yR3JpZClcbiAgICBncmlkSGVscGVyLm1hdGVyaWFsLm9wYWNpdHkgPSBvcGFjaXR5XG4gICAgc3RhdGUuc2NlbmUuYWRkKGdyaWRIZWxwZXIpXG4gICAgc3RhdGUub2JqZWN0cy5ncmlkSGVscGVyWiA9IGdyaWRIZWxwZXJcbiAgfSxcbiAgX3NldHVwR3JpZExhYmVscyhzdGF0ZSkge1xuICAgIHZhciBncm91cCA9IG5ldyBUSFJFRS5PYmplY3QzRFxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNwcml0ZUxhYmVsKHgsIHksIHosIHRleHQpIHtcbiAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgdmFyIHcgPSAyNTYsIGggPSAyNTZcbiAgICAgIGNhbnZhcy53aWR0aCA9IHcsIGNhbnZhcy5oZWlnaHQgPSBoXG4gICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLDAsMCwxKSdcbiAgICAgIGN0eC5mb250ID0gXCIxMDAgMzBweCBMYXRvLCBzYW5zLXNlcmlmXCJcbiAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHcgLyAyLCBoIC8gMiArIDIyKVxuICAgICAgdmFyIHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShjYW52YXMpXG4gICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLlNwcml0ZU1hdGVyaWFsKHttYXA6IHRleHR1cmUsIGNvbG9yOiAweGZmZmZmZn0pXG4gICAgICB2YXIgc3ByaXRlID0gbmV3IFRIUkVFLlNwcml0ZShtYXRlcmlhbClcbiAgICAgIHNwcml0ZS5zY2FsZS5zZXQoMC41LCAwLjUsIDEpXG4gICAgICBzcHJpdGUucG9zaXRpb24ueCA9IHhcbiAgICAgIHNwcml0ZS5wb3NpdGlvbi55ID0geVxuICAgICAgc3ByaXRlLnBvc2l0aW9uLnogPSB6XG4gICAgICByZXR1cm4gc3ByaXRlXG4gICAgfVxuICAgIGQzLnJhbmdlKDYpLm1hcChpID0+IHtcbiAgICAgIHZhciB2YWwgPSBpICogMjBcbiAgICAgIHZhciB4ID0gc3RhdGUueFNjYWxlKHZhbClcbiAgICAgIHZhciB5ID0gc3RhdGUueVNjYWxlKDApIC0gMC4wNVxuICAgICAgdmFyIHogPSBzdGF0ZS56U2NhbGUoMCkgLSAwLjA1XG4gICAgICBncm91cC5hZGQoY3JlYXRlU3ByaXRlTGFiZWwoeCwgeSwgeiwgdmFsKSlcbiAgICB9KVxuICAgIGQzLnJhbmdlKDUpLm1hcChpID0+IHtcbiAgICAgIHZhciB2YWwgPSBpICogMjAgKyAyMFxuICAgICAgdmFyIHggPSBzdGF0ZS54U2NhbGUoMCkgLSAwLjA1XG4gICAgICB2YXIgeSA9IHN0YXRlLnlTY2FsZSgwKSAtIDAuMDVcbiAgICAgIHZhciB6ID0gc3RhdGUuelNjYWxlKHZhbClcbiAgICAgIGdyb3VwLmFkZChjcmVhdGVTcHJpdGVMYWJlbCh4LCB5LCB6LCB2YWwpKVxuICAgIH0pXG4gICAgZDMucmFuZ2UoNSkubWFwKGkgPT4ge1xuICAgICAgdmFyIHZhbCA9IGkgKiAyMCArIDIwXG4gICAgICB2YXIgeCA9IHN0YXRlLnhTY2FsZSgwKSAtIDAuMDVcbiAgICAgIHZhciB5ID0gc3RhdGUueVNjYWxlKHZhbClcbiAgICAgIHZhciB6ID0gc3RhdGUuelNjYWxlKDApIC0gMC4wNVxuICAgICAgZ3JvdXAuYWRkKGNyZWF0ZVNwcml0ZUxhYmVsKHgsIHksIHosIHZhbCkpXG4gICAgfSlcbiAgICBzdGF0ZS5vYmplY3RzLmdyaWRMYWJlbEdyb3VwID0gZ3JvdXBcbiAgICBzdGF0ZS5zY2VuZS5hZGQoZ3JvdXApXG4gIH0sXG4gIF9zZXR1cFJlZ3Jlc3Npb25QbGFuZShzdGF0ZSkge1xuICAgIHZhciBnZW9tID0gc3RhdGUuZ2VvbWV0cmllcy5wbGFuZSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpXG4gICAgZ2VvbS5keW5hbWljID0gdHJ1ZVxuICAgIFxuICAgIGdlb20udmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtMC41LCAwLCAtMC41KSlcbiAgICBnZW9tLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoIDAuNSwgMCwgLTAuNSkpXG4gICAgZ2VvbS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKCAwLjUsIDAsICAwLjUpKVxuICAgIGdlb20udmVydGljZXMucHVzaChuZXcgVEhSRUUuVmVjdG9yMygtMC41LCAwLCAgMC41KSlcblxuICAgIGdlb20uZmFjZXMucHVzaChuZXcgVEhSRUUuRmFjZTMoMCwgMSwgMikpXG4gICAgZ2VvbS5mYWNlcy5wdXNoKG5ldyBUSFJFRS5GYWNlMygyLCAzLCAwKSlcbiAgICBcbiAgICB2YXIgbWF0ID0gc3RhdGUubWF0ZXJpYWxzLnBsYW5lID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IodGhpcy5wcm9wcy5yZWdyZXNzaW9uUGxhbmVDb2xvcikuZ2V0SGV4KCksXG4gICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBkZXB0aFRlc3Q6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjJcbiAgICB9KVxuICAgIHN0YXRlLnNjZW5lLmFkZChzdGF0ZS5vYmplY3RzLnBsYW5lID0gbmV3IFRIUkVFLk1lc2goZ2VvbSwgbWF0KSlcbiAgfSxcbiAgX3NldHVwRXJyb3JMaW5lcyhzdGF0ZSkge1xuICAgIHZhciB7bWF0ZXJpYWxzLCBnZW9tZXRyaWVzfSA9IHN0YXRlXG4gICAgdmFyIG1hdCA9IHN0YXRlLm1hdGVyaWFscy5lcnJvckxpbmVzID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmMDAwMFxuICAgIH0pXG4gICAgLy8gdmFyIG1hdCA9IHN0YXRlLm1hdGVyaWFscy5lcnJvckxpbmVzID0gbmV3IFRIUkVFLkxpbmVEYXNoZWRNYXRlcmlhbCh7XG4gICAgLy8gICBjb2xvcjogMHhmZjAwMDAsXG4gICAgLy8gICBkYXNoU2l6ZTogMC4wMSxcbiAgICAvLyAgIGdhcFNpemU6IDAuMDEsXG4gICAgLy8gICBsaW5ld2lkdGg6IDJcbiAgICAvLyB9KVxuICAgIHZhciBnZW9tID0gc3RhdGUuZ2VvbWV0cmllcy5lcnJvckxpbmVzID0gbmV3IFRIUkVFLkdlb21ldHJ5KClcbiAgICBnZW9tLmR5bmFtaWMgPSB0cnVlXG4gICAgc3RhdGUub2JqZWN0cy5lcnJvckxpbmVzID0gbmV3IFRIUkVFLkxpbmUoZ2VvbSwgbWF0LCBUSFJFRS5MaW5lUGllY2VzKVxuICAgIHN0YXRlLnNjZW5lLmFkZChzdGF0ZS5vYmplY3RzLmVycm9yTGluZXMpXG4gIH0sXG4gIF9zZXR1cEVycm9yU3F1YXJlczogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICBzdGF0ZS5vYmplY3RzLmVycm9yU3F1YXJlc0dyb3VwID0gbmV3IFRIUkVFLk9iamVjdDNEKClcbiAgICBzdGF0ZS5zY2VuZS5hZGQoc3RhdGUub2JqZWN0cy5lcnJvclNxdWFyZXNHcm91cClcbiAgfSxcblxuICAvKipcbiAgICAqIC0tLS0tLS0gVVBEQVRFIC0tLS0tLS0tLVxuICAgICovXG5cbiAgX3VwZGF0ZVBvaW50czogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBvaW50cyA9IHRoaXMucHJvcHMucG9pbnRzLCBzdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICB2YXIgZ3JvdXAgPSBzdGF0ZS5vYmplY3RzLnBvaW50R3JvdXBcblxuICAgIGdyb3VwLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obWVzaCkge1xuICAgICAgZ3JvdXAucmVtb3ZlKG1lc2gpXG4gICAgICBtZXNoLm1hdGVyaWFsLmRpc3Bvc2UoKVxuICAgIH0pXG5cbiAgICBwb2ludHMuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgICB2YXIgbWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IG5ldyBUSFJFRS5Db2xvcih0aGlzLnByb3BzLmNvbG9yQWNjZXNzb3IoZCkpLmdldEhleCgpXG4gICAgICB9KVxuICAgICAgdmFyIHNwaGVyZSA9IG5ldyBUSFJFRS5NZXNoKHRoaXMuc3RhdGUuZ2VvbWV0cmllcy5wb2ludCwgbWF0KVxuICAgICAgc3BoZXJlLnBvc2l0aW9uLnggPSBzdGF0ZS54U2NhbGUoZC5wb2ludFswXSlcbiAgICAgIHNwaGVyZS5wb3NpdGlvbi55ID0gc3RhdGUueVNjYWxlKGQucG9pbnRbMV0pXG4gICAgICBzcGhlcmUucG9zaXRpb24ueiA9IHN0YXRlLnpTY2FsZShkLnBvaW50WzJdKVxuICAgICAgc3BoZXJlLnVzZXJEYXRhID0gZFxuICAgICAgZ3JvdXAuYWRkKHNwaGVyZSlcbiAgICB9LCB0aGlzKVxuICB9LFxuICBfdXBkYXRlTm9iczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgdGhpcy5zZWwoKS5zZWxlY3QoJy5vdmVybGF5Jykuc2VsZWN0KCcucG9pbnQtbm9icycpLnNlbGVjdEFsbCgnLm5vYicpXG4gICAgICAuZGF0YSh0aGlzLnN0YXRlLnBvaW50Tm9iRGF0YSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBzZWxmLl9kZXZpY2VUb01vdXNlKGQucG9zKSArICcpJ1xuICAgICAgfSlcbiAgfSxcbiAgX3VwZGF0ZUVycm9yTGluZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGUsIGdlb20gPSBzdGF0ZS5nZW9tZXRyaWVzLmVycm9yTGluZXNcbiAgICBnZW9tLnZlcnRpY2VzLnNwbGljZSgwLCBnZW9tLnZlcnRpY2VzLmxlbmd0aCkgLy8gZW1wdHlcbiAgICB0aGlzLnByb3BzLnBvaW50cy5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgIHZhciB4ID0gc3RhdGUueFNjYWxlKGQucG9pbnRbMF0pXG4gICAgICB2YXIgeSA9IHN0YXRlLnlTY2FsZShkLnBvaW50WzFdKVxuICAgICAgdmFyIHogPSBzdGF0ZS56U2NhbGUoZC5wb2ludFsyXSlcbiAgICAgIHZhciBweSA9IHN0YXRlLnlTY2FsZSh0aGlzLl9nZXRQcmVkaWN0aW9uKGQucG9pbnRbMF0sIGQucG9pbnRbMl0pKVxuICAgICAgZ2VvbS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHgsIHksIHopKVxuICAgICAgZ2VvbS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHgsIHB5LCB6KSlcbiAgICB9LCB0aGlzKVxuICAgIGdlb20udmVydGljZXNOZWVkVXBkYXRlID0gdHJ1ZVxuICAgIGdlb20uY29tcHV0ZUxpbmVEaXN0YW5jZXMoKVxuICB9LFxuICBfdXBkYXRlRXJyb3JTcXVhcmVzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlXG4gICAgdmFyIGdyb3VwID0gc3RhdGUub2JqZWN0cy5lcnJvclNxdWFyZXNHcm91cFxuICAgIGdyb3VwLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24obWVzaCkge1xuICAgICAgZ3JvdXAucmVtb3ZlKG1lc2gpXG4gICAgICBtZXNoLmdlb21ldHJ5LmRpc3Bvc2UoKVxuICAgICAgbWVzaC5tYXRlcmlhbC5kaXNwb3NlKClcbiAgICB9KVxuICAgIHRoaXMucHJvcHMucG9pbnRzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgdmFyIGdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKVxuICAgICAgdmFyIG1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IodGhpcy5wcm9wcy5jb2xvckFjY2Vzc29yKGQpKS5nZXRIZXgoKSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgdHJhc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgZGVwdGhUZXN0OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjgsXG4gICAgICB9KVxuXG4gICAgICB2YXIgeCA9IHN0YXRlLnhTY2FsZShkLnBvaW50WzBdKVxuICAgICAgdmFyIHkgPSBzdGF0ZS55U2NhbGUoZC5wb2ludFsxXSlcbiAgICAgIHZhciB6ID0gc3RhdGUuelNjYWxlKGQucG9pbnRbMl0pXG4gICAgICB2YXIgcHkgPSBzdGF0ZS55U2NhbGUodGhpcy5fZ2V0UHJlZGljdGlvbihkLnBvaW50WzBdLCBkLnBvaW50WzJdKSlcbiAgICAgIHZhciBzID0gTWF0aC5hYnMocHkgLSB5KVxuICAgICAgXG4gICAgICBnZW9tLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoeCwgeSwgeikpXG4gICAgICBnZW9tLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoeCwgcHksIHopKVxuICAgICAgZ2VvbS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHggKyBzLCBweSwgeikpXG4gICAgICBnZW9tLnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoeCArIHMsIHksIHopKVxuICAgICAgXG4gICAgICBnZW9tLmZhY2VzLnB1c2gobmV3IFRIUkVFLkZhY2UzKDAsIDEsIDIpKVxuICAgICAgZ2VvbS5mYWNlcy5wdXNoKG5ldyBUSFJFRS5GYWNlMygwLCAyLCAzKSlcblxuICAgICAgLy8gZ2VvbS52ZXJ0aWNlc05lZWRVcGRhdGUgPSB0cnVlXG4gICAgICBncm91cC5hZGQobmV3IFRIUkVFLk1lc2goZ2VvbSwgbWF0KSlcbiAgICB9LCB0aGlzKVxuICB9LFxuICBfdXBkYXRlUmVncmVzc2lvblBsYW5lOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSB0aGlzLnN0YXRlXG4gICAgdmFyIHZlcnRzID0gc3RhdGUuZ2VvbWV0cmllcy5wbGFuZS52ZXJ0aWNlc1xuICAgIHZhciBCID0gc3RhdGUuYmV0YXNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgdmVydHNbaV0ueSA9IHN0YXRlLnlTY2FsZShcbiAgICAgICAgICBCWzBdXG4gICAgICAgICsgQlsxXSAqIHN0YXRlLnhTY2FsZS5pbnZlcnQodmVydHNbaV0ueClcbiAgICAgICAgKyBCWzJdICogc3RhdGUuelNjYWxlLmludmVydCh2ZXJ0c1tpXS56KVxuICAgICAgKVxuICAgIH1cbiAgICB0aGlzLnN0YXRlLmdlb21ldHJpZXMucGxhbmUudmVydGljZXNOZWVkVXBkYXRlID0gdHJ1ZVxuICB9LFxuICBfdXBkYXRlU2NlbmU6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3VwZGF0ZVBvaW50cygpXG4gICAgdGhpcy5fdXBkYXRlTm9icygpXG4gICAgdGhpcy5fdXBkYXRlRXJyb3JMaW5lcygpXG4gICAgdGhpcy5fdXBkYXRlRXJyb3JTcXVhcmVzKClcbiAgICB0aGlzLl91cGRhdGVSZWdyZXNzaW9uUGxhbmUoKVxuICB9LFxuICBfdXBkYXRlTm9iRGF0YTogZnVuY3Rpb24ocHJvcHMsIHN0YXRlKSB7XG4gICAgdmFyIGNhbWVyYSA9IHN0YXRlLm9iamVjdHMuY2FtZXJhXG4gICAgaWYgKGNhbWVyYSAmJiBwcm9wcy5zaG93UG9pbnROb2JzKSB7XG4gICAgICBzdGF0ZS5wb2ludE5vYkRhdGEgPSBwcm9wcy5wb2ludHMubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgdmFyIHBvaW50ID0gW1xuICAgICAgICAgIHN0YXRlLnhTY2FsZShkLnBvaW50WzBdKSxcbiAgICAgICAgICBzdGF0ZS55U2NhbGUoZC5wb2ludFsxXSksXG4gICAgICAgICAgc3RhdGUuelNjYWxlKGQucG9pbnRbMl0pXG4gICAgICAgIF1cbiAgICAgICAgdmFyIHBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCkuZnJvbUFycmF5KHBvaW50KS5wcm9qZWN0KGNhbWVyYSlcbiAgICAgICAgICAudG9BcnJheSgpLnNsaWNlKDAsIDIpXG4gICAgICAgIHJldHVybiB7cG9zOiBwb3MsIGRhdHVtOiBkfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucG9pbnROb2JEYXRhID0gW11cbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgICogLS0tLS0tLSBFVkVOVCBMSVNURU5FUlMgLS0tLS0tLVxuICAgICovXG4gIF9vbkRyYWdTdGFydDogZnVuY3Rpb24oZCwgaSkge1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGVcbiAgICB2YXIgaW50ZXJzZWN0UGxhbmUgPSBzdGF0ZS5vYmplY3RzLmludGVyc2VjdFBsYW5lXG4gICAgdmFyIG1vdXNlID0gdGhpcy5fbW91c2VUb0RldmljZShkMy5tb3VzZSh0aGlzLnNlbCgpLm5vZGUoKSkpXG4gICAgdmFyIGNhbWVyYSA9IHRoaXMuc3RhdGUub2JqZWN0cy5jYW1lcmFcbiAgICBzdGF0ZS5vYmplY3RzLmNvbnRyb2xzLmVuYWJsZWQgPSBmYWxzZVxuICAgIHN0YXRlLm9iamVjdHMuY29udHJvbHMuYXV0b1JvdGF0ZSA9IGZhbHNlXG4gICAgaW50ZXJzZWN0UGxhbmUucG9zaXRpb24uZnJvbUFycmF5KFtcbiAgICAgIHN0YXRlLnhTY2FsZShkLmRhdHVtLnBvaW50WzBdKSxcbiAgICAgIHN0YXRlLnlTY2FsZShkLmRhdHVtLnBvaW50WzFdKSxcbiAgICAgIHN0YXRlLnpTY2FsZShkLmRhdHVtLnBvaW50WzJdKVxuICAgIF0pXG4gICAgaW50ZXJzZWN0UGxhbmUubG9va0F0KGNhbWVyYS5wb3NpdGlvbilcbiAgfSxcbiAgX29uRHJhZzogZnVuY3Rpb24oZCwgaSkge1xuICAgIHZhciBpbnRlcnNlY3RQbGFuZSA9IHRoaXMuc3RhdGUub2JqZWN0cy5pbnRlcnNlY3RQbGFuZVxuICAgIHZhciBpbnRlcnNlY3RzLCBwb2ludCwgbW91c2UgPSBuZXcgVEhSRUUuVmVjdG9yMigpXG4gICAgbW91c2UuZnJvbUFycmF5KHRoaXMuX21vdXNlVG9EZXZpY2UoZDMubW91c2UodGhpcy5zZWwoKS5ub2RlKCkpKSlcbiAgICB0aGlzLnN0YXRlLm9iamVjdHMucmF5Y2FzdGVyLnNldEZyb21DYW1lcmEobW91c2UsIHRoaXMuc3RhdGUub2JqZWN0cy5jYW1lcmEpXG4gICAgaW50ZXJzZWN0cyA9IHRoaXMuc3RhdGUub2JqZWN0cy5yYXljYXN0ZXIuaW50ZXJzZWN0T2JqZWN0KGludGVyc2VjdFBsYW5lKVxuICAgIGlmICghaW50ZXJzZWN0cy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2Fybignd2FybmluZzogaW50ZXJzZWN0IHBsYW5lIG9uIGhpdCBpbiBtb3VzZSBtb3ZlJylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBuZXcgcG9pbnQgbG9jYXRpb25cbiAgICBwb2ludCA9IGludGVyc2VjdHNbMF0ucG9pbnQudG9BcnJheSgpXG4gICAgcG9pbnRbMF0gPSB0aGlzLnN0YXRlLnhTY2FsZS5pbnZlcnQocG9pbnRbMF0pXG4gICAgcG9pbnRbMV0gPSB0aGlzLnN0YXRlLnlTY2FsZS5pbnZlcnQocG9pbnRbMV0pXG4gICAgcG9pbnRbMl0gPSB0aGlzLnN0YXRlLnpTY2FsZS5pbnZlcnQocG9pbnRbMl0pXG4gICAgdGhpcy5wcm9wcy5vbkRyYWdQb2ludChwb2ludCwgZC5kYXR1bSlcbiAgfSxcbiAgX29uRHJhZ0VuZDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdGF0ZS5vYmplY3RzLmNvbnRyb2xzLmVuYWJsZWQgPSB0cnVlXG4gICAgLy8ganVzdCBzdG9wIHJvdGF0aW5nIGFmdGVyIHRoZSBmaXJzdCBpbnRlcmFjdGlvbi5cbiAgICAvLyB0aGlzLnN0YXRlLm9iamVjdHMuY29udHJvbHMuYXV0b1JvdGF0ZSA9IHRydWVcbiAgfSxcbiAgX29uTW91c2VEb3duKCkge1xuICAgICAgdGhpcy5zdGF0ZS5vYmplY3RzLmNvbnRyb2xzLmF1dG9Sb3RhdGUgPSBmYWxzZVxuICB9LFxuICBfb25Nb3VzZU1vdmUoKSB7fSxcbiAgX29uTW91c2VVcCgpIHt9LFxuICBfcmVuZGVyU2NlbmUoKSB7XG4gICAgdmFyIHN0YXRlID0gdGhpcy5zdGF0ZVxuICAgIHN0YXRlLm9iamVjdHMuY29udHJvbHMudXBkYXRlKClcbiAgICBzdGF0ZS5yZW5kZXJlci5yZW5kZXIoc3RhdGUuc2NlbmUsIHN0YXRlLm9iamVjdHMuY2FtZXJhKVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgdmFyIHN0eWxlID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB3aWR0aDogdGhpcy5wcm9wcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICB9LCB0aGlzLnByb3BzLnN0eWxlIHx8IHt9KVxuICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZX0gLz5cbiAgfSxcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gT0xTM0QiLCIndXNlIHN0cmljdCdcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKVxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxuXG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJylcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKVxudmFyIERpYWwgPSByZXF1aXJlKCcuL0RpYWwucmVhY3QnKVxudmFyIExlYXN0U3F1YXJlcyA9IHJlcXVpcmUoJy4vTGVhc3RTcXVhcmVzLnJlYWN0JylcbnZhciBNYXNvbmljU3F1YXJlcyA9IHJlcXVpcmUoJy4vTWFzb25pY1NxdWFyZXMucmVhY3QnKVxuXG52YXIgUmVncmVzc2lvbkFzTm9ic01vZHVsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0RGVmYXVsdFByb3BzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvbkRyYWdPTFNOb2I6ICgpID0+IHVuZGVmaW5lZCxcbiAgICAgIHBvaW50czogbnVsbCxcbiAgICB9XG4gIH0sXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdXBkYXRlU3RhdGVGcm9tUHJvcHModGhpcy5wcm9wcywge1xuICAgICAgYmV0YXM6IFswLCAxXSxcbiAgICB9KVxuICB9LFxuICBfdXBkYXRlU3RhdGVGcm9tUHJvcHMocHJvcHMsIHN0YXRlKSB7XG4gICAgdmFyIHtwb2ludHN9ID0gcHJvcHNcbiAgICB2YXIgZXJyb3JzID0gdXRpbHMud3JhcExlYXN0U3F1YXJlc0Vycm9ycyhwb2ludHMsIGQgPT4gZC5wb2ludCwgc3RhdGUuYmV0YXMpXG4gICAgc3RhdGUubGVhc3RTcXVhcmVzRXJyb3JzID0gZXJyb3JzXG4gICAgcmV0dXJuIHN0YXRlXG4gIH0sXG4gIF91cGRhdGVCZXRhcyhiZXRhcykge1xuICAgIHZhciB7cG9pbnRzfSA9IHRoaXMucHJvcHNcbiAgICB2YXIgZXJyb3JzID0gdXRpbHMud3JhcExlYXN0U3F1YXJlc0Vycm9ycyhwb2ludHMsIGQgPT4gZC5wb2ludCwgYmV0YXMpXG4gICAgdGhpcy5zZXRTdGF0ZSh7YmV0YXMsIGxlYXN0U3F1YXJlc0Vycm9yczogZXJyb3JzfSlcbiAgfSxcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wcykge1xuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fdXBkYXRlU3RhdGVGcm9tUHJvcHMocHJvcHMsIHRoaXMuc3RhdGUpKVxuICB9LFxuICBfb25DaGFuZ2VEaWFsVmFsdWVCMCh2YWx1ZSkge1xuICAgIHZhciBiZXRhcyA9IHRoaXMuc3RhdGUuYmV0YXNcbiAgICBiZXRhc1swXSA9IHZhbHVlXG4gICAgdGhpcy5fdXBkYXRlQmV0YXMoYmV0YXMpXG4gIH0sXG4gIF9vbkNoYW5nZURpYWxWYWx1ZUIxKHZhbHVlKSB7XG4gICAgdmFyIGJldGFzID0gdGhpcy5zdGF0ZS5iZXRhc1xuICAgIGJldGFzWzFdID0gdmFsdWVcbiAgICB0aGlzLl91cGRhdGVCZXRhcyhiZXRhcylcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHZhciBoID0gMTIwXG4gICAgcmV0dXJuIDxzZWN0aW9uIHN0eWxlPXt7cGFkZGluZzogMCwgbWFyZ2luQm90dG9tOiA0MH19PlxuICAgICAgPHN2ZyB3aWR0aD17NjIwfSBoZWlnaHQ9e2h9IHN0eWxlPXtzdHlsZS5kaWFsRGVtb30+XG5cbiAgICAgICAgey8qIEJldGEgMCBEaWFsLiAqL31cblxuICAgICAgICA8dGV4dCB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMTAwLCAke2ggLyAyICsgOH0pYH0gdGV4dEFuY2hvcj0nbWlkZGxlJ1xuICAgICAgICAgIHN0eWxlPXtzdHlsZS5kaWFsRm9udH0+e2QzLmZvcm1hdCgnLjJmJykodGhpcy5zdGF0ZS5iZXRhc1swXSl9PC90ZXh0PlxuICAgICAgICBcbiAgICAgICAgPERpYWwgbWluPXstMTAwfSBtYXg9ezEwMH0gdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDEwMCwgJHtoIC8gMn0pYH1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5iZXRhc1swXX0gb25DaGFuZ2VWYWx1ZT17dGhpcy5fb25DaGFuZ2VEaWFsVmFsdWVCMH1cbiAgICAgICAgICB3cmFwSW5TVkc9e2ZhbHNlfSAvPlxuXG4gICAgICAgIHsvKiBQbHVzIHNpZ24uICovfVxuXG4gICAgICAgIDx0ZXh0IHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgyMDAsICR7aCAvIDIgKyA4fSlgfSB0ZXh0QW5jaG9yPSdtaWRkbGUnXG4gICAgICAgICAgc3R5bGU9e3N0eWxlLmRpYWxGb250fT4gKyA8L3RleHQ+XG5cbiAgICAgICAgey8qIEJldGEgMSBEaWFsLiAqL31cblxuICAgICAgICA8dGV4dCB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMzAwLCAke2ggLyAyICsgOH0pYH0gdGV4dEFuY2hvcj17J21pZGRsZSd9XG4gICAgICAgICAgc3R5bGU9e3N0eWxlLmRpYWxGb250fT57ZDMuZm9ybWF0KCcuMmYnKSh0aGlzLnN0YXRlLmJldGFzWzFdKX08L3RleHQ+XG5cbiAgICAgICAgPERpYWwgbWluPXstNX0gbWF4PXs1fSB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMzAwLCAke2ggLyAyfSlgfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmJldGFzWzFdfSBvbkNoYW5nZVZhbHVlPXt0aGlzLl9vbkNoYW5nZURpYWxWYWx1ZUIxfVxuICAgICAgICAgIHdyYXBJblNWRz17ZmFsc2V9IC8+XG5cbiAgICAgICAgPHRleHQgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKDM3MCwgJHtoIC8gMiArIDh9KWB9IHRleHRBbmNob3I9J3N0YXJ0J1xuICAgICAgICAgIHN0eWxlPXtzdHlsZS5kaWFsRm9udH0+ICogaGFuZCBzaXplID0gaGVpZ2h0PC90ZXh0PlxuICAgICAgPC9zdmc+XG4gICAgICA8ZGl2IHN0eWxlPXt7Y2xlYXI6ICdib3RoJ319PlxuICAgICAgICA8TGVhc3RTcXVhcmVzXG4gICAgICAgICAgd2lkdGg9ezMxMH1cbiAgICAgICAgICBoZWlnaHQ9ezMxMH1cbiAgICAgICAgICBzdHlsZT17e2Zsb2F0OiAnbGVmdCd9fVxuICAgICAgICAgIHBvaW50cz17dGhpcy5wcm9wcy5wb2ludHN9XG4gICAgICAgICAgYmV0YXM9e3RoaXMuc3RhdGUuYmV0YXN9XG4gICAgICAgICAgY29sb3JBY2Nlc3Nvcj17ZCA9PiBkLmNvbG9yfVxuICAgICAgICAgIG9uRHJhZ05vYj17dGhpcy5wcm9wcy5vbkRyYWdPTFNOb2J9XG4gICAgICAgICAgbW9kZT0ncG9pbnQnXG4gICAgICAgICAgc2hvd0Vycm9yU3F1YXJlcz17dHJ1ZX1cbiAgICAgICAgICBzaG93Tm9icz17ZmFsc2V9XG4gICAgICAgICAga2V5PSdsZWFzdC1zcXVhcmVzLXdpdGhvdXQtc3F1YXJlcycgLz5cbiAgICAgICAgPE1hc29uaWNTcXVhcmVzXG4gICAgICAgICAgc3R5bGU9e3tmbG9hdDogJ2xlZnQnfX1cbiAgICAgICAgICB3aWR0aD17MzEwfVxuICAgICAgICAgIGhlaWdodD17MzEwfVxuICAgICAgICAgIGRhdGE9e3RoaXMuc3RhdGUubGVhc3RTcXVhcmVzRXJyb3JzfVxuICAgICAgICAgIHZhbHVlQWNjZXNzb3I9e3RoaXMucHJvcHMubGVhc3RTcXVhcmVzVmFsdWVBY2Nlc3Nvcn1cbiAgICAgICAgICBjb2xvckFjY2Vzc29yPXt0aGlzLnByb3BzLmxlYXN0U3F1YXJlc0NvbG9yQWNjZXNzb3J9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3tjbGVhcjogJ2JvdGgnfX0+PC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICB9LFxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBSZWdyZXNzaW9uQXNOb2JzTW9kdWxlIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJylcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbnZhciBQdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlKCdyZWFjdC9saWIvUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluJylcblxudmFyIGFscGhhaWZ5ID0gcmVxdWlyZSgnYWxwaGFpZnknKVxudmFyIGNvbG9yID0gcmVxdWlyZSgnY29sb3InKVxuXG52YXIgU0xSUGFyYW1ldGVycyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbUHVyZVJlbmRlck1peGluXSxcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7IHRoaXMuX0RPTVdhc1VwZGF0ZWQoKSB9LFxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7IHRoaXMuX0RPTVdhc1VwZGF0ZWQoKSB9LFxuICBfRE9NV2FzVXBkYXRlZCgpIHtcbiAgICB2YXIgc3ZnQkIgPSB0aGlzLmdldERPTU5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHZhciBiZXRhMVRleHQgPSB0aGlzLnJlZnMuYmV0YTFUZXh0LmdldERPTU5vZGUoKVxuICAgIC8vIHVzaW5nIGBnZXRDbGllbnRSZWN0c2AgaXMgYSBoYWNrIHRvIGF2b2lkIGEgQ2hyb21lIGJ1ZyB3aXRoIHVzaW5nIFxuICAgIC8vIGBnZXRCQm94KClgXG4gICAgdmFyIGJldGExVGV4dEJCID0gYmV0YTFUZXh0LmdldENsaWVudFJlY3RzKClbMF1cbiAgICB2YXIgYmV0YTFUZXh0TGVuZ3RoID0gYmV0YTFUZXh0LmdldENvbXB1dGVkVGV4dExlbmd0aCgpXG4gICAgdmFyIGhpZ2hsaWdodDFQb3MgPSB7XG4gICAgICB4OiBiZXRhMVRleHRCQi5sZWZ0ICsgYmV0YTFUZXh0QkIud2lkdGggLyAyIC0gc3ZnQkIubGVmdCxcbiAgICAgIHk6IGJldGExVGV4dEJCLnRvcCArIGJldGExVGV4dEJCLmhlaWdodCAvIDIgLSBzdmdCQi50b3AsXG4gICAgfVxuXG4gICAgdmFyIGJldGEyVGV4dCA9IHRoaXMucmVmcy5iZXRhMlRleHQuZ2V0RE9NTm9kZSgpXG4gICAgdmFyIGJldGEyVGV4dEJCID0gYmV0YTJUZXh0LmdldENsaWVudFJlY3RzKClbMF1cbiAgICB2YXIgYmV0YTJUZXh0TGVuZ3RoID0gYmV0YTJUZXh0LmdldENvbXB1dGVkVGV4dExlbmd0aCgpXG4gICAgdmFyIGhpZ2hsaWdodDJQb3MgPSB7XG4gICAgICB4OiBiZXRhMlRleHRCQi5sZWZ0ICsgYmV0YTJUZXh0QkIud2lkdGggLyAyIC0gc3ZnQkIubGVmdCxcbiAgICAgIHk6IGJldGEyVGV4dEJCLnRvcCArIGJldGEyVGV4dEJCLmhlaWdodCAvIDIgLSBzdmdCQi50b3AsXG4gICAgfVxuXG4gICAgZDMuc2VsZWN0KHRoaXMucmVmcy5iZXRhMUhpZ2hsaWdodC5nZXRET01Ob2RlKCkpXG4gICAgICAuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke2hpZ2hsaWdodDFQb3MueH0sICR7aGlnaGxpZ2h0MVBvcy55fSlgKVxuICAgIGQzLnNlbGVjdCh0aGlzLnJlZnMuYmV0YTJIaWdobGlnaHQuZ2V0RE9NTm9kZSgpKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHtoaWdobGlnaHQyUG9zLnh9LCAke2hpZ2hsaWdodDJQb3MueX0pYClcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8c3ZnIHdpZHRoPXszMTB9IGhlaWdodD17MzEwfT5cbiAgICAgIDxnIHJlZj0nYmV0YTFIaWdobGlnaHQnPlxuICAgICAgICA8Y2lyY2xlIHI9ezI1fSBzdHlsZT17e2ZpbGw6IGFscGhhaWZ5KGNvbG9yLnByaW1hcnksIDAuNSl9fSAvPlxuICAgICAgICA8bGluZSB4MT17MH0geTE9ey0yNX0geDI9ezB9IHkyPXstNTB9IHN0eWxlPXt7c3Ryb2tlOiBjb2xvci5wcmltYXJ5fX0gLz5cbiAgICAgIDwvZz5cbiAgICAgIDxnIHJlZj0nYmV0YTJIaWdobGlnaHQnPlxuICAgICAgICA8Y2lyY2xlIHI9ezI1fSBzdHlsZT17e2ZpbGw6IGFscGhhaWZ5KGNvbG9yLnNlY29uZGFyeSwgMC41KX19IC8+XG4gICAgICAgIDxsaW5lIHgxPXswfSB5MT17MjV9IHgyPXswfSB5Mj17NTB9IHN0eWxlPXt7c3Ryb2tlOiBjb2xvci5zZWNvbmRhcnl9fSAvPlxuICAgICAgPC9nPlxuICAgICAgPGcgdHJhbnNmb3JtPSd0cmFuc2xhdGUoMTYwLCAxNjApJz5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjAsIC02MCknXG4gICAgICAgICAgdGV4dEFuY2hvcj0nbWlkZGxlJ1xuICAgICAgICAgIGZvbnRTaXplPXsxMn1cbiAgICAgICAgICBmaWxsPXtjb2xvci5wcmltYXJ5fT5cbiAgICAgICAgICBCZXRhIDEgLSBUaGUgeS1pbnRlcmNlcHQgb2YgdGhlIHJlZ3Jlc3Npb24gbGluZS5cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8dGV4dFxuICAgICAgICAgIHRyYW5zZm9ybT0ndHJhbnNsYXRlKC0yMCwgNjApJ1xuICAgICAgICAgIHRleHRBbmNob3I9J21pZGRsZSdcbiAgICAgICAgICBmb250U2l6ZT17MTJ9XG4gICAgICAgICAgZmlsbD17Y29sb3Iuc2Vjb25kYXJ5fT5cbiAgICAgICAgICBCZXRhIDIgLSBUaGUgc2xvcGUgb2YgdGhlIHJlZ3Jlc3Npb24gbGluZS5cbiAgICAgICAgPC90ZXh0PlxuICAgICAgICA8dGV4dFxuICAgICAgICAgIHJlZj0nZXF1YXRpb24nXG4gICAgICAgICAgdHJhbnNmb3JtPXtgdHJhbnNsYXRlKCR7MH0sICR7MH0pYH1cbiAgICAgICAgICB0ZXh0QW5jaG9yPSdtaWRkbGUnXG4gICAgICAgICAgZm9udFNpemU9JzIwcHgnPlxuICAgICAgICAgIDx0c3BhbiByZWY9J2JldGExVGV4dCc+e2QzLmZvcm1hdCgnLjJmJykodGhpcy5wcm9wcy5iZXRhc1swXSl9PC90c3Bhbj5cbiAgICAgICAgICA8dHNwYW4+ICsgPC90c3Bhbj5cbiAgICAgICAgICA8dHNwYW4gcmVmPSdiZXRhMlRleHQnPntkMy5mb3JtYXQoJy4yZicpKHRoaXMucHJvcHMuYmV0YXNbMV0pfTwvdHNwYW4+XG4gICAgICAgICAgPHRzcGFuPiAqIGhhbmQgc2l6ZSA9IGhlaWdodDwvdHNwYW4+XG4gICAgICAgIDwvdGV4dD5cbiAgICAgIDwvZz5cbiAgICA8L3N2Zz5cbiAgfSxcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gU0xSUGFyYW1ldGVycyIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkTm9icyhjb29yZCwgZGF0YSwgY2xhc3NOYW1lKSB7XG4gIHZhciBub2JzID0gY29vcmQuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCBjbGFzc05hbWUpXG4gICAgLnNlbGVjdEFsbCgnLm5vYicpLmRhdGEoZGF0YSB8fCBbXSkuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ25vYicpXG4gIHZhciBjaXJjbGUgPSBub2JzLmFwcGVuZCgnY2lyY2xlJykuYXR0cigncicsIDIwKVxuICBmdW5jdGlvbiBsb29wKGcpIHtcbiAgICBnXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5lYXNlKCdlYXNlLW91dCcpXG4gICAgICAuYXR0cih7cjogMjV9KVxuICAgICAgLnN0eWxlKHtmaWxsOiAncmdiYSgwLCAwLCAwLCAwLjIpJ30pXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZWFzZSgnZWFzZS1pbicpXG4gICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgIC5hdHRyKHtyOiAyMH0pXG4gICAgICAuc3R5bGUoe2ZpbGw6ICdyZ2JhKDAsIDAsIDAsIDAuMSknfSlcbiAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgcmV0dXJuIGxvb3AoZDMuc2VsZWN0KHRoaXMpKSB9KVxuICB9XG4gIGNpcmNsZVxuICAgIC5jYWxsKGxvb3ApXG4gICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICAgIGQzLnNlbGVjdEFsbCgnLm5vYicpLnNlbGVjdCgnY2lyY2xlJylcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZWFjaCgnZW5kJywgbnVsbClcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMTAwMClcbiAgICAgICAgLmVhc2UoJ2Vhc2Utb3V0JylcbiAgICAgICAgLmF0dHIoe3I6IDIwfSlcbiAgICAgICAgLnN0eWxlKHtmaWxsOiAncmdiYSgwLCAwLCAwLCAwLjEpJ30pXG4gICAgfSlcbiAgcmV0dXJuIG5vYnNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgc3R5bGUgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZGlhbERlbW9TdHlsZToge1xuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICB9LFxuICBkaWFsRm9udDoge1xuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICBmb250U2l6ZTogMjAsXG4gIH0sXG4gIGRpYWxGb250U21hbGw6IHtcbiAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgZm9udFNpemU6IDE0LFxuICB9LFxuICB0dXRvcmlhbFZpZGVvOiB7XG4gICAgYm94U2hhZG93OiAnMnB4IDJweCA1cHggcmdiYSgwLCAwLCAwLCAwLjIpJ1xuICB9LFxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgbnVtZXJpYyA9IHJlcXVpcmUoJ251bWVyaWMnKVxudmFyIHV0aWxzID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIE9yZGluYXJ5IExlYXN0IFNxdWFyZXNcbiAgb2xzKHBvaW50c18sIHBvaW50QWNjZXNzb3IpIHtcbiAgICB2YXIgcG9pbnRzID0gcG9pbnRzXy5tYXAocG9pbnRBY2Nlc3NvciB8fCAoZCA9PiBkKSlcbiAgICB2YXIgeG1lYW4gPSBkMy5tZWFuKHBvaW50cywgZCA9PiBkWzBdKVxuICAgIHZhciB5bWVhbiA9IGQzLm1lYW4ocG9pbnRzLCBkID0+IGRbMV0pXG4gICAgdmFyIGJOdW0gPSBwb2ludHMucmVkdWNlKCh0b3RhbCwgZCkgPT4ge1xuICAgICAgcmV0dXJuIHRvdGFsICsgKGRbMF0gLSB4bWVhbikgKiAoZFsxXSAtIHltZWFuKVxuICAgIH0sIDApXG4gICAgdmFyIGJEZW5vbSA9IHBvaW50cy5yZWR1Y2UoKHRvdGFsLCBkKSA9PiB7XG4gICAgICByZXR1cm4gdG90YWwgKyBNYXRoLnBvdyhkWzBdIC0geG1lYW4sIDIpXG4gICAgfSwgMClcbiAgICB2YXIgYiA9IGJOdW0gLyBiRGVub21cbiAgICB2YXIgYSA9IHltZWFuIC0gYiAqIHhtZWFuXG4gICAgcmV0dXJuIHthLCBifVxuICB9LFxuICAvLyBTdW0gb2Ygc3F1YXJlZCByZXNpZHVhbHMgdXNpbmcgcG9zaXRpdmUtZGVmaW5pdGUgSGVzc2lhbi5cbiAgaGVzc2lhbih5LCBYXykge1xuICAgIHZhciBpLCBqLCBuID0gWF8ubGVuZ3RoLCBwID0gWF9bMF0ubGVuZ3RoICsgMSwgWCA9IFtdXG4gICAgZm9yKGkgPSAwOyBpIDwgbjsgaSsrKSBYW2ldID0gWzFdLmNvbmNhdChYX1tpXSlcbiAgICB2YXIgWF9UID0gbnVtZXJpYy50cmFuc3Bvc2UoWClcbiAgICB2YXIgWF9UX1ggPSBudW1lcmljLmRvdChYX1QsIFgpXG4gICAgcmV0dXJuIG51bWVyaWMuZG90KG51bWVyaWMuZG90KG51bWVyaWMuaW52KFhfVF9YKSwgWF9UKSwgeSlcbiAgfSxcbiAgd3JhcExlYXN0U3F1YXJlc0Vycm9ycyhwb2ludHMsIGFjY2Vzc29yLCBiZXRhcykge1xuICAgIHZhciByZWcgPSBiZXRhcyA/IHthOiBiZXRhc1swXSwgYjogYmV0YXNbMV19IDogdXRpbHMub2xzKHBvaW50cywgYWNjZXNzb3IpXG4gICAgdmFyIHJzID0gZDMuc2NhbGUubGluZWFyKCkuZG9tYWluKFswLCAxXSkucmFuZ2UoW3JlZy5hLCByZWcuYSArIHJlZy5iICogMV0pXG4gICAgcmV0dXJuIHBvaW50cy5tYXAoZCA9PiB7XG4gICAgICB2YXIgcG9pbnQgPSBhY2Nlc3NvcihkKVxuICAgICAgLyogZXJyID0geCAtIFggKi9cbiAgICAgIHZhciBlcnJvciA9IE1hdGguYWJzKHJzKHBvaW50WzBdKSAtIHBvaW50WzFdKVxuICAgICAgZXJyb3IgPSBlcnJvciAqIGVycm9yXG4gICAgICByZXR1cm4ge2Vycm9yLCBkfVxuICAgIH0pXG4gIH0sXG59IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9PYmplY3QkYXNzaWduID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduXCIpW1wiZGVmYXVsdFwiXTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfT2JqZWN0JGFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpLmNvcmUuT2JqZWN0LmFzc2lnbjsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xyXG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXHJcbi8qZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XHJcbi8qZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxyXG4gICAgLCBsID0gYXJndW1lbnRzLmxlbmd0aFxyXG4gICAgLCBpID0gMTtcclxuICB3aGlsZShsID4gaSl7XHJcbiAgICB2YXIgUyAgICAgID0gJC5FUzVPYmplY3QoYXJndW1lbnRzW2krK10pXHJcbiAgICAgICwga2V5cyAgID0gJC5nZXRLZXlzKFMpXHJcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcclxuICAgICAgLCBqICAgICAgPSAwXHJcbiAgICAgICwga2V5O1xyXG4gICAgd2hpbGUobGVuZ3RoID4gailUW2tleSA9IGtleXNbaisrXV0gPSBTW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBUO1xyXG59OyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGdsb2JhbCAgICAgPSAkLmdcclxuICAsIGNvcmUgICAgICAgPSAkLmNvcmVcclxuICAsIGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb247XHJcbmZ1bmN0aW9uIGN0eChmbiwgdGhhdCl7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICB9O1xyXG59XHJcbi8vIHR5cGUgYml0bWFwXHJcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcclxuJGRlZi5HID0gMjsgIC8vIGdsb2JhbFxyXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXHJcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xyXG4kZGVmLkIgPSAxNjsgLy8gYmluZFxyXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxyXG5mdW5jdGlvbiAkZGVmKHR5cGUsIG5hbWUsIHNvdXJjZSl7XHJcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxyXG4gICAgLCBpc0dsb2JhbCA9IHR5cGUgJiAkZGVmLkdcclxuICAgICwgdGFyZ2V0ICAgPSBpc0dsb2JhbCA/IGdsb2JhbCA6IHR5cGUgJiAkZGVmLlNcclxuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pLnByb3RvdHlwZVxyXG4gICAgLCBleHBvcnRzICA9IGlzR2xvYmFsID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XHJcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcclxuICBmb3Ioa2V5IGluIHNvdXJjZSl7XHJcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcclxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XHJcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XHJcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxyXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcclxuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xyXG4gICAgaWYoaXNHbG9iYWwgJiYgIWlzRnVuY3Rpb24odGFyZ2V0W2tleV0pKWV4cCA9IHNvdXJjZVtrZXldO1xyXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcclxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcclxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XHJcbiAgICBlbHNlIGlmKHR5cGUgJiAkZGVmLlcgJiYgdGFyZ2V0W2tleV0gPT0gb3V0KSFmdW5jdGlvbihDKXtcclxuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xyXG4gICAgICB9O1xyXG4gICAgICBleHAucHJvdG90eXBlID0gQy5wcm90b3R5cGU7XHJcbiAgICB9KG91dCk7XHJcbiAgICBlbHNlIGV4cCA9IHR5cGUgJiAkZGVmLlAgJiYgaXNGdW5jdGlvbihvdXQpID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XHJcbiAgICAvLyBleHBvcnRcclxuICAgICQuaGlkZShleHBvcnRzLCBrZXksIGV4cCk7XHJcbiAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gJGRlZjsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCQpe1xyXG4gICQuRlcgICA9IGZhbHNlO1xyXG4gICQucGF0aCA9ICQuY29yZTtcclxuICByZXR1cm4gJDtcclxufTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciBnbG9iYWwgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpXHJcbiAgLCBjb3JlICAgPSB7fVxyXG4gICwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcclxuICAsIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHlcclxuICAsIGNlaWwgID0gTWF0aC5jZWlsXHJcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcclxuICAsIG1heCAgID0gTWF0aC5tYXhcclxuICAsIG1pbiAgID0gTWF0aC5taW47XHJcbi8vIFRoZSBlbmdpbmUgd29ya3MgZmluZSB3aXRoIGRlc2NyaXB0b3JzPyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5LlxyXG52YXIgREVTQyA9ICEhZnVuY3Rpb24oKXtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiAyOyB9fSkuYSA9PSAyO1xyXG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cclxufSgpO1xyXG52YXIgaGlkZSA9IGNyZWF0ZURlZmluZXIoMSk7XHJcbi8vIDcuMS40IFRvSW50ZWdlclxyXG5mdW5jdGlvbiB0b0ludGVnZXIoaXQpe1xyXG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xyXG59XHJcbmZ1bmN0aW9uIGRlc2MoYml0bWFwLCB2YWx1ZSl7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcclxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcclxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcclxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHNpbXBsZVNldChvYmplY3QsIGtleSwgdmFsdWUpe1xyXG4gIG9iamVjdFtrZXldID0gdmFsdWU7XHJcbiAgcmV0dXJuIG9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVEZWZpbmVyKGJpdG1hcCl7XHJcbiAgcmV0dXJuIERFU0MgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xyXG4gICAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgZGVzYyhiaXRtYXAsIHZhbHVlKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcclxuICB9IDogc2ltcGxlU2V0O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc09iamVjdChpdCl7XHJcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xyXG59XHJcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oaXQpe1xyXG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJztcclxufVxyXG5mdW5jdGlvbiBhc3NlcnREZWZpbmVkKGl0KXtcclxuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xyXG4gIHJldHVybiBpdDtcclxufVxyXG5cclxudmFyICQgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5mdycpKHtcclxuICBnOiBnbG9iYWwsXHJcbiAgY29yZTogY29yZSxcclxuICBodG1sOiBnbG9iYWwuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG4gIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcmUtanMtaXNvYmplY3RcclxuICBpc09iamVjdDogICBpc09iamVjdCxcclxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxyXG4gIGl0OiBmdW5jdGlvbihpdCl7XHJcbiAgICByZXR1cm4gaXQ7XHJcbiAgfSxcclxuICB0aGF0OiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuICAvLyA3LjEuNCBUb0ludGVnZXJcclxuICB0b0ludGVnZXI6IHRvSW50ZWdlcixcclxuICAvLyA3LjEuMTUgVG9MZW5ndGhcclxuICB0b0xlbmd0aDogZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcclxuICB9LFxyXG4gIHRvSW5kZXg6IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xyXG4gICAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xyXG4gICAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XHJcbiAgfSxcclxuICBoYXM6IGZ1bmN0aW9uKGl0LCBrZXkpe1xyXG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XHJcbiAgfSxcclxuICBjcmVhdGU6ICAgICBPYmplY3QuY3JlYXRlLFxyXG4gIGdldFByb3RvOiAgIE9iamVjdC5nZXRQcm90b3R5cGVPZixcclxuICBERVNDOiAgICAgICBERVNDLFxyXG4gIGRlc2M6ICAgICAgIGRlc2MsXHJcbiAgZ2V0RGVzYzogICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcclxuICBzZXREZXNjOiAgICBkZWZpbmVQcm9wZXJ0eSxcclxuICBnZXRLZXlzOiAgICBPYmplY3Qua2V5cyxcclxuICBnZXROYW1lczogICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcclxuICBnZXRTeW1ib2xzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxyXG4gIC8vIER1bW15LCBmaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmcgaW4gZXM1IG1vZHVsZVxyXG4gIGFzc2VydERlZmluZWQ6IGFzc2VydERlZmluZWQsXHJcbiAgRVM1T2JqZWN0OiBPYmplY3QsXHJcbiAgdG9PYmplY3Q6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiAkLkVTNU9iamVjdChhc3NlcnREZWZpbmVkKGl0KSk7XHJcbiAgfSxcclxuICBoaWRlOiBoaWRlLFxyXG4gIGRlZjogY3JlYXRlRGVmaW5lcigwKSxcclxuICBzZXQ6IGdsb2JhbC5TeW1ib2wgPyBzaW1wbGVTZXQgOiBoaWRlLFxyXG4gIG1peDogZnVuY3Rpb24odGFyZ2V0LCBzcmMpe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gc3JjKWhpZGUodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgfSxcclxuICBlYWNoOiBbXS5mb3JFYWNoXHJcbn0pO1xyXG5pZih0eXBlb2YgX19lICE9ICd1bmRlZmluZWQnKV9fZSA9IGNvcmU7XHJcbmlmKHR5cGVvZiBfX2cgIT0gJ3VuZGVmaW5lZCcpX19nID0gZ2xvYmFsOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXHJcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xyXG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vJC5hc3NpZ24nKX0pOyIsIi8vIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1VuaXRfVGVzdGluZy8xLjBcbi8vXG4vLyBUSElTIElTIE5PVCBURVNURUQgTk9SIExJS0VMWSBUTyBXT1JLIE9VVFNJREUgVjghXG4vL1xuLy8gT3JpZ2luYWxseSBmcm9tIG5hcndoYWwuanMgKGh0dHA6Ly9uYXJ3aGFsanMub3JnKVxuLy8gQ29weXJpZ2h0IChjKSAyMDA5IFRob21hcyBSb2JpbnNvbiA8Mjgwbm9ydGguY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICdTb2Z0d2FyZScpLCB0b1xuLy8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbi8vIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuLy8gc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyB3aGVuIHVzZWQgaW4gbm9kZSwgdGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIHV0aWwgbW9kdWxlIHdlIGRlcGVuZCBvblxuLy8gdmVyc3VzIGxvYWRpbmcgdGhlIGJ1aWx0aW4gdXRpbCBtb2R1bGUgYXMgaGFwcGVucyBvdGhlcndpc2Vcbi8vIHRoaXMgaXMgYSBidWcgaW4gbm9kZSBtb2R1bGUgbG9hZGluZyBhcyBmYXIgYXMgSSBhbSBjb25jZXJuZWRcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcblxudmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyAxLiBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuLy8gQXNzZXJ0aW9uRXJyb3IncyB3aGVuIHBhcnRpY3VsYXIgY29uZGl0aW9ucyBhcmUgbm90IG1ldC4gVGhlXG4vLyBhc3NlcnQgbW9kdWxlIG11c3QgY29uZm9ybSB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS5cblxudmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG5cbi8vIDIuIFRoZSBBc3NlcnRpb25FcnJvciBpcyBkZWZpbmVkIGluIGFzc2VydC5cbi8vIG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IoeyBtZXNzYWdlOiBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCB9KVxuXG5hc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG4gIHRoaXMubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG4gIHRoaXMuYWN0dWFsID0gb3B0aW9ucy5hY3R1YWw7XG4gIHRoaXMuZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvcjtcbiAgaWYgKG9wdGlvbnMubWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNZXNzYWdlKHRoaXMpO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gIH1cbiAgdmFyIHN0YWNrU3RhcnRGdW5jdGlvbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZ1bmN0aW9uIHx8IGZhaWw7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBub24gdjggYnJvd3NlcnMgc28gd2UgY2FuIGhhdmUgYSBzdGFja3RyYWNlXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlmIChlcnIuc3RhY2spIHtcbiAgICAgIHZhciBvdXQgPSBlcnIuc3RhY2s7XG5cbiAgICAgIC8vIHRyeSB0byBzdHJpcCB1c2VsZXNzIGZyYW1lc1xuICAgICAgdmFyIGZuX25hbWUgPSBzdGFja1N0YXJ0RnVuY3Rpb24ubmFtZTtcbiAgICAgIHZhciBpZHggPSBvdXQuaW5kZXhPZignXFxuJyArIGZuX25hbWUpO1xuICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgIC8vIG9uY2Ugd2UgaGF2ZSBsb2NhdGVkIHRoZSBmdW5jdGlvbiBmcmFtZVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGJlZm9yZSBpdCAoYW5kIGl0cyBsaW5lKVxuICAgICAgICB2YXIgbmV4dF9saW5lID0gb3V0LmluZGV4T2YoJ1xcbicsIGlkeCArIDEpO1xuICAgICAgICBvdXQgPSBvdXQuc3Vic3RyaW5nKG5leHRfbGluZSArIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWNrID0gb3V0O1xuICAgIH1cbiAgfVxufTtcblxuLy8gYXNzZXJ0LkFzc2VydGlvbkVycm9yIGluc3RhbmNlb2YgRXJyb3JcbnV0aWwuaW5oZXJpdHMoYXNzZXJ0LkFzc2VydGlvbkVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgaWYgKHV0aWwuaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuICcnICsgdmFsdWU7XG4gIH1cbiAgaWYgKHV0aWwuaXNOdW1iZXIodmFsdWUpICYmICFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAodXRpbC5pc0Z1bmN0aW9uKHZhbHVlKSB8fCB1dGlsLmlzUmVnRXhwKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGUocywgbikge1xuICBpZiAodXRpbC5pc1N0cmluZyhzKSkge1xuICAgIHJldHVybiBzLmxlbmd0aCA8IG4gPyBzIDogcy5zbGljZSgwLCBuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcztcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRNZXNzYWdlKHNlbGYpIHtcbiAgcmV0dXJuIHRydW5jYXRlKEpTT04uc3RyaW5naWZ5KHNlbGYuYWN0dWFsLCByZXBsYWNlciksIDEyOCkgKyAnICcgK1xuICAgICAgICAgc2VsZi5vcGVyYXRvciArICcgJyArXG4gICAgICAgICB0cnVuY2F0ZShKU09OLnN0cmluZ2lmeShzZWxmLmV4cGVjdGVkLCByZXBsYWNlciksIDEyOCk7XG59XG5cbi8vIEF0IHByZXNlbnQgb25seSB0aGUgdGhyZWUga2V5cyBtZW50aW9uZWQgYWJvdmUgYXJlIHVzZWQgYW5kXG4vLyB1bmRlcnN0b29kIGJ5IHRoZSBzcGVjLiBJbXBsZW1lbnRhdGlvbnMgb3Igc3ViIG1vZHVsZXMgY2FuIHBhc3Ncbi8vIG90aGVyIGtleXMgdG8gdGhlIEFzc2VydGlvbkVycm9yJ3MgY29uc3RydWN0b3IgLSB0aGV5IHdpbGwgYmVcbi8vIGlnbm9yZWQuXG5cbi8vIDMuIEFsbCBvZiB0aGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBtdXN0IHRocm93IGFuIEFzc2VydGlvbkVycm9yXG4vLyB3aGVuIGEgY29ycmVzcG9uZGluZyBjb25kaXRpb24gaXMgbm90IG1ldCwgd2l0aCBhIG1lc3NhZ2UgdGhhdFxuLy8gbWF5IGJlIHVuZGVmaW5lZCBpZiBub3QgcHJvdmlkZWQuICBBbGwgYXNzZXJ0aW9uIG1ldGhvZHMgcHJvdmlkZVxuLy8gYm90aCB0aGUgYWN0dWFsIGFuZCBleHBlY3RlZCB2YWx1ZXMgdG8gdGhlIGFzc2VydGlvbiBlcnJvciBmb3Jcbi8vIGRpc3BsYXkgcHVycG9zZXMuXG5cbmZ1bmN0aW9uIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IsIHN0YWNrU3RhcnRGdW5jdGlvbikge1xuICB0aHJvdyBuZXcgYXNzZXJ0LkFzc2VydGlvbkVycm9yKHtcbiAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgIGFjdHVhbDogYWN0dWFsLFxuICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICBvcGVyYXRvcjogb3BlcmF0b3IsXG4gICAgc3RhY2tTdGFydEZ1bmN0aW9uOiBzdGFja1N0YXJ0RnVuY3Rpb25cbiAgfSk7XG59XG5cbi8vIEVYVEVOU0lPTiEgYWxsb3dzIGZvciB3ZWxsIGJlaGF2ZWQgZXJyb3JzIGRlZmluZWQgZWxzZXdoZXJlLlxuYXNzZXJ0LmZhaWwgPSBmYWlsO1xuXG4vLyA0LiBQdXJlIGFzc2VydGlvbiB0ZXN0cyB3aGV0aGVyIGEgdmFsdWUgaXMgdHJ1dGh5LCBhcyBkZXRlcm1pbmVkXG4vLyBieSAhIWd1YXJkLlxuLy8gYXNzZXJ0Lm9rKGd1YXJkLCBtZXNzYWdlX29wdCk7XG4vLyBUaGlzIHN0YXRlbWVudCBpcyBlcXVpdmFsZW50IHRvIGFzc2VydC5lcXVhbCh0cnVlLCAhIWd1YXJkLFxuLy8gbWVzc2FnZV9vcHQpOy4gVG8gdGVzdCBzdHJpY3RseSBmb3IgdGhlIHZhbHVlIHRydWUsIHVzZVxuLy8gYXNzZXJ0LnN0cmljdEVxdWFsKHRydWUsIGd1YXJkLCBtZXNzYWdlX29wdCk7LlxuXG5mdW5jdGlvbiBvayh2YWx1ZSwgbWVzc2FnZSkge1xuICBpZiAoIXZhbHVlKSBmYWlsKHZhbHVlLCB0cnVlLCBtZXNzYWdlLCAnPT0nLCBhc3NlcnQub2spO1xufVxuYXNzZXJ0Lm9rID0gb2s7XG5cbi8vIDUuIFRoZSBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc2hhbGxvdywgY29lcmNpdmUgZXF1YWxpdHkgd2l0aFxuLy8gPT0uXG4vLyBhc3NlcnQuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuZXF1YWwgPSBmdW5jdGlvbiBlcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmIChhY3R1YWwgIT0gZXhwZWN0ZWQpIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJz09JywgYXNzZXJ0LmVxdWFsKTtcbn07XG5cbi8vIDYuIFRoZSBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciB3aGV0aGVyIHR3byBvYmplY3RzIGFyZSBub3QgZXF1YWxcbi8vIHdpdGggIT0gYXNzZXJ0Lm5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24gbm90RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09IGV4cGVjdGVkKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnIT0nLCBhc3NlcnQubm90RXF1YWwpO1xuICB9XG59O1xuXG4vLyA3LiBUaGUgZXF1aXZhbGVuY2UgYXNzZXJ0aW9uIHRlc3RzIGEgZGVlcCBlcXVhbGl0eSByZWxhdGlvbi5cbi8vIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQuZGVlcEVxdWFsID0gZnVuY3Rpb24gZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKCFfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCAnZGVlcEVxdWFsJywgYXNzZXJ0LmRlZXBFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkge1xuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKGFjdHVhbCA9PT0gZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcblxuICB9IGVsc2UgaWYgKHV0aWwuaXNCdWZmZXIoYWN0dWFsKSAmJiB1dGlsLmlzQnVmZmVyKGV4cGVjdGVkKSkge1xuICAgIGlmIChhY3R1YWwubGVuZ3RoICE9IGV4cGVjdGVkLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhY3R1YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhY3R1YWxbaV0gIT09IGV4cGVjdGVkW2ldKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG5cbiAgLy8gNy4yLiBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBEYXRlIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBEYXRlIG9iamVjdCB0aGF0IHJlZmVycyB0byB0aGUgc2FtZSB0aW1lLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNEYXRlKGFjdHVhbCkgJiYgdXRpbC5pc0RhdGUoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAvLyA3LjMgSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgUmVnRXhwIG9iamVjdCwgdGhlIGFjdHVhbCB2YWx1ZSBpc1xuICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBSZWdFeHAgb2JqZWN0IHdpdGggdGhlIHNhbWUgc291cmNlIGFuZFxuICAvLyBwcm9wZXJ0aWVzIChgZ2xvYmFsYCwgYG11bHRpbGluZWAsIGBsYXN0SW5kZXhgLCBgaWdub3JlQ2FzZWApLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNSZWdFeHAoYWN0dWFsKSAmJiB1dGlsLmlzUmVnRXhwKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuc291cmNlID09PSBleHBlY3RlZC5zb3VyY2UgJiZcbiAgICAgICAgICAgYWN0dWFsLmdsb2JhbCA9PT0gZXhwZWN0ZWQuZ2xvYmFsICYmXG4gICAgICAgICAgIGFjdHVhbC5tdWx0aWxpbmUgPT09IGV4cGVjdGVkLm11bHRpbGluZSAmJlxuICAgICAgICAgICBhY3R1YWwubGFzdEluZGV4ID09PSBleHBlY3RlZC5sYXN0SW5kZXggJiZcbiAgICAgICAgICAgYWN0dWFsLmlnbm9yZUNhc2UgPT09IGV4cGVjdGVkLmlnbm9yZUNhc2U7XG5cbiAgLy8gNy40LiBPdGhlciBwYWlycyB0aGF0IGRvIG5vdCBib3RoIHBhc3MgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnLFxuICAvLyBlcXVpdmFsZW5jZSBpcyBkZXRlcm1pbmVkIGJ5ID09LlxuICB9IGVsc2UgaWYgKCF1dGlsLmlzT2JqZWN0KGFjdHVhbCkgJiYgIXV0aWwuaXNPYmplY3QoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbCA9PSBleHBlY3RlZDtcblxuICAvLyA3LjUgRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAvLyBkZXRlcm1pbmVkIGJ5IGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoYXMgdmVyaWZpZWRcbiAgLy8gd2l0aCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwpLCB0aGUgc2FtZSBzZXQgb2Yga2V5c1xuICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gIC8vIGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgYW4gaWRlbnRpY2FsICdwcm90b3R5cGUnIHByb3BlcnR5LiBOb3RlOiB0aGlzXG4gIC8vIGFjY291bnRzIGZvciBib3RoIG5hbWVkIGFuZCBpbmRleGVkIHByb3BlcnRpZXMgb24gQXJyYXlzLlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyhvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xufVxuXG5mdW5jdGlvbiBvYmpFcXVpdihhLCBiKSB7XG4gIGlmICh1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKGEpIHx8IHV0aWwuaXNOdWxsT3JVbmRlZmluZWQoYikpXG4gICAgcmV0dXJuIGZhbHNlO1xuICAvLyBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuXG4gIGlmIChhLnByb3RvdHlwZSAhPT0gYi5wcm90b3R5cGUpIHJldHVybiBmYWxzZTtcbiAgLy8gaWYgb25lIGlzIGEgcHJpbWl0aXZlLCB0aGUgb3RoZXIgbXVzdCBiZSBzYW1lXG4gIGlmICh1dGlsLmlzUHJpbWl0aXZlKGEpIHx8IHV0aWwuaXNQcmltaXRpdmUoYikpIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbiAgfVxuICB2YXIgYUlzQXJncyA9IGlzQXJndW1lbnRzKGEpLFxuICAgICAgYklzQXJncyA9IGlzQXJndW1lbnRzKGIpO1xuICBpZiAoKGFJc0FyZ3MgJiYgIWJJc0FyZ3MpIHx8ICghYUlzQXJncyAmJiBiSXNBcmdzKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIGlmIChhSXNBcmdzKSB7XG4gICAgYSA9IHBTbGljZS5jYWxsKGEpO1xuICAgIGIgPSBwU2xpY2UuY2FsbChiKTtcbiAgICByZXR1cm4gX2RlZXBFcXVhbChhLCBiKTtcbiAgfVxuICB2YXIga2EgPSBvYmplY3RLZXlzKGEpLFxuICAgICAga2IgPSBvYmplY3RLZXlzKGIpLFxuICAgICAga2V5LCBpO1xuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aClcbiAgICByZXR1cm4gZmFsc2U7XG4gIC8vdGhlIHNhbWUgc2V0IG9mIGtleXMgKGFsdGhvdWdoIG5vdCBuZWNlc3NhcmlseSB0aGUgc2FtZSBvcmRlciksXG4gIGthLnNvcnQoKTtcbiAga2Iuc29ydCgpO1xuICAvL35+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFfZGVlcEVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyA4LiBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cbi8vIGFzc2VydC5ub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwRXF1YWwnLCBhc3NlcnQubm90RGVlcEVxdWFsKTtcbiAgfVxufTtcblxuLy8gOS4gVGhlIHN0cmljdCBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc3RyaWN0IGVxdWFsaXR5LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbi8vIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PT0nLCBhc3NlcnQuc3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG4vLyAxMC4gVGhlIHN0cmljdCBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciBzdHJpY3QgaW5lcXVhbGl0eSwgYXNcbi8vIGRldGVybWluZWQgYnkgIT09LiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9PScsIGFzc2VydC5ub3RTdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChleHBlY3RlZCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpO1xuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBfdGhyb3dzKHNob3VsZFRocm93LCBibG9jaywgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGFjdHVhbDtcblxuICBpZiAodXRpbC5pc1N0cmluZyhleHBlY3RlZCkpIHtcbiAgICBtZXNzYWdlID0gZXhwZWN0ZWQ7XG4gICAgZXhwZWN0ZWQgPSBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBibG9jaygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgYWN0dWFsID0gZTtcbiAgfVxuXG4gIG1lc3NhZ2UgPSAoZXhwZWN0ZWQgJiYgZXhwZWN0ZWQubmFtZSA/ICcgKCcgKyBleHBlY3RlZC5uYW1lICsgJykuJyA6ICcuJykgK1xuICAgICAgICAgICAgKG1lc3NhZ2UgPyAnICcgKyBtZXNzYWdlIDogJy4nKTtcblxuICBpZiAoc2hvdWxkVGhyb3cgJiYgIWFjdHVhbCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ01pc3NpbmcgZXhwZWN0ZWQgZXhjZXB0aW9uJyArIG1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKCFzaG91bGRUaHJvdyAmJiBleHBlY3RlZEV4Y2VwdGlvbihhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgJ0dvdCB1bndhbnRlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICBpZiAoKHNob3VsZFRocm93ICYmIGFjdHVhbCAmJiBleHBlY3RlZCAmJlxuICAgICAgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB8fCAoIXNob3VsZFRocm93ICYmIGFjdHVhbCkpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cblxuLy8gMTEuIEV4cGVjdGVkIHRvIHRocm93IGFuIGVycm9yOlxuLy8gYXNzZXJ0LnRocm93cyhibG9jaywgRXJyb3Jfb3B0LCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbihibG9jaywgLypvcHRpb25hbCovZXJyb3IsIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cy5hcHBseSh0aGlzLCBbdHJ1ZV0uY29uY2F0KHBTbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbi8vIEVYVEVOU0lPTiEgVGhpcyBpcyBhbm5veWluZyB0byB3cml0ZSBvdXRzaWRlIHRoaXMgbW9kdWxlLlxuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uKGJsb2NrLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MuYXBwbHkodGhpcywgW2ZhbHNlXS5jb25jYXQocFNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcblxuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbihlcnIpIHsgaWYgKGVycikge3Rocm93IGVycjt9fTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudFF1ZXVlO1xuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG59XG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHF1ZXVlLnB1c2goZnVuKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnXG4gICAgJiYgdHlwZW9mIGFyZy5jb3B5ID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5maWxsID09PSAnZnVuY3Rpb24nXG4gICAgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59IiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbnZhciBmb3JtYXRSZWdFeHAgPSAvJVtzZGolXS9nO1xuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggPT09ICclJScpIHJldHVybiAnJSc7XG4gICAgaWYgKGkgPj0gbGVuKSByZXR1cm4geDtcbiAgICBzd2l0Y2ggKHgpIHtcbiAgICAgIGNhc2UgJyVzJzogcmV0dXJuIFN0cmluZyhhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWQnOiByZXR1cm4gTnVtYmVyKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclaic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGFyZ3NbaSsrXSk7XG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4geDtcbiAgICB9XG4gIH0pO1xuICBmb3IgKHZhciB4ID0gYXJnc1tpXTsgaSA8IGxlbjsgeCA9IGFyZ3NbKytpXSkge1xuICAgIGlmIChpc051bGwoeCkgfHwgIWlzT2JqZWN0KHgpKSB7XG4gICAgICBzdHIgKz0gJyAnICsgeDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyICs9ICcgJyArIGluc3BlY3QoeCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5cbi8vIE1hcmsgdGhhdCBhIG1ldGhvZCBzaG91bGQgbm90IGJlIHVzZWQuXG4vLyBSZXR1cm5zIGEgbW9kaWZpZWQgZnVuY3Rpb24gd2hpY2ggd2FybnMgb25jZSBieSBkZWZhdWx0LlxuLy8gSWYgLS1uby1kZXByZWNhdGlvbiBpcyBzZXQsIHRoZW4gaXQgaXMgYSBuby1vcC5cbmV4cG9ydHMuZGVwcmVjYXRlID0gZnVuY3Rpb24oZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVwcmVjYXRlKGZuLCBtc2cpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIGlmIChwcm9jZXNzLm5vRGVwcmVjYXRpb24gPT09IHRydWUpIHtcbiAgICByZXR1cm4gZm47XG4gIH1cblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGRlcHJlY2F0ZWQoKSB7XG4gICAgaWYgKCF3YXJuZWQpIHtcbiAgICAgIGlmIChwcm9jZXNzLnRocm93RGVwcmVjYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgICB9IGVsc2UgaWYgKHByb2Nlc3MudHJhY2VEZXByZWNhdGlvbikge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgICB9XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBkZXByZWNhdGVkO1xufTtcblxuXG52YXIgZGVidWdzID0ge307XG52YXIgZGVidWdFbnZpcm9uO1xuZXhwb3J0cy5kZWJ1Z2xvZyA9IGZ1bmN0aW9uKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSlcbiAgICBkZWJ1Z0Vudmlyb24gPSBwcm9jZXNzLmVudi5OT0RFX0RFQlVHIHx8ICcnO1xuICBzZXQgPSBzZXQudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFkZWJ1Z3Nbc2V0XSkge1xuICAgIGlmIChuZXcgUmVnRXhwKCdcXFxcYicgKyBzZXQgKyAnXFxcXGInLCAnaScpLnRlc3QoZGVidWdFbnZpcm9uKSkge1xuICAgICAgdmFyIHBpZCA9IHByb2Nlc3MucGlkO1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJyVzICVkOiAlcycsIHNldCwgcGlkLCBtc2cpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdzW3NldF0gPSBmdW5jdGlvbigpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IHRoYXQgYWx0ZXJzIHRoZSBvdXRwdXQuXG4gKi9cbi8qIGxlZ2FjeTogb2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBvcHRzKSB7XG4gIC8vIGRlZmF1bHQgb3B0aW9uc1xuICB2YXIgY3R4ID0ge1xuICAgIHNlZW46IFtdLFxuICAgIHN0eWxpemU6IHN0eWxpemVOb0NvbG9yXG4gIH07XG4gIC8vIGxlZ2FjeS4uLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAzKSBjdHguZGVwdGggPSBhcmd1bWVudHNbMl07XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDQpIGN0eC5jb2xvcnMgPSBhcmd1bWVudHNbM107XG4gIGlmIChpc0Jvb2xlYW4ob3B0cykpIHtcbiAgICAvLyBsZWdhY3kuLi5cbiAgICBjdHguc2hvd0hpZGRlbiA9IG9wdHM7XG4gIH0gZWxzZSBpZiAob3B0cykge1xuICAgIC8vIGdvdCBhbiBcIm9wdGlvbnNcIiBvYmplY3RcbiAgICBleHBvcnRzLl9leHRlbmQoY3R4LCBvcHRzKTtcbiAgfVxuICAvLyBzZXQgZGVmYXVsdCBvcHRpb25zXG4gIGlmIChpc1VuZGVmaW5lZChjdHguc2hvd0hpZGRlbikpIGN0eC5zaG93SGlkZGVuID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguZGVwdGgpKSBjdHguZGVwdGggPSAyO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmNvbG9ycykpIGN0eC5jb2xvcnMgPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jdXN0b21JbnNwZWN0KSkgY3R4LmN1c3RvbUluc3BlY3QgPSB0cnVlO1xuICBpZiAoY3R4LmNvbG9ycykgY3R4LnN0eWxpemUgPSBzdHlsaXplV2l0aENvbG9yO1xuICByZXR1cm4gZm9ybWF0VmFsdWUoY3R4LCBvYmosIGN0eC5kZXB0aCk7XG59XG5leHBvcnRzLmluc3BlY3QgPSBpbnNwZWN0O1xuXG5cbi8vIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQU5TSV9lc2NhcGVfY29kZSNncmFwaGljc1xuaW5zcGVjdC5jb2xvcnMgPSB7XG4gICdib2xkJyA6IFsxLCAyMl0sXG4gICdpdGFsaWMnIDogWzMsIDIzXSxcbiAgJ3VuZGVybGluZScgOiBbNCwgMjRdLFxuICAnaW52ZXJzZScgOiBbNywgMjddLFxuICAnd2hpdGUnIDogWzM3LCAzOV0sXG4gICdncmV5JyA6IFs5MCwgMzldLFxuICAnYmxhY2snIDogWzMwLCAzOV0sXG4gICdibHVlJyA6IFszNCwgMzldLFxuICAnY3lhbicgOiBbMzYsIDM5XSxcbiAgJ2dyZWVuJyA6IFszMiwgMzldLFxuICAnbWFnZW50YScgOiBbMzUsIDM5XSxcbiAgJ3JlZCcgOiBbMzEsIDM5XSxcbiAgJ3llbGxvdycgOiBbMzMsIDM5XVxufTtcblxuLy8gRG9uJ3QgdXNlICdibHVlJyBub3QgdmlzaWJsZSBvbiBjbWQuZXhlXG5pbnNwZWN0LnN0eWxlcyA9IHtcbiAgJ3NwZWNpYWwnOiAnY3lhbicsXG4gICdudW1iZXInOiAneWVsbG93JyxcbiAgJ2Jvb2xlYW4nOiAneWVsbG93JyxcbiAgJ3VuZGVmaW5lZCc6ICdncmV5JyxcbiAgJ251bGwnOiAnYm9sZCcsXG4gICdzdHJpbmcnOiAnZ3JlZW4nLFxuICAnZGF0ZSc6ICdtYWdlbnRhJyxcbiAgLy8gXCJuYW1lXCI6IGludGVudGlvbmFsbHkgbm90IHN0eWxpbmdcbiAgJ3JlZ2V4cCc6ICdyZWQnXG59O1xuXG5cbmZ1bmN0aW9uIHN0eWxpemVXaXRoQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgdmFyIHN0eWxlID0gaW5zcGVjdC5zdHlsZXNbc3R5bGVUeXBlXTtcblxuICBpZiAoc3R5bGUpIHtcbiAgICByZXR1cm4gJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVswXSArICdtJyArIHN0ciArXG4gICAgICAgICAgICdcXHUwMDFiWycgKyBpbnNwZWN0LmNvbG9yc1tzdHlsZV1bMV0gKyAnbSc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cblxuZnVuY3Rpb24gYXJyYXlUb0hhc2goYXJyYXkpIHtcbiAgdmFyIGhhc2ggPSB7fTtcblxuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwgaWR4KSB7XG4gICAgaGFzaFt2YWxdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgcmV0dXJuIGhhc2g7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJlxuICAgICAgdmFsdWUgJiZcbiAgICAgIGlzRnVuY3Rpb24odmFsdWUuaW5zcGVjdCkgJiZcbiAgICAgIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICAgICAgdmFsdWUuaW5zcGVjdCAhPT0gZXhwb3J0cy5pbnNwZWN0ICYmXG4gICAgICAvLyBBbHNvIGZpbHRlciBvdXQgYW55IHByb3RvdHlwZSBvYmplY3RzIHVzaW5nIHRoZSBjaXJjdWxhciBjaGVjay5cbiAgICAgICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpXG4gICAgICAmJiAoa2V5cy5pbmRleE9mKCdtZXNzYWdlJykgPj0gMCB8fCBrZXlzLmluZGV4T2YoJ2Rlc2NyaXB0aW9uJykgPj0gMCkpIHtcbiAgICByZXR1cm4gZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tGdW5jdGlvbicgKyBuYW1lICsgJ10nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH1cbiAgICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAnZGF0ZScpO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJhc2UgPSAnJywgYXJyYXkgPSBmYWxzZSwgYnJhY2VzID0gWyd7JywgJ30nXTtcblxuICAvLyBNYWtlIEFycmF5IHNheSB0aGF0IHRoZXkgYXJlIEFycmF5XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIGFycmF5ID0gdHJ1ZTtcbiAgICBicmFjZXMgPSBbJ1snLCAnXSddO1xuICB9XG5cbiAgLy8gTWFrZSBmdW5jdGlvbnMgc2F5IHRoYXQgdGhleSBhcmUgZnVuY3Rpb25zXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHZhciBuID0gdmFsdWUubmFtZSA/ICc6ICcgKyB2YWx1ZS5uYW1lIDogJyc7XG4gICAgYmFzZSA9ICcgW0Z1bmN0aW9uJyArIG4gKyAnXSc7XG4gIH1cblxuICAvLyBNYWtlIFJlZ0V4cHMgc2F5IHRoYXQgdGhleSBhcmUgUmVnRXhwc1xuICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGRhdGVzIHdpdGggcHJvcGVydGllcyBmaXJzdCBzYXkgdGhlIGRhdGVcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIH1cblxuICAvLyBNYWtlIGVycm9yIHdpdGggbWVzc2FnZSBmaXJzdCBzYXkgdGhlIGVycm9yXG4gIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgJiYgKCFhcnJheSB8fCB2YWx1ZS5sZW5ndGggPT0gMCkpIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIGlmIChyZWN1cnNlVGltZXMgPCAwKSB7XG4gICAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKFJlZ0V4cC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdyZWdleHAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCdbT2JqZWN0XScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG5cbiAgY3R4LnNlZW4ucHVzaCh2YWx1ZSk7XG5cbiAgdmFyIG91dHB1dDtcbiAgaWYgKGFycmF5KSB7XG4gICAgb3V0cHV0ID0gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cyk7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0ID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSk7XG4gICAgfSk7XG4gIH1cblxuICBjdHguc2Vlbi5wb3AoKTtcblxuICByZXR1cm4gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpXG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG4gIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICB2YXIgc2ltcGxlID0gJ1xcJycgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkucmVwbGFjZSgvXlwifFwiJC9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ251bWJlcicpO1xuICBpZiAoaXNCb29sZWFuKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJycgKyB2YWx1ZSwgJ2Jvb2xlYW4nKTtcbiAgLy8gRm9yIHNvbWUgcmVhc29uIHR5cGVvZiBudWxsIGlzIFwib2JqZWN0XCIsIHNvIHNwZWNpYWwgY2FzZSBoZXJlLlxuICBpZiAoaXNOdWxsKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBTdHJpbmcoaSkpKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAga2V5LCB0cnVlKSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKS5zdWJzdHIoMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RyID0gJ1xcbicgKyBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbQ2lyY3VsYXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVW5kZWZpbmVkKG5hbWUpKSB7XG4gICAgaWYgKGFycmF5ICYmIGtleS5tYXRjaCgvXlxcZCskLykpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIG5hbWUgPSBKU09OLnN0cmluZ2lmeSgnJyArIGtleSk7XG4gICAgaWYgKG5hbWUubWF0Y2goL15cIihbYS16QS1aX11bYS16QS1aXzAtOV0qKVwiJC8pKSB7XG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIoMSwgbmFtZS5sZW5ndGggLSAyKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5cbmZ1bmN0aW9uIHJlZHVjZVRvU2luZ2xlU3RyaW5nKG91dHB1dCwgYmFzZSwgYnJhY2VzKSB7XG4gIHZhciBudW1MaW5lc0VzdCA9IDA7XG4gIHZhciBsZW5ndGggPSBvdXRwdXQucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGN1cikge1xuICAgIG51bUxpbmVzRXN0Kys7XG4gICAgaWYgKGN1ci5pbmRleE9mKCdcXG4nKSA+PSAwKSBudW1MaW5lc0VzdCsrO1xuICAgIHJldHVybiBwcmV2ICsgY3VyLnJlcGxhY2UoL1xcdTAwMWJcXFtcXGRcXGQ/bS9nLCAnJykubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJlxuICAgICAgKG9iamVjdFRvU3RyaW5nKGUpID09PSAnW29iamVjdCBFcnJvcl0nIHx8IGUgaW5zdGFuY2VvZiBFcnJvcik7XG59XG5leHBvcnRzLmlzRXJyb3IgPSBpc0Vycm9yO1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKGFyZykge1xuICByZXR1cm4gYXJnID09PSBudWxsIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnYm9vbGVhbicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3N5bWJvbCcgfHwgIC8vIEVTNiBzeW1ib2xcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc1ByaW1pdGl2ZSA9IGlzUHJpbWl0aXZlO1xuXG5leHBvcnRzLmlzQnVmZmVyID0gcmVxdWlyZSgnLi9zdXBwb3J0L2lzQnVmZmVyJyk7XG5cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cblxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxuXG52YXIgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXG4gICAgICAgICAgICAgICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4vLyAyNiBGZWIgMTY6MTk6MzRcbmZ1bmN0aW9uIHRpbWVzdGFtcCgpIHtcbiAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICB2YXIgdGltZSA9IFtwYWQoZC5nZXRIb3VycygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0TWludXRlcygpKSxcbiAgICAgICAgICAgICAgcGFkKGQuZ2V0U2Vjb25kcygpKV0uam9pbignOicpO1xuICByZXR1cm4gW2QuZ2V0RGF0ZSgpLCBtb250aHNbZC5nZXRNb250aCgpXSwgdGltZV0uam9pbignICcpO1xufVxuXG5cbi8vIGxvZyBpcyBqdXN0IGEgdGhpbiB3cmFwcGVyIHRvIGNvbnNvbGUubG9nIHRoYXQgcHJlcGVuZHMgYSB0aW1lc3RhbXBcbmV4cG9ydHMubG9nID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlci5cbiAqXG4gKiBUaGUgRnVuY3Rpb24ucHJvdG90eXBlLmluaGVyaXRzIGZyb20gbGFuZy5qcyByZXdyaXR0ZW4gYXMgYSBzdGFuZGFsb25lXG4gKiBmdW5jdGlvbiAobm90IG9uIEZ1bmN0aW9uLnByb3RvdHlwZSkuIE5PVEU6IElmIHRoaXMgZmlsZSBpcyB0byBiZSBsb2FkZWRcbiAqIGR1cmluZyBib290c3RyYXBwaW5nIHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgcmV3cml0dGVuIHVzaW5nIHNvbWUgbmF0aXZlXG4gKiBmdW5jdGlvbnMgYXMgcHJvdG90eXBlIHNldHVwIHVzaW5nIG5vcm1hbCBKYXZhU2NyaXB0IGRvZXMgbm90IHdvcmsgYXNcbiAqIGV4cGVjdGVkIGR1cmluZyBib290c3RyYXBwaW5nIChzZWUgbWlycm9yLmpzIGluIHIxMTQ5MDMpLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gd2hpY2ggbmVlZHMgdG8gaW5oZXJpdCB0aGVcbiAqICAgICBwcm90b3R5cGUuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzdXBlckN0b3IgQ29uc3RydWN0b3IgZnVuY3Rpb24gdG8gaW5oZXJpdCBwcm90b3R5cGUgZnJvbS5cbiAqL1xuZXhwb3J0cy5pbmhlcml0cyA9IHJlcXVpcmUoJ2luaGVyaXRzJyk7XG5cbmV4cG9ydHMuX2V4dGVuZCA9IGZ1bmN0aW9uKG9yaWdpbiwgYWRkKSB7XG4gIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIGFkZCBpc24ndCBhbiBvYmplY3RcbiAgaWYgKCFhZGQgfHwgIWlzT2JqZWN0KGFkZCkpIHJldHVybiBvcmlnaW47XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhZGQpO1xuICB2YXIgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb3JpZ2luW2tleXNbaV1dID0gYWRkW2tleXNbaV1dO1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuKiBAcHJvdmlkZXNNb2R1bGUgUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzaGFsbG93RXF1YWwgPSByZXF1aXJlKFwiLi9zaGFsbG93RXF1YWxcIik7XG5cbi8qKlxuICogSWYgeW91ciBSZWFjdCBjb21wb25lbnQncyByZW5kZXIgZnVuY3Rpb24gaXMgXCJwdXJlXCIsIGUuZy4gaXQgd2lsbCByZW5kZXIgdGhlXG4gKiBzYW1lIHJlc3VsdCBnaXZlbiB0aGUgc2FtZSBwcm9wcyBhbmQgc3RhdGUsIHByb3ZpZGUgdGhpcyBNaXhpbiBmb3IgYVxuICogY29uc2lkZXJhYmxlIHBlcmZvcm1hbmNlIGJvb3N0LlxuICpcbiAqIE1vc3QgUmVhY3QgY29tcG9uZW50cyBoYXZlIHB1cmUgcmVuZGVyIGZ1bmN0aW9ucy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgdmFyIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbiA9XG4gKiAgICAgcmVxdWlyZSgnUmVhY3RDb21wb25lbnRXaXRoUHVyZVJlbmRlck1peGluJyk7XG4gKiAgIFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBtaXhpbnM6IFtSZWFjdENvbXBvbmVudFdpdGhQdXJlUmVuZGVyTWl4aW5dLFxuICpcbiAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICogICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+Zm9vPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogTm90ZTogVGhpcyBvbmx5IGNoZWNrcyBzaGFsbG93IGVxdWFsaXR5IGZvciBwcm9wcyBhbmQgc3RhdGUuIElmIHRoZXNlIGNvbnRhaW5cbiAqIGNvbXBsZXggZGF0YSBzdHJ1Y3R1cmVzIHRoaXMgbWl4aW4gbWF5IGhhdmUgZmFsc2UtbmVnYXRpdmVzIGZvciBkZWVwZXJcbiAqIGRpZmZlcmVuY2VzLiBPbmx5IG1peGluIHRvIGNvbXBvbmVudHMgd2hpY2ggaGF2ZSBzaW1wbGUgcHJvcHMgYW5kIHN0YXRlLCBvclxuICogdXNlIGBmb3JjZVVwZGF0ZSgpYCB3aGVuIHlvdSBrbm93IGRlZXAgZGF0YSBzdHJ1Y3R1cmVzIGhhdmUgY2hhbmdlZC5cbiAqL1xudmFyIFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbiA9IHtcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgIHJldHVybiAhc2hhbGxvd0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHxcbiAgICAgICAgICAgIXNoYWxsb3dFcXVhbCh0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50V2l0aFB1cmVSZW5kZXJNaXhpbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBzaGFsbG93RXF1YWxcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZ1xuICogZmFsc2Ugd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuXG4gKiBvYmpBIGFuZCBvYmpCLiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBzaGFsbG93RXF1YWwob2JqQSwgb2JqQikge1xuICBpZiAob2JqQSA9PT0gb2JqQikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBrZXk7XG4gIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gIGZvciAoa2V5IGluIG9iakEpIHtcbiAgICBpZiAob2JqQS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmXG4gICAgICAgICghb2JqQi5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IG9iakFba2V5XSAhPT0gb2JqQltrZXldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICAvLyBUZXN0IGZvciBCJ3Mga2V5cyBtaXNzaW5nIGZyb20gQS5cbiAgZm9yIChrZXkgaW4gb2JqQikge1xuICAgIGlmIChvYmpCLmhhc093blByb3BlcnR5KGtleSkgJiYgIW9iakEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93RXF1YWw7XG4iXX0=
