### Fisher-Yates Shuffle: A Visual Proof
<p class="break"><br></p>
<aside>2022-03-14 by Randy Pensinger</aside>
<p class="break"><br></p>

[I have found great visualization](https://bost.ocks.org/mike/shuffle/) of the [fisher-yates shuffling algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm), but I have yet to find a great *visualization of the proof* that the fisher-yates shuffle is *random*.

What do we mean by a *random* shuffle?
We mean *uniformly* random - that each element in the list could be shuffled into each position with equal probability.

![each element in each position](../assets/img/each-element-each-position.svg)

How frequently should the element e<sub>i</sub> be shuffled into the position j?
1 in n times.
Or position k?
Also 1 in n times.
Each element in each position 1 out of n times.

## Algorithm

The fisher-yates algorithm shuffles a list with the following steps:

1. swap the last element, e<sub>n</sub>, with the element e<sub>i</sub> at a random position i.
2. repeat/recurse step 1 on the sublist from e<sub>0</sub> to e<sub>n-1</sub>.
3. stop when the list you are shuffling only has a single element or less.

in python the code looks like:
```
a = [ ... ]
for i in range(len(a) - 1, 0, -1): # n-1, n-2, n-3, ... 1
    j = random.randint(0, i)
    a[i], a[j] = a[j], a[i]
```

Simple, no?
The animation of an example shuffle is also pretty simple.
We start with the last element, swap (possibly into the same position), then fix the last element in position and move on to the next position for swapping.

<svg id="algorithm-viz"></svg>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
    (function () {
        var cellMargin = 3;
        var permutation = [3, 2, 1, 4, 0],//swap(0,4) [4,1,2,3,0]  //swap(0,3) [3,1,2,4,0] //swap (2, 1) [3,2,1,4,0]
                n = permutation.length,
                w = 300,
                s = w / n,
                h = s * 3.2;

        var data;

        var svg = d3.select("svg#algorithm-viz").attr("width", w).attr("height", h);

        var elementsGroup = svg.append("g").attr("transform", "translate(" + [0, s * 1.1] + ")");
        var headerText = "";

        function draw(iteration, swapIndex) {
            var element = elementsGroup.selectAll("g").data(data);
            element.enter().append("g").attr("transform", function (d, i) {
                return "translate(" + [i * s, 0] + ")";
            });

            element.style("opacity", 1);

            var elementRect = element.selectAll("rect").data(function (d) {
                return [d]
            });

            elementRect.enter()
                    .append("rect");

            elementRect.attr("width", s - cellMargin*2)
                    .attr("height", s - cellMargin*2)
                    .attr("transform", "translate(" + [cellMargin, cellMargin] + ")")
                    .attr("fill", function (d) {
                        return d3.hsl(d / n * 360, 0.8, 0.5)
                    });

            var elementText = element.selectAll("text").data(function (d) {
                return [d]
            });
            elementText.enter()
                    .append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate(" + [s / 2, s / 2 + 5] + ")")
                    .attr("fill", "#fff");

            elementText.text(function (d) {
                return d
            });

            if (typeof iteration !== 'undefined' && typeof swapIndex !== 'undefined') {
                headerText += " swap(" + [swapIndex, iteration] + ")";
                d3.select("h3 span#algorithm-viz-header")
                        .text(headerText);
                element.filter(function (d, i) {
                    return i > iteration;
                }).style("opacity", 0.3);

                var lastElement = element.filter(function (d, i) {
                    return i == iteration;
                });
                if (iteration != swapIndex) {
                    lastElement.attr("transform", "translate(" + [swapIndex * s, 0] + ")")
                            .transition()
                            .attr("transform", "translate(" + [swapIndex * s, -s * 1.1] + ")")
                            .transition()
                            .attr("transform", "translate(" + [iteration * s, -s * 1.1] + ")")
                            .transition()
                            .attr("transform", "translate(" + [iteration * s, 0] + ")")
                            .style("opacity", 0.3);

                    element.filter(function (d, i) {
                        return i == swapIndex;
                    }).attr("transform", "translate(" + [iteration * s, 0] + ")")
                            .transition()
                            .attr("transform", "translate(" + [iteration * s, s * 1.1] + ")")
                            .transition()
                            .attr("transform", "translate(" + [swapIndex * s, s * 1.1] + ")")
                            .transition()
                            .attr("transform", "translate(" + [swapIndex * s, 0] + ")");
                } else {
                    lastElement.style("opacity", 0.3);
                }
            }
        }

        function swap(l, i, j) {
            if (i != j) {
                var temp = l[i];
                l[i] = l[j];
                l[j] = temp;
            }
        }

        function loop(i) {
            if (i > 0) {
                var j = data.indexOf(permutation[i]);
                swap(data, i, j);
                draw(i, j);
                setTimeout(function () {
                    loop(i - 1);
                }, 2000);
            } else {
                setTimeout(function () {
                    start();
                }, 2000);
            }
        }

        function start() {
            d3.select("h3 span#algorithm-viz-header").text("");
            headerText = "";
            data = d3.range(n);
            draw();
            setTimeout(function () {
                loop(permutation.length - 1);
            }, 1000);
        }

        start();
    })();
</script>

## Visual Proof

In the visualization above, we were only demonstrating one possible shuffle each time.
What if we considered all possible swaps at each iteration and kept track of the probability each element was in each position?
If a shuffle was truly random then each element, represented by color, should result in each position equally after shuffling the whole list.

In the visualization below, we highlight two positions before considering the swap.
Colors represent elements.
Each row represents the result of an iteration.
A multicolored square means for that specific position we had a certain probability of being those elements, proportional to area of the color.
After an iteration we stop considering the last element, hence the diagonal shape.
After each iteration you can sort of see that the last position has equal chance to be any element.
Once we are done iterating we simplify the visual probabilities in each position and collapse the diagonal.
You can easily see that algorithm results in each element possibly being moved to each position with uniform probability.  

<svg id="swaps-viz"></svg>
<script>
    (function () {
        var cellMargin = 3;
        var w = 300,
                offset = 30,
                n = 5,
                s = w / n,
                h = s * (n + 2);
        var svg = d3.select("svg#swaps-viz").attr("width", 1024).attr("height", h);


        function start() {
            svg.selectAll("*").remove();
            var drawRoot = svg.append("g").attr("transform", "translate(0, " + offset + ")");

            var element = drawRoot.selectAll("g")
                    .data(d3.range(n))
                    .enter()
                    .append("g")
                    .attr("transform", function (d) {
                        return "translate(" + [d * s, 0] + ")";
                    });

            element.selectAll("rect").data(function (d) {
                return [d]
            }).enter().append("rect")
                    .attr("width", s - cellMargin*2)
                    .attr("height", s - cellMargin*2)
                    .attr("transform", "translate(" + [cellMargin, cellMargin] + ")")
                    .attr("fill", function (d) {
                        return d3.hsl((d / n) * 360, 0.8, 0.5);
                    });

            element.selectAll("text").data(function (d) {
                return [d]
            }).enter().append("text")
                    .attr("text-anchor", "middle")
                    .attr("transform", "translate(" + [s / 2, s / 2 + 5] + ")")
                    .attr("fill", "#fff")
                    .text(function (d) {
                        return d
                    });

            function emptyHistory(n) {
                var toReturn = [];
                for (var i = 0; i < n; i++) {
                    toReturn.push([]);
                }
                return toReturn;
            }

            var lastSwapHistory = [];
            for (var i = 0; i < n; i++) {
                lastSwapHistory.push([{e: i, p: 1.0, cp: 1.0}]);
            }
            var swapHistory = emptyHistory(n);

            function cleanupHistory(history) {
                history.forEach(function (position) {
                    position.forEach(function (entry, i) {
                        entry.cp = entry.p;
                        if (i > 0) {
                            entry.cp += position[i - 1].cp;
                        }
                    });
                });
            }

            var histories = [swapHistory];

            function swap(loop, swapIndex) {
                var p = 1 / (loop + 1);

                var fromSwapToSwap = [], fromSwapToLoop = [], fromLoopToSwap = [];
                lastSwapHistory[swapIndex].forEach(function (e) {
                    fromSwapToSwap.push({
                        e: e.e,
                        p: e.p * (1 - p),
                        source: swapIndex,
                        target: swapIndex,
                        lastMultP: (1 - p),
                        lastCp: e.cp - e.p
                    });
                    fromSwapToLoop.push({
                        e: e.e,
                        p: e.p * p,
                        source: swapIndex,
                        target: loop,
                        lastMultP: p,
                        lastCp: e.cp - e.p
                    });
                });
                lastSwapHistory[loop].forEach(function (e) {
                    fromLoopToSwap.push({
                        e: e.e,
                        p: e.p * p,
                        source: loop,
                        target: swapIndex,
                        lastMultP: p,
                        lastCp: e.cp - e.p
                    })
                });
                if (swapIndex < loop) {
                    swapHistory[swapIndex].push.apply(swapHistory[swapIndex], fromSwapToSwap);
                    swapHistory[swapIndex].push.apply(swapHistory[swapIndex], fromLoopToSwap);
                }
                swapHistory[loop].push.apply(swapHistory[loop], fromSwapToLoop);

                cleanupHistory(swapHistory);

                svg.selectAll("rect.highlight" + loop + "_" + swapIndex)
                        .data([0, 1]).enter()
                        .append("rect")
                        .attr("width", s - cellMargin*2)
                        .attr("height", offset / 3)
                        .attr("fill", function (d) {
                            var index = ( d == 0 ? swapIndex : loop );
                            return d3.hsl((index / n) * 360, 0.8, 0.5);
                        }).attr("transform", function (d) {
                            var index = ( d == 0 ? swapIndex : loop );
                            return "translate(" + (index * s + cellMargin) + ", 0)";
                        }).transition()
                        .duration(1000)
                        .style("opacity", "0")
                        .remove();

                var loopGroup = drawRoot.selectAll("g.loop").data(histories);
                loopGroup.enter().append("g")
                        .attr("class", function (d, i) {
                            return "loop loop" + (n - 1 - i);
                        })
                        .attr("transform", function (d, i) {
                            return "translate(0," + ((i + 1) * 1.1 * s) + ")";
                        });

                var position = loopGroup.selectAll("g.position").data(function (d) {
                    return d
                });
                position.enter().append("g")
                        .attr("class", function (d, i) {
                            return "position position" + i;
                        })
                        .attr("transform", function (d, i) {
                            return "translate(" + (i * s) + ",0)";
                        });


                var swapProb = position.selectAll("rect.swapProb").data(function (d) {
                    return d
                });

                swapProb.enter()
                        .append("rect")
                        .attr("class", "swapProb")
                        .attr("fill", function (d) {
                            return d3.hsl((d.e / n) * 360, 0.8, 0.5)
                        })
                        .attr("width", function (d) {
                            return d.p * (s - cellMargin*2)
                        })
                        .attr("height", s - cellMargin*2)
                        .attr("transform", function (d) {
                            return "translate(" + [(d.source - d.target + d.lastCp) * s + cellMargin, -1.1 * s + cellMargin] + ")  scale(" + [1 / d.lastMultP, 1] + ")";
                        })
                        .transition()
                        .duration(1000)
                        .attr("transform", function (d) {
                            var x = (d.cp - d.p) * (s - cellMargin*2) + cellMargin;
                            return "translate(" + [x, cellMargin] + ") scale(1,1)";
                        });

                var done = loop == 0;
                if (loop > 0) {
                    if (swapIndex >= loop) {
                        lastSwapHistory = swapHistory;
                        swapHistory = emptyHistory(loop);
                        histories.push(swapHistory);
                        loop -= 1;
                        swapIndex = 0;
                    } else {
                        swapIndex += 1;
                    }
                }
                if (!done) {
                    setTimeout(function () {
                        swap(loop, swapIndex);
                    }, swapIndex == 0 && loop > 0 ? 3000 : 1000);
                } else {
                    histories.forEach(function (history) {
                        history.forEach(function (position) {
                            position.sort(function (l, r) {
                                return l.e - r.e;
                            });
                        });
                        cleanupHistory(history);
                    });
                    swapProb.transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("transform", function (d) {
                                var x = (d.cp - d.p) * (s - cellMargin*2) + cellMargin;
                                return "translate(" + [x, cellMargin] + ")";
                            });

                    element.transition()
                            .delay(3000)
                            .duration(1000)
                            .style("opacity", 0);

                    for (var loopI = 0; loopI < n; loopI++) {
                        drawRoot.selectAll("g.loop" + loopI + " g.position")
                                .filter(function (d, i) {
                                    return i < loopI;
                                }).transition()
                                .delay(3000)
                                .duration(1000)
                                .style("opacity", 0);
                    }

                    loopGroup.transition().delay(3000).duration(1000).attr("transform", "translate(0,0)");
                    drawRoot.transition().delay(9000).duration(1000).style("opacity", 0);
                    setTimeout(start, 10000);
                }
            }

            setTimeout(function () {
                swap(n - 1, 0);
            }, 3000);
        }
        start();
    })();
</script>
