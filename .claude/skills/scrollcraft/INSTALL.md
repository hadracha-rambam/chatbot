# scrollcraft — install notes

Vendored into this repo as a project skill, so it loads automatically for anyone
working in `hadracha-rambam/chatbot` with Claude Code. No plugin install needed.

- **Source**: https://github.com/nateherkai/scroll-craft
- **Upstream path**: `plugins/nateherk-design/skills/scrollcraft`
- **Version**: 0.2.0 (plugin `nateherk-design`)
- **Licence**: MIT — see `LICENSE`

To install it globally instead (all projects, and it self-updates), use the
upstream plugin route in the Claude Code CLI:

```
/plugin marketplace add nateherkai/scroll-craft
/plugin install nateherk-design
```

## Runtime requirements

Run `node .claude/skills/scrollcraft/scripts/doctor.mjs` for a live preflight.

| Requirement | Needed for | Notes |
| --- | --- | --- |
| Node 18+ | every script | |
| A **full** ffmpeg build | encoding clips so they scrub rather than play | A stripped build (~24 filters, no `scale`) fails with misleading errors. Override with `SCROLLCRAFT_FFMPEG`. |
| `playwright-core` + Chrome | the verification pass | `npm i playwright-core` **inside the build folder**; point `SCROLLCRAFT_CHROME` at the browser. |
| `KIE_AI_API_KEY` | only to *generate* imagery | Optional. Building from your own photos and footage needs no key and no spend. |

Builds and the fingerprint registry land in `<workspace>/builds/` and
`<workspace>/FINGERPRINTS.md`. The workspace resolves to the first of:
`SCROLLCRAFT_HOME`, the nearest `.scrollcraft.json`, then `<project root>/scrollcraft`.
Run `node .claude/skills/scrollcraft/scripts/workspace.mjs --ensure` to create it.
