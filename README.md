# Delphi Management Console

A management console for the Delphi platform.

We are currently in pre-alpha state! There is no release and the code in
this repository is purely experimental!

|branch | status | codacy | snyk |
| :---: | :---: | :---: | :---: |  
| master | [![Build Status](https://travis-ci.org/delphi-hub/delphi-management.svg?branch=master)](https://travis-ci.org/delphi-hub/delphi-management) | [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0a50d2132e6b46adb6f6eb36b6ddc4e7)](https://www.codacy.com/app/delphi-hub/delphi-management?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=delphi-hub/delphi-management&amp;utm_campaign=Badge_Grade)| [![Known Vulnerabilities](https://snyk.io/test/github/delphi-hub/delphi-management/badge.svg?targetFile=build.sbt)](https://snyk.io/test/github/delphi-hub/delphi-management/?targetFile=build.sbt) |
| develop | [![Build Status](https://travis-ci.org/delphi-hub/delphi-management.svg?branch=develop)](https://travis-ci.org/delphi-hub/delphi-management) | [![Codacy Badge](https://api.codacy.com/project/badge/Grade/0a50d2132e6b46adb6f6eb36b6ddc4e7?branch=develop)](https://www.codacy.com/app/delphi-hub/delphi-management?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=delphi-hub/delphi-management&amp;utm_campaign=Badge_Grade) | [![Known Vulnerabilities](https://snyk.io/test/github/delphi-hub/delphi-management/develop/badge.svg?targetFile=build.sbt)](https://snyk.io/test/github/delphi-hub/delphi-management/develop/?targetFile=build.sbt) |

## What is the Delphi Management Console?

It is a web application to allow administrators to control the crawling process.

## How does it work?

It takes commands from authenticated administrators over the web interface and issues the appropriate steps in the crawler.

## How can I use it?
To build the angular app for deployment make sure to have npm and the angular cli installed 
```
cd client && npm install && ng build --prod && cd ..

For OS X users you need to expose the TCP port manually. The docker FAQ suggest it in this way:
```
docker run -d -v /var/run/docker.sock:/var/run/docker.sock -p 127.0.0.1:1234:1234 bobrik/socat TCP-LISTEN:1234,fork UNIX-CONNECT:/var/run/docker.sock
```

For any deployed instance you need an administrator account to interact with the application.
You can start your own instance by executing

```
sbt run
```

## Community

Feel welcome to join our chatroom on Gitter: [![Join the chat at https://gitter.im/delphi-hub/delphi](https://badges.gitter.im/delphi-hub/delphi.svg)](https://gitter.im/delphi-hub/delphi?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Contributing

Contributions are *very* welcome!

Before contributing, please read our [Code of Conduct](CODE_OF_CONDUCT.md).

Refer to the [Contribution Guide](CONTRIBUTING.md) for details about the workflow.
We use Pull Requests to collect contributions. Especially look out for "help wanted" issues
[![GitHub issues by-label](https://img.shields.io/github/issues/delphi-hub/delphi-management/help%20wanted.svg)](https://github.com/delphi-hub/delphi-management/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22),
but feel free to work on other issues as well.
You can ask for clarification in the issues directly, or use our Gitter
chat for a more interactive experience.

[![GitHub issues](https://img.shields.io/github/issues/delphi-hub/delphi-management.svg)](https://github.com/delphi-hub/delphi-management/issues)


## License

The Delphi CLI is open source and available under Apache 2 License.

[![GitHub license](https://img.shields.io/github/license/delphi-hub/delphi-management.svg)](https://github.com/delphi-hub/delphi-management/blob/master/LICENSE)
