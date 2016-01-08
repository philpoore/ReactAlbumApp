#!/bin/bash

mkdir -p albums/

rm -rf albums/*.json

mkdir -p raw/
rm -rf raw/*

node album-crawler.js "$artist" | xargs -L 1 wget -q -P raw/

for file in `ls raw/`;
do
	mv raw/$file raw/$file.json;
done

for file in `ls raw/*.json`;
do
	echo "working" $file
	newFile=`echo $file | sed s"/^raw\///g"`
	jq -f format.txt $file > albums/albums_$newFile
done

rm -rf raw

jq -s . albums/*.json > all.json