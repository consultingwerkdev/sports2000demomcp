import { Component, forwardRef, OnInit } from "@angular/core";
import { DataSourceRegistry, SmartViewManagerService, SmartFormInstanceService, SmartFormComponent, SmartToolbarRegistry, SmartViewerRegistryService, SmartTabFolderRegistryService, SmartFrameRegistryService, SmartGridRegistryService, SmartFilterRegistry, SmartStatusBarRegistryService, SmartFormStretchModeHelperService, SmartHelpService, WidgetFacadeFactory, SmartTableIOTargetRegistryService, DataboundControlRegistryService, SmartFileUploadRegistryService, SmartServerSideEventHandlerQueueService, SmartAutomaticTableIOLinkService } from "@consultingwerk/smartcomponent-library";

@Component({
	selector: 'smart-mcp-form',
	templateUrl: './mcp-form.component.html',
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