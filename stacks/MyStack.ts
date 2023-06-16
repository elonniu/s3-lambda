import {Bucket, EventBus, Function, StackContext} from "sst/constructs";
import {s3Url, stackUrl} from "sst-helper";
import * as events from "aws-cdk-lib/aws-events";

export function API({stack}: StackContext) {

    const lambda = new Function(stack, "lambda", {
        handler: "packages/functions/src/lambda.handler",
    })

    const bucket = new Bucket(stack, "bucket", {
        cdk: {
            bucket: {
                eventBridgeEnabled: true
            }
        },
        notifications: {
            myNotification: {
                function: lambda,
                events: ["object_created"],
            },
        },
    });

    new EventBus(stack, "Bus", {
        cdk: {
            eventBus: events.EventBus.fromEventBusName(stack, "ImportedBus", "default"),
        },
        rules: {
            myRule: {
                pattern: {
                    source: ["aws.s3"],
                    detailType: ["Object Created"]
                },
                targets: {
                    myTarget1: lambda,
                },
            },
        },
    });

    stack.addOutputs({
        stack: stackUrl(stack),
        bucket: s3Url(bucket, stack),
    });
}
