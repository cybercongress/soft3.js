# cyberjs

Usage:
```
yarn

yarn get-proto

yarn define-proto

yarn postdefine-proto

yarn build
```

Try:
```
node cyberlinks.js

node query.js
```

Note:

- [Install protoc](https://github.com/cybercongress/go-cyber/blob/bostrom-dev/contrib/devtools/Makefile#L7)
- Install typescript ```yarn add tsc -g```
- Remove /cyber path in /*.proto imports from proto/cyber/go-cyber-bostrom-dev/proto/cyber
```
// e.g
import "bandwidth/v1beta1/params.proto";
import "bandwidth/v1beta1/bandwidth.proto";
```

- In local dev env link to your app ```yarn add link:/path/to/js-cyber```