require("./config");
const createTestCafe = require("testcafe");

let testcafe = null;

createTestCafe("localhost", 1337, 1338)
  .then(tc => {
    testcafe = tc;
    const runner = testcafe.createRunner();

    return (
      runner
        .src(["specs"])
          .reporter("s1html", "reports/result.html")
        .run()
    );
  })
  .then(failedCount => {
    console.error("Tests failed: " + failedCount);
    testcafe.close();
  });
