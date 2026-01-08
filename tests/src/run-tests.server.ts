import { getInstanceAtPath } from "@rbxts/flamework-meta-utils";
import { instrument, istanbul } from "@rbxts/coverage";
import { TestRunner } from "@rbxts/runit";

const http = game.GetService("HttpService");
const replicated = game.GetService("ReplicatedStorage");

instrument([replicated.WaitForChild("Library")]);

const testRunner = new TestRunner(getInstanceAtPath("tests/src")!);
testRunner.run({ colors: true })
  .then(() => {
    const report = istanbul();
    const unmappedJSON = http.JSONEncode(report);
    const [reportJSON] = unmappedJSON.gsub('"ReplicatedStorage/Library/([^"]+)"', '"out/%1.luau"');
    const coverageValue = new Instance("StringValue");
    coverageValue.Name = "coverage";
    coverageValue.Value = reportJSON;
    coverageValue.Parent = replicated;
  });