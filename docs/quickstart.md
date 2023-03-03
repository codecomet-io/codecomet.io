---
sidebar_position: 2
---

# Quickstart Guide

Below is everything you need to know to design and run your first pipeline.

## Installation

### Requirements

At the moment, only macOS is supported. The toolkit was tested on Ventura.

### Step 1: Install Homebrew
Before setting up `codecomet`, make sure `homebrew` is installed:

```bash
# See https://brew.sh/ for instructions
# Usually, this is:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install CodeComet
Install `codecomet` using the `brew` tap, as shown below:
```bash
brew tap codecomet-io/tap https://github.com/codecomet-io/installers.git
brew install --HEAD codecomet
# Then start the service
codecomet-machine install
```

### Step 3: Verify Setup
Give `codecomet` some time to boot, then verify setup by typing the following command:
```bash
codecomet-machine status
```

### Known Caveats
* Currently, the formula conflicts with `lima`. Unfortunately, the workaround is:
```brew unlink lima```
* Lima VZ is not usable right now: [lima-vm/lima#1200](https://github.com/lima-vm/lima/issues/1200)
* Lima clock appears to drift is some unclear circumstances: [lima-vm/lima#1307 (comment)](https://github.com/lima-vm/lima/issues/1307#issuecomment-1397996400)

## Hello World

### Step 1: Create File

Create a new file `pipeline.go` and open it up in your favorite IDE for editing. This should look something like:
```bash
mkdir <folder>
cd <folder>
touch pipeline.go
code pipeline.go
```

### Step 2: Insert Commands

Copy and paste the following code into that file. This is our `hello world` example.
```go
package main

import (
	"github.com/codecomet-io/go-sdk/base/debian"
	"github.com/codecomet-io/go-sdk/bin/bash"
	"github.com/codecomet-io/go-sdk/codecomet"
	"github.com/codecomet-io/go-sdk/controller"
	"github.com/codecomet-io/go-sdk/from"
	"github.com/codecomet-io/isovaline/sdk/wrapllb/platform"
)

func main() {
	codecomet.Init()

	from := from.Debian(debian.Bullseye, platform.DefaultPlatform)
	bsh := bash.New(from)
	bsh.Run("Hello World", `
		echo "Hello, nice to meet you!"
`)

	controller.Get().Exporter = &controller.Export{
		Local: "output",
	}

	controller.Get().Do(bsh.State)
}
```

### Step 3: Run Pipeline

From the command line, execute the pipeline by running the following:
```bash
codecomet run pipeline.go
```
The output should look something like this:

## Congratulations!

You just ran your first CodeComet Pipeline. You are well on your way to becoming a CI pro! :smile: