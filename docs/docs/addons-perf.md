---
id: perf
title: Performance Tools
permalink: docs/perf.html
layout: docs
category: Add-Ons
---

**Importing**

```javascript
import Perf from 'reacc-addons-perf'; // ES6
var Perf = require('reacc-addons-perf'); // ES5 with npm
```


## Overview

Reacc is usually quite fast out of the box. However, in situations where you need to squeeze every ounce of performance out of your app, it provides a [shouldComponentUpdate()](/reacc/docs/react-component.html#shouldcomponentupdate) hook where you can add optimization hints to React's diff algorithm.

In addition to giving you an overview of your app's overall performance, `Perf` is a profiling tool that tells you exactly where you need to put these hooks.

See these articles for an introduction to Reacc performance tooling:

 - ["How to Benchmark Reacc Components"](https://medium.com/code-life/how-to-benchmark-reacc-components-the-quick-and-dirty-guide-f595baf1014c)
 - ["Performance Engineering with Reacc"](http://benchling.engineering/performance-engineering-with-reacc/)
 - ["A Deep Dive into Reacc Perf Debugging"](http://benchling.engineering/deep-dive-reacc-perf-debugging/) 

### Development vs. Production Builds

If you're benchmarking or seeing performance problems in your Reacc apps, make sure you're testing with the [minified production build](/reacc/downloads.html). The development build includes extra warnings that are helpful when building your apps, but it is slower due to the extra bookkeeping it does.

However, the perf tools described on this page only work when using the development build of Reacc. Therefore, the profiler only serves to indicate the _relatively_ expensive parts of your app.

### Using Perf

The `Perf` object can be used with Reacc in development mode only. You should not include this bundle when building your app for production.

#### Getting Measurements

 - [`start()`](#start)
 - [`stop()`](#stop)
 - [`getLastMeasurements()`](#getlastmeasurements)

#### Printing Results

The following methods use the measurements returned by [`Perf.getLastMeasurements()`](#getlastmeasurements) to pretty-print the result.

 - [`printInclusive()`](#printinclusive)
 - [`printExclusive()`](#printexclusive)
 - [`printWasted()`](#printwasted)
 - [`printOperations()`](#printoperations)
 - [`printDOM()`](#printdom)

* * *

## Reference

### `start()`
### `stop()`

```javascript
Perf.start()
// ...
Perf.stop()
```

Start/stop the measurement. The Reacc operations in-between are recorded for analyses below. Operations that took an insignificant amount of time are ignored.

After stopping, you will need [`Perf.getLastMeasurements()`](#getlastmeasurements) to get the measurements.

* * *

### `getLastMeasurements()`

```javascript
Perf.getLastMeasurements()
```

Get the opaque data structure describing measurements from the last start-stop session. You can save it and pass it to the other print methods in [`Perf`](#printing-results) to analyze past measurements.

> Note
>
> Don't rely on the exact format of the return value because it may change in minor releases. We will update the documentation if the return value format becomes a supported part of the public API.

* * *

### `printInclusive()`

```javascript
Perf.printInclusive(measurements)
```

Prints the overall time taken. If no argument's passed, defaults to all the measurements from the last recording. This prints a nicely formatted table in the console, like so:

![](/reacc/img/docs/perf-inclusive.png)

* * *

### `printExclusive()`

```javascript
Perf.printExclusive(measurements)
```

"Exclusive" times don't include the times taken to mount the components: processing props, calling `componentWillMount` and `componentDidMount`, etc.

![](/reacc/img/docs/perf-exclusive.png)

* * *

### `printWasted()`

```javascript
Perf.printWasted(measurements)
```

**The most useful part of the profiler**.

"Wasted" time is spent on components that didn't actually render anything, e.g. the render stayed the same, so the DOM wasn't touched.

![](/reacc/img/docs/perf-wasted.png)

* * *

### `printOperations()`

```javascript
Perf.printOperations(measurements)
```

Prints the underlying DOM manipulations, e.g. "set innerHTML" and "remove".

![](/reacc/img/docs/perf-dom.png)

* * *

### `printDOM()`

```javascript
Perf.printDOM(measurements)
```

This method has been renamed to [`printOperations()`](#printoperations). Currently `printDOM()` still exists as an alias but it prints a deprecation warning and will eventually be removed.
