Claude, prove whether src/app/components/ui is referenced anywhere (including src/imports).

Scope

* This is investigation only. Do not change any files.

What to do

1. Search for direct imports of the ui folder

* Search the entire repo (including src/imports) for any import paths that reference:

  * src/app/components/ui
  * app/components/ui
  * components/ui
  * "@/app/components/ui"
  * "@/components/ui"
  * relative paths ending in "/components/ui" or "/components/ui/..."

2. Search for barrel or alias usage

* Check tsconfig/vite aliases (if any) that could map "@/components/ui" or similar to src/app/components/ui.
* If aliases exist, include them in the evidence so we can interpret import paths correctly.

3. Search for dynamic or indirect references

* Look for string-based references that might load these files indirectly (rare, but check):

  * require("...components/ui...")
  * import("...components/ui...")
  * any tooling scripts that copy or generate components/ui

Output requirements (non-negotiable)

* For each match, list:

  * exact file path
  * exact line number(s)
  * the full import line (verbatim)
* If there are zero matches, state:

  * "No references found" and list the exact search terms used.
* If you find references inside generated code under src/imports, call that out explicitly and list the importing files.

Definition of done

* We can answer, with evidence, one of these:

  * "The ui suite is unused anywhere and can be deleted safely."
  * "These exact files import it, so deletion would break build unless those imports are removed or replaced."
