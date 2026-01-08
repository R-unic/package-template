import { Assert, Fact } from "@rbxts/runit";
import { hello } from "../src/index";

class MyPackageTest {
  @Fact
  public hello(): void {
    Assert.equal("Hello, Runic!", hello("Runic"));
  }
}

export = MyPackageTest;