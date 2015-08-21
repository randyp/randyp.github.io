import * as d3 from 'd3';

const cellMargin = 3;
const permutation = [3, 2, 1, 4, 0];
const n = permutation.length;
const w = 300;
const s = w / n;
const h = s * 3.2;

let data: number[];
let headerText = "";

const svg = d3.select<SVGSVGElement, unknown>("svg#algorithm-viz")
    .attr("width", w)
    .attr("height", h);

const elementsGroup = svg.append("g")
    .attr("transform", `translate(${[0, s * 1.1]})`);

function draw(iteration?: number, swapIndex?: number): void {
    const element = elementsGroup.selectAll<SVGGElement, number>("g").data(data);
    const elementEnter = element.enter().append("g").attr("transform", (_, i) => {
        return `translate(${[i * s, 0]})`;
    });
    const merged = elementEnter.merge(element);

    merged.style("opacity", 1);

    const elementRect = merged.selectAll<SVGRectElement, number>("rect").data(d => [d]);

    elementRect.enter()
        .append("rect")
        .merge(elementRect)
        .attr("width", s - cellMargin * 2)
        .attr("height", s - cellMargin * 2)
        .attr("transform", `translate(${[cellMargin, cellMargin]})`)
        .attr("fill", d => d3.hsl(d / n * 360, 0.8, 0.5).toString());

    const elementText = merged.selectAll<SVGTextElement, number>("text").data(d => [d]);
    elementText.enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${[s / 2, s / 2 + 5]})`)
        .attr("fill", "#fff")
        .merge(elementText)
        .text(d => d);

    if (typeof iteration !== 'undefined' && typeof swapIndex !== 'undefined') {
        headerText += ` swap(${[swapIndex, iteration]})`;
        d3.select("h3 span#algorithm-viz-header").text(headerText);

        merged.filter((_, i) => i > iteration).style("opacity", 0.3);

        const lastElement = merged.filter((_, i) => i === iteration);
        if (iteration !== swapIndex) {
            lastElement.attr("transform", `translate(${[swapIndex * s, 0]})`)
                .transition()
                .attr("transform", `translate(${[swapIndex * s, -s * 1.1]})`)
                .transition()
                .attr("transform", `translate(${[iteration * s, -s * 1.1]})`)
                .transition()
                .attr("transform", `translate(${[iteration * s, 0]})`)
                .style("opacity", 0.3);

            merged.filter((_, i) => i === swapIndex)
                .attr("transform", `translate(${[iteration * s, 0]})`)
                .transition()
                .attr("transform", `translate(${[iteration * s, s * 1.1]})`)
                .transition()
                .attr("transform", `translate(${[swapIndex * s, s * 1.1]})`)
                .transition()
                .attr("transform", `translate(${[swapIndex * s, 0]})`);
        } else {
            lastElement.style("opacity", 0.3);
        }
    }
}

function swap(l: number[], i: number, j: number): void {
    if (i !== j) {
        const temp = l[i];
        l[i] = l[j];
        l[j] = temp;
    }
}

function loop(i: number): void {
    if (i > 0) {
        const j = data.indexOf(permutation[i]);
        swap(data, i, j);
        draw(i, j);
        setTimeout(() => loop(i - 1), 2000);
    } else {
        setTimeout(start, 2000);
    }
}

function start(): void {
    d3.select("h3 span#algorithm-viz-header").text("");
    headerText = "";
    data = d3.range(n);
    draw();
    setTimeout(() => loop(permutation.length - 1), 1000);
}

start();
