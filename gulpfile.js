var gulp = require("gulp-help")(require("gulp")),
    vfs = require("vinyl-fs"),
    gaze = require("gaze"),
    livereload = require("@nathanfaucett/livereload"),
    config = require("./config/application");


gulp.task("default", ["jsbeautifier", "jshint"]);


gulp.task("jshint", "", require("./config/tasks/jshint")(config));
gulp.task("jsbeautifier", "", require("./config/tasks/jsbeautifier")(config));


gulp.task("config", "compile config to build directory", require("./config/tasks/config")(config));
gulp.task("js", "compile js into one file", ["config"], require("./config/tasks/comn")(config));

gulp.task("css", "compile css into one file", require("./config/tasks/comn_css")(config));
gulp.task("ejs", "compile ejs into one file", require("./config/tasks/ejs")(config));


gulp.task("locale", "compiles locale files to build directory", require("./config/tasks/locale")(config));

gulp.task("clean", "clean build files", require("./config/tasks/clean")(config));


gulp.task("copy_img", "copys app img to build dir", function() {
    return vfs.src([
        config.paths.img + "/**/*"
    ]).pipe(vfs.dest(config.paths.build + "/img"));
});
gulp.task("copy_fonts", "copys app fonts to build dir", function() {
    return vfs.src([
        config.paths.fonts + "/**/*"
    ]).pipe(vfs.dest(config.paths.build + "/fonts"));
});
gulp.task("copy_email", "copys email.php to build dir", function() {
    return vfs.src([
        config.paths.app + "/email.php"
    ]).pipe(vfs.dest(config.paths.build));
});
gulp.task("copy", "copys app fonts to build dir", ["copy_email", "copy_img", "copy_fonts"]);


gulp.task("serve", "serve build directory", require("./config/tasks/serve")(config));

gulp.task("uglify", "uglify build js", require("./config/tasks/uglify")(config));
gulp.task("minify_css", "minify build css", require("./config/tasks/minify_css")(config));
gulp.task("minify_html", "minify build html", require("./config/tasks/minify_html")(config));
gulp.task("minify_json", "minify build json", require("./config/tasks/minify_json")(config));

gulp.task("minify", "minify built app", ["uglify", "minify_css", "minify_html", "minify_json"]);

var buildTasks;
if (config.env !== "production") {
	buildTasks = ["js", "css", "ejs", "locale"];
} else {
	buildTasks = ["js", "css", "ejs", "copy", "locale"];
}

gulp.task("build", "build app in current env", buildTasks, function(done) {
    if (config.env !== "production") {
        done();
    } else {
        gulp.start("minify", done);
    }
});

function reload() {
	livereload.reload();
}
gulp.task("js_reload", ["js"], reload);
gulp.task("css_reload", ["css"], reload);
gulp.task("ejs_reload", ["ejs"], reload);
gulp.task("locale_reload", ["locale"], reload);

function watch(files, task) {
    gaze(files, function(err, watcher) {
		watcher.on("all", function() {
			gulp.start(task);
		});
    });
}

gulp.task("watch", function() {
    watch([config.paths.js + "/**/*.js", config.paths.webRoot + "/js/**/*.js"], "js_reload");
    watch([
        config.paths.css + "/**/*.less", config.paths.css + "/**/*.css",
        config.paths.webRoot + "/css/**/*.less", config.paths.webRoot + "/css/**/*.css"
    ], "css_reload");
    watch([config.paths.ejs_src], "ejs_reload");
    watch([config.paths.locale + "/**/*.json"], "locale_reload");
    watch([config.paths.root + "/config/settings/**/*.js"], "js_reload");
    watch([config.paths.webRoot + "/fonts/**/*", config.paths.webRoot + "/img/**/*"], "resource_reload");
});

if (config.env !== "production") {
	gulp.task("run", "builds app and starts watching files", buildTasks, function() {
		gulp.start("watch");
		gulp.start("serve");
	});
} else {
	gulp.task("run", "builds app and starts watching files", ["build"], function() {
		gulp.start("watch");
		gulp.start("serve");
	});
}
