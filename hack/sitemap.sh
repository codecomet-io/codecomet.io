#!/usr/bin/env bash

printf '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
while read line; do
#	lastmod="$(stat -f "%Sm" -t "%Y-%m-%dT%k:%M:%S%z" "$line" | sed 's/\r$//')"
	lastmod="$(stat -f "%Sm" -t "%Y-%m-%dT%H:%M:%S%z" "$line" | sed -E 's/([0-9]{2})([0-9]{2})$/\1:\2/')"
	line="${line:4:${#line}}"
	line="${line%.html*}"
	line="${line%index*}"
	if [ "$line" == "test" ]; then
	  continue
	fi
	if [ "$line" == "404" ]; then
	  continue
  fi
	if [ "$line" == "index" ]; then
  	line="https://www.codecomet.io/"
  else
  	line="$(printf "https://www.codecomet.io/%s" "$line")"
  fi
  # printf '<url>\n\n<lastmod></lastmod>\n</url>\n' # "$line"
	printf '  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n  </url>\n' "$line" "$lastmod"
	# grep -ERioh 'href="([^"]+)"' "$line" | sed -E 's/href="([^"]+)"/\1/g'
done < <(find ../ -iname "*.html" -not -path "*hack*" | sort | uniq)
printf '</urlset>\n'
