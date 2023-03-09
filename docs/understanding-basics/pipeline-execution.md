---
sidebar_position: 6
---

# Pipeline Execution

## From Command Line

Assuming the Pipeline you created is in `pipeline.go`, you can execute the pipeline with the following command:

```
codecomet run pipeline.go
```

The output should look something like this:
```
<insert appropriate sample output here>
```

The [CodeComet CLI reference document](/docs/reference/codecomet-cli) contains more information on the available commands.

## Within Existing CI

If you want to run CodeComet within your existing CI runners, you may easily do so. Below is an example YAML to set up CodeComet to run on GitHub Actions.

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    strategy:
      matrix:
        os: [macos-11, macos-12]
    runs-on: ${{ matrix.os }}

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      - name: Run CodeComet plan
        run: |
          # Unfortunately, right now we conflict https://github.com/codecomet-io/isovaline/issues/22
          brew unlink lima

          # Installation proper
          brew tap codecomet-io/tap https://github.com/codecomet-io/installers.git
          brew install --HEAD codecomet
          codecomet-machine install
          ret=
          
          export CODECOMET_DEBUG=true
          while [ "$ret" != "Running" ]; do
            sleep 5
            echo "Testing VM..."
            ret="$(codecomet-machine status | jq -rc .Machine.status || true)"
            echo "Status: $ret"
          done
```