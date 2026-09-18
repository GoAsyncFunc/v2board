import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
    DatasetComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TransformComponent,
} from "echarts/components";
import { LabelLayout } from "echarts/features";
import { SVGRenderer } from "echarts/renderers";

export const registerCharts = (components) => echarts.use(components);
export const initChart = (...args) => echarts.init(...args);

export {
    BarChart,
    DatasetComponent,
    GridComponent,
    LabelLayout,
    LegendComponent,
    LineChart,
    SVGRenderer,
    TooltipComponent,
    TransformComponent,
};
