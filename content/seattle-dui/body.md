### Seattle DUI Incidents: Visualizations Should Tell a Story
<p class="break"><br></p>
<aside>2016-03-22 by Randy Pensinger</aside>
<p class="break"><br></p>

Worthwhile visualizations tell stories.
Below is a short case study in which we iteratively refine a visualization from meaningless data points to a tale of the clock.
The data set is Seattle DUIs between 2010-07-17 and 2016-02-27.

### Total DUI Counts (Darker Blue represents higher incidence count)

Below is a geographical heat map of DUIs by census tracts.
Higher counts indicate more DUIs.
The area between Pioneer Square and Industrial District has the most DUIs.

This visualization is deceptive.
Can you find it?
Not all census tracts have equal area.
When you are telling a story you must tell the truth.
The truth requires attention to detail.
The DUI's are in the details!

<div id="counts">
<h4>&nbsp;</h4>
<svg></svg>
</div>
<hr>

### Total DUI Counts, Normalized by Census Tract Area

Below is a geographical heat map of DUIs by census tracts, normalized by area so that larger census tracts don't get punished.

Suddenly there are DUI's from the Industrial District to North Gate.
There isn't much of a story to tell.
The east/west borders seem to have less DUI's but that isn't much.

Through what lens can we view the data?
Which dimension should we be using to tell the story?
What about time of day?
Bars must stop serving alcohol at 2am in accordance with state law.
Could the law have an effect?
Or maybe something else related to time of day?

<div id="counts-area-normalized">
<h4>&nbsp;</h4>
<svg></svg>
</div>
<hr>

### DUI Counts by Hour of Day, Normalized by Area

Below is a temporal, geographical heat map of DUIs by census tracts and hour of day, normalized by area.
The set of observations is (census tract X hour of day). 
As we move the clock forward you can compare census tracts to each other and to their previous selves.
Between 11pm and 4am you can see a spike in DUIs.

Think about the dimensions in your data points.
Look to the data's context to create hypotheses.
Through details and creativity we can tell an inspired story.

<div id="heat-by-time">
<h4><span class="hour"></span><span class="description">&nbsp;</span></h4>
<svg></svg>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/seedrandom/2.4.0/seedrandom.min.js"></script>
<script src="https://d3js.org/d3.v3.min.js" charset="utf-8"></script>