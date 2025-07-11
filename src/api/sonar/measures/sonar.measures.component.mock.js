export default {
  "component": {
    "key": "MY_PROJECT:ElementImpl.java",
    "name": "ElementImpl.java",
    "qualifier": "FIL",
    "language": "java",
    "path": "src/main/java/com/sonarsource/markdown/impl/ElementImpl.java",
    "measures": [
      {
        "metric": "ncloc",
        "value": "114"
      },
      {
        "metric": "complexity",
        "value": "12"
      },
      {
        "metric": "new_violations",
        "period": {
          "value": "25",
          "bestValue": false
        }
      }
    ]
  },
  "metrics": [
    {
      "key": "complexity",
      "name": "Complexity",
      "description": "Cyclomatic complexity",
      "domain": "Complexity",
      "type": "INT",
      "higherValuesAreBetter": false,
      "qualitative": false,
      "hidden": false
    },
    {
      "key": "ncloc",
      "name": "Lines of code",
      "description": "Non Commenting Lines of Code",
      "domain": "Size",
      "type": "INT",
      "higherValuesAreBetter": false,
      "qualitative": false,
      "hidden": false
    },
    {
      "key": "new_violations",
      "name": "New issues",
      "description": "New Issues",
      "domain": "Issues",
      "type": "INT",
      "higherValuesAreBetter": false,
      "qualitative": true,
      "hidden": false
    }
  ],
  "period": {
    "mode": "previous_version",
    "date": "2016-01-11T10:49:50+0100",
    "parameter": "1.0-SNAPSHOT"
  }
}