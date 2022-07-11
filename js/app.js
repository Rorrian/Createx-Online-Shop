(() => {
    var __webpack_modules__ = {
        211: function(__unused_webpack_module, exports) {
            (function(global, factory) {
                true ? factory(exports) : 0;
            })(0, (function(exports) {
                "use strict";
                exports.PipsMode = void 0;
                (function(PipsMode) {
                    PipsMode["Range"] = "range";
                    PipsMode["Steps"] = "steps";
                    PipsMode["Positions"] = "positions";
                    PipsMode["Count"] = "count";
                    PipsMode["Values"] = "values";
                })(exports.PipsMode || (exports.PipsMode = {}));
                exports.PipsType = void 0;
                (function(PipsType) {
                    PipsType[PipsType["None"] = -1] = "None";
                    PipsType[PipsType["NoValue"] = 0] = "NoValue";
                    PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
                    PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
                })(exports.PipsType || (exports.PipsType = {}));
                function isValidFormatter(entry) {
                    return isValidPartialFormatter(entry) && "function" === typeof entry.from;
                }
                function isValidPartialFormatter(entry) {
                    return "object" === typeof entry && "function" === typeof entry.to;
                }
                function removeElement(el) {
                    el.parentElement.removeChild(el);
                }
                function isSet(value) {
                    return null !== value && void 0 !== value;
                }
                function preventDefault(e) {
                    e.preventDefault();
                }
                function unique(array) {
                    return array.filter((function(a) {
                        return !this[a] ? this[a] = true : false;
                    }), {});
                }
                function closest(value, to) {
                    return Math.round(value / to) * to;
                }
                function offset(elem, orientation) {
                    var rect = elem.getBoundingClientRect();
                    var doc = elem.ownerDocument;
                    var docElem = doc.documentElement;
                    var pageOffset = getPageOffset(doc);
                    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
                    return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
                }
                function isNumeric(a) {
                    return "number" === typeof a && !isNaN(a) && isFinite(a);
                }
                function addClassFor(element, className, duration) {
                    if (duration > 0) {
                        addClass(element, className);
                        setTimeout((function() {
                            removeClass(element, className);
                        }), duration);
                    }
                }
                function limit(a) {
                    return Math.max(Math.min(a, 100), 0);
                }
                function asArray(a) {
                    return Array.isArray(a) ? a : [ a ];
                }
                function countDecimals(numStr) {
                    numStr = String(numStr);
                    var pieces = numStr.split(".");
                    return pieces.length > 1 ? pieces[1].length : 0;
                }
                function addClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
                }
                function removeClass(el, className) {
                    if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
                }
                function hasClass(el, className) {
                    return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
                }
                function getPageOffset(doc) {
                    var supportPageOffset = void 0 !== window.pageXOffset;
                    var isCSS1Compat = "CSS1Compat" === (doc.compatMode || "");
                    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
                    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
                    return {
                        x,
                        y
                    };
                }
                function getActions() {
                    return window.navigator.pointerEnabled ? {
                        start: "pointerdown",
                        move: "pointermove",
                        end: "pointerup"
                    } : window.navigator.msPointerEnabled ? {
                        start: "MSPointerDown",
                        move: "MSPointerMove",
                        end: "MSPointerUp"
                    } : {
                        start: "mousedown touchstart",
                        move: "mousemove touchmove",
                        end: "mouseup touchend"
                    };
                }
                function getSupportsPassive() {
                    var supportsPassive = false;
                    try {
                        var opts = Object.defineProperty({}, "passive", {
                            get: function() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("test", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }
                function getSupportsTouchActionNone() {
                    return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
                }
                function subRangeRatio(pa, pb) {
                    return 100 / (pb - pa);
                }
                function fromPercentage(range, value, startRange) {
                    return 100 * value / (range[startRange + 1] - range[startRange]);
                }
                function toPercentage(range, value) {
                    return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
                }
                function isPercentage(range, value) {
                    return value * (range[1] - range[0]) / 100 + range[0];
                }
                function getJ(value, arr) {
                    var j = 1;
                    while (value >= arr[j]) j += 1;
                    return j;
                }
                function toStepping(xVal, xPct, value) {
                    if (value >= xVal.slice(-1)[0]) return 100;
                    var j = getJ(value, xVal);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
                }
                function fromStepping(xVal, xPct, value) {
                    if (value >= 100) return xVal.slice(-1)[0];
                    var j = getJ(value, xPct);
                    var va = xVal[j - 1];
                    var vb = xVal[j];
                    var pa = xPct[j - 1];
                    var pb = xPct[j];
                    return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
                }
                function getStep(xPct, xSteps, snap, value) {
                    if (100 === value) return value;
                    var j = getJ(value, xPct);
                    var a = xPct[j - 1];
                    var b = xPct[j];
                    if (snap) {
                        if (value - a > (b - a) / 2) return b;
                        return a;
                    }
                    if (!xSteps[j - 1]) return value;
                    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
                }
                var Spectrum = function() {
                    function Spectrum(entry, snap, singleStep) {
                        this.xPct = [];
                        this.xVal = [];
                        this.xSteps = [];
                        this.xNumSteps = [];
                        this.xHighestCompleteStep = [];
                        this.xSteps = [ singleStep || false ];
                        this.xNumSteps = [ false ];
                        this.snap = snap;
                        var index;
                        var ordered = [];
                        Object.keys(entry).forEach((function(index) {
                            ordered.push([ asArray(entry[index]), index ]);
                        }));
                        ordered.sort((function(a, b) {
                            return a[0][0] - b[0][0];
                        }));
                        for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
                        this.xNumSteps = this.xSteps.slice(0);
                        for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
                    }
                    Spectrum.prototype.getDistance = function(value) {
                        var distances = [];
                        for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
                        return distances;
                    };
                    Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
                        var xPct_index = 0;
                        if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
                        if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
                        if (null === distances) distances = [];
                        var start_factor;
                        var rest_factor = 1;
                        var rest_rel_distance = distances[xPct_index];
                        var range_pct = 0;
                        var rel_range_distance = 0;
                        var abs_distance_counter = 0;
                        var range_counter = 0;
                        if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
                        while (rest_rel_distance > 0) {
                            range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                            if (distances[xPct_index + range_counter] * rest_factor + 100 - 100 * start_factor > 100) {
                                rel_range_distance = range_pct * start_factor;
                                rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                                start_factor = 1;
                            } else {
                                rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                                rest_factor = 0;
                            }
                            if (direction) {
                                abs_distance_counter -= rel_range_distance;
                                if (this.xPct.length + range_counter >= 1) range_counter--;
                            } else {
                                abs_distance_counter += rel_range_distance;
                                if (this.xPct.length - range_counter >= 1) range_counter++;
                            }
                            rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
                        }
                        return value + abs_distance_counter;
                    };
                    Spectrum.prototype.toStepping = function(value) {
                        value = toStepping(this.xVal, this.xPct, value);
                        return value;
                    };
                    Spectrum.prototype.fromStepping = function(value) {
                        return fromStepping(this.xVal, this.xPct, value);
                    };
                    Spectrum.prototype.getStep = function(value) {
                        value = getStep(this.xPct, this.xSteps, this.snap, value);
                        return value;
                    };
                    Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
                        var j = getJ(value, this.xPct);
                        if (100 === value || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
                        return (this.xVal[j] - this.xVal[j - 1]) / size;
                    };
                    Spectrum.prototype.getNearbySteps = function(value) {
                        var j = getJ(value, this.xPct);
                        return {
                            stepBefore: {
                                startValue: this.xVal[j - 2],
                                step: this.xNumSteps[j - 2],
                                highestStep: this.xHighestCompleteStep[j - 2]
                            },
                            thisStep: {
                                startValue: this.xVal[j - 1],
                                step: this.xNumSteps[j - 1],
                                highestStep: this.xHighestCompleteStep[j - 1]
                            },
                            stepAfter: {
                                startValue: this.xVal[j],
                                step: this.xNumSteps[j],
                                highestStep: this.xHighestCompleteStep[j]
                            }
                        };
                    };
                    Spectrum.prototype.countStepDecimals = function() {
                        var stepDecimals = this.xNumSteps.map(countDecimals);
                        return Math.max.apply(null, stepDecimals);
                    };
                    Spectrum.prototype.hasNoSize = function() {
                        return this.xVal[0] === this.xVal[this.xVal.length - 1];
                    };
                    Spectrum.prototype.convert = function(value) {
                        return this.getStep(this.toStepping(value));
                    };
                    Spectrum.prototype.handleEntryPoint = function(index, value) {
                        var percentage;
                        if ("min" === index) percentage = 0; else if ("max" === index) percentage = 100; else percentage = parseFloat(index);
                        if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
                        this.xPct.push(percentage);
                        this.xVal.push(value[0]);
                        var value1 = Number(value[1]);
                        if (!percentage) {
                            if (!isNaN(value1)) this.xSteps[0] = value1;
                        } else this.xSteps.push(isNaN(value1) ? false : value1);
                        this.xHighestCompleteStep.push(0);
                    };
                    Spectrum.prototype.handleStepPoint = function(i, n) {
                        if (!n) return;
                        if (this.xVal[i] === this.xVal[i + 1]) {
                            this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                            return;
                        }
                        this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
                        var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
                        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
                        var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
                        this.xHighestCompleteStep[i] = step;
                    };
                    return Spectrum;
                }();
                var defaultFormatter = {
                    to: function(value) {
                        return void 0 === value ? "" : value.toFixed(2);
                    },
                    from: Number
                };
                var cssClasses = {
                    target: "target",
                    base: "base",
                    origin: "origin",
                    handle: "handle",
                    handleLower: "handle-lower",
                    handleUpper: "handle-upper",
                    touchArea: "touch-area",
                    horizontal: "horizontal",
                    vertical: "vertical",
                    background: "background",
                    connect: "connect",
                    connects: "connects",
                    ltr: "ltr",
                    rtl: "rtl",
                    textDirectionLtr: "txt-dir-ltr",
                    textDirectionRtl: "txt-dir-rtl",
                    draggable: "draggable",
                    drag: "state-drag",
                    tap: "state-tap",
                    active: "active",
                    tooltip: "tooltip",
                    pips: "pips",
                    pipsHorizontal: "pips-horizontal",
                    pipsVertical: "pips-vertical",
                    marker: "marker",
                    markerHorizontal: "marker-horizontal",
                    markerVertical: "marker-vertical",
                    markerNormal: "marker-normal",
                    markerLarge: "marker-large",
                    markerSub: "marker-sub",
                    value: "value",
                    valueHorizontal: "value-horizontal",
                    valueVertical: "value-vertical",
                    valueNormal: "value-normal",
                    valueLarge: "value-large",
                    valueSub: "value-sub"
                };
                var INTERNAL_EVENT_NS = {
                    tooltips: ".__tooltips",
                    aria: ".__aria"
                };
                function testStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
                    parsed.singleStep = entry;
                }
                function testKeyboardPageMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
                    parsed.keyboardPageMultiplier = entry;
                }
                function testKeyboardMultiplier(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
                    parsed.keyboardMultiplier = entry;
                }
                function testKeyboardDefaultStep(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
                    parsed.keyboardDefaultStep = entry;
                }
                function testRange(parsed, entry) {
                    if ("object" !== typeof entry || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
                    if (void 0 === entry.min || void 0 === entry.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
                    parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
                }
                function testStart(parsed, entry) {
                    entry = asArray(entry);
                    if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
                    parsed.handles = entry.length;
                    parsed.start = entry;
                }
                function testSnap(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'snap' option must be a boolean.");
                    parsed.snap = entry;
                }
                function testAnimate(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'animate' option must be a boolean.");
                    parsed.animate = entry;
                }
                function testAnimationDuration(parsed, entry) {
                    if ("number" !== typeof entry) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
                    parsed.animationDuration = entry;
                }
                function testConnect(parsed, entry) {
                    var connect = [ false ];
                    var i;
                    if ("lower" === entry) entry = [ true, false ]; else if ("upper" === entry) entry = [ false, true ];
                    if (true === entry || false === entry) {
                        for (i = 1; i < parsed.handles; i++) connect.push(entry);
                        connect.push(false);
                    } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
                    parsed.connect = connect;
                }
                function testOrientation(parsed, entry) {
                    switch (entry) {
                      case "horizontal":
                        parsed.ort = 0;
                        break;

                      case "vertical":
                        parsed.ort = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'orientation' option is invalid.");
                    }
                }
                function testMargin(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
                    if (0 === entry) return;
                    parsed.margin = parsed.spectrum.getDistance(entry);
                }
                function testLimit(parsed, entry) {
                    if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
                    parsed.limit = parsed.spectrum.getDistance(entry);
                    if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
                }
                function testPadding(parsed, entry) {
                    var index;
                    if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (Array.isArray(entry) && !(2 === entry.length || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
                    if (0 === entry) return;
                    if (!Array.isArray(entry)) entry = [ entry, entry ];
                    parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
                    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
                    var totalPadding = entry[0] + entry[1];
                    var firstValue = parsed.spectrum.xVal[0];
                    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
                    if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
                }
                function testDirection(parsed, entry) {
                    switch (entry) {
                      case "ltr":
                        parsed.dir = 0;
                        break;

                      case "rtl":
                        parsed.dir = 1;
                        break;

                      default:
                        throw new Error("noUiSlider: 'direction' option was not recognized.");
                    }
                }
                function testBehaviour(parsed, entry) {
                    if ("string" !== typeof entry) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
                    var tap = entry.indexOf("tap") >= 0;
                    var drag = entry.indexOf("drag") >= 0;
                    var fixed = entry.indexOf("fixed") >= 0;
                    var snap = entry.indexOf("snap") >= 0;
                    var hover = entry.indexOf("hover") >= 0;
                    var unconstrained = entry.indexOf("unconstrained") >= 0;
                    var dragAll = entry.indexOf("drag-all") >= 0;
                    if (fixed) {
                        if (2 !== parsed.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
                        testMargin(parsed, parsed.start[1] - parsed.start[0]);
                    }
                    if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
                    parsed.events = {
                        tap: tap || snap,
                        drag,
                        dragAll,
                        fixed,
                        snap,
                        hover,
                        unconstrained
                    };
                }
                function testTooltips(parsed, entry) {
                    if (false === entry) return;
                    if (true === entry || isValidPartialFormatter(entry)) {
                        parsed.tooltips = [];
                        for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
                    } else {
                        entry = asArray(entry);
                        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
                        entry.forEach((function(formatter) {
                            if ("boolean" !== typeof formatter && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                        }));
                        parsed.tooltips = entry;
                    }
                }
                function testHandleAttributes(parsed, entry) {
                    if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
                    parsed.handleAttributes = entry;
                }
                function testAriaFormat(parsed, entry) {
                    if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
                    parsed.ariaFormat = entry;
                }
                function testFormat(parsed, entry) {
                    if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
                    parsed.format = entry;
                }
                function testKeyboardSupport(parsed, entry) {
                    if ("boolean" !== typeof entry) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
                    parsed.keyboardSupport = entry;
                }
                function testDocumentElement(parsed, entry) {
                    parsed.documentElement = entry;
                }
                function testCssPrefix(parsed, entry) {
                    if ("string" !== typeof entry && false !== entry) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
                    parsed.cssPrefix = entry;
                }
                function testCssClasses(parsed, entry) {
                    if ("object" !== typeof entry) throw new Error("noUiSlider: 'cssClasses' must be an object.");
                    if ("string" === typeof parsed.cssPrefix) {
                        parsed.cssClasses = {};
                        Object.keys(entry).forEach((function(key) {
                            parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
                        }));
                    } else parsed.cssClasses = entry;
                }
                function testOptions(options) {
                    var parsed = {
                        margin: null,
                        limit: null,
                        padding: null,
                        animate: true,
                        animationDuration: 300,
                        ariaFormat: defaultFormatter,
                        format: defaultFormatter
                    };
                    var tests = {
                        step: {
                            r: false,
                            t: testStep
                        },
                        keyboardPageMultiplier: {
                            r: false,
                            t: testKeyboardPageMultiplier
                        },
                        keyboardMultiplier: {
                            r: false,
                            t: testKeyboardMultiplier
                        },
                        keyboardDefaultStep: {
                            r: false,
                            t: testKeyboardDefaultStep
                        },
                        start: {
                            r: true,
                            t: testStart
                        },
                        connect: {
                            r: true,
                            t: testConnect
                        },
                        direction: {
                            r: true,
                            t: testDirection
                        },
                        snap: {
                            r: false,
                            t: testSnap
                        },
                        animate: {
                            r: false,
                            t: testAnimate
                        },
                        animationDuration: {
                            r: false,
                            t: testAnimationDuration
                        },
                        range: {
                            r: true,
                            t: testRange
                        },
                        orientation: {
                            r: false,
                            t: testOrientation
                        },
                        margin: {
                            r: false,
                            t: testMargin
                        },
                        limit: {
                            r: false,
                            t: testLimit
                        },
                        padding: {
                            r: false,
                            t: testPadding
                        },
                        behaviour: {
                            r: true,
                            t: testBehaviour
                        },
                        ariaFormat: {
                            r: false,
                            t: testAriaFormat
                        },
                        format: {
                            r: false,
                            t: testFormat
                        },
                        tooltips: {
                            r: false,
                            t: testTooltips
                        },
                        keyboardSupport: {
                            r: true,
                            t: testKeyboardSupport
                        },
                        documentElement: {
                            r: false,
                            t: testDocumentElement
                        },
                        cssPrefix: {
                            r: true,
                            t: testCssPrefix
                        },
                        cssClasses: {
                            r: true,
                            t: testCssClasses
                        },
                        handleAttributes: {
                            r: false,
                            t: testHandleAttributes
                        }
                    };
                    var defaults = {
                        connect: false,
                        direction: "ltr",
                        behaviour: "tap",
                        orientation: "horizontal",
                        keyboardSupport: true,
                        cssPrefix: "noUi-",
                        cssClasses,
                        keyboardPageMultiplier: 5,
                        keyboardMultiplier: 1,
                        keyboardDefaultStep: 10
                    };
                    if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
                    Object.keys(tests).forEach((function(name) {
                        if (!isSet(options[name]) && void 0 === defaults[name]) {
                            if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                            return;
                        }
                        tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
                    }));
                    parsed.pips = options.pips;
                    var d = document.createElement("div");
                    var msPrefix = void 0 !== d.style.msTransform;
                    var noPrefix = void 0 !== d.style.transform;
                    parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
                    var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
                    parsed.style = styles[parsed.dir][parsed.ort];
                    return parsed;
                }
                function scope(target, options, originalOptions) {
                    var actions = getActions();
                    var supportsTouchActionNone = getSupportsTouchActionNone();
                    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
                    var scope_Target = target;
                    var scope_Base;
                    var scope_Handles;
                    var scope_Connects;
                    var scope_Pips;
                    var scope_Tooltips;
                    var scope_Spectrum = options.spectrum;
                    var scope_Values = [];
                    var scope_Locations = [];
                    var scope_HandleNumbers = [];
                    var scope_ActiveHandlesCount = 0;
                    var scope_Events = {};
                    var scope_Document = target.ownerDocument;
                    var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
                    var scope_Body = scope_Document.body;
                    var scope_DirOffset = "rtl" === scope_Document.dir || 1 === options.ort ? 0 : 100;
                    function addNodeTo(addTarget, className) {
                        var div = scope_Document.createElement("div");
                        if (className) addClass(div, className);
                        addTarget.appendChild(div);
                        return div;
                    }
                    function addOrigin(base, handleNumber) {
                        var origin = addNodeTo(base, options.cssClasses.origin);
                        var handle = addNodeTo(origin, options.cssClasses.handle);
                        addNodeTo(handle, options.cssClasses.touchArea);
                        handle.setAttribute("data-handle", String(handleNumber));
                        if (options.keyboardSupport) {
                            handle.setAttribute("tabindex", "0");
                            handle.addEventListener("keydown", (function(event) {
                                return eventKeydown(event, handleNumber);
                            }));
                        }
                        if (void 0 !== options.handleAttributes) {
                            var attributes_1 = options.handleAttributes[handleNumber];
                            Object.keys(attributes_1).forEach((function(attribute) {
                                handle.setAttribute(attribute, attributes_1[attribute]);
                            }));
                        }
                        handle.setAttribute("role", "slider");
                        handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
                        if (0 === handleNumber) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
                        return origin;
                    }
                    function addConnect(base, add) {
                        if (!add) return false;
                        return addNodeTo(base, options.cssClasses.connect);
                    }
                    function addElements(connectOptions, base) {
                        var connectBase = addNodeTo(base, options.cssClasses.connects);
                        scope_Handles = [];
                        scope_Connects = [];
                        scope_Connects.push(addConnect(connectBase, connectOptions[0]));
                        for (var i = 0; i < options.handles; i++) {
                            scope_Handles.push(addOrigin(base, i));
                            scope_HandleNumbers[i] = i;
                            scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
                        }
                    }
                    function addSlider(addTarget) {
                        addClass(addTarget, options.cssClasses.target);
                        if (0 === options.dir) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
                        if (0 === options.ort) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
                        var textDirection = getComputedStyle(addTarget).direction;
                        if ("rtl" === textDirection) addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
                        return addNodeTo(addTarget, options.cssClasses.base);
                    }
                    function addTooltip(handle, handleNumber) {
                        if (!options.tooltips || !options.tooltips[handleNumber]) return false;
                        return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
                    }
                    function isSliderDisabled() {
                        return scope_Target.hasAttribute("disabled");
                    }
                    function isHandleDisabled(handleNumber) {
                        var handleOrigin = scope_Handles[handleNumber];
                        return handleOrigin.hasAttribute("disabled");
                    }
                    function removeTooltips() {
                        if (scope_Tooltips) {
                            removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                            scope_Tooltips.forEach((function(tooltip) {
                                if (tooltip) removeElement(tooltip);
                            }));
                            scope_Tooltips = null;
                        }
                    }
                    function tooltips() {
                        removeTooltips();
                        scope_Tooltips = scope_Handles.map(addTooltip);
                        bindEvent("update" + INTERNAL_EVENT_NS.tooltips, (function(values, handleNumber, unencoded) {
                            if (!scope_Tooltips || !options.tooltips) return;
                            if (false === scope_Tooltips[handleNumber]) return;
                            var formattedValue = values[handleNumber];
                            if (true !== options.tooltips[handleNumber]) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                            scope_Tooltips[handleNumber].innerHTML = formattedValue;
                        }));
                    }
                    function aria() {
                        removeEvent("update" + INTERNAL_EVENT_NS.aria);
                        bindEvent("update" + INTERNAL_EVENT_NS.aria, (function(values, handleNumber, unencoded, tap, positions) {
                            scope_HandleNumbers.forEach((function(index) {
                                var handle = scope_Handles[index];
                                var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                                var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                                var now = positions[index];
                                var text = String(options.ariaFormat.to(unencoded[index]));
                                min = scope_Spectrum.fromStepping(min).toFixed(1);
                                max = scope_Spectrum.fromStepping(max).toFixed(1);
                                now = scope_Spectrum.fromStepping(now).toFixed(1);
                                handle.children[0].setAttribute("aria-valuemin", min);
                                handle.children[0].setAttribute("aria-valuemax", max);
                                handle.children[0].setAttribute("aria-valuenow", now);
                                handle.children[0].setAttribute("aria-valuetext", text);
                            }));
                        }));
                    }
                    function getGroup(pips) {
                        if (pips.mode === exports.PipsMode.Range || pips.mode === exports.PipsMode.Steps) return scope_Spectrum.xVal;
                        if (pips.mode === exports.PipsMode.Count) {
                            if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                            var interval = pips.values - 1;
                            var spread = 100 / interval;
                            var values = [];
                            while (interval--) values[interval] = interval * spread;
                            values.push(100);
                            return mapToRange(values, pips.stepped);
                        }
                        if (pips.mode === exports.PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
                        if (pips.mode === exports.PipsMode.Values) {
                            if (pips.stepped) return pips.values.map((function(value) {
                                return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                            }));
                            return pips.values;
                        }
                        return [];
                    }
                    function mapToRange(values, stepped) {
                        return values.map((function(value) {
                            return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                        }));
                    }
                    function generateSpread(pips) {
                        function safeIncrement(value, increment) {
                            return Number((value + increment).toFixed(7));
                        }
                        var group = getGroup(pips);
                        var indexes = {};
                        var firstInRange = scope_Spectrum.xVal[0];
                        var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
                        var ignoreFirst = false;
                        var ignoreLast = false;
                        var prevPct = 0;
                        group = unique(group.slice().sort((function(a, b) {
                            return a - b;
                        })));
                        if (group[0] !== firstInRange) {
                            group.unshift(firstInRange);
                            ignoreFirst = true;
                        }
                        if (group[group.length - 1] !== lastInRange) {
                            group.push(lastInRange);
                            ignoreLast = true;
                        }
                        group.forEach((function(current, index) {
                            var step;
                            var i;
                            var q;
                            var low = current;
                            var high = group[index + 1];
                            var newPct;
                            var pctDifference;
                            var pctPos;
                            var type;
                            var steps;
                            var realSteps;
                            var stepSize;
                            var isSteps = pips.mode === exports.PipsMode.Steps;
                            if (isSteps) step = scope_Spectrum.xNumSteps[index];
                            if (!step) step = high - low;
                            if (void 0 === high) high = low;
                            step = Math.max(step, 1e-7);
                            for (i = low; i <= high; i = safeIncrement(i, step)) {
                                newPct = scope_Spectrum.toStepping(i);
                                pctDifference = newPct - prevPct;
                                steps = pctDifference / (pips.density || 1);
                                realSteps = Math.round(steps);
                                stepSize = pctDifference / realSteps;
                                for (q = 1; q <= realSteps; q += 1) {
                                    pctPos = prevPct + q * stepSize;
                                    indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                                }
                                type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                                if (!index && ignoreFirst && i !== high) type = 0;
                                if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                                prevPct = newPct;
                            }
                        }));
                        return indexes;
                    }
                    function addMarking(spread, filterFunc, formatter) {
                        var _a, _b;
                        var element = scope_Document.createElement("div");
                        var valueSizeClasses = (_a = {}, _a[exports.PipsType.None] = "", _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal, 
                        _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge, _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub, 
                        _a);
                        var markerSizeClasses = (_b = {}, _b[exports.PipsType.None] = "", _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal, 
                        _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge, _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub, 
                        _b);
                        var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
                        var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
                        addClass(element, options.cssClasses.pips);
                        addClass(element, 0 === options.ort ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
                        function getClasses(type, source) {
                            var a = source === options.cssClasses.value;
                            var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                            var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                            return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
                        }
                        function addSpread(offset, value, type) {
                            type = filterFunc ? filterFunc(value, type) : type;
                            if (type === exports.PipsType.None) return;
                            var node = addNodeTo(element, false);
                            node.className = getClasses(type, options.cssClasses.marker);
                            node.style[options.style] = offset + "%";
                            if (type > exports.PipsType.NoValue) {
                                node = addNodeTo(element, false);
                                node.className = getClasses(type, options.cssClasses.value);
                                node.setAttribute("data-value", String(value));
                                node.style[options.style] = offset + "%";
                                node.innerHTML = String(formatter.to(value));
                            }
                        }
                        Object.keys(spread).forEach((function(offset) {
                            addSpread(offset, spread[offset][0], spread[offset][1]);
                        }));
                        return element;
                    }
                    function removePips() {
                        if (scope_Pips) {
                            removeElement(scope_Pips);
                            scope_Pips = null;
                        }
                    }
                    function pips(pips) {
                        removePips();
                        var spread = generateSpread(pips);
                        var filter = pips.filter;
                        var format = pips.format || {
                            to: function(value) {
                                return String(Math.round(value));
                            }
                        };
                        scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
                        return scope_Pips;
                    }
                    function baseSize() {
                        var rect = scope_Base.getBoundingClientRect();
                        var alt = "offset" + [ "Width", "Height" ][options.ort];
                        return 0 === options.ort ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
                    }
                    function attachEvent(events, element, callback, data) {
                        var method = function(event) {
                            var e = fixEvent(event, data.pageOffset, data.target || element);
                            if (!e) return false;
                            if (isSliderDisabled() && !data.doNotReject) return false;
                            if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                            if (events === actions.start && void 0 !== e.buttons && e.buttons > 1) return false;
                            if (data.hover && e.buttons) return false;
                            if (!supportsPassive) e.preventDefault();
                            e.calcPoint = e.points[options.ort];
                            callback(e, data);
                            return;
                        };
                        var methods = [];
                        events.split(" ").forEach((function(eventName) {
                            element.addEventListener(eventName, method, supportsPassive ? {
                                passive: true
                            } : false);
                            methods.push([ eventName, method ]);
                        }));
                        return methods;
                    }
                    function fixEvent(e, pageOffset, eventTarget) {
                        var touch = 0 === e.type.indexOf("touch");
                        var mouse = 0 === e.type.indexOf("mouse");
                        var pointer = 0 === e.type.indexOf("pointer");
                        var x = 0;
                        var y = 0;
                        if (0 === e.type.indexOf("MSPointer")) pointer = true;
                        if ("mousedown" === e.type && !e.buttons && !e.touches) return false;
                        if (touch) {
                            var isTouchOnTarget = function(checkTouch) {
                                var target = checkTouch.target;
                                return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                            };
                            if ("touchstart" === e.type) {
                                var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                                if (targetTouches.length > 1) return false;
                                x = targetTouches[0].pageX;
                                y = targetTouches[0].pageY;
                            } else {
                                var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                                if (!targetTouch) return false;
                                x = targetTouch.pageX;
                                y = targetTouch.pageY;
                            }
                        }
                        pageOffset = pageOffset || getPageOffset(scope_Document);
                        if (mouse || pointer) {
                            x = e.clientX + pageOffset.x;
                            y = e.clientY + pageOffset.y;
                        }
                        e.pageOffset = pageOffset;
                        e.points = [ x, y ];
                        e.cursor = mouse || pointer;
                        return e;
                    }
                    function calcPointToPercentage(calcPoint) {
                        var location = calcPoint - offset(scope_Base, options.ort);
                        var proposal = 100 * location / baseSize();
                        proposal = limit(proposal);
                        return options.dir ? 100 - proposal : proposal;
                    }
                    function getClosestHandle(clickedPosition) {
                        var smallestDifference = 100;
                        var handleNumber = false;
                        scope_Handles.forEach((function(handle, index) {
                            if (isHandleDisabled(index)) return;
                            var handlePosition = scope_Locations[index];
                            var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                            var clickAtEdge = 100 === differenceWithThisHandle && 100 === smallestDifference;
                            var isCloser = differenceWithThisHandle < smallestDifference;
                            var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                            if (isCloser || isCloserAfter || clickAtEdge) {
                                handleNumber = index;
                                smallestDifference = differenceWithThisHandle;
                            }
                        }));
                        return handleNumber;
                    }
                    function documentLeave(event, data) {
                        if ("mouseout" === event.type && "HTML" === event.target.nodeName && null === event.relatedTarget) eventEnd(event, data);
                    }
                    function eventMove(event, data) {
                        if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === event.buttons && 0 !== data.buttonsProperty) return eventEnd(event, data);
                        var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
                        var proposal = 100 * movement / data.baseSize;
                        moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
                    }
                    function eventEnd(event, data) {
                        if (data.handle) {
                            removeClass(data.handle, options.cssClasses.active);
                            scope_ActiveHandlesCount -= 1;
                        }
                        data.listeners.forEach((function(c) {
                            scope_DocumentElement.removeEventListener(c[0], c[1]);
                        }));
                        if (0 === scope_ActiveHandlesCount) {
                            removeClass(scope_Target, options.cssClasses.drag);
                            setZindex();
                            if (event.cursor) {
                                scope_Body.style.cursor = "";
                                scope_Body.removeEventListener("selectstart", preventDefault);
                            }
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("change", handleNumber);
                            fireEvent("set", handleNumber);
                            fireEvent("end", handleNumber);
                        }));
                    }
                    function eventStart(event, data) {
                        if (data.handleNumbers.some(isHandleDisabled)) return;
                        var handle;
                        if (1 === data.handleNumbers.length) {
                            var handleOrigin = scope_Handles[data.handleNumbers[0]];
                            handle = handleOrigin.children[0];
                            scope_ActiveHandlesCount += 1;
                            addClass(handle, options.cssClasses.active);
                        }
                        event.stopPropagation();
                        var listeners = [];
                        var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                            target: event.target,
                            handle,
                            connect: data.connect,
                            listeners,
                            startCalcPoint: event.calcPoint,
                            baseSize: baseSize(),
                            pageOffset: event.pageOffset,
                            handleNumbers: data.handleNumbers,
                            buttonsProperty: event.buttons,
                            locations: scope_Locations.slice()
                        });
                        var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                            target: event.target,
                            handle,
                            listeners,
                            doNotReject: true,
                            handleNumbers: data.handleNumbers
                        });
                        listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
                        if (event.cursor) {
                            scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                            if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                            scope_Body.addEventListener("selectstart", preventDefault, false);
                        }
                        data.handleNumbers.forEach((function(handleNumber) {
                            fireEvent("start", handleNumber);
                        }));
                    }
                    function eventTap(event) {
                        event.stopPropagation();
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var handleNumber = getClosestHandle(proposal);
                        if (false === handleNumber) return;
                        if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        setHandle(handleNumber, proposal, true, true);
                        setZindex();
                        fireEvent("slide", handleNumber, true);
                        fireEvent("update", handleNumber, true);
                        if (!options.events.snap) {
                            fireEvent("change", handleNumber, true);
                            fireEvent("set", handleNumber, true);
                        } else eventStart(event, {
                            handleNumbers: [ handleNumber ]
                        });
                    }
                    function eventHover(event) {
                        var proposal = calcPointToPercentage(event.calcPoint);
                        var to = scope_Spectrum.getStep(proposal);
                        var value = scope_Spectrum.fromStepping(to);
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, value);
                            }));
                        }));
                    }
                    function eventKeydown(event, handleNumber) {
                        if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
                        var horizontalKeys = [ "Left", "Right" ];
                        var verticalKeys = [ "Down", "Up" ];
                        var largeStepKeys = [ "PageDown", "PageUp" ];
                        var edgeKeys = [ "Home", "End" ];
                        if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                            verticalKeys.reverse();
                            largeStepKeys.reverse();
                        }
                        var key = event.key.replace("Arrow", "");
                        var isLargeDown = key === largeStepKeys[0];
                        var isLargeUp = key === largeStepKeys[1];
                        var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
                        var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
                        var isMin = key === edgeKeys[0];
                        var isMax = key === edgeKeys[1];
                        if (!isDown && !isUp && !isMin && !isMax) return true;
                        event.preventDefault();
                        var to;
                        if (isUp || isDown) {
                            var direction = isDown ? 0 : 1;
                            var steps = getNextStepsForHandle(handleNumber);
                            var step = steps[direction];
                            if (null === step) return false;
                            if (false === step) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                            if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                            step = Math.max(step, 1e-7);
                            step *= isDown ? -1 : 1;
                            to = scope_Values[handleNumber] + step;
                        } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
                        setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
                        fireEvent("slide", handleNumber);
                        fireEvent("update", handleNumber);
                        fireEvent("change", handleNumber);
                        fireEvent("set", handleNumber);
                        return false;
                    }
                    function bindSliderEvents(behaviour) {
                        if (!behaviour.fixed) scope_Handles.forEach((function(handle, index) {
                            attachEvent(actions.start, handle.children[0], eventStart, {
                                handleNumbers: [ index ]
                            });
                        }));
                        if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
                        if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                            hover: true
                        });
                        if (behaviour.drag) scope_Connects.forEach((function(connect, index) {
                            if (false === connect || 0 === index || index === scope_Connects.length - 1) return;
                            var handleBefore = scope_Handles[index - 1];
                            var handleAfter = scope_Handles[index];
                            var eventHolders = [ connect ];
                            var handlesToDrag = [ handleBefore, handleAfter ];
                            var handleNumbersToDrag = [ index - 1, index ];
                            addClass(connect, options.cssClasses.draggable);
                            if (behaviour.fixed) {
                                eventHolders.push(handleBefore.children[0]);
                                eventHolders.push(handleAfter.children[0]);
                            }
                            if (behaviour.dragAll) {
                                handlesToDrag = scope_Handles;
                                handleNumbersToDrag = scope_HandleNumbers;
                            }
                            eventHolders.forEach((function(eventHolder) {
                                attachEvent(actions.start, eventHolder, eventStart, {
                                    handles: handlesToDrag,
                                    handleNumbers: handleNumbersToDrag,
                                    connect
                                });
                            }));
                        }));
                    }
                    function bindEvent(namespacedEvent, callback) {
                        scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
                        scope_Events[namespacedEvent].push(callback);
                        if ("update" === namespacedEvent.split(".")[0]) scope_Handles.forEach((function(a, index) {
                            fireEvent("update", index);
                        }));
                    }
                    function isInternalNamespace(namespace) {
                        return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
                    }
                    function removeEvent(namespacedEvent) {
                        var event = namespacedEvent && namespacedEvent.split(".")[0];
                        var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
                        Object.keys(scope_Events).forEach((function(bind) {
                            var tEvent = bind.split(".")[0];
                            var tNamespace = bind.substring(tEvent.length);
                            if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
                        }));
                    }
                    function fireEvent(eventName, handleNumber, tap) {
                        Object.keys(scope_Events).forEach((function(targetEvent) {
                            var eventType = targetEvent.split(".")[0];
                            if (eventName === eventType) scope_Events[targetEvent].forEach((function(callback) {
                                callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                            }));
                        }));
                    }
                    function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
                        var distance;
                        if (scope_Handles.length > 1 && !options.events.unconstrained) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                                to = Math.max(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                                to = Math.min(to, distance);
                            }
                        }
                        if (scope_Handles.length > 1 && options.limit) {
                            if (lookBackward && handleNumber > 0) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                                to = Math.min(to, distance);
                            }
                            if (lookForward && handleNumber < scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                                to = Math.max(to, distance);
                            }
                        }
                        if (options.padding) {
                            if (0 === handleNumber) {
                                distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                                to = Math.max(to, distance);
                            }
                            if (handleNumber === scope_Handles.length - 1) {
                                distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                                to = Math.min(to, distance);
                            }
                        }
                        to = scope_Spectrum.getStep(to);
                        to = limit(to);
                        if (to === reference[handleNumber] && !getValue) return false;
                        return to;
                    }
                    function inRuleOrder(v, a) {
                        var o = options.ort;
                        return (o ? a : v) + ", " + (o ? v : a);
                    }
                    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
                        var proposals = locations.slice();
                        var firstHandle = handleNumbers[0];
                        var b = [ !upward, upward ];
                        var f = [ upward, !upward ];
                        handleNumbers = handleNumbers.slice();
                        if (upward) handleNumbers.reverse();
                        if (handleNumbers.length > 1) handleNumbers.forEach((function(handleNumber, o) {
                            var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);
                            if (false === to) proposal = 0; else {
                                proposal = to - proposals[handleNumber];
                                proposals[handleNumber] = to;
                            }
                        })); else b = f = [ true ];
                        var state = false;
                        handleNumbers.forEach((function(handleNumber, o) {
                            state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
                        }));
                        if (state) {
                            handleNumbers.forEach((function(handleNumber) {
                                fireEvent("update", handleNumber);
                                fireEvent("slide", handleNumber);
                            }));
                            if (void 0 != connect) fireEvent("drag", firstHandle);
                        }
                    }
                    function transformDirection(a, b) {
                        return options.dir ? 100 - a - b : a;
                    }
                    function updateHandlePosition(handleNumber, to) {
                        scope_Locations[handleNumber] = to;
                        scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
                        var translation = transformDirection(to, 0) - scope_DirOffset;
                        var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
                        scope_Handles[handleNumber].style[options.transformRule] = translateRule;
                        updateConnect(handleNumber);
                        updateConnect(handleNumber + 1);
                    }
                    function setZindex() {
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                            var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                            scope_Handles[handleNumber].style.zIndex = String(zIndex);
                        }));
                    }
                    function setHandle(handleNumber, to, lookBackward, lookForward, exactInput) {
                        if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);
                        if (false === to) return false;
                        updateHandlePosition(handleNumber, to);
                        return true;
                    }
                    function updateConnect(index) {
                        if (!scope_Connects[index]) return;
                        var l = 0;
                        var h = 100;
                        if (0 !== index) l = scope_Locations[index - 1];
                        if (index !== scope_Connects.length - 1) h = scope_Locations[index];
                        var connectWidth = h - l;
                        var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
                        var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
                        scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
                    }
                    function resolveToValue(to, handleNumber) {
                        if (null === to || false === to || void 0 === to) return scope_Locations[handleNumber];
                        if ("number" === typeof to) to = String(to);
                        to = options.format.from(to);
                        if (false !== to) to = scope_Spectrum.toStepping(to);
                        if (false === to || isNaN(to)) return scope_Locations[handleNumber];
                        return to;
                    }
                    function valueSet(input, fireSetEvent, exactInput) {
                        var values = asArray(input);
                        var isInit = void 0 === scope_Locations[0];
                        fireSetEvent = void 0 === fireSetEvent ? true : fireSetEvent;
                        if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
                        }));
                        var i = 1 === scope_HandleNumbers.length ? 0 : 1;
                        if (isInit && scope_Spectrum.hasNoSize()) {
                            exactInput = true;
                            scope_Locations[0] = 0;
                            if (scope_HandleNumbers.length > 1) {
                                var space_1 = 100 / (scope_HandleNumbers.length - 1);
                                scope_HandleNumbers.forEach((function(handleNumber) {
                                    scope_Locations[handleNumber] = handleNumber * space_1;
                                }));
                            }
                        }
                        for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach((function(handleNumber) {
                            setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                        }));
                        setZindex();
                        scope_HandleNumbers.forEach((function(handleNumber) {
                            fireEvent("update", handleNumber);
                            if (null !== values[handleNumber] && fireSetEvent) fireEvent("set", handleNumber);
                        }));
                    }
                    function valueReset(fireSetEvent) {
                        valueSet(options.start, fireSetEvent);
                    }
                    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
                        handleNumber = Number(handleNumber);
                        if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
                        setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
                        fireEvent("update", handleNumber);
                        if (fireSetEvent) fireEvent("set", handleNumber);
                    }
                    function valueGet(unencoded) {
                        if (void 0 === unencoded) unencoded = false;
                        if (unencoded) return 1 === scope_Values.length ? scope_Values[0] : scope_Values.slice(0);
                        var values = scope_Values.map(options.format.to);
                        if (1 === values.length) return values[0];
                        return values;
                    }
                    function destroy() {
                        removeEvent(INTERNAL_EVENT_NS.aria);
                        removeEvent(INTERNAL_EVENT_NS.tooltips);
                        Object.keys(options.cssClasses).forEach((function(key) {
                            removeClass(scope_Target, options.cssClasses[key]);
                        }));
                        while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
                        delete scope_Target.noUiSlider;
                    }
                    function getNextStepsForHandle(handleNumber) {
                        var location = scope_Locations[handleNumber];
                        var nearbySteps = scope_Spectrum.getNearbySteps(location);
                        var value = scope_Values[handleNumber];
                        var increment = nearbySteps.thisStep.step;
                        var decrement = null;
                        if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
                        if (false !== increment) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
                        if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (false === nearbySteps.stepBefore.step) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
                        if (100 === location) increment = null; else if (0 === location) decrement = null;
                        var stepDecimals = scope_Spectrum.countStepDecimals();
                        if (null !== increment && false !== increment) increment = Number(increment.toFixed(stepDecimals));
                        if (null !== decrement && false !== decrement) decrement = Number(decrement.toFixed(stepDecimals));
                        return [ decrement, increment ];
                    }
                    function getNextSteps() {
                        return scope_HandleNumbers.map(getNextStepsForHandle);
                    }
                    function updateOptions(optionsToUpdate, fireSetEvent) {
                        var v = valueGet();
                        var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips" ];
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) originalOptions[name] = optionsToUpdate[name];
                        }));
                        var newOptions = testOptions(originalOptions);
                        updateAble.forEach((function(name) {
                            if (void 0 !== optionsToUpdate[name]) options[name] = newOptions[name];
                        }));
                        scope_Spectrum = newOptions.spectrum;
                        options.margin = newOptions.margin;
                        options.limit = newOptions.limit;
                        options.padding = newOptions.padding;
                        if (options.pips) pips(options.pips); else removePips();
                        if (options.tooltips) tooltips(); else removeTooltips();
                        scope_Locations = [];
                        valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
                    }
                    function setupSlider() {
                        scope_Base = addSlider(scope_Target);
                        addElements(options.connect, scope_Base);
                        bindSliderEvents(options.events);
                        valueSet(options.start);
                        if (options.pips) pips(options.pips);
                        if (options.tooltips) tooltips();
                        aria();
                    }
                    setupSlider();
                    var scope_Self = {
                        destroy,
                        steps: getNextSteps,
                        on: bindEvent,
                        off: removeEvent,
                        get: valueGet,
                        set: valueSet,
                        setHandle: valueSetHandle,
                        reset: valueReset,
                        __moveHandles: function(upward, proposal, handleNumbers) {
                            moveHandles(upward, proposal, scope_Locations, handleNumbers);
                        },
                        options: originalOptions,
                        updateOptions,
                        target: scope_Target,
                        removePips,
                        removeTooltips,
                        getPositions: function() {
                            return scope_Locations.slice();
                        },
                        getTooltips: function() {
                            return scope_Tooltips;
                        },
                        getOrigins: function() {
                            return scope_Handles;
                        },
                        pips
                    };
                    return scope_Self;
                }
                function initialize(target, originalOptions) {
                    if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
                    if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
                    var options = testOptions(originalOptions);
                    var api = scope(target, options, originalOptions);
                    target.noUiSlider = api;
                    return api;
                }
                var nouislider = {
                    __spectrum: Spectrum,
                    cssClasses,
                    create: initialize
                };
                exports.create = initialize;
                exports.cssClasses = cssClasses;
                exports["default"] = nouislider;
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        function functions_getHash() {
            if (location.hash) return location.hash.replace("#", "");
        }
        function setHash(hash) {
            hash = hash ? `#${hash}` : window.location.href.split("#")[0];
            history.pushState("", "", hash);
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout((() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout((() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }), duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function spollers() {
            const spollersArray = document.querySelectorAll("[data-spollers]");
            if (spollersArray.length > 0) {
                const spollersRegular = Array.from(spollersArray).filter((function(item, index, self) {
                    return !item.dataset.spollers.split(",")[0];
                }));
                if (spollersRegular.length) initSpollers(spollersRegular);
                let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
                function initSpollers(spollersArray, matchMedia = false) {
                    spollersArray.forEach((spollersBlock => {
                        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                        if (matchMedia.matches || !matchMedia) {
                            spollersBlock.classList.add("_spoller-init");
                            initSpollerBody(spollersBlock);
                            spollersBlock.addEventListener("click", setSpollerAction);
                        } else {
                            spollersBlock.classList.remove("_spoller-init");
                            initSpollerBody(spollersBlock, false);
                            spollersBlock.removeEventListener("click", setSpollerAction);
                        }
                    }));
                }
                function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                    let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                    if (spollerTitles.length) {
                        spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                        spollerTitles.forEach((spollerTitle => {
                            if (hideSpollerBody) {
                                spollerTitle.removeAttribute("tabindex");
                                if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                            } else {
                                spollerTitle.setAttribute("tabindex", "-1");
                                spollerTitle.nextElementSibling.hidden = false;
                            }
                        }));
                    }
                }
                function setSpollerAction(e) {
                    const el = e.target;
                    if (el.closest("[data-spoller]")) {
                        const spollerTitle = el.closest("[data-spoller]");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                        }
                        e.preventDefault();
                    }
                }
                function hideSpollersBody(spollersBlock) {
                    const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                        spollerActiveTitle.classList.remove("_spoller-active");
                        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    }
                }
                const spollersClose = document.querySelectorAll("[data-spoller-close]");
                if (spollersClose.length) document.addEventListener("click", (function(e) {
                    const el = e.target;
                    if (!el.closest("[data-spollers]")) spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                        }
                    }));
                }));
            }
        }
        function tabs() {
            const tabs = document.querySelectorAll("[data-tabs]");
            let tabsActiveHash = [];
            if (tabs.length > 0) {
                const hash = functions_getHash();
                if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
                tabs.forEach(((tabsBlock, index) => {
                    tabsBlock.classList.add("_tab-init");
                    tabsBlock.setAttribute("data-tabs-index", index);
                    tabsBlock.addEventListener("click", setTabsAction);
                    initTabs(tabsBlock);
                }));
                let mdQueriesArray = dataMediaQueries(tabs, "tabs");
                if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
                    mdQueriesItem.matchMedia.addEventListener("change", (function() {
                        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                    }));
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                }));
            }
            function setTitlePosition(tabsMediaArray, matchMedia) {
                tabsMediaArray.forEach((tabsMediaItem => {
                    tabsMediaItem = tabsMediaItem.item;
                    let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                    let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                    let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                    let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                    tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
                    tabsContentItems.forEach(((tabsContentItem, index) => {
                        if (matchMedia.matches) {
                            tabsContent.append(tabsTitleItems[index]);
                            tabsContent.append(tabsContentItem);
                            tabsMediaItem.classList.add("_tab-spoller");
                        } else {
                            tabsTitles.append(tabsTitleItems[index]);
                            tabsMediaItem.classList.remove("_tab-spoller");
                        }
                    }));
                }));
            }
            function initTabs(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
                if (tabsActiveHashBlock) {
                    const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                    tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
                }
                if (tabsContent.length) {
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        tabsTitles[index].setAttribute("data-tabs-title", "");
                        tabsContentItem.setAttribute("data-tabs-item", "");
                        if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                        tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
                    }));
                }
            }
            function setTabsStatus(tabsBlock) {
                let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
                const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
                function isTabsAnamate(tabsBlock) {
                    if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
                }
                const tabsBlockAnimate = isTabsAnamate(tabsBlock);
                if (tabsContent.length > 0) {
                    const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                    tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
                    tabsContent.forEach(((tabsContentItem, index) => {
                        if (tabsTitles[index].classList.contains("_tab-active")) {
                            if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                            if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                        } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                    }));
                }
            }
            function setTabsAction(e) {
                const el = e.target;
                if (el.closest("[data-tabs-title]")) {
                    const tabTitle = el.closest("[data-tabs-title]");
                    const tabsBlock = tabTitle.closest("[data-tabs]");
                    if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                        let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
                        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                        tabTitle.classList.add("_tab-active");
                        setTabsStatus(tabsBlock);
                    }
                    e.preventDefault();
                }
            }
        }
        function uniqArray(array) {
            return array.filter((function(item, index, self) {
                return self.indexOf(item) === index;
            }));
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter((function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            }));
            if (media.length) {
                const breakpointsArray = [];
                media.forEach((item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                }));
                let mdQueries = breakpointsArray.map((function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                }));
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach((breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter((function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        }));
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    }));
                    return mdQueriesArray;
                }
            }
        }
        function formQuantity() {
            document.addEventListener("click", (e => {
                changeQuantity(e);
            }));
            const quantityInputs = document.querySelectorAll(".quantity__input");
            quantityInputs.forEach((quantityInput => {
                quantityInput.addEventListener("change", (e => {
                    changeQuantity(e);
                }));
                quantityInput.addEventListener("input", (e => {
                    changeQuantity(e);
                }));
            }));
        }
        function changeQuantity(e) {
            let targetElement = e.target;
            if (targetElement.closest(".quantity__button")) {
                let value = parseInt(targetElement.closest(".quantity").querySelector("input").value);
                let step = parseInt(targetElement.closest(".quantity").querySelector("input").step);
                let min = parseInt(targetElement.closest(".quantity").querySelector("input").min);
                const canBeReduced = value !== min;
                if (targetElement.classList.contains("quantity__button_plus")) value += step; else {
                    value -= step;
                    if (value < min) value = min;
                }
                targetElement.closest(".quantity").querySelector("input").value = value;
                if (document.documentElement.classList.contains("popup-show")) {
                    calcTotalCartSum();
                    const cartCounter = document.querySelector("button.actions__cart").children[1];
                    if (targetElement.classList.contains("quantity__button_plus")) cartCounter.innerHTML = Number(cartCounter.innerHTML) + 1; else if (canBeReduced) if (cartCounter.innerHTML) cartCounter.innerHTML = Number(cartCounter.innerHTML) - 1; else cartCounter.innerHTML = "0";
                    document.querySelector(".popup-cart__products-count").innerHTML = cartCounter.innerHTML;
                }
            }
        }
        function calcTotalCartSum() {
            let totalSum = document.querySelector(".summary__total-sum-value");
            let totalSumValue = 0;
            let productQuantity = document.querySelectorAll(".popup-cart .quantity__input");
            let productPricesWithSale = document.querySelectorAll(".popup-cart .product-prices__new-price>.product-prices__price");
            let productPricesWithoutSale = document.querySelectorAll(".popup-cart .price-without-sale>.product-prices__price");
            let productPricesWithSaleArray = Array.prototype.slice.call(productPricesWithSale);
            let productPricesWithoutSaleArray = Array.prototype.slice.call(productPricesWithoutSale);
            let productPrices = productPricesWithSaleArray.concat(productPricesWithoutSaleArray);
            for (let i = 0; i < productQuantity.length; i++) totalSumValue += Number(productQuantity[i].value) * Number(productPrices[i].innerHTML);
            totalSum.innerHTML = totalSumValue.toFixed(2);
        }
        function formRating() {
            const ratings = document.querySelectorAll(".rating");
            if (ratings.length > 0) initRatings();
            function initRatings() {
                let ratingActive, ratingValue;
                for (let index = 0; index < ratings.length; index++) {
                    const rating = ratings[index];
                    initRating(rating);
                }
                function initRating(rating) {
                    initRatingVars(rating);
                    setRatingActiveWidth();
                    if (rating.classList.contains("rating_set")) setRating(rating);
                }
                function initRatingVars(rating) {
                    ratingActive = rating.querySelector(".rating__active");
                    ratingValue = rating.querySelector(".rating__value");
                }
                function setRatingActiveWidth(index = ratingValue.innerHTML) {
                    const ratingActiveWidth = index / .05;
                    ratingActive.style.width = `${ratingActiveWidth}%`;
                }
                function setRating(rating) {
                    const ratingItems = rating.querySelectorAll(".rating__item");
                    for (let index = 0; index < ratingItems.length; index++) {
                        const ratingItem = ratingItems[index];
                        ratingItem.addEventListener("mouseenter", (function(e) {
                            initRatingVars(rating);
                            setRatingActiveWidth(ratingItem.value);
                        }));
                        ratingItem.addEventListener("mouseleave", (function(e) {
                            setRatingActiveWidth();
                        }));
                        ratingItem.addEventListener("click", (function(e) {
                            initRatingVars(rating);
                            if (rating.dataset.ajax) setRatingValue(ratingItem.value, rating); else {
                                ratingValue.innerHTML = index + 1;
                                setRatingActiveWidth();
                            }
                        }));
                    }
                }
                async function setRatingValue(value, rating) {
                    if (!rating.classList.contains("rating_sending")) {
                        rating.classList.add("rating_sending");
                        let response = await fetch("rating.json", {
                            method: "GET"
                        });
                        if (response.ok) {
                            const result = await response.json();
                            const newRating = result.newRating;
                            ratingValue.innerHTML = newRating;
                            setRatingActiveWidth();
                            rating.classList.remove("rating_sending");
                        } else {
                            alert("Ошибка");
                            rating.classList.remove("rating_sending");
                        }
                    }
                }
            }
        }
        /*! choices.js v9.0.1 | © 2019 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
        window.Choices = function(e) {
            var t = {};
            function i(n) {
                if (t[n]) return t[n].exports;
                var r = t[n] = {
                    i: n,
                    l: !1,
                    exports: {}
                };
                return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
            }
            return i.m = e, i.c = t, i.d = function(e, t, n) {
                i.o(e, t) || Object.defineProperty(e, t, {
                    enumerable: !0,
                    get: n
                });
            }, i.r = function(e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            }, i.t = function(e, t) {
                if (1 & t && (e = i(e)), 8 & t) return e;
                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                var n = Object.create(null);
                if (i.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e) for (var r in e) i.d(n, r, function(t) {
                    return e[t];
                }.bind(null, r));
                return n;
            }, i.n = function(e) {
                var t = e && e.__esModule ? function() {
                    return e.default;
                } : function() {
                    return e;
                };
                return i.d(t, "a", t), t;
            }, i.o = function(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }, i.p = "/public/assets/scripts/", i(i.s = 7);
        }([ function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(1);
            t.DEFAULT_CLASSNAMES = {
                containerOuter: "choices",
                containerInner: "choices__inner",
                input: "choices__input",
                inputCloned: "choices__input--cloned",
                list: "choices__list",
                listItems: "choices__list--multiple",
                listSingle: "choices__list--single",
                listDropdown: "choices__list--dropdown",
                item: "choices__item",
                itemSelectable: "choices__item--selectable",
                itemDisabled: "choices__item--disabled",
                itemChoice: "choices__item--choice",
                placeholder: "choices__placeholder",
                group: "choices__group",
                groupHeading: "choices__heading",
                button: "choices__button",
                activeState: "is-active",
                focusState: "is-focused",
                openState: "is-open",
                disabledState: "is-disabled",
                highlightedState: "is-highlighted",
                selectedState: "is-selected",
                flippedState: "is-flipped",
                loadingState: "is-loading",
                noResults: "has-no-results",
                noChoices: "has-no-choices"
            }, t.DEFAULT_CONFIG = {
                items: [],
                choices: [],
                silent: !1,
                renderChoiceLimit: -1,
                maxItemCount: -1,
                addItems: !0,
                addItemFilter: null,
                removeItems: !0,
                removeItemButton: !1,
                editItems: !1,
                duplicateItemsAllowed: !0,
                delimiter: ",",
                paste: !0,
                searchEnabled: !0,
                searchChoices: !0,
                searchFloor: 1,
                searchResultLimit: 4,
                searchFields: [ "label", "value" ],
                position: "auto",
                resetScrollPosition: !0,
                shouldSort: !0,
                shouldSortItems: !1,
                sorter: n.sortByAlpha,
                placeholder: !0,
                placeholderValue: null,
                searchPlaceholderValue: null,
                prependValue: null,
                appendValue: null,
                renderSelectedChoices: "auto",
                loadingText: "Loading...",
                noResultsText: "No results found",
                noChoicesText: "No choices to choose from",
                itemSelectText: "Press to select",
                uniqueItemText: "Only unique values can be added",
                customAddItemText: "Only values matching specific conditions can be added",
                addItemText: function(e) {
                    return 'Press Enter to add <b>"' + n.sanitise(e) + '"</b>';
                },
                maxItemText: function(e) {
                    return "Only " + e + " values can be added";
                },
                valueComparer: function(e, t) {
                    return e === t;
                },
                fuseOptions: {
                    includeScore: !0
                },
                callbackOnInit: null,
                callbackOnCreateTemplates: null,
                classNames: t.DEFAULT_CLASSNAMES
            }, t.EVENTS = {
                showDropdown: "showDropdown",
                hideDropdown: "hideDropdown",
                change: "change",
                choice: "choice",
                search: "search",
                addItem: "addItem",
                removeItem: "removeItem",
                highlightItem: "highlightItem",
                highlightChoice: "highlightChoice",
                unhighlightItem: "unhighlightItem"
            }, t.ACTION_TYPES = {
                ADD_CHOICE: "ADD_CHOICE",
                FILTER_CHOICES: "FILTER_CHOICES",
                ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
                CLEAR_CHOICES: "CLEAR_CHOICES",
                ADD_GROUP: "ADD_GROUP",
                ADD_ITEM: "ADD_ITEM",
                REMOVE_ITEM: "REMOVE_ITEM",
                HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM",
                CLEAR_ALL: "CLEAR_ALL",
                RESET_TO: "RESET_TO",
                SET_IS_LOADING: "SET_IS_LOADING"
            }, t.KEY_CODES = {
                BACK_KEY: 46,
                DELETE_KEY: 8,
                ENTER_KEY: 13,
                A_KEY: 65,
                ESC_KEY: 27,
                UP_KEY: 38,
                DOWN_KEY: 40,
                PAGE_UP_KEY: 33,
                PAGE_DOWN_KEY: 34
            }, t.TEXT_TYPE = "text", t.SELECT_ONE_TYPE = "select-one", t.SELECT_MULTIPLE_TYPE = "select-multiple", 
            t.SCROLLING_SPEED = 4;
        }, function(e, t, i) {
            "use strict";
            var n;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getRandomNumber = function(e, t) {
                return Math.floor(Math.random() * (t - e) + e);
            }, t.generateChars = function(e) {
                return Array.from({
                    length: e
                }, (function() {
                    return t.getRandomNumber(0, 36).toString(36);
                })).join("");
            }, t.generateId = function(e, i) {
                var n = e.id || e.name && e.name + "-" + t.generateChars(2) || t.generateChars(4);
                return n = i + "-" + (n = n.replace(/(:|\.|\[|\]|,)/g, ""));
            }, t.getType = function(e) {
                return Object.prototype.toString.call(e).slice(8, -1);
            }, t.isType = function(e, i) {
                return null != i && t.getType(i) === e;
            }, t.wrap = function(e, t) {
                return void 0 === t && (t = document.createElement("div")), e.nextSibling ? e.parentNode && e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode && e.parentNode.appendChild(t), 
                t.appendChild(e);
            }, t.getAdjacentEl = function(e, t, i) {
                void 0 === i && (i = 1);
                for (var n = (i > 0 ? "next" : "previous") + "ElementSibling", r = e[n]; r; ) {
                    if (r.matches(t)) return r;
                    r = r[n];
                }
                return r;
            }, t.isScrolledIntoView = function(e, t, i) {
                return void 0 === i && (i = 1), !!e && (i > 0 ? t.scrollTop + t.offsetHeight >= e.offsetTop + e.offsetHeight : e.offsetTop >= t.scrollTop);
            }, t.sanitise = function(e) {
                return "string" != typeof e ? e : e.replace(/&/g, "&amp;").replace(/>/g, "&rt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            }, t.strToEl = (n = document.createElement("div"), function(e) {
                var t = e.trim();
                n.innerHTML = t;
                for (var i = n.children[0]; n.firstChild; ) n.removeChild(n.firstChild);
                return i;
            }), t.sortByAlpha = function(e, t) {
                var i = e.value, n = e.label, r = void 0 === n ? i : n, o = t.value, s = t.label, a = void 0 === s ? o : s;
                return r.localeCompare(a, [], {
                    sensitivity: "base",
                    ignorePunctuation: !0,
                    numeric: !0
                });
            }, t.sortByScore = function(e, t) {
                var i = e.score, n = void 0 === i ? 0 : i, r = t.score;
                return n - (void 0 === r ? 0 : r);
            }, t.dispatchEvent = function(e, t, i) {
                void 0 === i && (i = null);
                var n = new CustomEvent(t, {
                    detail: i,
                    bubbles: !0,
                    cancelable: !0
                });
                return e.dispatchEvent(n);
            }, t.existsInArray = function(e, t, i) {
                return void 0 === i && (i = "value"), e.some((function(e) {
                    return "string" == typeof t ? e[i] === t.trim() : e[i] === t;
                }));
            }, t.cloneObject = function(e) {
                return JSON.parse(JSON.stringify(e));
            }, t.diff = function(e, t) {
                var i = Object.keys(e).sort(), n = Object.keys(t).sort();
                return i.filter((function(e) {
                    return n.indexOf(e) < 0;
                }));
            };
        }, function(e, t, i) {
            "use strict";
            (function(e, n) {
                var r, o = i(6);
                r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : n;
                var s = Object(o.a)(r);
                t.a = s;
            }).call(this, i(12), i(13)(e));
        }, function(e, t, i) {
            "use strict";
            i.r(t), i.d(t, "__DO_NOT_USE__ActionTypes", (function() {
                return o;
            })), i.d(t, "applyMiddleware", (function() {
                return v;
            })), i.d(t, "bindActionCreators", (function() {
                return h;
            })), i.d(t, "combineReducers", (function() {
                return l;
            })), i.d(t, "compose", (function() {
                return m;
            })), i.d(t, "createStore", (function() {
                return a;
            }));
            var n = i(2), r = function() {
                return Math.random().toString(36).substring(7).split("").join(".");
            }, o = {
                INIT: "@@redux/INIT" + r(),
                REPLACE: "@@redux/REPLACE" + r(),
                PROBE_UNKNOWN_ACTION: function() {
                    return "@@redux/PROBE_UNKNOWN_ACTION" + r();
                }
            };
            function s(e) {
                if ("object" != typeof e || null === e) return !1;
                for (var t = e; null !== Object.getPrototypeOf(t); ) t = Object.getPrototypeOf(t);
                return Object.getPrototypeOf(e) === t;
            }
            function a(e, t, i) {
                var r;
                if ("function" == typeof t && "function" == typeof i || "function" == typeof i && "function" == typeof arguments[3]) throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
                if ("function" == typeof t && void 0 === i && (i = t, t = void 0), void 0 !== i) {
                    if ("function" != typeof i) throw new Error("Expected the enhancer to be a function.");
                    return i(a)(e, t);
                }
                if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
                var c = e, l = t, u = [], h = u, d = !1;
                function p() {
                    h === u && (h = u.slice());
                }
                function f() {
                    if (d) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
                    return l;
                }
                function m(e) {
                    if ("function" != typeof e) throw new Error("Expected the listener to be a function.");
                    if (d) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                    var t = !0;
                    return p(), h.push(e), function() {
                        if (t) {
                            if (d) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                            t = !1, p();
                            var i = h.indexOf(e);
                            h.splice(i, 1);
                        }
                    };
                }
                function v(e) {
                    if (!s(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
                    if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
                    if (d) throw new Error("Reducers may not dispatch actions.");
                    try {
                        d = !0, l = c(l, e);
                    } finally {
                        d = !1;
                    }
                    for (var t = u = h, i = 0; i < t.length; i++) (0, t[i])();
                    return e;
                }
                return v({
                    type: o.INIT
                }), (r = {
                    dispatch: v,
                    subscribe: m,
                    getState: f,
                    replaceReducer: function(e) {
                        if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
                        c = e, v({
                            type: o.REPLACE
                        });
                    }
                })[n.a] = function() {
                    var e, t = m;
                    return (e = {
                        subscribe: function(e) {
                            if ("object" != typeof e || null === e) throw new TypeError("Expected the observer to be an object.");
                            function i() {
                                e.next && e.next(f());
                            }
                            return i(), {
                                unsubscribe: t(i)
                            };
                        }
                    })[n.a] = function() {
                        return this;
                    }, e;
                }, r;
            }
            function c(e, t) {
                var i = t && t.type;
                return "Given " + (i && 'action "' + String(i) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.';
            }
            function l(e) {
                for (var t = Object.keys(e), i = {}, n = 0; n < t.length; n++) {
                    var r = t[n];
                    0, "function" == typeof e[r] && (i[r] = e[r]);
                }
                var s, a = Object.keys(i);
                try {
                    !function(e) {
                        Object.keys(e).forEach((function(t) {
                            var i = e[t];
                            if (void 0 === i(void 0, {
                                type: o.INIT
                            })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
                            if (void 0 === i(void 0, {
                                type: o.PROBE_UNKNOWN_ACTION()
                            })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + o.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.');
                        }));
                    }(i);
                } catch (e) {
                    s = e;
                }
                return function(e, t) {
                    if (void 0 === e && (e = {}), s) throw s;
                    for (var n = !1, r = {}, o = 0; o < a.length; o++) {
                        var l = a[o], u = i[l], h = e[l], d = u(h, t);
                        if (void 0 === d) {
                            var p = c(l, t);
                            throw new Error(p);
                        }
                        r[l] = d, n = n || d !== h;
                    }
                    return n ? r : e;
                };
            }
            function u(e, t) {
                return function() {
                    return t(e.apply(this, arguments));
                };
            }
            function h(e, t) {
                if ("function" == typeof e) return u(e, t);
                if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
                var i = {};
                for (var n in e) {
                    var r = e[n];
                    "function" == typeof r && (i[n] = u(r, t));
                }
                return i;
            }
            function d(e, t, i) {
                return t in e ? Object.defineProperty(e, t, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = i, e;
            }
            function p(e, t) {
                var i = Object.keys(e);
                return Object.getOwnPropertySymbols && i.push.apply(i, Object.getOwnPropertySymbols(e)), 
                t && (i = i.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), i;
            }
            function f(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? p(i, !0).forEach((function(t) {
                        d(e, t, i[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : p(i).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
                    }));
                }
                return e;
            }
            function m() {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                return 0 === t.length ? function(e) {
                    return e;
                } : 1 === t.length ? t[0] : t.reduce((function(e, t) {
                    return function() {
                        return e(t.apply(void 0, arguments));
                    };
                }));
            }
            function v() {
                for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                return function(e) {
                    return function() {
                        var i = e.apply(void 0, arguments), n = function() {
                            throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
                        }, r = {
                            getState: i.getState,
                            dispatch: function() {
                                return n.apply(void 0, arguments);
                            }
                        }, o = t.map((function(e) {
                            return e(r);
                        }));
                        return f({}, i, {
                            dispatch: n = m.apply(void 0, o)(i.dispatch)
                        });
                    };
                };
            }
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = i(3), o = n(i(14)), s = n(i(15)), a = n(i(16)), c = n(i(17)), l = i(1);
            t.defaultState = {
                groups: [],
                items: [],
                choices: [],
                loading: !1
            };
            var u = r.combineReducers({
                items: o.default,
                groups: s.default,
                choices: a.default,
                loading: c.default
            });
            t.default = function(e, i) {
                var n = e;
                if ("CLEAR_ALL" === i.type) n = t.defaultState; else if ("RESET_TO" === i.type) return l.cloneObject(i.state);
                return u(n, i);
            };
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(1), r = function() {
                function e(e) {
                    var t = e.element, i = e.classNames;
                    if (this.element = t, this.classNames = i, !(t instanceof HTMLInputElement || t instanceof HTMLSelectElement)) throw new TypeError("Invalid element passed");
                    this.isDisabled = !1;
                }
                return Object.defineProperty(e.prototype, "isActive", {
                    get: function() {
                        return "active" === this.element.dataset.choice;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "dir", {
                    get: function() {
                        return this.element.dir;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "value", {
                    get: function() {
                        return this.element.value;
                    },
                    set: function(e) {
                        this.element.value = e;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.conceal = function() {
                    this.element.classList.add(this.classNames.input), this.element.hidden = !0, this.element.tabIndex = -1;
                    var e = this.element.getAttribute("style");
                    e && this.element.setAttribute("data-choice-orig-style", e), this.element.setAttribute("data-choice", "active");
                }, e.prototype.reveal = function() {
                    this.element.classList.remove(this.classNames.input), this.element.hidden = !1, 
                    this.element.removeAttribute("tabindex");
                    var e = this.element.getAttribute("data-choice-orig-style");
                    e ? (this.element.removeAttribute("data-choice-orig-style"), this.element.setAttribute("style", e)) : this.element.removeAttribute("style"), 
                    this.element.removeAttribute("data-choice"), this.element.value = this.element.value;
                }, e.prototype.enable = function() {
                    this.element.removeAttribute("disabled"), this.element.disabled = !1, this.isDisabled = !1;
                }, e.prototype.disable = function() {
                    this.element.setAttribute("disabled", ""), this.element.disabled = !0, this.isDisabled = !0;
                }, e.prototype.triggerEvent = function(e, t) {
                    n.dispatchEvent(this.element, e, t);
                }, e;
            }();
            t.default = r;
        }, function(e, t, i) {
            "use strict";
            function n(e) {
                var t, i = e.Symbol;
                return "function" == typeof i ? i.observable ? t = i.observable : (t = i("observable"), 
                i.observable = t) : t = "@@observable", t;
            }
            i.d(t, "a", (function() {
                return n;
            }));
        }, function(e, t, i) {
            e.exports = i(8);
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                var n = Array(e), r = 0;
                for (t = 0; t < i; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
                r++) n[r] = o[s];
                return n;
            }, r = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = r(i(9)), s = r(i(10)), a = r(i(11)), c = i(18), l = i(0), u = r(i(25)), h = i(26), d = i(27), p = i(28), f = i(29), m = i(1), v = i(4), _ = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style, g = {}, y = function() {
                function e(t, i) {
                    var r = this;
                    void 0 === t && (t = "[data-choice]"), void 0 === i && (i = {}), this.config = s.default.all([ l.DEFAULT_CONFIG, e.defaults.options, i ], {
                        arrayMerge: function(e, t) {
                            return n(t);
                        }
                    });
                    var o = m.diff(this.config, l.DEFAULT_CONFIG);
                    o.length && console.warn("Unknown config option(s) passed", o.join(", "));
                    var u = "string" == typeof t ? document.querySelector(t) : t;
                    if (!(u instanceof HTMLInputElement || u instanceof HTMLSelectElement)) throw TypeError("Expected one of the following types text|select-one|select-multiple");
                    if (this._isTextElement = u.type === l.TEXT_TYPE, this._isSelectOneElement = u.type === l.SELECT_ONE_TYPE, 
                    this._isSelectMultipleElement = u.type === l.SELECT_MULTIPLE_TYPE, this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement, 
                    this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled, 
                    [ "auto", "always" ].includes("" + this.config.renderSelectedChoices) || (this.config.renderSelectedChoices = "auto"), 
                    i.addItemFilter && "function" != typeof i.addItemFilter) {
                        var h = i.addItemFilter instanceof RegExp ? i.addItemFilter : new RegExp(i.addItemFilter);
                        this.config.addItemFilter = h.test.bind(h);
                    }
                    if (this._isTextElement ? this.passedElement = new c.WrappedInput({
                        element: u,
                        classNames: this.config.classNames,
                        delimiter: this.config.delimiter
                    }) : this.passedElement = new c.WrappedSelect({
                        element: u,
                        classNames: this.config.classNames,
                        template: function(e) {
                            return r._templates.option(e);
                        }
                    }), this.initialised = !1, this._store = new a.default, this._initialState = v.defaultState, 
                    this._currentState = v.defaultState, this._prevState = v.defaultState, this._currentValue = "", 
                    this._canSearch = !!this.config.searchEnabled, this._isScrollingOnIe = !1, this._highlightPosition = 0, 
                    this._wasTap = !0, this._placeholderValue = this._generatePlaceholderValue(), this._baseId = m.generateId(this.passedElement.element, "choices-"), 
                    this._direction = this.passedElement.dir, !this._direction) {
                        var d = window.getComputedStyle(this.passedElement.element).direction;
                        d !== window.getComputedStyle(document.documentElement).direction && (this._direction = d);
                    }
                    if (this._idNames = {
                        itemChoice: "item-choice"
                    }, this._isSelectElement && (this._presetGroups = this.passedElement.optionGroups, 
                    this._presetOptions = this.passedElement.options), this._presetChoices = this.config.choices, 
                    this._presetItems = this.config.items, this.passedElement.value && this._isTextElement) {
                        var p = this.passedElement.value.split(this.config.delimiter);
                        this._presetItems = this._presetItems.concat(p);
                    }
                    if (this.passedElement.options && this.passedElement.options.forEach((function(e) {
                        r._presetChoices.push({
                            value: e.value,
                            label: e.innerHTML,
                            selected: !!e.selected,
                            disabled: e.disabled || e.parentNode.disabled,
                            placeholder: "" === e.value || e.hasAttribute("placeholder"),
                            customProperties: e.dataset["custom-properties"]
                        });
                    })), this._render = this._render.bind(this), this._onFocus = this._onFocus.bind(this), 
                    this._onBlur = this._onBlur.bind(this), this._onKeyUp = this._onKeyUp.bind(this), 
                    this._onKeyDown = this._onKeyDown.bind(this), this._onClick = this._onClick.bind(this), 
                    this._onTouchMove = this._onTouchMove.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), 
                    this._onMouseDown = this._onMouseDown.bind(this), this._onMouseOver = this._onMouseOver.bind(this), 
                    this._onFormReset = this._onFormReset.bind(this), this._onSelectKey = this._onSelectKey.bind(this), 
                    this._onEnterKey = this._onEnterKey.bind(this), this._onEscapeKey = this._onEscapeKey.bind(this), 
                    this._onDirectionKey = this._onDirectionKey.bind(this), this._onDeleteKey = this._onDeleteKey.bind(this), 
                    this.passedElement.isActive) return this.config.silent || console.warn("Trying to initialise Choices on element already initialised", {
                        element: t
                    }), void (this.initialised = !0);
                    this.init();
                }
                return Object.defineProperty(e, "defaults", {
                    get: function() {
                        return Object.preventExtensions({
                            get options() {
                                return g;
                            },
                            get templates() {
                                return u.default;
                            }
                        });
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.init = function() {
                    if (!this.initialised) {
                        this._createTemplates(), this._createElements(), this._createStructure(), this._store.subscribe(this._render), 
                        this._render(), this._addEventListeners(), (!this.config.addItems || this.passedElement.element.hasAttribute("disabled")) && this.disable(), 
                        this.initialised = !0;
                        var e = this.config.callbackOnInit;
                        e && "function" == typeof e && e.call(this);
                    }
                }, e.prototype.destroy = function() {
                    this.initialised && (this._removeEventListeners(), this.passedElement.reveal(), 
                    this.containerOuter.unwrap(this.passedElement.element), this.clearStore(), this._isSelectElement && (this.passedElement.options = this._presetOptions), 
                    this._templates = u.default, this.initialised = !1);
                }, e.prototype.enable = function() {
                    return this.passedElement.isDisabled && this.passedElement.enable(), this.containerOuter.isDisabled && (this._addEventListeners(), 
                    this.input.enable(), this.containerOuter.enable()), this;
                }, e.prototype.disable = function() {
                    return this.passedElement.isDisabled || this.passedElement.disable(), this.containerOuter.isDisabled || (this._removeEventListeners(), 
                    this.input.disable(), this.containerOuter.disable()), this;
                }, e.prototype.highlightItem = function(e, t) {
                    if (void 0 === t && (t = !0), !e || !e.id) return this;
                    var i = e.id, n = e.groupId, r = void 0 === n ? -1 : n, o = e.value, s = void 0 === o ? "" : o, a = e.label, c = void 0 === a ? "" : a, u = r >= 0 ? this._store.getGroupById(r) : null;
                    return this._store.dispatch(d.highlightItem(i, !0)), t && this.passedElement.triggerEvent(l.EVENTS.highlightItem, {
                        id: i,
                        value: s,
                        label: c,
                        groupValue: u && u.value ? u.value : null
                    }), this;
                }, e.prototype.unhighlightItem = function(e) {
                    if (!e || !e.id) return this;
                    var t = e.id, i = e.groupId, n = void 0 === i ? -1 : i, r = e.value, o = void 0 === r ? "" : r, s = e.label, a = void 0 === s ? "" : s, c = n >= 0 ? this._store.getGroupById(n) : null;
                    return this._store.dispatch(d.highlightItem(t, !1)), this.passedElement.triggerEvent(l.EVENTS.highlightItem, {
                        id: t,
                        value: o,
                        label: a,
                        groupValue: c && c.value ? c.value : null
                    }), this;
                }, e.prototype.highlightAll = function() {
                    var e = this;
                    return this._store.items.forEach((function(t) {
                        return e.highlightItem(t);
                    })), this;
                }, e.prototype.unhighlightAll = function() {
                    var e = this;
                    return this._store.items.forEach((function(t) {
                        return e.unhighlightItem(t);
                    })), this;
                }, e.prototype.removeActiveItemsByValue = function(e) {
                    var t = this;
                    return this._store.activeItems.filter((function(t) {
                        return t.value === e;
                    })).forEach((function(e) {
                        return t._removeItem(e);
                    })), this;
                }, e.prototype.removeActiveItems = function(e) {
                    var t = this;
                    return this._store.activeItems.filter((function(t) {
                        return t.id !== e;
                    })).forEach((function(e) {
                        return t._removeItem(e);
                    })), this;
                }, e.prototype.removeHighlightedItems = function(e) {
                    var t = this;
                    return void 0 === e && (e = !1), this._store.highlightedActiveItems.forEach((function(i) {
                        t._removeItem(i), e && t._triggerChange(i.value);
                    })), this;
                }, e.prototype.showDropdown = function(e) {
                    var t = this;
                    return this.dropdown.isActive ? this : (requestAnimationFrame((function() {
                        t.dropdown.show(), t.containerOuter.open(t.dropdown.distanceFromTopWindow), !e && t._canSearch && t.input.focus(), 
                        t.passedElement.triggerEvent(l.EVENTS.showDropdown, {});
                    })), this);
                }, e.prototype.hideDropdown = function(e) {
                    var t = this;
                    return this.dropdown.isActive ? (requestAnimationFrame((function() {
                        t.dropdown.hide(), t.containerOuter.close(), !e && t._canSearch && (t.input.removeActiveDescendant(), 
                        t.input.blur()), t.passedElement.triggerEvent(l.EVENTS.hideDropdown, {});
                    })), this) : this;
                }, e.prototype.getValue = function(e) {
                    void 0 === e && (e = !1);
                    var t = this._store.activeItems.reduce((function(t, i) {
                        var n = e ? i.value : i;
                        return t.push(n), t;
                    }), []);
                    return this._isSelectOneElement ? t[0] : t;
                }, e.prototype.setValue = function(e) {
                    var t = this;
                    return this.initialised ? (e.forEach((function(e) {
                        return t._setChoiceOrItem(e);
                    })), this) : this;
                }, e.prototype.setChoiceByValue = function(e) {
                    var t = this;
                    return !this.initialised || this._isTextElement ? this : ((Array.isArray(e) ? e : [ e ]).forEach((function(e) {
                        return t._findAndSelectChoiceByValue(e);
                    })), this);
                }, e.prototype.setChoices = function(e, t, i, n) {
                    var r = this;
                    if (void 0 === e && (e = []), void 0 === t && (t = "value"), void 0 === i && (i = "label"), 
                    void 0 === n && (n = !1), !this.initialised) throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
                    if (!this._isSelectElement) throw new TypeError("setChoices can't be used with INPUT based Choices");
                    if ("string" != typeof t || !t) throw new TypeError("value parameter must be a name of 'value' field in passed objects");
                    if (n && this.clearChoices(), "function" == typeof e) {
                        var o = e(this);
                        if ("function" == typeof Promise && o instanceof Promise) return new Promise((function(e) {
                            return requestAnimationFrame(e);
                        })).then((function() {
                            return r._handleLoadingState(!0);
                        })).then((function() {
                            return o;
                        })).then((function(e) {
                            return r.setChoices(e, t, i, n);
                        })).catch((function(e) {
                            r.config.silent || console.error(e);
                        })).then((function() {
                            return r._handleLoadingState(!1);
                        })).then((function() {
                            return r;
                        }));
                        if (!Array.isArray(o)) throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: " + typeof o);
                        return this.setChoices(o, t, i, !1);
                    }
                    if (!Array.isArray(e)) throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
                    return this.containerOuter.removeLoadingState(), this._startLoading(), e.forEach((function(e) {
                        if (e.choices) r._addGroup({
                            id: e.id ? parseInt("" + e.id, 10) : null,
                            group: e,
                            valueKey: t,
                            labelKey: i
                        }); else {
                            var n = e;
                            r._addChoice({
                                value: n[t],
                                label: n[i],
                                isSelected: !!n.selected,
                                isDisabled: !!n.disabled,
                                placeholder: !!n.placeholder,
                                customProperties: n.customProperties
                            });
                        }
                    })), this._stopLoading(), this;
                }, e.prototype.clearChoices = function() {
                    return this._store.dispatch(h.clearChoices()), this;
                }, e.prototype.clearStore = function() {
                    return this._store.dispatch(f.clearAll()), this;
                }, e.prototype.clearInput = function() {
                    var e = !this._isSelectOneElement;
                    return this.input.clear(e), !this._isTextElement && this._canSearch && (this._isSearching = !1, 
                    this._store.dispatch(h.activateChoices(!0))), this;
                }, e.prototype._render = function() {
                    if (!this._store.isLoading()) {
                        this._currentState = this._store.state;
                        var e = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items, t = this._isSelectElement, i = this._currentState.items !== this._prevState.items;
                        e && (t && this._renderChoices(), i && this._renderItems(), this._prevState = this._currentState);
                    }
                }, e.prototype._renderChoices = function() {
                    var e = this, t = this._store, i = t.activeGroups, n = t.activeChoices, r = document.createDocumentFragment();
                    if (this.choiceList.clear(), this.config.resetScrollPosition && requestAnimationFrame((function() {
                        return e.choiceList.scrollToTop();
                    })), i.length >= 1 && !this._isSearching) {
                        var o = n.filter((function(e) {
                            return !0 === e.placeholder && -1 === e.groupId;
                        }));
                        o.length >= 1 && (r = this._createChoicesFragment(o, r)), r = this._createGroupsFragment(i, n, r);
                    } else n.length >= 1 && (r = this._createChoicesFragment(n, r));
                    if (r.childNodes && r.childNodes.length > 0) {
                        var s = this._store.activeItems, a = this._canAddItem(s, this.input.value);
                        if (a.response) this.choiceList.append(r), this._highlightChoice(); else {
                            var c = this._getTemplate("notice", a.notice);
                            this.choiceList.append(c);
                        }
                    } else {
                        var l = void 0;
                        c = void 0;
                        this._isSearching ? (c = "function" == typeof this.config.noResultsText ? this.config.noResultsText() : this.config.noResultsText, 
                        l = this._getTemplate("notice", c, "no-results")) : (c = "function" == typeof this.config.noChoicesText ? this.config.noChoicesText() : this.config.noChoicesText, 
                        l = this._getTemplate("notice", c, "no-choices")), this.choiceList.append(l);
                    }
                }, e.prototype._renderItems = function() {
                    var e = this._store.activeItems || [];
                    this.itemList.clear();
                    var t = this._createItemsFragment(e);
                    t.childNodes && this.itemList.append(t);
                }, e.prototype._createGroupsFragment = function(e, t, i) {
                    var n = this;
                    void 0 === i && (i = document.createDocumentFragment());
                    return this.config.shouldSort && e.sort(this.config.sorter), e.forEach((function(e) {
                        var r = function(e) {
                            return t.filter((function(t) {
                                return n._isSelectOneElement ? t.groupId === e.id : t.groupId === e.id && ("always" === n.config.renderSelectedChoices || !t.selected);
                            }));
                        }(e);
                        if (r.length >= 1) {
                            var o = n._getTemplate("choiceGroup", e);
                            i.appendChild(o), n._createChoicesFragment(r, i, !0);
                        }
                    })), i;
                }, e.prototype._createChoicesFragment = function(e, t, i) {
                    var r = this;
                    void 0 === t && (t = document.createDocumentFragment()), void 0 === i && (i = !1);
                    var o = this.config, s = o.renderSelectedChoices, a = o.searchResultLimit, c = o.renderChoiceLimit, l = this._isSearching ? m.sortByScore : this.config.sorter, u = function(e) {
                        if ("auto" !== s || r._isSelectOneElement || !e.selected) {
                            var i = r._getTemplate("choice", e, r.config.itemSelectText);
                            t.appendChild(i);
                        }
                    }, h = e;
                    "auto" !== s || this._isSelectOneElement || (h = e.filter((function(e) {
                        return !e.selected;
                    })));
                    var d = h.reduce((function(e, t) {
                        return t.placeholder ? e.placeholderChoices.push(t) : e.normalChoices.push(t), e;
                    }), {
                        placeholderChoices: [],
                        normalChoices: []
                    }), p = d.placeholderChoices, f = d.normalChoices;
                    (this.config.shouldSort || this._isSearching) && f.sort(l);
                    var v = h.length, _ = this._isSelectOneElement ? n(p, f) : f;
                    this._isSearching ? v = a : c && c > 0 && !i && (v = c);
                    for (var g = 0; g < v; g += 1) _[g] && u(_[g]);
                    return t;
                }, e.prototype._createItemsFragment = function(e, t) {
                    var i = this;
                    void 0 === t && (t = document.createDocumentFragment());
                    var n = this.config, r = n.shouldSortItems, o = n.sorter, s = n.removeItemButton;
                    r && !this._isSelectOneElement && e.sort(o), this._isTextElement ? this.passedElement.value = e.map((function(e) {
                        return e.value;
                    })).join(this.config.delimiter) : this.passedElement.options = e;
                    return e.forEach((function(e) {
                        var n = i._getTemplate("item", e, s);
                        t.appendChild(n);
                    })), t;
                }, e.prototype._triggerChange = function(e) {
                    null != e && this.passedElement.triggerEvent(l.EVENTS.change, {
                        value: e
                    });
                }, e.prototype._selectPlaceholderChoice = function(e) {
                    this._addItem({
                        value: e.value,
                        label: e.label,
                        choiceId: e.id,
                        groupId: e.groupId,
                        placeholder: e.placeholder
                    }), this._triggerChange(e.value);
                }, e.prototype._handleButtonAction = function(e, t) {
                    if (e && t && this.config.removeItems && this.config.removeItemButton) {
                        var i = t.parentNode && t.parentNode.dataset.id, n = i && e.find((function(e) {
                            return e.id === parseInt(i, 10);
                        }));
                        n && (this._removeItem(n), this._triggerChange(n.value), this._isSelectOneElement && this._store.placeholderChoice && this._selectPlaceholderChoice(this._store.placeholderChoice));
                    }
                }, e.prototype._handleItemAction = function(e, t, i) {
                    var n = this;
                    if (void 0 === i && (i = !1), e && t && this.config.removeItems && !this._isSelectOneElement) {
                        var r = t.dataset.id;
                        e.forEach((function(e) {
                            e.id !== parseInt("" + r, 10) || e.highlighted ? !i && e.highlighted && n.unhighlightItem(e) : n.highlightItem(e);
                        })), this.input.focus();
                    }
                }, e.prototype._handleChoiceAction = function(e, t) {
                    if (e && t) {
                        var i = t.dataset.id, n = i && this._store.getChoiceById(i);
                        if (n) {
                            var r = e[0] && e[0].keyCode ? e[0].keyCode : void 0, o = this.dropdown.isActive;
                            if (n.keyCode = r, this.passedElement.triggerEvent(l.EVENTS.choice, {
                                choice: n
                            }), !n.selected && !n.disabled) this._canAddItem(e, n.value).response && (this._addItem({
                                value: n.value,
                                label: n.label,
                                choiceId: n.id,
                                groupId: n.groupId,
                                customProperties: n.customProperties,
                                placeholder: n.placeholder,
                                keyCode: n.keyCode
                            }), this._triggerChange(n.value));
                            this.clearInput(), o && this._isSelectOneElement && (this.hideDropdown(!0), this.containerOuter.focus());
                        }
                    }
                }, e.prototype._handleBackspace = function(e) {
                    if (this.config.removeItems && e) {
                        var t = e[e.length - 1], i = e.some((function(e) {
                            return e.highlighted;
                        }));
                        this.config.editItems && !i && t ? (this.input.value = t.value, this.input.setWidth(), 
                        this._removeItem(t), this._triggerChange(t.value)) : (i || this.highlightItem(t, !1), 
                        this.removeHighlightedItems(!0));
                    }
                }, e.prototype._startLoading = function() {
                    this._store.dispatch(f.setIsLoading(!0));
                }, e.prototype._stopLoading = function() {
                    this._store.dispatch(f.setIsLoading(!1));
                }, e.prototype._handleLoadingState = function(e) {
                    void 0 === e && (e = !0);
                    var t = this.itemList.getChild("." + this.config.classNames.placeholder);
                    e ? (this.disable(), this.containerOuter.addLoadingState(), this._isSelectOneElement ? t ? t.innerHTML = this.config.loadingText : (t = this._getTemplate("placeholder", this.config.loadingText)) && this.itemList.append(t) : this.input.placeholder = this.config.loadingText) : (this.enable(), 
                    this.containerOuter.removeLoadingState(), this._isSelectOneElement ? t && (t.innerHTML = this._placeholderValue || "") : this.input.placeholder = this._placeholderValue || "");
                }, e.prototype._handleSearch = function(e) {
                    if (e && this.input.isFocussed) {
                        var t = this._store.choices, i = this.config, n = i.searchFloor, r = i.searchChoices, o = t.some((function(e) {
                            return !e.active;
                        }));
                        if (e && e.length >= n) {
                            var s = r ? this._searchChoices(e) : 0;
                            this.passedElement.triggerEvent(l.EVENTS.search, {
                                value: e,
                                resultCount: s
                            });
                        } else o && (this._isSearching = !1, this._store.dispatch(h.activateChoices(!0)));
                    }
                }, e.prototype._canAddItem = function(e, t) {
                    var i = !0, n = "function" == typeof this.config.addItemText ? this.config.addItemText(t) : this.config.addItemText;
                    if (!this._isSelectOneElement) {
                        var r = m.existsInArray(e, t);
                        this.config.maxItemCount > 0 && this.config.maxItemCount <= e.length && (i = !1, 
                        n = "function" == typeof this.config.maxItemText ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText), 
                        !this.config.duplicateItemsAllowed && r && i && (i = !1, n = "function" == typeof this.config.uniqueItemText ? this.config.uniqueItemText(t) : this.config.uniqueItemText), 
                        this._isTextElement && this.config.addItems && i && "function" == typeof this.config.addItemFilter && !this.config.addItemFilter(t) && (i = !1, 
                        n = "function" == typeof this.config.customAddItemText ? this.config.customAddItemText(t) : this.config.customAddItemText);
                    }
                    return {
                        response: i,
                        notice: n
                    };
                }, e.prototype._searchChoices = function(e) {
                    var t = "string" == typeof e ? e.trim() : e, i = "string" == typeof this._currentValue ? this._currentValue.trim() : this._currentValue;
                    if (t.length < 1 && t === i + " ") return 0;
                    var r = this._store.searchableChoices, s = t, a = n(this.config.searchFields), c = Object.assign(this.config.fuseOptions, {
                        keys: a,
                        includeMatches: !0
                    }), l = new o.default(r, c).search(s);
                    return this._currentValue = t, this._highlightPosition = 0, this._isSearching = !0, 
                    this._store.dispatch(h.filterChoices(l)), l.length;
                }, e.prototype._addEventListeners = function() {
                    var e = document.documentElement;
                    e.addEventListener("touchend", this._onTouchEnd, !0), this.containerOuter.element.addEventListener("keydown", this._onKeyDown, !0), 
                    this.containerOuter.element.addEventListener("mousedown", this._onMouseDown, !0), 
                    e.addEventListener("click", this._onClick, {
                        passive: !0
                    }), e.addEventListener("touchmove", this._onTouchMove, {
                        passive: !0
                    }), this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
                        passive: !0
                    }), this._isSelectOneElement && (this.containerOuter.element.addEventListener("focus", this._onFocus, {
                        passive: !0
                    }), this.containerOuter.element.addEventListener("blur", this._onBlur, {
                        passive: !0
                    })), this.input.element.addEventListener("keyup", this._onKeyUp, {
                        passive: !0
                    }), this.input.element.addEventListener("focus", this._onFocus, {
                        passive: !0
                    }), this.input.element.addEventListener("blur", this._onBlur, {
                        passive: !0
                    }), this.input.element.form && this.input.element.form.addEventListener("reset", this._onFormReset, {
                        passive: !0
                    }), this.input.addEventListeners();
                }, e.prototype._removeEventListeners = function() {
                    var e = document.documentElement;
                    e.removeEventListener("touchend", this._onTouchEnd, !0), this.containerOuter.element.removeEventListener("keydown", this._onKeyDown, !0), 
                    this.containerOuter.element.removeEventListener("mousedown", this._onMouseDown, !0), 
                    e.removeEventListener("click", this._onClick), e.removeEventListener("touchmove", this._onTouchMove), 
                    this.dropdown.element.removeEventListener("mouseover", this._onMouseOver), this._isSelectOneElement && (this.containerOuter.element.removeEventListener("focus", this._onFocus), 
                    this.containerOuter.element.removeEventListener("blur", this._onBlur)), this.input.element.removeEventListener("keyup", this._onKeyUp), 
                    this.input.element.removeEventListener("focus", this._onFocus), this.input.element.removeEventListener("blur", this._onBlur), 
                    this.input.element.form && this.input.element.form.removeEventListener("reset", this._onFormReset), 
                    this.input.removeEventListeners();
                }, e.prototype._onKeyDown = function(e) {
                    var t = e.keyCode, i = this._store.activeItems, n = this.input.isFocussed, r = this.dropdown.isActive, o = this.itemList.hasChildren(), s = String.fromCharCode(t), a = /[a-zA-Z0-9-_ ]/.test(s), c = l.KEY_CODES.BACK_KEY, u = l.KEY_CODES.DELETE_KEY, h = l.KEY_CODES.ENTER_KEY, d = l.KEY_CODES.A_KEY, p = l.KEY_CODES.ESC_KEY, f = l.KEY_CODES.UP_KEY, m = l.KEY_CODES.DOWN_KEY, v = l.KEY_CODES.PAGE_UP_KEY, _ = l.KEY_CODES.PAGE_DOWN_KEY;
                    switch (this._isTextElement || r || !a || (this.showDropdown(), this.input.isFocussed || (this.input.value += s.toLowerCase())), 
                    t) {
                      case d:
                        return this._onSelectKey(e, o);

                      case h:
                        return this._onEnterKey(e, i, r);

                      case p:
                        return this._onEscapeKey(r);

                      case f:
                      case v:
                      case m:
                      case _:
                        return this._onDirectionKey(e, r);

                      case u:
                      case c:
                        return this._onDeleteKey(e, i, n);
                    }
                }, e.prototype._onKeyUp = function(e) {
                    var t = e.target, i = e.keyCode, n = this.input.value, r = this._store.activeItems, o = this._canAddItem(r, n), s = l.KEY_CODES.BACK_KEY, a = l.KEY_CODES.DELETE_KEY;
                    if (this._isTextElement) if (o.notice && n) {
                        var c = this._getTemplate("notice", o.notice);
                        this.dropdown.element.innerHTML = c.outerHTML, this.showDropdown(!0);
                    } else this.hideDropdown(!0); else {
                        var u = (i === s || i === a) && t && !t.value, d = !this._isTextElement && this._isSearching, p = this._canSearch && o.response;
                        u && d ? (this._isSearching = !1, this._store.dispatch(h.activateChoices(!0))) : p && this._handleSearch(this.input.value);
                    }
                    this._canSearch = this.config.searchEnabled;
                }, e.prototype._onSelectKey = function(e, t) {
                    var i = e.ctrlKey, n = e.metaKey;
                    (i || n) && t && (this._canSearch = !1, this.config.removeItems && !this.input.value && this.input.element === document.activeElement && this.highlightAll());
                }, e.prototype._onEnterKey = function(e, t, i) {
                    var n = e.target, r = l.KEY_CODES.ENTER_KEY, o = n && n.hasAttribute("data-button");
                    if (this._isTextElement && n && n.value) {
                        var s = this.input.value;
                        this._canAddItem(t, s).response && (this.hideDropdown(!0), this._addItem({
                            value: s
                        }), this._triggerChange(s), this.clearInput());
                    }
                    if (o && (this._handleButtonAction(t, n), e.preventDefault()), i) {
                        var a = this.dropdown.getChild("." + this.config.classNames.highlightedState);
                        a && (t[0] && (t[0].keyCode = r), this._handleChoiceAction(t, a)), e.preventDefault();
                    } else this._isSelectOneElement && (this.showDropdown(), e.preventDefault());
                }, e.prototype._onEscapeKey = function(e) {
                    e && (this.hideDropdown(!0), this.containerOuter.focus());
                }, e.prototype._onDirectionKey = function(e, t) {
                    var i = e.keyCode, n = e.metaKey, r = l.KEY_CODES.DOWN_KEY, o = l.KEY_CODES.PAGE_UP_KEY, s = l.KEY_CODES.PAGE_DOWN_KEY;
                    if (t || this._isSelectOneElement) {
                        this.showDropdown(), this._canSearch = !1;
                        var a = i === r || i === s ? 1 : -1, c = void 0;
                        if (n || i === s || i === o) c = a > 0 ? this.dropdown.element.querySelector("[data-choice-selectable]:last-of-type") : this.dropdown.element.querySelector("[data-choice-selectable]"); else {
                            var u = this.dropdown.element.querySelector("." + this.config.classNames.highlightedState);
                            c = u ? m.getAdjacentEl(u, "[data-choice-selectable]", a) : this.dropdown.element.querySelector("[data-choice-selectable]");
                        }
                        c && (m.isScrolledIntoView(c, this.choiceList.element, a) || this.choiceList.scrollToChildElement(c, a), 
                        this._highlightChoice(c)), e.preventDefault();
                    }
                }, e.prototype._onDeleteKey = function(e, t, i) {
                    var n = e.target;
                    this._isSelectOneElement || n.value || !i || (this._handleBackspace(t), e.preventDefault());
                }, e.prototype._onTouchMove = function() {
                    this._wasTap && (this._wasTap = !1);
                }, e.prototype._onTouchEnd = function(e) {
                    var t = (e || e.touches[0]).target;
                    this._wasTap && this.containerOuter.element.contains(t) && ((t === this.containerOuter.element || t === this.containerInner.element) && (this._isTextElement ? this.input.focus() : this._isSelectMultipleElement && this.showDropdown()), 
                    e.stopPropagation());
                    this._wasTap = !0;
                }, e.prototype._onMouseDown = function(e) {
                    var t = e.target;
                    if (t instanceof HTMLElement) {
                        if (_ && this.choiceList.element.contains(t)) {
                            var i = this.choiceList.element.firstElementChild, n = "ltr" === this._direction ? e.offsetX >= i.offsetWidth : e.offsetX < i.offsetLeft;
                            this._isScrollingOnIe = n;
                        }
                        if (t !== this.input.element) {
                            var r = t.closest("[data-button],[data-item],[data-choice]");
                            if (r instanceof HTMLElement) {
                                var o = e.shiftKey, s = this._store.activeItems, a = r.dataset;
                                "button" in a ? this._handleButtonAction(s, r) : "item" in a ? this._handleItemAction(s, r, o) : "choice" in a && this._handleChoiceAction(s, r);
                            }
                            e.preventDefault();
                        }
                    }
                }, e.prototype._onMouseOver = function(e) {
                    var t = e.target;
                    t instanceof HTMLElement && "choice" in t.dataset && this._highlightChoice(t);
                }, e.prototype._onClick = function(e) {
                    var t = e.target;
                    this.containerOuter.element.contains(t) ? this.dropdown.isActive || this.containerOuter.isDisabled ? this._isSelectOneElement && t !== this.input.element && !this.dropdown.element.contains(t) && this.hideDropdown() : this._isTextElement ? document.activeElement !== this.input.element && this.input.focus() : (this.showDropdown(), 
                    this.containerOuter.focus()) : (this._store.highlightedActiveItems.length > 0 && this.unhighlightAll(), 
                    this.containerOuter.removeFocusState(), this.hideDropdown(!0));
                }, e.prototype._onFocus = function(e) {
                    var t, i = this, n = e.target;
                    n && this.containerOuter.element.contains(n) && ((t = {})[l.TEXT_TYPE] = function() {
                        n === i.input.element && i.containerOuter.addFocusState();
                    }, t[l.SELECT_ONE_TYPE] = function() {
                        i.containerOuter.addFocusState(), n === i.input.element && i.showDropdown(!0);
                    }, t[l.SELECT_MULTIPLE_TYPE] = function() {
                        n === i.input.element && (i.showDropdown(!0), i.containerOuter.addFocusState());
                    }, t)[this.passedElement.element.type]();
                }, e.prototype._onBlur = function(e) {
                    var t, i = this, n = e.target;
                    if (n && this.containerOuter.element.contains(n) && !this._isScrollingOnIe) {
                        var r = this._store.activeItems.some((function(e) {
                            return e.highlighted;
                        }));
                        ((t = {})[l.TEXT_TYPE] = function() {
                            n === i.input.element && (i.containerOuter.removeFocusState(), r && i.unhighlightAll(), 
                            i.hideDropdown(!0));
                        }, t[l.SELECT_ONE_TYPE] = function() {
                            i.containerOuter.removeFocusState(), (n === i.input.element || n === i.containerOuter.element && !i._canSearch) && i.hideDropdown(!0);
                        }, t[l.SELECT_MULTIPLE_TYPE] = function() {
                            n === i.input.element && (i.containerOuter.removeFocusState(), i.hideDropdown(!0), 
                            r && i.unhighlightAll());
                        }, t)[this.passedElement.element.type]();
                    } else this._isScrollingOnIe = !1, this.input.element.focus();
                }, e.prototype._onFormReset = function() {
                    this._store.dispatch(f.resetTo(this._initialState));
                }, e.prototype._highlightChoice = function(e) {
                    var t = this;
                    void 0 === e && (e = null);
                    var i = Array.from(this.dropdown.element.querySelectorAll("[data-choice-selectable]"));
                    if (i.length) {
                        var n = e;
                        Array.from(this.dropdown.element.querySelectorAll("." + this.config.classNames.highlightedState)).forEach((function(e) {
                            e.classList.remove(t.config.classNames.highlightedState), e.setAttribute("aria-selected", "false");
                        })), n ? this._highlightPosition = i.indexOf(n) : (n = i.length > this._highlightPosition ? i[this._highlightPosition] : i[i.length - 1]) || (n = i[0]), 
                        n.classList.add(this.config.classNames.highlightedState), n.setAttribute("aria-selected", "true"), 
                        this.passedElement.triggerEvent(l.EVENTS.highlightChoice, {
                            el: n
                        }), this.dropdown.isActive && (this.input.setActiveDescendant(n.id), this.containerOuter.setActiveDescendant(n.id));
                    }
                }, e.prototype._addItem = function(e) {
                    var t = e.value, i = e.label, n = void 0 === i ? null : i, r = e.choiceId, o = void 0 === r ? -1 : r, s = e.groupId, a = void 0 === s ? -1 : s, c = e.customProperties, u = void 0 === c ? {} : c, h = e.placeholder, p = void 0 !== h && h, f = e.keyCode, m = void 0 === f ? -1 : f, v = "string" == typeof t ? t.trim() : t, _ = this._store.items, g = n || v, y = o || -1, b = a >= 0 ? this._store.getGroupById(a) : null, E = _ ? _.length + 1 : 1;
                    this.config.prependValue && (v = this.config.prependValue + v.toString()), this.config.appendValue && (v += this.config.appendValue.toString()), 
                    this._store.dispatch(d.addItem({
                        value: v,
                        label: g,
                        id: E,
                        choiceId: y,
                        groupId: a,
                        customProperties: u,
                        placeholder: p,
                        keyCode: m
                    })), this._isSelectOneElement && this.removeActiveItems(E), this.passedElement.triggerEvent(l.EVENTS.addItem, {
                        id: E,
                        value: v,
                        label: g,
                        customProperties: u,
                        groupValue: b && b.value ? b.value : null,
                        keyCode: m
                    });
                }, e.prototype._removeItem = function(e) {
                    var t = e.id, i = e.value, n = e.label, r = e.customProperties, o = e.choiceId, s = e.groupId, a = s && s >= 0 ? this._store.getGroupById(s) : null;
                    t && o && (this._store.dispatch(d.removeItem(t, o)), this.passedElement.triggerEvent(l.EVENTS.removeItem, {
                        id: t,
                        value: i,
                        label: n,
                        customProperties: r,
                        groupValue: a && a.value ? a.value : null
                    }));
                }, e.prototype._addChoice = function(e) {
                    var t = e.value, i = e.label, n = void 0 === i ? null : i, r = e.isSelected, o = void 0 !== r && r, s = e.isDisabled, a = void 0 !== s && s, c = e.groupId, l = void 0 === c ? -1 : c, u = e.customProperties, d = void 0 === u ? {} : u, p = e.placeholder, f = void 0 !== p && p, m = e.keyCode, v = void 0 === m ? -1 : m;
                    if (null != t) {
                        var _ = this._store.choices, g = n || t, y = _ ? _.length + 1 : 1, b = this._baseId + "-" + this._idNames.itemChoice + "-" + y;
                        this._store.dispatch(h.addChoice({
                            id: y,
                            groupId: l,
                            elementId: b,
                            value: t,
                            label: g,
                            disabled: a,
                            customProperties: d,
                            placeholder: f,
                            keyCode: v
                        })), o && this._addItem({
                            value: t,
                            label: g,
                            choiceId: y,
                            customProperties: d,
                            placeholder: f,
                            keyCode: v
                        });
                    }
                }, e.prototype._addGroup = function(e) {
                    var t = this, i = e.group, n = e.id, r = e.valueKey, o = void 0 === r ? "value" : r, s = e.labelKey, a = void 0 === s ? "label" : s, c = m.isType("Object", i) ? i.choices : Array.from(i.getElementsByTagName("OPTION")), l = n || Math.floor((new Date).valueOf() * Math.random()), u = !!i.disabled && i.disabled;
                    if (c) {
                        this._store.dispatch(p.addGroup({
                            value: i.label,
                            id: l,
                            active: !0,
                            disabled: u
                        }));
                        c.forEach((function(e) {
                            var i = e.disabled || e.parentNode && e.parentNode.disabled;
                            t._addChoice({
                                value: e[o],
                                label: m.isType("Object", e) ? e[a] : e.innerHTML,
                                isSelected: e.selected,
                                isDisabled: i,
                                groupId: l,
                                customProperties: e.customProperties,
                                placeholder: e.placeholder
                            });
                        }));
                    } else this._store.dispatch(p.addGroup({
                        value: i.label,
                        id: i.id,
                        active: !1,
                        disabled: i.disabled
                    }));
                }, e.prototype._getTemplate = function(e) {
                    for (var t, i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
                    var o = this.config.classNames;
                    return (t = this._templates[e]).call.apply(t, n([ this, o ], i));
                }, e.prototype._createTemplates = function() {
                    var e = this.config.callbackOnCreateTemplates, t = {};
                    e && "function" == typeof e && (t = e.call(this, m.strToEl)), this._templates = s.default(u.default, t);
                }, e.prototype._createElements = function() {
                    this.containerOuter = new c.Container({
                        element: this._getTemplate("containerOuter", this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type),
                        classNames: this.config.classNames,
                        type: this.passedElement.element.type,
                        position: this.config.position
                    }), this.containerInner = new c.Container({
                        element: this._getTemplate("containerInner"),
                        classNames: this.config.classNames,
                        type: this.passedElement.element.type,
                        position: this.config.position
                    }), this.input = new c.Input({
                        element: this._getTemplate("input", this._placeholderValue),
                        classNames: this.config.classNames,
                        type: this.passedElement.element.type,
                        preventPaste: !this.config.paste
                    }), this.choiceList = new c.List({
                        element: this._getTemplate("choiceList", this._isSelectOneElement)
                    }), this.itemList = new c.List({
                        element: this._getTemplate("itemList", this._isSelectOneElement)
                    }), this.dropdown = new c.Dropdown({
                        element: this._getTemplate("dropdown"),
                        classNames: this.config.classNames,
                        type: this.passedElement.element.type
                    });
                }, e.prototype._createStructure = function() {
                    this.passedElement.conceal(), this.containerInner.wrap(this.passedElement.element), 
                    this.containerOuter.wrap(this.containerInner.element), this._isSelectOneElement ? this.input.placeholder = this.config.searchPlaceholderValue || "" : this._placeholderValue && (this.input.placeholder = this._placeholderValue, 
                    this.input.setWidth()), this.containerOuter.element.appendChild(this.containerInner.element), 
                    this.containerOuter.element.appendChild(this.dropdown.element), this.containerInner.element.appendChild(this.itemList.element), 
                    this._isTextElement || this.dropdown.element.appendChild(this.choiceList.element), 
                    this._isSelectOneElement ? this.config.searchEnabled && this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild) : this.containerInner.element.appendChild(this.input.element), 
                    this._isSelectElement && (this._highlightPosition = 0, this._isSearching = !1, this._startLoading(), 
                    this._presetGroups.length ? this._addPredefinedGroups(this._presetGroups) : this._addPredefinedChoices(this._presetChoices), 
                    this._stopLoading()), this._isTextElement && this._addPredefinedItems(this._presetItems);
                }, e.prototype._addPredefinedGroups = function(e) {
                    var t = this, i = this.passedElement.placeholderOption;
                    i && i.parentNode && "SELECT" === i.parentNode.tagName && this._addChoice({
                        value: i.value,
                        label: i.innerHTML,
                        isSelected: i.selected,
                        isDisabled: i.disabled,
                        placeholder: !0
                    }), e.forEach((function(e) {
                        return t._addGroup({
                            group: e,
                            id: e.id || null
                        });
                    }));
                }, e.prototype._addPredefinedChoices = function(e) {
                    var t = this;
                    this.config.shouldSort && e.sort(this.config.sorter);
                    var i = e.some((function(e) {
                        return e.selected;
                    })), n = e.findIndex((function(e) {
                        return void 0 === e.disabled || !e.disabled;
                    }));
                    e.forEach((function(e, r) {
                        var o = e.value, s = void 0 === o ? "" : o, a = e.label, c = e.customProperties, l = e.placeholder;
                        if (t._isSelectElement) if (e.choices) t._addGroup({
                            group: e,
                            id: e.id || null
                        }); else {
                            var u = !!(t._isSelectOneElement && !i && r === n) || e.selected, h = e.disabled;
                            t._addChoice({
                                value: s,
                                label: a,
                                isSelected: !!u,
                                isDisabled: !!h,
                                placeholder: !!l,
                                customProperties: c
                            });
                        } else t._addChoice({
                            value: s,
                            label: a,
                            isSelected: !!e.selected,
                            isDisabled: !!e.disabled,
                            placeholder: !!e.placeholder,
                            customProperties: c
                        });
                    }));
                }, e.prototype._addPredefinedItems = function(e) {
                    var t = this;
                    e.forEach((function(e) {
                        "object" == typeof e && e.value && t._addItem({
                            value: e.value,
                            label: e.label,
                            choiceId: e.id,
                            customProperties: e.customProperties,
                            placeholder: e.placeholder
                        }), "string" == typeof e && t._addItem({
                            value: e
                        });
                    }));
                }, e.prototype._setChoiceOrItem = function(e) {
                    var t = this;
                    ({
                        object: function() {
                            e.value && (t._isTextElement ? t._addItem({
                                value: e.value,
                                label: e.label,
                                choiceId: e.id,
                                customProperties: e.customProperties,
                                placeholder: e.placeholder
                            }) : t._addChoice({
                                value: e.value,
                                label: e.label,
                                isSelected: !0,
                                isDisabled: !1,
                                customProperties: e.customProperties,
                                placeholder: e.placeholder
                            }));
                        },
                        string: function() {
                            t._isTextElement ? t._addItem({
                                value: e
                            }) : t._addChoice({
                                value: e,
                                label: e,
                                isSelected: !0,
                                isDisabled: !1
                            });
                        }
                    })[m.getType(e).toLowerCase()]();
                }, e.prototype._findAndSelectChoiceByValue = function(e) {
                    var t = this, i = this._store.choices.find((function(i) {
                        return t.config.valueComparer(i.value, e);
                    }));
                    i && !i.selected && this._addItem({
                        value: i.value,
                        label: i.label,
                        choiceId: i.id,
                        groupId: i.groupId,
                        customProperties: i.customProperties,
                        placeholder: i.placeholder,
                        keyCode: i.keyCode
                    });
                }, e.prototype._generatePlaceholderValue = function() {
                    if (this._isSelectElement) {
                        var e = this.passedElement.placeholderOption;
                        return e ? e.text : null;
                    }
                    var t = this.config, i = t.placeholder, n = t.placeholderValue, r = this.passedElement.element.dataset;
                    if (i) {
                        if (n) return n;
                        if (r.placeholder) return r.placeholder;
                    }
                    return null;
                }, e;
            }();
            t.default = y;
        }, function(e, t, i) {
            /*!
     * Fuse.js v3.4.6 - Lightweight fuzzy-search (http://fusejs.io)
     *
     * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
     * All Rights Reserved. Apache Software License 2.0
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     */
            e.exports = function(e) {
                var t = {};
                function i(n) {
                    if (t[n]) return t[n].exports;
                    var r = t[n] = {
                        i: n,
                        l: !1,
                        exports: {}
                    };
                    return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
                }
                return i.m = e, i.c = t, i.d = function(e, t, n) {
                    i.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: n
                    });
                }, i.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }), Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                }, i.t = function(e, t) {
                    if (1 & t && (e = i(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                    var n = Object.create(null);
                    if (i.r(n), Object.defineProperty(n, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e) for (var r in e) i.d(n, r, function(t) {
                        return e[t];
                    }.bind(null, r));
                    return n;
                }, i.n = function(e) {
                    var t = e && e.__esModule ? function() {
                        return e.default;
                    } : function() {
                        return e;
                    };
                    return i.d(t, "a", t), t;
                }, i.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }, i.p = "", i(i.s = 1);
            }([ function(e, t) {
                e.exports = function(e) {
                    return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e);
                };
            }, function(e, t, i) {
                function n(e) {
                    return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e;
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                    })(e);
                }
                function r(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                        Object.defineProperty(e, n.key, n);
                    }
                }
                var o = i(2), s = i(8), a = i(0), c = function() {
                    function e(t, i) {
                        var n = i.location, r = void 0 === n ? 0 : n, o = i.distance, a = void 0 === o ? 100 : o, c = i.threshold, l = void 0 === c ? .6 : c, u = i.maxPatternLength, h = void 0 === u ? 32 : u, d = i.caseSensitive, p = void 0 !== d && d, f = i.tokenSeparator, m = void 0 === f ? / +/g : f, v = i.findAllMatches, _ = void 0 !== v && v, g = i.minMatchCharLength, y = void 0 === g ? 1 : g, b = i.id, E = void 0 === b ? null : b, S = i.keys, I = void 0 === S ? [] : S, O = i.shouldSort, C = void 0 === O || O, T = i.getFn, w = void 0 === T ? s : T, A = i.sortFn, L = void 0 === A ? function(e, t) {
                            return e.score - t.score;
                        } : A, P = i.tokenize, D = void 0 !== P && P, x = i.matchAllTokens, N = void 0 !== x && x, M = i.includeMatches, j = void 0 !== M && M, k = i.includeScore, F = void 0 !== k && k, K = i.verbose, R = void 0 !== K && K;
                        !function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        }(this, e), this.options = {
                            location: r,
                            distance: a,
                            threshold: l,
                            maxPatternLength: h,
                            isCaseSensitive: p,
                            tokenSeparator: m,
                            findAllMatches: _,
                            minMatchCharLength: y,
                            id: E,
                            keys: I,
                            includeMatches: j,
                            includeScore: F,
                            shouldSort: C,
                            getFn: w,
                            sortFn: L,
                            verbose: R,
                            tokenize: D,
                            matchAllTokens: N
                        }, this.setCollection(t);
                    }
                    var t, i;
                    return t = e, (i = [ {
                        key: "setCollection",
                        value: function(e) {
                            return this.list = e, e;
                        }
                    }, {
                        key: "search",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                limit: !1
                            };
                            this._log('---------\nSearch pattern: "'.concat(e, '"'));
                            var i = this._prepareSearchers(e), n = i.tokenSearchers, r = i.fullSearcher, o = this._search(n, r), s = o.weights, a = o.results;
                            return this._computeScore(s, a), this.options.shouldSort && this._sort(a), t.limit && "number" == typeof t.limit && (a = a.slice(0, t.limit)), 
                            this._format(a);
                        }
                    }, {
                        key: "_prepareSearchers",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = [];
                            if (this.options.tokenize) for (var i = e.split(this.options.tokenSeparator), n = 0, r = i.length; n < r; n += 1) t.push(new o(i[n], this.options));
                            return {
                                tokenSearchers: t,
                                fullSearcher: new o(e, this.options)
                            };
                        }
                    }, {
                        key: "_search",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 ? arguments[1] : void 0, i = this.list, n = {}, r = [];
                            if ("string" == typeof i[0]) {
                                for (var o = 0, s = i.length; o < s; o += 1) this._analyze({
                                    key: "",
                                    value: i[o],
                                    record: o,
                                    index: o
                                }, {
                                    resultMap: n,
                                    results: r,
                                    tokenSearchers: e,
                                    fullSearcher: t
                                });
                                return {
                                    weights: null,
                                    results: r
                                };
                            }
                            for (var a = {}, c = 0, l = i.length; c < l; c += 1) for (var u = i[c], h = 0, d = this.options.keys.length; h < d; h += 1) {
                                var p = this.options.keys[h];
                                if ("string" != typeof p) {
                                    if (a[p.name] = {
                                        weight: 1 - p.weight || 1
                                    }, p.weight <= 0 || p.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");
                                    p = p.name;
                                } else a[p] = {
                                    weight: 1
                                };
                                this._analyze({
                                    key: p,
                                    value: this.options.getFn(u, p),
                                    record: u,
                                    index: c
                                }, {
                                    resultMap: n,
                                    results: r,
                                    tokenSearchers: e,
                                    fullSearcher: t
                                });
                            }
                            return {
                                weights: a,
                                results: r
                            };
                        }
                    }, {
                        key: "_analyze",
                        value: function(e, t) {
                            var i = e.key, n = e.arrayIndex, r = void 0 === n ? -1 : n, o = e.value, s = e.record, c = e.index, l = t.tokenSearchers, u = void 0 === l ? [] : l, h = t.fullSearcher, d = void 0 === h ? [] : h, p = t.resultMap, f = void 0 === p ? {} : p, m = t.results, v = void 0 === m ? [] : m;
                            if (null != o) {
                                var _ = !1, g = -1, y = 0;
                                if ("string" == typeof o) {
                                    this._log("\nKey: ".concat("" === i ? "-" : i));
                                    var b = d.search(o);
                                    if (this._log('Full text: "'.concat(o, '", score: ').concat(b.score)), this.options.tokenize) {
                                        for (var E = o.split(this.options.tokenSeparator), S = [], I = 0; I < u.length; I += 1) {
                                            var O = u[I];
                                            this._log('\nPattern: "'.concat(O.pattern, '"'));
                                            for (var C = !1, T = 0; T < E.length; T += 1) {
                                                var w = E[T], A = O.search(w), L = {};
                                                A.isMatch ? (L[w] = A.score, _ = !0, C = !0, S.push(A.score)) : (L[w] = 1, this.options.matchAllTokens || S.push(1)), 
                                                this._log('Token: "'.concat(w, '", score: ').concat(L[w]));
                                            }
                                            C && (y += 1);
                                        }
                                        g = S[0];
                                        for (var P = S.length, D = 1; D < P; D += 1) g += S[D];
                                        g /= P, this._log("Token score average:", g);
                                    }
                                    var x = b.score;
                                    g > -1 && (x = (x + g) / 2), this._log("Score average:", x);
                                    var N = !this.options.tokenize || !this.options.matchAllTokens || y >= u.length;
                                    if (this._log("\nCheck Matches: ".concat(N)), (_ || b.isMatch) && N) {
                                        var M = f[c];
                                        M ? M.output.push({
                                            key: i,
                                            arrayIndex: r,
                                            value: o,
                                            score: x,
                                            matchedIndices: b.matchedIndices
                                        }) : (f[c] = {
                                            item: s,
                                            output: [ {
                                                key: i,
                                                arrayIndex: r,
                                                value: o,
                                                score: x,
                                                matchedIndices: b.matchedIndices
                                            } ]
                                        }, v.push(f[c]));
                                    }
                                } else if (a(o)) for (var j = 0, k = o.length; j < k; j += 1) this._analyze({
                                    key: i,
                                    arrayIndex: j,
                                    value: o[j],
                                    record: s,
                                    index: c
                                }, {
                                    resultMap: f,
                                    results: v,
                                    tokenSearchers: u,
                                    fullSearcher: d
                                });
                            }
                        }
                    }, {
                        key: "_computeScore",
                        value: function(e, t) {
                            this._log("\n\nComputing score:\n");
                            for (var i = 0, n = t.length; i < n; i += 1) {
                                for (var r = t[i].output, o = r.length, s = 1, a = 1, c = 0; c < o; c += 1) {
                                    var l = e ? e[r[c].key].weight : 1, u = (1 === l ? r[c].score : r[c].score || .001) * l;
                                    1 !== l ? a = Math.min(a, u) : (r[c].nScore = u, s *= u);
                                }
                                t[i].score = 1 === a ? s : a, this._log(t[i]);
                            }
                        }
                    }, {
                        key: "_sort",
                        value: function(e) {
                            this._log("\n\nSorting...."), e.sort(this.options.sortFn);
                        }
                    }, {
                        key: "_format",
                        value: function(e) {
                            var t = [];
                            if (this.options.verbose) {
                                var i = [];
                                this._log("\n\nOutput:\n\n", JSON.stringify(e, (function(e, t) {
                                    if ("object" === n(t) && null !== t) {
                                        if (-1 !== i.indexOf(t)) return;
                                        i.push(t);
                                    }
                                    return t;
                                }))), i = null;
                            }
                            var r = [];
                            this.options.includeMatches && r.push((function(e, t) {
                                var i = e.output;
                                t.matches = [];
                                for (var n = 0, r = i.length; n < r; n += 1) {
                                    var o = i[n];
                                    if (0 !== o.matchedIndices.length) {
                                        var s = {
                                            indices: o.matchedIndices,
                                            value: o.value
                                        };
                                        o.key && (s.key = o.key), o.hasOwnProperty("arrayIndex") && o.arrayIndex > -1 && (s.arrayIndex = o.arrayIndex), 
                                        t.matches.push(s);
                                    }
                                }
                            })), this.options.includeScore && r.push((function(e, t) {
                                t.score = e.score;
                            }));
                            for (var o = 0, s = e.length; o < s; o += 1) {
                                var a = e[o];
                                if (this.options.id && (a.item = this.options.getFn(a.item, this.options.id)[0]), 
                                r.length) {
                                    for (var c = {
                                        item: a.item
                                    }, l = 0, u = r.length; l < u; l += 1) r[l](a, c);
                                    t.push(c);
                                } else t.push(a.item);
                            }
                            return t;
                        }
                    }, {
                        key: "_log",
                        value: function() {
                            var e;
                            this.options.verbose && (e = console).log.apply(e, arguments);
                        }
                    } ]) && r(t.prototype, i), e;
                }();
                e.exports = c;
            }, function(e, t, i) {
                function n(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                        Object.defineProperty(e, n.key, n);
                    }
                }
                var r = i(3), o = i(4), s = i(7), a = function() {
                    function e(t, i) {
                        var n = i.location, r = void 0 === n ? 0 : n, o = i.distance, a = void 0 === o ? 100 : o, c = i.threshold, l = void 0 === c ? .6 : c, u = i.maxPatternLength, h = void 0 === u ? 32 : u, d = i.isCaseSensitive, p = void 0 !== d && d, f = i.tokenSeparator, m = void 0 === f ? / +/g : f, v = i.findAllMatches, _ = void 0 !== v && v, g = i.minMatchCharLength, y = void 0 === g ? 1 : g;
                        !function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                        }(this, e), this.options = {
                            location: r,
                            distance: a,
                            threshold: l,
                            maxPatternLength: h,
                            isCaseSensitive: p,
                            tokenSeparator: m,
                            findAllMatches: _,
                            minMatchCharLength: y
                        }, this.pattern = this.options.isCaseSensitive ? t : t.toLowerCase(), this.pattern.length <= h && (this.patternAlphabet = s(this.pattern));
                    }
                    var t, i;
                    return t = e, (i = [ {
                        key: "search",
                        value: function(e) {
                            if (this.options.isCaseSensitive || (e = e.toLowerCase()), this.pattern === e) return {
                                isMatch: !0,
                                score: 0,
                                matchedIndices: [ [ 0, e.length - 1 ] ]
                            };
                            var t = this.options, i = t.maxPatternLength, n = t.tokenSeparator;
                            if (this.pattern.length > i) return r(e, this.pattern, n);
                            var s = this.options, a = s.location, c = s.distance, l = s.threshold, u = s.findAllMatches, h = s.minMatchCharLength;
                            return o(e, this.pattern, this.patternAlphabet, {
                                location: a,
                                distance: c,
                                threshold: l,
                                findAllMatches: u,
                                minMatchCharLength: h
                            });
                        }
                    } ]) && n(t.prototype, i), e;
                }();
                e.exports = a;
            }, function(e, t) {
                var i = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
                e.exports = function(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : / +/g, r = new RegExp(t.replace(i, "\\$&").replace(n, "|")), o = e.match(r), s = !!o, a = [];
                    if (s) for (var c = 0, l = o.length; c < l; c += 1) {
                        var u = o[c];
                        a.push([ e.indexOf(u), u.length - 1 ]);
                    }
                    return {
                        score: s ? .5 : 1,
                        isMatch: s,
                        matchedIndices: a
                    };
                };
            }, function(e, t, i) {
                var n = i(5), r = i(6);
                e.exports = function(e, t, i, o) {
                    for (var s = o.location, a = void 0 === s ? 0 : s, c = o.distance, l = void 0 === c ? 100 : c, u = o.threshold, h = void 0 === u ? .6 : u, d = o.findAllMatches, p = void 0 !== d && d, f = o.minMatchCharLength, m = void 0 === f ? 1 : f, v = a, _ = e.length, g = h, y = e.indexOf(t, v), b = t.length, E = [], S = 0; S < _; S += 1) E[S] = 0;
                    if (-1 !== y) {
                        var I = n(t, {
                            errors: 0,
                            currentLocation: y,
                            expectedLocation: v,
                            distance: l
                        });
                        if (g = Math.min(I, g), -1 !== (y = e.lastIndexOf(t, v + b))) {
                            var O = n(t, {
                                errors: 0,
                                currentLocation: y,
                                expectedLocation: v,
                                distance: l
                            });
                            g = Math.min(O, g);
                        }
                    }
                    y = -1;
                    for (var C = [], T = 1, w = b + _, A = 1 << (b <= 31 ? b - 1 : 30), L = 0; L < b; L += 1) {
                        for (var P = 0, D = w; P < D; ) n(t, {
                            errors: L,
                            currentLocation: v + D,
                            expectedLocation: v,
                            distance: l
                        }) <= g ? P = D : w = D, D = Math.floor((w - P) / 2 + P);
                        w = D;
                        var x = Math.max(1, v - D + 1), N = p ? _ : Math.min(v + D, _) + b, M = Array(N + 2);
                        M[N + 1] = (1 << L) - 1;
                        for (var j = N; j >= x; j -= 1) {
                            var k = j - 1, F = i[e.charAt(k)];
                            if (F && (E[k] = 1), M[j] = (M[j + 1] << 1 | 1) & F, 0 !== L && (M[j] |= (C[j + 1] | C[j]) << 1 | 1 | C[j + 1]), 
                            M[j] & A && (T = n(t, {
                                errors: L,
                                currentLocation: k,
                                expectedLocation: v,
                                distance: l
                            })) <= g) {
                                if (g = T, (y = k) <= v) break;
                                x = Math.max(1, 2 * v - y);
                            }
                        }
                        if (n(t, {
                            errors: L + 1,
                            currentLocation: v,
                            expectedLocation: v,
                            distance: l
                        }) > g) break;
                        C = M;
                    }
                    return {
                        isMatch: y >= 0,
                        score: 0 === T ? .001 : T,
                        matchedIndices: r(E, m)
                    };
                };
            }, function(e, t) {
                e.exports = function(e, t) {
                    var i = t.errors, n = void 0 === i ? 0 : i, r = t.currentLocation, o = void 0 === r ? 0 : r, s = t.expectedLocation, a = void 0 === s ? 0 : s, c = t.distance, l = void 0 === c ? 100 : c, u = n / e.length, h = Math.abs(a - o);
                    return l ? u + h / l : h ? 1 : u;
                };
            }, function(e, t) {
                e.exports = function() {
                    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = [], n = -1, r = -1, o = 0, s = e.length; o < s; o += 1) {
                        var a = e[o];
                        a && -1 === n ? n = o : a || -1 === n || ((r = o - 1) - n + 1 >= t && i.push([ n, r ]), 
                        n = -1);
                    }
                    return e[o - 1] && o - n >= t && i.push([ n, o - 1 ]), i;
                };
            }, function(e, t) {
                e.exports = function(e) {
                    for (var t = {}, i = e.length, n = 0; n < i; n += 1) t[e.charAt(n)] = 0;
                    for (var r = 0; r < i; r += 1) t[e.charAt(r)] |= 1 << i - r - 1;
                    return t;
                };
            }, function(e, t, i) {
                var n = i(0);
                e.exports = function(e, t) {
                    return function e(t, i, r) {
                        if (i) {
                            var o = i.indexOf("."), s = i, a = null;
                            -1 !== o && (s = i.slice(0, o), a = i.slice(o + 1));
                            var c = t[s];
                            if (null != c) if (a || "string" != typeof c && "number" != typeof c) if (n(c)) for (var l = 0, u = c.length; l < u; l += 1) e(c[l], a, r); else a && e(c, a, r); else r.push(c.toString());
                        } else r.push(t);
                        return r;
                    }(e, t, []);
                };
            } ]);
        }, function(e, t, i) {
            "use strict";
            var n = function(e) {
                return function(e) {
                    return !!e && "object" == typeof e;
                }(e) && !function(e) {
                    var t = Object.prototype.toString.call(e);
                    return "[object RegExp]" === t || "[object Date]" === t || function(e) {
                        return e.$$typeof === r;
                    }(e);
                }(e);
            };
            var r = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;
            function o(e, t) {
                return !1 !== t.clone && t.isMergeableObject(e) ? l((i = e, Array.isArray(i) ? [] : {}), e, t) : e;
                var i;
            }
            function s(e, t, i) {
                return e.concat(t).map((function(e) {
                    return o(e, i);
                }));
            }
            function a(e) {
                return Object.keys(e).concat(function(e) {
                    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter((function(t) {
                        return e.propertyIsEnumerable(t);
                    })) : [];
                }(e));
            }
            function c(e, t, i) {
                var n = {};
                return i.isMergeableObject(e) && a(e).forEach((function(t) {
                    n[t] = o(e[t], i);
                })), a(t).forEach((function(r) {
                    (function(e, t) {
                        try {
                            return t in e && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
                        } catch (e) {
                            return !1;
                        }
                    })(e, r) || (i.isMergeableObject(t[r]) && e[r] ? n[r] = function(e, t) {
                        if (!t.customMerge) return l;
                        var i = t.customMerge(e);
                        return "function" == typeof i ? i : l;
                    }(r, i)(e[r], t[r], i) : n[r] = o(t[r], i));
                })), n;
            }
            function l(e, t, i) {
                (i = i || {}).arrayMerge = i.arrayMerge || s, i.isMergeableObject = i.isMergeableObject || n, 
                i.cloneUnlessOtherwiseSpecified = o;
                var r = Array.isArray(t);
                return r === Array.isArray(e) ? r ? i.arrayMerge(e, t, i) : c(e, t, i) : o(t, i);
            }
            l.all = function(e, t) {
                if (!Array.isArray(e)) throw new Error("first argument should be an array");
                return e.reduce((function(e, i) {
                    return l(e, i, t);
                }), {});
            };
            var u = l;
            e.exports = u;
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                var n = Array(e), r = 0;
                for (t = 0; t < i; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
                r++) n[r] = o[s];
                return n;
            }, r = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = i(3), s = r(i(4)), a = function() {
                function e() {
                    this._store = o.createStore(s.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
                }
                return e.prototype.subscribe = function(e) {
                    this._store.subscribe(e);
                }, e.prototype.dispatch = function(e) {
                    this._store.dispatch(e);
                }, Object.defineProperty(e.prototype, "state", {
                    get: function() {
                        return this._store.getState();
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "items", {
                    get: function() {
                        return this.state.items;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "activeItems", {
                    get: function() {
                        return this.items.filter((function(e) {
                            return !0 === e.active;
                        }));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "highlightedActiveItems", {
                    get: function() {
                        return this.items.filter((function(e) {
                            return e.active && e.highlighted;
                        }));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "choices", {
                    get: function() {
                        return this.state.choices;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "activeChoices", {
                    get: function() {
                        return this.choices.filter((function(e) {
                            return !0 === e.active;
                        }));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "selectableChoices", {
                    get: function() {
                        return this.choices.filter((function(e) {
                            return !0 !== e.disabled;
                        }));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "searchableChoices", {
                    get: function() {
                        return this.selectableChoices.filter((function(e) {
                            return !0 !== e.placeholder;
                        }));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "placeholderChoice", {
                    get: function() {
                        return n(this.choices).reverse().find((function(e) {
                            return !0 === e.placeholder;
                        }));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "groups", {
                    get: function() {
                        return this.state.groups;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "activeGroups", {
                    get: function() {
                        var e = this.groups, t = this.choices;
                        return e.filter((function(e) {
                            var i = !0 === e.active && !1 === e.disabled, n = t.some((function(e) {
                                return !0 === e.active && !1 === e.disabled;
                            }));
                            return i && n;
                        }), []);
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.isLoading = function() {
                    return this.state.loading;
                }, e.prototype.getChoiceById = function(e) {
                    return this.activeChoices.find((function(t) {
                        return t.id === parseInt(e, 10);
                    }));
                }, e.prototype.getGroupById = function(e) {
                    return this.groups.find((function(t) {
                        return t.id === e;
                    }));
                }, e;
            }();
            t.default = a;
        }, function(e, t) {
            var i;
            i = function() {
                return this;
            }();
            try {
                i = i || new Function("return this")();
            } catch (e) {
                "object" == typeof window && (i = window);
            }
            e.exports = i;
        }, function(e, t) {
            e.exports = function(e) {
                if (!e.webpackPolyfill) {
                    var t = Object.create(e);
                    t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                        enumerable: !0,
                        get: function() {
                            return t.l;
                        }
                    }), Object.defineProperty(t, "id", {
                        enumerable: !0,
                        get: function() {
                            return t.i;
                        }
                    }), Object.defineProperty(t, "exports", {
                        enumerable: !0
                    }), t.webpackPolyfill = 1;
                }
                return t;
            };
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                var n = Array(e), r = 0;
                for (t = 0; t < i; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
                r++) n[r] = o[s];
                return n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.defaultState = [], t.default = function(e, i) {
                switch (void 0 === e && (e = t.defaultState), i.type) {
                  case "ADD_ITEM":
                    var r = i;
                    return n(e, [ {
                        id: r.id,
                        choiceId: r.choiceId,
                        groupId: r.groupId,
                        value: r.value,
                        label: r.label,
                        active: !0,
                        highlighted: !1,
                        customProperties: r.customProperties,
                        placeholder: r.placeholder || !1,
                        keyCode: null
                    } ]).map((function(e) {
                        var t = e;
                        return t.highlighted = !1, t;
                    }));

                  case "REMOVE_ITEM":
                    return e.map((function(e) {
                        var t = e;
                        return t.id === i.id && (t.active = !1), t;
                    }));

                  case "HIGHLIGHT_ITEM":
                    var o = i;
                    return e.map((function(e) {
                        var t = e;
                        return t.id === o.id && (t.highlighted = o.highlighted), t;
                    }));

                  default:
                    return e;
                }
            };
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                var n = Array(e), r = 0;
                for (t = 0; t < i; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
                r++) n[r] = o[s];
                return n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.defaultState = [], t.default = function(e, i) {
                switch (void 0 === e && (e = t.defaultState), i.type) {
                  case "ADD_GROUP":
                    var r = i;
                    return n(e, [ {
                        id: r.id,
                        value: r.value,
                        active: r.active,
                        disabled: r.disabled
                    } ]);

                  case "CLEAR_CHOICES":
                    return [];

                  default:
                    return e;
                }
            };
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__spreadArrays || function() {
                for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
                var n = Array(e), r = 0;
                for (t = 0; t < i; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, 
                r++) n[r] = o[s];
                return n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.defaultState = [], t.default = function(e, i) {
                switch (void 0 === e && (e = t.defaultState), i.type) {
                  case "ADD_CHOICE":
                    var r = i, o = {
                        id: r.id,
                        elementId: r.elementId,
                        groupId: r.groupId,
                        value: r.value,
                        label: r.label || r.value,
                        disabled: r.disabled || !1,
                        selected: !1,
                        active: !0,
                        score: 9999,
                        customProperties: r.customProperties,
                        placeholder: r.placeholder || !1
                    };
                    return n(e, [ o ]);

                  case "ADD_ITEM":
                    var s = i;
                    return s.choiceId > -1 ? e.map((function(e) {
                        var t = e;
                        return t.id === parseInt("" + s.choiceId, 10) && (t.selected = !0), t;
                    })) : e;

                  case "REMOVE_ITEM":
                    var a = i;
                    return a.choiceId && a.choiceId > -1 ? e.map((function(e) {
                        var t = e;
                        return t.id === parseInt("" + a.choiceId, 10) && (t.selected = !1), t;
                    })) : e;

                  case "FILTER_CHOICES":
                    var c = i;
                    return e.map((function(e) {
                        var t = e;
                        return t.active = c.results.some((function(e) {
                            var i = e.item, n = e.score;
                            return i.id === t.id && (t.score = n, !0);
                        })), t;
                    }));

                  case "ACTIVATE_CHOICES":
                    var l = i;
                    return e.map((function(e) {
                        var t = e;
                        return t.active = l.active, t;
                    }));

                  case "CLEAR_CHOICES":
                    return t.defaultState;

                  default:
                    return e;
                }
            };
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.defaultState = !1;
            t.default = function(e, i) {
                switch (void 0 === e && (e = t.defaultState), i.type) {
                  case "SET_IS_LOADING":
                    return i.isLoading;

                  default:
                    return e;
                }
            };
        }, function(e, t, i) {
            "use strict";
            var n = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = n(i(19));
            t.Dropdown = r.default;
            var o = n(i(20));
            t.Container = o.default;
            var s = n(i(21));
            t.Input = s.default;
            var a = n(i(22));
            t.List = a.default;
            var c = n(i(23));
            t.WrappedInput = c.default;
            var l = n(i(24));
            t.WrappedSelect = l.default;
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function e(e) {
                    var t = e.element, i = e.type, n = e.classNames;
                    this.element = t, this.classNames = n, this.type = i, this.isActive = !1;
                }
                return Object.defineProperty(e.prototype, "distanceFromTopWindow", {
                    get: function() {
                        return this.element.getBoundingClientRect().bottom;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.getChild = function(e) {
                    return this.element.querySelector(e);
                }, e.prototype.show = function() {
                    return this.element.classList.add(this.classNames.activeState), this.element.setAttribute("aria-expanded", "true"), 
                    this.isActive = !0, this;
                }, e.prototype.hide = function() {
                    return this.element.classList.remove(this.classNames.activeState), this.element.setAttribute("aria-expanded", "false"), 
                    this.isActive = !1, this;
                }, e;
            }();
            t.default = n;
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(1), r = i(0), o = function() {
                function e(e) {
                    var t = e.element, i = e.type, n = e.classNames, r = e.position;
                    this.element = t, this.classNames = n, this.type = i, this.position = r, this.isOpen = !1, 
                    this.isFlipped = !1, this.isFocussed = !1, this.isDisabled = !1, this.isLoading = !1, 
                    this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this);
                }
                return e.prototype.addEventListeners = function() {
                    this.element.addEventListener("focus", this._onFocus), this.element.addEventListener("blur", this._onBlur);
                }, e.prototype.removeEventListeners = function() {
                    this.element.removeEventListener("focus", this._onFocus), this.element.removeEventListener("blur", this._onBlur);
                }, e.prototype.shouldFlip = function(e) {
                    if ("number" != typeof e) return !1;
                    var t = !1;
                    return "auto" === this.position ? t = !window.matchMedia("(min-height: " + (e + 1) + "px)").matches : "top" === this.position && (t = !0), 
                    t;
                }, e.prototype.setActiveDescendant = function(e) {
                    this.element.setAttribute("aria-activedescendant", e);
                }, e.prototype.removeActiveDescendant = function() {
                    this.element.removeAttribute("aria-activedescendant");
                }, e.prototype.open = function(e) {
                    this.element.classList.add(this.classNames.openState), this.element.setAttribute("aria-expanded", "true"), 
                    this.isOpen = !0, this.shouldFlip(e) && (this.element.classList.add(this.classNames.flippedState), 
                    this.isFlipped = !0);
                }, e.prototype.close = function() {
                    this.element.classList.remove(this.classNames.openState), this.element.setAttribute("aria-expanded", "false"), 
                    this.removeActiveDescendant(), this.isOpen = !1, this.isFlipped && (this.element.classList.remove(this.classNames.flippedState), 
                    this.isFlipped = !1);
                }, e.prototype.focus = function() {
                    this.isFocussed || this.element.focus();
                }, e.prototype.addFocusState = function() {
                    this.element.classList.add(this.classNames.focusState);
                }, e.prototype.removeFocusState = function() {
                    this.element.classList.remove(this.classNames.focusState);
                }, e.prototype.enable = function() {
                    this.element.classList.remove(this.classNames.disabledState), this.element.removeAttribute("aria-disabled"), 
                    this.type === r.SELECT_ONE_TYPE && this.element.setAttribute("tabindex", "0"), this.isDisabled = !1;
                }, e.prototype.disable = function() {
                    this.element.classList.add(this.classNames.disabledState), this.element.setAttribute("aria-disabled", "true"), 
                    this.type === r.SELECT_ONE_TYPE && this.element.setAttribute("tabindex", "-1"), 
                    this.isDisabled = !0;
                }, e.prototype.wrap = function(e) {
                    n.wrap(e, this.element);
                }, e.prototype.unwrap = function(e) {
                    this.element.parentNode && (this.element.parentNode.insertBefore(e, this.element), 
                    this.element.parentNode.removeChild(this.element));
                }, e.prototype.addLoadingState = function() {
                    this.element.classList.add(this.classNames.loadingState), this.element.setAttribute("aria-busy", "true"), 
                    this.isLoading = !0;
                }, e.prototype.removeLoadingState = function() {
                    this.element.classList.remove(this.classNames.loadingState), this.element.removeAttribute("aria-busy"), 
                    this.isLoading = !1;
                }, e.prototype._onFocus = function() {
                    this.isFocussed = !0;
                }, e.prototype._onBlur = function() {
                    this.isFocussed = !1;
                }, e;
            }();
            t.default = o;
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(1), r = i(0), o = function() {
                function e(e) {
                    var t = e.element, i = e.type, n = e.classNames, r = e.preventPaste;
                    this.element = t, this.type = i, this.classNames = n, this.preventPaste = r, this.isFocussed = this.element.isEqualNode(document.activeElement), 
                    this.isDisabled = t.disabled, this._onPaste = this._onPaste.bind(this), this._onInput = this._onInput.bind(this), 
                    this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this);
                }
                return Object.defineProperty(e.prototype, "placeholder", {
                    set: function(e) {
                        this.element.placeholder = e;
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "value", {
                    get: function() {
                        return n.sanitise(this.element.value);
                    },
                    set: function(e) {
                        this.element.value = e;
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.addEventListeners = function() {
                    this.element.addEventListener("paste", this._onPaste), this.element.addEventListener("input", this._onInput, {
                        passive: !0
                    }), this.element.addEventListener("focus", this._onFocus, {
                        passive: !0
                    }), this.element.addEventListener("blur", this._onBlur, {
                        passive: !0
                    });
                }, e.prototype.removeEventListeners = function() {
                    this.element.removeEventListener("input", this._onInput), this.element.removeEventListener("paste", this._onPaste), 
                    this.element.removeEventListener("focus", this._onFocus), this.element.removeEventListener("blur", this._onBlur);
                }, e.prototype.enable = function() {
                    this.element.removeAttribute("disabled"), this.isDisabled = !1;
                }, e.prototype.disable = function() {
                    this.element.setAttribute("disabled", ""), this.isDisabled = !0;
                }, e.prototype.focus = function() {
                    this.isFocussed || this.element.focus();
                }, e.prototype.blur = function() {
                    this.isFocussed && this.element.blur();
                }, e.prototype.clear = function(e) {
                    return void 0 === e && (e = !0), this.element.value && (this.element.value = ""), 
                    e && this.setWidth(), this;
                }, e.prototype.setWidth = function() {
                    var e = this.element, t = e.style, i = e.value, n = e.placeholder;
                    t.minWidth = n.length + 1 + "ch", t.width = i.length + 1 + "ch";
                }, e.prototype.setActiveDescendant = function(e) {
                    this.element.setAttribute("aria-activedescendant", e);
                }, e.prototype.removeActiveDescendant = function() {
                    this.element.removeAttribute("aria-activedescendant");
                }, e.prototype._onInput = function() {
                    this.type !== r.SELECT_ONE_TYPE && this.setWidth();
                }, e.prototype._onPaste = function(e) {
                    this.preventPaste && e.preventDefault();
                }, e.prototype._onFocus = function() {
                    this.isFocussed = !0;
                }, e.prototype._onBlur = function() {
                    this.isFocussed = !1;
                }, e;
            }();
            t.default = o;
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(0), r = function() {
                function e(e) {
                    var t = e.element;
                    this.element = t, this.scrollPos = this.element.scrollTop, this.height = this.element.offsetHeight;
                }
                return e.prototype.clear = function() {
                    this.element.innerHTML = "";
                }, e.prototype.append = function(e) {
                    this.element.appendChild(e);
                }, e.prototype.getChild = function(e) {
                    return this.element.querySelector(e);
                }, e.prototype.hasChildren = function() {
                    return this.element.hasChildNodes();
                }, e.prototype.scrollToTop = function() {
                    this.element.scrollTop = 0;
                }, e.prototype.scrollToChildElement = function(e, t) {
                    var i = this;
                    if (e) {
                        var n = this.element.offsetHeight, r = this.element.scrollTop + n, o = e.offsetHeight, s = e.offsetTop + o, a = t > 0 ? this.element.scrollTop + s - r : e.offsetTop;
                        requestAnimationFrame((function() {
                            i._animateScroll(a, t);
                        }));
                    }
                }, e.prototype._scrollDown = function(e, t, i) {
                    var n = (i - e) / t, r = n > 1 ? n : 1;
                    this.element.scrollTop = e + r;
                }, e.prototype._scrollUp = function(e, t, i) {
                    var n = (e - i) / t, r = n > 1 ? n : 1;
                    this.element.scrollTop = e - r;
                }, e.prototype._animateScroll = function(e, t) {
                    var i = this, r = n.SCROLLING_SPEED, o = this.element.scrollTop, s = !1;
                    t > 0 ? (this._scrollDown(o, r, e), o < e && (s = !0)) : (this._scrollUp(o, r, e), 
                    o > e && (s = !0)), s && requestAnimationFrame((function() {
                        i._animateScroll(e, t);
                    }));
                }, e;
            }();
            t.default = r;
        }, function(e, t, i) {
            "use strict";
            var n, r = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t;
                } || function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                })(e, t);
            }, function(e, t) {
                function i() {
                    this.constructor = e;
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, 
                new i);
            }), o = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var s = function(e) {
                function t(t) {
                    var i = t.element, n = t.classNames, r = t.delimiter, o = e.call(this, {
                        element: i,
                        classNames: n
                    }) || this;
                    return o.delimiter = r, o;
                }
                return r(t, e), Object.defineProperty(t.prototype, "value", {
                    get: function() {
                        return this.element.value;
                    },
                    set: function(e) {
                        this.element.setAttribute("value", e), this.element.value = e;
                    },
                    enumerable: !0,
                    configurable: !0
                }), t;
            }(o(i(5)).default);
            t.default = s;
        }, function(e, t, i) {
            "use strict";
            var n, r = this && this.__extends || (n = function(e, t) {
                return (n = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function(e, t) {
                    e.__proto__ = t;
                } || function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
                })(e, t);
            }, function(e, t) {
                function i() {
                    this.constructor = e;
                }
                n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, 
                new i);
            }), o = this && this.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                };
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var s = function(e) {
                function t(t) {
                    var i = t.element, n = t.classNames, r = t.template, o = e.call(this, {
                        element: i,
                        classNames: n
                    }) || this;
                    return o.template = r, o;
                }
                return r(t, e), Object.defineProperty(t.prototype, "placeholderOption", {
                    get: function() {
                        return this.element.querySelector('option[value=""]') || this.element.querySelector("option[placeholder]");
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "optionGroups", {
                    get: function() {
                        return Array.from(this.element.getElementsByTagName("OPTGROUP"));
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "options", {
                    get: function() {
                        return Array.from(this.element.options);
                    },
                    set: function(e) {
                        var t = this, i = document.createDocumentFragment();
                        e.forEach((function(e) {
                            return n = e, r = t.template(n), void i.appendChild(r);
                            var n, r;
                        })), this.appendDocFragment(i);
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.appendDocFragment = function(e) {
                    this.element.innerHTML = "", this.element.appendChild(e);
                }, t;
            }(o(i(5)).default);
            t.default = s;
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = {
                containerOuter: function(e, t, i, n, r, o) {
                    var s = e.containerOuter, a = Object.assign(document.createElement("div"), {
                        className: s
                    });
                    return a.dataset.type = o, t && (a.dir = t), n && (a.tabIndex = 0), i && (a.setAttribute("role", r ? "combobox" : "listbox"), 
                    r && a.setAttribute("aria-autocomplete", "list")), a.setAttribute("aria-haspopup", "true"), 
                    a.setAttribute("aria-expanded", "false"), a;
                },
                containerInner: function(e) {
                    var t = e.containerInner;
                    return Object.assign(document.createElement("div"), {
                        className: t
                    });
                },
                itemList: function(e, t) {
                    var i = e.list, n = e.listSingle, r = e.listItems;
                    return Object.assign(document.createElement("div"), {
                        className: i + " " + (t ? n : r)
                    });
                },
                placeholder: function(e, t) {
                    var i = e.placeholder;
                    return Object.assign(document.createElement("div"), {
                        className: i,
                        innerHTML: t
                    });
                },
                item: function(e, t, i) {
                    var n = e.item, r = e.button, o = e.highlightedState, s = e.itemSelectable, a = e.placeholder, c = t.id, l = t.value, u = t.label, h = t.customProperties, d = t.active, p = t.disabled, f = t.highlighted, m = t.placeholder, v = Object.assign(document.createElement("div"), {
                        className: n,
                        innerHTML: u
                    });
                    if (Object.assign(v.dataset, {
                        item: "",
                        id: c,
                        value: l,
                        customProperties: h
                    }), d && v.setAttribute("aria-selected", "true"), p && v.setAttribute("aria-disabled", "true"), 
                    m && v.classList.add(a), v.classList.add(f ? o : s), i) {
                        p && v.classList.remove(s), v.dataset.deletable = "";
                        var _ = Object.assign(document.createElement("button"), {
                            type: "button",
                            className: r,
                            innerHTML: "Remove item"
                        });
                        _.setAttribute("aria-label", "Remove item: '" + l + "'"), _.dataset.button = "", 
                        v.appendChild(_);
                    }
                    return v;
                },
                choiceList: function(e, t) {
                    var i = e.list, n = Object.assign(document.createElement("div"), {
                        className: i
                    });
                    return t || n.setAttribute("aria-multiselectable", "true"), n.setAttribute("role", "listbox"), 
                    n;
                },
                choiceGroup: function(e, t) {
                    var i = e.group, n = e.groupHeading, r = e.itemDisabled, o = t.id, s = t.value, a = t.disabled, c = Object.assign(document.createElement("div"), {
                        className: i + " " + (a ? r : "")
                    });
                    return c.setAttribute("role", "group"), Object.assign(c.dataset, {
                        group: "",
                        id: o,
                        value: s
                    }), a && c.setAttribute("aria-disabled", "true"), c.appendChild(Object.assign(document.createElement("div"), {
                        className: n,
                        innerHTML: s
                    })), c;
                },
                choice: function(e, t, i) {
                    var n = e.item, r = e.itemChoice, o = e.itemSelectable, s = e.selectedState, a = e.itemDisabled, c = e.placeholder, l = t.id, u = t.value, h = t.label, d = t.groupId, p = t.elementId, f = t.disabled, m = t.selected, v = t.placeholder, _ = Object.assign(document.createElement("div"), {
                        id: p,
                        innerHTML: h,
                        className: n + " " + r
                    });
                    return m && _.classList.add(s), v && _.classList.add(c), _.setAttribute("role", d && d > 0 ? "treeitem" : "option"), 
                    Object.assign(_.dataset, {
                        choice: "",
                        id: l,
                        value: u,
                        selectText: i
                    }), f ? (_.classList.add(a), _.dataset.choiceDisabled = "", _.setAttribute("aria-disabled", "true")) : (_.classList.add(o), 
                    _.dataset.choiceSelectable = ""), _;
                },
                input: function(e, t) {
                    var i = e.input, n = e.inputCloned, r = Object.assign(document.createElement("input"), {
                        type: "text",
                        className: i + " " + n,
                        autocomplete: "off",
                        autocapitalize: "off",
                        spellcheck: !1
                    });
                    return r.setAttribute("role", "textbox"), r.setAttribute("aria-autocomplete", "list"), 
                    r.setAttribute("aria-label", t), r;
                },
                dropdown: function(e) {
                    var t = e.list, i = e.listDropdown, n = document.createElement("div");
                    return n.classList.add(t, i), n.setAttribute("aria-expanded", "false"), n;
                },
                notice: function(e, t, i) {
                    var n = e.item, r = e.itemChoice, o = e.noResults, s = e.noChoices;
                    void 0 === i && (i = "");
                    var a = [ n, r ];
                    return "no-choices" === i ? a.push(s) : "no-results" === i && a.push(o), Object.assign(document.createElement("div"), {
                        innerHTML: t,
                        className: a.join(" ")
                    });
                },
                option: function(e) {
                    var t = e.label, i = e.value, n = e.customProperties, r = e.active, o = e.disabled, s = new Option(t, i, !1, r);
                    return n && (s.dataset.customProperties = "" + n), s.disabled = !!o, s;
                }
            };
            t.default = n;
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(0);
            t.addChoice = function(e) {
                var t = e.value, i = e.label, r = e.id, o = e.groupId, s = e.disabled, a = e.elementId, c = e.customProperties, l = e.placeholder, u = e.keyCode;
                return {
                    type: n.ACTION_TYPES.ADD_CHOICE,
                    value: t,
                    label: i,
                    id: r,
                    groupId: o,
                    disabled: s,
                    elementId: a,
                    customProperties: c,
                    placeholder: l,
                    keyCode: u
                };
            }, t.filterChoices = function(e) {
                return {
                    type: n.ACTION_TYPES.FILTER_CHOICES,
                    results: e
                };
            }, t.activateChoices = function(e) {
                return void 0 === e && (e = !0), {
                    type: n.ACTION_TYPES.ACTIVATE_CHOICES,
                    active: e
                };
            }, t.clearChoices = function() {
                return {
                    type: n.ACTION_TYPES.CLEAR_CHOICES
                };
            };
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(0);
            t.addItem = function(e) {
                var t = e.value, i = e.label, r = e.id, o = e.choiceId, s = e.groupId, a = e.customProperties, c = e.placeholder, l = e.keyCode;
                return {
                    type: n.ACTION_TYPES.ADD_ITEM,
                    value: t,
                    label: i,
                    id: r,
                    choiceId: o,
                    groupId: s,
                    customProperties: a,
                    placeholder: c,
                    keyCode: l
                };
            }, t.removeItem = function(e, t) {
                return {
                    type: n.ACTION_TYPES.REMOVE_ITEM,
                    id: e,
                    choiceId: t
                };
            }, t.highlightItem = function(e, t) {
                return {
                    type: n.ACTION_TYPES.HIGHLIGHT_ITEM,
                    id: e,
                    highlighted: t
                };
            };
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(0);
            t.addGroup = function(e) {
                var t = e.value, i = e.id, r = e.active, o = e.disabled;
                return {
                    type: n.ACTION_TYPES.ADD_GROUP,
                    value: t,
                    id: i,
                    active: r,
                    disabled: o
                };
            };
        }, function(e, t, i) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = i(0);
            t.clearAll = function() {
                return {
                    type: n.ACTION_TYPES.CLEAR_ALL
                };
            }, t.resetTo = function(e) {
                return {
                    type: n.ACTION_TYPES.RESET_TO,
                    state: e
                };
            }, t.setIsLoading = function(e) {
                return {
                    type: n.ACTION_TYPES.SET_IS_LOADING,
                    isLoading: e
                };
            };
        } ]).default;
        var nouislider = __webpack_require__(211);
        function rangeInit() {
            const rangeItems = document.querySelectorAll("[data-range]");
            if (rangeItems.length) rangeItems.forEach((rangeItem => {
                const fromValue = rangeItem.querySelector("[data-range-from]");
                const toValue = rangeItem.querySelector("[data-range-to]");
                const inputs = [ fromValue, toValue ];
                const item = rangeItem.querySelector("[data-range-item]");
                nouislider.create(item, {
                    start: [ Number(fromValue.value), Number(toValue.value) ],
                    connect: true,
                    step: 1,
                    tooltips: [ true, true ],
                    range: {
                        min: [ Number(fromValue.dataset.rangeFrom) ],
                        max: [ Number(toValue.dataset.rangeTo) ]
                    }
                });
                item.noUiSlider.on("update", (function(values, handle) {
                    inputs[handle].value = Number(values[handle]);
                    const arrTooltips = document.querySelectorAll(".noUi-tooltip");
                    arrTooltips[handle].innerHTML = "$" + Number(values[handle]);
                }));
                const setRangeSlider = (i, value) => {
                    let arr = [ null, null ];
                    arr[i] = value;
                    item.noUiSlider.set(arr);
                };
                inputs.forEach(((el, index) => {
                    el.addEventListener("change", (e => {
                        setRangeSlider(index, e.currentTarget.value);
                    }));
                }));
            }));
        }
        rangeInit();
        function isObject(obj) {
            return null !== obj && "object" === typeof obj && "constructor" in obj && obj.constructor === Object;
        }
        function extend(target = {}, src = {}) {
            Object.keys(src).forEach((key => {
                if ("undefined" === typeof target[key]) target[key] = src[key]; else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
            }));
        }
        const ssrDocument = {
            body: {},
            addEventListener() {},
            removeEventListener() {},
            activeElement: {
                blur() {},
                nodeName: ""
            },
            querySelector() {
                return null;
            },
            querySelectorAll() {
                return [];
            },
            getElementById() {
                return null;
            },
            createEvent() {
                return {
                    initEvent() {}
                };
            },
            createElement() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute() {},
                    getElementsByTagName() {
                        return [];
                    }
                };
            },
            createElementNS() {
                return {};
            },
            importNode() {
                return null;
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            }
        };
        function ssr_window_esm_getDocument() {
            const doc = "undefined" !== typeof document ? document : {};
            extend(doc, ssrDocument);
            return doc;
        }
        const ssrWindow = {
            document: ssrDocument,
            navigator: {
                userAgent: ""
            },
            location: {
                hash: "",
                host: "",
                hostname: "",
                href: "",
                origin: "",
                pathname: "",
                protocol: "",
                search: ""
            },
            history: {
                replaceState() {},
                pushState() {},
                go() {},
                back() {}
            },
            CustomEvent: function CustomEvent() {
                return this;
            },
            addEventListener() {},
            removeEventListener() {},
            getComputedStyle() {
                return {
                    getPropertyValue() {
                        return "";
                    }
                };
            },
            Image() {},
            Date() {},
            screen: {},
            setTimeout() {},
            clearTimeout() {},
            matchMedia() {
                return {};
            },
            requestAnimationFrame(callback) {
                if ("undefined" === typeof setTimeout) {
                    callback();
                    return null;
                }
                return setTimeout(callback, 0);
            },
            cancelAnimationFrame(id) {
                if ("undefined" === typeof setTimeout) return;
                clearTimeout(id);
            }
        };
        function ssr_window_esm_getWindow() {
            const win = "undefined" !== typeof window ? window : {};
            extend(win, ssrWindow);
            return win;
        }
        function makeReactive(obj) {
            const proto = obj.__proto__;
            Object.defineProperty(obj, "__proto__", {
                get() {
                    return proto;
                },
                set(value) {
                    proto.__proto__ = value;
                }
            });
        }
        class Dom7 extends Array {
            constructor(items) {
                if ("number" === typeof items) super(items); else {
                    super(...items || []);
                    makeReactive(this);
                }
            }
        }
        function arrayFlat(arr = []) {
            const res = [];
            arr.forEach((el => {
                if (Array.isArray(el)) res.push(...arrayFlat(el)); else res.push(el);
            }));
            return res;
        }
        function arrayFilter(arr, callback) {
            return Array.prototype.filter.call(arr, callback);
        }
        function arrayUnique(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i += 1) if (-1 === uniqueArray.indexOf(arr[i])) uniqueArray.push(arr[i]);
            return uniqueArray;
        }
        function qsa(selector, context) {
            if ("string" !== typeof selector) return [ selector ];
            const a = [];
            const res = context.querySelectorAll(selector);
            for (let i = 0; i < res.length; i += 1) a.push(res[i]);
            return a;
        }
        function dom7_esm_$(selector, context) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            let arr = [];
            if (!context && selector instanceof Dom7) return selector;
            if (!selector) return new Dom7(arr);
            if ("string" === typeof selector) {
                const html = selector.trim();
                if (html.indexOf("<") >= 0 && html.indexOf(">") >= 0) {
                    let toCreate = "div";
                    if (0 === html.indexOf("<li")) toCreate = "ul";
                    if (0 === html.indexOf("<tr")) toCreate = "tbody";
                    if (0 === html.indexOf("<td") || 0 === html.indexOf("<th")) toCreate = "tr";
                    if (0 === html.indexOf("<tbody")) toCreate = "table";
                    if (0 === html.indexOf("<option")) toCreate = "select";
                    const tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for (let i = 0; i < tempParent.childNodes.length; i += 1) arr.push(tempParent.childNodes[i]);
                } else arr = qsa(selector.trim(), context || document);
            } else if (selector.nodeType || selector === window || selector === document) arr.push(selector); else if (Array.isArray(selector)) {
                if (selector instanceof Dom7) return selector;
                arr = selector;
            }
            return new Dom7(arrayUnique(arr));
        }
        dom7_esm_$.fn = Dom7.prototype;
        function addClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.add(...classNames);
            }));
            return this;
        }
        function removeClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                el.classList.remove(...classNames);
            }));
            return this;
        }
        function toggleClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            this.forEach((el => {
                classNames.forEach((className => {
                    el.classList.toggle(className);
                }));
            }));
        }
        function hasClass(...classes) {
            const classNames = arrayFlat(classes.map((c => c.split(" "))));
            return arrayFilter(this, (el => classNames.filter((className => el.classList.contains(className))).length > 0)).length > 0;
        }
        function attr(attrs, value) {
            if (1 === arguments.length && "string" === typeof attrs) {
                if (this[0]) return this[0].getAttribute(attrs);
                return;
            }
            for (let i = 0; i < this.length; i += 1) if (2 === arguments.length) this[i].setAttribute(attrs, value); else for (const attrName in attrs) {
                this[i][attrName] = attrs[attrName];
                this[i].setAttribute(attrName, attrs[attrName]);
            }
            return this;
        }
        function removeAttr(attr) {
            for (let i = 0; i < this.length; i += 1) this[i].removeAttribute(attr);
            return this;
        }
        function transform(transform) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transform = transform;
            return this;
        }
        function transition(duration) {
            for (let i = 0; i < this.length; i += 1) this[i].style.transitionDuration = "string" !== typeof duration ? `${duration}ms` : duration;
            return this;
        }
        function on(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            function handleLiveEvent(e) {
                const target = e.target;
                if (!target) return;
                const eventData = e.target.dom7EventData || [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                if (dom7_esm_$(target).is(targetSelector)) listener.apply(target, eventData); else {
                    const parents = dom7_esm_$(target).parents();
                    for (let k = 0; k < parents.length; k += 1) if (dom7_esm_$(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
                }
            }
            function handleEvent(e) {
                const eventData = e && e.target ? e.target.dom7EventData || [] : [];
                if (eventData.indexOf(e) < 0) eventData.unshift(e);
                listener.apply(this, eventData);
            }
            const events = eventType.split(" ");
            let j;
            for (let i = 0; i < this.length; i += 1) {
                const el = this[i];
                if (!targetSelector) for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7Listeners) el.dom7Listeners = {};
                    if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
                    el.dom7Listeners[event].push({
                        listener,
                        proxyListener: handleEvent
                    });
                    el.addEventListener(event, handleEvent, capture);
                } else for (j = 0; j < events.length; j += 1) {
                    const event = events[j];
                    if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
                    if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
                    el.dom7LiveListeners[event].push({
                        listener,
                        proxyListener: handleLiveEvent
                    });
                    el.addEventListener(event, handleLiveEvent, capture);
                }
            }
            return this;
        }
        function off(...args) {
            let [eventType, targetSelector, listener, capture] = args;
            if ("function" === typeof args[1]) {
                [eventType, listener, capture] = args;
                targetSelector = void 0;
            }
            if (!capture) capture = false;
            const events = eventType.split(" ");
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    let handlers;
                    if (!targetSelector && el.dom7Listeners) handlers = el.dom7Listeners[event]; else if (targetSelector && el.dom7LiveListeners) handlers = el.dom7LiveListeners[event];
                    if (handlers && handlers.length) for (let k = handlers.length - 1; k >= 0; k -= 1) {
                        const handler = handlers[k];
                        if (listener && handler.listener === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        } else if (!listener) {
                            el.removeEventListener(event, handler.proxyListener, capture);
                            handlers.splice(k, 1);
                        }
                    }
                }
            }
            return this;
        }
        function trigger(...args) {
            const window = ssr_window_esm_getWindow();
            const events = args[0].split(" ");
            const eventData = args[1];
            for (let i = 0; i < events.length; i += 1) {
                const event = events[i];
                for (let j = 0; j < this.length; j += 1) {
                    const el = this[j];
                    if (window.CustomEvent) {
                        const evt = new window.CustomEvent(event, {
                            detail: eventData,
                            bubbles: true,
                            cancelable: true
                        });
                        el.dom7EventData = args.filter(((data, dataIndex) => dataIndex > 0));
                        el.dispatchEvent(evt);
                        el.dom7EventData = [];
                        delete el.dom7EventData;
                    }
                }
            }
            return this;
        }
        function transitionEnd(callback) {
            const dom = this;
            function fireCallBack(e) {
                if (e.target !== this) return;
                callback.call(this, e);
                dom.off("transitionend", fireCallBack);
            }
            if (callback) dom.on("transitionend", fireCallBack);
            return this;
        }
        function dom7_esm_outerWidth(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue("margin-right")) + parseFloat(styles.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        }
        function dom7_esm_outerHeight(includeMargins) {
            if (this.length > 0) {
                if (includeMargins) {
                    const styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue("margin-top")) + parseFloat(styles.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        }
        function offset() {
            if (this.length > 0) {
                const window = ssr_window_esm_getWindow();
                const document = ssr_window_esm_getDocument();
                const el = this[0];
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            return null;
        }
        function styles() {
            const window = ssr_window_esm_getWindow();
            if (this[0]) return window.getComputedStyle(this[0], null);
            return {};
        }
        function css(props, value) {
            const window = ssr_window_esm_getWindow();
            let i;
            if (1 === arguments.length) if ("string" === typeof props) {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            } else {
                for (i = 0; i < this.length; i += 1) for (const prop in props) this[i].style[prop] = props[prop];
                return this;
            }
            if (2 === arguments.length && "string" === typeof props) {
                for (i = 0; i < this.length; i += 1) this[i].style[props] = value;
                return this;
            }
            return this;
        }
        function each(callback) {
            if (!callback) return this;
            this.forEach(((el, index) => {
                callback.apply(el, [ el, index ]);
            }));
            return this;
        }
        function filter(callback) {
            const result = arrayFilter(this, callback);
            return dom7_esm_$(result);
        }
        function html(html) {
            if ("undefined" === typeof html) return this[0] ? this[0].innerHTML : null;
            for (let i = 0; i < this.length; i += 1) this[i].innerHTML = html;
            return this;
        }
        function dom7_esm_text(text) {
            if ("undefined" === typeof text) return this[0] ? this[0].textContent.trim() : null;
            for (let i = 0; i < this.length; i += 1) this[i].textContent = text;
            return this;
        }
        function is(selector) {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            const el = this[0];
            let compareWith;
            let i;
            if (!el || "undefined" === typeof selector) return false;
            if ("string" === typeof selector) {
                if (el.matches) return el.matches(selector);
                if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                compareWith = dom7_esm_$(selector);
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            if (selector === document) return el === document;
            if (selector === window) return el === window;
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [ selector ] : selector;
                for (i = 0; i < compareWith.length; i += 1) if (compareWith[i] === el) return true;
                return false;
            }
            return false;
        }
        function index() {
            let child = this[0];
            let i;
            if (child) {
                i = 0;
                while (null !== (child = child.previousSibling)) if (1 === child.nodeType) i += 1;
                return i;
            }
            return;
        }
        function eq(index) {
            if ("undefined" === typeof index) return this;
            const length = this.length;
            if (index > length - 1) return dom7_esm_$([]);
            if (index < 0) {
                const returnIndex = length + index;
                if (returnIndex < 0) return dom7_esm_$([]);
                return dom7_esm_$([ this[returnIndex] ]);
            }
            return dom7_esm_$([ this[index] ]);
        }
        function append(...els) {
            let newChild;
            const document = ssr_window_esm_getDocument();
            for (let k = 0; k < els.length; k += 1) {
                newChild = els[k];
                for (let i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) this[i].appendChild(tempDiv.firstChild);
                } else if (newChild instanceof Dom7) for (let j = 0; j < newChild.length; j += 1) this[i].appendChild(newChild[j]); else this[i].appendChild(newChild);
            }
            return this;
        }
        function prepend(newChild) {
            const document = ssr_window_esm_getDocument();
            let i;
            let j;
            for (i = 0; i < this.length; i += 1) if ("string" === typeof newChild) {
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
            } else if (newChild instanceof Dom7) for (j = 0; j < newChild.length; j += 1) this[i].insertBefore(newChild[j], this[i].childNodes[0]); else this[i].insertBefore(newChild, this[i].childNodes[0]);
            return this;
        }
        function next(selector) {
            if (this.length > 0) {
                if (selector) {
                    if (this[0].nextElementSibling && dom7_esm_$(this[0].nextElementSibling).is(selector)) return dom7_esm_$([ this[0].nextElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (this[0].nextElementSibling) return dom7_esm_$([ this[0].nextElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function nextAll(selector) {
            const nextEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.nextElementSibling) {
                const next = el.nextElementSibling;
                if (selector) {
                    if (dom7_esm_$(next).is(selector)) nextEls.push(next);
                } else nextEls.push(next);
                el = next;
            }
            return dom7_esm_$(nextEls);
        }
        function prev(selector) {
            if (this.length > 0) {
                const el = this[0];
                if (selector) {
                    if (el.previousElementSibling && dom7_esm_$(el.previousElementSibling).is(selector)) return dom7_esm_$([ el.previousElementSibling ]);
                    return dom7_esm_$([]);
                }
                if (el.previousElementSibling) return dom7_esm_$([ el.previousElementSibling ]);
                return dom7_esm_$([]);
            }
            return dom7_esm_$([]);
        }
        function prevAll(selector) {
            const prevEls = [];
            let el = this[0];
            if (!el) return dom7_esm_$([]);
            while (el.previousElementSibling) {
                const prev = el.previousElementSibling;
                if (selector) {
                    if (dom7_esm_$(prev).is(selector)) prevEls.push(prev);
                } else prevEls.push(prev);
                el = prev;
            }
            return dom7_esm_$(prevEls);
        }
        function dom7_esm_parent(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) if (null !== this[i].parentNode) if (selector) {
                if (dom7_esm_$(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
            } else parents.push(this[i].parentNode);
            return dom7_esm_$(parents);
        }
        function parents(selector) {
            const parents = [];
            for (let i = 0; i < this.length; i += 1) {
                let parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if (dom7_esm_$(parent).is(selector)) parents.push(parent);
                    } else parents.push(parent);
                    parent = parent.parentNode;
                }
            }
            return dom7_esm_$(parents);
        }
        function closest(selector) {
            let closest = this;
            if ("undefined" === typeof selector) return dom7_esm_$([]);
            if (!closest.is(selector)) closest = closest.parents(selector).eq(0);
            return closest;
        }
        function find(selector) {
            const foundElements = [];
            for (let i = 0; i < this.length; i += 1) {
                const found = this[i].querySelectorAll(selector);
                for (let j = 0; j < found.length; j += 1) foundElements.push(found[j]);
            }
            return dom7_esm_$(foundElements);
        }
        function children(selector) {
            const children = [];
            for (let i = 0; i < this.length; i += 1) {
                const childNodes = this[i].children;
                for (let j = 0; j < childNodes.length; j += 1) if (!selector || dom7_esm_$(childNodes[j]).is(selector)) children.push(childNodes[j]);
            }
            return dom7_esm_$(children);
        }
        function remove() {
            for (let i = 0; i < this.length; i += 1) if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            return this;
        }
        const noTrigger = "resize scroll".split(" ");
        function shortcut(name) {
            function eventHandler(...args) {
                if ("undefined" === typeof args[0]) {
                    for (let i = 0; i < this.length; i += 1) if (noTrigger.indexOf(name) < 0) if (name in this[i]) this[i][name](); else dom7_esm_$(this[i]).trigger(name);
                    return this;
                }
                return this.on(name, ...args);
            }
            return eventHandler;
        }
        shortcut("click");
        shortcut("blur");
        shortcut("focus");
        shortcut("focusin");
        shortcut("focusout");
        shortcut("keyup");
        shortcut("keydown");
        shortcut("keypress");
        shortcut("submit");
        shortcut("change");
        shortcut("mousedown");
        shortcut("mousemove");
        shortcut("mouseup");
        shortcut("mouseenter");
        shortcut("mouseleave");
        shortcut("mouseout");
        shortcut("mouseover");
        shortcut("touchstart");
        shortcut("touchend");
        shortcut("touchmove");
        shortcut("resize");
        shortcut("scroll");
        const Methods = {
            addClass,
            removeClass,
            hasClass,
            toggleClass,
            attr,
            removeAttr,
            transform,
            transition,
            on,
            off,
            trigger,
            transitionEnd,
            outerWidth: dom7_esm_outerWidth,
            outerHeight: dom7_esm_outerHeight,
            styles,
            offset,
            css,
            each,
            html,
            text: dom7_esm_text,
            is,
            index,
            eq,
            append,
            prepend,
            next,
            nextAll,
            prev,
            prevAll,
            parent: dom7_esm_parent,
            parents,
            closest,
            find,
            children,
            filter,
            remove
        };
        Object.keys(Methods).forEach((methodName => {
            Object.defineProperty(dom7_esm_$.fn, methodName, {
                value: Methods[methodName],
                writable: true
            });
        }));
        const dom = dom7_esm_$;
        function deleteProps(obj) {
            const object = obj;
            Object.keys(object).forEach((key => {
                try {
                    object[key] = null;
                } catch (e) {}
                try {
                    delete object[key];
                } catch (e) {}
            }));
        }
        function utils_nextTick(callback, delay = 0) {
            return setTimeout(callback, delay);
        }
        function utils_now() {
            return Date.now();
        }
        function utils_getComputedStyle(el) {
            const window = ssr_window_esm_getWindow();
            let style;
            if (window.getComputedStyle) style = window.getComputedStyle(el, null);
            if (!style && el.currentStyle) style = el.currentStyle;
            if (!style) style = el.style;
            return style;
        }
        function utils_getTranslate(el, axis = "x") {
            const window = ssr_window_esm_getWindow();
            let matrix;
            let curTransform;
            let transformMatrix;
            const curStyle = utils_getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map((a => a.replace(",", "."))).join(", ");
                transformMatrix = new window.WebKitCSSMatrix("none" === curTransform ? "" : curTransform);
            } else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(",");
            }
            if ("x" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (16 === matrix.length) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
            if ("y" === axis) if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (16 === matrix.length) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
            return curTransform || 0;
        }
        function utils_isObject(o) {
            return "object" === typeof o && null !== o && o.constructor && "Object" === Object.prototype.toString.call(o).slice(8, -1);
        }
        function isNode(node) {
            if ("undefined" !== typeof window && "undefined" !== typeof window.HTMLElement) return node instanceof HTMLElement;
            return node && (1 === node.nodeType || 11 === node.nodeType);
        }
        function utils_extend(...args) {
            const to = Object(args[0]);
            const noExtend = [ "__proto__", "constructor", "prototype" ];
            for (let i = 1; i < args.length; i += 1) {
                const nextSource = args[i];
                if (void 0 !== nextSource && null !== nextSource && !isNode(nextSource)) {
                    const keysArray = Object.keys(Object(nextSource)).filter((key => noExtend.indexOf(key) < 0));
                    for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                        const nextKey = keysArray[nextIndex];
                        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (void 0 !== desc && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                            to[nextKey] = {};
                            if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                        } else to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
        function utils_setCSSProperty(el, varName, varValue) {
            el.style.setProperty(varName, varValue);
        }
        function animateCSSModeScroll({swiper, targetPosition, side}) {
            const window = ssr_window_esm_getWindow();
            const startPosition = -swiper.translate;
            let startTime = null;
            let time;
            const duration = swiper.params.speed;
            swiper.wrapperEl.style.scrollSnapType = "none";
            window.cancelAnimationFrame(swiper.cssModeFrameID);
            const dir = targetPosition > startPosition ? "next" : "prev";
            const isOutOfBound = (current, target) => "next" === dir && current >= target || "prev" === dir && current <= target;
            const animate = () => {
                time = (new Date).getTime();
                if (null === startTime) startTime = time;
                const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
                let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
                if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
                swiper.wrapperEl.scrollTo({
                    [side]: currentPosition
                });
                if (isOutOfBound(currentPosition, targetPosition)) {
                    swiper.wrapperEl.style.overflow = "hidden";
                    swiper.wrapperEl.style.scrollSnapType = "";
                    setTimeout((() => {
                        swiper.wrapperEl.style.overflow = "";
                        swiper.wrapperEl.scrollTo({
                            [side]: currentPosition
                        });
                    }));
                    window.cancelAnimationFrame(swiper.cssModeFrameID);
                    return;
                }
                swiper.cssModeFrameID = window.requestAnimationFrame(animate);
            };
            animate();
        }
        let support;
        function calcSupport() {
            const window = ssr_window_esm_getWindow();
            const document = ssr_window_esm_getDocument();
            return {
                smoothScroll: document.documentElement && "scrollBehavior" in document.documentElement.style,
                touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
                passiveListener: function checkPassiveListener() {
                    let supportsPassive = false;
                    try {
                        const opts = Object.defineProperty({}, "passive", {
                            get() {
                                supportsPassive = true;
                            }
                        });
                        window.addEventListener("testPassiveListener", null, opts);
                    } catch (e) {}
                    return supportsPassive;
                }(),
                gestures: function checkGestures() {
                    return "ongesturestart" in window;
                }()
            };
        }
        function getSupport() {
            if (!support) support = calcSupport();
            return support;
        }
        let deviceCached;
        function calcDevice({userAgent} = {}) {
            const support = getSupport();
            const window = ssr_window_esm_getWindow();
            const platform = window.navigator.platform;
            const ua = userAgent || window.navigator.userAgent;
            const device = {
                ios: false,
                android: false
            };
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            const windows = "Win32" === platform;
            let macos = "MacIntel" === platform;
            const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
            if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
                ipad = ua.match(/(Version)\/([\d.]+)/);
                if (!ipad) ipad = [ 0, 1, "13_0_0" ];
                macos = false;
            }
            if (android && !windows) {
                device.os = "android";
                device.android = true;
            }
            if (ipad || iphone || ipod) {
                device.os = "ios";
                device.ios = true;
            }
            return device;
        }
        function getDevice(overrides = {}) {
            if (!deviceCached) deviceCached = calcDevice(overrides);
            return deviceCached;
        }
        let browser;
        function calcBrowser() {
            const window = ssr_window_esm_getWindow();
            function isSafari() {
                const ua = window.navigator.userAgent.toLowerCase();
                return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
            }
            return {
                isSafari: isSafari(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent)
            };
        }
        function getBrowser() {
            if (!browser) browser = calcBrowser();
            return browser;
        }
        function Resize({swiper, on, emit}) {
            const window = ssr_window_esm_getWindow();
            let observer = null;
            const resizeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("beforeResize");
                emit("resize");
            };
            const createObserver = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                observer = new ResizeObserver((entries => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach((({contentBoxSize, contentRect, target}) => {
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    }));
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                }));
                observer.observe(swiper.el);
            };
            const removeObserver = () => {
                if (observer && observer.unobserve && swiper.el) {
                    observer.unobserve(swiper.el);
                    observer = null;
                }
            };
            const orientationChangeHandler = () => {
                if (!swiper || swiper.destroyed || !swiper.initialized) return;
                emit("orientationchange");
            };
            on("init", (() => {
                if (swiper.params.resizeObserver && "undefined" !== typeof window.ResizeObserver) {
                    createObserver();
                    return;
                }
                window.addEventListener("resize", resizeHandler);
                window.addEventListener("orientationchange", orientationChangeHandler);
            }));
            on("destroy", (() => {
                removeObserver();
                window.removeEventListener("resize", resizeHandler);
                window.removeEventListener("orientationchange", orientationChangeHandler);
            }));
        }
        function Observer({swiper, extendParams, on, emit}) {
            const observers = [];
            const window = ssr_window_esm_getWindow();
            const attach = (target, options = {}) => {
                const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
                const observer = new ObserverFunc((mutations => {
                    if (1 === mutations.length) {
                        emit("observerUpdate", mutations[0]);
                        return;
                    }
                    const observerUpdate = function observerUpdate() {
                        emit("observerUpdate", mutations[0]);
                    };
                    if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
                }));
                observer.observe(target, {
                    attributes: "undefined" === typeof options.attributes ? true : options.attributes,
                    childList: "undefined" === typeof options.childList ? true : options.childList,
                    characterData: "undefined" === typeof options.characterData ? true : options.characterData
                });
                observers.push(observer);
            };
            const init = () => {
                if (!swiper.params.observer) return;
                if (swiper.params.observeParents) {
                    const containerParents = swiper.$el.parents();
                    for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
                }
                attach(swiper.$el[0], {
                    childList: swiper.params.observeSlideChildren
                });
                attach(swiper.$wrapperEl[0], {
                    attributes: false
                });
            };
            const destroy = () => {
                observers.forEach((observer => {
                    observer.disconnect();
                }));
                observers.splice(0, observers.length);
            };
            extendParams({
                observer: false,
                observeParents: false,
                observeSlideChildren: false
            });
            on("init", init);
            on("destroy", destroy);
        }
        const events_emitter = {
            on(events, handler, priority) {
                const self = this;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                events.split(" ").forEach((event => {
                    if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                    self.eventsListeners[event][method](handler);
                }));
                return self;
            },
            once(events, handler, priority) {
                const self = this;
                if ("function" !== typeof handler) return self;
                function onceHandler(...args) {
                    self.off(events, onceHandler);
                    if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                    handler.apply(self, args);
                }
                onceHandler.__emitterProxy = handler;
                return self.on(events, onceHandler, priority);
            },
            onAny(handler, priority) {
                const self = this;
                if ("function" !== typeof handler) return self;
                const method = priority ? "unshift" : "push";
                if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
                return self;
            },
            offAny(handler) {
                const self = this;
                if (!self.eventsAnyListeners) return self;
                const index = self.eventsAnyListeners.indexOf(handler);
                if (index >= 0) self.eventsAnyListeners.splice(index, 1);
                return self;
            },
            off(events, handler) {
                const self = this;
                if (!self.eventsListeners) return self;
                events.split(" ").forEach((event => {
                    if ("undefined" === typeof handler) self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach(((eventHandler, index) => {
                        if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                    }));
                }));
                return self;
            },
            emit(...args) {
                const self = this;
                if (!self.eventsListeners) return self;
                let events;
                let data;
                let context;
                if ("string" === typeof args[0] || Array.isArray(args[0])) {
                    events = args[0];
                    data = args.slice(1, args.length);
                    context = self;
                } else {
                    events = args[0].events;
                    data = args[0].data;
                    context = args[0].context || self;
                }
                data.unshift(context);
                const eventsArray = Array.isArray(events) ? events : events.split(" ");
                eventsArray.forEach((event => {
                    if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach((eventHandler => {
                        eventHandler.apply(context, [ event, ...data ]);
                    }));
                    if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler => {
                        eventHandler.apply(context, data);
                    }));
                }));
                return self;
            }
        };
        function updateSize() {
            const swiper = this;
            let width;
            let height;
            const $el = swiper.$el;
            if ("undefined" !== typeof swiper.params.width && null !== swiper.params.width) width = swiper.params.width; else width = $el[0].clientWidth;
            if ("undefined" !== typeof swiper.params.height && null !== swiper.params.height) height = swiper.params.height; else height = $el[0].clientHeight;
            if (0 === width && swiper.isHorizontal() || 0 === height && swiper.isVertical()) return;
            width = width - parseInt($el.css("padding-left") || 0, 10) - parseInt($el.css("padding-right") || 0, 10);
            height = height - parseInt($el.css("padding-top") || 0, 10) - parseInt($el.css("padding-bottom") || 0, 10);
            if (Number.isNaN(width)) width = 0;
            if (Number.isNaN(height)) height = 0;
            Object.assign(swiper, {
                width,
                height,
                size: swiper.isHorizontal() ? width : height
            });
        }
        function updateSlides() {
            const swiper = this;
            function getDirectionLabel(property) {
                if (swiper.isHorizontal()) return property;
                return {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[property];
            }
            function getDirectionPropertyValue(node, label) {
                return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
            }
            const params = swiper.params;
            const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
            const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
            const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
            let snapGrid = [];
            const slidesGrid = [];
            const slidesSizesGrid = [];
            let offsetBefore = params.slidesOffsetBefore;
            if ("function" === typeof offsetBefore) offsetBefore = params.slidesOffsetBefore.call(swiper);
            let offsetAfter = params.slidesOffsetAfter;
            if ("function" === typeof offsetAfter) offsetAfter = params.slidesOffsetAfter.call(swiper);
            const previousSnapGridLength = swiper.snapGrid.length;
            const previousSlidesGridLength = swiper.slidesGrid.length;
            let spaceBetween = params.spaceBetween;
            let slidePosition = -offsetBefore;
            let prevSlideSize = 0;
            let index = 0;
            if ("undefined" === typeof swiperSize) return;
            if ("string" === typeof spaceBetween && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
            swiper.virtualSize = -spaceBetween;
            if (rtl) slides.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }); else slides.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            });
            if (params.centeredSlides && params.cssMode) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", "");
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", "");
            }
            const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
            if (gridEnabled) swiper.grid.initSlides(slidesLength);
            let slideSize;
            const shouldResetSlideSize = "auto" === params.slidesPerView && params.breakpoints && Object.keys(params.breakpoints).filter((key => "undefined" !== typeof params.breakpoints[key].slidesPerView)).length > 0;
            for (let i = 0; i < slidesLength; i += 1) {
                slideSize = 0;
                const slide = slides.eq(i);
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
                if ("none" === slide.css("display")) continue;
                if ("auto" === params.slidesPerView) {
                    if (shouldResetSlideSize) slides[i].style[getDirectionLabel("width")] = ``;
                    const slideStyles = getComputedStyle(slide[0]);
                    const currentTransform = slide[0].style.transform;
                    const currentWebKitTransform = slide[0].style.webkitTransform;
                    if (currentTransform) slide[0].style.transform = "none";
                    if (currentWebKitTransform) slide[0].style.webkitTransform = "none";
                    if (params.roundLengths) slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true); else {
                        const width = getDirectionPropertyValue(slideStyles, "width");
                        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                        const boxSizing = slideStyles.getPropertyValue("box-sizing");
                        if (boxSizing && "border-box" === boxSizing) slideSize = width + marginLeft + marginRight; else {
                            const {clientWidth, offsetWidth} = slide[0];
                            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                        }
                    }
                    if (currentTransform) slide[0].style.transform = currentTransform;
                    if (currentWebKitTransform) slide[0].style.webkitTransform = currentWebKitTransform;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                } else {
                    slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    if (slides[i]) slides[i].style[getDirectionLabel("width")] = `${slideSize}px`;
                }
                if (slides[i]) slides[i].swiperSlideSize = slideSize;
                slidesSizesGrid.push(slideSize);
                if (params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (0 === prevSlideSize && 0 !== i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (0 === i) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                } else {
                    if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                    if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                    slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
                swiper.virtualSize += slideSize + spaceBetween;
                prevSlideSize = slideSize;
                index += 1;
            }
            swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
            if (rtl && wrongRTL && ("slide" === params.effect || "coverflow" === params.effect)) $wrapperEl.css({
                width: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (params.setWrapperSize) $wrapperEl.css({
                [getDirectionLabel("width")]: `${swiper.virtualSize + params.spaceBetween}px`
            });
            if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
            if (!params.centeredSlides) {
                const newSlidesGrid = [];
                for (let i = 0; i < snapGrid.length; i += 1) {
                    let slidesGridItem = snapGrid[i];
                    if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                    if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
                }
                snapGrid = newSlidesGrid;
                if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
            }
            if (0 === snapGrid.length) snapGrid = [ 0 ];
            if (0 !== params.spaceBetween) {
                const key = swiper.isHorizontal() && rtl ? "marginLeft" : getDirectionLabel("marginRight");
                slides.filter(((_, slideIndex) => {
                    if (!params.cssMode) return true;
                    if (slideIndex === slides.length - 1) return false;
                    return true;
                })).css({
                    [key]: `${spaceBetween}px`
                });
            }
            if (params.centeredSlides && params.centeredSlidesBounds) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                const maxSnap = allSlidesSize - swiperSize;
                snapGrid = snapGrid.map((snap => {
                    if (snap < 0) return -offsetBefore;
                    if (snap > maxSnap) return maxSnap + offsetAfter;
                    return snap;
                }));
            }
            if (params.centerInsufficientSlides) {
                let allSlidesSize = 0;
                slidesSizesGrid.forEach((slideSizeValue => {
                    allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
                }));
                allSlidesSize -= params.spaceBetween;
                if (allSlidesSize < swiperSize) {
                    const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
                    snapGrid.forEach(((snap, snapIndex) => {
                        snapGrid[snapIndex] = snap - allSlidesOffset;
                    }));
                    slidesGrid.forEach(((snap, snapIndex) => {
                        slidesGrid[snapIndex] = snap + allSlidesOffset;
                    }));
                }
            }
            Object.assign(swiper, {
                slides,
                snapGrid,
                slidesGrid,
                slidesSizesGrid
            });
            if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
                utils_setCSSProperty(swiper.wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
                const addToSnapGrid = -swiper.snapGrid[0];
                const addToSlidesGrid = -swiper.slidesGrid[0];
                swiper.snapGrid = swiper.snapGrid.map((v => v + addToSnapGrid));
                swiper.slidesGrid = swiper.slidesGrid.map((v => v + addToSlidesGrid));
            }
            if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
            if (snapGrid.length !== previousSnapGridLength) {
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                swiper.emit("snapGridLengthChange");
            }
            if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
            if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        }
        function updateAutoHeight(speed) {
            const swiper = this;
            const activeSlides = [];
            const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
            let newHeight = 0;
            let i;
            if ("number" === typeof speed) swiper.setTransition(speed); else if (true === speed) swiper.setTransition(swiper.params.speed);
            const getSlideByIndex = index => {
                if (isVirtual) return swiper.slides.filter((el => parseInt(el.getAttribute("data-swiper-slide-index"), 10) === index))[0];
                return swiper.slides.eq(index)[0];
            };
            if ("auto" !== swiper.params.slidesPerView && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) swiper.visibleSlides.each((slide => {
                activeSlides.push(slide);
            })); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
                const index = swiper.activeIndex + i;
                if (index > swiper.slides.length && !isVirtual) break;
                activeSlides.push(getSlideByIndex(index));
            } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
            for (i = 0; i < activeSlides.length; i += 1) if ("undefined" !== typeof activeSlides[i]) {
                const height = activeSlides[i].offsetHeight;
                newHeight = height > newHeight ? height : newHeight;
            }
            if (newHeight || 0 === newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
        }
        function updateSlidesOffset() {
            const swiper = this;
            const slides = swiper.slides;
            for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
        }
        function updateSlidesProgress(translate = this && this.translate || 0) {
            const swiper = this;
            const params = swiper.params;
            const {slides, rtlTranslate: rtl, snapGrid} = swiper;
            if (0 === slides.length) return;
            if ("undefined" === typeof slides[0].swiperSlideOffset) swiper.updateSlidesOffset();
            let offsetCenter = -translate;
            if (rtl) offsetCenter = translate;
            slides.removeClass(params.slideVisibleClass);
            swiper.visibleSlidesIndexes = [];
            swiper.visibleSlides = [];
            for (let i = 0; i < slides.length; i += 1) {
                const slide = slides[i];
                let slideOffset = slide.swiperSlideOffset;
                if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
                const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + params.spaceBetween);
                const slideBefore = -(offsetCenter - slideOffset);
                const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
                const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
                if (isVisible) {
                    swiper.visibleSlides.push(slide);
                    swiper.visibleSlidesIndexes.push(i);
                    slides.eq(i).addClass(params.slideVisibleClass);
                }
                slide.progress = rtl ? -slideProgress : slideProgress;
                slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
            }
            swiper.visibleSlides = dom(swiper.visibleSlides);
        }
        function updateProgress(translate) {
            const swiper = this;
            if ("undefined" === typeof translate) {
                const multiplier = swiper.rtlTranslate ? -1 : 1;
                translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
            }
            const params = swiper.params;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            let {progress, isBeginning, isEnd} = swiper;
            const wasBeginning = isBeginning;
            const wasEnd = isEnd;
            if (0 === translatesDiff) {
                progress = 0;
                isBeginning = true;
                isEnd = true;
            } else {
                progress = (translate - swiper.minTranslate()) / translatesDiff;
                isBeginning = progress <= 0;
                isEnd = progress >= 1;
            }
            Object.assign(swiper, {
                progress,
                isBeginning,
                isEnd
            });
            if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
            if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
            if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
            if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
            swiper.emit("progress", progress);
        }
        function updateSlidesClasses() {
            const swiper = this;
            const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
            const isVirtual = swiper.virtual && params.virtual.enabled;
            slides.removeClass(`${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`);
            let activeSlide;
            if (isVirtual) activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`); else activeSlide = slides.eq(activeIndex);
            activeSlide.addClass(params.slideActiveClass);
            if (params.loop) if (activeSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`).addClass(params.slideDuplicateActiveClass);
            let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);
            if (params.loop && 0 === nextSlide.length) {
                nextSlide = slides.eq(0);
                nextSlide.addClass(params.slideNextClass);
            }
            let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);
            if (params.loop && 0 === prevSlide.length) {
                prevSlide = slides.eq(-1);
                prevSlide.addClass(params.slidePrevClass);
            }
            if (params.loop) {
                if (nextSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicateNextClass);
                if (prevSlide.hasClass(params.slideDuplicateClass)) $wrapperEl.children(`.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass); else $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr("data-swiper-slide-index")}"]`).addClass(params.slideDuplicatePrevClass);
            }
            swiper.emitSlidesClasses();
        }
        function updateActiveIndex(newActiveIndex) {
            const swiper = this;
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            const {slidesGrid, snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
            let activeIndex = newActiveIndex;
            let snapIndex;
            if ("undefined" === typeof activeIndex) {
                for (let i = 0; i < slidesGrid.length; i += 1) if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
                } else if (translate >= slidesGrid[i]) activeIndex = i;
                if (params.normalizeSlideIndex) if (activeIndex < 0 || "undefined" === typeof activeIndex) activeIndex = 0;
            }
            if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
                const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
                snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
            }
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if (activeIndex === previousIndex) {
                if (snapIndex !== previousSnapIndex) {
                    swiper.snapIndex = snapIndex;
                    swiper.emit("snapIndexChange");
                }
                return;
            }
            const realIndex = parseInt(swiper.slides.eq(activeIndex).attr("data-swiper-slide-index") || activeIndex, 10);
            Object.assign(swiper, {
                snapIndex,
                realIndex,
                previousIndex,
                activeIndex
            });
            swiper.emit("activeIndexChange");
            swiper.emit("snapIndexChange");
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            if (swiper.initialized || swiper.params.runCallbacksOnInit) swiper.emit("slideChange");
        }
        function updateClickedSlide(e) {
            const swiper = this;
            const params = swiper.params;
            const slide = dom(e).closest(`.${params.slideClass}`)[0];
            let slideFound = false;
            let slideIndex;
            if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
                slideFound = true;
                slideIndex = i;
                break;
            }
            if (slide && slideFound) {
                swiper.clickedSlide = slide;
                if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(dom(slide).attr("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
            } else {
                swiper.clickedSlide = void 0;
                swiper.clickedIndex = void 0;
                return;
            }
            if (params.slideToClickedSlide && void 0 !== swiper.clickedIndex && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
        }
        const update = {
            updateSize,
            updateSlides,
            updateAutoHeight,
            updateSlidesOffset,
            updateSlidesProgress,
            updateProgress,
            updateSlidesClasses,
            updateActiveIndex,
            updateClickedSlide
        };
        function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
            const swiper = this;
            const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;
            if (params.virtualTranslate) return rtl ? -translate : translate;
            if (params.cssMode) return translate;
            let currentTranslate = utils_getTranslate($wrapperEl[0], axis);
            if (rtl) currentTranslate = -currentTranslate;
            return currentTranslate || 0;
        }
        function setTranslate(translate, byController) {
            const swiper = this;
            const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
            let x = 0;
            let y = 0;
            const z = 0;
            if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
            if (params.roundLengths) {
                x = Math.floor(x);
                y = Math.floor(y);
            }
            if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
            swiper.previousTranslate = swiper.translate;
            swiper.translate = swiper.isHorizontal() ? x : y;
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== progress) swiper.updateProgress(translate);
            swiper.emit("setTranslate", swiper.translate, byController);
        }
        function minTranslate() {
            return -this.snapGrid[0];
        }
        function maxTranslate() {
            return -this.snapGrid[this.snapGrid.length - 1];
        }
        function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
            const swiper = this;
            const {params, wrapperEl} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition) return false;
            const minTranslate = swiper.minTranslate();
            const maxTranslate = swiper.maxTranslate();
            let newTranslate;
            if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
            swiper.updateProgress(newTranslate);
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                if (0 === speed) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: -newTranslate,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: -newTranslate,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            if (0 === speed) {
                swiper.setTransition(0);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionEnd");
                }
            } else {
                swiper.setTransition(speed);
                swiper.setTranslate(newTranslate);
                if (runCallbacks) {
                    swiper.emit("beforeTransitionStart", speed, internal);
                    swiper.emit("transitionStart");
                }
                if (!swiper.animating) {
                    swiper.animating = true;
                    if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                        if (!swiper || swiper.destroyed) return;
                        if (e.target !== this) return;
                        swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                        swiper.onTranslateToWrapperTransitionEnd = null;
                        delete swiper.onTranslateToWrapperTransitionEnd;
                        if (runCallbacks) swiper.emit("transitionEnd");
                    };
                    swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onTranslateToWrapperTransitionEnd);
                }
            }
            return true;
        }
        const translate = {
            getTranslate: getSwiperTranslate,
            setTranslate,
            minTranslate,
            maxTranslate,
            translateTo
        };
        function setTransition(duration, byController) {
            const swiper = this;
            if (!swiper.params.cssMode) swiper.$wrapperEl.transition(duration);
            swiper.emit("setTransition", duration, byController);
        }
        function transitionEmit({swiper, runCallbacks, direction, step}) {
            const {activeIndex, previousIndex} = swiper;
            let dir = direction;
            if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
            swiper.emit(`transition${step}`);
            if (runCallbacks && activeIndex !== previousIndex) {
                if ("reset" === dir) {
                    swiper.emit(`slideResetTransition${step}`);
                    return;
                }
                swiper.emit(`slideChangeTransition${step}`);
                if ("next" === dir) swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
            }
        }
        function transitionStart(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            if (params.cssMode) return;
            if (params.autoHeight) swiper.updateAutoHeight();
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "Start"
            });
        }
        function transitionEnd_transitionEnd(runCallbacks = true, direction) {
            const swiper = this;
            const {params} = swiper;
            swiper.animating = false;
            if (params.cssMode) return;
            swiper.setTransition(0);
            transitionEmit({
                swiper,
                runCallbacks,
                direction,
                step: "End"
            });
        }
        const core_transition = {
            setTransition,
            transitionStart,
            transitionEnd: transitionEnd_transitionEnd
        };
        function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
            if ("number" !== typeof index && "string" !== typeof index) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`);
            if ("string" === typeof index) {
                const indexAsNumber = parseInt(index, 10);
                const isValidNumber = isFinite(indexAsNumber);
                if (!isValidNumber) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
                index = indexAsNumber;
            }
            const swiper = this;
            let slideIndex = index;
            if (slideIndex < 0) slideIndex = 0;
            const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
            if (swiper.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) return false;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
            let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
            if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
            if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
            const translate = -snapGrid[snapIndex];
            swiper.updateProgress(translate);
            if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
                const normalizedTranslate = -Math.floor(100 * translate);
                const normalizedGrid = Math.floor(100 * slidesGrid[i]);
                const normalizedGridNext = Math.floor(100 * slidesGrid[i + 1]);
                if ("undefined" !== typeof slidesGrid[i + 1]) {
                    if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
                } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
            }
            if (swiper.initialized && slideIndex !== activeIndex) {
                if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) return false;
                if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
            }
            let direction;
            if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
            if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
                swiper.updateActiveIndex(slideIndex);
                if (params.autoHeight) swiper.updateAutoHeight();
                swiper.updateSlidesClasses();
                if ("slide" !== params.effect) swiper.setTranslate(translate);
                if ("reset" !== direction) {
                    swiper.transitionStart(runCallbacks, direction);
                    swiper.transitionEnd(runCallbacks, direction);
                }
                return false;
            }
            if (params.cssMode) {
                const isH = swiper.isHorizontal();
                const t = rtl ? translate : -translate;
                if (0 === speed) {
                    const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
                    if (isVirtual) {
                        swiper.wrapperEl.style.scrollSnapType = "none";
                        swiper._immediateVirtual = true;
                    }
                    wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    if (isVirtual) requestAnimationFrame((() => {
                        swiper.wrapperEl.style.scrollSnapType = "";
                        swiper._swiperImmediateVirtual = false;
                    }));
                } else {
                    if (!swiper.support.smoothScroll) {
                        animateCSSModeScroll({
                            swiper,
                            targetPosition: t,
                            side: isH ? "left" : "top"
                        });
                        return true;
                    }
                    wrapperEl.scrollTo({
                        [isH ? "left" : "top"]: t,
                        behavior: "smooth"
                    });
                }
                return true;
            }
            swiper.setTransition(speed);
            swiper.setTranslate(translate);
            swiper.updateActiveIndex(slideIndex);
            swiper.updateSlidesClasses();
            swiper.emit("beforeTransitionStart", speed, internal);
            swiper.transitionStart(runCallbacks, direction);
            if (0 === speed) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.$wrapperEl[0].removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                    swiper.$wrapperEl[0].removeEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
                    swiper.onSlideToWrapperTransitionEnd = null;
                    delete swiper.onSlideToWrapperTransitionEnd;
                    swiper.transitionEnd(runCallbacks, direction);
                };
                swiper.$wrapperEl[0].addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.$wrapperEl[0].addEventListener("webkitTransitionEnd", swiper.onSlideToWrapperTransitionEnd);
            }
            return true;
        }
        function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            let newIndex = index;
            if (swiper.params.loop) newIndex += swiper.loopedSlides;
            return swiper.slideTo(newIndex, speed, runCallbacks, internal);
        }
        function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {animating, enabled, params} = swiper;
            if (!enabled) return swiper;
            let perGroup = params.slidesPerGroup;
            if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
            const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
            return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
        }
        function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
            if (!enabled) return swiper;
            if (params.loop) {
                if (animating && params.loopPreventsSlide) return false;
                swiper.loopFix();
                swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
            }
            const translate = rtlTranslate ? swiper.translate : -swiper.translate;
            function normalize(val) {
                if (val < 0) return -Math.floor(Math.abs(val));
                return Math.floor(val);
            }
            const normalizedTranslate = normalize(translate);
            const normalizedSnapGrid = snapGrid.map((val => normalize(val)));
            let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
            if ("undefined" === typeof prevSnap && params.cssMode) {
                let prevSnapIndex;
                snapGrid.forEach(((snap, snapIndex) => {
                    if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
                }));
                if ("undefined" !== typeof prevSnapIndex) prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
            }
            let prevIndex = 0;
            if ("undefined" !== typeof prevSnap) {
                prevIndex = slidesGrid.indexOf(prevSnap);
                if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
                if ("auto" === params.slidesPerView && 1 === params.slidesPerGroup && params.slidesPerGroupAuto) {
                    prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                    prevIndex = Math.max(prevIndex, 0);
                }
            }
            if (params.rewind && swiper.isBeginning) return swiper.slideTo(swiper.slides.length - 1, speed, runCallbacks, internal);
            return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
        }
        function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
            const swiper = this;
            return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
        }
        function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = .5) {
            const swiper = this;
            let index = swiper.activeIndex;
            const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
            const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
            const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
            if (translate >= swiper.snapGrid[snapIndex]) {
                const currentSnap = swiper.snapGrid[snapIndex];
                const nextSnap = swiper.snapGrid[snapIndex + 1];
                if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
            } else {
                const prevSnap = swiper.snapGrid[snapIndex - 1];
                const currentSnap = swiper.snapGrid[snapIndex];
                if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
            }
            index = Math.max(index, 0);
            index = Math.min(index, swiper.slidesGrid.length - 1);
            return swiper.slideTo(index, speed, runCallbacks, internal);
        }
        function slideToClickedSlide() {
            const swiper = this;
            const {params, $wrapperEl} = swiper;
            const slidesPerView = "auto" === params.slidesPerView ? swiper.slidesPerViewDynamic() : params.slidesPerView;
            let slideToIndex = swiper.clickedIndex;
            let realIndex;
            if (params.loop) {
                if (swiper.animating) return;
                realIndex = parseInt(dom(swiper.clickedSlide).attr("data-swiper-slide-index"), 10);
                if (params.centeredSlides) if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex); else if (slideToIndex > swiper.slides.length - slidesPerView) {
                    swiper.loopFix();
                    slideToIndex = $wrapperEl.children(`.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`).eq(0).index();
                    utils_nextTick((() => {
                        swiper.slideTo(slideToIndex);
                    }));
                } else swiper.slideTo(slideToIndex);
            } else swiper.slideTo(slideToIndex);
        }
        const slide = {
            slideTo,
            slideToLoop,
            slideNext,
            slidePrev,
            slideReset,
            slideToClosest,
            slideToClickedSlide
        };
        function loopCreate() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, $wrapperEl} = swiper;
            const $selector = $wrapperEl.children().length > 0 ? dom($wrapperEl.children()[0].parentNode) : $wrapperEl;
            $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
            let slides = $selector.children(`.${params.slideClass}`);
            if (params.loopFillGroupWithBlank) {
                const blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;
                if (blankSlidesNum !== params.slidesPerGroup) {
                    for (let i = 0; i < blankSlidesNum; i += 1) {
                        const blankNode = dom(document.createElement("div")).addClass(`${params.slideClass} ${params.slideBlankClass}`);
                        $selector.append(blankNode);
                    }
                    slides = $selector.children(`.${params.slideClass}`);
                }
            }
            if ("auto" === params.slidesPerView && !params.loopedSlides) params.loopedSlides = slides.length;
            swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
            swiper.loopedSlides += params.loopAdditionalSlides;
            if (swiper.loopedSlides > slides.length) swiper.loopedSlides = slides.length;
            const prependSlides = [];
            const appendSlides = [];
            slides.each(((el, index) => {
                const slide = dom(el);
                if (index < swiper.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - swiper.loopedSlides) prependSlides.push(el);
                slide.attr("data-swiper-slide-index", index);
            }));
            for (let i = 0; i < appendSlides.length; i += 1) $selector.append(dom(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
            for (let i = prependSlides.length - 1; i >= 0; i -= 1) $selector.prepend(dom(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
        }
        function loopFix() {
            const swiper = this;
            swiper.emit("beforeLoopFix");
            const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
            let newIndex;
            swiper.allowSlidePrev = true;
            swiper.allowSlideNext = true;
            const snapTranslate = -snapGrid[activeIndex];
            const diff = snapTranslate - swiper.getTranslate();
            if (activeIndex < loopedSlides) {
                newIndex = slides.length - 3 * loopedSlides + activeIndex;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            } else if (activeIndex >= slides.length - loopedSlides) {
                newIndex = -slides.length + activeIndex + loopedSlides;
                newIndex += loopedSlides;
                const slideChanged = swiper.slideTo(newIndex, 0, false, true);
                if (slideChanged && 0 !== diff) swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
            }
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
        }
        function loopDestroy() {
            const swiper = this;
            const {$wrapperEl, params, slides} = swiper;
            $wrapperEl.children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`).remove();
            slides.removeAttr("data-swiper-slide-index");
        }
        const loop = {
            loopCreate,
            loopFix,
            loopDestroy
        };
        function setGrabCursor(moving) {
            const swiper = this;
            if (swiper.support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            const el = "container" === swiper.params.touchEventsTarget ? swiper.el : swiper.wrapperEl;
            el.style.cursor = "move";
            el.style.cursor = moving ? "-webkit-grabbing" : "-webkit-grab";
            el.style.cursor = moving ? "-moz-grabbin" : "-moz-grab";
            el.style.cursor = moving ? "grabbing" : "grab";
        }
        function unsetGrabCursor() {
            const swiper = this;
            if (swiper.support.touch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
            swiper["container" === swiper.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "";
        }
        const grab_cursor = {
            setGrabCursor,
            unsetGrabCursor
        };
        function closestElement(selector, base = this) {
            function __closestFrom(el) {
                if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
                if (el.assignedSlot) el = el.assignedSlot;
                const found = el.closest(selector);
                return found || __closestFrom(el.getRootNode().host);
            }
            return __closestFrom(base);
        }
        function onTouchStart(event) {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const window = ssr_window_esm_getWindow();
            const data = swiper.touchEventsData;
            const {params, touches, enabled} = swiper;
            if (!enabled) return;
            if (swiper.animating && params.preventInteractionOnTransition) return;
            if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            let $targetEl = dom(e.target);
            if ("wrapper" === params.touchEventsTarget) if (!$targetEl.closest(swiper.wrapperEl).length) return;
            data.isTouchEvent = "touchstart" === e.type;
            if (!data.isTouchEvent && "which" in e && 3 === e.which) return;
            if (!data.isTouchEvent && "button" in e && e.button > 0) return;
            if (data.isTouched && data.isMoved) return;
            const swipingClassHasValue = !!params.noSwipingClass && "" !== params.noSwipingClass;
            if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) $targetEl = dom(event.path[0]);
            const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
            const isTargetShadow = !!(e.target && e.target.shadowRoot);
            if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])) {
                swiper.allowClick = true;
                return;
            }
            if (params.swipeHandler) if (!$targetEl.closest(params.swipeHandler)[0]) return;
            touches.currentX = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY;
            const startX = touches.currentX;
            const startY = touches.currentY;
            const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
            const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
            if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) if ("prevent" === edgeSwipeDetection) event.preventDefault(); else return;
            Object.assign(data, {
                isTouched: true,
                isMoved: false,
                allowTouchCallbacks: true,
                isScrolling: void 0,
                startMoving: void 0
            });
            touches.startX = startX;
            touches.startY = startY;
            data.touchStartTime = utils_now();
            swiper.allowClick = true;
            swiper.updateSize();
            swiper.swipeDirection = void 0;
            if (params.threshold > 0) data.allowThresholdMove = false;
            if ("touchstart" !== e.type) {
                let preventDefault = true;
                if ($targetEl.is(data.focusableElements)) preventDefault = false;
                if (document.activeElement && dom(document.activeElement).is(data.focusableElements) && document.activeElement !== $targetEl[0]) document.activeElement.blur();
                const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
                if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) e.preventDefault();
            }
            swiper.emit("touchStart", e);
        }
        function onTouchMove(event) {
            const document = ssr_window_esm_getDocument();
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (!data.isTouched) {
                if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
                return;
            }
            if (data.isTouchEvent && "touchmove" !== e.type) return;
            const targetTouch = "touchmove" === e.type && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
            const pageX = "touchmove" === e.type ? targetTouch.pageX : e.pageX;
            const pageY = "touchmove" === e.type ? targetTouch.pageY : e.pageY;
            if (e.preventedByNestedSwiper) {
                touches.startX = pageX;
                touches.startY = pageY;
                return;
            }
            if (!swiper.allowTouchMove) {
                swiper.allowClick = false;
                if (data.isTouched) {
                    Object.assign(touches, {
                        startX: pageX,
                        startY: pageY,
                        currentX: pageX,
                        currentY: pageY
                    });
                    data.touchStartTime = utils_now();
                }
                return;
            }
            if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
                if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                    data.isTouched = false;
                    data.isMoved = false;
                    return;
                }
            } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) return;
            if (data.isTouchEvent && document.activeElement) if (e.target === document.activeElement && dom(e.target).is(data.focusableElements)) {
                data.isMoved = true;
                swiper.allowClick = false;
                return;
            }
            if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
            if (e.targetTouches && e.targetTouches.length > 1) return;
            touches.currentX = pageX;
            touches.currentY = pageY;
            const diffX = touches.currentX - touches.startX;
            const diffY = touches.currentY - touches.startY;
            if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
            if ("undefined" === typeof data.isScrolling) {
                let touchAngle;
                if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                    touchAngle = 180 * Math.atan2(Math.abs(diffY), Math.abs(diffX)) / Math.PI;
                    data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
                }
            }
            if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
            if ("undefined" === typeof data.startMoving) if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
            if (data.isScrolling) {
                data.isTouched = false;
                return;
            }
            if (!data.startMoving) return;
            swiper.allowClick = false;
            if (!params.cssMode && e.cancelable) e.preventDefault();
            if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
            if (!data.isMoved) {
                if (params.loop && !params.cssMode) swiper.loopFix();
                data.startTranslate = swiper.getTranslate();
                swiper.setTransition(0);
                if (swiper.animating) swiper.$wrapperEl.trigger("webkitTransitionEnd transitionend");
                data.allowMomentumBounce = false;
                if (params.grabCursor && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(true);
                swiper.emit("sliderFirstMove", e);
            }
            swiper.emit("sliderMove", e);
            data.isMoved = true;
            let diff = swiper.isHorizontal() ? diffX : diffY;
            touches.diff = diff;
            diff *= params.touchRatio;
            if (rtl) diff = -diff;
            swiper.swipeDirection = diff > 0 ? "prev" : "next";
            data.currentTranslate = diff + data.startTranslate;
            let disableParentSwiper = true;
            let resistanceRatio = params.resistanceRatio;
            if (params.touchReleaseOnEdges) resistanceRatio = 0;
            if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
            if (disableParentSwiper) e.preventedByNestedSwiper = true;
            if (!swiper.allowSlideNext && "next" === swiper.swipeDirection && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && "prev" === swiper.swipeDirection && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
            if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
            if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
                if (!data.allowThresholdMove) {
                    data.allowThresholdMove = true;
                    touches.startX = touches.currentX;
                    touches.startY = touches.currentY;
                    data.currentTranslate = data.startTranslate;
                    touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                    return;
                }
            } else {
                data.currentTranslate = data.startTranslate;
                return;
            }
            if (!params.followFinger || params.cssMode) return;
            if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
            swiper.updateProgress(data.currentTranslate);
            swiper.setTranslate(data.currentTranslate);
        }
        function onTouchEnd(event) {
            const swiper = this;
            const data = swiper.touchEventsData;
            const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
            if (!enabled) return;
            let e = event;
            if (e.originalEvent) e = e.originalEvent;
            if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
            data.allowTouchCallbacks = false;
            if (!data.isTouched) {
                if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            if (params.grabCursor && data.isMoved && data.isTouched && (true === swiper.allowSlideNext || true === swiper.allowSlidePrev)) swiper.setGrabCursor(false);
            const touchEndTime = utils_now();
            const timeDiff = touchEndTime - data.touchStartTime;
            if (swiper.allowClick) {
                const pathTree = e.path || e.composedPath && e.composedPath();
                swiper.updateClickedSlide(pathTree && pathTree[0] || e.target);
                swiper.emit("tap click", e);
                if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
            }
            data.lastClickTime = utils_now();
            utils_nextTick((() => {
                if (!swiper.destroyed) swiper.allowClick = true;
            }));
            if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || 0 === touches.diff || data.currentTranslate === data.startTranslate) {
                data.isTouched = false;
                data.isMoved = false;
                data.startMoving = false;
                return;
            }
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            let currentPos;
            if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
            if (params.cssMode) return;
            if (swiper.params.freeMode && params.freeMode.enabled) {
                swiper.freeMode.onTouchEnd({
                    currentPos
                });
                return;
            }
            let stopIndex = 0;
            let groupSize = swiper.slidesSizesGrid[0];
            for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
                const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
                if ("undefined" !== typeof slidesGrid[i + increment]) {
                    if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                        stopIndex = i;
                        groupSize = slidesGrid[i + increment] - slidesGrid[i];
                    }
                } else if (currentPos >= slidesGrid[i]) {
                    stopIndex = i;
                    groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
                }
            }
            const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
            const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (timeDiff > params.longSwipesMs) {
                if (!params.longSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                if ("next" === swiper.swipeDirection) if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
                if ("prev" === swiper.swipeDirection) if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            } else {
                if (!params.shortSwipes) {
                    swiper.slideTo(swiper.activeIndex);
                    return;
                }
                const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
                if (!isNavButtonTarget) {
                    if ("next" === swiper.swipeDirection) swiper.slideTo(stopIndex + increment);
                    if ("prev" === swiper.swipeDirection) swiper.slideTo(stopIndex);
                } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
            }
        }
        function onResize() {
            const swiper = this;
            const {params, el} = swiper;
            if (el && 0 === el.offsetWidth) return;
            if (params.breakpoints) swiper.setBreakpoint();
            const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
            swiper.allowSlideNext = true;
            swiper.allowSlidePrev = true;
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateSlidesClasses();
            if (("auto" === params.slidesPerView || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
            if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.run();
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
        }
        function onClick(e) {
            const swiper = this;
            if (!swiper.enabled) return;
            if (!swiper.allowClick) {
                if (swiper.params.preventClicks) e.preventDefault();
                if (swiper.params.preventClicksPropagation && swiper.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        }
        function onScroll() {
            const swiper = this;
            const {wrapperEl, rtlTranslate, enabled} = swiper;
            if (!enabled) return;
            swiper.previousTranslate = swiper.translate;
            if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
            if (-0 === swiper.translate) swiper.translate = 0;
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
            let newProgress;
            const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
            if (0 === translatesDiff) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
            if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
            swiper.emit("setTranslate", swiper.translate, false);
        }
        let dummyEventAttached = false;
        function dummyEventListener() {}
        const events = (swiper, method) => {
            const document = ssr_window_esm_getDocument();
            const {params, touchEvents, el, wrapperEl, device, support} = swiper;
            const capture = !!params.nested;
            const domMethod = "on" === method ? "addEventListener" : "removeEventListener";
            const swiperMethod = method;
            if (!support.touch) {
                el[domMethod](touchEvents.start, swiper.onTouchStart, false);
                document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
                document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
            } else {
                const passiveListener = "touchstart" === touchEvents.start && support.passiveListener && params.passiveListeners ? {
                    passive: true,
                    capture: false
                } : false;
                el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
                el[domMethod](touchEvents.move, swiper.onTouchMove, support.passiveListener ? {
                    passive: false,
                    capture
                } : capture);
                el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);
                if (touchEvents.cancel) el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
            }
            if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
            if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
            if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        };
        function attachEvents() {
            const swiper = this;
            const document = ssr_window_esm_getDocument();
            const {params, support} = swiper;
            swiper.onTouchStart = onTouchStart.bind(swiper);
            swiper.onTouchMove = onTouchMove.bind(swiper);
            swiper.onTouchEnd = onTouchEnd.bind(swiper);
            if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
            swiper.onClick = onClick.bind(swiper);
            if (support.touch && !dummyEventAttached) {
                document.addEventListener("touchstart", dummyEventListener);
                dummyEventAttached = true;
            }
            events(swiper, "on");
        }
        function detachEvents() {
            const swiper = this;
            events(swiper, "off");
        }
        const core_events = {
            attachEvents,
            detachEvents
        };
        const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
        function setBreakpoint() {
            const swiper = this;
            const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
            const breakpoints = params.breakpoints;
            if (!breakpoints || breakpoints && 0 === Object.keys(breakpoints).length) return;
            const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
            if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
            const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
            const breakpointParams = breakpointOnlyParams || swiper.originalParams;
            const wasMultiRow = isGridEnabled(swiper, params);
            const isMultiRow = isGridEnabled(swiper, breakpointParams);
            const wasEnabled = params.enabled;
            if (wasMultiRow && !isMultiRow) {
                $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            } else if (!wasMultiRow && isMultiRow) {
                $el.addClass(`${params.containerModifierClass}grid`);
                if (breakpointParams.grid.fill && "column" === breakpointParams.grid.fill || !breakpointParams.grid.fill && "column" === params.grid.fill) $el.addClass(`${params.containerModifierClass}grid-column`);
                swiper.emitContainerClasses();
            }
            const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
            const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
            if (directionChanged && initialized) swiper.changeDirection();
            utils_extend(swiper.params, breakpointParams);
            const isEnabled = swiper.params.enabled;
            Object.assign(swiper, {
                allowTouchMove: swiper.params.allowTouchMove,
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev
            });
            if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
            swiper.currentBreakpoint = breakpoint;
            swiper.emit("_beforeBreakpoint", breakpointParams);
            if (needsReLoop && initialized) {
                swiper.loopDestroy();
                swiper.loopCreate();
                swiper.updateSlides();
                swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
            }
            swiper.emit("breakpoint", breakpointParams);
        }
        function getBreakpoint(breakpoints, base = "window", containerEl) {
            if (!breakpoints || "container" === base && !containerEl) return;
            let breakpoint = false;
            const window = ssr_window_esm_getWindow();
            const currentHeight = "window" === base ? window.innerHeight : containerEl.clientHeight;
            const points = Object.keys(breakpoints).map((point => {
                if ("string" === typeof point && 0 === point.indexOf("@")) {
                    const minRatio = parseFloat(point.substr(1));
                    const value = currentHeight * minRatio;
                    return {
                        value,
                        point
                    };
                }
                return {
                    value: point,
                    point
                };
            }));
            points.sort(((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10)));
            for (let i = 0; i < points.length; i += 1) {
                const {point, value} = points[i];
                if ("window" === base) {
                    if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
                } else if (value <= containerEl.clientWidth) breakpoint = point;
            }
            return breakpoint || "max";
        }
        const breakpoints = {
            setBreakpoint,
            getBreakpoint
        };
        function prepareClasses(entries, prefix) {
            const resultClasses = [];
            entries.forEach((item => {
                if ("object" === typeof item) Object.keys(item).forEach((classNames => {
                    if (item[classNames]) resultClasses.push(prefix + classNames);
                })); else if ("string" === typeof item) resultClasses.push(prefix + item);
            }));
            return resultClasses;
        }
        function addClasses() {
            const swiper = this;
            const {classNames, params, rtl, $el, device, support} = swiper;
            const suffixes = prepareClasses([ "initialized", params.direction, {
                "pointer-events": !support.touch
            }, {
                "free-mode": swiper.params.freeMode && params.freeMode.enabled
            }, {
                autoheight: params.autoHeight
            }, {
                rtl
            }, {
                grid: params.grid && params.grid.rows > 1
            }, {
                "grid-column": params.grid && params.grid.rows > 1 && "column" === params.grid.fill
            }, {
                android: device.android
            }, {
                ios: device.ios
            }, {
                "css-mode": params.cssMode
            }, {
                centered: params.cssMode && params.centeredSlides
            } ], params.containerModifierClass);
            classNames.push(...suffixes);
            $el.addClass([ ...classNames ].join(" "));
            swiper.emitContainerClasses();
        }
        function removeClasses_removeClasses() {
            const swiper = this;
            const {$el, classNames} = swiper;
            $el.removeClass(classNames.join(" "));
            swiper.emitContainerClasses();
        }
        const classes = {
            addClasses,
            removeClasses: removeClasses_removeClasses
        };
        function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
            const window = ssr_window_esm_getWindow();
            let image;
            function onReady() {
                if (callback) callback();
            }
            const isPicture = dom(imageEl).parent("picture")[0];
            if (!isPicture && (!imageEl.complete || !checkForComplete)) if (src) {
                image = new window.Image;
                image.onload = onReady;
                image.onerror = onReady;
                if (sizes) image.sizes = sizes;
                if (srcset) image.srcset = srcset;
                if (src) image.src = src;
            } else onReady(); else onReady();
        }
        function preloadImages() {
            const swiper = this;
            swiper.imagesToLoad = swiper.$el.find("img");
            function onReady() {
                if ("undefined" === typeof swiper || null === swiper || !swiper || swiper.destroyed) return;
                if (void 0 !== swiper.imagesLoaded) swiper.imagesLoaded += 1;
                if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
                    if (swiper.params.updateOnImagesReady) swiper.update();
                    swiper.emit("imagesReady");
                }
            }
            for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
                const imageEl = swiper.imagesToLoad[i];
                swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute("src"), imageEl.srcset || imageEl.getAttribute("srcset"), imageEl.sizes || imageEl.getAttribute("sizes"), true, onReady);
            }
        }
        const core_images = {
            loadImage,
            preloadImages
        };
        function checkOverflow() {
            const swiper = this;
            const {isLocked: wasLocked, params} = swiper;
            const {slidesOffsetBefore} = params;
            if (slidesOffsetBefore) {
                const lastSlideIndex = swiper.slides.length - 1;
                const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + 2 * slidesOffsetBefore;
                swiper.isLocked = swiper.size > lastSlideRightEdge;
            } else swiper.isLocked = 1 === swiper.snapGrid.length;
            if (true === params.allowSlideNext) swiper.allowSlideNext = !swiper.isLocked;
            if (true === params.allowSlidePrev) swiper.allowSlidePrev = !swiper.isLocked;
            if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
            if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
        }
        const check_overflow = {
            checkOverflow
        };
        const defaults = {
            init: true,
            direction: "horizontal",
            touchEventsTarget: "wrapper",
            initialSlide: 0,
            speed: 300,
            cssMode: false,
            updateOnWindowResize: true,
            resizeObserver: true,
            nested: false,
            createElements: false,
            enabled: true,
            focusableElements: "input, select, option, textarea, button, video, label",
            width: null,
            height: null,
            preventInteractionOnTransition: false,
            userAgent: null,
            url: null,
            edgeSwipeDetection: false,
            edgeSwipeThreshold: 20,
            autoHeight: false,
            setWrapperSize: false,
            virtualTranslate: false,
            effect: "slide",
            breakpoints: void 0,
            breakpointsBase: "window",
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            slidesPerGroupAuto: false,
            centeredSlides: false,
            centeredSlidesBounds: false,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: true,
            centerInsufficientSlides: false,
            watchOverflow: true,
            roundLengths: false,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: true,
            allowTouchMove: true,
            threshold: 0,
            touchMoveStopPropagation: false,
            touchStartPreventDefault: true,
            touchStartForcePreventDefault: false,
            touchReleaseOnEdges: false,
            uniqueNavElements: true,
            resistance: true,
            resistanceRatio: .85,
            watchSlidesProgress: false,
            grabCursor: false,
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            preloadImages: true,
            updateOnImagesReady: true,
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: false,
            loopPreventsSlide: true,
            rewind: false,
            allowSlidePrev: true,
            allowSlideNext: true,
            swipeHandler: null,
            noSwiping: true,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: true,
            containerModifierClass: "swiper-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: true,
            _emitClasses: false
        };
        function moduleExtendParams(params, allModulesParams) {
            return function extendParams(obj = {}) {
                const moduleParamName = Object.keys(obj)[0];
                const moduleParams = obj[moduleParamName];
                if ("object" !== typeof moduleParams || null === moduleParams) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if ([ "navigation", "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && true === params[moduleParamName]) params[moduleParamName] = {
                    auto: true
                };
                if (!(moduleParamName in params && "enabled" in moduleParams)) {
                    utils_extend(allModulesParams, obj);
                    return;
                }
                if (true === params[moduleParamName]) params[moduleParamName] = {
                    enabled: true
                };
                if ("object" === typeof params[moduleParamName] && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
                if (!params[moduleParamName]) params[moduleParamName] = {
                    enabled: false
                };
                utils_extend(allModulesParams, obj);
            };
        }
        const prototypes = {
            eventsEmitter: events_emitter,
            update,
            translate,
            transition: core_transition,
            slide,
            loop,
            grabCursor: grab_cursor,
            events: core_events,
            breakpoints,
            checkOverflow: check_overflow,
            classes,
            images: core_images
        };
        const extendedDefaults = {};
        class core_Swiper {
            constructor(...args) {
                let el;
                let params;
                if (1 === args.length && args[0].constructor && "Object" === Object.prototype.toString.call(args[0]).slice(8, -1)) params = args[0]; else [el, params] = args;
                if (!params) params = {};
                params = utils_extend({}, params);
                if (el && !params.el) params.el = el;
                if (params.el && dom(params.el).length > 1) {
                    const swipers = [];
                    dom(params.el).each((containerEl => {
                        const newParams = utils_extend({}, params, {
                            el: containerEl
                        });
                        swipers.push(new core_Swiper(newParams));
                    }));
                    return swipers;
                }
                const swiper = this;
                swiper.__swiper__ = true;
                swiper.support = getSupport();
                swiper.device = getDevice({
                    userAgent: params.userAgent
                });
                swiper.browser = getBrowser();
                swiper.eventsListeners = {};
                swiper.eventsAnyListeners = [];
                swiper.modules = [ ...swiper.__modules__ ];
                if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
                const allModulesParams = {};
                swiper.modules.forEach((mod => {
                    mod({
                        swiper,
                        extendParams: moduleExtendParams(params, allModulesParams),
                        on: swiper.on.bind(swiper),
                        once: swiper.once.bind(swiper),
                        off: swiper.off.bind(swiper),
                        emit: swiper.emit.bind(swiper)
                    });
                }));
                const swiperParams = utils_extend({}, defaults, allModulesParams);
                swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
                swiper.originalParams = utils_extend({}, swiper.params);
                swiper.passedParams = utils_extend({}, params);
                if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach((eventName => {
                    swiper.on(eventName, swiper.params.on[eventName]);
                }));
                if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
                swiper.$ = dom;
                Object.assign(swiper, {
                    enabled: swiper.params.enabled,
                    el,
                    classNames: [],
                    slides: dom(),
                    slidesGrid: [],
                    snapGrid: [],
                    slidesSizesGrid: [],
                    isHorizontal() {
                        return "horizontal" === swiper.params.direction;
                    },
                    isVertical() {
                        return "vertical" === swiper.params.direction;
                    },
                    activeIndex: 0,
                    realIndex: 0,
                    isBeginning: true,
                    isEnd: false,
                    translate: 0,
                    previousTranslate: 0,
                    progress: 0,
                    velocity: 0,
                    animating: false,
                    allowSlideNext: swiper.params.allowSlideNext,
                    allowSlidePrev: swiper.params.allowSlidePrev,
                    touchEvents: function touchEvents() {
                        const touch = [ "touchstart", "touchmove", "touchend", "touchcancel" ];
                        const desktop = [ "pointerdown", "pointermove", "pointerup" ];
                        swiper.touchEventsTouch = {
                            start: touch[0],
                            move: touch[1],
                            end: touch[2],
                            cancel: touch[3]
                        };
                        swiper.touchEventsDesktop = {
                            start: desktop[0],
                            move: desktop[1],
                            end: desktop[2]
                        };
                        return swiper.support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
                    }(),
                    touchEventsData: {
                        isTouched: void 0,
                        isMoved: void 0,
                        allowTouchCallbacks: void 0,
                        touchStartTime: void 0,
                        isScrolling: void 0,
                        currentTranslate: void 0,
                        startTranslate: void 0,
                        allowThresholdMove: void 0,
                        focusableElements: swiper.params.focusableElements,
                        lastClickTime: utils_now(),
                        clickTimeout: void 0,
                        velocities: [],
                        allowMomentumBounce: void 0,
                        isTouchEvent: void 0,
                        startMoving: void 0
                    },
                    allowClick: true,
                    allowTouchMove: swiper.params.allowTouchMove,
                    touches: {
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        diff: 0
                    },
                    imagesToLoad: [],
                    imagesLoaded: 0
                });
                swiper.emit("_swiper");
                if (swiper.params.init) swiper.init();
                return swiper;
            }
            enable() {
                const swiper = this;
                if (swiper.enabled) return;
                swiper.enabled = true;
                if (swiper.params.grabCursor) swiper.setGrabCursor();
                swiper.emit("enable");
            }
            disable() {
                const swiper = this;
                if (!swiper.enabled) return;
                swiper.enabled = false;
                if (swiper.params.grabCursor) swiper.unsetGrabCursor();
                swiper.emit("disable");
            }
            setProgress(progress, speed) {
                const swiper = this;
                progress = Math.min(Math.max(progress, 0), 1);
                const min = swiper.minTranslate();
                const max = swiper.maxTranslate();
                const current = (max - min) * progress + min;
                swiper.translateTo(current, "undefined" === typeof speed ? 0 : speed);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            emitContainerClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const cls = swiper.el.className.split(" ").filter((className => 0 === className.indexOf("swiper") || 0 === className.indexOf(swiper.params.containerModifierClass)));
                swiper.emit("_containerClasses", cls.join(" "));
            }
            getSlideClasses(slideEl) {
                const swiper = this;
                return slideEl.className.split(" ").filter((className => 0 === className.indexOf("swiper-slide") || 0 === className.indexOf(swiper.params.slideClass))).join(" ");
            }
            emitSlidesClasses() {
                const swiper = this;
                if (!swiper.params._emitClasses || !swiper.el) return;
                const updates = [];
                swiper.slides.each((slideEl => {
                    const classNames = swiper.getSlideClasses(slideEl);
                    updates.push({
                        slideEl,
                        classNames
                    });
                    swiper.emit("_slideClass", slideEl, classNames);
                }));
                swiper.emit("_slideClasses", updates);
            }
            slidesPerViewDynamic(view = "current", exact = false) {
                const swiper = this;
                const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
                let spv = 1;
                if (params.centeredSlides) {
                    let slideSize = slides[activeIndex].swiperSlideSize;
                    let breakLoop;
                    for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                    for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                        slideSize += slides[i].swiperSlideSize;
                        spv += 1;
                        if (slideSize > swiperSize) breakLoop = true;
                    }
                } else if ("current" === view) for (let i = activeIndex + 1; i < slides.length; i += 1) {
                    const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                    if (slideInView) spv += 1;
                } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                    const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                    if (slideInView) spv += 1;
                }
                return spv;
            }
            update() {
                const swiper = this;
                if (!swiper || swiper.destroyed) return;
                const {snapGrid, params} = swiper;
                if (params.breakpoints) swiper.setBreakpoint();
                swiper.updateSize();
                swiper.updateSlides();
                swiper.updateProgress();
                swiper.updateSlidesClasses();
                function setTranslate() {
                    const translateValue = swiper.rtlTranslate ? -1 * swiper.translate : swiper.translate;
                    const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                    swiper.setTranslate(newTranslate);
                    swiper.updateActiveIndex();
                    swiper.updateSlidesClasses();
                }
                let translated;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
                    setTranslate();
                    if (swiper.params.autoHeight) swiper.updateAutoHeight();
                } else {
                    if (("auto" === swiper.params.slidesPerView || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true); else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                    if (!translated) setTranslate();
                }
                if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
                swiper.emit("update");
            }
            changeDirection(newDirection, needUpdate = true) {
                const swiper = this;
                const currentDirection = swiper.params.direction;
                if (!newDirection) newDirection = "horizontal" === currentDirection ? "vertical" : "horizontal";
                if (newDirection === currentDirection || "horizontal" !== newDirection && "vertical" !== newDirection) return swiper;
                swiper.$el.removeClass(`${swiper.params.containerModifierClass}${currentDirection}`).addClass(`${swiper.params.containerModifierClass}${newDirection}`);
                swiper.emitContainerClasses();
                swiper.params.direction = newDirection;
                swiper.slides.each((slideEl => {
                    if ("vertical" === newDirection) slideEl.style.width = ""; else slideEl.style.height = "";
                }));
                swiper.emit("changeDirection");
                if (needUpdate) swiper.update();
                return swiper;
            }
            mount(el) {
                const swiper = this;
                if (swiper.mounted) return true;
                const $el = dom(el || swiper.params.el);
                el = $el[0];
                if (!el) return false;
                el.swiper = swiper;
                const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
                const getWrapper = () => {
                    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                        const res = dom(el.shadowRoot.querySelector(getWrapperSelector()));
                        res.children = options => $el.children(options);
                        return res;
                    }
                    return $el.children(getWrapperSelector());
                };
                let $wrapperEl = getWrapper();
                if (0 === $wrapperEl.length && swiper.params.createElements) {
                    const document = ssr_window_esm_getDocument();
                    const wrapper = document.createElement("div");
                    $wrapperEl = dom(wrapper);
                    wrapper.className = swiper.params.wrapperClass;
                    $el.append(wrapper);
                    $el.children(`.${swiper.params.slideClass}`).each((slideEl => {
                        $wrapperEl.append(slideEl);
                    }));
                }
                Object.assign(swiper, {
                    $el,
                    el,
                    $wrapperEl,
                    wrapperEl: $wrapperEl[0],
                    mounted: true,
                    rtl: "rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction"),
                    rtlTranslate: "horizontal" === swiper.params.direction && ("rtl" === el.dir.toLowerCase() || "rtl" === $el.css("direction")),
                    wrongRTL: "-webkit-box" === $wrapperEl.css("display")
                });
                return true;
            }
            init(el) {
                const swiper = this;
                if (swiper.initialized) return swiper;
                const mounted = swiper.mount(el);
                if (false === mounted) return swiper;
                swiper.emit("beforeInit");
                if (swiper.params.breakpoints) swiper.setBreakpoint();
                swiper.addClasses();
                if (swiper.params.loop) swiper.loopCreate();
                swiper.updateSize();
                swiper.updateSlides();
                if (swiper.params.watchOverflow) swiper.checkOverflow();
                if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
                if (swiper.params.preloadImages) swiper.preloadImages();
                if (swiper.params.loop) swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
                swiper.attachEvents();
                swiper.initialized = true;
                swiper.emit("init");
                swiper.emit("afterInit");
                return swiper;
            }
            destroy(deleteInstance = true, cleanStyles = true) {
                const swiper = this;
                const {params, $el, $wrapperEl, slides} = swiper;
                if ("undefined" === typeof swiper.params || swiper.destroyed) return null;
                swiper.emit("beforeDestroy");
                swiper.initialized = false;
                swiper.detachEvents();
                if (params.loop) swiper.loopDestroy();
                if (cleanStyles) {
                    swiper.removeClasses();
                    $el.removeAttr("style");
                    $wrapperEl.removeAttr("style");
                    if (slides && slides.length) slides.removeClass([ params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass ].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index");
                }
                swiper.emit("destroy");
                Object.keys(swiper.eventsListeners).forEach((eventName => {
                    swiper.off(eventName);
                }));
                if (false !== deleteInstance) {
                    swiper.$el[0].swiper = null;
                    deleteProps(swiper);
                }
                swiper.destroyed = true;
                return null;
            }
            static extendDefaults(newDefaults) {
                utils_extend(extendedDefaults, newDefaults);
            }
            static get extendedDefaults() {
                return extendedDefaults;
            }
            static get defaults() {
                return defaults;
            }
            static installModule(mod) {
                if (!core_Swiper.prototype.__modules__) core_Swiper.prototype.__modules__ = [];
                const modules = core_Swiper.prototype.__modules__;
                if ("function" === typeof mod && modules.indexOf(mod) < 0) modules.push(mod);
            }
            static use(module) {
                if (Array.isArray(module)) {
                    module.forEach((m => core_Swiper.installModule(m)));
                    return core_Swiper;
                }
                core_Swiper.installModule(module);
                return core_Swiper;
            }
        }
        Object.keys(prototypes).forEach((prototypeGroup => {
            Object.keys(prototypes[prototypeGroup]).forEach((protoMethod => {
                core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
            }));
        }));
        core_Swiper.use([ Resize, Observer ]);
        const core = core_Swiper;
        function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
            const document = ssr_window_esm_getDocument();
            if (swiper.params.createElements) Object.keys(checkProps).forEach((key => {
                if (!params[key] && true === params.auto) {
                    let element = swiper.$el.children(`.${checkProps[key]}`)[0];
                    if (!element) {
                        element = document.createElement("div");
                        element.className = checkProps[key];
                        swiper.$el.append(element);
                    }
                    params[key] = element;
                    originalParams[key] = element;
                }
            }));
            return params;
        }
        function Navigation({swiper, extendParams, on, emit}) {
            extendParams({
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: false,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            });
            swiper.navigation = {
                nextEl: null,
                $nextEl: null,
                prevEl: null,
                $prevEl: null
            };
            function getEl(el) {
                let $el;
                if (el) {
                    $el = dom(el);
                    if (swiper.params.uniqueNavElements && "string" === typeof el && $el.length > 1 && 1 === swiper.$el.find(el).length) $el = swiper.$el.find(el);
                }
                return $el;
            }
            function toggleEl($el, disabled) {
                const params = swiper.params.navigation;
                if ($el && $el.length > 0) {
                    $el[disabled ? "addClass" : "removeClass"](params.disabledClass);
                    if ($el[0] && "BUTTON" === $el[0].tagName) $el[0].disabled = disabled;
                    if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
                }
            }
            function update() {
                if (swiper.params.loop) return;
                const {$nextEl, $prevEl} = swiper.navigation;
                toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
                toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
            }
            function onPrevClick(e) {
                e.preventDefault();
                if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slidePrev();
            }
            function onNextClick(e) {
                e.preventDefault();
                if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
                swiper.slideNext();
            }
            function init() {
                const params = swiper.params.navigation;
                swiper.params.navigation = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
                    nextEl: "swiper-button-next",
                    prevEl: "swiper-button-prev"
                });
                if (!(params.nextEl || params.prevEl)) return;
                const $nextEl = getEl(params.nextEl);
                const $prevEl = getEl(params.prevEl);
                if ($nextEl && $nextEl.length > 0) $nextEl.on("click", onNextClick);
                if ($prevEl && $prevEl.length > 0) $prevEl.on("click", onPrevClick);
                Object.assign(swiper.navigation, {
                    $nextEl,
                    nextEl: $nextEl && $nextEl[0],
                    $prevEl,
                    prevEl: $prevEl && $prevEl[0]
                });
                if (!swiper.enabled) {
                    if ($nextEl) $nextEl.addClass(params.lockClass);
                    if ($prevEl) $prevEl.addClass(params.lockClass);
                }
            }
            function destroy() {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl && $nextEl.length) {
                    $nextEl.off("click", onNextClick);
                    $nextEl.removeClass(swiper.params.navigation.disabledClass);
                }
                if ($prevEl && $prevEl.length) {
                    $prevEl.off("click", onPrevClick);
                    $prevEl.removeClass(swiper.params.navigation.disabledClass);
                }
            }
            on("init", (() => {
                init();
                update();
            }));
            on("toEdge fromEdge lock unlock", (() => {
                update();
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$nextEl, $prevEl} = swiper.navigation;
                if ($nextEl) $nextEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
                if ($prevEl) $prevEl[swiper.enabled ? "removeClass" : "addClass"](swiper.params.navigation.lockClass);
            }));
            on("click", ((_s, e) => {
                const {$nextEl, $prevEl} = swiper.navigation;
                const targetEl = e.target;
                if (swiper.params.navigation.hideOnClick && !dom(targetEl).is($prevEl) && !dom(targetEl).is($nextEl)) {
                    if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
                    let isHidden;
                    if ($nextEl) isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass); else if ($prevEl) isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
                    if (true === isHidden) emit("navigationShow"); else emit("navigationHide");
                    if ($nextEl) $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
                    if ($prevEl) $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
                }
            }));
            Object.assign(swiper.navigation, {
                update,
                init,
                destroy
            });
        }
        function classes_to_selector_classesToSelector(classes = "") {
            return `.${classes.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`;
        }
        function Pagination({swiper, extendParams, on, emit}) {
            const pfx = "swiper-pagination";
            extendParams({
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: false,
                    hideOnClick: false,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: false,
                    type: "bullets",
                    dynamicBullets: false,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: number => number,
                    formatFractionTotal: number => number,
                    bulletClass: `${pfx}-bullet`,
                    bulletActiveClass: `${pfx}-bullet-active`,
                    modifierClass: `${pfx}-`,
                    currentClass: `${pfx}-current`,
                    totalClass: `${pfx}-total`,
                    hiddenClass: `${pfx}-hidden`,
                    progressbarFillClass: `${pfx}-progressbar-fill`,
                    progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                    clickableClass: `${pfx}-clickable`,
                    lockClass: `${pfx}-lock`,
                    horizontalClass: `${pfx}-horizontal`,
                    verticalClass: `${pfx}-vertical`
                }
            });
            swiper.pagination = {
                el: null,
                $el: null,
                bullets: []
            };
            let bulletSize;
            let dynamicBulletIndex = 0;
            function isPaginationDisabled() {
                return !swiper.params.pagination.el || !swiper.pagination.el || !swiper.pagination.$el || 0 === swiper.pagination.$el.length;
            }
            function setSideBullets($bulletEl, position) {
                const {bulletActiveClass} = swiper.params.pagination;
                $bulletEl[position]().addClass(`${bulletActiveClass}-${position}`)[position]().addClass(`${bulletActiveClass}-${position}-${position}`);
            }
            function update() {
                const rtl = swiper.rtl;
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let current;
                const total = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.loop) {
                    current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
                    if (current > slidesLength - 1 - 2 * swiper.loopedSlides) current -= slidesLength - 2 * swiper.loopedSlides;
                    if (current > total - 1) current -= total;
                    if (current < 0 && "bullets" !== swiper.params.paginationType) current = total + current;
                } else if ("undefined" !== typeof swiper.snapIndex) current = swiper.snapIndex; else current = swiper.activeIndex || 0;
                if ("bullets" === params.type && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                    const bullets = swiper.pagination.bullets;
                    let firstIndex;
                    let lastIndex;
                    let midIndex;
                    if (params.dynamicBullets) {
                        bulletSize = bullets.eq(0)[swiper.isHorizontal() ? "outerWidth" : "outerHeight"](true);
                        $el.css(swiper.isHorizontal() ? "width" : "height", `${bulletSize * (params.dynamicMainBullets + 4)}px`);
                        if (params.dynamicMainBullets > 1 && void 0 !== swiper.previousIndex) {
                            dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);
                            if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                        }
                        firstIndex = Math.max(current - dynamicBulletIndex, 0);
                        lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                        midIndex = (lastIndex + firstIndex) / 2;
                    }
                    bullets.removeClass([ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map((suffix => `${params.bulletActiveClass}${suffix}`)).join(" "));
                    if ($el.length > 1) bullets.each((bullet => {
                        const $bullet = dom(bullet);
                        const bulletIndex = $bullet.index();
                        if (bulletIndex === current) $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) $bullet.addClass(`${params.bulletActiveClass}-main`);
                            if (bulletIndex === firstIndex) setSideBullets($bullet, "prev");
                            if (bulletIndex === lastIndex) setSideBullets($bullet, "next");
                        }
                    })); else {
                        const $bullet = bullets.eq(current);
                        const bulletIndex = $bullet.index();
                        $bullet.addClass(params.bulletActiveClass);
                        if (params.dynamicBullets) {
                            const $firstDisplayedBullet = bullets.eq(firstIndex);
                            const $lastDisplayedBullet = bullets.eq(lastIndex);
                            for (let i = firstIndex; i <= lastIndex; i += 1) bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
                            if (swiper.params.loop) if (bulletIndex >= bullets.length) {
                                for (let i = params.dynamicMainBullets; i >= 0; i -= 1) bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
                                bullets.eq(bullets.length - params.dynamicMainBullets - 1).addClass(`${params.bulletActiveClass}-prev`);
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            } else {
                                setSideBullets($firstDisplayedBullet, "prev");
                                setSideBullets($lastDisplayedBullet, "next");
                            }
                        }
                    }
                    if (params.dynamicBullets) {
                        const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                        const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                        const offsetProp = rtl ? "right" : "left";
                        bullets.css(swiper.isHorizontal() ? offsetProp : "top", `${bulletsOffset}px`);
                    }
                }
                if ("fraction" === params.type) {
                    $el.find(classes_to_selector_classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
                    $el.find(classes_to_selector_classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
                }
                if ("progressbar" === params.type) {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if ("horizontal" === progressbarDirection) scaleX = scale; else scaleY = scale;
                    $el.find(classes_to_selector_classesToSelector(params.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`).transition(swiper.params.speed);
                }
                if ("custom" === params.type && params.renderCustom) {
                    $el.html(params.renderCustom(swiper, current + 1, total));
                    emit("paginationRender", $el[0]);
                } else emit("paginationUpdate", $el[0]);
                if (swiper.params.watchOverflow && swiper.enabled) $el[swiper.isLocked ? "addClass" : "removeClass"](params.lockClass);
            }
            function render() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
                const $el = swiper.pagination.$el;
                let paginationHTML = "";
                if ("bullets" === params.type) {
                    let numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - 2 * swiper.loopedSlides) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                    if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.loop && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                    for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
                    $el.html(paginationHTML);
                    swiper.pagination.bullets = $el.find(classes_to_selector_classesToSelector(params.bulletClass));
                }
                if ("fraction" === params.type) {
                    if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("progressbar" === params.type) {
                    if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
                    $el.html(paginationHTML);
                }
                if ("custom" !== params.type) emit("paginationRender", swiper.pagination.$el[0]);
            }
            function init() {
                swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                    el: "swiper-pagination"
                });
                const params = swiper.params.pagination;
                if (!params.el) return;
                let $el = dom(params.el);
                if (0 === $el.length) return;
                if (swiper.params.uniqueNavElements && "string" === typeof params.el && $el.length > 1) {
                    $el = swiper.$el.find(params.el);
                    if ($el.length > 1) $el = $el.filter((el => {
                        if (dom(el).parents(".swiper")[0] !== swiper.el) return false;
                        return true;
                    }));
                }
                if ("bullets" === params.type && params.clickable) $el.addClass(params.clickableClass);
                $el.addClass(params.modifierClass + params.type);
                $el.addClass(params.modifierClass + swiper.params.direction);
                if ("bullets" === params.type && params.dynamicBullets) {
                    $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if ("progressbar" === params.type && params.progressbarOpposite) $el.addClass(params.progressbarOppositeClass);
                if (params.clickable) $el.on("click", classes_to_selector_classesToSelector(params.bulletClass), (function onClick(e) {
                    e.preventDefault();
                    let index = dom(this).index() * swiper.params.slidesPerGroup;
                    if (swiper.params.loop) index += swiper.loopedSlides;
                    swiper.slideTo(index);
                }));
                Object.assign(swiper.pagination, {
                    $el,
                    el: $el[0]
                });
                if (!swiper.enabled) $el.addClass(params.lockClass);
            }
            function destroy() {
                const params = swiper.params.pagination;
                if (isPaginationDisabled()) return;
                const $el = swiper.pagination.$el;
                $el.removeClass(params.hiddenClass);
                $el.removeClass(params.modifierClass + params.type);
                $el.removeClass(params.modifierClass + swiper.params.direction);
                if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass) swiper.pagination.bullets.removeClass(params.bulletActiveClass);
                if (params.clickable) $el.off("click", classes_to_selector_classesToSelector(params.bulletClass));
            }
            on("init", (() => {
                init();
                render();
                update();
            }));
            on("activeIndexChange", (() => {
                if (swiper.params.loop) update(); else if ("undefined" === typeof swiper.snapIndex) update();
            }));
            on("snapIndexChange", (() => {
                if (!swiper.params.loop) update();
            }));
            on("slidesLengthChange", (() => {
                if (swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("snapGridLengthChange", (() => {
                if (!swiper.params.loop) {
                    render();
                    update();
                }
            }));
            on("destroy", (() => {
                destroy();
            }));
            on("enable disable", (() => {
                const {$el} = swiper.pagination;
                if ($el) $el[swiper.enabled ? "removeClass" : "addClass"](swiper.params.pagination.lockClass);
            }));
            on("lock unlock", (() => {
                update();
            }));
            on("click", ((_s, e) => {
                const targetEl = e.target;
                const {$el} = swiper.pagination;
                if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && $el.length > 0 && !dom(targetEl).hasClass(swiper.params.pagination.bulletClass)) {
                    if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                    const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);
                    if (true === isHidden) emit("paginationShow"); else emit("paginationHide");
                    $el.toggleClass(swiper.params.pagination.hiddenClass);
                }
            }));
            Object.assign(swiper.pagination, {
                render,
                update,
                init,
                destroy
            });
        }
        function Autoplay({swiper, extendParams, on, emit}) {
            let timeout;
            swiper.autoplay = {
                running: false,
                paused: false
            };
            extendParams({
                autoplay: {
                    enabled: false,
                    delay: 3e3,
                    waitForTransition: true,
                    disableOnInteraction: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                    pauseOnMouseEnter: false
                }
            });
            function run() {
                const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
                let delay = swiper.params.autoplay.delay;
                if ($activeSlideEl.attr("data-swiper-autoplay")) delay = $activeSlideEl.attr("data-swiper-autoplay") || swiper.params.autoplay.delay;
                clearTimeout(timeout);
                timeout = utils_nextTick((() => {
                    let autoplayResult;
                    if (swiper.params.autoplay.reverseDirection) if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isBeginning) {
                        autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop(); else if (swiper.params.loop) {
                        swiper.loopFix();
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.isEnd) {
                        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
                        emit("autoplay");
                    } else if (!swiper.params.autoplay.stopOnLastSlide) {
                        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
                        emit("autoplay");
                    } else stop();
                    if (swiper.params.cssMode && swiper.autoplay.running) run(); else if (false === autoplayResult) run();
                }), delay);
            }
            function start() {
                if ("undefined" !== typeof timeout) return false;
                if (swiper.autoplay.running) return false;
                swiper.autoplay.running = true;
                emit("autoplayStart");
                run();
                return true;
            }
            function stop() {
                if (!swiper.autoplay.running) return false;
                if ("undefined" === typeof timeout) return false;
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = void 0;
                }
                swiper.autoplay.running = false;
                emit("autoplayStop");
                return true;
            }
            function pause(speed) {
                if (!swiper.autoplay.running) return;
                if (swiper.autoplay.paused) return;
                if (timeout) clearTimeout(timeout);
                swiper.autoplay.paused = true;
                if (0 === speed || !swiper.params.autoplay.waitForTransition) {
                    swiper.autoplay.paused = false;
                    run();
                } else [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
                }));
            }
            function onVisibilityChange() {
                const document = ssr_window_esm_getDocument();
                if ("hidden" === document.visibilityState && swiper.autoplay.running) pause();
                if ("visible" === document.visibilityState && swiper.autoplay.paused) {
                    run();
                    swiper.autoplay.paused = false;
                }
            }
            function onTransitionEnd(e) {
                if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
                if (e.target !== swiper.$wrapperEl[0]) return;
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
                swiper.autoplay.paused = false;
                if (!swiper.autoplay.running) stop(); else run();
            }
            function onMouseEnter() {
                if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
                [ "transitionend", "webkitTransitionEnd" ].forEach((event => {
                    swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
                }));
            }
            function onMouseLeave() {
                if (swiper.params.autoplay.disableOnInteraction) return;
                swiper.autoplay.paused = false;
                run();
            }
            function attachMouseEvents() {
                if (swiper.params.autoplay.pauseOnMouseEnter) {
                    swiper.$el.on("mouseenter", onMouseEnter);
                    swiper.$el.on("mouseleave", onMouseLeave);
                }
            }
            function detachMouseEvents() {
                swiper.$el.off("mouseenter", onMouseEnter);
                swiper.$el.off("mouseleave", onMouseLeave);
            }
            on("init", (() => {
                if (swiper.params.autoplay.enabled) {
                    start();
                    const document = ssr_window_esm_getDocument();
                    document.addEventListener("visibilitychange", onVisibilityChange);
                    attachMouseEvents();
                }
            }));
            on("beforeTransitionStart", ((_s, speed, internal) => {
                if (swiper.autoplay.running) if (internal || !swiper.params.autoplay.disableOnInteraction) swiper.autoplay.pause(speed); else stop();
            }));
            on("sliderFirstMove", (() => {
                if (swiper.autoplay.running) if (swiper.params.autoplay.disableOnInteraction) stop(); else pause();
            }));
            on("touchEnd", (() => {
                if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) run();
            }));
            on("destroy", (() => {
                detachMouseEvents();
                if (swiper.autoplay.running) stop();
                const document = ssr_window_esm_getDocument();
                document.removeEventListener("visibilitychange", onVisibilityChange);
            }));
            Object.assign(swiper.autoplay, {
                pause,
                run,
                start,
                stop
            });
        }
        function Thumb({swiper, extendParams, on}) {
            extendParams({
                thumbs: {
                    swiper: null,
                    multipleActiveThumbs: true,
                    autoScrollOffset: 0,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-thumbs"
                }
            });
            let initialized = false;
            let swiperCreated = false;
            swiper.thumbs = {
                swiper: null
            };
            function onThumbClick() {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper) return;
                const clickedIndex = thumbsSwiper.clickedIndex;
                const clickedSlide = thumbsSwiper.clickedSlide;
                if (clickedSlide && dom(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
                if ("undefined" === typeof clickedIndex || null === clickedIndex) return;
                let slideToIndex;
                if (thumbsSwiper.params.loop) slideToIndex = parseInt(dom(thumbsSwiper.clickedSlide).attr("data-swiper-slide-index"), 10); else slideToIndex = clickedIndex;
                if (swiper.params.loop) {
                    let currentIndex = swiper.activeIndex;
                    if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
                        swiper.loopFix();
                        swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
                        currentIndex = swiper.activeIndex;
                    }
                    const prevIndex = swiper.slides.eq(currentIndex).prevAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                    const nextIndex = swiper.slides.eq(currentIndex).nextAll(`[data-swiper-slide-index="${slideToIndex}"]`).eq(0).index();
                    if ("undefined" === typeof prevIndex) slideToIndex = nextIndex; else if ("undefined" === typeof nextIndex) slideToIndex = prevIndex; else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex; else slideToIndex = prevIndex;
                }
                swiper.slideTo(slideToIndex);
            }
            function init() {
                const {thumbs: thumbsParams} = swiper.params;
                if (initialized) return false;
                initialized = true;
                const SwiperClass = swiper.constructor;
                if (thumbsParams.swiper instanceof SwiperClass) {
                    swiper.thumbs.swiper = thumbsParams.swiper;
                    Object.assign(swiper.thumbs.swiper.originalParams, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                    Object.assign(swiper.thumbs.swiper.params, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                } else if (utils_isObject(thumbsParams.swiper)) {
                    const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
                    Object.assign(thumbsSwiperParams, {
                        watchSlidesProgress: true,
                        slideToClickedSlide: false
                    });
                    swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
                    swiperCreated = true;
                }
                swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
                swiper.thumbs.swiper.on("tap", onThumbClick);
                return true;
            }
            function update(initial) {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper) return;
                const slidesPerView = "auto" === thumbsSwiper.params.slidesPerView ? thumbsSwiper.slidesPerViewDynamic() : thumbsSwiper.params.slidesPerView;
                const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
                const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;
                if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
                    let currentThumbsIndex = thumbsSwiper.activeIndex;
                    let newThumbsIndex;
                    let direction;
                    if (thumbsSwiper.params.loop) {
                        if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
                            thumbsSwiper.loopFix();
                            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
                            currentThumbsIndex = thumbsSwiper.activeIndex;
                        }
                        const prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                        const nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`).eq(0).index();
                        if ("undefined" === typeof prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else if ("undefined" === typeof nextThumbsIndex) newThumbsIndex = prevThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex; else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) newThumbsIndex = nextThumbsIndex; else newThumbsIndex = prevThumbsIndex;
                        direction = swiper.activeIndex > swiper.previousIndex ? "next" : "prev";
                    } else {
                        newThumbsIndex = swiper.realIndex;
                        direction = newThumbsIndex > swiper.previousIndex ? "next" : "prev";
                    }
                    if (useOffset) newThumbsIndex += "next" === direction ? autoScrollOffset : -1 * autoScrollOffset;
                    if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
                        if (thumbsSwiper.params.centeredSlides) if (newThumbsIndex > currentThumbsIndex) newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1; else newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1; else if (newThumbsIndex > currentThumbsIndex && 1 === thumbsSwiper.params.slidesPerGroup) ;
                        thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : void 0);
                    }
                }
                let thumbsToActivate = 1;
                const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;
                if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) thumbsToActivate = swiper.params.slidesPerView;
                if (!swiper.params.thumbs.multipleActiveThumbs) thumbsToActivate = 1;
                thumbsToActivate = Math.floor(thumbsToActivate);
                thumbsSwiper.slides.removeClass(thumbActiveClass);
                if (thumbsSwiper.params.loop || thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled) for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.$wrapperEl.children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`).addClass(thumbActiveClass); else for (let i = 0; i < thumbsToActivate; i += 1) thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
            }
            on("beforeInit", (() => {
                const {thumbs} = swiper.params;
                if (!thumbs || !thumbs.swiper) return;
                init();
                update(true);
            }));
            on("slideChange update resize observerUpdate", (() => {
                if (!swiper.thumbs.swiper) return;
                update();
            }));
            on("setTransition", ((_s, duration) => {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper) return;
                thumbsSwiper.setTransition(duration);
            }));
            on("beforeDestroy", (() => {
                const thumbsSwiper = swiper.thumbs.swiper;
                if (!thumbsSwiper) return;
                if (swiperCreated && thumbsSwiper) thumbsSwiper.destroy();
            }));
            Object.assign(swiper.thumbs, {
                init,
                update
            });
        }
        function bildSliders() {
            let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
            if (sliders) sliders.forEach((slider => {
                slider.parentElement.classList.add("swiper");
                slider.classList.add("swiper-wrapper");
                for (const slide of slider.children) slide.classList.add("swiper-slide");
            }));
        }
        function initSliders() {
            bildSliders();
            if (document.querySelector(".top-slider-block__slider")) new core(".top-slider-block__slider", {
                modules: [ Navigation, Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 1e3,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".special-offers__button-prev",
                    nextEl: ".special-offers__button-next"
                },
                on: {}
            });
            if (document.querySelector(".main-block__slider")) new core(".main-block__slider", {
                modules: [ Navigation, Pagination, Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                loop: true,
                effect: "fade",
                pagination: {
                    el: ".main-block__pagination",
                    clickable: true
                },
                navigation: {
                    prevEl: ".main-block__button-prev",
                    nextEl: ".main-block__button-next"
                },
                on: {}
            });
            if (document.querySelector(".new-arrivals__slider")) new core(".new-arrivals__slider", {
                modules: [ Pagination, Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: 6,
                spaceBetween: 30,
                speed: 800,
                loop: true,
                pagination: {
                    el: ".new-arrivals__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        autoHeight: true
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 15
                    },
                    900: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 30
                    }
                },
                on: {}
            });
            if (document.querySelector(".trending-items__slider")) new core(".trending-items__slider", {
                modules: [ Navigation, Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 30,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".trending-items__button-prev",
                    nextEl: ".trending-items__button-next"
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        autoHeight: true
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    800: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                },
                on: {}
            });
            if (document.querySelector(".sale__slider")) new core(".sale__slider", {
                modules: [ Navigation, Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 30,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".sale__button-prev",
                    nextEl: ".sale__button-next"
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        autoHeight: true
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    800: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    }
                },
                on: {}
            });
            if (document.querySelector(".thumbs-images")) {
                const thumbsSwiper = new core(".thumbs-images", {
                    modules: [ Navigation, Thumb ],
                    observer: true,
                    watchOverflow: true,
                    observeParents: true,
                    slidesPerView: 5,
                    spaceBetween: 30,
                    loop: true,
                    speed: 800,
                    breakpoints: {
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1330: {
                            slidesPerView: 5,
                            spaceBetween: 30
                        }
                    },
                    on: {}
                });
                new core(".product-gallery__slider", {
                    modules: [ Navigation, Autoplay, Thumb ],
                    thumbs: {
                        swiper: thumbsSwiper
                    },
                    observer: true,
                    watchOverflow: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    speed: 800,
                    navigation: {
                        prevEl: ".product-gallery__button-prev",
                        nextEl: ".product-gallery__button-next"
                    },
                    on: {}
                });
            }
            if (document.querySelector(".card-product__slider")) new core(".card-product__slider", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".card-product__button-prev",
                    nextEl: ".card-product__button-next"
                },
                on: {}
            });
            if (document.querySelector(".suitable-goods__slider")) new core(".suitable-goods__slider", {
                modules: [ Navigation, Pagination, Autoplay ],
                observer: true,
                observeParents: true,
                slidesPerView: 2,
                spaceBetween: 30,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".suitable-goods__button-prev",
                    nextEl: ".suitable-goods__button-next"
                },
                pagination: {
                    el: ".suitable-goods__pagination",
                    clickable: true
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    600: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    768.5: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    }
                },
                on: {}
            });
            if (document.querySelector(".related-offers__slider")) new core(".related-offers__slider", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".related-offers__button-prev",
                    nextEl: ".related-offers__button-next"
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    375: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 25
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                },
                on: {}
            });
            if (document.querySelector(".recently-viewed-products__slider")) new core(".recently-viewed-products__slider", {
                modules: [ Navigation ],
                observer: true,
                observeParents: true,
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 800,
                loop: true,
                navigation: {
                    prevEl: ".recently-viewed-products__button-prev",
                    nextEl: ".recently-viewed-products__button-prev"
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 0
                    },
                    375: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 25
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                },
                on: {}
            });
        }
        window.addEventListener("load", (function(e) {
            initSliders();
        }));
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        let script_bodyLockStatus = true;
        let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const tabletResolution = 991.98;
        const pageProduct = !!document.querySelector(".product");
        const pageCatalog = !!document.querySelector(".catalog");
        document.addEventListener("click", documentActions);
        function documentActions(e) {
            const targetElement = e.target;
            if (targetElement.closest("[data-parent]")) {
                const subMenuId = targetElement.dataset.parent ? targetElement.dataset.parent : null;
                const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
                if (subMenu) {
                    const activeLink = document.querySelector("._sub-menu-active");
                    const activeBlock = document.querySelector("._sub-menu-open");
                    if (activeLink && activeLink !== targetElement) {
                        activeLink.classList.remove("_sub-menu-active");
                        activeBlock.classList.remove("_sub-menu-open");
                        document.documentElement.classList.remove("sub-menu-open");
                    }
                    document.documentElement.classList.toggle("sub-menu-open");
                    targetElement.classList.toggle("_sub-menu-active");
                    subMenu.classList.toggle("_sub-menu-open");
                } else console.log("Подходящего subMenu нет");
                e.preventDefault();
            }
            if (!targetElement.closest(".menu__btn-back")) if (document.documentElement.classList.contains("sub-menu-open")) if (!targetElement.closest(".body-header__sub-menu") && !targetElement.closest(".menu-body-header__link")) {
                const activeLinkMenu = document.querySelector("._sub-menu-active");
                const activeBlockSubMenu = document.querySelector("._sub-menu-open");
                closeSubMenu(activeLinkMenu, activeBlockSubMenu);
            }
            if (viewportWidth <= tabletResolution) if (targetElement.closest(".sub-menu-column__category-title")) {
                document.documentElement.classList.add("category-list-open");
                e.preventDefault();
            }
            if (targetElement.closest(".menu__btn-back")) {
                let categoryListOpen = document.documentElement.classList.contains("category-list-open");
                let subMenuOpen = document.documentElement.classList.contains("sub-menu-open");
                if (categoryListOpen) document.documentElement.classList.remove("category-list-open"); else if (subMenuOpen) {
                    document.documentElement.classList.remove("sub-menu-open");
                    closeSubMenu();
                }
                e.preventDefault();
            }
        }
        function closeSubMenu() {
            const activeLink = document.querySelector("._sub-menu-active");
            const activeBlock = document.querySelector("._sub-menu-open");
            activeLink.classList.remove("_sub-menu-active");
            activeBlock.classList.remove("_sub-menu-open");
            document.documentElement.classList.remove("sub-menu-open");
        }
        if (pageProduct) {
            const colorInputs = document.querySelectorAll(".color-selection__item>.color-block__input");
            if (colorInputs) colorInputs.forEach((colorInput => {
                colorInput.addEventListener("click", (function(e) {
                    document.querySelector(".color-selection__selection-value").innerHTML = e.target.value;
                }));
            }));
        }
        if (pageCatalog) {
            const btnCatalogToolbar = document.querySelector(".toolbar__button");
            btnCatalogToolbar.addEventListener("click", (function(e) {
                if (viewportWidth <= tabletResolution) script_bodyLockToggle();
                document.documentElement.classList.toggle("filters-show");
                btnCatalogToolbar.classList.toggle("_show");
                changeNameBtn(btnCatalogToolbar);
            }));
        }
        function changeNameBtn(toolbarBtn) {
            if (toolbarBtn.classList.contains("_show")) toolbarBtn.firstElementChild.innerHTML = "Hide &nbsp"; else toolbarBtn.firstElementChild.innerHTML = "Show &nbsp";
        }
        const btnsAddProductToCart = document.querySelectorAll(".button-add-to-cart");
        btnsAddProductToCart.forEach((btnAddProductToCart => {
            btnAddProductToCart.addEventListener("click", (function(e) {
                if (pageProduct) {
                    let product = e.target.closest(".product");
                    var productObject = {
                        sale: product.querySelector(".card-product__sale"),
                        imageScr: product.querySelector(".product-gallery__wrapper>.swiper-slide:first-child>img").getAttribute("src"),
                        description: product.querySelector(".product-gallery__wrapper>.swiper-slide:first-child>img").getAttribute("alt"),
                        name: product.querySelector(".product__title").innerHTML,
                        quantity: product.querySelector(".quantity__input").value,
                        size: product.querySelector(".size-selection__select option").value,
                        color: product.querySelector(".color-selection__selection-value").innerHTML,
                        newPrice: product.querySelector(".product-prices__new-price>.product-prices__price").innerHTML,
                        oldPrice: product.querySelector(".product-prices__old-price>.product-prices__price").innerHTML
                    };
                } else {
                    let product = e.target.closest(".card-product");
                    let price = product.querySelector(".card-product__price>.product-prices__price");
                    let newPrice = product.querySelector(".price-product__new-price>.product-prices__price");
                    let oldPrice = product.querySelector(".price-product__old-price>.product-prices__price");
                    productObject = {
                        sale: product.querySelector(".card-product__sale"),
                        imageScr: product.querySelector(".card-product__img-ibg>img").getAttribute("src"),
                        description: product.querySelector(".card-product__img-ibg>img").getAttribute("alt"),
                        name: product.querySelector(".card-product__title-link").innerHTML,
                        quantity: 1,
                        size: product.querySelector(".product-actions__size-input[checked]").value,
                        color: product.querySelector(".color-block__input[checked]").value,
                        price: newPrice ? 0 : price.innerHTML,
                        newPrice: newPrice ? newPrice.innerHTML : 0,
                        oldPrice: oldPrice ? oldPrice.innerHTML : 0
                    };
                }
                const popupCartProductList = document.querySelector(".popup-cart__product-list");
                if (!popupCartProductList.children.length) document.querySelector(".popup-cart__text").setAttribute("hidden", "hidden");
                if (productObject.sale) popupCartProductList.insertAdjacentHTML("beforeend", `<li class="popup-cart__product-item product-block">\n                            <div class="product-block__img-ibg">\n                            \x3c!--Вставляем путь к картинке--\x3e\n                                <img src="${productObject.imageScr}" alt="${productObject.description}">\n                            </div>\n                            <div class="product-block__info">\n                                <div class="product-block__line">\n                                \x3c!--Вставляем имя товара--\x3e\n                                    <div class="product-block__title">${productObject.name}</div>\n                                    <button type="button" class="product-block__button-delete _icon-delete"></button>\n                                </div>\n                                <div class="product-block__details">\n                                \x3c!--Вставляем цвет товара--\x3e\n                                    Color: <span class="popup-cart__color">${productObject.color}</span></div>\n                                <div class="product-block__details">\n                                \x3c!--Вставляем размер товара--\x3e\n                                    Size: <span class="popup-cart__size">${productObject.size}</span></div>\n\n                                <div class="product-block__line">\n                                    <div class="product-block__quantity quantity">\n                                        <div class="quantity__counter">\n                                        \x3c!--Вставляем количество товара--\x3e\n                                            <input class="quantity__input" autocomplete="off"\n                                                   type="number" name="cart-quantity-counter"\n                                                   value="${productObject.quantity}" maxlength="3" min="1" max="100" step="9">\n                                        </div>\n                                        <div class="quantity__controll">\n                                            <button type="button"\n                                                    class="quantity__button quantity__button_plus">\n                                                <span class="visually-hidden">Increase the number of displayed products per page by 3</span>\n                                            </button>\n                                            <button type="button"\n                                                    class="quantity__button quantity__button_minus">\n                                                <span class="visually-hidden">Decrease the number of displayed products per page by 3</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                    <div class="product-block__prices product-prices">\n                                        <div class="product-prices__new-price">\n                                            <span class="currency">$</span>\n                                            \x3c!--Вставляем новую цену товара--\x3e\n                                            <span class="product-prices__price">${productObject.newPrice}</span></div>\n                                        <div class="product-prices__old-price">\n                                            <span class="currency">$</span>\n                                            \x3c!--Вставляем старую цену товара--\x3e\n                                            <span class="product-prices__price">${productObject.oldPrice}</span>\n                                        </div>\n                                    </div>\n                                </div>\n                                <button type="button" class="product-block__button-favorite _icon-favorite">Move\n                                    to\n                                </button>\n                            </div>\n                        </li>`); else popupCartProductList.insertAdjacentHTML("beforeend", `<li class="popup-cart__product-item product-block">\n                            <div class="product-block__img-ibg">\n                            \x3c!--Вставляем путь к картинке--\x3e\n                                <img src="${productObject.imageScr}" alt="${productObject.description}">\n                            </div>\n                            <div class="product-block__info">\n                                <div class="product-block__line">\n                                \x3c!--Вставляем имя товара--\x3e\n                                    <div class="product-block__title">${productObject.name}</div>\n                                    <button type="button" class="product-block__button-delete _icon-delete"></button>\n                                </div>\n                                <div class="product-block__details">\n                                \x3c!--Вставляем цвет товара--\x3e\n                                    Color: <span class="popup-cart__color">${productObject.color}</span></div>\n                                <div class="product-block__details">\n                                \x3c!--Вставляем размер товара--\x3e\n                                    Size: <span class="popup-cart__size">${productObject.size}</span></div>\n\n                                <div class="product-block__line">\n                                    <div class="product-block__quantity quantity">\n                                        <div class="quantity__counter">\n                                        \x3c!--Вставляем количество товара--\x3e\n                                            <input class="quantity__input" autocomplete="off"\n                                                   type="number" name="cart-quantity-counter"\n                                                   value="${productObject.quantity}" maxlength="3" min="1" max="100" step="9">\n                                        </div>\n                                        <div class="quantity__controll">\n                                            <button type="button"\n                                                    class="quantity__button quantity__button_plus">\n                                                <span class="visually-hidden">Increase the number of displayed products per page by 3</span>\n                                            </button>\n                                            <button type="button"\n                                                    class="quantity__button quantity__button_minus">\n                                                <span class="visually-hidden">Decrease the number of displayed products per page by 3</span>\n                                            </button>\n                                        </div>\n                                    </div>\n                                    <div class="product-block__prices product-prices price-without-sale">\n                                        <span class="currency">$</span><span class="product-prices__price">${productObject.price}</span>\n                                    </div>\n                                </div>\n                                <button type="button" class="product-block__button-favorite _icon-favorite">Move\n                                    to\n                                </button>\n                            </div>\n                        </li>`);
                const btnFavorite = document.querySelector(".popup-cart__product-item:last-child .product-block__button-favorite");
                btnFavoriteEventListener(btnFavorite);
                const btnDelete = document.querySelector(".popup-cart__product-item:last-child .product-block__button-delete");
                btnDeleteEventListener(btnDelete);
                script_calcTotalCartSum();
                const cart = document.querySelector("button.actions__cart");
                cart.classList.add("_scale");
                setTimeout((function() {
                    cart.classList.remove("_scale");
                }), 200);
                const cartCounter = document.querySelector("button.actions__cart").children[1];
                let productQuantity = productObject.quantity;
                cartCounter.innerHTML = Number(cartCounter.innerHTML) + Number(productQuantity);
                document.querySelector(".popup-cart__products-count").innerHTML = cartCounter.innerHTML;
            }));
        }));
        const btnsDeleteProductFromCart = document.querySelectorAll(".product-block__button-delete");
        btnsDeleteProductFromCart.forEach((btnDeleteProductFromCart => {
            btnDeleteEventListener(btnDeleteProductFromCart);
        }));
        function btnDeleteEventListener(btnDeleteProductFromCart) {
            btnDeleteProductFromCart.addEventListener("click", (function(e) {
                const cartCounter = document.querySelector("button.actions__cart").children[1];
                const productQuantity = e.target.closest(".product-block__info").querySelector(".quantity__input").value;
                if (cartCounter.innerHTML) cartCounter.innerHTML = Number(cartCounter.innerHTML) - Number(productQuantity); else cartCounter.innerHTML = "0";
                document.querySelector(".popup-cart__products-count").innerHTML = cartCounter.innerHTML;
                e.target.closest(".product-block").remove();
                if (!document.querySelector(".popup-cart__product-list").children.length) {
                    document.querySelector(".popup-cart__text").removeAttribute("hidden");
                    document.querySelector(".popup_open").classList.remove("popup_open");
                    document.documentElement.classList.remove("popup-show");
                    script_bodyUnlock();
                }
                script_calcTotalCartSum();
            }));
        }
        function script_calcTotalCartSum() {
            let totalSum = document.querySelector(".summary__total-sum-value");
            let totalSumValue = 0;
            let productQuantity = document.querySelectorAll(".popup-cart .quantity__input");
            let productPricesWithSale = document.querySelectorAll(".popup-cart .product-prices__new-price>.product-prices__price");
            let productPricesWithoutSale = document.querySelectorAll(".popup-cart .price-without-sale>.product-prices__price");
            let productPricesWithSaleArray = Array.prototype.slice.call(productPricesWithSale);
            let productPricesWithoutSaleArray = Array.prototype.slice.call(productPricesWithoutSale);
            let productPrices = productPricesWithSaleArray.concat(productPricesWithoutSaleArray);
            for (let i = 0; i < productQuantity.length; i++) totalSumValue += Number(productQuantity[i].value) * Number(productPrices[i].innerHTML);
            totalSum.innerHTML = totalSumValue.toFixed(2);
        }
        const btnsFavoritePopup = document.querySelectorAll(".product-block__button-favorite");
        btnsFavoritePopup.forEach((btnFavoritePopup => {
            btnFavoriteEventListener(btnFavoritePopup);
        }));
        const btnsFavoriteProductCard = document.querySelectorAll(".card-product__button-favorite");
        btnsFavoriteProductCard.forEach((btnFavoriteProductCard => {
            btnFavoriteEventListener(btnFavoriteProductCard);
        }));
        if (pageProduct) btnFavoriteEventListener(document.querySelector(".product-form-actions__button._icon-favorite"));
        function btnFavoriteEventListener(btnFavorite) {
            btnFavorite.addEventListener("click", (function(e) {
                e.preventDefault();
                btnFavorite.classList.toggle("_active");
                const counterFavorite = document.querySelector(".actions__favorite span");
                if (btnFavorite.classList.contains("_active")) counterFavorite.innerHTML = Number(counterFavorite.innerHTML) + 1; else counterFavorite.innerHTML = Number(counterFavorite.innerHTML) - 1;
            }));
        }
        const btnsDisplayPassword = document.querySelectorAll(".form-log-in__button-display-password");
        btnsDisplayPassword.forEach((btnDisplayPassword => {
            btnDisplayPassword.addEventListener("click", (function(e) {
                let inputType = btnDisplayPassword.nextElementSibling.type;
                if ("password" === inputType) btnDisplayPassword.nextElementSibling.type = "text"; else btnDisplayPassword.nextElementSibling.type = "password";
                e.target.classList.toggle("_active");
            }));
        }));
        const btnMobileSearch = document.querySelector(".search-block__button-mobile");
        btnMobileSearch.addEventListener("click", (function(e) {
            document.documentElement.classList.add("search-open");
            script_bodyLockToggle();
            e.preventDefault();
        }));
        document.querySelector(".mobile-search__close-button").addEventListener("click", (function(e) {
            document.documentElement.classList.remove("search-open");
            script_bodyLockToggle();
        }));
        document.addEventListener("click", (function(e) {
            if (script_bodyLockStatus && e.target.closest(".icon-menu")) {
                script_bodyLockToggle();
                if (!document.documentElement.classList.contains("filters-show")) document.documentElement.classList.toggle("menu-open"); else {
                    const toolbarBtn = document.querySelector(".toolbar__button");
                    toolbarBtn.classList.toggle("_show");
                    changeNameBtn(toolbarBtn);
                    document.documentElement.classList.remove("filters-show");
                }
                if (!document.documentElement.classList.contains("menu-open")) {
                    document.documentElement.classList.remove("sub-menu-open");
                    document.documentElement.classList.remove("category-list-open");
                    closeSubMenu();
                }
            }
        }));
        const delay = 500;
        let script_bodyLockToggle = () => {
            if (document.documentElement.classList.contains("lock")) script_bodyUnlock(delay); else script_bodyLock(delay);
        };
        let script_bodyLock = () => {
            let body = document.querySelector("body");
            if (script_bodyLockStatus) {
                let lockPaddings = document.querySelectorAll(".lock-padding");
                const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
                for (let index = 0; index < lockPaddings.length; index++) {
                    const el = lockPaddings[index];
                    el.style.paddingRight = lockPaddingValue;
                }
                body.style.paddingRight = lockPaddingValue;
                document.documentElement.classList.add("lock");
                script_bodyLockStatus = false;
                setTimeout((function() {
                    script_bodyLockStatus = true;
                }), delay);
            }
        };
        let script_bodyUnlock = () => {
            let body = document.querySelector("body");
            if (script_bodyLockStatus) {
                let lockPaddings = document.querySelectorAll(".lock-padding");
                setTimeout((() => {
                    for (let index = 0; index < lockPaddings.length; index++) {
                        const el = lockPaddings[index];
                        el.style.paddingRight = "0px";
                    }
                    body.style.paddingRight = "0px";
                    document.documentElement.classList.remove("lock");
                }), delay);
                script_bodyLockStatus = false;
                setTimeout((function() {
                    script_bodyLockStatus = true;
                }), delay);
            }
        };
        const activateCustomSelect = () => {
            const customSelects = document.querySelectorAll(".custom-select");
            if (customSelects) customSelects.forEach((customSelect => {
                new Choices(customSelect, {
                    searchEnabled: false,
                    itemSelectText: "",
                    placeholder: true,
                    placeholderValue: null
                });
            }));
        };
        activateCustomSelect();
        document.addEventListener("DOMContentLoaded", (() => {
            if (document.querySelector(".time-counter")) {
                const referenceDate = new Date("Jan 1 2023 00:00:00");
                const daysValue = document.querySelector(".time-counter__days .time-counter__value");
                const hoursValue = document.querySelector(".time-counter__hours .time-counter__value");
                const minutesValue = document.querySelector(".time-counter__minutes .time-counter__value");
                const secondsValue = document.querySelector(".time-counter__seconds .time-counter__value");
                const daysText = document.querySelector(".time-counter__days .time-counter__label");
                const hoursText = document.querySelector(".time-counter__hours .time-counter__label");
                const minutesText = document.querySelector(".time-counter__minutes .time-counter__label");
                const secondsText = document.querySelector(".time-counter__seconds .time-counter__label");
                function declOfNum(number, titles) {
                    let cases = [ 2, 0, 1, 1, 1, 2 ];
                    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
                }
                function timeCounter() {
                    let currentDate = new Date;
                    let leftUntil = referenceDate - currentDate;
                    let daysUntil = Math.floor(leftUntil / 1e3 / 60 / 60 / 24);
                    let hoursUntil = Math.floor(leftUntil / 1e3 / 60 / 60) % 24;
                    let minutesUntil = Math.floor(leftUntil / 1e3 / 60) % 60;
                    let secondsUntil = Math.floor(leftUntil / 1e3) % 60;
                    daysValue.innerHTML = daysUntil.toString();
                    hoursValue.innerHTML = hoursUntil.toString();
                    minutesValue.innerHTML = minutesUntil.toString();
                    secondsValue.innerHTML = secondsUntil.toString();
                    daysText.innerHTML = declOfNum(daysUntil, [ "день", "дня", "дней" ]);
                    hoursText.innerHTML = declOfNum(hoursUntil, [ "час", "часa", "часов" ]);
                    minutesText.innerHTML = declOfNum(minutesUntil, [ "минута", "минуты", "минут" ]);
                    secondsText.innerHTML = declOfNum(secondsUntil, [ "секунда", "секунды", "секунд" ]);
                }
                timeCounter();
                setInterval(timeCounter, 1e3);
            }
        }));
        (function() {
            "use strict";
            const goTopBtn = document.querySelector(".btn-back-to-top");
            if (goTopBtn) {
                window.addEventListener("scroll", trackScroll);
                goTopBtn.addEventListener("click", backToTop);
            }
            const goTopLink = document.querySelector(".bottom-footer__top-link");
            if (goTopLink) goTopLink.addEventListener("click", backToTop);
            function trackScroll() {
                let scrolled = window.scrollY;
                let coords = document.documentElement.clientHeight;
                if (scrolled > coords) goTopBtn.classList.add("btn-back-to-top_show");
                if (scrolled < coords) goTopBtn.classList.remove("btn-back-to-top_show");
            }
            function backToTop() {
                if (window.scrollY > 0) {
                    window.scrollBy(0, -80);
                    setTimeout(backToTop, 0);
                }
            }
        })();
        const popupLinks = document.querySelectorAll("[data-popup]");
        if (popupLinks) {
            popupLinks.forEach((popupLink => {
                popupLink.addEventListener("click", (e => {
                    const popupName = popupLink.dataset.popup ? popupLink.dataset.popup : null;
                    const currentPopup = document.querySelector(`.${popupName}`);
                    if (currentPopup) if (e.target.classList.contains("subscribe-button")) {
                        const input = e.target.previousElementSibling;
                        const correctEmail = validateEmail(e.target.previousElementSibling);
                        const formBlock = e.target.parentElement;
                        const error = formBlock.parentElement.querySelector(".error");
                        if (!correctEmail && !error) createErrorMessage(input); else if (correctEmail) {
                            if (error) formBlock.nextElementSibling.remove();
                            input.value = "";
                            popupOpen(currentPopup);
                        }
                    } else popupOpen(currentPopup); else console.log("Нет такого всплывающего окна!");
                    e.preventDefault();
                }));
            }));
            function popupOpen(currentPopup) {
                if (currentPopup && script_bodyLockStatus) {
                    const activePopup = document.querySelector(".popup_open");
                    if (activePopup) popupClose(activePopup, false); else script_bodyLock();
                    currentPopup.classList.add("popup_open");
                    document.documentElement.classList.add("popup-show");
                    document.addEventListener("click", (e => {
                        if (!(e.target.closest(".popup__content") || e.target.closest(".product-block__button-delete"))) popupClose(document.querySelector(`.popup_open`));
                    }));
                }
            }
            const popupCloseBtns = document.querySelectorAll(".popup__close");
            if (popupCloseBtns) popupCloseBtns.forEach((popupCloseBtn => {
                popupCloseBtn.addEventListener("click", (e => {
                    popupClose(popupCloseBtn.closest(".popup"));
                    e.preventDefault();
                }));
            }));
            function popupClose(activePopup, doUnlock = true) {
                if (script_bodyLockStatus) {
                    activePopup.classList.remove("popup_open");
                    document.documentElement.classList.remove("popup-show");
                    if (doUnlock) script_bodyUnlock();
                }
            }
            document.addEventListener("keydown", (function(e) {
                if (27 === e.keyCode) {
                    const activePopup = document.querySelector(".popup_open");
                    if (activePopup) popupClose(activePopup);
                    const activeSubmenu = document.querySelector(".sub-menu-open");
                    if (activeSubmenu) {
                        const activeLinkMenu = document.querySelector("._sub-menu-active");
                        const activeBlockSubMenu = document.querySelector("._sub-menu-open");
                        closeSubMenu(activeLinkMenu, activeBlockSubMenu);
                    }
                }
            }));
        }
        const daElements = document.querySelectorAll("[data-da]");
        if (daElements) {
            let originalPositions = [];
            let daElementsArray = [];
            let daMatchMedia = [];
            function dynamicAdaptActions() {
                if (daElements) {
                    let number = 0;
                    for (let index = 0; index < daElements.length; index++) {
                        const daElement = daElements[index];
                        const daAttr = daElement.getAttribute("data-da");
                        const daAttrArray = daAttr.split(",");
                        daElement.setAttribute("data-da-index", number);
                        originalPositions[number] = {
                            parent: daElement.parentNode,
                            index: indexInParent(daElement)
                        };
                        daElementsArray[number] = {
                            element: daElement,
                            destination: document.querySelector("." + daAttrArray[0].trim()),
                            place: daAttrArray[1].trim(),
                            breakpoint: daAttrArray[2].trim()
                        };
                        number++;
                    }
                }
                dynamicAdaptSort(daElementsArray);
                for (let index = 0; index < daElementsArray.length; index++) {
                    const daElement = daElementsArray[index];
                    const daBreakpoint = daElement.breakpoint;
                    const daType = "max";
                    daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
                    daMatchMedia[index].addListener(dynamicAdapt);
                }
            }
            dynamicAdaptActions();
            function dynamicAdapt(e) {
                for (let index = 0; index < daElementsArray.length; index++) {
                    const el = daElementsArray[index];
                    const daElement = el.element;
                    const daDestination = el.destination;
                    const daPlace = el.place;
                    const daBreakpoint = el.breakpoint;
                    const daClassName = "dynamic-adapt" + daBreakpoint;
                    if (daMatchMedia[index].matches) {
                        if (!daElement.classList.contains(daClassName)) {
                            let actualIndex;
                            if ("first" == daPlace) actualIndex = indexOfElements(daDestination)[0]; else if ("last" == daPlace) actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length]; else actualIndex = indexOfElements(daDestination)[daPlace];
                            daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                            daElement.classList.add(daClassName);
                        }
                    } else if (daElement.classList.contains(daClassName)) {
                        dynamicAdaptBack(daElement);
                        daElement.classList.remove(daClassName);
                    }
                }
                customAdapt();
            }
            dynamicAdapt();
            function dynamicAdaptBack(el) {
                const daIndex = el.getAttribute("data-da-index");
                const originalPlace = originalPositions[daIndex];
                const parentPlace = originalPlace["parent"];
                const indexPlace = originalPlace["index"];
                const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
                parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
            }
            function indexInParent(el) {
                let children = Array.prototype.slice.call(el.parentNode.children);
                return children.indexOf(el);
            }
            function indexOfElements(parent, back) {
                const children = parent.children;
                const childrenArray = [];
                for (let i = 0; i < children.length; i++) {
                    const childrenElement = children[i];
                    if (back) childrenArray.push(i); else if (null == childrenElement.getAttribute("data-da")) childrenArray.push(i);
                }
                return childrenArray;
            }
            function dynamicAdaptSort(arr) {
                arr.sort((function(a, b) {
                    if (a.breakpoint > b.breakpoint) return -1; else return 1;
                }));
                arr.sort((function(a, b) {
                    if (a.place > b.place) return 1; else return -1;
                }));
            }
            function customAdapt() {}
            window.addEventListener("resize", dynamicAdapt);
        }
        document.querySelector('form[name="review"]').addEventListener("submit", (e => {
            const textarea = document.querySelector(".form-review__textarea");
            const textInput = document.querySelector('[name="review-input-text"]');
            textInput.value = textarea.value;
        }));
        document.addEventListener("submit", (e => {
            const inputs = e.target.querySelectorAll('input[type="text"],input[type="password"]');
            inputs.forEach((input => {
                if (!input.value) {
                    if (!input.parentElement.querySelector(".error") && !input.parentElement.parentElement.querySelector(".error")) createErrorMessage(input);
                    e.preventDefault();
                }
            }));
        }));
        const inputs = document.querySelectorAll('input[type="text"],input[type="password"]');
        inputs.forEach((input => {
            input.addEventListener("focus", (e => {
                if (input.parentElement.querySelector(".error")) input.nextElementSibling.remove();
                if ("password" === input.type) {
                    const passwordConfirmation = document.querySelector('[name="log-in-input-password-confirmation"]');
                    passwordConfirmation.nextElementSibling.remove();
                }
            }));
            if (input.classList.contains("input-mail")) input.addEventListener("blur", (e => {
                if (input.value && !input.parentElement.querySelector(".error")) if (!validateEmail(input)) createErrorMessage(input);
            }));
            if ("password" === input.type) input.addEventListener("blur", (e => {
                const password = document.querySelector('[name="log-in-input-password"]');
                const passwordConfirmation = document.querySelector('[name="log-in-input-password-confirmation"]');
                if (!passwordConfirmation.parentElement.querySelector(".error") && (password.value || passwordConfirmation.value)) if (password.value !== passwordConfirmation.value) createErrorMessage(passwordConfirmation);
            }));
        }));
        function createErrorMessage(input) {
            const errorMessage = document.createElement("span");
            errorMessage.innerHTML = input.getAttribute("data-error");
            errorMessage.classList.add("error");
            if (input.classList.contains("subscribe-input")) input.parentElement.insertAdjacentElement("afterend", errorMessage); else input.parentElement.insertAdjacentElement("beforeend", errorMessage);
        }
        function validateEmail(input) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
        if (pageProduct) {
            let dropArea = document.getElementById("drop-area");
            if (dropArea) {
                dropArea.addEventListener("change", handleFiles);
                dropArea.addEventListener("drop", handleFiles);
                function handleFiles(files) {
                    files = [ ...files ];
                    initializeProgress(files.length);
                    files.forEach(uploadFile);
                    files.forEach(previewFile);
                }
                [ "dragenter", "dragover", "dragleave", "drop" ].forEach((eventName => {
                    dropArea.addEventListener(eventName, preventDefaults, false);
                    document.body.addEventListener(eventName, preventDefaults, false);
                }));
                function preventDefaults(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                [ "dragenter", "dragover" ].forEach((eventName => {
                    dropArea.addEventListener(eventName, highlight, false);
                }));
                [ "dragleave", "drop" ].forEach((eventName => {
                    dropArea.addEventListener(eventName, unhighlight, false);
                }));
                function highlight(e) {
                    dropArea.classList.add("highlight");
                }
                function unhighlight(e) {
                    dropArea.classList.remove("highlight");
                }
                dropArea.addEventListener("drop", handleDrop, false);
                function handleDrop(e) {
                    let dt = e.dataTransfer;
                    let files = dt.files;
                    handleFiles(files);
                }
                function uploadFile(file, i) {
                    let url = "https://api.cloudinary.com/v1_1/joezimim007/image/upload";
                    let xhr = new XMLHttpRequest;
                    let formData = new FormData;
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    xhr.upload.addEventListener("progress", (function(e) {
                        updateProgress(i, 100 * e.loaded / e.total || 100);
                    }));
                    xhr.addEventListener("readystatechange", (function(e) {
                        if (4 == xhr.readyState && 200 == xhr.status) updateProgress(i, 100); else if (4 == xhr.readyState && 200 != xhr.status) ;
                    }));
                    formData.append("upload_preset", "ujpu6gyk");
                    formData.append("file", file);
                    xhr.send(formData);
                }
                function previewFile(file) {
                    let reader = new FileReader;
                    reader.readAsDataURL(file);
                    reader.onloadend = function() {
                        let img = document.createElement("img");
                        img.src = reader.result;
                        document.getElementById("gallery").appendChild(img);
                    };
                }
                let uploadProgress = [];
                let progressBar = document.getElementById("progress-bar");
                function initializeProgress(numFiles) {
                    progressBar.value = 0;
                    uploadProgress = [];
                    for (let i = numFiles; i > 0; i--) uploadProgress.push(0);
                }
                function updateProgress(fileNumber, percent) {
                    uploadProgress[fileNumber] = percent;
                    let total = uploadProgress.reduce(((tot, curr) => tot + curr), 0) / uploadProgress.length;
                    progressBar.value = total;
                }
            }
        }
        window["FLS"] = true;
        isWebp();
        spollers();
        tabs();
        formQuantity();
        formRating();
    })();
})();