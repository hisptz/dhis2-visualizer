import {useParams} from "react-router-dom";
import {useDataQuery} from "@dhis2/app-runtime";
import {Visualization, VisualizationConfig} from "@hisptz/dhis2-analytics";
import {isEmpty, snakeCase} from "lodash";
import {useElementSize} from "usehooks-ts";
import {useMemo} from "react";
import {CssReset} from "@dhis2/ui";


const visualizationQuery = {
    vis: {
        resource: 'visualizations',
        id: ({id}: any) => id,
    }
}


function getLayout(visualization: any) {
    return {
        rows: visualization.rows.map((row: any) => row.id),
        columns: visualization.columns.map((col: any) => col.id),
        filters: visualization.filters.map((filter: any) => filter.id)
    }
}

function getDefaultType(visualization: any) {
    if (['BAR', 'COLUMN', 'LINE'].includes(visualization.type)) {
        return 'chart'
    }

    return visualization.type;
}


function getConfig(visualization: any): VisualizationConfig {
    const type = getDefaultType(visualization);
    const layout = getLayout(visualization);

    switch (type) {
        case "chart":
            return {
                chart: {
                    type: ['BAR', 'COLUMN'].includes(visualization.type) ? 'column' : visualization.type.toLowerCase(),
                    layout: {
                        filter: layout.filters,
                        series: layout.columns,
                        category: layout.rows
                    }
                }
            }
    }
}


function getDataItems(visualization: any) {
    return visualization.dataDimensionItems.map((item: any) => item.indicator.id);
}

function getPeriods(visualization: any) {
    const periods = visualization.periods;
    const relativePeriods = Object.keys(visualization.relativePeriods).filter((key) => visualization.relativePeriods[key]);
    return [...periods, ...(relativePeriods.map(period => snakeCase(period).toUpperCase()))];
}

function getOrgUnits(visualization: any) {
    const orgUnits = visualization.organisationUnits;
    if (!isEmpty(orgUnits)) {
        return orgUnits.map((orgUnit: any) => orgUnit.id)
    }
    const userOrgUnits = [];

    if (visualization.userOrganisationUnit) {
        userOrgUnits.push(`USER_ORGUNIT`)
    }
    if (visualization.userOrganisationUnitChildren) {
        userOrgUnits.push(`USER_ORGUNIT_CHILDREN`)
    }
    if (visualization.userOrganisationUnitGrandChildren) {
        userOrgUnits.push(`USER_ORGUNIT_GRANDCHILDREN`)
    }

    return userOrgUnits;
}

function getCategoryOptions(visualization: any) {
    return []
}

function App() {
    const {id} = useParams();
    const {data, loading} = useDataQuery(visualizationQuery, {
        variables: {
            id
        }
    })
    const [ref, {height}] = useElementSize();

    const visualization = useMemo(() => data?.vis, [data]);


    if (loading) {
        console.log('Loading...')
    }

    if (!data?.vis) {
        return <div>Error getting visualization</div>
    }

    console.log({
        height
    });

    return (
        <div ref={ref} style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            textAlign: "center"
        }}>
            <CssReset/>
            <h2>{visualization.displayName}</h2>
            <Visualization
                height={height}
                layout={getLayout(visualization)}
                defaultVisualizationType={getDefaultType(visualization)}
                dimensions={{
                    dx: getDataItems(visualization),
                    pe: getPeriods(visualization),
                    ou: getOrgUnits(visualization),
                    co: getCategoryOptions(visualization)
                }}
                config={getConfig(visualization)}
            />
        </div>
    )
}

export default App
