# List

### Contenedor frontend

```
docker run -d --name frontend -p 4000:9000 -e PORT=9000 -e SERVICE_BACKEND1=http://localhost:4001/api/products --network net-ms frontend:1
```

### Contenedor backend1

```
docker run -d --name backend1 -p 4001:9001 -e PORT=9001 -e SERVICE_BACKEND2=http://backend2:9002/api/products --network net-ms backend1:1
```

### Contenedor backend2

```
docker run -d --name backend2 -e PORT=9002 --network net-ms backend2:1
```
