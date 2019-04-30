import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import zlib from "zlib";

export default class RouteConfig {
  static init(application) {
    let _root = process.cwd();
    let _nodeModules = "/node_modules/";
    let _clientFiles = (process.env.NODE_ENV === "production") ? "/client/dist/" : "/client/dev/";

    application.use(compression({
      level: zlib.Z_BEST_COMPRESSION,
      threshold: "1kb"
    }));


    application.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization");
      res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS, PATCH");
      next();
    });

    application.options("*", (req, res, next) => {
      res.end();
    });

    application.use(express.static(_root + _nodeModules));
    application.use(express.static(_root + _clientFiles));
    application.use(bodyParser.json());
    application.use(morgan("dev"));
    application.use(helmet());
  }
}
