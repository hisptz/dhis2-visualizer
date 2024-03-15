import {useParams} from "react-router-dom";
import {CssReset} from "@dhis2/ui";
import {Visualization} from "./components/Visualization";
import {useVisualization} from "../../hooks/config";

export function LegacyVisualizer() {
		const {id} = useParams();
		const {isLoading, isError, data, error} = useVisualization(id);
		if (isLoading) {
				return <div>Loading...</div>;
		}

		if (isError) {
				return <div id="errro">{error.message}</div>;
		}

		return (
				<div
						id={"visualization"}
						style={{
								display: "flex",
								flexDirection: "column",
								textAlign: "center",
								padding: 16,
								width: "100%",
								height: "100%",
						}}
				>
						<CssReset/>
						<div
								style={{
										flexGrow: 1,
										minHeight: "100%",
										height: "100%",
										width: "100%",
										minWidth: "100%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "stretch",
								}}
						>
								<Visualization visualization={data}/>
						</div>
				</div>
		);
}
