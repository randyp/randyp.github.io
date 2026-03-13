import * as d3 from 'd3';

// Layout constants
const CELL_MARGIN = 3;
const WIDTH = 300;
const VERTICAL_SPACING_FACTOR = 1.1;
const HEIGHT_FACTOR = 3.2;
const TEXT_BASELINE_OFFSET = 5;

// Timing constants
const SWAP_ANIMATION_DELAY_MS = 2000;
const INITIAL_DELAY_MS = 1000;

// Visualization configuration
const PERMUTATION = [3, 2, 1, 4, 0];
const N = PERMUTATION.length;
const CELL_SIZE = WIDTH / N;
const HEIGHT = CELL_SIZE * HEIGHT_FACTOR;

function createFisherYatesVisualization() {
    let data: number[];
    let headerText = "";

    const svg = d3.select<SVGSVGElement, unknown>("svg#algorithm-viz")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);

    const elementsGroup = svg.append("g")
        .attr("transform", `translate(${[0, CELL_SIZE * VERTICAL_SPACING_FACTOR]})`);

    function draw(iteration?: number, swapIndex?: number): void {
        const element = elementsGroup.selectAll<SVGGElement, number>("g").data(data);
        const elementEnter = element.enter().append("g").attr("transform", (_, i) => {
            return `translate(${[i * CELL_SIZE, 0]})`;
        });
        const merged = elementEnter.merge(element);

        merged.style("opacity", 1);

        const elementRect = merged.selectAll<SVGRectElement, number>("rect").data(d => [d]);

        elementRect.enter()
            .append("rect")
            .merge(elementRect)
            .attr("width", CELL_SIZE - CELL_MARGIN * 2)
            .attr("height", CELL_SIZE - CELL_MARGIN * 2)
            .attr("transform", `translate(${[CELL_MARGIN, CELL_MARGIN]})`)
            .attr("fill", d => d3.hsl(d / N * 360, 0.8, 0.5).toString());

        const elementText = merged.selectAll<SVGTextElement, number>("text").data(d => [d]);
        elementText.enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("transform", `translate(${[CELL_SIZE / 2, CELL_SIZE / 2 + TEXT_BASELINE_OFFSET]})`)
            .attr("fill", "#fff")
            .merge(elementText)
            .text(d => d);

        if (typeof iteration !== 'undefined' && typeof swapIndex !== 'undefined') {
            headerText += ` swap(${[swapIndex, iteration]})`;
            d3.select("h3 span#algorithm-viz-header").text(headerText);

            merged.filter((_, i) => i > iteration).style("opacity", 0.3);

            const lastElement = merged.filter((_, i) => i === iteration);
            if (iteration !== swapIndex) {
                lastElement.attr("transform", `translate(${[swapIndex * CELL_SIZE, 0]})`)
                    .transition()
                    .attr("transform", `translate(${[swapIndex * CELL_SIZE, -CELL_SIZE * VERTICAL_SPACING_FACTOR]})`)
                    .transition()
                    .attr("transform", `translate(${[iteration * CELL_SIZE, -CELL_SIZE * VERTICAL_SPACING_FACTOR]})`)
                    .transition()
                    .attr("transform", `translate(${[iteration * CELL_SIZE, 0]})`)
                    .style("opacity", 0.3);

                merged.filter((_, i) => i === swapIndex)
                    .attr("transform", `translate(${[iteration * CELL_SIZE, 0]})`)
                    .transition()
                    .attr("transform", `translate(${[iteration * CELL_SIZE, CELL_SIZE * VERTICAL_SPACING_FACTOR]})`)
                    .transition()
                    .attr("transform", `translate(${[swapIndex * CELL_SIZE, CELL_SIZE * VERTICAL_SPACING_FACTOR]})`)
                    .transition()
                    .attr("transform", `translate(${[swapIndex * CELL_SIZE, 0]})`);
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
            const j = data.indexOf(PERMUTATION[i]);
            swap(data, i, j);
            draw(i, j);
            setTimeout(() => loop(i - 1), SWAP_ANIMATION_DELAY_MS);
        } else {
            setTimeout(start, SWAP_ANIMATION_DELAY_MS);
        }
    }

    function start(): void {
        d3.select("h3 span#algorithm-viz-header").text("");
        headerText = "";
        data = d3.range(N);
        draw();
        setTimeout(() => loop(PERMUTATION.length - 1), INITIAL_DELAY_MS);
    }

    return { start };
}

createFisherYatesVisualization().start();
