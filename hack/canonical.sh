#!/usr/bin/env bash
set -o errexit -o errtrace -o functrace -o nounset -o pipefail

while read line; do
  ff="$line"
  existing="$(grep -Eo "\"canonical\" href=\"([^\"]+)\"" "$line" | sed -E 's/.*href="([^"]+)"/\1/')" || true
  line="${line:4:${#line}}"
  line="${line%.html*}"
  line="${line%index*}"
  if [ "$existing" != "" ]; then
    if [ "$existing" != "https://www.codecomet.io/$line" ]; then
      echo "MUST UPDATE: $existing vs. https://www.codecomet.io/$line"
      sed -i '' -e "s/href=\"$(printf "$existing" | sed 's/[/]/\\\//g')\"/href=\"https:\/\/www.codecomet.io\/$(printf "$line" | sed 's/[/]/\\\//g')\"/" "$ff"
    fi
  else
    echo "NEED NEW: https://www.codecomet.io/$line"
    if grep -q "</title>" "$ff"; then
      echo "has title"
      sed -i '' -e 's/<\/title>/<\/title>\n  <link rel="canonical" href="https:\/\/www.codecomet.io\/'$(printf "$line" | sed 's/[/]/\\\//g')'">/' "$ff"
    else
      echo "NIO title"
      exit
    fi
  fi
done < <(find ../ -iname "*.html" -not -path "*hack*")
