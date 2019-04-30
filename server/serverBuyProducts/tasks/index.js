import gulp from "gulp"
import fwdref from "undertaker-forward-reference"

gulp.registry(fwdref())


require("require-dir")("server")

