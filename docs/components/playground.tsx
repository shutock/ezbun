"use client";

import { useEffect, useState } from "react";
import { ArrowFatDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowFatDown";
import { ArrowFatUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowFatUp";
import { ControlIcon } from "@phosphor-icons/react/dist/ssr/Control";
import { KeyReturnIcon } from "@phosphor-icons/react/dist/ssr/KeyReturn";

import { cn } from "~/utils/cn";

`
% bun dev
$ ezbun
? Select a script to run › 
❯   sandbox.ts
    index.ts
    playground.ts
`.trim();

type State =
  | {
      key: "initial";
    }
  | {
      key: "select";
      currentId: number;
    }
  | {
      key: "run";
      selectedId: number;
    };

const files = ["sandbox.ts", "test.ts", "playground.ts"];

export const Playground: React.FC = () => {
  const [state, setState] = useState<State>({ key: "initial" });

  const reset = () => setState({ key: "initial" });
  const start = () => setState({ key: "select", currentId: 0 });
  const run = (id: number) => setState({ key: "run", selectedId: id });
  const moveCursor = (d: number) => {
    setState({
      key: "select",
      currentId: (d + files.length) % files.length,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const listener = (e: KeyboardEvent) => {
      const command = (() => {
        if (e.key === "c" && e.ctrlKey) return reset;
        if (state.key === "initial" && e.key === "Enter") return start;
        if (state.key !== "select") return;
        if (e.key === "ArrowUp") return () => moveCursor(state.currentId - 1);
        if (e.key === "ArrowDown") return () => moveCursor(state.currentId + 1);
        if (e.key !== "Enter") return;

        return () => run(state.currentId);
      })();

      if (!command) return;
      e.preventDefault();

      command();
    };

    window.addEventListener("keydown", listener, { signal });
    return () => controller.abort();
  }, [state]);

  return (
    <div className="col bg-ink/5 border-ink/5 overflow-clip rounded-xl border">
      <div className="bg-ink/5 p-2 px-4 text-sm">Terminal</div>

      <pre className="col min-h-48 p-3 px-4">
        <span className="text-ink">
          {`% bun dev`}
          {state.key === "initial" && (
            <span className="animate-blink">{`_`}</span>
          )}
        </span>

        {state.key !== "initial" && (
          <>
            <span className="text-ink/60">
              <span className="text-purple-400/60">{`$`}</span>
              {` ezbun`}
            </span>
            <span>
              <span className="text-cyan-400">{`?`}</span>
              <span className="text-ink font-medium">{` Select a script to run › `}</span>
              {state.key === "run" && (
                <span className="text-ink">{files[state.selectedId]}</span>
              )}
            </span>

            <ul className="col">
              {state.key !== "run" &&
                files.map((name, index) => {
                  const isSelected =
                    state.key === "select" && state.currentId === index;

                  const prefix = isSelected ? "❯   " : "    ";

                  const onClick = () => run(index);

                  return (
                    <span
                      key={index}
                      className={cn(
                        "cursor-pointer",
                        isSelected && "text-cyan-400",
                      )}
                      {...{ onClick }}
                    >{`${prefix}${name}`}</span>
                  );
                })}

              {state.key === "run" && (
                <>
                  <span>{`
Running ${files[state.selectedId]}...

`}</span>
                  <span className="text-ink">{`Hello from ${files[state.selectedId]}!`}</span>
                </>
              )}
            </ul>
          </>
        )}
      </pre>

      <div className="border-ink/5 row justify-end gap-1 border-t p-2 px-4 text-sm">
        {[
          {
            hotkey: (
              <>
                <ControlIcon className="size-4" {...{ weight: "bold" }} />C
              </>
            ),
            label: "Reset",
            onClick: reset,
          },
          {
            hotkey: (
              <KeyReturnIcon className="size-4" {...{ weight: "bold" }} />
            ),
            label: "Run",
            onClick: () => {
              if (state.key === "initial") return start();
              if (state.key === "select") return run(state.currentId);
            },
          },
          {
            hotkey: (
              <>
                <ArrowFatUpIcon className="size-4" {...{ weight: "bold" }} />
                <ArrowFatDownIcon className="size-4" {...{ weight: "bold" }} />
              </>
            ),
            label: "Navigate",
            onClick: () => {
              if (state.key !== "select") return;
              return moveCursor((state.currentId + 1) % files.length);
            },
          },
        ].map(({ hotkey, label, onClick }, index) => (
          <button
            key={index}
            className="row bg-ink/5 h-6 items-center gap-1 rounded-md p-1 px-2 pl-1 leading-none"
            {...{ onClick: onClick || undefined }}
          >
            <span className="row text-ink/20">{hotkey}</span>
            <span className="text-ink/60">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
