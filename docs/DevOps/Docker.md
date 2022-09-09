# Docker


## Steps to push docker image to Azure Container Registry (ACR)


- Login to ACR

```bash
docker login --username <username> --password <password> localhost
```

- Tag docker image

```bash
docker tag dat_core localhost:<version>
```

- Push image to ACR

```bash
docker push localhost:<version>
```
