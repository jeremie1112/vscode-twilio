// check if service sid exists in twilio functions

// if not, prompt for service sid from vscode

const fs = require('fs');
const path = require('path');

function getServiceSid(vscode) {
    return new Promise((resolve, reject) => {
        const wsPath = (vscode.workspace.workspaceFolders[0].uri.fsPath);
        const twilioFnFilePath = path.join(wsPath, `.twilio-functions`);
    
        fs.readFile(twilioFnFilePath, (err, data) => {
            if (err) { reject(err); };

            const parsedData = JSON.parse(data.toString());

            if (parsedData.serviceSid) {

                resolve(parsedData.serviceSid);

            } else {
                vscode.window.showInputBox({
                    ignoreFocusOut: true,
                    placeHolder: 'Enter your Service SID here...',
                }).then(serviceSid => {

                    parsedData['serviceSid'] = serviceSid;
                    let writeData = JSON.stringify(parsedData, null, 4);

                    fs.writeFile(twilioFnFilePath, writeData, 'utf-8', (err) => {
                        if (err) { reject(err); };

                        resolve(serviceSid);
                    })

                });	
            }
        });
    });
}

module.exports = getServiceSid;