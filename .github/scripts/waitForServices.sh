#!/bin/sh
# set -x

# Get all running container names
container_names=$(docker ps --format '{{.Names}}')

for container_name in $container_names; do
  status=$(docker inspect -f '{{.State.Health.Status}}' "$container_name")

  while [ "$status" != "healthy" ]; do
      echo "Waiting for container $container_name to be running..."
      sleep 1
      status=$(docker inspect -f '{{.State.Health.Status}}' "$container_name")
  done

  echo "Container $container_name is healthy!"
done
