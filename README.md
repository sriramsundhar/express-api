# Express-api

Reference Architecture for express api. Source is organized as shown [here](./doc/Readme.md).

## For Devs

### Prerequisites

Node.js >= v20.11.0
NPM >= v10

### Install Application

```sh
npm ci
```

### Build application

```sh
npm run build
```

### Run dev mode

```sh
npm run dev
```

### Build docker image

```sh
docker build . -t express-api
```

### Run remote api mock

```sh
npx json-server --port 3001 db.json5
```

### Format code

```sh
npm run format
```

### Lint Code

To lint the code and automatically fix some issues:

```sh
npm run lint:fix
```

To only lint the code:

```sh
npm run lint
```

### Generate Open API doc

We use [typespec](https://github.com/Microsoft/typespec) to generate open api spec

```sh
npm run tspCompile
```

### Release

Changes merged to `main` with specific commit format, will publish a release in github and corresponding docker image is also published.

For this we are leveraging [semantic-release](https://github.com/semantic-release/semantic-release) and [commit-analyzer](https://github.com/semantic-release/commit-analyzer).
We are currently configured to use [angular-convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular#angular-convention).

Please refer [here](https://github.com/semantic-release/commit-analyzer?tab=readme-ov-file#rules-definition) to find the correct convention to trigger the correct release. Please refer the [config](./.releaserc) for current configuration.

### Release Prerequisites

- Make sure release github user is exempted to push in `main` branch.
- Note: If the incoming PR has already triggered a release in the feature branch, it will not trigger a release in `main` branch.

## Deployment

### Prerequisites

- Install [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/#install-with-homebrew-on-macos)
- Setup [local k8s](https://docs.docker.com/desktop/kubernetes/#install-and-turn-on-kubernetes)
- Set context to local k8s
- Install [helm](https://helm.sh/docs/intro/install/#from-homebrew-macos)

### Deploy to local cluster

- Setup secrets in local cluster with app name (`docker-express-api` in bellow example). Please refer [here](https://kubernetes.io/docs/concepts/configuration/secret/#opaque-secrets) for adding secrets.
- Update `appVersion` in [chart](./iac/helm/Chart.yaml) file to the docker image version we want to deploy.
- Pull the private images manually.

```sh
# set context
kubectl config use-context docker-desktop
# install application
helm upgrade --install docker-express-api ./iac/helm
```

- For information in deployment to `gke` pls refer [CD](.github/workflows/cd.yml) file.
- Pls enable [github issues](https://github.com/sriramsundhar/express-api/issues) in the repo for `CD` approval process.

## Security

### DAST

- Run the application
- Run [zaproxy](https://www.zaproxy.org/docs/docker/api-scan/)
  ```sh
  docker run --rm -v $(pwd):/zap/wrk/:rw \
    ghcr.io/zaproxy/zaproxy:stable \
    zap-api-scan.py  \
    -t http://host.docker.internal:3000/api-doc/ \
    -f openapi -J report_2.json \
    -w report_2.md -r report2.html -a
  ```
