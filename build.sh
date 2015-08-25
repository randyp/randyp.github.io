#!/bin/bash

set -e

MARKDOWN_VERSION="1.0.1"

pushd markdown
MDS=`ls *.md | cut -d. -f1`
popd

rm -f *.html
for MD in ${MDS}; do
    cat markdown/start.html.frag > ${MD}.html
    perl "Markdown_${MARKDOWN_VERSION}"/Markdown.pl markdown/${MD}.md >> ${MD}.html
    cat markdown/end.html.frag >> ${MD}.html
done
git add *.html && git commit -am 'update'
