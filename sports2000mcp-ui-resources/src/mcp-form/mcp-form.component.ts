import { Component, OnInit } from "@angular/core";
import { DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartFormComponent, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartFrameRegistryService, SmartGridRegistryService, SmartFilterRegistry, SmartStatusBarRegistryService, SmartFormStretchModeHelperService, SmartHelpService, WidgetFacadeFactory, SmartTableIOTargetRegistryService, DataboundControlRegistryService, SmartFileUploadRegistryService, SmartServerSideEventHandlerQueueService, SmartAutomaticTableIOLinkService } from "@consultingwerk/smartcomponent-library";

/**
 * Hosts the SmartForm runtime and all registries required by the Sports2000 MCP form shell.
 *
 * @memberof McpForm
 */
@Component({
	selector: 'smart-mcp-form',
	templateUrl: './mcp-form.component.html',
	styleUrls: ['./mcp-form.component.css'],
	providers: [
		DataSourceRegistry,
		SmartViewManagerService,
		SmartFormInstanceService,
		SmartToolbarRegistry,
		SmartViewerRegistryService,
		SmartTabFolderRegistryService,
		SmartFrameRegistryService,
		SmartGridRegistryService,
		SmartFilterRegistry,
		SmartStatusBarRegistryService,
		SmartFormStretchModeHelperService,
		SmartHelpService,
		WidgetFacadeFactory,
		SmartTableIOTargetRegistryService,
		DataboundControlRegistryService,
		SmartFileUploadRegistryService,
		SmartServerSideEventHandlerQueueService,
		SmartAutomaticTableIOLinkService
	],
	standalone: false
})
export class McpFormComponent extends SmartFormComponent implements OnInit {

}