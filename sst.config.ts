import {SSTConfig} from "sst";
import {API} from "./stacks/MyStack";
import {RemovalPolicy} from "aws-cdk-lib";

export default {
    config(_input) {
        return {
            name: "s3-lambda",
            region: "ap-southeast-1",
        };
    },
    stacks(app) {
        app.setDefaultRemovalPolicy(RemovalPolicy.DESTROY);
        app.stack(API);
    }
} satisfies SSTConfig;
