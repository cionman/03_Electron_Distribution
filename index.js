/**
 * Created by Blidkaga on 2017. 3. 19..
 */
const {app, BrowserWindow} = require('electron');
let win;

app.on('ready', () =>{
    win = new BrowserWindow(
        {
            width : 800
            , minWidth:330
            , height :500
            , minHeight: 450
            , show: false
            , icon: __dirname + '/resources/Icon.ico'
            , webPreferences :{ defaultFontSize : 14}
        }
    );
    win.once('ready-to-show', function(){
        win.show();
    });

    //
    win.loadURL(`file://${__dirname}/index.html`);

    //개발자 도구 오픈픈
    win.webContents.openDevTools();
});