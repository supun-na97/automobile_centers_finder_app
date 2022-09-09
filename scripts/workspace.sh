#!/usr/bin/env bash

docker-compose exec --user $(id -u):$(id -g) core bash
