#!/bin/sh

set -e

export PROJECT_ID="clinq-services"
export GITHUB_SHA=$(git rev-parse --short HEAD)
export APP="clinq-bridge-1sales"
export IMAGE="eu.gcr.io/$PROJECT_ID/$APP:latest"
export DOMAIN="1sales.bridge.clinq.com"

kubectl kustomize k8s/template | envsubst > k8s/prod.yml
kubectl apply -f k8s/prod.yml
