---
sidebar_position: 1
---

# Pipeline

In its most general form, a Pipeline is a collection of predetermined instructions that are executed to accomplish a specific goal relating to building and/or testing an application.

GitHub Actions calls them **Workflows**, CircleCI calls them **Pipelines** and Jenkins refers to them as **Declarative Pipelines**.

More specifically, a Pipeline is made up of Actions that run within one or more specified ExecutionContexts. By default, Pipelines execute Actions in parallel, but they can be specified to run sequentially.

Example Pipeline made up of multiple Actions:
```mermaid
flowchart TB
    subgraph Action Set 3
    A7-->A8
    end
    subgraph Action Set 2
    A4-->A5
    A5-->A6
    end
    subgraph Action Set 1
    A1-->A2
    A2-->A3
    end
    subgraph Pipeline
    Start-->A1
    Start-->A4
    Start-->A7
    end
```