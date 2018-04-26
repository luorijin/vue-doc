var fs=require('fs');
var path=require('path');
var glob=require('glob');
var chokidar = require('chokidar');
var root_path=path.resolve(__dirname,'../markdown/**/*.md');
var out_path=path.resolve(__dirname,'../router/route.config.js');
var watcher=chokidar.watch(path.resolve(__dirname,'../markdown'));
function configOut(){
	var files=glob.sync(root_path);
	var routes=[];
	files.forEach(function(url){
		var route={};
		var rurl=path.relative(path.resolve(__dirname,'../markdown'),url);
		route.path=rurl.split(path.sep).join("/").replace(/(.+)(\.md)$/,"/$1");
		route.name=rurl.replace(/(.+)(\.md)$/,"$1");
		route.component=`<require('${url}').default>`;
		routes.push(route);

	});
	var routesStr=JSON.stringify(routes).replace(/\"<([^><]+)>\"/g,'$1');
	fs.writeFileSync(out_path,"module.exports="+routesStr);
}
configOut();
watcher.on('ready', () => {
    watcher.on('add', (path) => {
    	configOut();
        console.log('<---- watched new file add, do something ---->');
    });
    watcher.on('unlink', (path) => {
    	configOut();
        console.log('<---- watched file remove, do something ---->');
    });
});
