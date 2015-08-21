import * as d3 from 'd3';
import type { GeoPermissibleObjects } from 'd3';
import type { SeattleDuiData } from './seattle-dui-types';

const maxIndividualCount = 30;
const maxAllCount = 198;
let maxShapeArea = 0.0;

const path = d3.geoPath();

type LoadedListener = (data: SeattleDuiData) => void;
const loadedListeners: LoadedListener[] = [];

loadedListeners.push((data: SeattleDuiData) => {
    const viz = d3.select("#counts");
    const svg = viz.select<SVGSVGElement>("svg")
        .attr("width", 300)
        .attr("height", 500)
        .attr("viewBox", "157.7 34.2 3.3 5.5");
    const description = viz.select("h4");
    const descriptionText = description.text();
    const groups = svg.selectAll<SVGGElement, GeoPermissibleObjects>("g").data(data.shapes);

    groups.enter().append("g");

    groups.selectAll<SVGPathElement, GeoPermissibleObjects>("path").data(shape => [shape])
        .enter().append("path")
        .attr("d", path)
        .attr("fill", d3.hsl(210, 1.0, 0.3)!.toString())
        .style("opacity", (shape) => {
            const shapeId = data.shapes.indexOf(shape);
            return 0.1 + (0.9 * (data.all[shapeId] / maxAllCount));
        })
        .on("mouseover", function(event, shape) {
            const parentDatum = d3.select<SVGGElement, GeoPermissibleObjects>(this.parentNode as SVGGElement).datum();
            const shapeId = parentDatum ? data.shapes.indexOf(parentDatum) : data.shapes.indexOf(shape);
            description.text((data.all[shapeId] || 0) + ' DUIs');
        })
        .on("mouseout", () => {
            description.text(descriptionText);
        });
});

loadedListeners.push((data: SeattleDuiData) => {
    const viz = d3.select("#counts-area-normalized");
    const svg = viz.select<SVGSVGElement>("svg")
        .attr("width", 300)
        .attr("height", 500)
        .attr("viewBox", "157.7 34.2 3.3 5.5");
    const description = viz.select("h4");
    const descriptionText = description.text();
    const groups = svg.selectAll<SVGGElement, GeoPermissibleObjects>("g").data(data.shapes);

    groups.enter().append("g");

    groups.selectAll<SVGPathElement, GeoPermissibleObjects>("path").data(shape => [shape])
        .enter().append("path")
        .attr("d", path)
        .attr("fill", d3.hsl(210, 1.0, 0.3)!.toString())
        .style("opacity", (shape) => {
            const shapeId = data.shapes.indexOf(shape);
            const shapeArea = path.area(shape);
            return 0.1 + (0.9 * (maxShapeArea * data.all[shapeId] / (maxAllCount * shapeArea)));
        })
        .on("mouseover", (event, shape) => {
            const shapeId = data.shapes.indexOf(shape);
            description.text((data.all[shapeId] || 0) + ' DUIs');
        })
        .on("mouseout", () => {
            description.text(descriptionText);
        });
});

loadedListeners.push((data: SeattleDuiData) => {
    function hourOfDay(timeBucketId: number): string {
        if (timeBucketId === 0) return '12am';
        if (timeBucketId < 12) return timeBucketId + 'am';
        if (timeBucketId === 12) return timeBucketId + 'pm';
        return (timeBucketId - 12) + 'pm';
    }

    const viz = d3.select("#heat-by-time");
    const svg = viz.select<SVGSVGElement>("svg")
        .attr("width", 500)
        .attr("height", 500)
        .attr("viewBox", "157.7 34.2 5.5 5.5");
    const hour = viz.select("h4 span.hour");
    const description = viz.select("h4 span.description");

    function heat(timeBucketId: number, shapeId: number): number {
        const timeBucketData = data.data[timeBucketId] || {};
        const prevData = data.data[timeBucketId - 1] || {};
        const nextData = data.data[timeBucketId + 1] || {};

        const count = timeBucketId === 12
            ? ((prevData[shapeId] || 0) + (nextData[shapeId] || 0)) / 2
            : (timeBucketData[shapeId] || 0);
        const shapeArea = path.area(data.shapes[shapeId]);
        return 0.1 + (0.9 * (maxShapeArea * count / (maxIndividualCount * shapeArea)));
    }

    const animationDuration = 3000;

    const shapes = svg.selectAll<SVGPathElement, GeoPermissibleObjects>("path").data(data.shapes);
    const clock = svg.append('g')
        .attr("transform", "translate(161.7, 37.5)");

    clock.append("circle")
        .attr("r", 0.8)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.01)
        .attr("fill", "#fff");

    const hourHand = clock.append("line")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.01);

    function update(timeBucketId: number): void {
        timeBucketId = timeBucketId % 24;
        const timeBucketData = data.data[timeBucketId] || {};

        shapes.on("mouseover", (event, shape) => {
            const shapeId = data.shapes.indexOf(shape);
            description.text(': ' + (timeBucketData[shapeId] || 0) + ' DUIs');
        }).on("mouseout", () => {
            description.text('');
        }).transition()
            .ease(d3.easeQuadIn)
            .duration(0)
            .style("opacity", (shape) => {
                const shapeId = data.shapes.indexOf(shape);
                return heat(timeBucketId, shapeId);
            });

        const theta = ((timeBucketId - 3) / 12) * 2 * Math.PI;
        hourHand.transition()
            .delay(0)
            .duration(0)
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", Math.cos(theta) * 0.7)
            .attr("y2", Math.sin(theta) * 0.7);

        hour.transition().delay(0).text(hourOfDay(timeBucketId));

        setTimeout(() => update(timeBucketId + 1), animationDuration);
    }

    function start(timeBucketId: number): void {
        const timeBucketData = data.data[timeBucketId] || {};

        shapes.enter().append("path")
            .attr("d", path)
            .attr("fill", d3.hsl(210, 1.0, 0.3)!.toString());

        shapes.on("mouseover", (event, shape) => {
            const shapeId = data.shapes.indexOf(shape);
            description.text(': ' + (timeBucketData[shapeId] || 0) + ' DUIs');
        }).on("mouseout", () => {
            description.text('');
        })
        .style("opacity", (shape) => {
            const shapeId = data.shapes.indexOf(shape);
            return heat(timeBucketId, shapeId);
        });

        const theta = ((timeBucketId - 3) / 12) * 2 * Math.PI;
        hourHand.attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", Math.cos(theta) * 0.7)
            .attr("y2", Math.sin(theta) * 0.7);
        update(timeBucketId);
    }

    start(12);
});

async function loadData(): Promise<void> {
    const response = await fetch('/data/seattle-dui-data.json');
    const data: SeattleDuiData = await response.json();

    for (const shape of data.shapes) {
        const area = path.area(shape);
        if (area > maxShapeArea) {
            maxShapeArea = area;
        }
    }

    for (const listener of loadedListeners) {
        listener(data);
    }
}

loadData();
