### Seattle DUI Incidents: Telling a Story
<p class="break"><br></p>
<aside>2020-03-14 by Randy Pensinger</aside>
<p class="break"><br></p>

Worthwhile visualizations tell stories.
Below is a short case study in which we iteratively refine a visualization from meaningless data points to a tale of the clock.
The data set is Seattle DUIs between 2010-07-17 and 2016-02-27.

<div id="counts">
<h4>Total DUI Counts (Darker Blue represents higher incidence count)</h4>
<svg></svg>
</div>
<hr>
<div id="counts-area-normalized">
<h4>Total DUI Counts, Normalized by Census Tract Area</h4>
<svg></svg>
</div>
<hr>
<div id="heat-by-time">
<h4>DUI Counts by Hour of Day, Normalized by Area</h4>
<svg></svg>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.0/seedrandom.min.js"></script>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>
