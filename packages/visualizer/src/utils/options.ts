import {COLOR_SET_DEFAULT, VIS_TYPE_PIVOT_TABLE} from "@dhis2/analytics";
import {pick} from "lodash";
import i18n from "@dhis2/d2-i18n";

export const OPTION_SHOW_SERIES_KEY = "showSeriesKey";
export const OPTION_SHOW_LEGEND_KEY = "showLegendKey";
export const OPTION_AXIS_STEPS = "steps";
export const OPTION_AXIS_DECIMALS = "decimals";
export const OPTION_AXIS_MAX_VALUE = "maxValue";
export const OPTION_AXIS_MIN_VALUE = "minValue";
export const OPTION_AXIS_TITLE = "axisTitle";
export const OPTION_AXIS_TITLE_TEXT_MODE = "axisTitleTextMode";
export const OPTION_BASE_LINE_ENABLED = "baseLineEnabled";
export const OPTION_BASE_LINE_TITLE = "baseLineTitle";
export const OPTION_BASE_LINE_VALUE = "baseLineValue";
export const OPTION_BASE_LINE_TITLE_FONT_STYLE = "baseLineTitleFontStyle";
export const OPTION_TARGET_LINE_ENABLED = "targetLineEnabled";
export const OPTION_TARGET_LINE_TITLE = "targetLineTitle";
export const OPTION_TARGET_LINE_VALUE = "targetLineValue";
export const OPTION_TARGET_LINE_TITLE_FONT_STYLE = "targetLineTitleFontStyle";
export const OPTION_LEGEND_DISPLAY_STRATEGY = "legendDisplayStrategy";
export const OPTION_LEGEND_DISPLAY_STYLE = "legendDisplayStyle";
export const OPTION_LEGEND_SET = "legendSet";

export const options = {
		axes: {requestable: false, savable: true, defaultValue: []},
		colorSet: {
				defaultValue: COLOR_SET_DEFAULT,
				requestable: false,
				savable: true,
		},
		cumulativeValues: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		hideEmptyRowItems: {
				defaultValue: "NONE",
				requestable: false,
				savable: true,
		},
		seriesKey: {defaultValue: {}, requestable: false, savable: true},
		legend: {
				defaultValue: {},
				requestable: false,
				savable: true,
		},
		noSpaceBetweenColumns: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		percentStackedValues: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		regressionType: {defaultValue: "NONE", requestable: false, savable: true},
		showData: {defaultValue: true, requestable: false, savable: true},
		aggregationType: {
				defaultValue: "DEFAULT",
				requestable: true,
				savable: true,
		},
		completedOnly: {defaultValue: false, requestable: true, savable: true},
		hideSubtitle: {defaultValue: false, requestable: false, savable: true},
		hideTitle: {defaultValue: false, requestable: false, savable: true},
		sortOrder: {defaultValue: "0", requestable: false, savable: true},
		subtitle: {defaultValue: undefined, requestable: false, savable: true},
		title: {defaultValue: undefined, requestable: false, savable: true},
		series: {defaultValue: [], requestable: false, savable: true},
		fontStyle: {
				defaultValue: {},
				requestable: false,
				savable: true,
		},
		outlierAnalysis: {
				requestable: false,
				savable: true,
				defaultValue: null,
		},

		// only for SV
		icons: {defaultValue: false, requestable: false, savable: true},

		// only for PT
		colTotals: {defaultValue: false, requestable: false, savable: true},
		colSubTotals: {defaultValue: false, requestable: false, savable: true},
		rowTotals: {defaultValue: false, requestable: false, savable: true},
		rowSubTotals: {defaultValue: false, requestable: false, savable: true},
		showDimensionLabels: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		hideEmptyColumns: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		hideEmptyRows: {defaultValue: false, requestable: false, savable: true},
		skipRounding: {defaultValue: false, requestable: true, savable: true},
		numberType: {defaultValue: "VALUE", requestable: false, savable: true},
		showHierarchy: {defaultValue: false, requestable: true, savable: true},
		displayDensity: {
				defaultValue: "NORMAL",
				requestable: false,
				savable: true,
		},
		fontSize: {defaultValue: "NORMAL", requestable: false, savable: true},
		digitGroupSeparator: {
				defaultValue: "SPACE",
				requestable: false,
				savable: true,
		},
		approvalLevel: {
				defaultValue: undefined,
				requestable: true,
				savable: false,
		},
		fixColumnHeaders: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		fixRowHeaders: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},

		// these are stored in the AO under reportingParams
		reportingPeriod: {defaultValue: false, requestable: false, savable: true},
		organisationUnit: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		parentOrganisationUnit: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		// not exposed in UI
		grandParentOrganisationUnit: {
				defaultValue: false,
				requestable: false,
				savable: true,
		},
		regression: {defaultValue: false, requestable: false, savable: true},
		cumulative: {defaultValue: false, requestable: false, savable: true},
		measureCriteria: {
				defaultValue: undefined,
				requestable: true,
				savable: true,
		},
		topLimit: {defaultValue: "0", requestable: false, savable: true},
};

export default options;

export const getOptionsForUi = () => {
		return Object.entries({...options}).reduce(
				(map: Record<string, any>, [option, props]) => {
						map[option] = props.defaultValue;
						return map;
				},
				{},
		);
};

export const getOptionsForRequest = () => {
		return Object.entries(options).filter(
				(entry) => entry[1].requestable, // entry = [option, props]
		);
};

export const getOptionsFromVisualization = (
		visualization: Record<string, any>,
) => {
		const optionsFromVisualization: Record<string, any> = {
				...getOptionsForUi(),
				...pick(visualization, Object.keys(options)),
		};

		// XXX only in app
		optionsFromVisualization.axes = optionsFromVisualization.axes.map(
				(axis: Record<string, any>) => {
						if (axis.targetLine || axis.baseLine) {
								const clonedAxis = {...axis};
								if (clonedAxis.targetLine) {
										clonedAxis.targetLine = {
												...clonedAxis.targetLine,
												enabled: true,
										};
								}
								if (clonedAxis.baseLine) {
										clonedAxis.baseLine = {
												...clonedAxis.baseLine,
												enabled: true,
										};
								}
								return clonedAxis;
						} else {
								return axis;
						}
				},
		);

		// if array has at least one element, convert into boolean
		optionsFromVisualization.icons = Boolean(visualization.icons?.length);

		// nested options under reportingParams
		if (visualization.reportingParams) {
				optionsFromVisualization.organisationUnit =
						visualization.reportingParams.organisationUnit;
				optionsFromVisualization.reportingPeriod =
						visualization.reportingParams.reportingPeriod;
				optionsFromVisualization.parentOrganisationUnit =
						visualization.reportingParams.parentOrganisationUnit;
				optionsFromVisualization.grandParentOrganisationUnit =
						visualization.reportingParams.grandParentOrganisationUnit;
		}

		// cast option values from Number for some options
		["sortOrder", "topLimit"].forEach((option) => {
				if (Object.prototype.hasOwnProperty.call(visualization, option)) {
						optionsFromVisualization[option] = String(visualization[option]);
				}
		});

		return optionsFromVisualization;
};

export const getRequestOptions = ({
																			visualization,
																			displayProperty,
																			filters,
																	}: {
		visualization: Record<string, any>;
		filters: Record<string, any>;
		displayProperty?: string;
}) => {
		const options = getOptionsForRequest().reduce(
				(map: Record<string, any>, [option, props]) => {
						// only add parameter if value !== default
						if (
								visualization[option] !== undefined &&
								visualization[option] !== props.defaultValue
						) {
								map[option] = visualization[option];
						}

						return map;
				},
				{},
		);
		// interpretation filter
		if (filters.relativePeriodDate) {
				options.relativePeriodDate = filters.relativePeriodDate;
		}

		if (displayProperty) {
				options.displayProperty = displayProperty.toUpperCase();
		}

		// global filters
		// userOrgUnit
		if (filters.userOrgUnit && filters.userOrgUnit.length) {
				const ouIds = filters.userOrgUnit.map(
						(ouPath: string) => ouPath.split("/").slice(-1)[0],
				);

				options.userOrgUnit = ouIds.join(";");
		}

		return options;
};

export const getDisabledOptions = ({
																			 visType,
																			 options,
																	 }: {
		visType: string;
		options: Record<string, any>;
}) => {
		const disabledOptions: Record<string, any> = {};

		for (const [option, value] of Object.entries(options)) {
				switch (option) {
						case "cumulativeValues": {
								const helpText = i18n.t(
										"Not supported when using cumulative values",
								);

								// when checked, disabled totals and numberType options
								if (visType === VIS_TYPE_PIVOT_TABLE && value) {
										disabledOptions.colTotals = {};
										disabledOptions.colSubTotals = {};
										disabledOptions.rowTotals = {};
										disabledOptions.rowSubTotals = {};
										disabledOptions.numberType = {
												helpText,
										};
										disabledOptions.legend = {
												helpText,
										};
								}

								break;
						}
				}
		}

		return disabledOptions;
};
