import * as vscode from 'vscode';
import { optimizeFile } from './optmizeSingleFile';
import { optimizeAllFiles} from './optimizeAllFiles';
import { window,commands, ExtensionContext } from 'vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(commands.registerCommand('redim-optimizer.redim', async () => {
		const options: { [key: string]: (context: ExtensionContext) => Promise<void> } = {
			optimizeFile,
			optimizeAllFiles,

		};
		const quickPick = window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));
		quickPick.onDidChangeSelection(selection => {
			if (selection[0]) {
				options[selection[0].label](context)
				.catch(console.error);
			}
		});
		quickPick.onDidHide(() => quickPick.dispose());
		quickPick.show();
	}
	
));

}

// This method is called when your extension is deactivated
export function deactivate() {}
