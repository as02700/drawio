var gulp = require('gulp');
var concat = require('gulp-concat');
var path = require('path');
var fs = require('fs');

var webapp = path.join.bind(path, '.');
var to = path.join.bind(path, '.', 'js');

function unlink(_path) {
  return new Promise(function(res, rej) {
    fs.unlink(_path, function(err, data) {
      res(!err);
    });
  });
}

function read(_path) {
  return new Promise(function(res, rej) {
    fs.readFile(_path, function(err, data) {
      err ? rej(err) : res(data);
    });
  });
}

function write(_path, content) {
  return new Promise(function(res, rej) {
    fs.writeFile(_path, content, function(err, data) {
      err ? rej(err) : res(data);
    });
  });
}

function toString(x, stringify) {
  return stringify.toString(x);
}

function replace(reg, placer, text) {
  return text.replace(reg, placer);
}

function join(separator, xs) {
  return xs.join(separator);
}

gulp.task('clean', function() {
  return unlink('./zz-app.bundle.js');
});

gulp.task('clean:stylesheet', function() {
  return unlink(webapp('./Graph-Stylesheet.js'));
});

gulp.task('stylesheet', function() {
  var _toString = toString.bind(null, undefined);
  var replaceSeparator = replace.bind(null, /\${line.separator}/g, '');
  var replaceQuote = replace.bind(null, /'/g, "\\\\\\\\'");
  var replaceBlank = replace.bind(null, /\s/g, '');
  var _join = join.bind(null, '');
  var styles = webapp.bind(null, 'styles');
  var left1 = Promise.resolve("Graph.prototype.defaultThemes[Graph.prototype.defaultThemeName] = mxUtils.parseXml('");
  var left2 = Promise.resolve("Graph.prototype.defaultThemes['darkTheme'] = mxUtils.parseXml('");
  var right = Promise.resolve("').documentElement;");
  var defaultTheme = read(styles('default.xml')).then(_toString).then(replaceSeparator).then(replaceQuote).then(replaceBlank);
  var darkDefaultTheme = read(styles('dark-default.xml')).then(_toString).then(replaceSeparator).then(replaceQuote).then(replaceBlank);
  return Promise.all([
    Promise.all([left1, defaultTheme, right]).then(_join),
    Promise.all([left2, darkDefaultTheme, right]).then(_join),
  ])
  .then(join.bind(null, '\n'))
  .then(write.bind(null, webapp('Graph-Stylesheet.js')));
});

gulp.task('bundle', function() {
  var mxgraph = to.bind(null, 'mxgraph');
  var diagramly = to.bind(null, 'diagramly');
  var sidebar = diagramly.bind(null, 'sidebar');
  var util = diagramly.bind(null, 'util');
  return gulp.src(
    [
      // lib
      to('spin', 'spin.min.js'),
      to('sanitizer', 'sanitizer.min.js'),
      to('deflate', 'pako.min.js'),

      // client
      to('deflate', 'base64.js'),
      to('diagramly', 'Init.js'),
      mxgraph('Init.js'),
      webapp('..', '..', '..', 'etc', 'mxgraph', 'mxClient.js'),
      to('jscolor', 'jscolor.js'),

      // graph-editor
      mxgraph('Editor.js'),
      mxgraph('EditorUi.js'),
      mxgraph('Sidebar.js'),
      mxgraph('Graph.js'),
      mxgraph('Format.js'),
      mxgraph('Shapes.js'),
      mxgraph('Actions.js'),
      mxgraph('Menus.js'),
      mxgraph('Toolbar.js'),
      mxgraph('Dialogs.js'),

      // sidebar
      sidebar('Sidebar.js'),
      sidebar('Sidebar-Advanced.js'),
      sidebar('Sidebar-AlliedTelesis.js'),
      sidebar('Sidebar-Android.js'),
      sidebar('Sidebar-ArchiMate.js'),
      sidebar('Sidebar-ArchiMate3.js'),
      sidebar('Sidebar-Arrows2.js'),
      sidebar('Sidebar-Atlassian.js'),
      sidebar('Sidebar-AWS.js'),
      sidebar('Sidebar-AWS3.js'),
      sidebar('Sidebar-AWS3D.js'),
      sidebar('Sidebar-Azure.js'),
      sidebar('Sidebar-Basic.js'),
      sidebar('Sidebar-Bootstrap.js'),
      sidebar('Sidebar-BPMN.js'),
      sidebar('Sidebar-Cabinet.js'),
      sidebar('Sidebar-CiscoSafe.js'),
      sidebar('Sidebar-Citrix.js'),
      sidebar('Sidebar-EIP.js'),
      sidebar('Sidebar-Electrical.js'),
      sidebar('Sidebar-ER.js'),
      sidebar('Sidebar-Floorplan.js'),
      sidebar('Sidebar-Flowchart.js'),
      sidebar('Sidebar-GCP.js'),
      sidebar('Sidebar-GCP2.js'),
      sidebar('Sidebar-Gmdl.js'),
      sidebar('Sidebar-IBM.js'),
      sidebar('Sidebar-Infographic.js'),
      sidebar('Sidebar-Ios.js'),
      sidebar('Sidebar-Ios7.js'),
      sidebar('Sidebar-LeanMapping.js'),
      sidebar('Sidebar-Mockup.js'),
      sidebar('Sidebar-MSCAE.js'),
      sidebar('Sidebar-Network.js'),
      sidebar('Sidebar-Office.js'),
      sidebar('Sidebar-PID.js'),
      sidebar('Sidebar-Rack.js'),
      sidebar('Sidebar-Sitemap.js'),
      sidebar('Sidebar-Sysml.js'),
      sidebar('Sidebar-Veeam.js'),
      sidebar('Sidebar-WebIcons.js'),

      // tmp1
      diagramly('DrawioFile.js'),
      diagramly('LocalFile.js'),
      diagramly('LocalLibrary.js'),
      diagramly('StorageFile.js'),
      diagramly('StorageLibrary.js'),
      diagramly('UrlLibrary.js'),
      diagramly('Dialogs.js'),
      diagramly('Editor.js'),
      diagramly('EditorUi.js'),
      diagramly('Settings.js'),
      webapp('Graph-Stylesheet.js'),
      util('mxAsyncCanvas.js'),
      util('mxJsCanvas.js'),
      diagramly('DrawioClient.js'),
      diagramly('DrawioUser.js'),
      diagramly('DriveRealtime.js'),
      diagramly('RealtimeMapping.js'),
      diagramly('DriveFile.js'),
      diagramly('DriveLibrary.js'),
      diagramly('DriveClient.js'),
      diagramly('DropboxFile.js'),
      diagramly('DropboxLibrary.js'),
      diagramly('DropboxClient.js'),
      diagramly('OneDriveFile.js'),
      diagramly('OneDriveLibrary.js'),
      diagramly('OneDriveClient.js'),
      diagramly('GitHubFile.js'),
      diagramly('GitHubLibrary.js'),
      diagramly('GitHubClient.js'),
      diagramly('TrelloFile.js'),
      diagramly('TrelloLibrary.js'),
      diagramly('TrelloClient.js'),
      diagramly('ChatWindow.js'),
      diagramly('App.js'),
      diagramly('Menus.js'),
      diagramly('Pages.js'),
      diagramly('Trees.js'),
      diagramly('Minimal.js'),
      diagramly('DistanceGuides.js'),
    ]
  )
  .pipe(
    concat('zz-app.bundle.js', {newLine: '\n'})
  )
  .pipe(
    gulp.dest('.', {path: __dirname})
  );
});

gulp.task('default', ['clean', 'stylesheet', 'bundle', 'clean:stylesheet']);
