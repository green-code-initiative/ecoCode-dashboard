export default {
  paging: {
    pageIndex: 1,
    pageSize: 100,
    total: 1
  },
  issues: [
    {
      key: '01fc972e-2a3c-433e-bcae-0bd7f88f5123',
      component: 'com.github.kevinsawicki:http-request:com.github.kevinsawicki.http.HttpRequest',
      project: 'com.github.kevinsawicki:http-request',
      rule: 'java:S1144',
      cleanCodeAttribute: 'CLEAR',
      cleanCodeAttributeCategory: 'INTENTIONAL',
      issueStatus: 'ACCEPTED',
      prioritizedRule: false,
      impacts: [
        {
          softwareQuality: 'SECURITY',
          severity: 'HIGH'
        }
      ],
      message: 'Remove this unused private "getKee" method.',
      messageFormattings: [
        {
          start: 0,
          end: 4,
          type: 'CODE'
        }
      ],
      line: 81,
      hash: 'a227e508d6646b55a086ee11d63b21e9',
      author: 'Developer 1',
      effort: '2h1min',
      creationDate: '2013-05-13T17:55:39+0200',
      updateDate: '2013-05-13T17:55:39+0200',
      tags: ['bug', 'creedengo'],
      comments: [
        {
          key: '7d7c56f5-7b5a-41b9-87f8-36fa70caa5ba',
          login: 'john.smith',
          htmlText: 'Must be &quot;public&quot;!',
          markdown: 'Must be "public"!',
          updatable: false,
          createdAt: '2013-05-13T18:08:34+0200'
        }
      ],
      attr: {
        'jira-issue-key': 'SONAR-1234'
      },
      transitions: ['reopen'],
      actions: ['comment'],
      textRange: {
        startLine: 2,
        endLine: 2,
        startOffset: 0,
        endOffset: 204
      },
      flows: [
        {
          locations: [
            {
              textRange: {
                startLine: 16,
                endLine: 16,
                startOffset: 0,
                endOffset: 30
              },
              msg: 'Expected position: 5',
              msgFormattings: [
                {
                  start: 0,
                  end: 4,
                  type: 'CODE'
                }
              ]
            }
          ]
        },
        {
          locations: [
            {
              textRange: {
                startLine: 15,
                endLine: 15,
                startOffset: 0,
                endOffset: 37
              },
              msg: 'Expected position: 6',
              msgFormattings: []
            }
          ]
        }
      ],
      quickFixAvailable: false,
      ruleDescriptionContextKey: 'spring',
      codeVariants: ['windows', 'linux']
    }
  ],
  components: [
    {
      key: 'com.github.kevinsawicki:http-request:src/main/java/com/github/kevinsawicki/http/HttpRequest.java',
      enabled: true,
      qualifier: 'FIL',
      name: 'HttpRequest.java',
      longName: 'src/main/java/com/github/kevinsawicki/http/HttpRequest.java',
      path: 'src/main/java/com/github/kevinsawicki/http/HttpRequest.java'
    },
    {
      key: 'com.github.kevinsawicki:http-request',
      enabled: true,
      qualifier: 'TRK',
      name: 'http-request',
      longName: 'http-request'
    }
  ],
  rules: [
    {
      key: 'java:S1144',
      name: 'Unused "private" methods should be removed',
      status: 'READY',
      lang: 'java',
      langName: 'Java'
    }
  ],
  users: [
    {
      login: 'admin',
      name: 'Administrator',
      active: true,
      avatar: 'ab0ec6adc38ad44a15105f207394946f'
    }
  ],
  facets: [
    {
      property: 'severities',
      values: [
        {
          val: 'MAJOR',
          count: 1
        },
        {
          val: 'MINOR',
          count: 20
        },
        {
          val: 'INFO',
          count: 5
        },
      ]
    },
    {
      property: 'cleanCodeAttributeCategories',
      values: [
        {
          val: 'INTENTIONAL',
          count: 6912
        },
        {
          val: 'CONSISTENT',
          count: 4950
        },
        {
          val: 'ADAPTABLE',
          count: 899
        },
        {
          val: 'RESPONSIBLE',
          count: 27
        }
      ]
    },
    {
      property: 'impactSeverities',
      values: [
        {
          val: 'HIGH',
          count: 435
        },
        {
          val: 'LOW',
          count: 7858
        },
        {
          val: 'MEDIUM',
          count: 4495
        }
      ]
    },
  ]
}
