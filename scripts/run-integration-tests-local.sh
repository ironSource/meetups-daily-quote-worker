#!/usr/bin/env bash

$(aws ecr get-login --region us-east-1 --no-include-email)

rm -rf output
mkdir output
cmd="docker build -t integration-tests ../../appquarium-integration-tests/"
# imageUri=888175482348.dkr.ecr.us-east-1.amazonaws.com/appquarium/integration-tests
# cmd="docker pull ${imageUri}"
echo $cmd
eval $cmd

# cmd="docker run ${imageUri} get_env --pull > env.tar.gz"
cmd="docker run integration-tests get_env --pull > env.tar.gz"
echo $cmd
eval $cmd

tar -xvzf env.tar.gz -C output/

cmd="docker-compose -f output/docker-compose.yml pull"
echo $cmd
eval $cmd

cmd="docker-compose -f output/docker-compose.yml up --build -d"
echo $cmd
eval $cmd


cmd="docker rm -f salesforce-worker"
echo $cmd
eval $cmd

cd ..
cmd="docker build -t salesforce-worker ${PWD}"
echo $cmd
eval $cmd


cmd="docker run -e NODE_ENV=pipeline-test --name salesforce-worker -d -p 8022:8022 --net output_appQuarium salesforce-worker"
echo $cmd
eval $cmd

# sleep 30

# cmd="docker run --network=host 888175482348.dkr.ecr.us-east-1.amazonaws.com/appquarium/integration-tests run_tests"
# echo $cmd
# eval $cmd
