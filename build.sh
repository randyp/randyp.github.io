#!/bin/bash

set -e

MARKDOWN_VERSION="1.0.1"

pushd markdown
MDS=`ls *.md`
popd

rm -f html/*.html
for MD in ${MDS}; do
    perl "Markdown_${MARKDOWN_VERSION}"/Markdown.pl markdown/${MD} > html/${MD}.html
done
git commit -am 'update' && git push
