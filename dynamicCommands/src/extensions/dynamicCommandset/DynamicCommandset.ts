import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/views";
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDynamicCommandsetCommandSetProperties {
  // This is an example; replace with your own properties
}

const LOG_SOURCE: string = 'DynamicCommandset';

export default class DynamicCommandset extends BaseListViewCommandSet<IDynamicCommandsetCommandSetProperties> {

  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized DynamicCommandset');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      const viewInTransit: string = "In-transit";
      compareOneCommand.visible = this.context.listView.view.title === viewInTransit;
    }

    const compareTwoCommand: Command = this.tryGetCommand('COMMAND_2');
    if (compareTwoCommand) {
      const viewReceived: string = "Received";
      compareTwoCommand.visible = this.context.listView.view.title === viewReceived;
    }

    const compareThreeCommand: Command = this.tryGetCommand('COMMAND_3');
    if (compareThreeCommand) {
      const viewProcessing: string = "Processing";
      compareThreeCommand.visible = this.context.listView.view.title === viewProcessing;
    }

    const compareFourCommand: Command = this.tryGetCommand('COMMAND_4');
    if (compareFourCommand) {
      const viewProcessed: string = "Processed";
      compareFourCommand.visible = this.context.listView.view.title === viewProcessed;
    }

    const compareFiveCommand: Command = this.tryGetCommand('COMMAND_5');
    if (compareFiveCommand) {
      const viewCompleted: string = "Completed";
      compareFiveCommand.visible = this.context.listView.view.title === viewCompleted;
    }

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    await super.onInit();
    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        // functionality to be added
        break;
      case 'COMMAND_2':
        // functionality to be added
        break;
      case 'COMMAND_3':
        // functionality to be added
        break;
      case 'COMMAND_4':
        // functionality to be added
        break;
      case 'COMMAND_5':
        // functionality to be added
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (_args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      const viewInTransit: string = "In-transit";
      compareOneCommand.visible = this.context.listView.view.title === viewInTransit;
    }

    const compareTwoCommand: Command = this.tryGetCommand('COMMAND_2');
    if (compareTwoCommand) {
      const viewReceived: string = "Received";
      compareTwoCommand.visible = this.context.listView.view.title === viewReceived;
    }

    const compareThreeCommand: Command = this.tryGetCommand('COMMAND_3');
    if (compareThreeCommand) {
      const viewProcessing: string = "Processing";
      compareThreeCommand.visible = this.context.listView.view.title === viewProcessing;
    }

    const compareFourCommand: Command = this.tryGetCommand('COMMAND_4');
    if (compareFourCommand) {
      const viewProcessed: string = "Processed";
      compareFourCommand.visible = this.context.listView.view.title === viewProcessed;
    }

    const compareFiveCommand: Command = this.tryGetCommand('COMMAND_5');
    if (compareFiveCommand) {
      const viewCompleted: string = "Completed";
      compareFiveCommand.visible = this.context.listView.view.title === viewCompleted;
    }

    // TODO: Add your logic here
    // You can call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }

}

