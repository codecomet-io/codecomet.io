---
sidebar_position: 5
---

# Expressing a Pipeline

One of the key features of CodeComet is the expression of Pipelines in a developer's language of choice.

Starting with the currently available Go SDK, and with SDKs for all other mainstream languages in the works, CodeComet aims to **bring CI management and ownership back into the hands of developers**. After all, developers are the ones that best understand a project's needs.

## Example Pipeline Code

Here is an example Pipeline defined with CodeComet's Go SDK. In the example, the Pipeline does the following:
- _these are not the actual steps and need to be updated_
- sets up a Debian image
- clones a `git` repo
- installs required dependencies
- compiles the application
- creates a zip file ready to be deployed

_Need an updated example below:_
```go
package main

import (
	"github.com/codecomet-io/go-sdk/base/debian"
	"github.com/codecomet-io/go-sdk/bin/bash"
	"github.com/codecomet-io/go-sdk/codecomet"
	"github.com/codecomet-io/go-sdk/controller"
	"github.com/codecomet-io/go-sdk/from"
	"github.com/codecomet-io/go-sdk/wrapllb"
	"github.com/codecomet-io/isovaline/sdk/wrapllb/platform"
	"github.com/moby/buildkit/client/llb"
)

func main() {
	codecomet.Init()

	git := codecomet.From((&codecomet.Git{
		Reference: "c6242cb29c412168f771e97d75417e55af6cdb2e",
	}).Parse("https://github.com/thefloweringash/sigtool.git"))

	basePython := from.Python(debian.Bullseye, false, platform.DefaultPlatform)
	local := codecomet.From(&codecomet.Local{
		Path: "/Users/rajiv/botter/",
		Include: []string{
			"src",
		},
	})

	bsh := bash.New(basePython)
	bsh.Mount["/source"] = &wrapllb.State{
		Source: myLocalProject,
	}
	bsh2 := bash.New(basePython)
	bsh2.Mount["/other"] = &wrapllb.State{
		Source: git,
	}

	bsh2.Run("Git check", "ls -al /other; exit 1")

	bsh.Dir = "/source"

	bsh.Env["API_KEY"] = "914ba690d1e53d1dca05ACae301369"
	bsh.Run("Installing Python packages", "pip install -r src/requirements.txt")
	bsh.Run("Run basic tests", "pytest")
	bsh.CanFail = true
	bsh.Run("Run special tests", "pytest src/app/tests/special/specialtests.py")
	bsh.CanFail = false
	bsh.Run("Run long-running tests", "pytest src/app/tests/special/longtests.py")
	bsh.Run("Should not error", "curl --help")

	bshOutput := wrapllb.Copy(bsh.State, "/output", llb.Scratch(), "/", &wrapllb.CopyOptions{})
	bsh2Output := wrapllb.Copy(bsh2.State, "/other", llb.Scratch(), "/", &wrapllb.CopyOptions{})
	finalState := llb.Merge([]llb.State{bshOutput, bsh2Output})

	controller.Get().Exporter = &controller.Export{
		//
	}

	controller.Get().Do(finalState)
}

```

## Breakdown of Pipeline Example
Let's break down the Pipeline above, one line at a time (_needs to be updated_):

| Command | Explanation |
| ------- | ----------- |
| `import`  | Pulls in all the CodeComet requirements |
| `codecomet.Init()` | Initializes a new Pipeline object |
| `git := ...` | Downloads a `git` repository |
| `basePython := ...` | Sets up an ExecutionContext for Python |
| `local := ...` | Pulls files from folder in local machine |
| `bsh := ...` | Creates a new Action for shell commands |
| `bsh.Env[...]` | Sets an environment variable |
| `bsh.Run(...)` | Executes the Action |
